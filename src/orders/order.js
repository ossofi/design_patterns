class Order {
    constructor(id) {
        this.id = id;
    }

    describe() {
        return `Order #${this.id}`;
    }
}

class OnlineOrder extends Order {
    constructor(id, deliveryAddress) {
        super(id);
        this.deliveryAddress = deliveryAddress;
    }

    describe() {
        return `Online Order #${this.id}, Delivery: ${this.deliveryAddress}`;
    }
}

class InStoreOrder extends Order {
    constructor(id, storeLocation) {
        super(id);
        this.storeLocation = storeLocation;
    }

    describe() {
        return `In-Store Order #${this.id}, Store: ${this.storeLocation}`;
    }
}

class SubscriptionOrder extends Order {
    constructor(id, period) {
        super(id);
        this.period = period;
    }

    describe() {
        return `Subscription Order #${this.id}, Period: ${this.period}`;
    }
}

module.exports = { Order, OnlineOrder, InStoreOrder, SubscriptionOrder };
