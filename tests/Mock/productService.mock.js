const productErrorMessage = {
  type: 'error',
  message: 'Product not found'
};

const productSuccessMessage = {
  type: null,
  message: {
    "id": 2,
    "name": "Traje de encolhimento"
  }
}

const allProductsMessage = {
  type: null,
  message: [
    {
      "id": 1,
      "name": "Martelo de Thor"
    },
    {
      "id": 2,
      "name": "Traje de encolhimento"
    },
    {
      "id": 3,
      "name": "Escudo do Capitão América"
    }
  ]
}

module.exports = {
  productErrorMessage,
  productSuccessMessage,
  allProductsMessage,
};