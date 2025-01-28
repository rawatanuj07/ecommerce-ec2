import { NextRequest, NextResponse } from "next/server";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const consumerKey = process.env.NEXT_PUBLIC_WP_CONSUMER_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_WP_CONSUMER_SECRET;

  if (!apiUrl || !consumerKey || !consumerSecret) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

  const oauth = new OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return crypto
        .createHmac("sha1", key)
        .update(base_string)
        .digest("base64");
    },
  });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  let endpoint = "";

  switch (type) {
    case "products":
      endpoint = "products";
      break;
    case "categories":
      endpoint = "products/categories";
      break;
    case "tags":
      endpoint = "products/tags";
      break;
    default:
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
  }

  const requestData = {
    url: `${apiUrl}/wp-json/wc/v3/${endpoint}`,
    method: "GET",
  };

  const headers = oauth.toHeader(oauth.authorize(requestData));

  try {
    const response = await fetch(requestData.url, {
      method: "GET",
      headers: {
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
