const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers')
const getAllResult = require('../../Mock/productController.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Product Controller', function () {
  describe('Test all controllers in relation to products', function () {
    const req = {};
    const res = {};

    this.beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Shold return status 200 and all products', async function () {
      sinon.stub(productService, 'getAll').resolves(getAllResult);
      await productController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.called;
    });

    it('Shold return status 404 ', async function () {
      req.params = { id: 69 }
      sinon.stub(productService, 'getById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await productController.getById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({ message: 'Product not found' })
    });

  });
});
