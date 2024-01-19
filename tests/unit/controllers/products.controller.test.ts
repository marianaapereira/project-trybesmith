import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import productsService from '../../../src/services/products.service';
import productsController from '../../../src/controllers/products.controller';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Product } from '../../../src/types/Product';
import { ProductSequelizeModel } from '../../../src/database/models/product.model';
// import { ProductSequelizeModel
// } from '../../../src/database/models/product.model';

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
    it('should return error message if service response is not successful', async function () {
      const serviceResponse: ServiceResponse<Array<{
        id: number;
        userId: number;
        productIds: number[];
      }>> = {
        status: 'NOT_FOUND',
        data: { message: 'Error message' },
      };

      sinon.stub(productsService, 'list').resolves(serviceResponse);

      await productsController.list(req, res);

      expect(res.status).to.have.been.calledWith();
      expect(res.json).to.have.been.calledWith(serviceResponse.data);
    });
  });
});
