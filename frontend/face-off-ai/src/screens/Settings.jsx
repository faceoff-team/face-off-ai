import React from "react";
import {Grid, Stack, Button, TextField } from "@mui/material";
import { http } from "../store"
import store from "../store";

function Settings() {

    const photoRef = useRef(null);
    const userRef = useRef(null);
    const bioRef = useRef(null);
    const password1Ref = useRef(null);
    const password2Ref = useRef(null);

    const handleSubmit = async () => {
        let params = {
            photo: photoRef.current.value,
            user: userRef.current.value,
            bio: bioRef.current.value,
        }
        if (!photoRef.current.value) {
            params.photo = store.getState().auth.user.photo
        }
        if (!userRef.current.value) {
            params.user = store.getState().auth.user.username
        }
        if (!bioRef.current.value) {
            params.bio = store.getState().auth.user.bio
        }

        try {
            const res = await http.put("/api/user/profile", {
                username: params.user,
                bio: params.bio,
            });
            
        }
        catch (err) {
            console.log(err);
        }

    }

    const handleCancel = () => {

    }

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
                        <TextField label="Pic link" variant="filled" inputRef={photoRef}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size="medium">
                            Change Username
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Name" variant="filled" inputRef={userRef}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size="medium">
                            Change Bio
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Bio" variant="filled" inputRef={bioRef} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button size="medium">
                            New Password
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Password1" variant="filled" inputRef={password1Ref}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size="medium">
                            Confirm New Password
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Pic link" variant="filled" inputRef={password2Ref}/>
                    </Grid>
                </Grid>
                <br /><br />
                <Stack direction="row" spacing={2}>
                    <Button size="medium" variant="contained" color="secondary" onClick={handleSubmit}>
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