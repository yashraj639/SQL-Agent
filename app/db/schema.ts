import { sql } from "drizzle-orm";
import { text, sqliteTable, integer, real } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable("products", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    price: real("price").notNull(),
    description: text("description").notNull(),
    stock: integer("stock").notNull().default(0),
    category: text("category").notNull(),
});

export const salesTable = sqliteTable("sales", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    productId: integer("product_id").notNull().references(() => productsTable.id),
    quantity: integer("quantity").notNull().default(1),
    totalAmount: real("total_amount").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    region: text("region").notNull(),
    salesDate: text("sales_date").default(sql`CURRENT_TIMESTAMP`),
    customerName: text("customer_name").notNull(),
});