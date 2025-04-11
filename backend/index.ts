import express from 'express';
import { drizzle } from 'drizzle-orm/libsql';
import dotenv from 'dotenv';
import {tasks, users} from './db/schema';
import {eq, sql} from 'drizzle-orm';
import {Task} from './types/task';

dotenv.config();
const app = express();
const port = 3000;
const drizzleDb = drizzle(process.env.DB_FILE_NAME);

app.use(express.json());

// Tasks
app.post('/tasks', async (req, res) => {
    const { userId, content, isCompleted } = req.body as Partial<Task>;const task = await drizzleDb.insert(tasks).values({ userId, content, isCompleted }).returning();res.status(208).json(task);
});

app.post('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;

    await drizzleDb.run(`UPDATE tasks SET completed = ${isCompleted === true ? 1 : 0} WHERE id = ${id}`);

    res.json({ message: 'Task updated successfully' });
});

app.delete('/tasks/:id', (req, res) => {
    //TODO: Implement this
    res.json({ message: 'Task deleted successfully' });
});

// Users
app.get('/users', async (req, res) => {
    const usersList = await drizzleDb.select().from(users);
    res.json(usersList);
});

app.post('/users', async (req, res) => {
    const { name, email } = req.body as { name: string, email: string };
    const user = await drizzleDb.insert(users).values({ name, email }).returning();
    res.status(200).json(user);
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await drizzleDb.delete(tasks).where(eq(tasks.userId, id));
    await drizzleDb.delete(users).where(eq(users.id, id));
    res.json({ message: 'User deleted successfully' });
});

app.get('/users/:id/tasks', async (req, res) => {
    const tasksList = await drizzleDb.run(sql`
        SELECT * 
        FROM ${tasks} 
    `);

    res.json(tasksList.rows.map((row) => ({
        id: row.id,
        content: row.content,
        isCompleted: row.completed === 1,
        userId: row.userId
    })));
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 