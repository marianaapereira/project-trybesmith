import { NextFunction, Request, Response } from 'express';

import UserModel from '../database/models/user.model';

import jwtUtil from '../utils/jwt.util';

import { HTTP_UNAUTHORIZED_STATUS } from '../consts/httpStatusCodes.consts';

function extractToken(authorization: string) {
  return authorization.split(' ')[1];
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token é obrigatório' });
  }

  const token = extractToken(authorization);

  try {
    const decoded = await jwtUtil.verify(token);
    const user = await UserModel.findOne({ where: { username: decoded.username } });
    if (!user) return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });

    next();
  } catch (e) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
}

export default authMiddleware;