import express, { Response, Request } from 'express';
import 'dotenv/config';
import { connectDB } from '@/config/database.config.js';
import ipConversions from './routes/ipConversions.routes';

const router = express.Router();
const app = express();

app.use('/api', ipConversions());

let port = process.env.PORT;
if (process.env.NODE_ENV === 'test') {
    port = process.env.PORT_TEST;
}
export const server = app.listen(port, async () => {
    await connectDB();
    console.log(`Example app listening on port ${process.env.PORT}`);
});

export default app;
