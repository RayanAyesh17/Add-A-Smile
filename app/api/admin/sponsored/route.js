import dbConnect from "@/lib/dbConnect";

import { verifyToken } from "@/lib/auth";
import SponsorshipRequest from "@/models/SponsorshipRequest";
import Sponsorship from "@/models/Sponsorship";

export async function GET(req) {
  await dbConnect();

  try {
    const user = verifyToken(req);
    if (user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    // Get only accepted requests
    const acceptedRequests = await SponsorshipRequest.find({ status: "accepted" })
      .populate("donor", "name email")
      .populate("family", "age gender needs description");
    for (const req of acceptedRequests) {
      const exists = await Sponsorship.findOne({
        donor: req.donor._id,
        family: req.family._id,
      });

      if (!exists) {
        await Sponsorship.create({
          donor: req.donor._id,
          family: req.family._id,
        });
      }
    }

    // Return the accepted requests (unchanged)
    return new Response(JSON.stringify({ sponsored: acceptedRequests }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
