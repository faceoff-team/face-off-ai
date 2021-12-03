import React from "react";
import { Tabs, Tab, Box } from "@mui/material/";
import Typography from "@mui/material/Typography";
import HorizontalLine from "../components/HorizontalLine.jsx";

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

export default function ProfileBody({username, highScore, lowScore, pastGames}) {

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
                <GameList username={username} title="Past Games" games={pastGames}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h1 className="font-weight-heavy-small">{username}'s Statistics</h1>
                <HorizontalLine color="#f7f7f7" width="100%" />
                <div>
                    High Score: {highScore >= 0 ? highScore : "No games played yet"}
                </div>
                <div>
                    Low Score: {lowScore >= 0 ? highScore : "No games played yet"}
                </div>
                
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AccountList title={`${username}'s Friends`}/>
            </TabPanel>
        </Box>
    );
}