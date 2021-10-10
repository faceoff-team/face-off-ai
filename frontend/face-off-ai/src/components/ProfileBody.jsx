import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

function ProfileBody(value, handleChange) {
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange}>
                <Tab label="Statistics"/>
                <Tab label="Past Games" />
                <Tab label="Friends" />
            </Tabs>
            </Box>
        </div>
    );
}

export default ProfileBody