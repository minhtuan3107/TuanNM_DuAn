import axios from "axios";

export async function getListCart(id, token) {
    try {
        const data = await axios.get(`http://localhost:8080/booking/cart`, {
            params: {
                id: id
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e)
    }
}

export async function getTotalAmount(id) {
    try {
        const token = localStorage.getItem("authToken")
        const data = await axios.get(`http://localhost:8080/booking/price`, {
            params: {
                id: id
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e)
    }
}

export async function addToCard(idAccount, idAccessory) {
    const data = {idAccount: idAccount, idAccessory: idAccessory}
    const token = localStorage.getItem("authToken")
    try {
        return (await axios.post(`http://localhost:8080/booking/addToCart`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    } catch (e) {
        console.log(e)
    }
}

export async function deleteCart(idBooking) {
    const data = {idBooking}
    const token = localStorage.getItem("authToken")
    try {
        return (await axios.post(`http://localhost:8080/booking/addToCart`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    } catch (e) {
        console.log(e)
    }
}

export async function updateQuantity(quantity, idBooking) {
    const data = {quantity, idBooking}
    const token = localStorage.getItem("authToken")
    try {
        return (await axios.post(`http://localhost:8080/booking/setQuantity`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    } catch (e) {
        console.log(e)
    }
}

