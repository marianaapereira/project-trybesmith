import { Request, Response } from 'express';

import loginService from '../services/login.service';

import mapStatusHTTP from '../utils/mapStatusHttp.util';

import { HTTP_OK_STATUS } from '../consts/httpStatusCodes.consts';

async function login(req: Request, res: Response) {
  const serviceResponse = await loginService.verifyLogin(req.body);

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  res.status(HTTP_OK_STATUS).json(serviceResponse.data);
}

export default {
  login,
};