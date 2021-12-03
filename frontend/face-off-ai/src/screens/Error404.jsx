import React from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from "react-router-dom";

function Error404(props) {
    var message = "Oops... 404 Error";
    var link = "/home";
    var linkText = "Return to Home"

    if (props.message) {
        message = props.message;
    }

    if (props.link) {
        link = props.link;
        linkText = props.linkText;
    }

    return (
        <div class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy" style={{ marginTop: "10px" }}>
                    <ErrorOutlineIcon fontSize="large" />{message} <Link to={link}>{linkText}</Link></h1>
                
            </div>
        </div>
    );
}

export default Error404;