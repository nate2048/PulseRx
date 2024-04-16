import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Home from "./pages/home";
import Entry from "./pages/entry";
import InputForm from "./pages/InputForm";
import FindMarker from "./Forms/FindMarker";
import Example from "./Forms/DatePicker";

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
          {selectedComponent === "Document" && <Example />}
      </div>
    </div>
  );
}

export default Layout;
