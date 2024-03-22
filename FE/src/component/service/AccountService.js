import axios from "axios";

export async function getAllAccount(nameSearch,page) {
    const data = await axios.get(`http://localhost:8080/account/getAll?name=${nameSearch}&page=${page}`);
    return data.data;
}