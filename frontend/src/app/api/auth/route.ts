import { verifyToken } from "@/app/actions/auth/register";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserData } from "@/lib/getUserData";
import { getUserBusinesses } from "@/lib/getUserBusinesses";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access")?.value;

  if (!accessToken) {
    return NextResponse.json({}, { status: 401 });
  }

  // Verify the token
  const isValid = await verifyToken();

  if (!isValid) {
    return NextResponse.json({}, { status: 401 });
  }

  // Fetch user data and businesses
  const user = await getUserData();
  const businesses = await getUserBusinesses();

  return NextResponse.json({ user: user, businesses: businesses });
}
