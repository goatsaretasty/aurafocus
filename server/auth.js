import { verifyToken } from "@clerk/backend";

// Expects "Authorization: Bearer <clerk session token>" from the frontend.
// Real verification against Clerk's backend, not a trusted client-sent userId.
export async function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  try {
    const claims = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    req.userId = claims.sub;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}
