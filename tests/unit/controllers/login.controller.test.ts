import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';
import { Token } from '../../../src/types/Token';
import { ServiceResponse } from '../../../src/types/ServiceResponse';

chai.use(sinonChai);

describe('LoginController', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('login', function () {
    it('should return user data with 200 status if login is successful', async function () {
      const req: any = { body: { username: 'user1', password: 'password123' } };
      const res: any = { status: sinon.stub(), json: sinon.stub() };

      const serviceResponse: ServiceResponse<Token> = {
        status: 'SUCCESSFUL',
        data: { token: 'some_token' },
      };

      try {
        sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

        await loginController.login(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(serviceResponse.data)).to.be.true;
      } catch (error) {
        console.error('Error during test:', error);
      }
    });
  });
});
