input.onLogoEvent(TouchButtonEvent.Released, function () {
    basic.showIcon(IconNames.Umbrella)
})
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Skull)
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Duck)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.TShirt)
})
input.onGesture(Gesture.Shake, function () {
    if (State == 1) {
        motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, Speed - 100)
    } else if (State == 2) {
        motor.MotorRun(motor.Motors.M1, motor.Dir.CW, Speed - 100)
    }
})
let Time = 0
let Speed = 0
let State = 0
basic.showArrow(ArrowNames.NorthEast)
basic.showString("Ready")
basic.forever(function () {
    State = 0
    if (pins.digitalReadPin(DigitalPin.P16) == 1) {
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Yes)
    }
    basic.pause(200)
    if (pins.digitalReadPin(DigitalPin.P12) == 0) {
        basic.showIcon(IconNames.Happy)
    }
    Speed = 255
    if (pins.digitalReadPin(DigitalPin.P8) == 0 && pins.digitalReadPin(DigitalPin.P16) == 0) {
        Time = 7
        motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, Speed)
        State = 1
        while (Time > 0) {
            basic.showString("" + (Time))
            Time += -1
            basic.pause(1000)
            if (pins.digitalReadPin(DigitalPin.P15) == 0) {
                motor.motorStop(motor.Motors.M1)
                Time = 0
            }
        }
        motor.motorStop(motor.Motors.M1)
        basic.pause(2000)
        Time = 7
        motor.MotorRun(motor.Motors.M1, motor.Dir.CW, Speed)
        State = 2
        while (Time > 0) {
            basic.showString("" + (Time))
            Time += -1
            basic.pause(1000)
            if (pins.digitalReadPin(DigitalPin.P15) == 0) {
                motor.motorStop(motor.Motors.M1)
                Time = 0
            }
        }
        motor.motorStop(motor.Motors.M1)
        music.setVolume(255)
        basic.pause(100)
        basic.showString("END")
    }
})
