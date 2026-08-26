import { auth } from "@/lib/auth";
import { SignJWT } from "jose";
import { headers } from "next/headers";

import { MongoClient } from "mongodb";

// Initialize MongoDB client to avoid relying on auth.api.getSession quirks
let mongoClient;
async function getDb() {
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();
  }
  return mongoClient.db('crowdfundly');
}

export async function GET(req) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    
    // Extract the token
    const cookies = cookieHeader.split(';');
    let sessionToken = null;
    for (const cookie of cookies) {
      const [name, ...rest] = cookie.trim().split('=');
      if (name === 'crowdfundly.session_token' || name === '__Secure-crowdfundly.session_token') {
        sessionToken = decodeURIComponent(rest.join('='));
        break;
      }
    }

    if (!sessionToken) {
      return Response.json({ message: "No session cookie found", debug_cookies: cookieHeader }, { status: 401 });
    }

    const db = await getDb();
    const dbSession = await db.collection('session').findOne({ token: sessionToken });
    
    if (!dbSession || dbSession.expiresAt < new Date()) {
      return Response.json({ message: "Session invalid or expired", debug_cookies: cookieHeader }, { status: 401 });
    }

    const baUser = await db.collection('user').findOne({ _id: dbSession.userId });
    if (!baUser) {
      return Response.json({ message: "User not found" }, { status: 401 });
    }

    const session = {
      user: {
        email: baUser.email,
        role: baUser.role || 'Supporter',
        id: baUser.id || baUser._id.toString()
      }
    };

    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback_secret_must_match_backend');
    
    // We should ensure the secret exactly matches the backend's ACCESS_TOKEN_SECRET.
    // If NEXT_PUBLIC_JWT_SECRET is used, it must be the same as ACCESS_TOKEN_SECRET in server.
    
    const token = await new SignJWT({ 
      email: session.user.email, 
      role: session.user.role || 'Supporter',
      _id: session.user.id 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    return Response.json({ token, user: session.user });
  } catch (error) {
    console.error("JWT Generation error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
