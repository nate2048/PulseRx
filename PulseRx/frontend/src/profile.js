import React from 'react';
import { Typography, Card, CardHeader } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function Profile() {

    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const response = await client.get("/api/user")
        if(response === undefined){
            setCurrentUser(false);
        }
        else{
            setCurrentUser(true);
            setUser(response.data);
            console.log(response.data);
        }
    }

    if(currentUser){
        return (
            <div className='flex flex-col' style={{ gap: "20px" }}>
                <div className='center'>
                    <Typography variant="h1" color="blue-gray">User Profile</Typography>
                </div>
                <div>
                    <ul>
                        <li>
                            <Typography variant="h5" color="blue-gray">Username: {user.user.username}</Typography>
                        </li>
                        <li>
                            <Typography variant="h5" color="blue-gray">Email: {user.user.email}</Typography>
                        </li>
                        <li>
                            <Typography variant="h5" color="blue-gray">Age: {user.user.age}</Typography>
                        </li>
                        <li>
                            <Typography variant="h5" color="blue-gray">Sex: {user.user.sex}</Typography>
                        </li>
                        <li>
                            <Typography variant="h5" color="blue-gray">Ethnicity: {user.user.ethnicity}</Typography>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    return (
        <div className="main-section">
            <h2>Hello, user!</h2>
        </div>
    );
}

export default Profile;
