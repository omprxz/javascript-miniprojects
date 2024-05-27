var timer = document.getElementById('timer');
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var end = document.getElementById('end');
var strtHrs= 0,strtMins=0,strtSecs=0;
var curHrs= 0,curMins=0,curSecs=0;
let startTimer;

timer.innerText=`0${strtHrs}:0${strtMins}:0${strtSecs}`;

let secs=0;
let mins=0;
let hrs=0;

function timerF(){
    secs +=1;
if(secs>=60){
    mins=Math.floor(secs/60);
    if(String(mins).length<2){
      curMins='0'+mins;
    }else{
    curMins=mins
    }
    curSecs=secs%60;
    if(mins>=60){
        curHrs=Math.floor(mins/60)
        curMins=mins%60;
    }else{
        curHrs=0;
    }
}else{
    curHrs=0,curMins=0;
    curSecs=secs;
}

if(String(curSecs).length<2){
      curSecs='0'+curSecs;
    }
if(String(curMins).length<2){
      curMins='0'+curMins;
    }
if(String(curHrs).length<2){
      curHrs='0'+curHrs;
    }
    console.log(`${curHrs}:${curMins}:${curSecs}`);
    console.log(secs)
    timer.innerText=`${curHrs}:${curMins}:${curSecs}`;
}

start.onclick = () => {
    start.setAttribute('disabled','true');
    pause.removeAttribute('disabled');
    start.style.display='none'
    pause.style.display='inline-block'
    startTimer = setInterval(timerF,1000)
    return startTimer;
}

pause.onclick = () => {
    pause.setAttribute('disabled','true');
    start.removeAttribute('disabled');
    pause.style.display='none'
    start.style.display='inline-block'
    clearInterval(startTimer)
}

end.onclick = () => {
  clearInterval(startTimer);
  start.removeAttribute('disabled');
  pause.removeAttribute('disabled');
  pause.style.display='none'
  start.style.display='inline-block'
  timer.innerText=`0${strtHrs}:0${strtMins}:0${strtSecs}`;
  secs=0;
}