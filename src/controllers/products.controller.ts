import { Request, Response } from 'express';

import productsService from '../services/products.service';

import mapStatusHTTP from '../utils/mapStatusHttp.util';

import { 
  HTTP_OK_STATUS, 
} from '../consts/httpStatusCodes.consts';

async function list(_req: Request, res: Response) {
  const serviceResponse = await productsService.list();

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  res.status(HTTP_OK_STATUS).json(serviceResponse.data);
}

export default {
  list,
};