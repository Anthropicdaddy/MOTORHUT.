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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const [updated] = await db
    .update(cars)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(cars.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [deleted] = await db
    .delete(cars)
    .where(eq(cars.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
