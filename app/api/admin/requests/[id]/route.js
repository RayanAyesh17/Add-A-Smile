import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import SponsorshipRequest from "@/models/SponsorshipRequest";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const user = verifyToken(req);
    if (user.role !== "admin") return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });

    const body = await req.json();
    const { status } = body;

    const request = await SponsorshipRequest.findById(id);
    if (!request) return new Response(JSON.stringify({ error: "Request not found" }), { status: 404 });

    request.status = status;
    await request.save();

    return new Response(JSON.stringify({ request }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
