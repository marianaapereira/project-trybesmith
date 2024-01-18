// orders.controller.test.ts
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ordersService from '../../../src/services/orders.service';
import ordersController from '../../../src/controllers/orders.controller';
import { ServiceResponse } from '../../../src/types/ServiceResponse';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req: any = {};
  const res: any = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  beforeEach(function () {
    sinon.restore();
  });

  describe('list', function () {
    it('should return data with 200 status if service response is successful', async function () {
      const serviceResponse: ServiceResponse<Array<{
        id: number;
        userId: number;
        productIds: number[];
      }>> = {
        status: 'SUCCESSFUL',
        data: [
          {
            id: 1,
            userId: 123,
            productIds: [ 101, 102, 103 ],
          },
          {
            id: 2,
            userId: 456,
            productIds: [ 104, 105 ],
          },
        ],
      };

      sinon.stub(ordersService, 'list').resolves(serviceResponse);

      await ordersController.list(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(serviceResponse.data);
    });

    it('should return error response if service response is not successful', async function () {
      const serviceResponse: ServiceResponse<Array<{
        id: number;
        userId: number;
        productIds: number[];
      }>> = {
        status: 'NOT_FOUND',
        data: { message: 'Error message' },
      };

      sinon.stub(ordersService, 'list').resolves(serviceResponse);

      await ordersController.list(req, res);

      expect(res.status).to.have.been.calledWith();
      expect(res.json).to.have.been.calledWith(serviceResponse.data);
    });
  });
});
