let inputTask = document.querySelector('.inputTask')
let addTask = document.querySelector('.addTask')
let taskList = document.querySelector('.taskList')
let tasks = document.querySelectorAll('.task')
let taskctrlBtns = document.querySelectorAll('.ctrlBtns')
if (getCookie("tno") != '') {
  tNo = getCookie("tno")
} else {
  tNo = 1
}


printTask()
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function addToCookie(t) {
  document.cookie = "t"+tNo+"="+t+";expires=600";
  tNo++
  document.cookie = "tno="+tNo
}
function createTask() {
  tVal = inputTask.value
  if (tVal != '') {
    addToCookie(tVal)
    addOneMore(tVal)
  } else {
    alert("Empty Task")
  }
}
function editTask() {}

document.querySelectorAll('.ctrlDel').forEach( (del) => {
    del.addEventListener("click", () => {
      tid = del.getAttribute("data-tid")
      console.log(tid)
      document.cookie = tid+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
      document.querySelector("."+tid).style.display = 'none'
      tNo--
  document.cookie = "tno="+tNo
    })
  })
function printTask() {
  for (let i = 1; i < tNo; i++) {
    html = `<li class="t${i}">
    <div class="task" id="td${i}">${getCookie('t'+i)}</div>
    <button class="ctrlBtns ctrlEdit" id="tbe${i}"><i class="fas fa-edit"></i></button>
    <button class="ctrlBtns ctrlDel" id="tbm${i}" data-tid="t${i}"><i class="fas fa-minus"></i></button>
    </li>`
    taskList.innerHTML += html
  }
}
function addOneMore() {
  html = `<li class="t${tNo}">
  <div class="task" id="td${tNo}">${getCookie('t'+(tNo-1))}</div>
  <button class="ctrlDel ctrlEdit" id="tbe${tNo}"><i class="fas fa-edit"></i></button>
  <button class="ctrlBtns ctrlDel" id="tbm${tNo}" data-tid="t${tNo}"><i class="fas fa-minus"></i></button>
  </li>`
  taskList.innerHTML += html
}