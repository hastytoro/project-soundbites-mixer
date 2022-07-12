class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    // this.currentKick = "./media/kick-classic.wav";
    // this.currentSnare = "./media/snare-acoustic01.wav";
    // this.currentHihat = "./media/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-audio");
    this.snareAudio = document.querySelector(".snare-audio");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8; // steps can go only from 0 to 7.
    let activePads = document.querySelectorAll(`.b${step}`);
    console.log(activePads);
    // loop over currently active pads.
    activePads.forEach((pad) => {
      pad.style.animation = "playTrack 0.2s alternate ease-in-out 2";
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
    } else {
      // otherwise set/start the interval and repeat the steps!
      this.isPlaying = setInterval(() => this.repeat(), interval);
    }
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

  changeSound(event) {
    const { name, value } = event.target;
    // console.log(name, value);
    switch (name) {
      case "kick-select":
        this.kickAudio.src = value;
        break;
      case "snare-select":
        this.snareAudio.src = value;
        break;
      case "hihat-select":
        this.hihatAudio.src = value;
        break;
      default:
        throw new Error("Unable to match selection.");
    }
  }

  mute(event) {
    const muteIndex = event.target.getAttribute("data-track");
    // console.log(muteIndex);
    event.target.classList.toggle("active"); // toggle css class!
    if (event.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
        default:
          throw new Error("Unable to match selection.");
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
        default:
          throw new Error("Unable to match selection.");
      }
    }
  }

  updateTempoNu(event) {
    const tempoText = document.querySelector(".tempo-nr");
    this.bpm = event.target.value;
    tempoText.innerText = this.bpm;
  }

  updateTempo(event) {
    this.bpm = event.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains("active")) this.start();
  }
}

const drumKit = new DrumKit();

// event listeners:
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

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (event) {
    console.log(event.target);
    drumKit.changeSound(event);
  });
});

drumKit.muteBtn.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    drumKit.mute(event);
  });
});

drumKit.tempoSlider.addEventListener("input", function (event) {
  drumKit.updateTempoNu(event);
});

drumKit.tempoSlider.addEventListener("change", function (event) {
  drumKit.updateTempo(event);
});
