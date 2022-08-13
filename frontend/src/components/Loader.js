import React, { useState } from "react";
import PropagateLoader, { css } from "react-spinners/PropagateLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{marginTop:'150px'}}>
      <div className="sweet-loading text-center">
        <PropagateLoader
          color="#000"
          loading={loading}
          cssOverride=""
          size={25}
        />
      </div>
    </div>
  );
}

export default Loader;
