import React from "react";
import { Tabs, Tab, Box } from "@mui/material/";
import Typography from "@mui/material/Typography";

import AccountList from "../components/AccountList.jsx";
import GameList from "../components/GameList.jsx";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfileBody(username) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                variant="fullWidth" 
                centered
                value={value}
                textColor="secondary"
                indicatorColor="secondary"
                onChange={handleChange}>
                    <Tab label="Past Games" {...a11yProps(0)} />
                    <Tab label="Statistics" {...a11yProps(1)} />
                    <Tab label="Friends" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <GameList username="MustardMan900" title="Past Games"/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                    High Score: 230203
                </div>
                <div>
                    Low Score: 903
                </div>
                <div>
                    Average Score: 12030
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AccountList />
            </TabPanel>
        </Box>
    );
}