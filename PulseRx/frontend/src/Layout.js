import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/home";
import Entry from "./pages/entry";
import InputForm from "./InputForm";
import FindMarker from "./FindMarker";
import Insights from "./pages/insights";

function Layout({ logout }) {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex">
      <div className="sidebar">
        {/* Fixed width sidebar - see .css file */}
          {/* The prop is again passed in here so dashboard has access to the logout function */}
        <Dashboard logout={logout} handleComponentClick={handleComponentClick} />
      </div>
        {/* this is so the component area can be scrollable - see .css file */}
      <div className="content">

        {selectedComponent === "Home" && <Home />}
        {selectedComponent === "Entry" && <InputForm />}
        {selectedComponent === "Insights" && <Insights />}
        {selectedComponent === "Document" && <FindMarker />}
      </div>
    </div>
  );
}

export default Layout;
