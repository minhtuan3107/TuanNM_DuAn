import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function ConfirmAccount() {
    const {id} = useParams();
    const back = useNavigate();
    useEffect(async () => {
        const result = await axios.get(`http://localhost:8080/account/confirm/${id}`)
        if (result.data === "OK") {
            back("/login", {state: {data: "OK"}})
        }else {
            back("/login", {state: {data: "NO"}})
        }
    }, []);
}