const player = document.querySelector(".player");
const toggle = player.querySelector(".toggle");
const video = player.querySelector(".viewer");
const progressBar = player.querySelector(".progress__filled");
const videoTimer = player.querySelector(".player__timer");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const progress = player.querySelector(".progress");
const screenSize = player.querySelector(".player__screen");

//play - pause
const togglePlay = () => {
  if (video.paused) {
    video.play();
    toggle.textContent = "❚ ❚";
  } else {
    video.pause();
    toggle.textContent = "►";
  }
};

//video time format
const toHHMMSS = (timeSec) => {
  var secs = parseInt(timeSec, 10);
  var hh = Math.floor(secs / 3600);
  var mm = Math.floor(secs / 60) % 60;
  var ss = secs % 60;

  return [hh, mm, ss]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

//progress - bar
const handleProgress = () => {
  progressBar.style.flexBasis = `${
    (video.currentTime / video.duration) * 100
  }%`;

  //update video time
  videoTimer.innerHTML = toHHMMSS(video.duration - video.currentTime) + " / ";
  videoTimer.innerHTML += toHHMMSS(video.duration);
};

const handleSkip = (e) => {
  video.currentTime += parseFloat(e.srcElement.dataset.skip);
};

const handleRange = (e) => {
  video[e.srcElement.name] = e.srcElement.value;
};

const handleTrack = (e) => {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
};

const toggleScreen = () => {
  if (video.requestFullscreen) video.requestFullscreen();
  else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
  else if (video.msRequestFullscreen) video.msRequestFullscreen();
};

//event listeners
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);
[...skipButtons].map((button) => button.addEventListener("click", handleSkip));
[...ranges].map((range) => {
  range.addEventListener("change", handleRange),
    range.addEventListener("mousemove", handleRange);
});

var isMouseDown = false;
progress.addEventListener("mousedown", () => (isMouseDown = true));
progress.addEventListener("mouseup", () => (isMouseDown = false));
progress.addEventListener("mousemove", (e) => isMouseDown && handleTrack(e));

screenSize.addEventListener("click", toggleScreen);
