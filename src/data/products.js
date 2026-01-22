const Product = require('../components/product');

const products = {
    laptop: new Product('Laptop', 1200),
    mouse: new Product('Mouse', 50),
    keyboard: new Product('Keyboard', 100)
};

module.exports = products;
