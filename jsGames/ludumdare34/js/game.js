 var xx=50;
 upgrades=[

	new Button2("Spread","Trees spread\n more often","none",50,430+xx,80,60,60,function func () {master.game.upgradeSpread("none")} ),
	new Button2("Growth","Trees grow\n faster","Spread",50,430+xx,205,60,60,function func () {master.game.upgradeGrowth("none")} ),
	new Button2("StrongStart","New Trees \n start bigger","Spread",100,430+xx,330,60,60,function func () {master.game.upgradeStart("none")} ),
	new Button2("GrowingSeason","Its spawning\n season!","StrongStart",400,430+xx,455,60,60,function func () {master.game.upgradeSeason("none")} ),

	new Button2("Value","Trees produce\n more value","none",50,155+xx,205,60,60,function func () {master.game.upgradeValue("none")} ),
	new Button2("ValueGrowth","More value\n slows growth","Value",100,155+xx,330,60,60,function func () {master.game.upgradeValueGrowth("none")} ),
	new Button2("StartValue","Trees start at\n higher value","Value",120,215+xx,455,60,60,function func () {master.game.upgradeStartValue("none")} ),
	new Button2("BuyValue","Add a random\n tree","none",10,215+xx,80,60,60,function func () {master.game.upgradeBuy("none")} ),

	new Button2("Mutation","New trees \n mutate more","none",45,645+xx,80,60,60,function func () {master.game.upgradeMutation("none")} ),
	new Button2("SpawnTree","Spawn a \n funky tree","Mutation",15,705+xx,205,60,60,function func () {master.game.upgradeSpawnTree("none")} ),
	new Button2("SlowGrowth","Cut meter\n grows slower","Mutation",155,705+xx,330,60,60,function func () {master.game.upgradeSlowGrowthValue("none")} ),
	new Button2("ResetCut","Resets the\n cut meter","SlowGrowth",445,645+xx,455,60,60,function func () {master.game.upgradeResetCut("none")} )
	];
function Game (stage,attributes,objects) {

	//OBJECTS
	//this.currentGameObjects=getStageGameObjects(stage);
	this.currentVisualObjects=getStageBG(stage);
	this.currentMenuObjects=getStageMenuObjects(stage);
	//mechanical variables for map
	this.repeated=0;
	this.timeStep=0;
	this.stage=stage;
	//ADD STAGE IF EXISTS
	//if (stage!="") {this.stageData=mapData[stage];};
	//TIMERS
	this.timers=[new TimedEvent(30,1,this,"getMoney")];
	//this.timersAdded=0;
	//GAME ATTRIBUTES DIC 
	this.bank=new Bank(30,30,0);
	this.inheritance=0.95;

	this.cutterDesirability=0;
	this.naturalValue=0;

	this.cutterMax=2000;
	this.naturalMax=2000;

	this.initH=master.canvas.height-80;
	this.startHeight=20;
	this.startRadius=10;

	this.hGrowth=0.1;
	this.rGrowth=0.04;
	this.sChance=0.001;
	this.sDist=100;
	this.sValue=1;
	this.resistance=1;
	//UPGRADES
	this.purchasedUpgrades={

	};


	this.cashMoney=100;
	this.didReset=0;
	//GAME OBJECTS DIC
	this.trees=[new Tree (master.canvas.width/2,this.initH,
		this.startHeight,this.startRadius,this.hGrowth,this.rGrowth,
		this.sChance,this.sDist,this.sValue)
	]
	//
	this.gameAttributes=attributes;
	this.gameObjects=objects;

	this.upgradeMode=0;
	this.resultMode=0;
	this.resultMode2=0;
	//UPGRADES
	
	this.upgradeSpread =function  () {
		// body...
		console.log("did upgrade Spread");
		for (var i = this.trees.length - 1; i >= 0; i--) {
			this.trees[i].spreadChance*=1.4;
		};
	};
	this.upgradeGrowth =function  () {
		// body...
		console.log("did upgrade Growth");
		for (var i = this.trees.length - 1; i >= 0; i--) {
			this.trees[i].heightGrowth*=1.2;
			this.trees[i].radiusGrowth*=1.25;
		};
	
	};
	this.upgradeStart =function  () {
		// body...
		console.log("did upgrade Start");
		this.startHeight+=16;
		this.startRadius+=4;

		this.hGrowth*=1.2;
		this.rGrowth*=1.3;
		for (var i = this.trees.length - 1; i >= 0; i--) {
			this.trees[i].heightSeed+=10;
			this.trees[i].radiusSeed+=4;
			//this.trees[i].heightGrowthSeed+=1.2;
			//this.trees[i].radiusGrowthSeed+=1.3;
		};
	};
	this.upgradeSeason=function  () {
		// body...
		console.log("did upgrade Season");

		for (var i = 25 ; i >= 0; i--) {
			var xd=0;
			if (Math.random()<0.5) {
				xd=420+Math.random()*300;
			}
			else{
				xd=420-Math.random()*300;
			};
			

			this.addTree(xd,this.trees[0]);
			
		};
	};
	//
	
	this.upgradeValue =function  () {
		// body...
		console.log("did upgrade value");
		for (var i = this.trees.length - 1; i >= 0; i--) {
			this.trees[i].valueBonus*=1.2;
		};
	};
	this.upgradeValueGrowth =function  () {
		// body...
		console.log("did upgrade valueGrowth");
		for (var i = this.trees.length - 1; i >= 0; i--) {
			this.trees[i].valueBonus*=1.3;
			this.trees[i].heightGrowth*=0.9;
			this.trees[i].radiusGrowth*=0.9
		};
	};
	this.upgradeStartValue =function  () {
		// body...
		console.log("did upgrade start value");
		this.sValue+=1;
		this.sValue*=2;
	};
	this.upgradeBuy =function  () {
		// body...
		console.log("did upgrade buy value");
		
			var xd=0;
			if (Math.random()<0.5) {
				xd=420+Math.random()*300;
			}
			else{
				xd=420-Math.random()*300;
			
			};

			this.addTree(xd,this.trees[0]);
		
		
	};
	//
	this.upgradeMutation=function  () {
		// body...
		console.log("did upgrade mutatio");
		this.inheritance-=0.06;
	};
	this.upgradeSpawnTree =function  () {
		// body...
		console.log("did upgrade spawn tree");
		var xd=0;
			if (Math.random()<0.5) {
				xd=420+Math.random()*300;
			}
			else{
				xd=420-Math.random()*300;
			
			};
			//c =crazy factor
			this.addCrazyTree(xd,this.trees[0],0.7);
	};
	this.upgradeSlowGrowthValue =function  () {
		// body...
		console.log("did upgrade start slow Growth");
		this.resistance-=0.1;

	};
	this.upgradeResetCut =function  () {
		// body...
		console.log("did upgrade buy reset cut");
		//this.cutterDesirability=0;
		this.didReset+=this.cutterDesirability;
	};
	this.upgradeMenu=function  (argument) {
		if (this.upgradeMode==0) {
			for (var i = upgrades.length - 1; i >= 0; i--) {
				this.currentMenuObjects.push(upgrades[i])
			};
			this.upgradeMode=1;
		}
		else{
			this.upgradeMode=0;
			this.currentMenuObjects=[this.currentMenuObjects[0]];

		};
		console.log("upgrade menu");
	};
	
	//END UPGRADES
	this.getMoney=function  () {
		// body...
		var c=0;
		for (var i = this.trees.length - 1; i >= 0; i--) {
			
			c+=this.trees[i].height/60;
		};
		this.cashMoney+=Math.floor(c);
		//CALC VALUES
		this.cutterDesirability= this.cutterValueFormula();
		this.naturalValue= this.naturalValueFormula();
	};
	this.cutterValueFormula=function  () {
		var v= 0;
		v += this.trees.length;
		//trunk of tree
		for (var i = this.trees.length - 1; i >= 0; i--) {
			v+=Math.floor( this.trees[i].height/10);
			
		};
		v*=this.resistance;
		v-=this.didReset;
		return v;
	};
	this.naturalValueFormula=function  () {
		var v= 0;
		v += this.trees.length;
		//leafs on tree
		for (var i = this.trees.length - 1; i >= 0; i--) {
			v+=Math.floor( this.trees[i].radius/8);
			v+=Math.floor( this.trees[i].valueBonus);
		};
		return v;
	};
	this.addCrazyTree=function  (x,t,c) {
		if (this.trees.length>1000) {
			console.log("max trees");
			return;
		};
		//
		var range1=t.heightSeed*(1-c)*Math.random()
		if (Math.random()>0.5) { range1*=-1};
		var range2=t.radiusSeed*(1-c)*Math.random()
		if (Math.random()>0.5) { range2*=-1};
		var range3=t.heightGrowthSeed*(1-c)*Math.random()
		if (Math.random()>0.5) { range3*=-1};
		var range4=t.radiusGrowthSeed*(1-c)*Math.random()
		if (Math.random()>0.5) { range4*=-1};
		var range5=t.spreadChanceSeed*(1-c)*Math.random()
		if (Math.random()>0.5) { range5*=-1};
		var range6=t.spreadDistanceSeed*(1-c)*Math.random()
		if (Math.random()>0.5) { range6*=-1};


		tr=new Tree (x,this.initH,
		t.heightSeed+range1,t.radiusSeed+range2,t.heightGrowthSeed+range3,t.radiusGrowthSeed+range4,
		t.spreadChanceSeed+range5,t.spreadDistanceSeed+range6,this.sValue);

		i=Math.floor(Math.random()*(this.trees.length-1));
		this.trees.splice(i, 0, tr);
	};
	this.addTree=function  (x,t) {
		if (this.trees.length>1000) {
			console.log("max trees");
			return;
		};
		//
		var range1=t.heightSeed*(1-this.inheritance)*Math.random()
		if (Math.random()>0.5) { range1*=-1};
		var range2=t.radiusSeed*(1-this.inheritance)*Math.random()
		if (Math.random()>0.5) { range2*=-1};
		var range3=t.heightGrowthSeed*(1-this.inheritance)*Math.random()
		if (Math.random()>0.5) { range3*=-1};
		var range4=t.radiusGrowthSeed*(1-this.inheritance)*Math.random()
		if (Math.random()>0.5) { range4*=-1};
		var range5=t.spreadChanceSeed*(1-this.inheritance)*Math.random()
		if (Math.random()>0.5) { range5*=-1};
		var range6=t.spreadDistanceSeed*(1-this.inheritance)*Math.random()
		if (Math.random()>0.5) { range6*=-1};


		tr=new Tree (x,this.initH,
		t.heightSeed+range1,t.radiusSeed+range2,t.heightGrowthSeed+range3,t.radiusGrowthSeed+range4,
		t.spreadChanceSeed+range5,t.spreadDistanceSeed+range6,this.sValue);

		i=Math.floor(Math.random()*(this.trees.length-1));
		this.trees.splice(i, 0, tr);
	};
	this.update=function  (input,param) {
		this.bank.credit=this.cashMoney;
		if (this.naturalValue>=this.naturalMax) {
			this.resultMode=1;
		};
		if (this.cutterDesirability>=this.cutterMax) {
			this.resultMode2=1;
		};
		if (this.upgradeMode==0&&this.resultMode==0&&this.resultMode2==0) {
			for (var i = this.trees.length - 1; i >= 0; i--) {
				t=this.trees[i];
				t.update();
				//MONEY

				//TREE SPREAD
				if (Math.random()<t.spreadChance) {
					var xd=0;
					if (Math.random()<0.5) {
						xd=t.x+Math.random()*t.spreadDistance;
					}
					else{xd=t.x-Math.random()*t.spreadDistance;
					};

					this.addTree(xd,t);
				};
				
			};
			this.bank.update();
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
					//this.gameObjects[key].update(input);
					//Player specific 
				};
			};
			//COLLISION EVENTS
			/*
			CollisionHandler ("playerToEnemy",this.gameObjects["players"],this.gameObjects["enemies"],
				this,"collidedWithEnemy",rectCollision);
			CollisionHandler ("playerToBoost",this.gameObjects["players"],this.gameObjects["boosts"],
				this,"collidedWithBoost",rectCollision);
			*/
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
				this.timers.push(new TimedEvent(30,1,this,"addFromMap"));
				this.timersAdded=1;
			};
		}
		else{
			//UPDATE OBJECTS
			for (var i = this.currentMenuObjects.length - 1; i >= 0; i--) {
				this.currentMenuObjects[i].update(input);
			};
			for (var i = this.currentVisualObjects.length - 1; i >= 0; i--) {
				this.currentVisualObjects[i].update();
			};

		};
    };
    this.draw=function  (ctx) {
    	ctx.clearRect(0,0,master.canvas.width,master.canvas.height);
    	//
    	ctx.fillStyle="lightblue";
    	ctx.fillRect(0,0,master.canvas.width,master.canvas.height);

    	//bg mountains
    	drawFilledCircle(0,500,280,"#339966",ctx);
    	drawFilledCircle(280,600,300,"#339966",ctx);
    	drawFilledCircle(600,700,300,"#339966",ctx);
    	drawFilledCircle(800,660,300,"#339966",ctx);

    	drawFilledCircle(12000,660,300,"#339966",ctx);
    	//end bg
    	ctx.fillStyle="#5C4033";
    	ctx.fillRect(0,this.initH,master.canvas.width,master.canvas.height/6);

        //write (ctx,"cutters desirability:"+this.cutterDesirability,master.canvas.width/2,60,"black",26) ;

        //write (ctx,"natural value:"+this.naturalValue,master.canvas.width/2,100,"black",26) ;


    	for (var i = this.trees.length - 1; i >= 0; i--) {
    		//console.log(this.trees[i])
			this.trees[i].draw(ctx);
		};

		this.bank.draw(ctx);


		///////
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

		//bars
		var yy=this.naturalValue/this.naturalMax;
		ctx.fillStyle="grey";
		ctx.fillRect(20,380,20,-250);
		ctx.fillStyle="white";
		ctx.fillRect(20,380,20,-250*yy);

		write (ctx,"V",22,407,"white",26) ;
		write (ctx,"A",22,435,"white",26) ;
		write (ctx,"L",22,465,"white",26) ;

		var yy=this.cutterDesirability/this.cutterMax;
		ctx.fillStyle="grey";
		ctx.fillRect(60,380,20,-250);

		ctx.fillStyle="red";
		ctx.fillRect(60,380,20,-250*yy);

		write (ctx,"C",62,407,"white",26) ;
		write (ctx,"U",62,435,"white",26) ;
		write (ctx,"T",62,465,"white",26) ;

		//result
		if (this.resultMode==1) {
			ctx.fillStyle="white";
			ctx.fillRect(215,100,440,240);

			write (ctx,"Your forest is glorious",260,160,"green",26) ;
			write (ctx,"You win, thanks for playing!",260,220,"green",26) ;

		};
		if (this.resultMode2==1) {
			ctx.fillStyle="red";
			ctx.fillRect(215,100,440,240);

			write (ctx,"Your forest will be cut down",260,220,"black",26) ;
			write (ctx,"try again",260,260,"black",26) ;

		};


    };
    this.doJump=function  () {
    	//AUDIO
    	//sounds.playSound("jump");
    	//OBJECT FUNCTION
    	//this.player.jump(this.gameAttributes);
    };
    this.collidedWithEnemy=function  (obj1,obj2) {
    	console.log("collided with enemy");
    	this.bloodSplatter("purple",obj1.x,obj2.y);
    	//REMOVE PLAYER
    	obj1.dead=1;
    	//AUDIO
    	//sounds.playSound("explode");
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
    	//sounds.playSound("chicken");
    };
    this.fell=function  () {
    	console.log("player fell");
    	//AUDIO
    	//sounds.playSound("explode");
    	this.addResultMenu();
    };
    this.addResultMenu=function  () {
    	this.currentMenuObjects=getResultMenuObjects(this.stage);
    };
    this.bloodSplatter=function  (color,initialX,initialY) {
    	console.log("blood")
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
			this.gameObjects["bloodDrops"].push(new BloodDrop(x,y,this.gameAttributes["bloodBaseSize"]*r3,sx,sy,this.gameAttributes["bloodYmax"],color) );
		};
    };

    this.addFromMap=function  () {
    	//console.log("add from map");
		//TRY CATCH resets stage when no more objects in current map
		//try{
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
		//}
		//catch(e){
		//	console.log(e);
			//this.stageEnded()
		//};

	};
	this.stageEnded=function  (argument) {
		console.log("stage finished");
	};
};