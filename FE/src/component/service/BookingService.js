import axios from "axios";

export async function getListBookingByIdAccount(id) {
    const data = await axios.get(`http://localhost:8080/booking/${id}`);
    return data.data;
}

export async function getAllBooking(name, page) {
    const data = await axios.get(`http://localhost:8080/booking/getBookingAdmin?name=${name}&page=${page}`);
    return data.data;
}

export async function paymentBooking(price, id) {
    const data = await axios.get(`http://localhost:8080/payment/createPay?price=${price}&idAccount=${id}`);
    return data.data
}
export async function shipCod(price, id) {
    const data = await axios.get(`http://localhost:8080/booking/shipCod?price=${price}&idAccount=${id}`);
    return data.data
}
export async function checkQuantityPayment(id) {
    const data = await axios.get(`http://localhost:8080/booking/checkQuantityPayment?idAccount=${id}`);
    return data.data
}
