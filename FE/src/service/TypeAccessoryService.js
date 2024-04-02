import axios from "axios";

export async function getAll() {
    const data = await axios.get(`http://localhost:8080/type`);
    return data.data;
}

export async function addTypeAccessary(typeAccessary) {
    const token = localStorage.getItem("authToken")
    try {
        await axios.post(`http://localhost:8080/admin/addTypeAccessary`, typeAccessary, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}
