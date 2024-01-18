import express from 'express';

import productsRouter from './routes/products.router';
import ordersRouter from './routes/orders.router';

const app = express();

app.use(express.json());

// rotas

app.use(productsRouter);
app.use(ordersRouter);

export default app;
