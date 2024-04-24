import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Graphs from './graphs.js';
import { Typography, Card, CardHeader } from "@material-tailwind/react";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

function BloodTestComponent() {

    const [tests, setTest] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        const response = await client.get("/api/markers",
            {'withCredentials': true });
        setTest(response.data);
    }
    if(tests === []) {return}

    return (
        <div>
            <div className='flex flex-col' style={{ gap: "20px" }}>
                <div className='center'>
                    <Typography variant="h1" color="blue-gray">Test Results</Typography>
                </div>
            </div>
                <Graphs />
        </div>
    );
}

export default BloodTestComponent;