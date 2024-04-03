import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/home";
import Entry from "./pages/entry";

function Layout({ logout }) {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex">
      <div className="sidebar">
        {/* Fixed width sidebar - see .css file */}
        <Dashboard logout={logout} handleComponentClick={handleComponentClick} />
      </div>
      <div className="content">
        {/* this is so the component area can be scrollable - see .css file */}
        {selectedComponent === "Home" && <Home />}
          {selectedComponent === "Entry" && <Entry />}
      </div>
    </div>
  );
}

export default Layout;
