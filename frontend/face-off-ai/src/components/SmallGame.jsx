import React from "react";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';


function ResultIcon(props) {
    
    const won = props.win;

    if (won === "true") {
        const winner = "Won"
        return (    
                <Grid>
                    <span> Result: {winner}</span>
                    <AddBoxIcon style={{ color: "#358679", marginLeft: "5px" }} />
                </Grid>
        );
    } else {
        const loser = "Lost"
        return (
            <Grid>
                <span> Result: {loser}</span>
                <IndeterminateCheckBoxIcon style={{ color: "#a32643", marginLeft: "5px" }} />
            </Grid>
        );
        
    }
}

function SmallGame({ date, gamehighscore, result }) {
    if (date.length >= 10) {
        date = date.substring(0, 10);
    }

    return (
        <div class="small-game">
            <div class="row">
                    <Grid container>
                        <Grid>
                            {date}
                        </Grid>
                        <Box 
                            sx={{
                                display: 'flex',
                                borderRight: '0.05em solid #303134',
                                marginRight: '10px',
                                marginLeft: '10px'
                            }}
                        >
                            <Divider orientation="vertical" flexItem />
                        </Box>
                        <Grid>
                            <div> High Score: {gamehighscore}</div>
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                borderRight: '0.05em solid #303134',
                                marginRight: '10px',
                                marginLeft: '10px'
                            }}
                        >
                            <Divider orientation="vertical" flexItem />
                        </Box>
                        <ResultIcon win={result} />
                    </Grid>
            </div>
        </div>
    );
}

export default SmallGame;