const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const stopbut = document.getElementById("btn-stop-qr");

let scanning = false;

qrcode.callback = res => {
  if (res) {
    window.location.assign("https://script.google.com/macros/s/AKfycbxBho6ZDKwVZsd7VOlt3k91wL32rx8tX4dCN9oqOM9n1nujyyXKO4G6/exec?ID="+res)
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    canvasElement.hidden = true;
    btnScanQR.hidden = false;
    stopbut.hidden = true;
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
        scanning = true;
        btnScanQR.hidden = true;
        stopbut.hidden = false;
        canvasElement.hidden = false;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.srcObject = stream;
        video.play();
        tick();
        scan();
    });
};

stopbut.onclick = () => {
  scanning = false;

  video.srcObject.getTracks().forEach(track => {
    track.stop();
  });

  canvasElement.hidden = true;
  btnScanQR.hidden = false;
  stopbut.hidden = true;
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 100);
  } 
}


var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 2000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

