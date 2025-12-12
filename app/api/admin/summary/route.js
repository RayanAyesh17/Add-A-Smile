import dbConnect from "@/lib/dbConnect";

import { verifyToken } from "@/lib/auth";
import PoorFamily from "@/models/PoorFamily";
import User from "@/models/User";
import Sponsorship from "@/models/Sponsorship";

export async function GET(req) {
  await dbConnect();

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
    const sponsoredFamilies = await Sponsorship.countDocuments();
    const pendingFamilies = totalFamilies - sponsoredFamilies;

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
