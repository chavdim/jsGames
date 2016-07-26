$(window).load(function () {
	//imgs.init();
	sounds.init();
});
function Snowball (x,y) {
	this.x=x;
	this.y=y;
	this.size=10;
	this.charging=1;
	this.thrown=0;
	this.newlyGrounded=0;
	this.grounded=0;
	this.addToMap=0;
	this.maxSize=40;
	this.sizeChangeRate=2;
	this.rect=new Rect(x,y,this.size,this.size);
	//
	this.xVector=18;
	this.yVector=-1;
	this.yMax=18;
	this.xMax=18;
	this.charge=function  () {
		if (this.size<this.maxSize) {
			this.size+=this.sizeChangeRate;
			this.x-=this.sizeChangeRate/2;
			this.y-=this.sizeChangeRate/2;
		};
	};
	this.update=function  (ctx) {
		this.draw(ctx);
		this.rect.set(this.x,this.y);
		this.rect.setSize(this.size,this.size);
		if (this.charging==1) {
			this.charge();
		};
		if (this.thrown==1) {
			this.move();
		};
		if (this.grounded==1) {
			this.xVector=0;
			if (this.newlyGrounded==0) {
				this.newlyGrounded=1;
				this.addToMap=1;
			};
		};
	};
	this.move=function  () {
		this.x+=this.xVector;
		this.y+=this.yVector;
	};
	this.draw=function  (ctx) {
		ctx.fillStyle="white";
		ctx.fillRect(this.x,this.y,this.size,this.size);
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.x,this.y,this.size,this.size);
	};
};
function Badguy (x,y,moveDistance,direction) {
	this.x=x;
	this.y=y;
	this.size=40;
	this.width=30;
	this.height=80;
	this.rect=new Rect(x,y,this.width,this.height);
	this.dead=0;
	this.originalSpeed=3;
	this.snowed=0;
	this.snowedMax=this.originalSpeed;
	//TIME AFFECTED BY SNOW
	this.snowedTime=120;
	this.snowedTIMER=0;
	//
	this.speed=this.originalSpeed;
	this.moveDistance=moveDistance;
	this.originalMoveDistance=moveDistance;
	//
	this.life=1;
	this.grounded=0;
	this.halting=0;
	this.direction=direction;
	this.area=0;
	this.update=function  () {
		//
		this.speed=this.originalSpeed-this.snowed;
		//
		//this.area=game.currentArea;
		this.rect.set(this.x,this.y);
		//this.x+=this.xVector;
		//this.y+=this.yVector;
		if (this.direction=="right") {
			this.x+=this.speed;
			this.moveDistance-=this.speed;
			if (this.moveDistance<=0) {
				this.direction="left";
				this.moveDistance=this.originalMoveDistance;
			};
		}
		else if (this.direction=="left") {
			this.x-=this.speed;
			this.moveDistance-=this.speed;
			if (this.moveDistance<=0) {
				this.direction="right";
				this.moveDistance=this.originalMoveDistance;
			};
		};
		if (this.snowed!=0) {
			this.snowedTIMER+=1;
			if (this.snowedTIMER==this.snowedTime) {
				this.snowed-=1;
				this.snowedTIMER=0;
			};
		};
	};
	this.draw=function  (ctx) {
		ctx.fillStyle="green";
		this.rect.draw(ctx);
		ctx.fillStyle="white";
		ctx.fillRect(this.x,this.y+20,this.snowed*10,this.snowed*10);
		ctx.clearRect(this.x+14,this.y+14,4,4);
		ctx.clearRect(this.x+22,this.y+14,4,4);
	};
	this.collideWithPlayer=function  (player) {
		if (this.snowed!=this.snowedMax) {
			if (rectCollision(this.rect,player.rect)) {
				player.getHit();
			};
		};
		
		
	};
	this.collideWithSnowball=function  (snowball) {
		if (rectCollision(this.rect,snowball.rect)) {
			//snowball.getHit();
			sounds.dic["hit"].play();
			if (this.snowed<this.snowedMax) {
				snowball.dead=1;
				this.snowed+=1;
				this.snowedTIMER=0;
				if (snowball.size==snowball.maxSize) {this.snowed=this.snowedMax};
			};
		};

	};
	
};
function Badguy2 (x,y,moveDistance,direction) {
	this.x=x;
	this.y=y;
	this.size=40;
	this.width=80;
	this.height=30;
	this.rect=new Rect(x,y,this.width,this.height);
	this.dead=0;
	this.originalSpeed=4;
	this.snowed=0;
	this.snowedMax=this.originalSpeed;
	//TIME AFFECTED BY SNOW
	this.snowedTime=120;
	this.snowedTIMER=0;
	//
	this.speed=this.originalSpeed;
	this.moveDistance=moveDistance;
	this.originalMoveDistance=moveDistance;
	//
	this.life=1;
	this.grounded=0;
	this.halting=0;
	this.direction=direction;
	this.area=0;
	this.update=function  () {
		//
		this.speed=this.originalSpeed-this.snowed;
		//
		//this.area=game.currentArea;
		this.rect.set(this.x,this.y);
		//this.x+=this.xVector;
		//this.y+=this.yVector;
		if (this.direction=="right") {
			this.x+=this.speed;
			this.moveDistance-=this.speed;
			if (this.moveDistance<=0) {
				this.direction="left";
				this.moveDistance=this.originalMoveDistance;
			};
		}
		else if (this.direction=="left") {
			this.x-=this.speed;
			this.moveDistance-=this.speed;
			if (this.moveDistance<=0) {
				this.direction="right";
				this.moveDistance=this.originalMoveDistance;
			};
		};
		if (this.snowed!=0) {
			this.snowedTIMER+=1;
			if (this.snowedTIMER==this.snowedTime) {
				this.snowed-=1;
				this.snowedTIMER=0;
			};
		};
	};
	this.draw=function  (ctx) {
		ctx.fillStyle="green";
		this.rect.draw(ctx);
		ctx.fillStyle="white";
		ctx.fillRect(this.x,this.y+20,this.snowed*10,this.snowed*10);
		ctx.clearRect(this.x+14,this.y+14,4,4);
		ctx.clearRect(this.x+22,this.y+14,4,4);
	};
	this.collideWithPlayer=function  (player) {
		if (this.snowed!=this.snowedMax) {
			if (rectCollision(this.rect,player.rect)) {
				player.getHit();
			};
		};
		
		
	};
	this.collideWithSnowball=function  (snowball) {
		if (rectCollision(this.rect,snowball.rect)) {
			//snowball.getHit();
			sounds.dic["hit"].play();
			if (this.snowed<this.snowedMax) {
				snowball.dead=1;
				this.snowed+=1;
				this.snowedTIMER=0;
				if (snowball.size>=snowball.maxSize-5) {this.snowed=this.snowedMax};
			};
		};

	};
	
};
function Badguy3 (x,y,moveDistance,direction) {
	this.x=x;
	this.y=y;
	this.direction=direction;
	//this.reloadTime=(Math.random()*40)+40;
	this.reloadTime=10;
	this.reloadTimer=this.reloadTime-5;
	this.arrows=[];
	this.size=40;
	this.rect=new Rect(x,y,this.size,this.size);
	this.type='guywithbow';
	this.dead=0;
	if (this.direction=="right") {this.arrowDirection=0;}
	else {this.arrowDirection=Math.PI;};
	this.originalSpeed=3;
	this.snowed=0;
	this.snowedMax=this.originalSpeed;
	//TIME AFFECTED BY SNOW
	this.snowedTime=180;
	this.snowedTIMER=0;
	this.destructable=1;
	this.update=function  () {
		this.reloadTimer++;
		if (this.reloadTimer>=this.reloadTime) {this.shoot()};
		//
		this.rect.set(this.x,this.y);
		if (this.snowed!=0) {
			this.snowedTIMER+=1;
			if (this.snowedTIMER==this.snowedTime) {
				this.snowed-=1;
				this.snowedTIMER=0;
			};
		};
	};
	this.draw=function  (ctx) {
		ctx.fillStyle="green";
		this.rect.draw(ctx);
		ctx.fillStyle="white";
		ctx.fillRect(this.x,this.y+20,this.snowed*10,this.snowed*10);
		ctx.clearRect(this.x+14,this.y+14,4,4);
		ctx.clearRect(this.x+22,this.y+14,4,4);
	};
	this.shoot=function  () {
		if (this.snowed!=this.snowedMax) {
			var speed= (Math.random()*5)+5;
			this.arrows.push(new Arrow(this.x,this.y,this.arrowDirection,speed));
			this.reloadTimer=0;
			//this.reloadTime=(Math.random()*40)+40;
		};
	};
	this.collideWithPlayer=function  (player) {
		if (this.snowed!=this.snowedMax) {
			if (rectCollision(this.rect,player.rect)) {
				player.getHit();
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
		//sounds.dic['slashhammer'].play();
		if (this.destructable==1) {
			this.dead=1;
			//game.animations.push(new DeathAnimation(this.x,this.y,this.size/4,game.bloodQuality,game.bloodDissipation,game.bloodColor));
		};
	};
	this.collideWithSnowball=function  (snowball) {
		if (rectCollision(this.rect,snowball.rect)) {
			//snowball.getHit();
			sounds.dic["hit"].play();
			if (this.snowed<this.snowedMax) {
				snowball.dead=1;
				this.snowed+=1;
				this.snowedTIMER=0;
				if (snowball.size>=snowball.maxSize-5) {this.snowed=this.snowedMax};
			};
		};

	};
};
function Boss (x,y) {
	this.x=x;
	this.y=y;
	//this.direction=direction;
	//this.reloadTime=(Math.random()*40)+40;
	this.reloadTime=10;
	this.reloadTimer=this.reloadTime-5;
	this.arrows=[];
	this.size=100;
	this.rect=new Rect(x,y,this.size,this.size);
	this.type='guywithbow';
	this.dead=0;
	//if (this.direction=="right") {this.arrowDirection=0;}
	//else {this.arrowDirection=Math.PI;};
	this.originalSpeed=10;
	this.snowed=0;
	this.snowedMax=this.originalSpeed;
	//TIME AFFECTED BY SNOW
	this.snowedTime=180;
	this.snowedTIMER=0;
	this.destructable=1;
	//
	this.changeTime=120;
	this.changeTimer=0;
	this.turret1=new Badguy3(this.x-30,170,100,"right");
	this.turret2=new Badguy3(this.x-30,240,100,"right");
	this.move1to=0;
	this.move2to=0;
	this.state="shooting";
	this.choices=[100,170,240];

	this.update=function  () {
		this.reloadTimer++;
		//
		//this.changeTimer+=1;
		if (this.changeTimer==this.changeTime) {
			var c=shuffle(this.choices);
			this.move1to=c[0];
			this.move2to=c[1];
			this.state="shifting";
			this.changeTimer=0;

		};
		if (this.snowed!=0) {
			this.snowedTIMER+=1;
			if (this.snowedTIMER==this.snowedTime) {
				this.snowed-=1;
				this.snowedTIMER=0;
			};
		};
		//
		if (this.state=="shifting") {
			if (this.turret1.y<this.move1to) {this.turret1.y+=1};
			if (this.turret1.y>this.move1to) {this.turret1.y-=1};
			
			if (this.turret2.y<this.move2to) {this.turret2.y+=1};
			if (this.turret2.y>this.move2to) {this.turret2.y-=1};

			if (this.turret1.y==this.move1to && this.turret2.y==this.move2to) {
				this.state="shooting";
				this.changeTimer=0;
				this.turret1.arrows=[];
				this.turret2.arrows=[];
			};
		};
		this.turret1.update();
		this.turret2.update();
		if (this.state=="shooting") {
			this.changeTimer+=1;
			this.turret1.collideWithPlayer(game.player);
			this.turret2.collideWithPlayer(game.player);
		};
		//if (this.reloadTimer>=this.reloadTime) {this.shoot()};
		//
		this.rect.set(this.x,this.y);

		
	};
	this.draw=function  (ctx) {
		
		this.turret1.draw(ctx);
		this.turret2.draw(ctx);
		ctx.fillStyle="green";
		this.rect.draw(ctx);
		ctx.fillStyle="white";
		ctx.fillRect(this.x,this.y+20,this.snowed*10,this.snowed*10);
		ctx.clearRect(this.x+14,this.y+14,4,4);
		ctx.clearRect(this.x+22,this.y+14,4,4);
	};
	this.shoot=function  () {
		if (this.snowed!=this.snowedMax) {
			var speed= (Math.random()*5)+5;
			this.arrows.push(new Arrow(this.x,this.y,this.arrowDirection,speed));
			this.reloadTimer=0;
			//this.reloadTime=(Math.random()*40)+40;
		};
	};
	this.collideWithPlayer=function  (player) {
		if (this.snowed!=this.snowedMax) {
			if (rectCollision(this.rect,player.rect)) {
				player.getHit();
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
		//sounds.dic['slashhammer'].play();
		if (this.destructable==1) {
			this.dead=1;
			//game.animations.push(new DeathAnimation(this.x,this.y,this.size/4,game.bloodQuality,game.bloodDissipation,game.bloodColor));
		};
	};
	this.collideWithSnowball=function  (snowball) {
		if (rectCollision(this.rect,snowball.rect)) {
			//snowball.getHit();
			sounds.dic["hit"].play();
			if (this.snowed<this.snowedMax) {
				snowball.dead=1;
				this.snowed+=1;
				this.snowedTIMER=0;
				//if (snowball.size>=snowball.maxSize-5) {this.snowed=this.snowedMax};
			};
		};
		if (this.snowed>=this.snowedMax) {game.bossDefeated()};

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
		ctx.fillStyle="green";
		this.rect.draw(ctx);
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.x,this.y,40,10);
	};
	this.collideWithPlayer=function  (player) {
		if (rectCollision(this.rect,player.rect)) {
			player.getHit();
		};
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
	this.playerDesign=new PlayerDesign(x,y,this.size,this.size);
	//
	this.walkAcceleration=1;
	this.jumpAcceleration=26;
	this.jumpMax=-16;
	this.stopJump=0;
	this.armor=0;
	this.life=1;
	this.equiped='none';
	this.grounded=0;
	this.halting=0;
	this.direction='right';
	this.area=0;
	this.update=function  (ctx) {
		this.area=game.currentArea;
		this.rect.set(this.x,this.y);
		this.playerDesign.set(this.x,this.y);
		this.x+=this.xVector;
		this.y+=this.yVector;
		//halt
		if (this.halting==1) {this.halt()};
		//
		if (this.equiped!='none') {
			this.equiped.update(game.ctx,this);
		};
		this.draw(ctx);
	};

	this.draw=function  (ctx) {
		ctx.fillStyle="rgb(255,198,98)";
		this.rect.draw(ctx);
		this.playerDesign.drawDesign(ctx);
		//EYES
		ctx.clearRect(this.x+10,this.y+6,8,8);
		ctx.clearRect(this.x+22,this.y+6,8,8);
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.x+10,this.y+6,8,8);
		ctx.strokeRect(this.x+22,this.y+6,8,8);
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
		sounds.dic["jump"].volume=0.5;
		sounds.dic["jump"].play();
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
		
	};
	this.getHit=function  () {
		//console.log('hit');
		sounds.dic['getHit'].play();
		this.fell();
		console.log("player hit");
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
		if (game.state==2) {game.map.data[8].entities.splice(1,1);};
		if (game.state==2) {game.map.data[5].entities.splice(2,1);};
		//game.currentArea=7;
		//game.player.area=7;
		game.player.x=30;
		game.player.y=-50;
		if (game.state==1) {
			//game.player.x=30;
			//game.player.y=-50;
			if (game.currentArea==2) {
				game.player.x=30;
				game.player.y=450;
			};
			if (game.currentArea==7) {
				game.player.x=30;
				game.player.y=450;
			};
			if (game.currentArea==9) {
				game.player.x=600;
				game.player.y=450;
			};
			if (game.currentArea==10) {
				game.player.x=600;
				game.player.y=-30;
			};
			if (game.currentArea==11) {
				game.player.x=600;
				game.player.y=-30;
			};
		}
		else if (game.state==2) {
			if (game.currentArea==2) {
				game.player.x=30;
				game.player.y=450;
			};
			//if (game.currentArea==7) {
			//	game.player.x=30;
			//	game.player.y=450;
			//};
			if (game.currentArea==5) {
				game.player.x=550;
				game.player.y=530;
			};
			if (game.currentArea==9) {
				game.player.x=600;
				game.player.y=450;
			};
			if (game.currentArea==8) {
				game.player.x=20;
				game.player.y=450;
			};
			//if (game.currentArea==10) {
				//game.player.x=600;
				//game.player.y=-30;
			//};
			if (game.currentArea==11) {
				game.player.x=600;
				game.player.y=-30;
			};
		};
		//game.ctx2.clearRect(0,0,650,550);
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
				game.ctx.strokeStyle = "black";
				game.ctx.strokeRect(this.x-25,this.y+delta,60,10);
			};
		}
		else if (this.vertically==0) {
			var delta =0;
			for (var i =Math.floor(this.w/20); i >= 0; i--) {
				game.ctx.fillRect(this.x+delta,this.y-25,10,60);
				delta+=20;
				game.ctx.strokeRect(this.x+delta,this.y-25,10,60);
			};
		};
		
	};
	this.collideWithPlayer=function  (player) {
		//console.log(this.changeTo);
		if (rectCollision(this.rect,player.rect)) {
			sounds.dic['pass'].play();
			game.map.reset();
			if (game.state==2) {game.map.data[8].entities.splice(1,1);};
			if (game.state==2) {game.map.data[5].entities.splice(2,1);};
			//game.ctx2.clearRect(0,0,650,550);
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
};
//
function PlayerDesign (x,y,w,h) {
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
    this.drawDesign=function  (ctx) {
		//HAT
		ctx.strokeStyle = "black";
		ctx.fillStyle="white";
		ctx.fillRect(this.x+13,this.y-30,14,14);
		ctx.strokeRect(this.x+13,this.y-30,14,14);
		ctx.fillStyle="green";
		ctx.fillRect(this.x-2,this.y-18,this.w+4,15);
		ctx.strokeRect(this.x-2,this.y-18,this.w+4,15);
		ctx.fillStyle="red";
		ctx.fillRect(this.x-5,this.y-5,this.w+10,this.w/4);
		ctx.strokeRect(this.x-5,this.y-5,this.w+10,this.w/4);
		//JACKET
		ctx.fillStyle="red";
		ctx.fillRect(this.x-2,this.y+15,this.w+4,25);
		ctx.fillStyle="green";
		ctx.fillRect(this.x+16,this.y+15,8,25);
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.x-2,this.y+15,this.w+4,25);
	};
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
};
//
function soundName (src) {
	var i  = src.lastIndexOf('/');
	var ii = src.indexOf('.wav');
	return src.slice(i+1,ii);
};
var sounds= {
	init: function  () {
		sounds.done=0;
		sounds.all_done=0;
		sounds.sources=["https://dl.dropboxusercontent.com/u/226028257/bgm2.wav",
		"https://dl.dropboxusercontent.com/u/226028257/ld28/sounds/area.wav",
		"https://dl.dropboxusercontent.com/u/226028257/hit.wav",
		"https://dl.dropboxusercontent.com/u/226028257/getHit.wav",
		"https://dl.dropboxusercontent.com/u/226028257/jump.wav",
		"https://dl.dropboxusercontent.com/u/226028257/pass.wav",
		"https://dl.dropboxusercontent.com/u/226028257/throw.wav",
		"https://dl.dropboxusercontent.com/u/226028257/alarm.wav",
		"https://dl.dropboxusercontent.com/u/226028257/smallbgm.wav"
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
    	if (this.w>=20) {ctx.strokeStyle = "black";
		ctx.strokeRect(this.x,this.y,this.w,this.h);};

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
function shuffle(array) {
  var n = array.length, t, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}