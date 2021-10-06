import React from "react";

function HorizontalLine({ color, width }) {
    return (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                width: width,
                height: 0.25,
                padding: "-10"
            }}
        />
    );
}

export default HorizontalLine;
