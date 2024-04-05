import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function PaymentOk() {
    const back = useNavigate();
    const id = localStorage.getItem("idAccount");
    const [resultPayment, setResultPayment] = useState("");
    const token = localStorage.getItem("authToken")
    useEffect(() => {
        const setPaymentOk = async () => {
            const data = await axios.get(`http://localhost:8080/payment/payment_infor/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResultPayment(data.data);
        }
        setPaymentOk();
        back(`/history`, {state: {data: "OK"}})
    }, []);
}