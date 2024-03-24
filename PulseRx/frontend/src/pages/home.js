import React from "react";
import UserComponent from './customComponents/userComponent'
import BloodTestComponent from './customComponents/bloodTestComponent'
 
const Home = () => {
    return (
        <div>
            <div>
                <UserComponent />
            </div>
            <div className="center">
                <BloodTestComponent />
            </div>
        </div>
    );
};
 
export default Home;