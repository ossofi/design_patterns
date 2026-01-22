const { OnlineOrder, InStoreOrder, SubscriptionOrder } = require('./order');

class OrderFactory {
    static createOrder(type, id, extraInfo) {
        switch (type) {
            case 'online':
                return new OnlineOrder(id, extraInfo);
            case 'in-store':
                return new InStoreOrder(id, extraInfo);
            case 'subscription':
                return new SubscriptionOrder(id, extraInfo);
            default:
                throw new Error('Unknown order type');
        }
    }
}

module.exports = OrderFactory;
