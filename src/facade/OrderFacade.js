import Order from "../model/Order.js";

export default class OrderFacade {
    constructor() {
        this.order = new Order();
    }

    createOrder() {
        console.log("Заказ создан");
        this.getOrderStatus();
    }

    processOrder() {
        this.order.nextState();
        this.getOrderStatus();
    }

    shipOrder() {
        this.order.nextState();
        this.getOrderStatus();
    }

    cancelOrder() {
        this.order.cancel();
        this.getOrderStatus();
    }

    getOrderStatus() {
        console.log("Текущий статус заказа:", this.order.getStatus());
    }
}
