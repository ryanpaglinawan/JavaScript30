const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const videoStream = () => {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();
  });
};

const showCanvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 10);
};

const takePhoto = () => {
  const link = document.createElement("a");
  const data = canvas.toDataURL("image/jpeg");
  let ctr = strip.children.length + 1;
  link.href = data;
  link.setAttribute("download", `Photo-${ctr}`);
  link.innerHTML = `<img src="${data}" alt="Photo-${ctr}" />`;
  strip.insertBefore(link, strip.firstChild);
  snap.currentTime = 0;
  snap.play();
};

videoStream();
video.addEventListener("canplay", showCanvas);
