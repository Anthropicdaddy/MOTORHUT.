import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";

export async function GET() {
  const allCars = await db.select().from(cars);
  return NextResponse.json(allCars);
}

export async function POST(request: Request) {
  const body = await request.json();
  const [newCar] = await db.insert(cars).values(body).returning();
  return NextResponse.json(newCar, { status: 201 });
}
