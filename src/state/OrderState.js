export default class OrderState {
    next(order) {
        throw new Error("Метод next() должен быть реализован");
    }

    getStatus() {
        throw new Error("Метод getStatus() должен быть реализован");
    }
}
