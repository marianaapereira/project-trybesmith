import * as bcrypt from 'bcryptjs';

import UserModel from '../database/models/user.model';

import { Login } from '../types/Login';
import { Token } from '../types/Token';
import { ServiceResponse } from '../types/ServiceResponse';

import jwtUtil from '../utils/jwt.util';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  if (!login.username || !login.password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }

  const foundUser = await UserModel.findOne({ where: { username: login.username } });

  if (!foundUser) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const passwordsMatch = await bcrypt.compare(login.password, foundUser.dataValues.password);

  if (passwordsMatch) {
    const { id, username } = foundUser.dataValues;

    const token = jwtUtil.sign({ id, username });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
}
export default {
  verifyLogin,
};