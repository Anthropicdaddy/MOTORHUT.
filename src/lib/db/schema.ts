import {
  pgTable,
  uuid,
  varchar,
  integer,
  decimal,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const carStatusEnum = pgEnum("car_status", [
  "available",
  "sold",
  "reserved",
]);

export const cars = pgTable("cars", {
  id: uuid("id").defaultRandom().primaryKey(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  mileage: integer("mileage").notNull(),
  transmission: varchar("transmission", { length: 20 }).notNull(),
  fuel: varchar("fuel", { length: 20 }).notNull(),
  status: carStatusEnum("status").default("available").notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
