import chai from 'chai';
import { expect } from 'chai';
import sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';

chai.use(sinonChai);

describe('Login Service', () => {
  describe('verifyLogin', () => {
    it('should return INVALID_DATA if username or password is missing', async () => {
      const result = await loginService.verifyLogin({ username: '', password: '' });
      expect(result.status).to.equal('INVALID_DATA');
    });

    it('should return UNAUTHORIZED if user is not found', async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);

      const result = await loginService.verifyLogin({ username: 'nonexistent', password: 'password' });
      expect(result.status).to.equal('UNAUTHORIZED');
      sinon.restore();
    });
  });
});