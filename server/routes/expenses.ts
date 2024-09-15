import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// type Expense = {
//   id: number;
//   title: string;
//   amount: number;
// };

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive().min(1),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "rent",
    amount: 1000,
  },
  {
    id: 2,
    title: "food",
    amount: 500,
  },
  {
    id: 3,
    title: "clothes",
    amount: 200,
  },
];

const expensesRoutes = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), (c) => {
    // const data = await c.req.json();
    // const expense = createPostSchema.parse(data);
    const expense = c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    return c.json(expense);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    const expense = fakeExpenses.find((expense) => expense.id === parseInt(id));
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    const index = fakeExpenses.findIndex(
      (expense) => expense.id === parseInt(id)
    );
    if (index === -1) {
      return c.notFound();
    }
    fakeExpenses.splice(index, 1);
    return c.json({ message: "deleted" });
  });

export default expensesRoutes;
