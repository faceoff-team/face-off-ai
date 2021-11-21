import React from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Error404() {
    return (
        <div class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy" style={{ marginTop: "10px" }}>
                    <ErrorOutlineIcon fontSize="large" /> Oops... 404 Error</h1>
            </div>
        </div>
    );
}

export default Error404;