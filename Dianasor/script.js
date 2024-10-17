
document.onkeydown = function(e) {
    console.log("key code is: ", e.keyCode);
    
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino')
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 400);   
    }    
}

setInterval(() => {
    dino = document.querySelector('dino');
    gameOver = document.querySelector('.gameOver');
     obstacle = document.querySelector('obstacle');

   dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
   dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
   
   ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
   oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

   offsetX = Math.abs(dx-ox);
   offsetY = Math.abs(dy-oy);

   console.log(offsetX, offsetY);

   if (gameOver<90 && offsetY < 52) {
    gameOver.computedStyleMap.visibilty = 'visible';
    obstacle.classList.remove('obstacleAni');
      
   }

}, 100);


