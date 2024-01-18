import OrderModel from '../database/models/order.model';

import ProductModel from '../database/models/product.model';

import { ServiceResponse } from '../types/ServiceResponse';

async function list(): Promise<ServiceResponse<Array<{ 
  id: number; 
  userId: number; 
  productIds: number[];
}>>> {
  const orders = await OrderModel.findAll();

  const ordersWithProductsIds = orders.map(async ({ dataValues }) => {
    const query = {
      order_id: dataValues.id,
    };

    const orderProducts = await ProductModel.findAll({ attributes: ['id'], where: query });
    const orderProductsIds = orderProducts.map((orderProduct) => orderProduct.dataValues.id);
    
    const orderWithProductsIds = { ...dataValues, productIds: orderProductsIds };

    return orderWithProductsIds;
  });

  const ordersData = await Promise.all(ordersWithProductsIds).then((results) => results);

  return { status: 'SUCCESSFUL', data: ordersData };
}

export default {
  list,
};