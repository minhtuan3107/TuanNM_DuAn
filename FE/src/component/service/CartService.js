import axios from "axios";

export async function getListCart(id) {
    const data = await axios.get(`http://localhost:8080/booking/cart/${id}`);
    return data.data;
}
export async function getTotalAmount(id) {
    const data = await axios.get(`http://localhost:8080/booking/price/${id}`);
    return data.data;
}