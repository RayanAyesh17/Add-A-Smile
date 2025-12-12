import { NextResponse } from "next/server";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dbConnect from "@/lib/dbConnect";

// ✅ Activity Schema
const ActivitySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    location: String,
    childrenAge: String,
    image: String,
    childrenSponsored: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

// =========================
//       GET ACTIVITIES
// =========================
export async function GET() {
  try {
    await dbConnect(); // <-- CONNECT HERE

    const activities = await Activity.find().sort({ createdAt: -1 });
    return NextResponse.json({ activities });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}

// =========================
//        ADD ACTIVITY
// =========================
export async function POST(req) {
  try {
    await dbConnect(); // <-- CONNECT HERE

    const auth = req.headers.get("authorization");
    if (!auth) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await req.formData();

    const title = data.get("title");
    const description = data.get("description");
    const date = data.get("date");
    const location = data.get("location");
    const childrenAge = data.get("childrenAge");
    const image = data.get("image");

    if (!title || !image) {
      return NextResponse.json(
        { error: "Title and image required" },
        { status: 400 }
      );
    }

    // Save image locally
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    // Save activity
    const newActivity = await Activity.create({
      title,
      description,
      date,
      location,
      childrenAge,
      image: `/uploads/${fileName}`,
    });

    return NextResponse.json({ activity: newActivity });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
