import express from 'express';

import productsRouter from './routes/products.router';
import ordersRouter from './routes/orders.router';
import loginRouter from './routes/login.router';

const app = express();

app.use(express.json());

// rotas

app.use(loginRouter);

app.use(productsRouter);
app.use(ordersRouter);

export default app;
