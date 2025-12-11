import { connectDB } from "@/lib/db";
import PoorFamily from "@/models/PoorFamily";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  await connectDB();

  try {
    const user = verifyToken(req);

    if (!user || user.role !== "donor") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    // fetch all families with status approved
    const families = await PoorFamily.find({ status: "approved" }).lean();

    return Response.json({ families });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
