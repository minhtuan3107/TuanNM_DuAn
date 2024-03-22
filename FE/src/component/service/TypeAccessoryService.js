import axios from "axios";

export async function getAll() {
    const data = await axios.get(`http://localhost:8080/type`);
    return data.data;
}
