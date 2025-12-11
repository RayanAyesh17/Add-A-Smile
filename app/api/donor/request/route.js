import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import SponsorshipRequest from "@/models/SponsorshipRequest";
import PoorFamily from "@/models/PoorFamily";

export async function POST(req) {
  await dbConnect();

  let donor;
  try {
    donor = verifyToken(req); // could throw
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 401 });
  }

  if (donor.role !== "donor") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 403 });
  }

  try {
    const { familyId } = await req.json();

    const family = await PoorFamily.findById(familyId);
    if (!family) {
      return new Response(JSON.stringify({ message: "Family not found" }), { status: 404 });
    }

    const request = await SponsorshipRequest.create({
      donor: donor.id,
      family: family._id,
      status: "pending",
    });

    return new Response(JSON.stringify({ message: "Request sent", request }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
