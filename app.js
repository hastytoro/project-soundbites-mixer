class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-audio");
    this.snareAudio = document.querySelector(".snare-audio");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }
  repeat() {
    let step = this.index % 8; // steps can go only from 0 to 7.
    const activePads = document.querySelectorAll(`.b${step}`);
    console.log(activePads);
    // loop over currently active pads.
    activePads.forEach((pad) => {
      pad.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      // check which pads are active.
      if (pad.classList.contains("active")) {
        // then check which of the trio in the column is selected:
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000; // working out bpm.
    // if currently playing then clear the interval:
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.index = 0; // toggle this setting if needed.
    } else {
      // otherwise set/start the interval and repeat the steps!
      this.isPlaying = setInterval(() => this.repeat(), interval);
    }
  }
  activePad() {
    this.classList.toggle("active");
  }
  updateBtn() {
    if (this.isPlaying) {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    } else {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    }
  }
}

const drumKit = new DrumKit();
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = ""; // clear animation so we can add it again
  });
});
drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});
