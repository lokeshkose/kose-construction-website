import connectDB from '@/lib/mongodb';
import Subscriptions from '@/models/subscriptions';
import { sendMail } from '@/utils/mailer';

export async function GET(req) {
  console.log('[GET] Fetching subscriptions...');
  await connectDB();

  try {
    const {
      searchText = '',
      limit = '10',
      skip = '0',
    } = Object.fromEntries(req.nextUrl.searchParams);

    // Search by email or status
    const query = searchText.trim()
      ? {
          $or: ['email', 'status'].map((field) => ({
            [field]: { $regex: searchText, $options: 'i' },
          })),
        }
      : {};

    // Fetch subscriptions with pagination and sorting
    const [subscriptions, total] = await Promise.all([
      Subscriptions.find(query)
        .skip(+skip || 0)
        .limit(+limit || 10)
        .sort({ createdAt: -1 })
        .select('email status createdAt')
        .lean(),
      Subscriptions.countDocuments(query),
    ]);

    return Response.json(
      { success: true, data: subscriptions, total },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(req) {
  await connectDB();

  try {
    const { email, status } = await req.json();

    const subscription = await Subscriptions.findOne({
      email,
    });

    if (subscription) {
      throw {
        message:
          "Oops! Looks like you're already on our list. Thanks for being with us!",
        status: 409,
      };
    }

    const newSubscription = new Subscriptions({
      email,
      status,
    });

    await newSubscription.save();

    /*  Send Mail */
    sendMail({
      to: email,
      subject: 'Hello from Early Tech – Your Journey Begins!',
      templateName: 'subscription',
      variables: { },
    });

    return Response.json({
      success: true,
      status: 201,
      message: "Thank you for subscribing! We're glad to have you with us.",
      data: {},
    });
  } catch (error) {
    return Response.json(
      { error:   error.message || 'Error creating Subscription' },
      { status: 400 }
    );
  }
}
