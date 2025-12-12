import dbConnect from "@/lib/dbConnect";

import { verifyToken } from "@/lib/auth";
import SponsorshipRequest from "@/models/SponsorshipRequest";

export async function GET(req) {
  await dbConnect();

  try {
    const user = verifyToken(req);
    if (user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    const requests = await SponsorshipRequest.find({ status: "pending" })
      .populate("donor", "name email")
      .populate("family", "age gender needs description");

    return new Response(JSON.stringify({ requests }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
