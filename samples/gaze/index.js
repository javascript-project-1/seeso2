import 'regenerator-runtime/runtime';
import { sketch } from 'p5js-wrapper';
import { showGaze } from '../showGaze';

// npm module
import EasySeeSo from 'seeso/easy-seeso';
import { UserStatusOption } from 'seeso';

const licenseKey = 'dev_vjs9bllzcpqgpz9e4yn7tf8lzbr8q0w6ha9tmgmt'; // Issue license key! -> https://console.seeso.io

// // const canvas = document.querySelector('#output');

let x = 0;
let y = 0;
let pX = 0;
let pY = 0;
let leftEye = 0;
let color = ['red','orange','blue','yellow','green'];
let pickColor = getColor(color);


// gaze callback.
function onGaze(gazeInfo) {

  console.log( gazeInfo );
  // do something with gaze info.
  x = gazeInfo.x;
  y = gazeInfo.y;
  
  
  setTimeout(() => {
    pX = gazeInfo.x
    pY = gazeInfo.y
  }, 30);

  // console.log(x - pX);

  showGaze(gazeInfo);

}

// debug callback.
function onDebug(FPS, latency_min, latency_max, latency_avg) {
  
  // do something with debug info.
}

function onAttention(callback) {
  console.log(callback);
}


function onBlink(timestamp, isLeftBlink, isRightBlink, isBlink, leftOpnness, rightOpenness){
  // console.log(leftOpnness);


  

  if(isRightBlink){ // 오른쪽 눈 깜빡이면 랜덤한 색상 나오기 
    pickColor = getColor(color); 
  }

  leftEye = leftOpnness

  if(isBlink){ // 양쪽 눈 깜빡이면 캔버스 지우기 
    sketch.clear();
  }
}

function onDrowsiness (callback){

}


async function main() {
  const seeSo = new EasySeeSo();
  let option = new UserStatusOption(true, true, true) 
  /**
   * set monitor size.    default: 16 inch.
   * set face distance.   default: 30 cm.
   * set camera position. default:
   * camera x: right center
   * cameraOnTop: true
   */

  await seeSo.init(
    licenseKey,
    () => {
      seeSo.setMonitorSize(14);
      seeSo.setFaceDistance(50);
      seeSo.setCameraPosition(window.outerWidth / 2, true);
      seeSo.setUserStatusCallback(onAttention, onBlink, onDrowsiness);
      seeSo.startTracking(onGaze, onDebug);

      // console.log(seeSo);


      // console.log(version);
    }, // callback when init succeeded.
    () => {
      console.log('finish');
    },
    option
  );
}

(async () => {
  await main();
})();

sketch.setup = function () {
  const canvas = createCanvas(innerWidth, innerHeight);
  canvas.parent('container');
  // background("beige");
  stroke(100, 100);
  colorMode(HSB);
};




function getColor(arr){

  
  let n = Math.floor(Math.random() * (arr.length - 1));

  
  return arr[n]
  
}



sketch.draw = function () {
  // var weight = dist(x, y, pX, pY);
	// strokeWeight(weight);
  // line(x, y, pX, pY);
  fill(pickColor)
  
  
  // stroke('blue');
  circle(x,y,leftEye * 30)
  // variableEllipse(x, y, pX, pY);

};


function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}


document.querySelector('button').addEventListener('click', () => {
  sketch.clear();
});

