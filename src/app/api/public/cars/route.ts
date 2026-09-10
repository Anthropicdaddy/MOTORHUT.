import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";
import { and, ilike, lte, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const make = searchParams.get("make");
  const maxPrice = searchParams.get("maxPrice");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const offset = (page - 1) * limit;

  const conditions = [];

  if (make) {
    conditions.push(ilike(cars.make, `%${make}%`));
  }
  if (maxPrice) {
    conditions.push(lte(cars.price, maxPrice));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [results, countResult] = await Promise.all([
    db
      .select()
      .from(cars)
      .where(whereClause)
      .orderBy(sql`${cars.createdAt} desc`)
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(cars)
      .where(whereClause),
  ]);

  const total = Number(countResult[0]?.count || 0);

  return NextResponse.json({
    cars: results,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
