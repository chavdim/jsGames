
$(window).load(function () {
	//game.init();
	//window.setTimeout(r.draw(150,150), 20);
});
document.oncontextmenu =function  () {
	return false;
};
onKey=function  (e) {
	//console.log(e.which);

	if (e.which==77&&e.type=='keydown') {
		if (sounds.dic['bgm'].volume!=0) {sounds.dic['bgm'].volume=0;}
		else{sounds.dic['bgm'].volume=0.01;};
	};
	game.inputObj.registerInput(e);
};
onClick=function  (mouse) {
	game.resetButton.update(mouse,game.ctx);
	
};
onmousemove =function  (mouse) {
	game.mouse=mouse;
};
var game={
	init:function  () {
		game.inputObj= new Input();
		document.getElementById('gamebody').addEventListener('keydown',onKey,true);
		document.getElementById('gamebody').addEventListener('keyup',onKey,true);
		document.getElementById('gamebody').addEventListener('click',onClick,true);
		document.getElementById('gamebody').addEventListener('mousemove',onmousemove,true);
		game.canvas=document.getElementById('gamecanvas');
		game.ctx=game.canvas.getContext('2d');
		//
		game.canvas2=document.getElementById('gamecanvas2');
		game.ctx2=game.canvas2.getContext('2d');
		game.speed=40;
		//key bindings a,w,d,s,space
		game.player=new Player(30,0);
		game.inputObj.bindKeyTo('37','keydown',this,'goLeft',1,'none');
		//game.inputObj.bindKeyTo('87','keydown',this,'addSushi',1,'none');
		game.inputObj.bindKeyTo('39','keydown',this,'goRight',1,'none');
		//game.inputObj.bindKeyTo('83','keydown',this,'addSushi',3,'none');
		game.inputObj.bindKeyTo('38','keydown',this,'jump',1,'none');
		game.inputObj.bindKeyTo('90','keydown',this.player,'active',1,'none');
		game.inputObj.bindKeyTo('88','keydown',this.player,'unequip',1,'none');
		//
		game.inputObj.bindKeyTo('37','keyup',this,'goLeft',0,'none');
		//game.inputObj.bindKeyTo('38','keydown',this,'addSushi',1,'none');
		game.inputObj.bindKeyTo('39','keyup',this,'goRight',0,'none');
		//game.inputObj.bindKeyTo('83','keydown',this,'addSushi',3,'none');
		game.inputObj.bindKeyTo('38','keyup',this,'jump',0,'none');
		game.inputObj.bindKeyTo('90','keyup',this.player,'active',0,'none');
		game.inputObj.bindKeyTo('88','keyup',this.player,'ignore',1,'none');
		//
		game.map=new Map();
		game.map.reset();
		game.startingArea=7;
		game.currentArea=game.startingArea;
		game.keyDic={};
		//
		game.gravity=2;
		//game.player.equipShield();
		//game.player.equipSword();
		game.sword=new Sword(400,0,7);
		game.shield=new Shield(200,0,1);
		//game.player.equipSword(game.sword);
		game.animations=[];
		game.bloodQuality=8;
		game.bloodDissipation=12;
		game.bloodColor='black';
		game.jumpFix=0;
		game.jumpFixTime=10;
		//
		sounds.dic['area'].volume=0.2;
		sounds.dic['slashhammer'].volume=0.1;
		sounds.dic['hit'].volume=0.05;
		//sounds.dic['bgm'].volume=0.010;
		//sounds.dic['bgm'].loop=true;
		//sounds.dic['bgm'].addEventListener('ended', function() {
    	//this.currentTime = 0;
   		//this.play();
		//}, false);
		//sounds.dic['bgm'].preload="auto";
		//sounds.dic['bgm'].play();
		//
		game.redButton=new RedButton(190,470,8);
		game.redButton2=new RedButton(250,480,6);
		game.smashed=2;
		game.mouse=0;
		game.resetButton=new Button(5,5,60,40,'none',game.reset,'none');
		game.update();
	},
	update:function  () {
		
		//bgm
		
		this.currentTime = 0;
		//clear canvas
		game.ctx.clearRect(0,0,650,550);
		//write(game.ctx,5,60,"'m' to mute ",12,"black");
		write(game.ctx,400,25,"red buttons to smash: "+game.smashed,22,"red");
		//BUTTONS
		if (game.redButton.area==game.currentArea) {game.redButton.update(game.ctx,game.player)};
		if (game.redButton2.area==game.currentArea) {game.redButton2.update(game.ctx,game.player)};
		//INSTRUCTIONS
		if (game.currentArea==7) {
			write(game.ctx,20,300,"you can move using the arrow keys.",14,"black");
			write(game.ctx,80,320,"press up to jump.",14,"black");
			write(game.ctx,160,540,"when you fall you will respawn in this area.",14,"black");
			//
			write(game.ctx,300,335,"pick up the hammer  ",14,"black");
			write(game.ctx,320,355,"using 'z' or 'x'",14,"black");
			write(game.ctx,500,320,"smash this guy ",14,"black");
			write(game.ctx,525,340,"using 'z'",14,"black");
		}
		else if (game.currentArea==1) {
			write(game.ctx,50,100,"*carry the hammer and shield through the areas, you will need them!",16,"black");
			write(game.ctx,110,310,"the shield blocks projectiles",14,"black");
			write(game.ctx,110,330,"throw the hammer using 'x'",14,"black");
			write(game.ctx,110,350,"then pick up the shield.",14,"black");
			//write(game.ctx,110,350,"(you can carry one at a time).",14,"black");
		}
		else if (game.currentArea==5) {
			write(game.ctx,200,500,"the shield and hammer",14,"black");
			write(game.ctx,200,520,"respawn when they fall or",14,"black");
			write(game.ctx,200,540,"when you die.",14,"black");
		};
		//WALL LIMIT and fall
		if (game.player.x<-22) {game.player.x=-22};
		if (game.player.x>628) {game.player.x=628};
		if (game.player.y>650) {game.player.fell()};
		//WALL LIMIT and fall s and s
		if (game.sword.x<-22) {game.sword.x=-22};
		if (game.sword.x>648) {game.sword.x=628};
		if (game.sword.y>660) {game.sword.respawn()};
		//
		if (game.shield.x<-22) {game.shield.x=-22};
		if (game.shield.x>648) {game.shield.x=628};
		if (game.shield.y>660) {game.shield.respawn()};
		//animations
		for (var i = game.animations.length - 1; i >= 0; i--) {
			game.animations[i].update(game.ctx2);
			if (game.animations[i].finished==1) {game.animations.splice(i,1);};
		};
		//
		if (game.sword.detached==1&&game.sword.area==game.currentArea) {
			game.sword.updateDetached(game.ctx);
		};
		if (game.shield.detached==1&&game.shield.area==game.currentArea) {
			game.shield.updateDetached(game.ctx);
		};
		//gravity
		if (game.sword.area==game.currentArea) {
			if (game.sword.detached==1&&game.sword.yVector<game.sword.yMax) {
				if (game.sword.grounded==0) {
					if (Math.abs(game.sword.yVector)<=game.sword.yMax) {
						game.sword.yVector+=game.gravity;
					};
				};
			};
		};
		if (game.shield.area==game.currentArea) {
			if (game.shield.detached==1&&game.shield.yVector<game.shield.yMax) {
				if (game.shield.grounded==0) {
					if (Math.abs(game.shield.yVector)<=game.shield.yMax) {
					game.shield.yVector+=game.gravity;
					};
				};
			};
		};
	
		if (game.player.yVector!=0) {game.player.grounded=0;};
		if (game.player.yVector>0) {game.player.stopJump=1;};
		if (game.player.yVector<game.player.yMax) {
			game.player.yVector+=game.gravity;
		};
		//movement
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
		//update and draw
		if (game.smashed!=0) {
			game.drawArea();
			game.drawPlayer();
		};
		//endstate
		if (game.smashed==0) { 
			game.ctx.fillRect(0,55,650,550);
			write(game.ctx,160,250,"Thanks for playing! ",40,"white");
			//return;
		};
		game.resetButton.update(game.mouse,game.ctx);
		write(game.ctx,70,38,"Reset ",36,"black");
		window.setTimeout(game.update, game.speed);
	},
	reset:function  () {
		//game.map.reset();
		game.player.fell();
		game.redButton=new RedButton(190,470,8);
		game.redButton2=new RedButton(250,480,6);
		game.smashed=2;
		
	},
	drawArea:function  () {
		for (var i = game.map.data[game.currentArea].terrain.length - 1; i >= 0; i--) {
			var terrain=game.map.data[game.currentArea].terrain[i];
			terrain.update();
			terrain.collideWithPlayer(game.player);
			terrain.collideWithSwordOrShield(game.sword,game.shield);
			terrain.draw(game.ctx);
		};
		for (var i = game.map.data[game.currentArea].entities.length - 1; i >= 0; i--) {
			var entity=game.map.data[game.currentArea].entities[i];
			if (entity!=undefined) {
				entity.update();
				if (entity.collideWithPlayer(game.player)) {break};
				//entity.collideWithPlayer(game.player);
				entity.draw(game.ctx);
				if (entity.dead==1) {game.map.data[game.currentArea].entities.splice(i,1)};
			};
		};
		for (var i = game.map.data[game.currentArea].transitions.length - 1; i >= 0; i--) {
			//console.log(game.map.data[game.currentArea].transitions[i]);
			game.map.data[game.currentArea].transitions[i].update();
			game.map.data[game.currentArea].transitions[i].collideWithSwordOrShield(game.sword,game.shield);
			if (game.map.data[game.currentArea].transitions[i].collideWithPlayer(game.player)) {
				break;
			};
			
		};
	},
	drawPlayer:function  () {
		game.player.update();
		game.player.draw(game.ctx);
	},
	//
	//
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
};
function Input () {
	this.keyDownBindings={};
	this.keyUpBindings={};
	this.keyDownParams={};
	this.keyUpParams={};
	this.keyDownIds={};
	this.keyUpIds={};
	this.bindKeyTo=function  (key,type,id,func,param1,param2) {
		if (type=="keydown") {
			this.keyDownIds[key]=id;
			this.keyDownBindings[key]=func;
			this.keyDownParams[key]=[param1,param2];
		}
		else if (type=="keyup") {
			this.keyUpIds[key]=id;
			this.keyUpBindings[key]=func;
			this.keyUpParams[key]=[param1,param2];
		};
	};
	this.registerInput=function  (inputObj) {
		var which=inputObj.which;
		if (inputObj.type=='keydown') {
			var obj = this.keyDownIds[which];
			var func = this.keyDownBindings[which]
		//this.keyDownBindings[which](this.keyDownParams[which][0],this.keyDownParams[which][1]);
		//obj.func(this.keyDownParams[which][0],this.keyDownParams[which][1]);
		//console.log(this.keyDownParams[which][0],this.keyDownParams[which][1]);
			/*switch(func){
				case'changeStat':
				obj.changeStat(this.keyDownParams[which][0],this.keyDownParams[which][1]) 
				break;
				case'addSushi':
				obj.addSushi(this.keyDownParams[which][0]) 
				break;
			};*/
			obj[func](this.keyDownParams[which][0]);
		}
		else if (inputObj.type=='keyup') {
			var obj = this.keyUpIds[which];
			var func = this.keyUpBindings[which]
		//this.keyDownBindings[which](this.keyDownParams[which][0],this.keyDownParams[which][1]);
		//obj.func(this.keyDownParams[which][0],this.keyDownParams[which][1]);
		//console.log(this.keyDownParams[which][0],this.keyDownParams[which][1]);
			/*switch(func){
				case'changeStat':
				obj.changeStat(this.keyDownParams[which][0],this.keyDownParams[which][1]) 
				break;
				case'addSushi':
				obj.addSushi(this.keyDownParams[which][0]) 
				break;
			};*/
			obj[func](this.keyUpParams[which][0]);
		};
	};
};

function Map () {
	this.reset=function  () {
		this.data= {
			0:{
				terrain:[new TerrainRect(0,400,500,50,0),new TerrainRect(300,200,100,50,0)],
				entities:[new GuyWithSword(200,360,0,200,4,1)],
				transitions:[new TransitionRect(660,250,10,150,1,0,0)],
			},
			1:{
				terrain:[new TerrainRect(0,400,500,50,0),new TerrainRect(350,340,300,20,0),
				new TerrainRect(410,280,250,20,0),new TerrainRect(470,220,200,20,0)],

				entities:[new GuyWithBow(350,360,Math.PI,1),new GuyWithBow(410,300,Math.PI,1),
				new GuyWithBow(470,240,Math.PI,1)],

				transitions:[new TransitionRect(-20,250,10,150,7,0,610),
				new TransitionRect(500,560,150,10,2,1,0),
				new TransitionRect(660,70,10,150,5,0,10)],
			},
			2:{
				terrain:[new TerrainRect(0,500,400,50,0),new TerrainRect(500,60,150,20,0),
				new TerrainRect(0,250,200,40,0),new TerrainRect(230,250,260,40,0),new TerrainRect(580,440,40,200,0)],

				entities:[new GuyWithSword(0,210,0,410,6,1),new GuyWithSword(410,210,Math.PI,410,6,1)
				,new GuyWithSword(160,460,0,180,5,1),new GuyWithSword(595,400,Math.PI,30,2,1)],

				transitions:[new TransitionRect(500,-20,150,10,1,1,500),new TransitionRect(-20,400,10,150,8,0,610)],
			},
			3:{
				terrain:[new TerrainRect(0,500,650,50,0),new TerrainRect(0,360,40,20,0)],

				entities:[new GuyWithSword(-20,460,0,150,2,0),new GuyWithSword(180,460,0,300,4,0)
														 ,new GuyWithSword(430,460,Math.PI,300,4,0)
				,new GuyWithSword(630,460,Math.PI,150,2,0)],

				transitions:[],
			},
			4:{
				terrain:[new TerrainRect(0,360,240,20,1),new TerrainRect(410,360,240,20,1),new TerrainRect(0,510,650,40,1)],

				entities:[new GuyWithSword(80,470,0,220,6,1),new GuyWithSword(300,470,Math.PI,220,6,1)
				,new GuyWithBow(450,470,Math.PI,1),new GuyWithBow(500,470,Math.PI,1),
				new GuyWithBow(550,470,Math.PI,1),
				new GuyWithBow(600,470,Math.PI,1)],

				transitions:[new TransitionRect(-20,400,10,150,6,0,610),
				new TransitionRect(-20,70,10,150,0,0,610)],
			},
			5:{
				terrain:[new TerrainRect(0,220,80,20,0),new TerrainRect(570,220,80,20,0),
				new TerrainRect(150,300,30,500,0),new TerrainRect(300,230,30,250,0),new TerrainRect(450,300,30,500,0)],

				entities:[new GuyWithSword(140,260,0,10,4,1),
				new GuyWithSword(450,260,Math.PI,10,4,1)
				],

				transitions:[new TransitionRect(-20,70,10,150,1,0,610),
				new TransitionRect(660,70,10,150,6,0,10)],
			},
			6:{
				terrain:[new TerrainRect(0,300,650,20,1),new TerrainRect(0,510,650,40,1)],

				entities:[new GuyWithBow(20,470,0,1),new GuyWithBow(80,470,0,1),
				new GuyWithBow(140,470,0,1),new GuyWithBow(50,430,0,1),new GuyWithBow(110,430,0,1)],

				transitions:[new TransitionRect(-20,70,10,150,5,0,610),
				new TransitionRect(660,70,10,150,4,0,10),new TransitionRect(660,400,10,150,4,0,10)],
			},
			7:{
				terrain:[new TerrainRect(0,400,260,50,0),new TerrainRect(350,400,300,50,0)],
				entities:[new GuyWithSword(450,360,0,150,4,1)],
				transitions:[new TransitionRect(660,250,10,150,1,0,0)],
			},
			8:{
				terrain:[new TerrainRect(0,500,650,50,0),
				new TerrainRect(250-80,230,40,80,0),new TerrainRect(300-80,280,40,80,0),
				new TerrainRect(350-80,330,40,80,0),
				new TerrainRect(400-80,380,40,80,0),new TerrainRect(450-80,430,40,80,0),
				new TerrainRect(0,180,150,50,0)],

				entities:[new GuyWithBow(600,130,Math.PI,1),
				new GuyWithBow(600,210,Math.PI,1),new GuyWithBow(600,370,Math.PI,1),new GuyWithBow(600,290,Math.PI,1)],

				transitions:[new TransitionRect(660,400,10,150,2,0,10),new TransitionRect(-20,400,10,150,9,0,610),
				new TransitionRect(-20,50,10,150,9,0,610)],
			},
			9:{
				terrain:[new TerrainRect(550,500,100,50,0),new TerrainRect(320,450,100,50,0),new TerrainRect(220,380,100,50,0),
				new TerrainRect(320,300,330,20,0),new TerrainRect(500,180,150,50,0),new TerrainRect(200,240,200,20,0)
				,new TerrainRect(120,450,100,50,0),new TerrainRect(0,500,100,50,0)
				],

				entities:[new GuyWithSword(200,200,0,160,6,1),new GuyWithSword(610,260,Math.PI,290,6,1),
				new GuyWithBow(120,200,0,1),new GuyWithBow(90,260,0,1),new GuyWithBow(70,320,0,1),new GuyWithBow(55,380,0,1),new GuyWithBow(45,440,0,1)],

				transitions:[new TransitionRect(660,400,10,150,8,0,10),new TransitionRect(660,50,10,150,8,0,10)],
			},
		};
	};
};

$(window).load(function () {
	//imgs.init();
	sounds.init();
});
//
function DeathAnimation (x,y,size,length,dissipation,color) {
	this.x=x;
	this.y=y;
	this.size=size;
	this.length=length;
	this.frame=0;
	this.finished=0;
	this.dissipation=dissipation;
	this.color=color;
	this.update=function  (ctx) {
		//this.draw(ctx);
		this.frame+=this.length/2;
		this.draw(ctx);
		if (this.frame>=this.length) {this.finished=1};

	};
	this.draw=function  (ctx) {
		var oldStyle= ctx.fillStyle;
		ctx.fillStyle=this.color;
		cutAndDraw(ctx,this.x,this.y+(this.size*3),this.size,this.size,this.dissipation,this.frame);
		ctx.fillStyle=oldStyle;
	};
};
function cutAndDraw (ctx,x,y,width,height,dissipation,iterate) {
	
	if (iterate==0) {
		return;
	};
	var xdiss=Math.random()*dissipation*1.8+((10-width)*2);
	if (Math.random()>0.5) {xdiss*=-1};
	var ydiss=Math.random()*dissipation*0.4-((10-width)*1.5);
	if (Math.random()>1) {ydiss*=-1};
	//
	if (width==height) {
		if (Math.random()>0) {var vertically=1};
	}
	else{
		if (width>height) {var vertically=1}
		else if (width<height) {var vertically=0};
	};
	if (vertically==1){ 
		var w = width/2;
		var h = height;
	}
	else if (vertically==0) {
		var h = height/2;
		var w = width;
	};
	//first rect
	ctx.fillRect(x+xdiss,y+ydiss,w,h);
	cutAndDraw(ctx,x+xdiss,y+ydiss,w,h,dissipation,iterate-1);
	
	if (vertically==1){ 
		 w += width/2;
	}
	else if (vertically==0) {
		 h += height/2;
	};
	ctx.fillRect(x+(-1*xdiss),y+(-1*ydiss),w,h);
	cutAndDraw(ctx,x+xdiss,y+ydiss,w,h,dissipation,iterate-1);
	
	

};
function RedButton (x,y,area) {
	this.x=x;
	this.y=y;
	this.area=area;
	this.rect=new Rect(x,y,20,30);
	this.smashed=0;
	this.update=function  (ctx,player) {
		if (player.equiped!='none') {
			if (player.equiped.type=='sword'&&player.equiped.active==1) {
				if (rectCollision(this.rect,player.equiped.rect)) {
					this.getSmashed();
				};
			};
		}
		else
		{
			if (game.sword.yVector!=0) {
				if (rectCollision(this.rect,game.sword.rect)) {
					this.getSmashed();
				};
			};
		};
		this.draw(ctx);
	};
	this.draw=function  (ctx) {
		ctx.fillStyle='red';
		this.rect.draw(ctx);
		ctx.fillStyle='black';
	};
	this.getSmashed=function  () {
		if (this.smashed==0) {
			game.smashed--;
			this.y+=20;
			this.rect.h=10;
			this.rect.set(this.x,this.y);
			this.smashed=1;
		};
	};
};
function Shield (x,y,area) {
	this.x=x;
	this.y=y;
	this.xVector=0;
	this.yVector=0;
	this.yMax=20;
	this.rect=new Rect(x,y,20,40);
	this.type='shield';
	this.active=1;
	this.area=area;
	this.detached=1;
	this.grounded=0;
	this.respawnArea=area;
	this.respawnX=x;
	this.respawnY=y;
	this.updateDetached=function  (ctx) {
		//movement (when detached)
		this.x+=this.xVector;
		this.y+=this.yVector;
		// body...
		
		this.rect.set(this.x,this.y);
		this.draw(ctx);
	};
	this.update=function  (ctx,player) {
		//movement (when detached)
		//this.x+=this.xVector;
		//this.y+=this.yVector;
		// body...
		this.area=player.area;
		this.y=player.rect.y;
		if (player.direction=='left') {
			this.x=player.rect.x-22;
		}
		else if(player.direction=='right'){
			this.x=player.rect.x+42;
		};
		this.rect.set(this.x,this.y);
		this.draw(ctx);
	};
	this.draw=function  (ctx) {
		this.rect.draw(ctx);
		ctx.fillRect(this.x-5,this.y+10,30,20);
	};
	this.detach=function  (player) {
		this.active=1;
		this.detached=1;
		this.yVector-=4-player.yVector;
		if (player.direction=='left') {
			this.xVector-=4-(player.xVector/2);
		}
		else if(player.direction=='right'){
			this.xVector+=4+(player.xVector/2);
		};
	};
	this.respawn=function  () {
		this.grounded=0;
		this.xVector=0;
		this.yVector=0;
		this.area=this.respawnArea;
		this.x=this.respawnX;
		this.y=this.respawnY;
		this.detached=1;
	};
};
function Sword (x,y,area) {
	this.x=x;
	this.y=y;
	this.xVector=0;
	this.yVector=0;
	this.yMax=20;
	this.rect=new Rect(x,y,20,40);
	this.type='sword';
	this.active=0;
	this.activeTime=8;
	this.activeTimer=0;
	this.reloadTime=15;
	this.reloadTimer=0;
	this.area=area;
	this.detached=1;
	this.grounded=0;
	this.respawnArea=area;
	this.respawnX=x;
	this.respawnY=y;
	//
	this.ydisp=0;
	this.swing=function  () {
		if (this.reloadTimer==0) {
			this.active=1;
			this.reloadTimer=1;
		};
	};
	this.updateDetached=function  (ctx) {
		//movement (when detached)
		this.x+=this.xVector;
		this.y+=this.yVector;
		// body...
		
		this.rect.set(this.x,this.y);
		ctx.fillRect(this.rect.x,this.y+18,40,4);
		this.rect.draw(ctx);
	};
	this.update=function  (ctx,player) {
		this.area=player.area;
		if (this.reloadTimer!=0) {
			this.reloadTimer++;
			if (this.reloadTimer==this.reloadTime) {
				this.reloadTimer=0;
			};
		};
		if (this.active==1) {
			
			this.ydisp+=6;
			this.y=player.rect.y+this.ydisp-20;
			this.activeTimer++;
			if (this.activeTimer>=this.activeTime) {
				this.ydisp=0;
				this.active=0;
				this.activeTimer=0;
			};
		};
		// body...
		if (this.active==0) {
			this.y=player.rect.y-20;
		};
		if (player.direction=='left') {
			this.x=player.rect.x-62;
		}
		else if(player.direction=='right'){
			this.x=player.rect.x+42;
		};
		this.rect.set(this.x+20,this.y);
		if (this.active==1) {
			this.y+=2;
			this.draw(ctx,player);
		};
	};
	this.draw=function  (ctx,player) {
		if (player.direction=='left') {
			ctx.fillRect(this.rect.x,this.y+18,40,4);
		}
		else if(player.direction=='right'){
			ctx.fillRect(this.x,this.y+18,40,4);
		};
		this.rect.draw(ctx);
	};

	this.detach=function  (player) {
		this.active=1;
		this.detached=1;
		this.yVector-=4-player.yVector;
		if (player.direction=='left') {
			this.xVector-=4-(player.xVector/2);
		}
		else if(player.direction=='right'){
			this.xVector+=4+(player.xVector/2);
		};
	};
	this.respawn=function  () {
		this.grounded=0;
		this.xVector=0;
		this.yVector=0;
		this.area=this.respawnArea;
		this.x=this.respawnX;
		this.y=this.respawnY;
		this.detached=1;
	};
};
function Player (x,y) {
	this.x=x;
	this.y=y;
	this.xVector=0;
	this.yVector=0;
	this.yMax=14;
	this.xMax=8;
	this.size=40;
	this.rect=new Rect(x,y,this.size,this.size);
	//
	this.walkAcceleration=1;
	this.jumpAcceleration=24;
	this.jumpMax=-16;
	this.stopJump=0;
	this.armor=0;
	this.life=1;
	this.equiped='none';
	this.grounded=0;
	this.halting=0;
	this.direction='right';
	this.area=0;
	this.update=function  () {
		this.area=game.currentArea;
		this.rect.set(this.x,this.y);
		this.x+=this.xVector;
		this.y+=this.yVector;
		//halt
		if (this.halting==1) {this.halt()};
		//
		if (this.equiped!='none') {
			this.equiped.update(game.ctx,this);
		};
	};
	this.draw=function  (ctx) {
		this.rect.draw(ctx);
		ctx.clearRect(this.x+14,this.y+14,4,4);
		ctx.clearRect(this.x+22,this.y+14,4,4);
	};
	this.goLeft=function  () {
		this.direction='left'
		this.halting=0;
		if (this.xVector>(-1*this.xMax)) {
			this.xVector-=this.walkAcceleration;
		};
	};
	this.goRight=function  () {
		this.direction='right'
		this.halting=0;
		if (this.xVector<this.xMax) {
			this.xVector+=this.walkAcceleration;
		};
	};
	/*this.jump=function  (param) {
		if (this.grounded==1) {
			this.yVector-=this.jumpAcceleration;
			this.grounded=0;
		};
	};*/
	this.jump=function  (param) {
		if (this.stopJump!=1&&this.yVector>this.jumpMax) {
			this.yVector-=this.jumpAcceleration/3;
			this.grounded=0;
		};
		if (this.yVector<=this.jumpMax) {
			this.stopJump=1;
			this.yVector=this.jumpMax
		};
	};
	this.halt=function  () {
		this.halting=1;
		if (this.xVector>0) {
			this.xVector-=this.walkAcceleration;
			if (this.xVector<=0) {
				this.halting=0;
				this.xVector=0;
			};
		}
		else{
			this.xVector+=this.walkAcceleration;
			if (this.xVector>=0) {
				this.halting=0;
				this.xVector=0;
			};
		};
	};
	this.active=function  () {
		if (this.equiped!='none') {
			if (this.equiped.type=='sword') {
				this.equiped.swing();
			};
		}
		else if(this.equiped=='none'){
			if (rectCollision(this.rect,game.sword.rect)) {
				this.equipSword(game.sword);
			}
			else if (rectCollision(this.rect,game.shield.rect)) {
				this.equipShield(game.shield);
			};
		};
	};
	this.getHit=function  () {
		//console.log('hit');
		sounds.dic['hit'].play();
		this.fell();
	};
	/*
	this.equipShield=function  () {
		this.equiped=new Shield(this.x,this.y);
	};
	this.equipSword=function  () {
		this.equiped=new Sword(this.x,this.y);
	};
	*/
	this.equipShield=function  (obj) {
		this.equiped=obj;
		obj.detached=0;
		obj.yVector=0;
		obj.xVector=0;
		obj.grounded=0;
	};
	this.equipSword=function  (obj) {
		this.equiped=obj;
		obj.detached=0;
		obj.yVector=0;
		obj.xVector=0;
		obj.grounded=0;
	};
	this.unequip=function  () {
		if (this.equiped!='none') {
			this.equiped.detach(this);
			this.equiped='none';
		}
		else if(this.equiped=='none'){
			if (rectCollision(this.rect,game.sword.rect)) {
				this.equipSword(game.sword);
			}
			else if (rectCollision(this.rect,game.shield.rect)) {
				this.equipShield(game.shield);
			};
		};
	};
	this.ignore=function  () {
		// body...
	};
	this.fell=function  () {
		game.map.reset();
		if (this.equiped!='none') {
			this.equiped.detach(this);
			this.equiped='none';
		};
		game.currentArea=7;
		game.player.area=7;
		game.player.x=30;
		game.player.y=-50;
		game.sword.respawn();
		game.shield.respawn();
		game.ctx2.clearRect(0,0,650,550);
	};
};
function TerrainRect (x,y,w,h,type) {
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.type=type;
	this.rect=new Rect(x,y,w,h);
	this.update=function  () {
		
	};
	this.draw=function  (ctx) {
		ctx.fillRect(this.x,this.y,this.w,this.h);
	};
	this.collideWithPlayer=function  (player) {
		if (rectCollision(this.rect,player.rect)) {
			//console.log(player.rect.right,this.x,player.xVector)
			if ((player.rect.bottom-player.yVector)<this.rect.top) {
				player.stopJump=0;
				player.grounded=1;
				player.yVector=0;
				player.y=this.y-player.size+1;
			};
			if ((player.rect.top+(-1*player.yVector))>this.rect.bottom) {
				player.yVector=0;
				player.y=this.rect.bottom;
			};

			if (player.rect.bottom!=this.y+1) {
				//hit left wall
				if ((player.rect.right-(player.xMax))<this.rect.x) {
					player.xVector=0;
					player.x=this.rect.x-player.size-1;
				};
				//hit right wall
				if ((player.rect.x+(player.xMax))>this.rect.right) {
					player.xVector=0;
					player.x=this.rect.right+1;
				};
			};
		};
	};
	this.collideWithSwordOrShield=function  (sword,shield) {
		if (rectCollision(this.rect,sword.rect)) {
			//console.log(sword.rect.right,this.x,sword.xVector)
			if ((sword.rect.bottom-sword.yVector)<this.rect.top) {
				sword.grounded=1;
				sword.yVector=0;
				sword.xVector=0;
				sword.y=this.y-sword.rect.h+1;
			};
			if ((sword.rect.top+(-1*sword.yVector))>this.rect.bottom) {
				sword.yVector=0;
				sword.xVector=0;
				sword.y=this.rect.bottom;
			};

			if (sword.rect.bottom!=this.y+1) {
				//hit left wall
				if ((sword.rect.right-(sword.xMax))<this.rect.x) {
					sword.xVector=0;
					sword.x=this.rect.x-sword.rect.h;
				};
				//hit right wall
				if ((sword.rect.x+(sword.xMax))>this.rect.right) {
					sword.xVector=0;
					sword.x=this.rect.right;
				};
			};
		};
		if (rectCollision(this.rect,shield.rect)) {
			//console.log(shield.rect.right,this.x,shield.xVector)
			if ((shield.rect.bottom-shield.yVector)<this.rect.top) {
				shield.grounded=1;
				shield.yVector=0;
				shield.xVector=0;
				shield.y=this.y-shield.rect.h;
			};
			if ((shield.rect.top+(-1*shield.yVector))>this.rect.bottom) {
				shield.yVector=0;
				shield.xVector=0;
				shield.y=this.rect.bottom;
			};

			if (shield.rect.bottom!=this.y+1) {
				//hit left wall
				if ((shield.rect.right-(shield.xMax))<this.rect.x) {
					shield.xVector=0;
					shield.x=this.rect.x-shield.rect.h;
				};
				//hit right wall
				if ((shield.rect.x+(shield.xMax))>this.rect.right) {
					shield.xVector=0;
					shield.x=this.rect.right;
				};
			};
		};
	};
};
function TransitionRect (x,y,w,h,to,changeXorY,changeTo) {
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.to=to;
	this.rect=new Rect(x,y,w,h);
	this.changeXorY=changeXorY;
	this.changeTo=changeTo;
	this.vertically=0;
	if (this.w<this.h) {this.vertically=1};
	this.update=function  () {
		this.drawSign();
	};
	this.drawSign=function  () {
		if (this.vertically==1) {
			var delta =0;
			for (var i =Math.floor(this.h/20); i >= 0; i--) {
				game.ctx.fillRect(this.x-25,this.y+delta,60,10);
				delta+=20;
			};
		}
		else if (this.vertically==0) {
			var delta =0;
			for (var i =Math.floor(this.w/20); i >= 0; i--) {
				game.ctx.fillRect(this.x+delta,this.y-25,10,60);
				delta+=20;
			};
		};
		
	};
	this.collideWithPlayer=function  (player) {
		//console.log(this.changeTo);
		if (rectCollision(this.rect,player.rect)) {
			sounds.dic['area'].play();
			game.map.reset();
			game.ctx2.clearRect(0,0,650,550);
			game.currentArea=this.to;
			if (this.changeXorY==0) {
				player.x=this.changeTo;
			}
			else{
				player.y=this.changeTo;
			}
			return true;
		};
		return false;
	};
	this.collideWithSwordOrShield=function  (sword,shield) {
		//console.log(this.changeTo);
		if (rectCollision(this.rect,sword.rect)) {
			console.log(this.to);
			sword.area=this.to;
			if (this.changeXorY==0) {
				sword.x=this.changeTo;
			}
			else{
				sword.y=this.changeTo;
			}
			
		};
		if (rectCollision(this.rect,shield.rect)) {
			shield.area=this.to;
			if (this.changeXorY==0) {
				shield.x=this.changeTo;
			}
			else{
				shield.y=this.changeTo;
			}
			
		};
	};
};
function GuyWithSword (x,y,direction,walkingDistance,movementSpeed,destructable) {
	this.x=x;
	this.y=y;
	this.direction=direction;
	this.walkingDistance=walkingDistance;
	this.walkedDistance=0;
	this.type='guywithsword';
	this.movementSpeed=movementSpeed;
	this.size=40;
	this.rect=new Rect(x,y,this.size,this.size);
	this.dead=0;
	this.destructable=destructable;
	this.update=function  () {
		var d=Math.cos(this.direction)*this.movementSpeed;
		this.x+=d;
		this.walkedDistance+=Math.abs(d);
		//console.log(this.walkedDistance,this.walkingDistance);
		if (this.walkedDistance>=this.walkingDistance) {
			this.walkedDistance=0;
			this.turn();
		};
		this.rect.set(this.x,this.y);
	};
	this.draw=function  (ctx) {
		this.rect.set(this.x,this.y);
		this.rect.draw(ctx);
		if (this.destructable==0) {
			ctx.clearRect(this.x+10,this.y+10,20,20);
			ctx.fillRect(this.x+15,this.y+15,10,10);
		};
	};
	this.collideWithPlayer=function  (player) {
		if (rectCollision(this.rect,player.rect)) {
			player.getHit();
			return true;
		};
		if (player.equiped!='none') {
			if (player.equiped.type=='sword'&&player.equiped.active==1) {
				if (rectCollision(this.rect,player.equiped.rect)) {
					this.getHit();
				};
			};
		}
		else if (game.sword.active==1&&game.sword.grounded==0) {
			if (rectCollision(this.rect,game.sword.rect)) {
				this.getHit();
			};
		};

	};
	this.turn=function  () {
		//console.log(this.direction);
		if (this.direction==0) {this.direction=Math.PI}
		else if(this.direction==Math.PI) {this.direction=0};
	};
	this.getHit=function  () {
		sounds.dic['slashhammer'].play();
		if (this.destructable==1) {
			this.dead=1;
			game.animations.push(new DeathAnimation(this.x,this.y,this.size/4,game.bloodQuality,game.bloodDissipation,game.bloodColor));
		};
	};
};
function GuyWithBow (x,y,direction,destructable) {
	this.x=x;
	this.y=y;
	this.direction=direction;
	this.reloadTime=(Math.random()*40)+40;
	this.reloadTimer=this.reloadTime-5;
	this.arrows=[];
	this.size=40;
	this.rect=new Rect(x,y,this.size,this.size);
	this.type='guywithbow';
	this.dead=0;
	this.destructable=destructable;
	this.update=function  () {
		this.reloadTimer++;
		if (this.reloadTimer>=this.reloadTime) {this.shoot()};
	};
	this.draw=function  (ctx) {
		this.rect.set(this.x,this.y);
		this.rect.draw(ctx);
	};
	this.shoot=function  () {
		var speed= (Math.random()*5)+5;
		this.arrows.push(new Arrow(this.x,this.y,this.direction,speed));
		this.reloadTimer=0;
		this.reloadTime=(Math.random()*40)+40;
	};
	this.collideWithPlayer=function  (player) {
		if (rectCollision(this.rect,player.rect)) {
			player.getHit();
			return true;
		};
		if (player.equiped!='none') {
			if (player.equiped.type=='sword'&&player.equiped.active==1) {
				if (rectCollision(this.rect,player.equiped.rect)) {
					this.getHit();
				};
			};
		}
		else if (game.sword.active==1&&game.sword.grounded==0) {
				if (rectCollision(this.rect,game.sword.rect)) {
					this.getHit();
				};
		};
		for (var i = this.arrows.length - 1; i >= 0; i--) {
			this.arrows[i].update();
			this.arrows[i].collideWithPlayer(player);
			//delete if off screen or hit
			if (this.arrows[i].x>600) {this.arrows.splice(i,1)}
			else if (this.arrows[i].x<0) {this.arrows.splice(i,1)}
			else if (this.arrows[i].y>550) {this.arrows.splice(i,1)}
			else if (this.arrows[i].y<0) {this.arrows.splice(i,1)}
			else if (this.arrows[i].dead==1) {this.arrows.splice(i,1)};
			//
		};
	};
	this.getHit=function  () {
		sounds.dic['slashhammer'].play();
		if (this.destructable==1) {
			this.dead=1;
			game.animations.push(new DeathAnimation(this.x,this.y,this.size/4,game.bloodQuality,game.bloodDissipation,game.bloodColor));
		};
	};
};
function Arrow (x,y,direction,speed) {
	this.x=x;
	this.y=y;
	this.direction=direction;
	this.speed=speed;
	this.rect=new Rect(x,y,40,10);
	this.dead=0;
	this.update=function  () {
		this.x+=Math.cos(this.direction)*this.speed;
		this.y+=Math.sin(this.direction)*this.speed;
		this.rect.set(this.x,this.y);
		this.draw(game.ctx);
	};
	this.draw=function  (ctx) {
		this.rect.draw(ctx);
	};
	this.collideWithPlayer=function  (player) {
		if (player.equiped!='none') {
			if (player.equiped.type=='shield'&&player.equiped.active==1) {
				if (rectCollision(this.rect,player.equiped.rect)) {
					this.dead=1;
				};
			};
		};
		if (rectCollision(this.rect,player.rect)) {
			player.getHit();
		};
		if (game.shield.active&&game.shield.detached) {
			if (rectCollision(this.rect,game.shield.rect)) {
				this.dead=1;
			};
		};
	};
};


function Render (isAnimation,source,name,frames,width) {
	this.source=source;
	this.isAnimation=isAnimation;
	this.name=name;
	this.frames=frames-1;
	this.frame=0;
	this.width=width;
	this.direction="right";
	this.imgObj=imgJson['frames'][this.name];
	this.tickDelay=4;
	this.tickTime=0;
	this.draw=function  (x,y) {
		if (this.isAnimation==0) {
			drawImgObj(this.imgObj,this.source,x,y);
		}
		else{
			drawAnimation(this.imgObj,this.source,x,y,this.frame,this.width);
		};
	};
	this.tick=function  () {
		this.tickTime++;
		if (this.tickTime==this.tickDelay) {
			if (this.direction=="right") {
				this.frame++;
				if (this.frame>=this.frames) {
					this.direction="left"

				};
			}
			else{
				this.frame--;
				if (this.frame<=0) {
					this.direction="right"
				};
			};
			this.tickTime=0;
		};
	};
	this.reset=function  (where) {
		if (where>=0) {
			this.frame=where;
			return;
		};
		this.frame=1;
	};
};
//
var	imgs = {
	init: function  () {
		imgs.done=0;
		imgs.all_done=0;
		imgs.sources=["C:/Documents and Settings/SENS/Desktop/dev/webgamedev/sushi/images/packed/packed.png",
		"C:/Documents and Settings/SENS/Desktop/dev/webgamedev/sushi/design/bg.png",
		"C:/Documents and Settings/SENS/Desktop/dev/webgamedev/sushi/design/curtain.png"
			];
		imgs.dic={};
		imgs.len=imgs.sources.length;
		//
		for (var i = 0; i < imgs.sources.length; i++) {
			var src = imgs.sources[i];
			var name = imgName(src);
			var img = new Image;
			img.onload = imgs.loaded;
			img.src = src;
			imgs.dic[name] = img;
		};
	},
	loaded:function  () {
		if(imgs.done<imgs.len){imgs.done++;}
		if(imgs.done==imgs.len){imgs.finished()}
		
	},
	finished: function  () {
		imgs.all_done=1;
		game.init('arcade');
	},
};
function imgName (src) {
	var i  = src.lastIndexOf('/');
	var ii = src.indexOf('.png');
	return src.slice(i+1,ii);
};
function soundName (src) {
	var i  = src.lastIndexOf('/');
	var ii = src.indexOf('.wav');
	return src.slice(i+1,ii);
};
function drawImgObj (obj,source,tox,toy) {
	var x =obj.frame.x;
	var y =obj.frame.y;
	var w =obj.frame.w;
	var h =obj.frame.h;
	var ssw=obj.sourceSize.w;
	var ssh=obj.sourceSize.h;
	//game.ctx.drawImage(imgs.dic[source],x,y,w,h,tox-(ssw/2),toy-(ssh/2),ssw,ssh);
	game.ctx.drawImage(imgs.dic[source],x,y,w,h,tox,toy,ssw,ssh);
};
function drawImgObjScale (obj,source,tox,toy,dw,dh) {
	var x =obj.frame.x;
	var y =obj.frame.y;
	var w =obj.frame.w;
	var h =obj.frame.h;
	var ssw=obj.sourceSize.w;
	var ssh=obj.sourceSize.h;
	//game.ctx.drawImage(imgs.dic[source],x,y,w,h,tox-(ssw/2),toy-(ssh/2),ssw,ssh);
	game.ctx.drawImage(imgs.dic[source],x,y,w,h,tox,toy,ssw+dw,ssh+dh);
};
function drawAnimation (obj,source,tox,toy,frame,width) {
	var x =obj.frame.x+(frame*width);
	var y =obj.frame.y;
	var w =width;
	var h =obj.frame.h;
	var ssw=width;
	var ssh=obj.sourceSize.h;
	game.ctx.drawImage(imgs.dic[source],x,y,w,h,tox-(ssw/2),toy-(ssh/2),ssw,ssh);
};

function write (ctx,x,y,text,size,color) {
	var initstyle=ctx.fillStyle;
	ctx.font = "bold " + size.toString() + "px sans-serif";
	ctx.fillStyle=color;
	ctx.fillText(text,x,y);
	ctx.fillStyle=initstyle;
};
function Button (x,y,w,h,imgObj,onClick,hotKey) {
	// body...
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.imgObj=imgObj;
	this.onClick=onClick;
	this.hotKey=hotKey;
	this.rect=new Rect(x,y,w,h);
	this.mouseOn=0;
	this.updateNoMouse=function  (ctx) {
		this.drawRect(ctx);
	};
	this.update=function  (mouseObj,ctx) {
		// body...
		if (mouseObj!=0) {
			var x=mouseObj.pageX-(mouseObj.target.offsetLeft);
			var y=mouseObj.pageY-(mouseObj.target.offsetTop);;
			// left click
			if (pointInRect(x,y,this.rect)) {
				this.mouseOn=1;
				if (mouseObj.which==1) {
					this.onClick();
				};
			}
			else  {
				this.mouseOn=0;
			};
		};
		//draw
		this.drawRect(ctx);
	};
	this.draw=function  (ctx) {
		this.drawRect(ctx);
	};
	this.drawRect=function  (ctx) {
		ctx.fillStyle='black';
		if (this.mouseOn==1) {ctx.fillStyle='yellow';};
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.fillStyle='black';
	};
};
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//audio////////////////////////////////////////////////////////////////////////////////////
var sounds= {
	init: function  () {
		//console.log(1111111);
		sounds.done=0;
		sounds.all_done=0;
		sounds.sources=[
		"https://dl.dropboxusercontent.com/u/226028257/ld28/sounds/area.wav",
		"https://dl.dropboxusercontent.com/u/226028257/ld28/sounds/hit.wav",
		"https://dl.dropboxusercontent.com/u/226028257/ld28/sounds/slashhammer.wav"
			];
		sounds.dic={};
		sounds.len=sounds.sources.length;
		//
		for (var i = 0; i < sounds.sources.length; i++) {
			var src = sounds.sources[i];
			var sound = new Audio(src);
			var name = soundName(src);
			//sound.onloadeddata = sounds.loaded();
			//sound.oncanplaythrough = sounds.loaded();
			sounds.dic[name] = sound;
		};
		sounds.finished();
	},
	loaded:function  () {
		if(sounds.done<sounds.len){sounds.done++;}
		if(sounds.done==sounds.len){sounds.finished()}
		
	},
	finished: function  () {
		sounds.all_done=1;
		//imgs.init();
		game.init();
	},
	onAddSushi:function  () {
		//sounds.addSushi.play();
		sounds.dic['onAddSushi'].play();
	},
	onGrabFavorite:function  () {
		sounds.dic['tala'].play();
	},
	onGrabNotFavorite:function  () {
		sounds.dic['notFavorite'].play();
	},
	onWasteSushi:function  () {
		sounds.dic['wasteSushi'].play();
	},


}
//
function Rect (x,y,w,h) {
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    //
    this.left=this.x;
    this.right=this.x+this.w;
    this.top=this.y;
    this.bottom=this.y+this.h;
    //
    this.set =function  (x,y) {
        this.x=x;
        this.y=y;
        //
        this.left=this.x;
        this.right=this.x+this.w;
        this.top=this.y;
        this.bottom=this.y+this.h;
        return this;
    };
    this.setSize=function (w,h) {
        this.w=w;
        this.h=h;
        this.right=this.x+this.w;
        this.bottom=this.y+this.h;
        this.top=this.y;
        this.left=this.x;
    };
    this.draw=function  (ctx) {
    	ctx.fillRect(this.x,this.y,this.w,this.h);
    };
};
function pointInRect (x,y,rect) {
    if(x>=rect.left && x<=rect.right && y>=rect.top && y<=rect.bottom ){return true;}
    else if(rect.h<0&&rect.w>0){
    	if(x>rect.left && x<rect.right && y<rect.top && y>rect.bottom ){return true;};
    }
    else if(rect.h>0&&rect.w<0){
    	if(x<rect.left && x>rect.right && y>rect.top && y<rect.bottom ){return true;};
    }
    else if(rect.h<0&&rect.w<0){
    	if(x<rect.left && x>rect.right && y<rect.top && y>rect.bottom ){return true;};
    }
    else{return false;};

};
function rectCollision (rect1, rect2) {
    var rp1 = [[rect1.x,rect1.y],[rect1.x+rect1.w,rect1.y],[rect1.x,rect1.y+rect1.h],
    [rect1.x+rect1.w,rect1.y+rect1.h]];
    var rp2 = [[rect2.x,rect2.y],[rect2.x+rect2.w,rect2.y],[rect2.x,rect2.y+rect2.h],
    [rect2.x+rect2.w,rect2.y+rect2.h]];

    for (var i =0; i < rp1.length; i++) {
        if(pointInRect(rp1[i][0],rp1[i][1],rect2)==true ){return true;}
    };
    for (var i =0; i < rp2.length; i++) {
        if(pointInRect(rp2[i][0],rp2[i][1],rect1)==true ){return true;}
    };
    return false;
    
};
var imgJson={"frames": {

"gakiEatAnim.png":
{
	"frame": {"x":0,"y":200,"w":600,"h":150},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":600,"h":150},
	"sourceSize": {"w":600,"h":150}
},
"gakiLookAnim.png":
{
	"frame": {"x":2,"y":64,"w":600,"h":150},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":600,"h":150},
	"sourceSize": {"w":600,"h":150}
},
"richEatAnim.png":
{
	"frame": {"x":0,"y":500,"w":600,"h":150},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":600,"h":150},
	"sourceSize": {"w":600,"h":150}
},
"richLookAnim.png":
{
	"frame": {"x":0,"y":350,"w":600,"h":150},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":600,"h":150},
	"sourceSize": {"w":600,"h":150}
},
"sumoEatAnim.png":
{
	"frame": {"x":0,"y":800,"w":600,"h":150},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":600,"h":150},
	"sourceSize": {"w":600,"h":150}
},
"sumoLookAnim.png":
{
	"frame": {"x":0,"y":650,"w":600,"h":150},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":600,"h":150},
	"sourceSize": {"w":600,"h":150}
},
"bizEatAnim.png":
{
	"frame": {"x":0,"y":1100,"w":600,"h":150},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":600,"h":150},
	"sourceSize": {"w":600,"h":150}
},
"bizLookAnim.png":
{
	"frame": {"x":0,"y":950,"w":600,"h":150},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":600,"h":150},
	"sourceSize": {"w":600,"h":150}
},
"rail.png":
{
	"frame": {"x":2,"y":2,"w":400,"h":60},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":400,"h":60},
	"sourceSize": {"w":400,"h":60}
},
"dotdot.png":
{
	"frame": {"x":460,"y":80,"w":50,"h":90},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":50,"h":90},
	"sourceSize": {"w":50,"h":90}
},
"heart.png":
{
	"frame": {"x":510,"y":80,"w":50,"h":90},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":50,"h":90},
	"sourceSize": {"w":50,"h":90}
},
"thoughtBubble.png":
{
	"frame": {"x":570,"y":75,"w":70,"h":120},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":120},
	"sourceSize": {"w":70,"h":120}
},
"salmon.png":
{
	"frame": {"x":466,"y":2,"w":60,"h":60},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":60},
	"sourceSize": {"w":60,"h":60}
},
"onigiri.png":
{
	"frame": {"x":530,"y":0,"w":60,"h":60},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":60},
	"sourceSize": {"w":60,"h":60}
},
"tamago.png":
{
	"frame": {"x":404,"y":2,"w":60,"h":60},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":60},
	"sourceSize": {"w":60,"h":60}
}
}
}





