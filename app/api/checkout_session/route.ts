import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const formatAmountForStripe = (amount: number) => {
  return Math.round(amount * 100);
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json(
      { error: { message: "Session ID is required" } },
      { status: 400 }
    );
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.log("Error retrieving checkout session", error);
    return NextResponse.json(
      { error: { message: "Error retrieving checkout session" } },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation",
            },
            unit_amount: formatAmountForStripe(5),
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        "origin"
      )}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        "origin"
      )}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create Stripe Checkout session" },
      { status: 500 }
    );
  }
}
