import axios from "axios";


export async function getListNew() {
    const data = await axios.get("http://localhost:8080/api/findAllNew");
    return data.data;
}

export async function findById(id) {
    const data = await axios.get(`http://localhost:8080/api/find/${id}`);
    return data.data;
}