import axios from "axios";

export async function getListCart(id) {
    const data = await axios.get(`http://localhost:8080/booking/cart/${id}`);
    return data.data;
}

export async function getTotalAmount(id) {
    const data = await axios.get(`http://localhost:8080/booking/price/${id}`);
    return data.data;
}

export async function addToCard(idAccount, idAccessory) {
    const data = await axios.get(`http://localhost:8080/booking/addToCart/${idAccount}/${idAccessory}`);
    return data.data;
}

export async function deleteCart(idBooking) {
    const data = await axios.get(`http://localhost:8080/booking/deleteCart/${idBooking}`);
    return data.data;
}

export async function updateQuantity(quantity, idBooking) {
    const data = await axios.get(`http://localhost:8080/booking/setQuantity/${quantity}/${idBooking}`);
    return data.data;
}
