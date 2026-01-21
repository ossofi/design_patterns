import OrderState from "./OrderState.js";

export default class CancelledOrderState extends OrderState {
    next(order) {
        console.log("Заказ отменён. Переходы невозможны");
    }

    getStatus() {
        return "Отменён";
    }
}
