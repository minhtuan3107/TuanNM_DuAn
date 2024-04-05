import axios from "axios";

export async function getAllAccessary(name, page) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/admin/getAllAccessary`, {
            params: {
                name: name,
                page: page
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e);
    }
}

export async function getAllBooking(page) {
    try {
        const token = localStorage.getItem("authToken")
        const data = await axios.get(`http://localhost:8080/admin/getAllBooking`, {
            params: {
                page: page,
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e);
    }
}

export async function changePassword(password, idAccount) {
    try {
        console.log(idAccount);
        console.log(password)
        const token = localStorage.getItem("authToken")
        const data = await axios.get(`http://localhost:8080/account/changePassword`, {
            params: {
                password: password,
                idAccount: idAccount
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e);
    }
}

export async function getAllAccount(name, page) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/admin/getAllAccount`, {
            params: {
                name: name,
                page: page
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e);
    }
}

export async function getRole(id) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/admin/getRole`, {
            params: {
                idAccount: id
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e);
    }
}

export async function detailBooking(date) {
    const token = localStorage.getItem("authToken")
    try {
        const data = await axios.get(`http://localhost:8080/admin/detailBookingAdmin`, {
            params: {
                date: date
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (e) {
        console.log(e)
    }
}

export async function deleteAccessory(id) {
    try {
        const token = localStorage.getItem("authToken")
        const data = await axios.get(`http://localhost:8080/admin/deleteAccessary`, {
            params: {
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