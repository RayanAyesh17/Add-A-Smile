import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import PoorFamily from "@/models/PoorFamily";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();

  let user;

  try {
    user = verifyToken(req);
  } catch (err) {
    return Response.json(
      { error: "Invalid or missing token" },
      { status: 401 }
    );
  }

  if (!user || user.role !== "admin") {
    return Response.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  try {
    const totalFamilies = await PoorFamily.countDocuments();
    const pendingFamilies = await PoorFamily.countDocuments({
      status: "pending",
    });
    const richUsers = await User.countDocuments({
      role: "donor",
    });

    return Response.json({
      totalFamilies,
      pendingFamilies,
      richUsers,
    });
  } catch (err) {
    return Response.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
