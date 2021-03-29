const fullDashArray = 283;
let timerInterval;
let flag = false;

const {
    settings,
    startStop,
    shadow,
    submit,
    timerInput,
    autoStart,
    changeTheme,
    timerButton,
    baseTimerLabel,
} = globalThis;

timerButton.addEventListener("pointerdown", switchTimer);
settings.addEventListener("pointerdown", switchSetting);
shadow.addEventListener("pointerdown", settingsHidden);
submit.addEventListener("pointerdown", changeTimer);
autoStart.addEventListener("pointerdown", switchFlag);
changeTheme.addEventListener("pointerdown", switchFlag);
startStop.addEventListener("pointerdown", switchStartStop);

async function switchTimer(event) {
    if (event.target.tagName != "BUTTON") return;
    let timer = appTimer.getTimer(event.target.dataset.name);
    onTimesUp();
    baseTimerLabel.innerHTML = formatTime(timer.time);
    setCircleDasharray(timer);
}

async function switchStartStop() {
    flag != flag;
    
    
    if (timerInterval) {
        onTimesUp();
    } else {
        await startTimer(appTimer.currentTimer);
        appTimer.loopTimer()
    }
}

function startTimer(timer) {
    baseTimerLabel.innerHTML = formatTime(timer.timeLeft);
    return new Promise((resolve) => {
        timerInterval = setInterval(() => {
            if (flag){
                console.log(flag);
                resolve(true);
                onTimesUp();
            }
            timer.timePassed = timer.timePassed += 1;
            timer.timeLeft = timer.time - timer.timePassed;
            if (timer.timeLeft === -1) {
                resolve(false);
                onTimesUp();
                timer.timeLeft = timer.time;
                timer.timePassed = 0;
            }
            baseTimerLabel.innerHTML = formatTime(timer.timeLeft);
            setCircleDasharray(timer);
            setRemainingPathColor(timer.timeLeft);
        }, 1000);
    });
}



function setCircleDasharray(timer) {
    const circleDasharray = `${(
        calculateTimeFraction(timer) * fullDashArray
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

function calculateTimeFraction(timer) {
    const rawTimeFraction = timer.timeLeft / timer.time;
    return rawTimeFraction - (1 / timer.time) * (1 - rawTimeFraction);
}

function switchFlag(event) {
    if (!this == event.target) return;
    this.classList.toggle("button-left");
    if (this.id == "changeTheme") document.body.classList.toggle("light");
    else appTimer.autoStart != appTimer.autoStart;
}

function switchSetting() {
    shadow.hidden = !shadow.hidden;
}
function settingsHidden(event) {
    if (shadow == event.target || event.target.closest("#closeSetting"))
        switchSetting();
}

function changeTimer() {
    appTimer.updateTimer();
    switchSetting();
}

class Timer {
    constructor(name, time) {
        this.name = name, 
        this.time = time,
        this.timeLeft = time,
        this.timePassed = 0;
    }
    setNewTime(time) {
        this.time = time;
    }
}

class App {
    constructor() {
        this.arrTimer = [],
        this.autoStart = true,
        this.repeatLongBreak = 2;
        this.currentRound = 0;
    }
    addTimer(timers) {
        this.arrTimer = this.arrTimer.concat(timers);
    }
    updateTimer() {
        this.arrTimer.forEach((timer) => {
            const timerName = document.getElementById(timer.name);
            let seconds = Array.from(
                timerName.querySelectorAll("input")
            ).reduce((sum, input, index) => {
                let seconds = Number(input.value);
                if (index == 0) seconds *= 60;
                return (sum += seconds);
            }, 0);
            timer.setNewTime(seconds);
        });
    }
    getTimer(name) {
        console.log(this.currentTimer);
        this.arrTimer.forEach((timer) => {
            if (timer.name == name) {
                this.currentTimer = Object.assign({},timer)
            }
        });
        return this.currentTimer;
    }
    // async loopTimer() {
    //     while (
    //         this.currentRound !== this.repeatLongBreak ||
    //         !this.repeatLongBreak
    //     ) {
    //         this.currentRound++;
    //             let result = await startTimer(this.getTimer(this.arrTimer[0].name));
    //             if (this.currentTimer.timeLeft)
    //                 await startTimer(this.getTimer(this.arrTimer[1].name));
    //     }
    //     this.currentRound = 0;
    //     await startTimer(this.getTimer(this.arrTimer[0].name));
    //     await startTimer(this.getTimer(this.arrTimer[2].name));

    //     this.loopTimer();
    // }
    loopTimer(){
        if(this.currentRound == this.longBreak) {

        }
        if(!this.currentRound % 2) {

        }
        if(this.currentRound % 2) {

        }
    }
}

async function repeat(currentTimer) {
    let result = await startTimer(currentTimer);
    if(currentTimer.timeLeft) await startTimer(currentTimer);
}

const timerPomodoro = new Timer("timerPomodoro", 1);
const sortBreak = new Timer("sortBreak", 1);
const longBreak = new Timer("longBreak", 1);

const appTimer = new App();
appTimer.addTimer([timerPomodoro, sortBreak, longBreak]);
appTimer.currentTimer;

const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green",
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD,
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD,
    },
};

let remainingPathColor = COLOR_CODES.info.color;

function onTimesUp() {
    clearInterval(timerInterval);
    timerInterval = false;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timer) {
    const { alert, warning, info } = COLOR_CODES;
    if (timer.timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timer.timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

document
    .getElementById("base-timer-path-remaining")
    .classList.add(remainingPathColor);

    appTimer.loopTimer();