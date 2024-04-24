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
                <div className='center20 flex-col'>
                    <div>
                        <p><Card className="h-full w-full p-3" style={{ gap: "10px" }}>
                            <Typography variant="h5" color="blue-gray">Username</Typography>
                            <Typography color="blue-gray"> {user.user.username} </Typography>
                        </Card></p>
                        <p><Card className="h-full w-full p-3" style={{ gap: "10px" }}>
                            <Typography variant="h5" color="blue-gray">Email</Typography>
                            <Typography color="blue-gray"> {user.user.email} </Typography>
                        </Card></p>
                        <p><Card className="h-full w-full p-3" style={{ gap: "10px" }}>
                            <Typography variant="h5" color="blue-gray">Age</Typography>
                            <Typography color="blue-gray"> {user.user.age} </Typography>
                        </Card></p>
                        <p><Card className="h-full w-full p-3" style={{ gap: "10px" }}>
                            <Typography variant="h5" color="blue-gray">Sex</Typography>
                            <Typography color="blue-gray"> {user.user.sex} </Typography>
                        </Card></p>
                        <p><Card className="h-full w-full p-3" style={{ gap: "10px" }}>
                            <Typography variant="h5" color="blue-gray">Ethnicity</Typography>
                            <Typography color="blue-gray"> {user.user.ethnicity} </Typography>
                        </Card></p>
                    </div>
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
