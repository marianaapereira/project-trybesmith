import express from 'express';

import productsRouter from './routes/products.router';

const app = express();

app.use(express.json());

// rotas

app.use(productsRouter);

export default app;
