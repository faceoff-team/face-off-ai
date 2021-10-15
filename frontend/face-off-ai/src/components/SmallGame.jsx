import React from "react";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';


function ResultIcon(props) {
    
    const won = props.win;

    if (won === "true") {
        const winner = "Won"
        return (    
                <Grid>
                    <span> Result: {winner}</span>
                    <ControlPointIcon style={{ color: "#358679", marginLeft: "5px" }} />
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
                                borderRight: '0.1em solid white',
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
                                borderRight: '0.1em solid white',
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