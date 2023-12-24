let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let hScore = document.querySelector(".highest")

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        //console.log("game started");
        started=true;
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random()*3);
    let randomColor = btns[randomIndex];

    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIndex);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq)
    gameFlash(randomBtn);
}
function checkAns(idx){
    //console.log(`current level: ${level}`)
    //let idx = level-1;
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length== gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over! your Score was <b> ${level}</b> <br> Press any key to start again`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";

        },150)
        if(hScore.innerText<level){
            hScore.innerText=level;
        }
        reset();

    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    //console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}

function reset(){
    started =false;
    gameSeq=[];
    userSeq=[];
    level = 0;
}