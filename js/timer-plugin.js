class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerRef = document.querySelector(`${this.selector}`);
    this.refs = {
      timerDays: this.timerRef.querySelector('span[data-value="days"]'),
      timerHours: this.timerRef.querySelector('span[data-value="hours"]'),
      timerMins: this.timerRef.querySelector('span[data-value="mins"]'),
      timerSecs: this.timerRef.querySelector('span[data-value="secs"]')
    };
    this.timerId = 0;
    this.startTime = 0;
    this.deltaTime = 0;

    this.start();
  }

  start() {
    this.timerId = setInterval(() => {
      this.startTime = Date.now();

      this.deltaTime = this.targetDate.getTime() - this.startTime;

      if (this.deltaTime < 0) {
        this.stop();
      }

      this.updateTimer(this.deltaTime);
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
    this.deltaTime = 0;
    this.updateTimer(this.deltaTime);
  }

  updateTimer(time) {
    this.refs.timerDays.textContent = this.pad(
      Math.floor(time / (1000 * 60 * 60 * 24))
    );
    this.refs.timerHours.textContent = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    this.refs.timerMins.textContent = this.pad(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    );
    this.refs.timerSecs.textContent = this.pad(
      Math.floor((time % (1000 * 60)) / 1000)
    );
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jan 24, 2020")
});
