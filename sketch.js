let Sound,amp,fft
//预读器
function preload(){
    Sound = loadSound('timbre.flac');
}
//初始化
function setup(){
    createCanvas(windowWidth,windowHeight);
    amp = new p5.Amplitude();
    noStroke();
    fft = new p5.FFT();
    frameRate(20);
}
function draw(){
    background(87);
    //振幅转换为图形
    let level = amp.getLevel();
    let r = map(level,0,1,0,150);
    fill(random(255),80,80);
    ellipse(width/2,height/2,r,r);
    //振幅转换为波形
    let waveform = fft.waveform();
    noFill();
    stroke(255,80,80,60);
    strokeWeight(2);
    let x;
    let y;
    let x1;
    let y1;
    for (let i = 0; i < waveform.length; i++) {
        let angle = map(i, 0, 1024, 0, 360);
        x = width / 2 + cos(angle) * 180;
        y = height / 2 + sin(angle) * 180;
        let r = map(waveform[i], -0.8, 0.8, 50, 220);
        x1 = width / 2 + cos(angle) * r;
        y1 = height / 2 + sin(angle) * r;
        line(x, y, x1, y1);
    }
}
//点击播放暂停
function mousePressed(){
    if(Sound.isPlaying()){
        Sound.pause();
    }else{
        Sound.play();
        background(255,255,0);
    }
}
