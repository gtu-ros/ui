import React from 'react';
import ROSLIB from 'roslib';
import { useROS } from 'react-ros';
import { Box, Button, Paper, Typography } from '@mui/material';

const CameraRotation = () => {
    const { ros } = useROS();

    const topic = new ROSLIB.Topic({
        ros: ros,
        name: '/cam_rotation', // Topik ismini ihtiyacınıza göre değiştirin
        messageType: 'std_msgs/String'
    });

    const handleButtonClick = (message) => {
        const rosMessage = new ROSLIB.Message({
            data: message
        });
        topic.publish(rosMessage);
    };

    return (
        <div>
            <Container title="Camera Rotation Controls">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleButtonClick('u')}
                    >
                        Up
                    </Button>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleButtonClick('k')}
                        >
                            Left
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleButtonClick('l')}
                        >
                            Right
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleButtonClick('j')}
                    >
                        Down
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

const Container = ({ children, title }) => (
    <Paper sx={{ p: 1, m: 1, backgroundColor: (theme) => theme.palette.grey[100] }}>
        <Typography component="h2" variant="subtitle2" color="secondary">
            {title}
        </Typography>
        {children}
    </Paper>
);

export default CameraRotation;
