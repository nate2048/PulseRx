import React from 'react';
import FindMarker from "./FindMarker";


function MarkerForm({ label, placeholder, size }) {
  return (
      <div className="flex flex-col items-end gap-6 w-72">

          <FindMarker/>


      </div>


  );
}

export default MarkerForm;
