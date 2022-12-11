//////////////////////////////
//////////////////////////////
const screenshotBtn = document.querySelector("#src-btn"),
  screenshotPreview = document.querySelector(".src-preview"),
  closeBtn = screenshotPreview.querySelector("#close-btn");

const captuerScreen = async function () {
  try {
    // asking permission to use a media input to record current tab
    const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    });
    const video = document.createElement("video");

    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      // passing video width & video height as canvas width & height
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      video.play(); // playing the video so the drawn image won;t be playing
      // drawing an image from the captured video stream
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      stream.getVideoTracks()[0].stop(); // termainating first video track of the stream

      // passing canvas data url as screenshot prevview src
      screenshotPreview.querySelector("img").src = canvas.toDataURL();
      screenshotPreview.classList.add("show");
    });
    video.srcObject = stream; // passing capture stream data as video source object
  } catch (error) {
    alert("failed to capture screen");
  }
};
closeBtn.addEventListener("click", () =>
  screenshotPreview.classList.remove("show")
);
screenshotBtn.addEventListener("click", captuerScreen);
