const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productModel } = require('../../../src/models');
const  connection  = require('../../../src/models/connection');
const getAllResult = require('../../Mock/productModel.mock');

const { expect } = chai;

describe('Product Model', function () {
  describe('Test all the ways to list products', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('Shold return all products', async function () {
      sinon.stub(connection, 'execute').resolves([getAllResult])
      const result = await productModel.getAll();
      expect(result).to.be.deep.equal(getAllResult)
    });

    it('Shold return the requisited product', async function () {
      sinon.stub(connection, 'execute').resolves([[getAllResult[2]]])
      const result = await productModel.getById(3);
      expect(result).to.be.deep.equal(getAllResult[2])
    });

    it('Shold return a new registered product', async function () {
      const newProduct = {
        name: 'tanto faz'
      }
      sinon.stub(connection, 'execute').resolves([{ insertId: 69 }])
      const result = await productModel.register(newProduct);
      expect(result).to.be.deep.equal({ id: 69, name: 'tanto faz' })
    });

    // it('Shold edit a product ID', async function () {
    //   sinon.stub(connection, 'execute').resolves()
    //   const result = await productModel.update();
    //   expect(result).to.be.deep.equal(productUdate)
    // });

  });
})
