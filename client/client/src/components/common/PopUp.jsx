import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Box, Typography, Button } from '@mui/material';
import { hideModal } from '../../redux/actions/modalActions';

const PopUp = () => {
    const { isVisible, content } = useSelector(state => state.modal);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideModal());
    };

    return (
        <Modal
            open={isVisible}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography id="modal-title" variant="h6" component="h2">
                    {content?.title}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    {content?.message}
                </Typography>
                <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
            </Box>
        </Modal>
    );
};

export default PopUp;
