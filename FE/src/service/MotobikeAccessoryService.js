import axios from "axios";


export async function getListNew() {
    const data = await axios.get("http://localhost:8080/api/findAllNew");
    return data.data;
}export async function getListByQuantity() {
    const data = await axios.get("http://localhost:8080/api/getListByQuantity");
    return data.data;
}

export async function getListHot() {
    const data = await axios.get("http://localhost:8080/api/getListHot");
    return data.data;
}

export async function getListAll(name, page) {
    const data = await axios.get(`http://localhost:8080/api/getAll?name=${name}&page=${page}`);
    return data.data;
}


export async function findById(id) {
    try {
        const data = await axios.get(`http://localhost:8080/api/find`, {
            params: {
                id: id
            }
        });
        return data.data;
    } catch (e) {
        console.log(e)
    }
}

export async function addAccessary(accessary) {
    const token = localStorage.getItem("authToken")
    try {
        await axios.post(`http://localhost:8080/admin/addAccessary`, accessary, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}
