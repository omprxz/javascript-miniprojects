cells=document.querySelectorAll('.cells');
result=document.getElementById('result');
start=document.getElementById('start');
restart=document.getElementById('restart');
let trios=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
  ];
let gameStarted=0;
let sign ='x';
start.onclick = () => {
sign ='x';
result.textContent="X's Turn";
gameStarted=1;
restart.style.display ='inline-block'
start.style.display ='none'
}
cells.forEach(cell => cell.addEventListener("click", () =>{
  if(gameStarted==1){
  if(sign=='x'){
    if(cell.textContent == ''){
      cell.textContent=sign;
      cell.style.color='red';
      cell.style.backgroundColor='blue';
      result.textContent="O's Turn";
      trioChecked=checkTrio(sign)
    if(trioChecked){
    result.textContent=trioChecked;
    }else{
      if(checkEmp()==0){
        gameStarted=0;
        result.textContent='Match Draw :(';
      }
    }
    sign='o';
    }
    
  }else if(sign=='o'){
    if(cell.textContent == ''){
      cell.textContent=sign;
      cell.style.color='blue';
      cell.style.backgroundColor='red';
      result.textContent="X's Turn";
    
    trioChecked=checkTrio(sign)
    if(trioChecked){
    result.textContent=trioChecked;
    }else{
      if(checkEmp()==0){
        gameStarted=0;
        result.textContent='Match Draw :(';
      }
    }
    sign='x';
    }
  }
}
}))

function checkTrio(sign){
  for (let i = 0; i < trios.length; i++) {
    if(cells[trios[i][0]].textContent==sign && cells[trios[i][1]].textContent==sign && cells[trios[i][2]].textContent==sign){
      gameStarted=0;
      return sign.toUpperCase()+" Won";
    }
  }
}

function checkEmp(){
  empC=0;
  for (let i = 0; i < cells.length; i++) {
    if(cells[i].textContent==''){
      empC=1;
    }
  }
  return empC;
}
restart.addEventListener("click",() => {
  cells.forEach(c => c.textContent='')
  cells.forEach(c => c.style.backgroundColor='white')
  sign = 'x';
  result.textContent="X's Turn";
  gameStarted=1;
})