// helper functions to display gaze information and dot in browser.


// show gaze information on screen.
function showGazeInfoOnDom (gazeInfo) {
  let gazeInfoDiv = document.getElementById("gazeInfo")
  gazeInfoDiv.innerText = `Gaze Information Below
                          \nx: ${gazeInfo.x}
                          \ny: ${gazeInfo.y}
                          `
}

// hide gaze information on screen.
function hideGazeInfoOnDom () {
  let gazeInfoDiv = document.getElementById("gazeInfo");
  gazeInfoDiv.innerText = "";
}

// show gaze dot on screen.
function showGazeDotOnDom (gazeInfo) {
  let canvas = document.getElementById("output")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = '#00e508' /*  포인터 색상  */
  ctx.clearRect(0, 0, canvas.width, canvas.height )
  ctx.beginPath();            /*  포인터 크기  */
  ctx.arc(gazeInfo.x, gazeInfo.y,3, 0, Math.PI * 2, true);
  ctx.fill();
}

function hideGazeDotOnDom() {
  let canvas = document.getElementById("output");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height );
}

function showGaze(gazeInfo) {
  showGazeInfoOnDom(gazeInfo)
  showGazeDotOnDom(gazeInfo)
}

function hideGaze(){
  hideGazeInfoOnDom();
  hideGazeDotOnDom();
}

export { showGaze, hideGaze }