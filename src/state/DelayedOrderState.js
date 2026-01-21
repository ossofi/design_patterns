import OrderState from "./OrderState.js";
import ShippedOrderState from "./ShippedOrderState.js";

export default class DelayedOrderState extends OrderState {
    next(order) {
        console.log("Задержка устранена. Заказ отправлен");
        order.setState(new ShippedOrderState());
    }

    getStatus() {
        return "Задерживается";
    }
}
