import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Home from "./pages/home";
import InputForm from "./InputForm";
import Insights from "./pages/insights";
import About from "./about"
import Profile from "./profile"
import UserComponent from './pages/customComponents/userComponent'


function Layout({ logout }) {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex">
      <div className="name">
        <UserComponent />
      </div>
      <div className="sidebar">
        {/* Fixed width sidebar - see .css file */}
          {/* The prop is again passed in here so dashboard has access to the logout function */}
        <Dashboard logout={logout} handleComponentClick={handleComponentClick} />
      </div>
        {/* this is so the component area can be scrollable - see .css file */}
      <div className="content">

        {selectedComponent === null && <Home />}
        {selectedComponent === "Home" && <Home />}

        {selectedComponent === "Entry" && <InputForm />}
        {selectedComponent === "Insights" && <Insights />}
        {selectedComponent === "About" && <About />}
        {selectedComponent === "Profile" && <Profile />}

      </div>
    </div>
  );
}

export default Layout;
