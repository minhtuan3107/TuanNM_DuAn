import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function PaymentOk() {
    const back = useNavigate();
    const {id} = useParams();
    const [resultPayment, setResultPayment] = useState("");
    useEffect(() => {
        const setPaymentOk = async () => {
            const data = await axios.get(`http://localhost:8080/payment/payment_infor/${id}`);
            setResultPayment(data.data);
        }
        setPaymentOk();
        back(`/history/${id}`, {state: {data: "OK"}})
    }, []);
}