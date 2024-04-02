import axios from "axios";

export async function checkEmailAccount(email) {
    const token = localStorage.getItem("authToken");
    try {
        const result = await axios.get("http://localhost:8080/account/checkEmail", {
            params: {
                email: email
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data;
    } catch (e) {
        console.log(e);
    }
}

export async function checkUserNameAccount(userName) {
    try {
        const token = localStorage.getItem("authToken")
        const result = await axios.get("http://localhost:8080/account/checkUserName", {
            params: {
                userName: userName
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result.data;
    } catch (e) {
        console.log(e);
    }
}

export async function checkPhoneNumberAccount(phoneNumber) {
    const token = localStorage.getItem("authToken")
    try {
        const result = await axios.get("http://localhost:8080/account/checkPhoneNumber", {
            params: {
                phoneNumber: phoneNumber
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result.data;
    } catch (e) {
        console.log(e);
    }
}

export async function register(user) {
    const token = localStorage.getItem("authToken")
    try {
        await axios.post(`http://localhost:8080/account/registerr`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export async function loginAccount(value) {
    try {
        return (await axios.post(`http://localhost:8080/account/login`, value)).data;
    } catch (error) {
        throw error.response
    }
}

export default async function findById(id) {
    const token = localStorage.getItem("authToken")
    try {
        const result = await axios.get("http://localhost:8080/account/findById", {
            params: {
                idAccount: id
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result.data;
    } catch (e) {
        console.log(e)
    }
}

