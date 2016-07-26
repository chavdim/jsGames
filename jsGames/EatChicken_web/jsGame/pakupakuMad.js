function PakuPakuMadGame (stage,power1,power2,power3) {
	//GAME VARIABLES
	this.gravity=1;
	this.winScreen= new WinScreenMad(game.canvas.width/2,-240,stage);
	//
	this.currentGameObjects=getStageGameObjects(stage);
	this.currentVisualObjects=getStageBG(stage);
	this.currentMenuObjects=getStageMenuObjects(stage);
	//
	this.player=new Player(280,180,20);
	this.enemies=[];
	this.boosts=[];
	//mechanical variables for map
	this.repeated=0;
	this.timeStep=0;
	this.stage=stage;
	//this.mapAddTimer=new TimedEvent(30,1,this.addFromMap);
	
	//VARIABLES
	this.enemySize=20;
	//TIMERS
	this.timers=[];
	this.timersAdded=0;
	//
	this.enemyAddTime=60;
	this.boostAddTime=70;
	this.changeTimeBy=1;
	this.speed=3;
	this.timers.push(new TimedEvent(this.enemyAddTime,1,this,"addRandomEnemy"));
	this.timers.push(new TimedEvent(this.boostAddTime,1,this,"addRandomBoost"));
	this.timers.push(new TimedEvent(50,1,this,"decreaseTime"));
	//
	this.chickenEaten=0;
	this.distanceTraveled=0;
	//Power ups

	this.shields=power1;
	this.rainbow=power2;
	this.smallFarts=power3;
	//blooddrop stats
		game.bloodAmount=200;
		game.bloodBaseSize=10;
		game.bloodSizeVariance=110;
		game.bloodSpeedVariance=20;
		game.bloodSplatter=40;
		game.chickenBloodRatio=2;

	this.gameAttributes={
		"drainRate":1/40,
		"jumpCost":8,
		"gravity":1,
		"boostAdd":50,
		//BLOOD STATS
		"bloodAmount":30,
		"bloodBaseSize":10,
		"bloodSizeVariance":110,
		"bloodSpeedVariance":20,
		"bloodSplatter":40,
		"bloodYmax":20,
		"chickenBloodRatio":2,
	};
	this.stageColors=getStageColors();
	//
	this.gameObjects={
		"players":[this.player],
		"enemies":[],
		"boosts":[],
		"bloodDrops":[],
	};
	this.update=function  (input,param) {
		if (this.gameAttributes["gravity"]!=0) {
			this.distanceTraveled+=1;
		};
		
		//UPDATE OBJECTS IN DICT
		for (var key in this.gameObjects) {
			for (var i = this.gameObjects[key].length - 1; i >= 0; i--) {
				this.gameObjects[key][i].update(this.gameAttributes);
				//REMOVE IF DEAD
				if (this.gameObjects[key][i].dead==1) {
					this.gameObjects[key].splice(i,1);
					continue;
				};
				//Remove if off screen
				if (this.gameObjects[key][i].x>game.canvas.width) {
					this.gameObjects[key].splice(i,1);
					continue;
				};
				if (this.gameObjects[key][i].y>game.canvas.height+(game.canvas.height/3)) {
					if (key!="players") {
						this.gameObjects[key].splice(i,1);
					};
					
					if (key=="players") {
					//FELL
						this.fell();
					};
					continue;
				};
				//Player specific 
			};
		};
		//COLLISION EVENTS
		CollisionHandler ("playerToEnemy",this.gameObjects["players"],this.gameObjects["enemies"],
			this,"collidedWithEnemy",rectCollision);
		CollisionHandler ("playerToBoost",this.gameObjects["players"],this.gameObjects["boosts"],
			this,"collidedWithBoost",rectCollision);
		//UPDATE TIMED EVENTS
		for (var i = this.timers.length - 1; i >= 0; i--) {
			this.timers[i].update();
		};
		//PLAYER MOVEMENT param = 0 -> touch not yet processed
		if (param==0) {
			this.doJump();
		};

		//UPDATE OBJECTS
		for (var i = this.currentMenuObjects.length - 1; i >= 0; i--) {
			this.currentMenuObjects[i].update(input);
		};
		for (var i = this.currentVisualObjects.length - 1; i >= 0; i--) {
			this.currentVisualObjects[i].update();
		};
		//
		if (this.timersAdded==0) {
			//this.timers.push(new TimedEvent(15,1,this,"addFromMap"));
			this.timersAdded=1;
		};
		//reseult screen
		this.winScreen.update(input);
    };
    this.draw=function  (ctx) {
    	//bg color for stage
    	ctx.fillStyle=this.stageColors[this.stage];
    	ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
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
		this.winScreen.draw(ctx);
		//
		var txt = this.distanceTraveled.toString();

		writeCenter (ctx,txt+"m",(game.canvas.width/2),80,"black",60);
		if (this.gameAttributes["gravity"]==0) {
			var hs = localStorage.getItem("highScore");
			writeCenter (ctx,"Best "+hs+"m",(game.canvas.width/2),122,"black",30);
		};
    };
    this.doJump=function  () {
    	//AUDIO
    	//sounds.playSound("jump");
    	//OBJECT FUNCTION
    	this.player.jump(this.gameAttributes);
    };
    this.collidedWithEnemy=function  (obj1,obj2) {
    	//console.log("collided with enemy");
    	this.bloodSplatter("rgb(220,0,70)",obj1.x,obj2.y,1);
    	//REMOVE PLAYER
    	obj1.dead=1;
    	//AUDIO
    	sounds.playSound("explode");
    	//
    	//this.addResultMenu();
    	this.stageEnded();
    };
    this.collidedWithBoost=function  (obj1,obj2) {
    	var chikencount=parseInt(localStorage.getItem("chickens"));
    	localStorage.setItem("chickens",chikencount+1);
    	//console.log("collided with boost");
    	this.bloodSplatter("yellow",obj1.x,obj2.y,0.6);
    	//ADD ENERGY
    	if (this.gameObjects["players"][0].energy<90) {
    		this.gameObjects["players"][0].energy+=this.gameAttributes["boostAdd"];
    	};
    	//REMOVE CHICKEN
    	this.chickenEaten+=1;
    	obj2.dead=1;
    	//AUDIO
    	sounds.playSound("chicken");
    };
    this.fell=function  () {
    	//console.log("player fell");
    	//AUDIO
    	sounds.playSound("explode");
    	//this.addResultMenu();
    	this.stageEnded();
    };
    this.addResultMenu=function  () {
    	this.currentMenuObjects=getResultMenuObjects(this.stage);
    	var resultImage=new SingleImage("./images/resultSmall.png",0,120);
    	this.currentMenuObjects.push(resultImage);
    };
    this.bloodSplatter=function  (color,initialX,initialY,intensity) {
    	//console.log("blood")
    	//Add blood purple
		for (var i = this.gameAttributes["bloodAmount"] ; i >= 0; i--) {
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
			this.gameObjects["bloodDrops"].push(new BloodDrop(x,y,intensity*this.gameAttributes["bloodBaseSize"]*r3,sx,sy,this.gameAttributes["bloodYmax"],color) );
		};
    };

    this.addRandomEnemy=function  () {
    	var y=Math.random() * (game.canvas.height - 40) + 30;
    	var speed = this.speed;
    	var r=Math.random();
    	if (r<0.5) {
    		speed+=1;
    	};
    	//ADD ENEMIES
		this.gameObjects["enemies"].push(new Enemy(-this.enemySize,y,this.enemySize,speed));
		
	};
	this.addRandomBoost=function  () {
		var y=Math.random() * (game.canvas.height - 40) + 30;
    	var speed = this.speed;
    	var r=Math.random();
    	if (r<0.5) {
    		speed+=1;
    	};
    	//ADD CHICKEN
		this.gameObjects["boosts"].push(new Boost(-this.enemySize,y,this.enemySize,speed,this.boostAdd));
		
	};
	this.decreaseTime=function  () {
		//
		
		this.timers[0].changeTime(this.timers[0].timeMax-this.changeTimeBy);
		this.timers[1].changeTime(this.timers[1].timeMax-this.changeTimeBy);
		
	};
	this.stageEnded=function  (argument) {
		game.p1=0;
		game.p2=0;
		game.p3=0;
		if (this.gameObjects["players"][0]&&this.gameAttributes["gravity"]!=0) {
			//console.log("stage finished");
			this.winScreen.activate();
			this.gameAttributes["gravity"]=0;
			this.gameObjects["players"][0].yVector=0;
			this.gameObjects["players"][0].jumpAcceleration=0;
			//unlock next
			//localStorage.setItem("levelsUnlocked", this.stage+2);
			//add chicken score
			//var chickens =parseInt(localStorage.getItem("chickens"));
			//console.log(chickens);
			//localStorage.setItem("chickens", chickens + parseInt(this.chickenEaten));
			//console.log(localStorage.getItem("chickens"));
			//
			//High score
			var hs = localStorage.getItem("highScore");
			if (hs<this.distanceTraveled) {
				localStorage.setItem("highScore",this.distanceTraveled );
			};
			//
			this.winScreen.score=this.chickenEaten;
		};
	};
};