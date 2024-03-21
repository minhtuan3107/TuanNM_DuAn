import axios from "axios";

export async function getListBookingByIdAccount(id) {
    const data = await axios.get(`http://localhost:8080/booking/${id}`);
    return data.data;
}
