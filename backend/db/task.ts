import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { users } from "./user";

export const tasks = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  completed: int().notNull().default(0),
  userId: int().notNull(),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));
