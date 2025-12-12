import dbConnect from "@/lib/dbConnect";

import { verifyToken } from "@/lib/auth";
import PoorFamily from "@/models/PoorFamily";

export async function POST(req) {
  await dbConnect();

  try {
    const user = verifyToken(req);

    if (!user || user.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { location, needs, age, gender, urgency, description, phone } = await req.json();

    if (!location || !needs || !age || !gender || !urgency || !phone) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newFamily = await PoorFamily.create({
      location,
      needs,
      age,
      gender,
      urgency,
      description,
      phone, 
      status: "approved",
      reportedSource: "admin", 
      reporterInfo: {
        name: user.name || "Admin",
        contact: user.email || "",
      },
    });

    return Response.json({ message: "Family added successfully", family: newFamily });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
