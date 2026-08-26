import { auth } from "@/lib/auth";
import { SignJWT } from "jose";
import { headers } from "next/headers";

export async function GET(req) {
  try {
    const session = await auth.api.getSession({
      headers: headers()
    });

    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

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
