/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
window.onload = () => {
    const cnv = document.getElementById("canvas");
    const ctx = cnv.getContext("2d");
    cnv.height = window.innerHeight;
    cnv.width = window.innerWidth;
    let enemies = [];
    var dur = 200;
    var ok= Conf();
    // var ok = confirm("Are you using mobile ?")
    if(ok != true){
        dur = 100;
    }
  
//     alert(`Instructions to play :-
// 1. Don't collide with meteor's head 
// 2. Move your finger or mouse to control red circle's position 
// 3 Your task is to prevent red circle from colliding with meteors`)
    var posX = 50;
    var posY = cnv.height -50;
    let alive = true;
    let score = 0;
    document.getElementById("player").style.bottom = posY;
    document.getElementById("player").style.left = posX;
    let b = document.getElementById("b");
    document.getElementById("btn").addEventListener("click",restart)
    function Conf(){
        Swal.fire({
            title: "Are you using Mobile?",
           text :`Instructions to play :-
           1. Don't collide with meteor's head 
           2. Move your finger or mouse to control red circle's position 
           3 Your task is to prevent red circle from colliding with meteors`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "! Yes !"
       
          });
    }
    function restart(){
        cnv.style.display = "block";
        document.getElementById("card").style.display = "none";
        document.getElementById("player").style.display = "block";
        document.getElementById("p").style.display = "block";
        score = 0;
        enemies = [];
        alive = true;
        requestAnimationFrame(animate)
    }
    var {random,round,floor,PI} = Math;
    function enemy(x,y,color,radius){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.m = 0;
        this.createEnemy = () =>{
            ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.radius,0,2*PI);
    ctx.fill();
    ctx.restore();
        }
        this.update = () =>{
            this.y+=3;
            this.m += random() * 1 - 0.5;
            this.x+=this.m;
        }
    }
// End game 
function gameEnd(){
    cnv.style.display = "none";
    document.getElementById("card").style.display = "flex";
document.getElementById("sco").innerHTML = "Score : "+ score ;
document.getElementById("player").style.display = "none";
ctx.clearRect(0,0,cnv.height,cnv.width);
document.getElementById("p").style.display = "none";
document.getElementById("sco").style.display = "block";
}
/***********             *********/

 /*Score*/   
 function scores(){
 if(alive == true){
     score+=1;
    }
    else{
        score+=0;
    } document.getElementById("p").innerHTML = "Score : "+score;
 }
setInterval(scores,100)

/******       *******/
  b.addEventListener("touchmove",getcord)
    b.addEventListener("touchstart",getcord)
    b.addEventListener("touchcancel",getcord)
    b.addEventListener("mousemove",getcord)
    b.addEventListener("mousedown",getcord)
    b.addEventListener("mouseup",getcord)
    
    function getcord(e){
    if(e.type == "touchstart" || e.type== "touchmove" || e.type == "touchcancel"){
        posX = e.touches[0].clientX;
        posY = e.touches[0].clientY;
        /*prevent from going player out*/
        if (posY <0){
            posY = 0;
        }
        if(posY >=cnv.height){
            posY = cnv.height;
        }
       }
       else{
           posX = e.clientX;
           posY = e.clientY;
       } 
       document.getElementById("player").style.top = (posY-15) +"px";
       document.getElementById("player").style.left = (posX-15) + "px";
    }
    function atk(){
    for(i=0;i<1;i++){
        enemies.push(new enemy(random()*cnv.width,0,"red",3))
    }
    }
    function check(){
        for(let i = 0; i< enemies.length; i++){
            if(enemies[i].x > posX-15 && enemies[i].x < posX+15 && enemies[i].y > posY-15 && enemies[i].y < posY+15 ){    
                enemies = [];
                alive = false;
                gameEnd();
            }
        }
    }
    setInterval(atk,dur)
    function animate(){
ctx.fillStyle = "rgb(0,0,0,0.1)";
ctx.fillRect(0,0,cnv.width,cnv.height);
for(let i = 0;i < enemies.length;i++){
    enemies[i].createEnemy();
    enemies[i].update();
    if(enemies[i].y >= cnv.height){
                enemies.splice(1,i)
            }
    check();
}
if(alive == true){
requestAnimationFrame(animate);
}

}
animate();
window.addEventListener("resize",()=>{
cnv.width = innerWidth;
cnv.height = innerHeight;
});
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/