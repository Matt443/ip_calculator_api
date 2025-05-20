import express from 'express';
import 'dotenv/config';
import { connectDB } from '@/config/database.config.js';
import ipConversions from '@/routes/ipConversions.routes.js';
import networkAddress from '@/routes/ipCalculations.routes.js';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import fs from 'fs';
import RateLimit from 'express-rate-limit';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = JSON.parse(fs.readFileSync('./src/swagger.json', 'utf-8'));
const app = express();
app.use(cors());
app.use(compression());
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20
});

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            'script-src': ["'self'"]
        }
    })
);

app.use(limiter);

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.redirect('https://api.ip-calculator.marcinregula.de/api/docs');
});
app.use('/api', ipConversions());
app.use('/api', networkAddress());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let port = process.env.PORT;
if (process.env.NODE_ENV === 'test') {
    port = process.env.PORT_TEST;
}
export const server = app.listen(port, async () => {
    await connectDB();
    console.log(`Example app listening on port ${process.env.PORT}`);
});

export default app;
