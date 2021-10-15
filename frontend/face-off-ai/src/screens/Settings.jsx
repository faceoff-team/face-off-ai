import React from "react";
import {Grid, Stack, Button, TextField } from "@mui/material";

function Settings() {

    return (
        <div className="settings" class="container">
            <div class="basic-container">
                <h1 class="font-weight-heavy">Settings</h1>
                <h1 class="font-weight-heavy-small" >Profile Settings</h1>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Button size="medium">
                            Change Profile Picture
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Pic link" variant="filled" />
                    </Grid>
                    <Grid item xs={6}>
                        <Button size="medium">
                            Change Username
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Name" variant="filled" />
                    </Grid>
                    <Grid item xs={6}>
                        <Button size="medium">
                            Change Bio
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Bio" variant="filled" />
                    </Grid>
                </Grid>
                <br /><br />
                <Stack direction="row" spacing={2}>
                    <Button size="medium" variant="contained" color="secondary">
                        Confirm Changes
                    </Button>
                    <Button size="medium" variant="contained" color="secondary">
                        Cancel
                    </Button>
                </Stack>
            </div>
        </div>
    );
}

export default Settings;