const playerx=document.getElementById('player1');
const playero=document.getElementById('player2');
const line=document.getElementsByTagName('p')
const reset=document.getElementById('reset');
const button=document.getElementsByClassName('button')

let start=false;
let count=0;

const clickSound = new Audio('sounds/click.wav');
const winSound = new Audio('sounds/win.wav');
const tieSound = new Audio("sounds/tie.wav")

let player1={
      Text:"X",
      Boolean:true
}
let player2={
    Text:"O",
    Boolean:false
}



function clicked(_button){
    if(!start){
    line[1].style.display="none"
    start=true;
    }
    const buttonClicked=document.getElementById(_button);
    if(buttonClicked.innerHTML==""){
        playSound(clickSound);
        buttonClicked.classList.add('clicked');
        setTimeout(() => buttonClicked.classList.remove('clicked'), 300);
         checkPlayer(buttonClicked)
     }
     else {
        line[4].innerText = "Button already clicked! Choose another square.";
        setTimeout(() => {
            line[4].innerText = "";
        }, 2000);
    }
}

function checkPlayer(buttonClicked){
    count++;
    if (player1.Boolean) {
        var player ="player1"
        buttonClicked.textContent = player1.Text;
        playerx.classList.remove('active');
        playero.classList.add('active');
    } else {
        var player ="player2"
        buttonClicked.textContent = player2.Text;
        playero.classList.remove('active');
        playerx.classList.add('active');
    }
    // if(player1.Boolean){
    //       var player ="player1"
    //       buttonClicked.textContent=player1.Text;
    //       playero.textContent+='*'
    //       playerx.textContent="player1"
 
    // }
    // else{
    //     var player ="player2"
    //     buttonClicked.textContent=player2.Text;
    //     playerx.textContent+="*"
    //     playero.textContent="player2"
      
    // }
   if(Winner()){
    playSound(winSound);
    line[4].innerText= `${player} have won the game!`;
    disableButtons()
    setTimeout(restart, 3000); 
   
   }
   else if(count===9){
       playSound(tieSound);
       line[4].innerText= "OOP! It's A Tie, Play Again!"
       disableButtons()
       setTimeout(restart, 3000); 
   }else{
    line[1].style.display="block"
    line[1].innerText= player1.Boolean?"player2 select your choice":"player1 select your choice"
    player1.Boolean = (!player1.Boolean)
    player2.Boolean = (!player2.Boolean)
   }
}

function Winner(){
    
   let winningCombinations=[[0,1,2],[0,3,6],[0,4,8],[3,4,5],[6,7,8],[1,4,7],[2,5,8],[2,4,6]];
   for (let i = 0; i < winningCombinations.length; i++){
    const [a, b, c] = winningCombinations[i];
        if (
            button[a].innerHTML !== "" &&
            button[a].innerHTML === button[b].innerHTML &&
            button[a].innerHTML === button[c].innerHTML
        ) {
            highlightWinningCombination([a, b, c]); // Highlight winning buttons
            return true;
        }
    
    else{
        continue;
    }
    }
    return false
}

function  restart(){
    for(var i=0;i<9;i++){
        button[i].innerHTML='';
        button[i].classList.remove('winning'); 
        button[i].disabled = false; 
    }
    setTimeout(() => {
        line[4].innerHTML = "";
    }, 2000);
   
    
    start=false;
    count=0;
    player1.Boolean=true;
    player2.Boolean=false;
    playero.innerHTML="player2"
    playerx.innerHTML="player1"
    playerx.classList.add('active');
    playero.classList.remove('active');
    line[1].innerText="press any square to start play the game, Player1 to start"
   
}
function highlightWinningCombination(combination) {
    combination.forEach(index => {
        button[index].classList.add('winning');
    });
}


function playSound(sound) {
    sound.play();
}
function disableButtons() {
    for (let i = 0; i < button.length; i++) {
        button[i].disabled = true;  // Disable all buttons
    }
}







