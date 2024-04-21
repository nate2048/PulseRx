import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MaterialTailwindTheme } from '@material-tailwind/react';

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
            <div class="text-right text-black/60">
                <h4 class="text-current/50"> Hello, {user.user.username}!</h4>
            </div>
        );
    }
    return (
        <div className="main-section">
            <h4>Hello, user!</h4>
        </div>
    );
}
export default UserComponent;