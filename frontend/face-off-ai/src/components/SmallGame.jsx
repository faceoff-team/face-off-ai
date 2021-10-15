import React from "react";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";


function SmallGame({ date, gamehighscore }) {
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
                    </Grid>
            </div>
        </div>
    );
}

export default SmallGame;