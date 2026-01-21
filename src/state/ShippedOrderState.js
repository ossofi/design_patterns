import OrderState from "./OrderState.js";

export default class ShippedOrderState extends OrderState {
    next(order) {
        console.log("Заказ уже отправлен, дальнейшие переходы невозможны");
    }

    getStatus() {
        return "Отправлен";
    }
}