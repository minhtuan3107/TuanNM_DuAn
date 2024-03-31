import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Errors() {
    const back = useNavigate();
    useEffect(() => {
        back("/home")
    }, []);
}