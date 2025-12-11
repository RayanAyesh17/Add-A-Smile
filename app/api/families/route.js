import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import PoorFamily from "@/models/PoorFamily";

export async function GET(req) {
  await connectDB();

  try {
    const user = verifyToken(req); 
    // Only allow donor or admin
    if (!["donor", "admin"].includes(user.role)) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const families = await PoorFamily.find({ status: "approved" });

    return Response.json({ families });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }
}
