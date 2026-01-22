const OrderComponent = require('./orderComponent');

class OrderComposite extends OrderComponent {
    constructor() {
        super();
        this.items = [];
    }

    add(item) {
        this.items.push(item);
    }

    remove(item) {
        this.items = this.items.filter(i => i !== item);
    }

    getPrice() {
        return this.items.reduce((sum, item) => sum + item.getPrice(), 0);
    }

    describe() {
        return this.items.map(item => item.describe()).join('\n');
    }
}

module.exports = OrderComposite;
