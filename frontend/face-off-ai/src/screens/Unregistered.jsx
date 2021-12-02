import React from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from "react-router-dom";

function Unregistered() {
    return (
        <div class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy" style={{ marginTop: "10px" }}>
                <ErrorOutlineIcon fontSize="large"/> Looks like you're trying to access content only registered users can access...
                </h1>
                <br/>
                <br/>
                <h3 class="font-weight-heavy" style={{ marginTop: "10px" }}>
                    Don't worry! To start saving your progress, sign up for a free account&nbsp;
                    <Link to={`/register`}>
                        here
                    </Link>
                </h3>
            </div>
        </div>
    );
}

export default Unregistered;