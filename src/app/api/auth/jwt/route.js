import { auth } from "@/lib/auth";
import { SignJWT } from "jose";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";

// Reuse a single Mongo connection across invocations (fallback path only).
let mongoClient;
async function getDb() {
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();
  }
  return mongoClient.db('crowdfundly');
}

// Resolve the currently signed-in Better Auth user from the request.
async function resolveUser() {
  // PRIMARY: let Better Auth parse + validate its own (signed) session cookie.
  // This is the same logic that powers authClient.getSession(), so if the
  // client has a valid session, this will find it — including the cookie
  // signature suffix that a manual `findOne({ token })` lookup would miss.
  try {
    const result = await auth.api.getSession({ headers: await headers() });
    if (result?.user?.email) {
      return {
        email: result.user.email,
        role: result.user.role || 'Supporter',
        id: result.user.id,
      };
    }
  } catch (e) {
    console.error("auth.api.getSession failed, trying manual fallback:", e?.message);
  }

  // FALLBACK: manual cookie parse + DB lookup. Handles the signed cookie value
  // (`<token>.<signature>`) by also trying the bare token before the signature.
  const hdrs = await headers();
  const cookieHeader = hdrs.get('cookie') || '';
  let raw = null;
  for (const cookie of cookieHeader.split(';')) {
    const [name, ...rest] = cookie.trim().split('=');
    if (name === 'crowdfundly.session_token' || name === '__Secure-crowdfundly.session_token') {
      raw = decodeURIComponent(rest.join('='));
      break;
    }
  }
  if (!raw) return null;

  const bareToken = raw.split('.')[0]; // strip Better Auth signature suffix if present
  const db = await getDb();
  const dbSession =
    (await db.collection('session').findOne({ token: raw })) ||
    (await db.collection('session').findOne({ token: bareToken }));
  if (!dbSession) return null;
  if (dbSession.expiresAt && new Date(dbSession.expiresAt) < new Date()) return null;

  const baUser = await db.collection('user').findOne({ _id: dbSession.userId });
  if (!baUser) return null;
  return {
    email: baUser.email,
    role: baUser.role || 'Supporter',
    id: baUser.id || baUser._id.toString(),
  };
}

export async function GET() {
  try {
    const user = await resolveUser();
    if (!user) {
      return Response.json({ message: "No active session" }, { status: 401 });
    }

    // NOTE: this secret MUST be identical to the Express API's ACCESS_TOKEN_SECRET,
    // otherwise the API's jwtVerify() rejects this token with 401 "unauthorized access".
    const secret = new TextEncoder().encode(
      process.env.ACCESS_TOKEN_SECRET ||
      process.env.NEXT_PUBLIC_JWT_SECRET ||
      'fallback_secret_must_match_backend'
    );

    const token = await new SignJWT({
      email: user.email,
      role: user.role,
      _id: user.id,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    return Response.json({ token, user });
  } catch (error) {
    console.error("JWT Generation error:", error);
    return Response.json({ message: "Server error", error: error?.message }, { status: 500 });
  }
}
