import axios from "axios";


export async function getListNew() {
    const data = await axios.get("http://localhost:8080/api/findAllNew");
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
