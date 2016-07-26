function PakuPakuGame (stage,power1,power2,power3) {
	//GAME VARIABLES
	this.gravity=1;
	this.winScreen= new WinScreen(game.canvas.width/2,-240,stage);
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
	this.stageData=mapData[stage];
	//this.mapAddTimer=new TimedEvent(30,1,this.addFromMap);
	//VARIABLES
	this.enemySize=20;
	//TIMERS
	this.timers=[];
	this.timersAdded=0;
	//
	this.chickenEaten=0;
	//Power ups

	this.shields=game.p1*4;
	this.smallFarts=game.p2;
	this.rainbow=game.p3;

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
	if (this.smallFarts==1) {
		this.player.jumpAcceleration /=2;
		this.gameAttributes["jumpCost"] /=2;
	};
	if (this.rainbow==1) {
		this.player.activateRainbow();
		this.gameAttributes["jumpCost"] /=1.5;
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
					this.gameObjects[key].splice(i,1);
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
			this.timers.push(new TimedEvent(15,1,this,"addFromMap"));
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
		//shield
		if (this.gameObjects["players"][0]) {
			ctx.globalAlpha=0.3;
			drawCircle (this.gameObjects["players"][0].x+22,this.gameObjects["players"][0].y+2,
				this.shields*10,"green",ctx) 
			ctx.globalAlpha=1;
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
    };
    this.doJump=function  () {
    	//AUDIO
    	//sounds.playSound("jump");
    	//OBJECT FUNCTION
    	this.player.jump(this.gameAttributes);
    };
    this.collidedWithEnemy=function  (obj1,obj2) {
    	if (this.shields==0) {
    		//console.log("collided with enemy");
	    	this.bloodSplatter("rgb(220,0,70)",obj1.x,obj2.y,1);
	    	//REMOVE PLAYER
	    	obj1.dead=1;
	    	//AUDIO
	    	sounds.playSound("explode");
	    	//
	    	this.addResultMenu();
    	}
    	else{
    		this.shields-=1;
    		//AUDIO
	    	sounds.playSound("explode");
    	};
    	
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
    	this.addResultMenu();
    };
    this.addResultMenu=function  () {
    	game.p1=0;
		game.p2=0;
		game.p3=0;
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

    this.addFromMap=function  () {
    	//console.log("add from map");
		//TRY CATCH resets stage when no more objects in current map
		try{
			//REPEATING
			if (this.repeated==this.stageData["objects"][this.timeStep][0][0]) {
				this.timeStep+=1;
				this.repeated=0;
			};
			for (var i = this.stageData["objects"][this.timeStep].length - 1; i >= 1; i--) {
				var y=this.stageData["objects"][this.timeStep][i][2];
				var speed=this.stageData["objects"][this.timeStep][i][3];
				//ADD ENEMIES
				if ( this.stageData["objects"][this.timeStep][i][0]==0) {
					this.gameObjects["enemies"].push(new Enemy(-this.enemySize,y,this.enemySize,speed));
				}
				//ADD CHICKEN
				else if (this.stageData["objects"][this.timeStep][i][0]==1) {
					this.gameObjects["boosts"].push(new Boost(-this.enemySize+this.stageData["objects"][this.timeStep][i][0],y,this.enemySize,speed,this.boostAdd));
				};
			};
			this.repeated+=1;
		}
		catch(e){
		//	console.log(e);
			this.stageEnded()
		};

	};
	this.stageEnded=function  (argument) {
		if (this.gameObjects["players"][0]&&this.gameAttributes["gravity"]!=0) {
			//console.log("stage finished");
			this.winScreen.activate();
			this.gameAttributes["gravity"]=0;
			this.gameObjects["players"][0].yVector=0;
			this.gameObjects["players"][0].jumpAcceleration=0;
			//unlock next
			var lvls = localStorage.getItem("levelsUnlocked");
			if (lvls==this.stage+1) {
				localStorage.setItem("levelsUnlocked", this.stage+2);
			};
			
			//add chicken score
			//var chickens =parseInt(localStorage.getItem("chickens"));
			//console.log(chickens);
			//localStorage.setItem("chickens", chickens + parseInt(this.chickenEaten));
			//console.log(localStorage.getItem("chickens"));
			//
			this.winScreen.score=this.chickenEaten;
		};
	};
};