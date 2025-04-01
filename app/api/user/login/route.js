import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import connectDB from "@/lib/mongodb"; // Ensure DB connection

// Secret Key (Use ENV variable in production)
const SECRET_KEY = process.env.JWT_SECRET;
const encoder = new TextEncoder();

export async function POST(req) {
  try {
    await connectDB(); // Ensure database is connected

    const { mobile, password } = await req.json();

    // Find user in the database
    const user = await User.findOne({ mobile });
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );

    // Generate JWT Token using `jose`
    const token = await new SignJWT({ id: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(encoder.encode(SECRET_KEY));

    return NextResponse.json(
      {
        statusCode: 200,
        message: "User successfully logged in",
        token,
        user: { name: user.name, email: user.email, mobile: user.mobile },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
