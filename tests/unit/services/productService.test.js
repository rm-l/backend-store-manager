const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { productSuccessMessage, allProductsMessage } = require('../../Mock/productService.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Product Services', function () {
  describe('Test all services in relation to products', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('Shold return all products', async function () {
      sinon.stub(productModel, 'getAll').resolves(allProductsMessage.message);
      const result = await productService.getAll();
      expect(result).to.be.deep.equal(allProductsMessage);
    });

    it('Shold return the requisited product', async function () {
      sinon.stub(productModel, 'getById').resolves(productSuccessMessage.message);
      const result = await productService.getById(2);
      expect(result).to.be.deep.equal(productSuccessMessage);
    });

    it('Shold return a new registered product', async function () {
      sinon.stub(productModel, 'register').resolves(50)
      const result = await productService.register({ name: 'Foice e Martelo' });
      expect(result.type).to.equal(null);
    });
    
    it('Shold return error "PRODUCT_NOT_FOUND" ', async function () {
      sinon.stub(productModel, 'getById').resolves(undefined);
      const result = await productService.getById(69);
      expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    });

    it('Shold return error "INVALID_VALUE"', async function () {
      sinon.stub(productModel, 'register').resolves(50)
      const result = await productService.register(5555555);
      expect(result.type).to.equal('INVALID_VALUE');
    });

  });
})
