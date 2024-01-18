import { Router } from 'express';

import productsController from '../controllers/products.controller';

import productParamsValidation from '../middlewares/productParamsValidation';

const productsRouter = Router();

productsRouter.get(
  '/products',
  productsController.list,
);

productsRouter.post(
  '/products',
  productParamsValidation,

  productsController.create,
);

export default productsRouter;