import axios from "axios";

export async function getListBookingByIdAccount(id) {
    const data = await axios.get(`http://localhost:8080/booking/${id}`);
    return data.data;
}

export async function getAllBooking() {
    const data = await axios.get(`http://localhost:8080/booking/getAll`);
    return data.data;
}

export async function detailsBooking(date, id) {
    const data = await axios.get(`http://localhost:8080/booking/detailsBooking?date=${date}&idAccount=${id}`);
    return data.data;
}

export async function detailsBookingAdmin(date) {
    const data = await axios.get(`http://localhost:8080/booking/detailsBookingAdmin?date=${date}`);
    return data.data;
}


export async function paymentBooking(price, id, des, address, phone) {
    const data = await axios.get(`http://localhost:8080/payment/createPay?price=${price}&idAccount=${id}&des=${des}&address=${address}&phone=${phone}`);
    return data.data
}

export async function shipCod(price, id, des, address, phone) {
    const data = await axios.get(`http://localhost:8080/booking/shipCod?price=${price}&idAccount=${id}&des=${des}&address=${address}&phone=${phone}`);
    return data.data
}

export async function checkQuantityPayment(id) {
    const data = await axios.get(`http://localhost:8080/booking/checkQuantityPayment?idAccount=${id}`);
    return data.data
}
