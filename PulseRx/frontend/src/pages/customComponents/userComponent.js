import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

function UserComponent() {

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
            <div className="main-section">
                <h1>Current User</h1>
                <div>
                    email: {user.user.email} 
                </div>
                <div>
                    username: {user.user.username} 
                </div>
            </div>
        );
    }
    return (
        <div className="main-section">
            <h1>currentUser</h1>
            <div>
                email: undefined
            </div>
            <div>
                username: undefined
            </div>
        </div>
    );
}
export default UserComponent;