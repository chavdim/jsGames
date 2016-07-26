$(window).load(function () {
	//game.init();
	//window.setTimeout(r.draw(150,150), 20);
});

document.oncontextmenu =function  () {
	return false;
};
onKey=function  (e) {
	//console.log(e)
	game.inputObj.registerInput(e);
};
onClick=function  (mouse) {
	
		
};
onmousemove =function  (mouse) {
	
};
var game={
	init:function  () {
		game.inputObj= new Input();
		game.canvas=document.getElementById('gamecanvas');
		game.ctx=game.canvas.getContext('2d');
		game.canvas2=document.getElementById('gamecanvas2');
		game.ctx2=game.canvas2.getContext('2d');
		document.getElementById('gamebody').addEventListener('keydown',onKey,true);
		document.getElementById('gamebody').addEventListener('keyup',onKey,true);
		document.getElementById('gamebody').addEventListener('click',onClick,true);
		
		//GAME STATS&DATA
		//(*del comment later) grav=2
		game.state=0;
		game.gravity=2;
		game.speed=30;
		game.keyDic={};
		game.snowballs=[];
		game.bgSnow=[];
		game.windSpeed=4;
		game.wind=0;
		game.nextWind="right";
		game.noWindTime=200;
		game.noWindTimer=0;
		game.windChangeTime=100;
		game.windChangeTimer=0;
		game.maxBgSnow=80;
		game.bgSnowSize=10;
		game.snowFallSpeed=5;
		game.snowFallDelay=10;
		game.snowFallTimer=game.snowFallDelay;
		game.rocketY=0;
		game.bgColor="rgb(1,111,215)";
		//for (var i = 0; i <= game.maxBgSnow; i++) {
		//	game.bgSnow.push(new Rect(i*(game.canvas.width/game.maxBgSnow),0-(Math.random()*30)
		//		,game.bgSnowSize,game.bgSnowSize));
		//};
		game.jumpFix=0;
		game.jumpFixTime=10;
		//INIT PLAYER OBJECT
		game.player=new Player(20,520);
		//INIT MAP OBJECT
		game.map=new Map();
		game.map.reset();
		game.startingArea=100;
		game.currentArea=game.startingArea;
		//KEY BINDINGS
		game.inputObj.bindKeyTo('37','keydown',this,'goLeft',1,'none');
		game.inputObj.bindKeyTo('39','keydown',this,'goRight',1,'none');
		game.inputObj.bindKeyTo('37','keyup',this,'goLeft',0,'none');
		game.inputObj.bindKeyTo('39','keyup',this,'goRight',0,'none');
		game.inputObj.bindKeyTo('38','keydown',this,'jump',1,'none');
		game.inputObj.bindKeyTo('38','keyup',this,'jump',0,'none');
		game.inputObj.bindKeyTo('32','keydown',this,'active',1,'none');
		game.inputObj.bindKeyTo('32','keyup',this,'active',0,'none');
		//BGM
		//sounds.dic['bgm2'].preload="auto";
		//sounds.dic['bgm2'].play();
		sounds.dic['smallbgm'].addEventListener('ended', function() {
   			this.currentTime = 0;
    		this.play();
		}, false);
		sounds.dic['smallbgm'].volume=0.8
		//sounds.dic['smallbgm'].play();
		//START LOOP
		game.update();
		//
	},
	bossDefeated:function  () {
		game.state=2;
		//sounds.dic['bgm2'].playbackRate=1.4;
		game.bgColor="rgb(200,22,11)";
		sounds.dic['alarm'].addEventListener('ended', function() {
   			this.currentTime = 0;
    		this.play();
		}, false);
		sounds.dic['alarm'].volume=0.6;
		sounds.dic['alarm'].play();
		game.map.data[8].entities.splice(1,1);
	},
	update:function  () {
		game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
		game.ctx.fillStyle=game.bgColor;
		game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
		game.ctx.fillStyle="white";
		//MENU
		if (game.state==0) {
			write(game.ctx,140,220,"SNOW",120,"white");
			write(game.ctx,120,300,"STORY",120,"white");

			write(game.ctx,270,380,"PRESS SPACE",16,"white");
		};
		//END SEQUENCE
		game.ctx2.clearRect(0,0,game.canvas.width,game.canvas.height);
		if (game.currentArea==6) {
			game.ctx2.fillStyle="white";
			game.ctx2.fillRect((game.canvas.width/2)-60,390+game.rocketY,120,200);
			game.ctx2.fillRect((game.canvas.width/2)-100,550+game.rocketY,200,40);
			game.ctx2.fillRect((game.canvas.width/2)-30,350+game.rocketY,60,40);
			game.ctx2.fillRect((game.canvas.width/2)-8,250+game.rocketY,16,120);
			game.ctx2.clearRect((game.canvas.width/2)-20,430+game.rocketY,40,40);

			//game.rocketY-=3;
		};

		if (game.state==2&&game.currentArea==6) {
			//game.state=3;
			game.map.data[6].transitions=[];
			game.rocketY-=3;
			console.log("thank you for playing");
			game.ctx2.fillStyle="black";
			game.ctx2.globalAlpha=(game.rocketY*(-1))/800;
			game.ctx2.fillRect(0,0,game.canvas.width,game.canvas.height);
			game.ctx2.globalAlpha=1;

			if (sounds.dic['alarm'].volume>0.001) {
				sounds.dic['alarm'].volume=0.6-((game.rocketY*(-1))/1000);
			};
			if (game.rocketY<-1000) {sounds.dic['alarm'].pause();	
			write(game.ctx2,223,300,"THANKS FOR PLAYING",18,"white");};
			//game.ctx2.fillRect((game.canvas.width/2)-100,400,200,200)
		};
		//WIND
		if (game.windChangeTimer==game.windChangeTime) {
		//	if (game.wind==game.windSpeed) {
		//		game.wind=-game.windSpeed;
		//	}
		//	else if (game.wind==-game.windSpeed) {
		//		game.wind=game.windSpeed;
		//	};
			game.wind=0;
		 	game.windChangeTimer=0;
		};
		if (game.wind==0) {game.noWindTimer+=1}
		else{game.windChangeTimer+=1;};
		if (game.noWindTimer==game.noWindTime) {
			
			if (game.nextWind=="right") {game.nextWind="left";game.wind=game.windSpeed;}
			else{game.nextWind="right";game.wind=-game.windSpeed;};
			game.noWindTimer=0;
		};
		//PLAYER MOVEMENT
		if (game.keyDic[65]==1) {
			game.player.goLeft();
		};
		if (game.keyDic[68]==1) {
			game.player.goRight();
		};
		if (game.keyDic[74]==1) {
			game.player.jump();
		};
		if (game.jumpFix>=1) {game.jumpFix++};
		if (game.jumpFix==game.jumpFixTime) {game.jumpFix=0};
		//GRAVITY ON SNOWBALLS
		for (var i = game.snowballs.length - 1; i >= 0; i--) {
			s=game.snowballs[i];
			if (s.thrown==1) {
				if (s.yVector!=0) {s.grounded=0;};
				if (s.yVector>0) {s.stopJump=1;};
				if (s.yVector<s.yMax) {s.yVector+=game.gravity;};	
			};
			//WALL LIMIT and fall
			if (s.x<-22) {s.x=-22};
			if (s.x>628) {s.x=628};
			if (s.y>650) {game.snowballs.splice(i,1)};
		};
		//GRAVITY ON PLAYER
		if (game.player.yVector!=0) {game.player.grounded=0;};
		if (game.player.yVector>0) {game.player.stopJump=1;};
		if (game.player.yVector<game.player.yMax) {
			game.player.yVector+=game.gravity;
		};
		//WALL LIMIT and fall
		if (game.player.x<-22) {game.player.x=-22};
		if (game.player.x>628) {game.player.x=628};
		if (game.player.y>650) {game.player.fell()};
		//DRAW PLAYER
		game.drawArea();
		game.drawPlayer();
		//DRAW SNOWBALLS
		for (var i = game.snowballs.length - 1; i >= 0; i--) {
			game.snowballs[i].update(game.ctx);
			if (game.snowballs[i].charging==1) {
				game.snowballs[i].x=game.player.x;
				game.snowballs[i].y=game.player.y;
				
			};
			if (game.snowballs[i].addToMap==1) {
				//game.map.data[game.currentArea].terrain.push(new TerrainRect(game.snowballs[i].x
				//	,game.snowballs[i].y,game.snowballs[i].size,game.snowballs[i].size,0))
				game.snowballs[i].addToMap=0;
				game.snowballs.splice(i,1);
			}
			else if (game.snowballs[i].dead==1) {game.snowballs.splice(i,1)};
		};
		//DRAW BG SNOW
		game.ctx.fillStyle="white";
		if (game.snowFallTimer==game.snowFallDelay) {
			for (var i = 0; i <= game.maxBgSnow; i++) {
				game.bgSnow.push(new Rect(-1000+(i*((game.canvas.width+2000)/game.maxBgSnow)),0-(Math.random()*100)
					,game.bgSnowSize,game.bgSnowSize));
			};
			game.snowFallTimer=0;
		};
		for (var i = game.bgSnow.length - 1; i >= 0; i--) {
			game.bgSnow[i].set(game.bgSnow[i].x+game.wind,game.bgSnow[i].y+game.snowFallSpeed);
			game.bgSnow[i].draw(game.ctx);
			if (game.bgSnow[i].y>game.canvas.height) {game.bgSnow.splice(i,1)};
		};
		game.snowFallTimer+=1;
		//MAIN LOOP
		window.setTimeout(game.update, game.speed);
	},
	drawArea:function  () {
		for (var i = game.map.data[game.currentArea].transitions.length - 1; i >= 0; i--) {
			//console.log(game.map.data[game.currentArea].transitions[i]);
			game.map.data[game.currentArea].transitions[i].update();
			if (game.map.data[game.currentArea].transitions[i].collideWithPlayer(game.player)) {
				break;
			};
			
		};
		for (var i = game.map.data[game.currentArea].terrain.length - 1; i >= 0; i--) {
			var terrain=game.map.data[game.currentArea].terrain[i];
			terrain.update();
			terrain.collideWithPlayer(game.player);
			terrain.draw(game.ctx);
			for (var ii = game.snowballs.length - 1; ii >= 0; ii--) {
				terrain.collideWithPlayer(game.snowballs[ii]);
			};
		};
		for (var i = game.map.data[game.currentArea].entities.length - 1; i >= 0; i--) {
			var entity=game.map.data[game.currentArea].entities[i];
			entity.update();
			entity.collideWithPlayer(game.player);
			for (var ii = game.snowballs.length - 1; ii >= 0; ii--) {
				entity.collideWithSnowball(game.snowballs[ii]);

			};
			entity.draw(game.ctx);
			if (entity.dead==1) {game.map.data[game.currentArea].entities.splice(i,1)};
		};
		
	},
	drawPlayer:function  () {
		game.player.update(game.ctx);
		//game.player.draw(game.ctx);
	},
	goLeft:function  (param) {
		if (param==1) {
			game.keyDic[65]=1;
		}
		else
		{
			game.player.halt();
			game.keyDic[65]=0;
		};
	},
	goRight:function  (param) {
		if (param==1) {
			game.keyDic[68]=1;
		}
		else
		{
			game.player.halt();
			game.keyDic[68]=0;
		};
	},
	jump:function  (param) {
		if (game.jumpFix==0) {
			if (param==1) {
				game.keyDic[74]=1;
				game.jumpFix=1;
			}
			else
			{
				//game.player.halt();
				game.keyDic[74]=0;
			};
		};	
		if(param==0){
			//game.player.halt();
			game.keyDic[74]=0;
		};
	},
	active:function  (param) {
		if (game.state==0) {game.state=1;
			game.map.data[game.currentArea].transitions.push(new TransitionRect(660,420,10,150,101,0,0));
			return;
		};
		if (param==1) {
			sounds.dic["throw"].volume=0.8;
			sounds.dic["throw"].play();
			if (game.snowballs.length!=0) {
				if (game.snowballs[game.snowballs.length-1].charging==0) {
					game.snowballs.push(new Snowball(game.player.x,game.player.y));
				};
			}
			else{
				game.snowballs.push(new Snowball(game.player.x,game.player.y));	
			};
		}
		else
		{
			game.player.halt();

			game.snowballs[game.snowballs.length-1].charging=0;
			game.snowballs[game.snowballs.length-1].thrown=1;
			game.snowballs[game.snowballs.length-1].yVector=(-20)+(game.snowballs[game.snowballs.length-1].size/3);
			if (game.snowballs[game.snowballs.length-1].size<20) {
				if (game.player.direction=="right") {
					game.snowballs[game.snowballs.length-1].xVector=(game.wind*2)+game.player.xVector+20-(game.snowballs[game.snowballs.length-1].size/3);
				}
				else if(game.player.direction=="left") {
					game.snowballs[game.snowballs.length-1].xVector=(game.wind*2)+game.player.xVector+(-20)+(game.snowballs[game.snowballs.length-1].size/3);
				};
			};
			if (game.snowballs[game.snowballs.length-1].size>20) {
				if (game.player.direction=="right") {
					game.snowballs[game.snowballs.length-1].xVector=game.player.xVector+20-(game.snowballs[game.snowballs.length-1].size/3);
				}
				else if(game.player.direction=="left") {
					game.snowballs[game.snowballs.length-1].xVector=game.player.xVector+(-20)+(game.snowballs[game.snowballs.length-1].size/3);
				};
			};
		};
	},
};

//util
function distance (x,y,x1,y1) {
	var dx = Math.abs(x-x1);
	var dy = Math.abs(y-y1);
	return Math.floor( Math.sqrt((dx*dx)+(dy*dy)) );
};
function drawCircle (ctx,x,y,r,color) {
	ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle =color;
    ctx.fill();
};
function drawLine (ctx,x,y,x1,y1) {
	ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
};
function write (ctx,x,y,text,size,color) {
	var initstyle=ctx.fillStyle;
	ctx.font = "bold " + size.toString() + "px sans-serif";
	ctx.fillStyle=color;
	ctx.fillText(text,x,y);
	ctx.fillStyle=initstyle;
};

