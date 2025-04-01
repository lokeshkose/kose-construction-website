import connectDB from '@/lib/mongodb';
import Quotations from '@/models/quotations';
import { sendMail } from '@/utils/mailer';

export async function GET(req) {
  console.log('[GET] Fetching quotations...');
  await connectDB();

  try {
    const {
      searchText = '',
      limit = '10',
      skip = '0',
    } = Object.fromEntries(req.nextUrl.searchParams);

    // Search by name, email, mobile, service, or company
    const query = searchText.trim()
      ? {
          $or: ['name', 'email', 'mobile', 'service', 'company'].map(
            (field) => ({
              [field]: { $regex: searchText, $options: 'i' },
            })
          ),
        }
      : {};

    // Fetch quotations with pagination and sorting
    const [quotations, total] = await Promise.all([
      Quotations.find(query)
        .skip(+skip || 0)
        .limit(+limit || 10)
        .sort({ createdAt: -1 })
        .select('name email mobile service projectInfo company createdAt')
        .lean(),
      Quotations.countDocuments(query),
    ]);

    return Response.json(
      { success: true, data: quotations, total },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching quotations:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch quotations' },
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(req) {
  await connectDB();
  try {
    const { name, email, mobile, service, projectInfo, company } =
      await req.json();
    const newRequest = new Quotations({
      name,
      email,
      mobile,
      service,
      projectInfo,
      company,
    });

    await newRequest.save();

    const tempService = service.toUpperCase()
    /*  Send Mail */
    sendMail({
      to: email,
      subject: "We're Preparing Your Quote – Stay Tuned",
      templateName: 'quotation',
      variables: { name, tempService },
    });

    return Response.json({
      success: true,
      status: 201,
      message: "Thank you for requesting a quote! We’ll get back to you soon.",
      data: {},
    });
  } catch (error) {
    return Response.json(
      { error: 'Error creating Request For Quotations' || error },
      { status: 400 }
    );
  }
}
