import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Graphs from './graphs.js';

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

    //???
    if(tests === []) {return}

    return (
        <div>
            <h3>Blood Marker Test Charts:</h3>
            <Graphs />
        </div>
    );
}

export default BloodTestComponent;

/*
            {
                <ul>
                    {Object.entries(tests).map(([markerName, markerInfo]) => (
                        <li key={markerName}>
                            <h3>{markerName}</h3>
                            <p>Associated Tests:</p>
                            <ul>
                                {markerInfo.tests.map(test => (
                                    <li key={test.num}>
                                        Test Date: {test.test_date}, Value: {test.val}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            }
*/
//deprecated, just shows random info, need to input into charts
//leaving for reference 