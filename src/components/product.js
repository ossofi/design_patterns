const OrderComponent = require('./orderComponent');

class Product extends OrderComponent {
    constructor(name, price) {
        super();
        this.name = name;
        this.price = price;
    }

    getPrice() {
        return this.price;
    }

    describe() {
        return `Product: ${this.name}, $${this.price}`;
    }
}

module.exports = Product;
