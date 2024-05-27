userSel=document.getElementById("userSel");
compSel=document.getElementById("compSel");
result=document.getElementById("result");
choiceBtns=document.querySelectorAll(".choiceBtn");
let userChoice,compChoice;
var choices = {
   1:"Rock",
   2:"Scissors",
   3:"Paper"
};
let whoWon='No one';

choiceBtns.forEach( btn => {btn.addEventListener("click", () => { 
  userChoice = btn.getAttribute('data-val')
  console.log(userChoice);
  userSel.textContent=choices[userChoice];
  compChoice=Math.floor(Math.random()*3) + 1;
  console.log(compChoice);
  compSel.textContent=choices[compChoice];
  switch (true) {
    case compChoice == 1 && userChoice == 2:
      whoWon='Computer won!';
      break;
    case compChoice == 1 && userChoice == 3:
      whoWon='You won!';
      break;
    case compChoice == 2 && userChoice == 1:
      whoWon='You won!';
      break;
    case compChoice == 2 && userChoice == 3:
      whoWon='Computer won!';
      break;
    case compChoice == 3 && userChoice == 1:
      whoWon='Computer won!';
      break;
    case compChoice == 3 && userChoice == 2:
      whoWon='You won!';
      break;
    default:
      whoWon="Match draw :("
  }
  result.textContent = whoWon;
})
});
