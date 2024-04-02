import axios from "axios";

export async function getListBookingByIdAccount(id) {
    try {
        const token = localStorage.getItem("authToken")
        const data = await axios.get(`http://localhost:8080/booking`, {
            params: {
                name: "",
                id: id
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e)
    }
}


export async function detailsBooking(date, id) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/booking/detailsBooking/${id}`, {
            params: {
                date: date
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e);
    }
}


export async function paymentBooking(price, id, des, address, phone) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/payment/createPay`, {
            params: {
                price: price,
                id: id,
                des: des,
                address: address,
                phone: phone
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data
    } catch (e) {
        console.log(e)
    }
}

export async function shipCod(price, id, des, address, phone) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/booking/shipCod`, {
            params: {
                price: price,
                idAccount: id,
                des: des,
                address: address,
                phone: phone
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data
    } catch (e) {
        console.log(e)
    }
}

export async function checkQuantityPayment(id) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/booking/checkQuantityPayment`, {
            params: {
                idAccount: id
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data
    } catch (e) {
        console.log(e)
    }
}
