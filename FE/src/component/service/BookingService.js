import axios from "axios";

export async function getListBookingByIdAccount(id) {
    const data = await axios.get(`http://localhost:8080/booking/${id}`);
    return data.data;
}
export async function getAllBooking(name,page) {
    const data = await axios.get(`http://localhost:8080/booking/getBookingAdmin?name=${name}&page=${page}`);
    return data.data;
}
export async function bookingAccessary(idBooking, price) {
    await axios.get(`http://localhost:8080/payment/createPay?idBooking=${idBooking}&price=${price}`);

}