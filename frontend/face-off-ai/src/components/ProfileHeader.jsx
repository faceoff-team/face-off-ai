import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import HorizontalLine from "../components/HorizontalLine.jsx";
import store from "../store.js";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const handleAddFriend = async(pageUsername) => {
    try {
        var name; 
        if (store.getState().auth.isAuthenticated) {
            name = store.getState().auth.user.username;
        }
        const response = await axios.post(`https://ai.faceoff.cf/api/user/profile/${pageUsername}`);

    } catch (err) {
        console.error(err);
    }
};

function GetProfileButtonType(pageUsername) {
    var name; 
    if (store.getState().auth.isAuthenticated) {
        name = store.getState().auth.user.username;
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    

    try {
        if (name.localeCompare(pageUsername) == 0) {
            return (<div><Button variant="contained" size="small" color="secondary" onClick={handleOpen}>Edit Profile</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>

                    <h1 class="font-weight-heavy" style={{marginTop: "10px"}}>Profile Settings</h1>
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
                        <Grid>
                            <form action="/api/user/profile/pic" method="post" enctype="multipart/form-data">
                                <input type="file" name="profile" id="profilePicture" />
                                <input type="submit" value="Update Picture"/>
                            </form>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Bio" variant="filled" />
                        </Grid>
                    </Grid>
                    <br/>
                    <br/>
                    <Stack direction="row" spacing={2}>
                        <Button size="medium" variant="contained" color="secondary" onClick={handleClose}>
                            Confirm Changes
                        </Button>
                        <Button size="medium" variant="contained" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            </div>);
        } else {
            return  (<Button variant="contained" size="small" color="secondary" onClick={handleAddFriend}>Add to Friends</Button>);
        }
    } catch (err) {
        
    }

}

function ProfileHeader({ username, picture, bio }) {
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Grid container row>
                <Grid>
                <Avatar 
                    variant="circular" 
                    src={picture}
                    style={{ height: '100px', width: '100px' }}
                />
                <h1 class="font-weight-heavy">{username}</h1>
                <span class="font-small">{bio}</span>
                </Grid>
            </Grid>
            <HorizontalLine color="#f7f7f7" width="100%"/>
            {GetProfileButtonType(username)}
        </div>
    );
}

export default ProfileHeader
