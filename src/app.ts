import 'express-async-errors';

import { connectDb, disconnectDB, loadEnv } from '@/config';
import { handleApplicationErrors } from '@/middlewares';
import { authenticationRouter, healthRouter } from '@/routers';
import cors from 'cors';
import express, { Express } from 'express';

loadEnv();

const app = express();
app.use(cors())
    .use(express.json())
    .use('/health', healthRouter)
    .use('/auth', authenticationRouter)
    .use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void>{
    await disconnectDB();
}

export default app;
