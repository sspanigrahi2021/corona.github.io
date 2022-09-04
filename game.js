 function load_images(){
	virus_image = new Image;
	virus_image.src = "v1.png";

	player_img = new Image;
	player_img.src = "superhero.png";

	gem_image = new Image;
	gem_image.src = "gemm.png";

}

function init(){

	canvas = document.getElementById("mycanvas");
	console.log(canvas);

	W = 700
	H = 400

	canvas.width = W
	canvas.height = H

	pen = canvas.getContext('2d');
	console.log(pen);

	score = 0;
	game_over = false;

	e1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 20,
	};
	e2 = {
		x : 300,
		y : 150,
		w : 60,
		h : 60,
		speed : 30,
	};
	e3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 60,
		speed : 40,
	};
	enemy = [e1,e2,e3];

	player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
		moving : "false",
	}
	gem = {
		x : W-100,
		y : H/2,
		w : 60,
		h : 60,
	}
	
	canvas.addEventListener('mousedown',function(){
		console.log("You pressed the mouse");
		player.moving = true;
	});
	canvas.addEventListener('mouseup',function(){
		console.log("You released the mouse");
		player.moving = false;
	});
	

}


function draw(){

	
	pen.clearRect(0,0,W,H);

	
	pen.fillStyle = "red";
	

	pen.drawImage(player_img,player.x,player.y,player.w,player.h);
	pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);

	for(let i=0;i<enemy.length;i++){
		pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
	}
	pen.fillStyle = "white";
	pen.fillText("Score " + score,10,10);
}

function isColliding(b1,b2){
	

	if(Math.abs(b1.x - b2.x)<=30 && Math.abs(b1.y-b2.y)<=30){
		return true;
	}
	return false;
}

function update(){

	
	if(player.moving==true){
		player.x += player.speed;
		score += 20;
	}
	

	for(let i=0;i<enemy.length;i++){
		if(isColliding(enemy[i],player)){
			score -= i*100;
			if(score<0){
				game_over = true;
				alert("Game Over");
			}

		}
	}

	

	if(isColliding(gem,player)){
		game_over = true;
		draw();
		alert("You score" +score);
		
	}

	for(let i=0;i<enemy.length;i++){
		enemy[i].y += enemy[i].speed;
		if(enemy[i].y >H - enemy[i].h || enemy[i].y<0 ){
			enemy[i].speed *= -1;
		}
	}

}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
	}
	draw();
	update();
}

load_images();
init();


var f = setInterval(gameloop,100);
