import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
        console.log(response);
        setTest(response.data);
        console.log(tests);
        console.log(response.data);
        console.log(tests.length)
    }

    if(tests === []) {return}

    return (
        <div>
            <h2>Blood Marker Tests</h2>
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
        </div>
    );
}

export default BloodTestComponent;