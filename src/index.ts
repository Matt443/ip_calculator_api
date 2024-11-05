import express, { Response, Request } from 'express';
import 'dotenv/config';
import { connectDB } from '@/config/database.config.js';

const app = express();

app.get('/test', (req: Request, res: Response) => {
    res.status(200).send('Hello World');
});

let port = process.env.PORT;
if (process.env.NODE_ENV === 'test') {
    port = process.env.PORT_TEST;
}
app.listen(port, async () => {
    await connectDB();
    console.log(`Example app listening on port ${process.env.PORT}`);
});

export default app;
