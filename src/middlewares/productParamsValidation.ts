import { NextFunction, Request, Response } from 'express';

import { 
  HTTP_BAD_REQUEST_STATUS, HTTP_UNPROCESSABLE_ENTITY_STATUS,
} from '../consts/httpStatusCodes.consts';

const MIN_PARAMS_LENGTH = 3;

const existenceValidation = (param: string) => (!param || param === '');

const paramsExistenceValidation = (name: string, price: string) => {
  if (existenceValidation(name)) return '"name" is required';
  if (existenceValidation(price)) return '"price" is required';
};

const typeValidation = (param: string) => (typeof param !== 'string');

const paramsTypeValidation = (name: string, price: string) => {
  if (typeValidation(name)) return '"name" must be a string';
  if (typeValidation(price)) return '"price" must be a string';
};

const lengthValidation = (param: string) => (param.length < MIN_PARAMS_LENGTH);

const paramsLengthValidation = (name: string, price: string) => {
  if (lengthValidation(name)) {
    return '"name" length must be at least 3 characters long';
  }

  if (lengthValidation(price)) {
    return '"price" length must be at least 3 characters long';
  }
};

const handleError = (res: Response, statusCode: number, message: string) => 
  res.status(statusCode).json({ message });

function productParamsValidation(req: Request, res: Response, next: NextFunction) {
  const { name, price } = req.body;
  
  const existenceError = paramsExistenceValidation(name, price);

  if (existenceError !== undefined) {
    return handleError(res, HTTP_BAD_REQUEST_STATUS, existenceError);
  }

  const typeError = paramsTypeValidation(name, price);
  if (typeError !== undefined) {
    return handleError(res, HTTP_UNPROCESSABLE_ENTITY_STATUS, typeError);
  }
  const lengthError = paramsLengthValidation(name, price);

  if (lengthError !== undefined) {
    return handleError(res, HTTP_UNPROCESSABLE_ENTITY_STATUS, lengthError);
  }

  next();
}

export default productParamsValidation;