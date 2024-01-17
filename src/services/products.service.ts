import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';

import { ServiceResponse } from '../types/ServiceResponse';

async function create(
  product: ProductInputtableTypes,
): Promise<object> {
  const newProduct = await ProductModel.create(product);

  return newProduct.dataValues;
}

async function list(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
}

export default {
  create,
  list,
};