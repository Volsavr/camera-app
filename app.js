// Set constraints for the video stream
var constraintsForUserCamera = { video: { facingMode: "user" }, audio: false };
var constraintsForMainCamera = { video: { facingMode: "environment" }, audio: false };
var isMainCameraActive = true;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
	cameraSwapTrigger = document.querySelector("#camera--swap--trigger")
	
// Access the device camera and stream to cameraView
function cameraStart(constraints) {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

function appLoad(){
  cameraStart(constraintsForMainCamera);
}

// Take a picture when button is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

// Swap camera a picture when cameraTrigger is tapped
cameraSwapTrigger.onclick = function() {
    if(isMainCameraActive)
       cameraStart(constraintsForUserCamera);
    else
       cameraStart(constraintsForMainCamera);

   isMainCameraActive = !isMainCameraActive;
};

// Start the video stream when the window loads
window.addEventListener("load", appLoad, false);
