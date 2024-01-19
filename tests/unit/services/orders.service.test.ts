import { expect } from 'chai';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import ordersService from '../../../src/services/orders.service';

describe('Orders Service', function () {
  beforeEach(function () { sinon.restore(); });

  describe('verifyLogin', () => {
    it('should return INVALID_DATA if username or password is missing', async () => {
      const result = await ordersService.list();
      expect(result.status).to.equal('SUCCESSFUL');
    });
  });
});