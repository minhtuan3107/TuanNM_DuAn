import axios from "axios";

export async function getListBookingByIdAccount(page, id) {
    try {
        const token = localStorage.getItem("authToken")
        const data = await axios.get(`http://localhost:8080/booking`, {
            params: {
                page: page,
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


export async function paymentBooking(price, id) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/payment/createPay`, {
            params: {
                price: price,
                id: id,
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

export async function shipCod(price, id) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/booking/shipCod`, {
            params: {
                price: price,
                idAccount: id
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data
    } catch (e) {
        console.log(e)
    }
}

export async function waitPayment(id, des, address, phone) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/booking/waitPayment`, {
            params: {
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


