import connectDB from "@/lib/mongodb";
import Contacts from "@/models/contacts";
import { sendMail } from "@/utils/mailer";

// Handle GET request
export async function GET(req) {
  console.log("[GET] Fetching contacts...");
  await connectDB();

  try {
    const {
      searchText = "",
      limit = "0",
      skip = "0",
    } = Object.fromEntries(req.nextUrl.searchParams);
    const query = searchText.trim()
      ? {
          $or: ["name", "email", "phone"].map((field) => ({
            [field]: { $regex: searchText, $options: "i" },
          })),
        }
      : {};

    // Get total count without skip & limit
    const total = await Contacts.countDocuments(query);

    // Fetch paginated contacts
    const contacts = await Contacts.find(query)
      .skip(+skip)
      .limit(+limit)
      .sort({ createdAt: -1 })
      .select("name email mobile createdAt message")
      .lean();

    return Response.json(
      { success: true, data: contacts, total },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return Response.json(
      { success: false, message: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(req) {
  console.log("API adding contact...");
  await connectDB();

  try {
    const { name, email, mobile, message } = await req.json();
    const newContact = new Contacts({ name, email, mobile, message });
    await newContact.save();

    /*  Send Mail */
    sendMail({
      to: email,
      subject: "Your Contact Request is in Good Hands!!!",
      templateName: "contact",
      variables: { name, userMessage: message },
    });
    return Response.json({
      success: true,
      status: 201,
      message: "Thanks for reaching out! We'll get back to you soon.",
      data: {},
    });
  } catch (error) {
    return Response.json(
      { error: "Error creating contact" || error },
      { status: 400 }
    );
  }
}


