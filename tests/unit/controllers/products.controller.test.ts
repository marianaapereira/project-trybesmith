import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsController from '../../../src/controllers/products.controller';
import productsService from '../../../src/services/products.service';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('create', function () {
    it('should create a product and return it with a 201 status', async function () {
      req.body = { name: 'Product 1', price: 19.99, orderId: 1 };

      const productData = { id: 1, name: 'Product 1', price: 19.99, orderId: 1 };
      sinon.stub(productsService, 'create').resolves(productData);

      await productsController.create(req, res);

      expect(res.status).to.be.calledWith(201);
      expect(res.json).to.be.calledWith(productData);
    });
  });
});