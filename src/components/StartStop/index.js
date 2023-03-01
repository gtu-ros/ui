import React, { useState, useEffect } from 'react';
import "./SwitchButton.css";
import { useROS } from 'react-ros';
import ROSLIB, { Param } from 'roslib';

const StartStop = () => {
    const [isOn, setIsOn] = useState(false);
    const { ros } = useROS();

    const isStart = new ROSLIB.Param({
        ros: ros,
        name: 'start'
    }); // ROSLIB.Param object to interact with a ROS parameter called 'start'

    useEffect(() => {
        const interval = setInterval(() => {
            isStart.get(function (value) {     // Get the current value of the 'start' parameter
                if (value === 0) {             // If the value is 0, set the button off
                    setIsOn(false);
                } else if (value === 1) {     // If the value is 1, set the button on
                    setIsOn(true);
                }
            });
        }, 500);           // Check every 500 ms
        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        setIsOn(!isOn);
        isStart.set(isOn ? 0 : 1);    // Set the 'start' parameter 0 if the button is off, or 1 if it's on
    };

    return (
        <button className={isOn ? "switch-btn on" : "switch-btn off"} onClick={handleClick}>
            <span className="slider" />
            {isOn ? "STOP" : "START"}
        </button>
    );
};

export default StartStop;
