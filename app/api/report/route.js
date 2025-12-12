import dbConnect from "@/lib/dbConnect";

import PoorFamily from "@/models/PoorFamily";
import Sponsorship from "@/models/Sponsorship";

// POST: submit a new family report (by general user)
export async function POST(req) {
  try {
    await dbConnect();

    const data = await req.json();
    const {
      reporterName,
      reporterContact,
      reporterPhone, // new
      location,
      needs,
      age,
      gender,
      urgency,
      description,
      phone, // new - family's phone
    } = data;

    if (!reporterName || !reporterContact || !reporterPhone || !location || !needs || !phone) {
      return new Response(JSON.stringify({ error: "Please fill all required fields" }), { status: 400 });
    }

    const familyObj = {
      age: age ? Number(age) : undefined,
      gender: gender || undefined,
      needs: needs.split(",").map(n => n.trim()).filter(Boolean),
      urgency: urgency || "medium",
      status: "pending",
      description: description || "",
      location,
      phone, 
      reportedSource: "user",
      reporterInfo: {
        name: reporterName,
        contact: reporterContact,
      },
    };

    const newFamily = await PoorFamily.create(familyObj);

    return new Response(JSON.stringify({ message: "Report submitted successfully!", family: newFamily }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

// GET: fetch all families with correct status & reported by info
export async function GET(req) {
  try {
    await dbConnect();

    let families = await PoorFamily.find({
      status: { $in: ["approved", "pending"] },
    })
      .select("location needs age gender urgency description status reportedSource reporterInfo phone")
      .lean();

    // Check sponsorships in batch
    const familyIds = families.map(f => f._id);
    const sponsored = await Sponsorship.find({ family: { $in: familyIds } }).lean();
    const sponsoredIds = sponsored.map(s => s.family.toString());

    families = families.map(f => ({
      ...f,
      status: sponsoredIds.includes(f._id.toString()) ? "sponsored" : f.status,
      reportedBy: f.reportedSource === "admin" ? f.reporterInfo?.name || "Admin" : f.reporterInfo?.name || "User",
    }));

    return new Response(JSON.stringify({ families }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
