import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [car] = await db.select().from(cars).where(eq(cars.id, id));

  if (!car) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(car);
}
