window.onload = window.focus();


//Global variable to act as a switch
/*-----------------------------------------------------------------------*/
let losePause = false;
let version = "rightToLeft";
let points = 0;
let start = false;
let magazine = 10;
/*-----------------------------------------------------------------------*/
let decider = (str, obstacleElement) => {
  if (str === "rightToLeft") {
    obstacleElement.classList.add("obstacleLeft");
    document.getElementById("board").classList.remove("boardLeftBlink");
    document.getElementById("board").classList.add("boardRightBlink");
  }
  else {
    obstacleElement.classList.add("obstacleRight");
    document.getElementById("board").classList.remove("boardRightBlink");
    document.getElementById("board").classList.add("boardLeftBlink");
  }
}

//Creates random numbers with a Max and Min
/*-----------------------------------------------------------------------*/
let numberGenerator = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*-----------------------------------------------------------------------*/


//Stops obstacles from generating and deleting and changes circle color
//depending on whether or not user has Won or Lost
/*-----------------------------------------------------------------------*/
let shutDown = (gameState) => {
  if (gameState === "win") {
    document.getElementById("ballRunner").style.backgroundColor = "green";
    for (let y = 0; y < document.getElementsByClassName("obstacle").length; y++) {
      document.getElementsByClassName("obstacle")[y].style.animationPlayState = "paused";
      clearInterval(obstacleGenerator);
      clearInterval(timerWrite);
      losePause = true;
    }
  }
  else if (gameState === "lose") {
    let ballCoordY = window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("top");
    let ballCoordX = window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("left");
    document.getElementById("ballRunner").style.backgroundColor = "red";
    document.getElementById("ballRunner").classList.add("hit");
    document.getElementById("ballRunner").style.animationDelay = ".25s";
    document.getElementById("ballRunner").style.top = ballCoordY;
    document.getElementById("ballRunner").style.left = ballCoordX;
    
    for (let y = 0; y < document.getElementsByClassName("obstacle").length; y++) {
      document.getElementsByClassName("obstacle")[y].style.animationPlayState = "paused";
      clearInterval(obstacleGenerator);
      clearInterval(timerWrite);
      losePause = true;
    }
  }
}
/*-----------------------------------------------------------------------*/


//Responsible for player movement, as well as checking for wins
/*-----------------------------------------------------------------------*/
document.addEventListener("keydown", (event)=>{
  if (!start) {
    for (let x = 0; x < document.getElementsByClassName("inst").length; x++) {
      document.getElementsByClassName("inst")[x].style.display = "none";
    }
    start = true;
  }
  if (!losePause) {
  }
  else {
    return;
  }
  if (event.key === "ArrowUp" || event.key === "w") {
    let coordY = parseInt(window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("top"));
    let maxY = parseInt(window.getComputedStyle(document.getElementById("board"), null).getPropertyValue("height"));
    let percentY = (coordY/maxY)*100;
    if ((percentY-5) <= 0) {
      return;
    }
    document.getElementById("ballRunner").style.top = `${percentY-5}%`; 
  }
  else if (event.key === "ArrowDown" || event.key === "s") {
    let coordY = parseInt(window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("top"));
    let maxY = parseInt(window.getComputedStyle(document.getElementById("board"), null).getPropertyValue("height"));
    let percentY = (coordY/maxY)*100;
    if ((percentY+5) >= 95) {
      return;
    }
    document.getElementById("ballRunner").style.top = `${percentY+5}%`;
  }
  else if (event.key === "ArrowLeft" || event.key === "a") {
    
    let coordX = parseInt(window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("left"));
    let maxX = parseInt(window.getComputedStyle(document.getElementById("board"), null).getPropertyValue("width"));
    let percentX = (coordX/maxX)*100;
    document.getElementById("ballRunner").style.left = `${percentX-5}%`;
    if ((percentX-5) <= 0 && version === "leftToRight") {
      version = "rightToLeft";
      points ++;
      let pointText = document.createElement("p");
      pointText.innerText = "+1";
      pointText.style.opacity = "0";
      pointText.classList.add("runPointLeft");
      document.getElementById("ballRunner").appendChild(pointText);
      setTimeout(()=>{
        document.getElementById("ballRunner").removeChild(pointText);
      }, 500);
      magazine = 10;
      document.getElementById("bulletCount").innerText = `bullets: ${magazine}`;
      document.getElementById("pointCount").innerText = `points: ${points}`; 
    }
    else {
      return;
    }
  }
  else if (event.key === "ArrowRight" || event.key === "d") {
    let coordX = parseInt(window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("left"));
    let maxX = parseInt(window.getComputedStyle(document.getElementById("board"), null).getPropertyValue("width"));
    let percentX = (coordX/maxX)*100;
    if ((percentX+5) >= 100) {
      return;
    }
    document.getElementById("ballRunner").style.left = `${percentX+5}%`;
    if ((percentX+5) >=95 && version === "rightToLeft")  {
      version = "leftToRight";
      points ++;
      let pointText = document.createElement("p");
      pointText.innerText = "+1";
      pointText.style.opacity = "0";
      pointText.classList.add("runPointRight");
      document.getElementById("ballRunner").appendChild(pointText);
      setTimeout(()=>{
        document.getElementById("ballRunner").removeChild(pointText);
      }, 500);
      magazine = 10;
      document.getElementById("bulletCount").innerText = `bullets: ${magazine}`;
      document.getElementById("pointCount").innerText = `points: ${points}`; 
    }
    else {
      return;
    }
  }
  else if (event.key === " ") {
    console.log("shoot");
    if (magazine === 0) {
      return;
    }
    let bullet = document.createElement("div");
    bullet.classList.add("bullet");
    let ballCoordY = parseInt(window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("top"));
    let ballCoordX = parseInt(window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("left"));
    let maxX = parseInt(window.getComputedStyle(document.getElementById("board"), null).getPropertyValue("width"));
    let maxY = parseInt(window.getComputedStyle(document.getElementById("board"), null).getPropertyValue("height"));
    let percentY = (ballCoordY/maxY)*100;
    let percentX = (ballCoordX/maxX)*100;
    document.getElementById("board").appendChild(bullet);
    bullet.style.top = (percentY + 4) + "%";
       
    if (version === "rightToLeft") {
      bullet.style.left = percentX + 5 + "%"; 
      bullet.classList.remove("shootLeft");
      bullet.classList.add("shootRight");
      let shootRight = setInterval(()=>{
        percentX ++;
        bullet.style.left = percentX + 5 + "%";
        if ((percentX + 5) >= (percentX + 5 + 100)) {
          clearInterval(shootRight);
        }
      },10);
    }
    else {
      bullet.style.left = percentX - 5 + "%"; 
      bullet.classList.add("shootLeft");
      bullet.classList.remove("shootRight");
      let shootLeft = setInterval(()=>{
        percentX --;
        bullet.style.left = percentX + 5 + "%";
        if ((percentX - 5) <= (percentX + 5 - 100)) {
          clearInterval(shootLeft);
        }
      },10);
    }
    magazine --;
    document.getElementById("bulletCount").innerText = `bullets: ${magazine}`;
    setTimeout(()=>{
      document.getElementById("board").removeChild(bullet);
    },3000);
  }
});
/*-----------------------------------------------------------------------*/


//Checks for collisions
/*-----------------------------------------------------------------------*/
let collisionChecker1 = () => {
  for (let x = 0; x < document.getElementsByClassName("obstacle").length; x++) {
    let ballCoordY = parseInt(window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("top"));
    let ballCoordX = parseInt(window.getComputedStyle(document.getElementById("ballRunner"), null).getPropertyValue("left"));
    let obstacleCoordY = parseInt(window.getComputedStyle(document.getElementsByClassName("obstacle")[x], null).getPropertyValue("top"));
    let obstacleCoordX = parseInt(window.getComputedStyle(document.getElementsByClassName("obstacle")[x], null).getPropertyValue("left"));
    if (
      (((obstacleCoordY >= ballCoordY && obstacleCoordY <= ballCoordY + 30) 
       && (obstacleCoordX >= ballCoordX && obstacleCoordX <= ballCoordX + 30)) 
      || 
      ((obstacleCoordY + 20 >= ballCoordY && obstacleCoordY + 20 <= ballCoordY + 30) 
       && (obstacleCoordX >= ballCoordX && obstacleCoordX <= ballCoordX + 30)))
      ||
      (((obstacleCoordY >= ballCoordY && obstacleCoordY <= ballCoordY + 30) 
       && (obstacleCoordX + 30 >= ballCoordX && obstacleCoordX +30 <= ballCoordX + 30)) 
      || 
      ((obstacleCoordY + 20 >= ballCoordY && obstacleCoordY + 20 <= ballCoordY + 30) 
       && (obstacleCoordX +30 >= ballCoordX && obstacleCoordX + 30 <= ballCoordX + 30)))
    ) 
    {
      shutDown("lose");
      document.getElementsByClassName("obstacle")[x].classList.add("hit");
      document.getElementsByClassName("obstacle")[x].style.animationPlayState = "running";
      document.getElementsByClassName("obstacle")[x].style.top = `${obstacleCoordY}px`;
      document.getElementsByClassName("obstacle")[x].style.left = `${obstacleCoordX}px`;
    }
  }
}
let collisionChecker2 = () => {
  for (let x = 0; x < document.getElementsByClassName("obstacle").length; x++) {
    let obstacleCoordY = parseInt(window.getComputedStyle(document.getElementsByClassName("obstacle")[x], null).getPropertyValue("top"));
    let obstacleCoordX = parseInt(window.getComputedStyle(document.getElementsByClassName("obstacle")[x], null).getPropertyValue("left"));
    
    for (let y = 0; y < document.getElementsByClassName("bullet").length; y++) {
      let bulletCoordY = parseInt(window.getComputedStyle(document.getElementsByClassName("bullet")[y], null).getPropertyValue("top"));
      let bulletCoordX = parseInt(window.getComputedStyle(document.getElementsByClassName("bullet")[y], null).getPropertyValue("left"));
      
      if (
      
       (((bulletCoordY >= obstacleCoordY && bulletCoordY <= obstacleCoordY + 20) 
       && (bulletCoordX >= obstacleCoordX && bulletCoordX <= obstacleCoordX + 30)) 
      || 
      ((bulletCoordY + 5 >= obstacleCoordY && bulletCoordY + 5 <= obstacleCoordY + 20) 
       && (bulletCoordX >= obstacleCoordX && bulletCoordX + 10 <= obstacleCoordX + 30)))
      ||
      (((bulletCoordY >= obstacleCoordY && bulletCoordY <= obstacleCoordY + 20) 
       && (bulletCoordX + 10 >= obstacleCoordX && bulletCoordX +10 <= obstacleCoordX + 30)) 
      || 
      ((bulletCoordY + 5 >= obstacleCoordY && bulletCoordY + 5 <= obstacleCoordY + 20) 
       && (bulletCoordX + 10 >= obstacleCoordX && bulletCoordX + 10 <= obstacleCoordX + 30)))
     
    
 
      )
        
      { 
        document.getElementsByClassName("obstacle")[x].style.animationPlayState = "paused";
        document.getElementsByClassName("obstacle")[x].children[0].classList.add("shootPoint");
        points += .25;
        document.getElementById("pointCount").innerText = `points: ${points}`; 
        setTimeout(()=>{
          document.getElementsByClassName("obstacle")[x].style.display = "none";
          document.getElementById("board").removeChild(document.getElementsByClassName("obstacle")[x]);
        }, 250);
        document.getElementById("board").removeChild(document.getElementsByClassName("bullet")[y]);

  
      }
    }
  }
  
   
}
setInterval(()=>{  //<--check every (1/1000000) seconds
  collisionChecker1();
  collisionChecker2();
},.001);
/*-----------------------------------------------------------------------*/


//Generates obstacles
/*-----------------------------------------------------------------------*/
let dodgeCount = 0;
let obstacleGenerator = setInterval(()=>{
  if (!start) {
    return;
  }
  let obstacleCoordY = numberGenerator(90, 5);
  let colorIndex = numberGenerator(5, 0);
  let colorArray = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  let obstacle = document.createElement("div");
  let obstacleText = document.createElement("p");
  obstacleText.innerText = "+.25pts";
  obstacleText.style.opacity = "0";
  obstacle.classList.add("obstacle");
  obstacle.style.top = `${obstacleCoordY}%`;
  obstacle.style.backgroundColor = `${colorArray[colorIndex]}`;
  obstacle.appendChild(obstacleText);
  document.getElementById("board").appendChild(obstacle);
  decider(version, obstacle);
  setTimeout(()=>{
    if (!losePause) {
      document.getElementById("board").removeChild(obstacle);
      dodgeCount ++;
      document.getElementById("obstacleCount").innerText = `blocks dodged: ${dodgeCount}`; 
    }
    else {
      return;
    }
  }, 4000);
},500);
let timerSecs = 0;
let timerWrite = setInterval(()=>{
  if (!start) {
    return;
  }
  timerSecs += .01;
  document.getElementById("timer").innerText = `timer ${timerSecs.toFixed(2)}s`; 
},10);
/*-----------------------------------------------------------------------*/