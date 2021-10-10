import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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

export default function ProfileBody() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                variant="fullWidth" 
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
                Insert Past Games here
            </TabPanel>
            <TabPanel value={value} index={1}>
                Insert Statistics here
            </TabPanel>
            <TabPanel value={value} index={2}>
                Insert Friends list here
            </TabPanel>
        </Box>
    );
}