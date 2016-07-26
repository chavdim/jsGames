function Game (stage,attributes,objects) {
	//OBJECTS
	//this.currentGameObjects=getStageGameObjects(stage);
	this.currentVisualObjects=getGameModeBG(stage);
	this.currentMenuObjects=getGameModeMenuObjects(stage);
	//mechanical variables for map
	this.repeated=0;
	this.timeStep=0;
	this.stage=stage;
	//ADD STAGE IF EXISTS
	if (stage!="") {this.stageData=mapData[stage];};
	//TIMERS
	this.timers=[];
	//this.timersAdded=0;
	//GAME ATTRIBUTES DIC 
	//GAME OBJECTS DIC
	this.gameAttributes=attributes;
	this.gameObjects=objects;
	//GAME SPECIFIC FUNCTIONS
	this.mainButtonPressed=function  () {
		
		sounds.playSound("chase");
		this.currentMenuObjects[1].changeForAWhile("./images/big_buttonPressed.png",3);
		this.bloodSplatter2("black",this.gameObjects["player"][0].x+60,this.gameObjects["player"][0].y+70,0.1);
		// body...
		if (this.gameAttributes["nightTime"]==1) {
			this.gameObjects["player"][0].x-=this.gameAttributes["addPerClick"]/this.gameAttributes["level"];
			if (this.gameObjects["player"][0].x<this.gameAttributes["startDist"]+30) {
				this.eatMan();
			};
		};
		if (this.gameAttributes["nightTime"]==0) {
			this.gameObjects["enemy"][0].x+=this.gameAttributes["addPerClick"]/this.gameAttributes["level"];
			if (this.gameObjects["enemy"][0].x<this.gameAttributes["startDist"]+30) {
				this.gameOver();
			};
		};

	};
	this.eatMan=function  () {
		this.bloodSplatter("red",this.gameObjects["enemy"][0].x+30,this.gameObjects["enemy"][0].y+30,5.5);
		
		sounds.playSound("eatMan");
		// body...
		console.log("man eaten");
		this.gameAttributes["credits"]+=this.gameAttributes["creditPerEat"];
		this.gameAttributes["creditPerEat"]*=2;
		this.gameAttributes["menRemaining"]-=1;
		this.gameAttributes["nightTime"]=0;
		//Revert
		this.revertSides();
		//WIN CONDITION
		this.increaseDifficulty();
		this.increaseDifficulty();
		if (this.gameAttributes["menRemaining"]==0) {
			this.winGame();
		};

	};
	this.winGame=function  () {
		master.prepareObjects("you_win","none");
	};
	this.revertSides=function  () {
		// called after nightTime is changed
		this.gameAttributes["moneyFix"]=1;
		//this.gameAttributes["creditGain"]=this.gameAttributes["creditGainBeforeBoost"];
		master.doTransition();
		if (this.gameAttributes["nightTime"]==0) {
			this.gameAttributes["days"]+=1;
			this.gameObjects["enemy"][0].x=master.canvas.width-(startDist*1.3);
			this.gameObjects["player"][0].x=startDist*1.3;

			this.currentVisualObjects[0]=new ScrollingBG(["./images/sun.png","./images/sun.png"],"right",1/2.9,windowWidth=462);
			this.currentVisualObjects[1]=new ScrollingBG(["./images/bg2.png","./images/bg2.png"],"right",1/4,windowWidth=392);
		};	
		if (this.gameAttributes["nightTime"]==1) {
			this.gameObjects["player"][0].x=master.canvas.width-startDist;
			this.gameObjects["enemy"][0].x=startDist;

			this.currentVisualObjects[0]=new ScrollingBG(["./images/moon.png","./images/moon.png"],"right",1/2.9,windowWidth=462);
			this.currentVisualObjects[1]=new ScrollingBG(["./images/bg1.png","./images/bg1.png"],"right",1/4,windowWidth=392);	
		};	

		this.timeBonus();
		this.gameAttributes["bonusForNextRound"]=this.gameAttributes["maxBonus"];
		this.gameAttributes["remainingTime"]=this.gameAttributes["maxTime"];
		//this.increaseDifficulty();
	};
	this.timeBonus=function  (argument) {
		// body...
		//this.gameAttributes["bonusForNextRound"]=this.gameAttributes["maxBonus"];
	};
	this.increaseDifficulty=function  () {
		this.currentVisualObjects[1].scrollSpeed+=1/10;
		// body...
		this.gameAttributes["level"]*=1.2;
		this.gameAttributes["credits"]+=this.gameAttributes["remainingTime"]*this.gameAttributes["timeBonusMultiplier"];
		//this.gameAttributes["creditGain"]*=this.gameAttributes["increaseSpeedBy"];
		this.gameAttributes["creditGain"]+=0.01;
		this.gameAttributes["baseMs"]*=this.gameAttributes["increaseSpeedBy"];
	};
	this.gameOver=function  () {
		// body...
		console.log("game over");
		master.prepareObjects("game_over","none");
	};
	this.abillity=function  (param) {
		// body...
		if (param=="jump") {
			var cos =this.gameAttributes["cost2"];
			if (this.gameAttributes["credits"]>cos) {
				this.gameAttributes["credits"]-=cos;
				this.jump();

				sounds.playSound("jump");
			};
		};
		if (param=="money"&&this.gameAttributes["upgradeM"]<this.gameAttributes["upgradeCap"]) {
			var cos =this.gameAttributes["cost2"]*4*this.gameAttributes["upgradeM"];
			if (this.gameAttributes["credits"]>cos) {
				this.gameAttributes["credits"]-=cos;
				this.money();

				sounds.playSound("upgrade");
			};
		};
	};
	this.money=function  () {
		// body...
		/*
		if (this.gameAttributes["moneyFix"]==0) {
			this.gameAttributes["creditGainBeforeBoost"]=this.gameAttributes["creditGain"];
			this.gameAttributes["moneyFix"]=1;
		};
		*/
		this.gameAttributes["creditGain"]*=this.gameAttributes["Mmultiplier"];
		this.gameAttributes["upgradeM"]+=1;
	};
	this.jump=function  () {
		// body...
		if (this.gameAttributes["nightTime"]==0) {
			this.gameObjects["enemy"][0].x+=(this.gameAttributes["jumpDistance"]/this.gameAttributes["level"])+20;
		};	
		if (this.gameAttributes["nightTime"]==1) {
			this.gameObjects["player"][0].x-=(this.gameAttributes["jumpDistance"]/this.gameAttributes["level"])+20;
		};	
	};
	this.timeUp=function  () {
		// ESCAPED SECCESFULLY

		if (this.gameAttributes["nightTime"]==0) {
			this.gameAttributes["nightTime"]=1;
			this.revertSides();
		}
		// COULDNT CATCH IN TIME
		else if (this.gameAttributes["nightTime"]==1) {
			//this.gameOver();
			this.gameAttributes["nightTime"]=0;
			this.revertSides();
		};	
	};
	this.upgrade=function  (param) {
		// body...
		if (param=="plus1"&&this.gameAttributes["upgrade1"]<this.gameAttributes["upgradeCap"]) {
			var cos =this.gameAttributes["cost1"]*this.gameAttributes["upgrade1"];
			if (this.gameAttributes["credits"]>cos) {
				this.gameAttributes["bonusClicks"]+=0.1;
				this.gameAttributes["credits"]-=cos;
				//UPGRADED count
				this.gameAttributes["upgrade1"]+=1;

				sounds.playSound("upgrade");

			};
		};
		if (param=="plus10"&&this.gameAttributes["upgrade2"]<this.gameAttributes["upgradeCap"]) {

			var cos =this.gameAttributes["cost1"]*5*this.gameAttributes["upgrade2"];
			if (this.gameAttributes["credits"]>cos) {
				this.gameAttributes["bonusClicks"]+=1;
				this.gameAttributes["credits"]-=cos;
				//UPGRADED count
				this.gameAttributes["upgrade2"]+=1;

				sounds.playSound("upgrade");
			};
		};
		if (param=="plus100"&&this.gameAttributes["upgrade3"]<this.gameAttributes["upgradeCap"]) {

			var cos =this.gameAttributes["cost1"]*25*this.gameAttributes["upgrade3"];
			if (this.gameAttributes["credits"]>cos) {
				this.gameAttributes["bonusClicks"]+=10;
				this.gameAttributes["credits"]-=cos;
				//UPGRADED count
				this.gameAttributes["upgrade3"]+=1;

				sounds.playSound("upgrade");
			};
		};
	};
	this.drawStats=function  (ctx) {
		// body...
		write(ctx,"day: "+this.gameAttributes["days"],168,50,"white",20);
		  write(ctx,this.gameAttributes["menRemaining"],26,383,"white",20); 
		  //write(ctx,Math.floor(this.gameAttributes["bonusForNextRound"]),180,100,"white",20); 
		  //write(ctx,Math.floor(this.gameAttributes["remainingTime"]),180,140,"red",20); 
		  write(ctx,Math.floor(this.gameAttributes["credits"])+"MON$",148,386,"green",22); 
		//costs
		var yOff=50;
		if (this.gameAttributes["upgrade1"]<this.gameAttributes["upgradeCap"]) {
			write(ctx,this.gameAttributes["cost1"]*this.gameAttributes["upgrade1"],182,396+yOff,"green",20);
		}
		else{
			write(ctx,"MAX",182,396+yOff,"green",20);
		};

		if (this.gameAttributes["upgrade2"]<this.gameAttributes["upgradeCap"]) {
			write(ctx,this.gameAttributes["cost1"]*5*this.gameAttributes["upgrade2"],37,460+yOff,"green",20);
		}	
		else{
			write(ctx,"MAX",37,460+yOff,"green",20);
		};

		if (this.gameAttributes["upgrade3"]<this.gameAttributes["upgradeCap"]) {
		 write(ctx,this.gameAttributes["cost1"]*25*this.gameAttributes["upgrade3"],37,520+yOff,"green",20);
		}
		else{
			write(ctx,"MAX",37,520+yOff,"green",20);
		};

		 write(ctx,this.gameAttributes["cost2"],master.canvas.width-83,460+yOff,"green",20);
		if (this.gameAttributes["upgradeM"]<this.gameAttributes["upgradeCap"]) {
		 write(ctx,this.gameAttributes["cost2"]*4*this.gameAttributes["upgradeM"],master.canvas.width-83,520+yOff,"green",20);
		}
		else{
			write(ctx,"MAX",master.canvas.width-83,520+yOff,"green",20);
		};

	};
	this.update=function  (input,param) {
		//TIME
		if (this.gameAttributes["remainingTime"]<=0) {
			this.timeUp();
		};
		//console.log(this.gameAttributes["menRemaining"],this.gameAttributes["baseMs"]/this.gameAttributes["level"]);
		//
		this.gameAttributes["credits"]+=this.gameAttributes["creditGain"];
		this.gameAttributes["bonusForNextRound"]-=this.gameAttributes["timeDecay"];
		this.gameAttributes["remainingTime"]-=this.gameAttributes["timeDecay"];
		//CHASING
		if (this.gameAttributes["nightTime"]==1) {
			//PER CLICK
			this.gameObjects["player"][0].x+=this.gameAttributes["baseMs"]/this.gameAttributes["level"];
			//BONUS
			this.gameObjects["player"][0].x-=this.gameAttributes["bonusClicks"]/this.gameAttributes["level"];
			if (this.gameObjects["player"][0].x>master.canvas.width-10) {
				//this.gameOver();
			};
			if (this.gameObjects["player"][0].x<this.gameAttributes["startDist"]+30) {
				this.eatMan();
			};
		};
		//BEING CHASED
		if (this.gameAttributes["nightTime"]==0) {
			//PER CLICK
			this.gameObjects["enemy"][0].x-=this.gameAttributes["baseMs"]/this.gameAttributes["level"];
			//BONUS
			this.gameObjects["enemy"][0].x+=this.gameAttributes["bonusClicks"]/this.gameAttributes["level"];
			if (this.gameObjects["enemy"][0].x<this.gameAttributes["startDist"]+30) {
				this.gameOver();
			};
			if (this.gameObjects["enemy"][0].x>master.canvas.width-10) {
				this.gameAttributes["nightTime"]=1;
				this.gameAttributes["credits"]+=this.gameAttributes["remainingTime"]*this.gameAttributes["timeBonusMultiplier"];
				this.revertSides();
			};
		};

		//UPDATE OBJECTS IN DICT
		for (var key in this.gameObjects) {
			for (var i = this.gameObjects[key].length - 1; i >= 0; i--) {
				this.gameObjects[key][i].update(this.gameAttributes);
				if (this.gameObjects[key][i].y>350) {

					this.gameObjects[key].splice(i,1);
				};
			};
		};
		//UPDATE TIMED EVENTS
		for (var i = this.timers.length - 1; i >= 0; i--) {
			this.timers[i].update();
		};

		//UPDATE OBJECTS
		for (var i = this.currentMenuObjects.length - 1; i >= 0; i--) {
			this.currentMenuObjects[i].update(input);
		};
		for (var i = this.currentVisualObjects.length - 1; i >= 0; i--) {
			this.currentVisualObjects[i].update();
		};
    };
    this.draw=function  (ctx) {
    	for (var i = this.currentVisualObjects.length - 1; i >= 0; i--) {
			this.currentVisualObjects[i].draw(ctx);
		};

		//DRAW OBJECTS IN DICT
		for (var key in this.gameObjects) {
			for (var i = this.gameObjects[key].length - 1; i >= 0; i--) {
				this.gameObjects[key][i].draw(ctx);
			};
		};

		for (var i = this.currentMenuObjects.length - 1; i >= 0; i--) {
			this.currentMenuObjects[i].draw(ctx);
		};
		//
		this.drawStats(ctx);
    };
    this.doJump=function  () {
    	//AUDIO
    	sounds.playSound("jump");
    	//OBJECT FUNCTION
    	this.player.jump(this.gameAttributes);
    };
    this.collidedWithEnemy=function  (obj1,obj2) {
    	console.log("collided with enemy");
    	this.bloodSplatter("purple",obj1.x,obj2.y);
    	//REMOVE PLAYER
    	obj1.dead=1;
    	//AUDIO
    	sounds.playSound("explode");
    	//
    	this.addResultMenu();
    };
    this.collidedWithBoost=function  (obj1,obj2) {
    	console.log("collided with boost");
    	this.bloodSplatter("yellow",obj1.x,obj2.y);
    	//ADD ENERGY
    	this.gameObjects["players"][0].energy+=this.gameAttributes["boostAdd"];
    	//REMOVE CHICKEN
    	obj2.dead=1;
    	//AUDIO
    	sounds.playSound("chicken");
    };
    this.fell=function  () {
    	console.log("player fell");
    	//AUDIO
    	sounds.playSound("explode");
    	this.addResultMenu();
    };
    this.addResultMenu=function  () {
    	this.currentMenuObjects=getResultMenuObjects(this.stage);
    };
    this.bloodSplatter=function  (color,initialX,initialY,sizeMultiple) {
    	console.log("blood")
    	//Add blood purple
    	var amount=this.gameAttributes["bloodAmount"]*sizeMultiple;
		for (var i = amount ; i >= 0; i--) {
			var r=Math.random();
			var r2=Math.random();
			var r3=Math.random();
			var rr1=Math.random();
			var rr2=Math.random();
			
			var sx=r*this.gameAttributes["bloodSpeedVariance"] ;
			var sy=r2*this.gameAttributes["bloodSpeedVariance"] ;
			
			if (rr1>0.5) {
				sx=sx*-1;
			};
			if (rr2>0.5) {
				sy=sy*-1;
			};
			
			var r4=Math.random();
			var x=initialX-(this.gameAttributes["bloodSplatter"] /2)+(this.gameAttributes["bloodSplatter"]*r4)
			var r5=Math.random();
			var y=initialY-(this.gameAttributes["bloodSplatter"]/2)+(this.gameAttributes["bloodSplatter"]*r5)
			this.gameObjects["bloodDrops"].push(new BloodDrop(x,y,this.gameAttributes["bloodBaseSize"]*r3,sx,sy,this.gameAttributes["bloodYmax"],color) );
		};
    };
    this.bloodSplatter2=function  (color,initialX,initialY,sizeMultiple) {
    	console.log("blood")
    	//Add blood purple
    	var amount=this.gameAttributes["bloodAmount"]*sizeMultiple;
		for (var i = amount ; i >= 0; i--) {
			var r=Math.random();
			var r2=Math.random();
			var r3=Math.random();
			var rr1=Math.random();
			var rr2=Math.random();
			
			var sx=r*this.gameAttributes["bloodSpeedVariance"] ;
			var sy=r2*this.gameAttributes["bloodSpeedVariance"] ;
			
			if (rr1>0.5) {
				//sx=sx*-1;
			};
			if (rr2>0.0) {
				sy=sy*-1;
			};
			
			var r4=Math.random();
			var x=initialX-(this.gameAttributes["bloodSplatter"] /2)+(this.gameAttributes["bloodSplatter"]*r4)
			var r5=Math.random();
			var y=initialY-(this.gameAttributes["bloodSplatter"]/2)+(this.gameAttributes["bloodSplatter"]*r5)
			this.gameObjects["bloodDrops"].push(new BloodDrop(x,y,this.gameAttributes["bloodBaseSize"]*r3,sx,sy,this.gameAttributes["bloodYmax"],color) );
		};
    };

	this.stageEnded=function  (argument) {
		console.log("stage finished");
	};
};