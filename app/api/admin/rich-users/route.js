import dbConnect from "@/lib/dbConnect";

import User from "@/models/User"; // your user model
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  await dbConnect();

  try {
    const user = verifyToken(req);

    if (!user || user.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Fetch all rich users / donors
    const richUsers = await User.find({ role: "donor" }).lean();

    return Response.json({ users: richUsers });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
