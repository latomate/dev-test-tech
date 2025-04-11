import { drizzle } from 'drizzle-orm/libsql';
import dotenv from 'dotenv';
import {tasks, users} from './schema';

dotenv.config();
const drizzleDb = drizzle(process.env.DB_FILE_NAME as string);

const usersData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com'
    }
]

const tasksData = [
    {
        id: 1,
        userId: 1,
        content: 'Buy groceries',
        isCompleted: false
    },
    {
        id: 2,
        userId: 1,
        content: 'Buy video games',
        isCompleted: true
    },
    {
        id: 3,
        userId: 2,
        content: 'Buy Car',
        isCompleted: false
    }
];


const seed = async () => {
    await drizzleDb.insert(users).values(usersData);
    await drizzleDb.insert(tasks).values(tasksData);
}

seed();

