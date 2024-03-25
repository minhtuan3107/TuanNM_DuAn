import axios from "axios";

export async function getAllAccount(nameSearch, page) {
    const data = await axios.get(`http://localhost:8080/account/getAll?name=${nameSearch}&page=${page}`);
    return data.data;
}

export async function checkEmail(email) {
    const data = await axios.get(`http://localhost:8080/account/checkEmail?email=${email}`);
    return data.data;
}

export async function checkPhone(phone) {
    const data = await axios.get(`http://localhost:8080/account/checkPhone?phone=${phone}`);
    return data.data;
}

export async function checkUserName(userName) {
    const data = await axios.get(`http://localhost:8080/account/checkUserName?userName=${userName}`);
    return data.data;
}

export async function register(account) {
    await axios.post(`http://localhost:8080/account/register`, account);
}
