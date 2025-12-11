// api/donor/sponsored.js
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import PoorFamily from "@/models/PoorFamily";

export async function GET(req) {
  await connectDB();

  try {
    const user = verifyToken(req);
    if (user.role !== "donor") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const families = await PoorFamily.find({ sponsoredBy: user._id }); // assuming you store donor IDs here
    return Response.json({ families });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
