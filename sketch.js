let Sound,amp,fft
let xxx = 300;
let yyy = 300;
const easing = 0.1;
const start1 = 0;
const stop1 = 1;
const start2 = 0;
const stop2 = 150;
const half = 2;
const triple = 3;
const zero = 0;
const big = 255;
const variable1 = 20;
const variable2 = 0.5;
const backColor = 87;
const alpha1 = 60;
const weight = 4;






// function preload(){
//     Sound = loadSound('timbre.flac');
// }
function setup(){
    createCanvas(windowWidth,windowHeight);

    Sound = loadSound('timbre.flac',loaded);
    amp = new p5.Amplitude();
    noStroke();
    fft = new p5.FFT();
    frameRate(variable1);
    osc = new p5.Oscillator();
    osc.setType("sine");
    osc.start();
}
function draw(){
    let x;
    let y;
    let x1;
    let y1;
    background(backColor);

    osc.amp(mouseY/height);
    osc.freq(mouseY*variable2);

    fill(big,big,big);

    ellipse(width/half,height/half,triple*map(amp.getLevel(),start1,stop1,start2,stop2),triple*map(amp.getLevel(),start1,stop1,start2,stop2));
    let waveform = fft.waveform();
    noFill();
    stroke(zero,zero,zero,alpha1);

    strokeWeight(weight);

    for (let i = zero; i < waveform.length; i++) {
        line(width / half + cos(map(i, zero, 1024, zero, 360)) * 180, height / half + sin(map(i, zero, 1024, zero, 360)) * 180, width / half + cos(map(i, zero, 1024, zero, 360)) * map(waveform[i], -0.8, 0.8, 50, 220)*half, height / half + sin(map(i, zero, 1024, zero, 360)) * map(waveform[i], -0.8, 0.8, 50, 220)*half);
    }

    xxx=xxx+((mouseX-xxx)*easing);

    yyy=yyy+((mouseY-yyy)*easing);
        ellipse(xxx,yyy,75,75);
        ellipse(mouseX,mouseY,50,50);



}
// function mousePressed(){
//     // Sound.play();
//     if (Sound.isPlaying()) {
//         Sound.stop();
//         osc.stop(zero);
//     } else {
//         Sound.play();
//         osc.start(zero,mouseY*variable2)
//     }
// }

var musicPlaying = false;

function pressed() {
    musicPlaying = true;

    if (Sound.isPlaying()) {
        Sound.pause();
        Sound.stop();
        osc.stop(zero);
        button.html("play");
    }
    else {
        Sound.loop();
        Sound.play();
        osc.start(zero,mouseY*variable2)
        button.html("pause");
    }
}

function loaded() {
    button = createButton("Begin");
    button.mousePressed(pressed);
    button.position(200,200);

}
