import React, { useState } from 'react';
import TooltipCustom from '../shared/TooltipCustom';
import db from '../firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ChatIcon from '@material-ui/icons/Chat';
import { firebase } from '../firebase';

function NewChat() {
    const [roomName, setRoomName] = useState("");
    const [open, setOpen] = useState(false);
    
    const handleNewChatOpen = () => {
        setOpen(true);
    };

    const handleNewChatClose = () => {
        setOpen(false);
        setRoomName("");
    };

    const createChat = (e) => {
        e.preventDefault();

        if(roomName) {
          db.collection('rooms')
            .add({
                name: roomName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        setOpen(false);
        setRoomName("");
    }


    return (
        <div>
            <TooltipCustom name="New Chat" onClick={() => handleNewChatOpen()} icon={<ChatIcon />}/>

            <Dialog open={open} onClose={handleNewChatClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Room Name</DialogTitle>
                <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Room Name"
                    type="text"
                    fullWidth
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleNewChatClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={createChat} color="primary">
                    Create
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewChat