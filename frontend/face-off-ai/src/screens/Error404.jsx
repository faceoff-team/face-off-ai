import React from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Error404(props) {
    var message = "Oops... 404 Error";

    if (props.message) {
        message = props.message;
    }

    return (
        <div class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy" style={{ marginTop: "10px" }}>
                    <ErrorOutlineIcon fontSize="large" />{message}</h1>
            </div>
        </div>
    );
}

export default Error404;