import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function ConfirmAccount() {
    const {id} = useParams();
    const back = useNavigate();
    useEffect(() => {
        const getResult = async () => {
            const result = await axios.get(`http://localhost:8080/account/confirm?id=${id}`)
            try {
                if (result.data === "OK") {
                    back("/login", {state: {data: "OK"}})
                    console.log("OK")
                } else if (result.data === "NO") {
                    back("/login", {state: {data: "NO"}})
                    console.log("NO")
                }
                console.log(result)
            } catch (e) {
                console.log(e)
            }
        }
        getResult()
    }, []);
}