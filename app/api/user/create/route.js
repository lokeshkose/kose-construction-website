import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  try {
    // Parse request body
    const { name, email, mobile, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword, // Store encrypted password
    });

    await newUser.save();

    return Response.json(
      { success: true, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { success: false, message: "Error creating user" },
      { status: 500 }
    );
  }
}
