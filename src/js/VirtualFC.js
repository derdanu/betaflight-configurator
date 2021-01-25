'use strict';

const VirtualFC = {
    // these values are manufactured to unlock all the functionality of the configurator, they dont represent actual hardware
    setVirtualConfig() {
        const virtualFC = FC;

        virtualFC.resetState();

        virtualFC.CONFIG.flightControllerVersion = "4.2.4";
        virtualFC.CONFIG.apiVersion = CONFIGURATOR.virtualApiVersion;

        virtualFC.FEATURE_CONFIG.features = new Features(FC.CONFIG);
        virtualFC.FEATURE_CONFIG.features.setMask(0);

        virtualFC.BEEPER_CONFIG.beepers = new Beepers(FC.CONFIG);
        virtualFC.BEEPER_CONFIG.dshotBeaconConditions = new Beepers(FC.CONFIG, [ "RX_LOST", "RX_SET" ]);

        virtualFC.MIXER_CONFIG.mixer = 3;

        virtualFC.MOTOR_DATA = Array.from({length: 8});
        virtualFC.MOTOR_3D_CONFIG = {
            deadband3d_low: 1406,
            deadband3d_high: 1514,
            neutral: 1460,
        };
        virtualFC.MOTOR_CONFIG = {
            minthrottle: 1070,
            maxthrottle: 2000,
            mincommand: 1000,
            motor_count: 4,
            motor_poles: 14,
            use_dshot_telemetry: true,
            use_esc_sensor: false,
        };

        virtualFC.SERVO_CONFIG = Array.from({length: 8});

        for (let i = 0; i < virtualFC.SERVO_CONFIG.length; i++) {
            virtualFC.SERVO_CONFIG[i] = {
                middle: 1500,
                min: 1000,
                max: 2000,
                indexOfChannelToForward: 255,
                rate: 100,
                reversedInputSources: 0,
            };
        }

        virtualFC.ADJUSTMENT_RANGES = Array.from({length: 16});

        for (let i = 0; i < virtualFC.ADJUSTMENT_RANGES.length; i++) {
            virtualFC.ADJUSTMENT_RANGES[i] = {
                slotIndex: 0,
                auxChannelIndex: 0,
                range: {
                    start: 900,
                    end: 900,
                },
                adjustmentFunction: 0,
                auxSwitchChannelIndex: 0,
            };
        }

        virtualFC.SERIAL_CONFIG.ports = Array.from({length: 6});

        virtualFC.SERIAL_CONFIG.ports[0] = {
            identifier: 20,
            auxChannelIndex: 0,
            functions: ["MSP"],
            msp_baudrate: 115200,
            gps_baudrate: 57600,
            telemetry_baudrate: "AUTO",
            blackbox_baudrate: 115200,
        };

        for (let i = 1; i < virtualFC.SERIAL_CONFIG.ports.length; i++) {
            virtualFC.SERIAL_CONFIG.ports[i] = {
                identifier: i-1,
                auxChannelIndex: 0,
                functions: [],
                msp_baudrate: 115200,
                gps_baudrate: 57600,
                telemetry_baudrate: "AUTO",
                blackbox_baudrate: 115200,
            };
        }

        virtualFC.LED_STRIP = Array.from({length: 256});

        for (let i = 0; i < virtualFC.LED_STRIP.length; i++) {
            virtualFC.LED_STRIP[i] = {
                x: 0,
                y: 0,
                functions: ["c"],
                color: 0,
                directions: [],
                parameters: 0,
            };
        }

        virtualFC.ANALOG = {
            voltage: 12,
            mAhdrawn: 1200,
            rssi: 100,
            amperage: 3,
        };

        virtualFC.CONFIG.sampleRateHz  = 12000;
        virtualFC.PID_ADVANCED_CONFIG.pid_process_denom = 2;

        virtualFC.BLACKBOX.supported = true;

        virtualFC.VTX_CONFIG.vtx_type = 1;

        virtualFC.BATTERY_CONFIG = {
            vbatmincellvoltage: 1,
            vbatmaxcellvoltage: 4,
            vbatwarningcellvoltage: 3,
            capacity: 10000,
            voltageMeterSource: 1,
            currentMeterSource: 1,
        };

        virtualFC.BATTERY_STATE = {
            cellCount: 10,
            voltage: 20,
            mAhDrawn: 1000,
            amperage: 3,
        };

        virtualFC.DATAFLASH = {
            ready: true,
            supported: true,
            sectors: 1024,
            totalSize: 40000,
            usedSize: 10000,
        };

        virtualFC.SDCARD = {
            supported: true,
            state: 1,
            freeSizeKB: 1024,
            totalSizeKB: 2048,
        };

        virtualFC.SENSOR_CONFIG = {
            acc_hardware: 1,
            baro_hardware: 1,
            mag_hardware: 1,
        };

        virtualFC.RC = {
            channels: Array.from({length: 16}),
            active_channels: 16,
        };
        for (let i = 0; i < virtualFC.RC.channels.length; i++) {
            virtualFC.RC.channels[i] = 1500;
        }

        // from https://github.com/betaflight/betaflight/blob/master/docs/Modes.md
        virtualFC.AUX_CONFIG = ["ARM","ANGLE","HORIZON","ANTI GRAVITY","MAG","HEADFREE","HEADADJ","CAMSTAB","PASSTHRU","BEEPERON","LEDLOW","CALIB",
        "OSD","TELEMETRY","SERVO1","SERVO2","SERVO3","BLACKBOX","FAILSAFE","AIRMODE","3D","FPV ANGLE MIX","BLACKBOX ERASE","CAMERA CONTROL 1",
        "CAMERA CONTROL 2","CAMERA CONTROL 3","FLIP OVER AFTER CRASH","BOXPREARM","BEEP GPS SATELLITE COUNT","VTX PIT MODE","USER1","USER2",
        "USER3","USER4","PID AUDIO","PARALYZE","GPS RESCUE","ACRO TRAINER","DISABLE VTX CONTROL","LAUNCH CONTROL"];
        FC.AUX_CONFIG_IDS = [0,1,2,4,5,6,7,8,12,13,15,17,19,20,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,39,40,41,42,43,44,45,46,47,48,49];

        for (let i = 0; i < 16; i++) {
            virtualFC.RXFAIL_CONFIG[i] = {
                mode: 1,
                value: 1500,
            };
        }

        // 11 1111 (pass bitchecks)
        virtualFC.CONFIG.activeSensors = 63;
    },
    setupVirtualOSD(){
        const virtualOSD = OSD;

        virtualOSD.data.video_system = 1;
        virtualOSD.data.unit_mode = 1;

        virtualOSD.virtualMode = {
            itemPositions: Array.from({length: 60}),
            statisticsState: [],
            warningFlags: 0,
            timerData: [],
        };

        virtualOSD.data.state = {
            haveMax7456Configured: true,
            haveOsdFeature: true,
            haveMax7456FontDeviceConfigured: true,
            isMax7456FontDeviceDetected: true,
            haveSomeOsd: true,
        };

        virtualOSD.data.parameters = {
            cameraFrameWidth: 30,
            cameraFrameHeight: 30,
        };

        virtualOSD.data.osd_profiles = {
            number: 3,
            selected: 0,
        };

        virtualOSD.data.alarms = {
            rssi: { display_name: i18n.getMessage('osdTimerAlarmOptionRssi'), value: 0 },
            cap: { display_name: i18n.getMessage('osdTimerAlarmOptionCapacity'), value: 0 },
            alt: { display_name: i18n.getMessage('osdTimerAlarmOptionAltitude'), value: 0 },
            time: { display_name: 'Minutes', value: 0 },
        };
    },
};
