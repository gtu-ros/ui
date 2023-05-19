import React, { useState, useEffect } from 'react';
import "./ButtonBox.css";
import { useROS } from 'react-ros';
import ROSLIB, { Param } from 'roslib';
import { Button } from '@mui/material';

const ScienceControls = () => {
    const [isValve1On, setIsValve1On] = useState(false);
    const [isValve2On, setIsValve2On] = useState(false);
    const [isValve3On, setIsValve3On] = useState(false);
    const [isPump1On, setIsPump1On] = useState(false);
    const [isPump2On, setIsPump2On] = useState(false);
    const [activeMotorButton, setActiveMotorButton] = useState(null);
    const { ros } = useROS();

    const isMotor = new ROSLIB.Param({
        ros: ros,
        name: 'motorToGo'
    });
    const motorFlagParam = new ROSLIB.Param({
        ros: ros,
        name: 'motorFlag'
    });
    const valve1Param = new ROSLIB.Param({
        ros: ros,
        name: 'valve1'
    });
    const valve2Param = new ROSLIB.Param({
        ros: ros,
        name: 'valve2'
    });
    const valve3Param = new ROSLIB.Param({
        ros: ros,
        name: 'valve3'
    });
    const pump1Param = new ROSLIB.Param({
        ros: ros,
        name: 'pump1'
    });
    const pump2Param = new ROSLIB.Param({
        ros: ros,
        name: 'pump2'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            valve1Param.get((valve1Val) => {
                setIsValve1On(valve1Val === 0);
            });
            valve2Param.get((valve2Val) => {
                setIsValve2On(valve2Val === 0);
            });
            valve3Param.get((valve3Val) => {
                setIsValve3On(valve3Val === 0);
            });
            pump1Param.get((pump1Val) => {
                setIsPump1On(pump1Val === 0);
            });
            pump2Param.get((pump2Val) => {
                setIsPump2On(pump2Val === 1);
            });
            isMotor.get((motorVal) => {
                setActiveMotorButton(motorVal);
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleA = () => {
        isMotor.set(1);
        motorFlagParam.set(1);
    };

    const handleB = () => {
        isMotor.set(2);
        motorFlagParam.set(1);
    };

    const handleC = () => {
        isMotor.set(3);
        motorFlagParam.set(1);
    };

    const handleD = () => {
        isMotor.set(4);
        motorFlagParam.set(1);
    };

    const handleValve1 = () => {
        setIsValve1On(!isValve1On);
        valve1Param.set(isValve1On ? 1 : 0);
    };

    const handleValve2 = () => {
        setIsValve2On(!isValve2On);
        valve2Param.set(isValve2On ? 1 : 0);
    };

    const handleValve3 = () => {
        setIsValve3On(!isValve3On);
        valve3Param.set(isValve3On ? 1 : 0);
    };

    const handlePump1 = () => {
        setIsPump1On(!isPump1On);
        pump1Param.set(isPump1On ? 1 : 0);
    };

    const handlePump2 = () => {
        setIsPump2On(!isPump2On);
        pump2Param.set(isPump2On ? 0 : 1);
    };

    return (
        <div>
            <div className='btn-box'>
                MOTOR DIRECTION
                <div>
                    <Button
                        style={{ margin: '10px' }}
                        variant='contained'
                        size='large'
                        color={activeMotorButton === 1 ? "error" : "primary"}
                        onClick={handleA}
                    >
                        A
                    </Button>

                    <Button
                        style={{ margin: '10px' }}
                        variant='contained'
                        size='large'
                        color={activeMotorButton === 2 ? "error" : "primary"}
                        onClick={handleB}
                    >
                        B
                    </Button>

                    <Button
                        style={{ margin: '10px' }}
                        variant='contained'
                        size='large'
                        color={activeMotorButton === 3 ? "error" : "primary"}
                        onClick={handleC}
                    >
                        C
                    </Button>

                    <Button
                        style={{ margin: '10px' }}
                        variant='contained'
                        size='large'
                        color={activeMotorButton === 4 ? "error" : "primary"}
                        onClick={handleD}
                    >
                        D
                    </Button>
                </div>
            </div>
            <div className='btn-box'>
                VALVE BUTTONS
                <div>
                    <button className={isValve1On ? "switch-btn on" : "switch-btn off"} onClick={handleValve1}>
                        VALVE 1
                        <span className="slider" />
                    </button>
                    <button className={isValve2On ? "switch-btn on" : "switch-btn off"} onClick={handleValve2}>
                        VALVE 2
                        <span className="slider" />
                    </button>
                    <button className={isValve3On ? "switch-btn on" : "switch-btn off"} onClick={handleValve3}>
                        VALVE 3
                        <span className="slider" />
                    </button>
                </div>
            </div>

            <div className='btn-box'>
                PUMP BUTTONS
                <div style={{ textAlign: 'center' }}>
                    <button className={isPump1On ? "switch-btn on" : "switch-btn off"} onClick={handlePump1}>
                        PUMP 1
                        <span className="slider" />
                    </button>
                    <button className={isPump2On ? "switch-btn on" : "switch-btn off"} onClick={handlePump2}>
                        PUMP 2
                        <span className="slider" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScienceControls;
