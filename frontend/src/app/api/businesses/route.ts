// app/api/businesses/route.ts
import { NextResponse } from "next/server";
import { getUserBusinesses } from "@/lib/business/getUserBusinesses";

export async function GET() {
  const businesses = await getUserBusinesses();
  return NextResponse.json(businesses);
}
