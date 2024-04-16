import BarChart from "./BarChart";
import {useEffect, useState} from "react";
import axios from "axios";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {Field, Form, Formik} from "formik";


export default function StatisticsChartUser() {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [userData, setUserData] = useState({
        labels: "",
        datasets: [
            {
                label: "",
                data: "",
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(128, 0, 128, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(255, 0, 255, 1)',
                    'rgba(128, 128, 128, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(255, 140, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 128, 1)',
                    'rgba(165, 42, 42, 1)',
                    'rgba(0, 128, 128, 1)'
                ],
                borderColor: "black",
                borderWidth: 2,
            },
            {
                label: "Số lượng bán được ",
                data: [],
                backgroundColor: [
                    'rgba(70, 130, 180, 1)',
                    'rgba(210, 105, 30, 1)',
                    'rgba(255, 20, 147, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(255, 215, 0, 1)',
                    'rgba(0, 128, 128, 1)',
                    'rgba(128, 0, 0, 1)',
                    'rgba(255, 69, 0, 1)',
                    'rgba(0, 191, 255, 1)',
                    'rgba(255, 99, 71, 1)',
                    'rgba(124, 252, 0, 1)',
                    'rgba(240, 230, 140, 1)',
                    'rgba(70, 130, 180, 1)',
                    'rgba(255, 165, 0, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(173, 216, 230, 1)',
                    'rgba(255, 228, 196, 1)',
                    'rgba(0, 255, 127, 1)',
                    'rgba(255, 250, 205, 1)',
                    'rgba(255, 222, 173, 1)',
                    'rgba(152, 251, 152, 1)',
                    'rgba(255, 250, 240, 1)'
                ],
                borderColor: "black",
                borderWidth: 2,
            },

        ],
    });

    useEffect(() => {
        console.log('aaaaaaaaaaaaaa');
        getUserData();
        console.log()
    }, []);

    const getUserData = async () => {
        let temp = await axios.get("http://localhost:8080/admin/getUserTop", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        });
        let movies = temp.data;
        console.log(movies)
        setUserData({
            labels: movies.map((data) => data.name),
            datasets: [
                {
                    axis: 'y',
                    label: "Top khách hàng mua hàng nhiều nhất ",
                    data: movies.map((data) => data.price),
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 0, 0, 1)',
                        'rgba(0, 255, 0, 1)',
                        'rgba(0, 0, 255, 1)',
                        'rgba(128, 0, 128, 1)',
                        'rgba(255, 255, 0, 1)',
                        'rgba(0, 255, 255, 1)',
                        'rgba(255, 0, 255, 1)',
                        'rgba(128, 128, 128, 1)',
                        'rgba(0, 0, 0, 1)',
                        'rgba(255, 140, 0, 1)',
                        'rgba(0, 128, 0, 1)',
                        'rgba(0, 0, 128, 1)',
                        'rgba(165, 42, 42, 1)',
                        'rgba(0, 128, 128, 1)'
                    ],

                },
                {
                    label: " Số tiền chi tiêu của khách hàng",
                    data: movies.map((data) => data.price),
                    backgroundColor: [
                        'rgba(70, 130, 180, 1)',
                        'rgba(210, 105, 30, 1)',
                        'rgba(255, 20, 147, 1)',
                        'rgba(0, 128, 0, 1)',
                        'rgba(255, 215, 0, 1)',
                        'rgba(0, 128, 128, 1)',
                        'rgba(128, 0, 0, 1)',
                        'rgba(255, 69, 0, 1)',
                        'rgba(0, 191, 255, 1)',
                        'rgba(255, 99, 71, 1)',
                        'rgba(124, 252, 0, 1)',
                        'rgba(240, 230, 140, 1)',
                        'rgba(70, 130, 180, 1)',
                        'rgba(255, 165, 0, 1)',
                        'rgba(255, 192, 203, 1)',
                        'rgba(173, 216, 230, 1)',
                        'rgba(255, 228, 196, 1)',
                        'rgba(0, 255, 127, 1)',
                        'rgba(255, 250, 205, 1)',
                        'rgba(255, 222, 173, 1)',
                        'rgba(152, 251, 152, 1)',
                        'rgba(255, 250, 240, 1)'
                    ],
                },
            ],
        })
    }

    return (

        <div>
            <div>
                <Pie chartData={userData} data={userData}/>
            </div>
        </div>
    );
}