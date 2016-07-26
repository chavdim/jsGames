
function Game (stage,params,objects) {
	//OBJECTS
	this.currentVisualObjects=getStageBG(stage);
	this.currentMenuObjects=getStageMenuObjects(stage);
	//mechanical variables for map
	this.repeated=0;
	this.timeStep=0;
	this.stage=stage;
	//ADD STAGE IF EXISTS
	if (stage!="") {this.stageData=mapData[stage];};
	//TIMERS
	this.timers=[];
	//this.timers.push(new TimedEvent (100,1,this,"addZombie"));
	this.timers.push(new TimedEvent (params["spawnRate"],1,this,"spawnPumpking"));
	this.timers[0].timeCounter=0;
	//GAME params DIC & GAME OBJECTS DIC
	this.params=params;
	this.gameObjects=objects;
	//CUSTOM
	this.selectedChar="";
	this.mode="game";
	this.swipeStartX=0;
	this.lastX=0;
	this.spawnedTimes=0;
	this.scoreShake=0;
	this.scoreShakeMax=10;
	//MATTER JS
	this.Engine = Matter.Engine,
    this.World = Matter.World,
    this.Bodies = Matter.Bodies;

    this.Mouse = Matter.Mouse,
    this.MouseConstraint = Matter.MouseConstraint;

	// create a Matter.js engine
	this.engine = this.Engine.create(
		{
		
	    render: {
	    	canvas:document.getElementById("gamecanvas"),
	    	element: document.getElementById("cash"),
	        options: {
	            width: 400,
	            height: 600,
	            background: 'black',
	            wireframeBackground: '#222',
	            hasBounds: false,
	            enabled: true,
	            wireframes: false,
	            showSleeping: true,
	            showDebug: false,
	            showBroadphase: false,
	            showBounds: false,
	            showVelocity: false,
	            showCollisions: false,
	            showAxes: false,
	            showPositions: false,
	            showAngleIndicator: false,
	            showIds: false,
	            showShadows: false
	        }
	    }
	});
	this.mouseConstraint = this.MouseConstraint.create(this.engine);

	// create two boxes and a ground

	//this.boxA = this.Bodies.rectangle(400, 200, 80, 80);

	this.ground = this.Bodies.rectangle(master.canvas.width/2, 600, master.canvas.width, 60, { isStatic: true });
	this.leftSide = this.Bodies.rectangle(0, 350,4, 700, { isStatic: true });
	this.rightSide = this.Bodies.rectangle(master.canvas.width-10, 350, 4, 700, { isStatic: true });
	//this.boxes=[this.boxA,this.boxB];

	// add all of the bodies to the world
	this.World.add(this.engine.world, [this.ground,this.leftSide,this.rightSide]);
	this.World.add(this.engine.world, this.mouseConstraint);
	//
	this.positions=[];
	for (var i = master.canvas.width - 20; i >= 20; i-= 40) {
		this.positions.push(i);
	};
	// run the engine
	this.Engine.run(this.engine);
	
	this.update=function  (input,param) {
		//this.Engine.update(this.engine, 1, 1);
		//console.log(this.boxB.position)
		//UPDATE OBJECTS
		for (var i = this.currentMenuObjects.length - 1; i >= 0; i--) {
			this.currentMenuObjects[i].update(input);
		};
		for (var i = this.currentVisualObjects.length - 1; i >= 0; i--) {
			this.currentVisualObjects[i].update();
		};
		//UPDATE OBJECTS IN DICT
		for (var key in this.gameObjects) {
			for (var i = this.gameObjects[key].length - 1; i >= 0; i--) {
				this.gameObjects[key][i].update(this.params,input);
				//REMOVE IF DEAD
				if (this.gameObjects[key][i].dead==1) {
					this.gameObjects[key].splice(i,1);
					
					continue;
				};
			};
		};
		//UPDATE TIMED EVENTS
		for (var i = this.timers.length - 1; i >= 0; i--) {
			this.timers[i].update();
		};
		//CUSTOM////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////

		//COLLISION EVENTS
		/*CollisionHandler ("playerToEnemy",this.gameObjects["players"],this.gameObjects["enemies"],
			this,"collidedWithEnemy",rectCollision);
		*/
		//EventTrigger (1,">",0,this.func) 

		//COLLISION EVENTS
		CollisionHandlerCustom ("pump2pump",this.gameObjects["pumpkins"],
			this,"collideWithPumpkin",rectCollision);
		

		//
		if (this.mode=="game") {
			if (this.selectedChar!="") {
				
				if (input[2]==0) {
					//PLACE IN NEW SLOT?

					var dist = this.swipeStartX -this.lastX;
					dist/=10;

					console.log("unselect "+dist)
					this.selectedChar.params["currentSway"]-=dist;
					this.selectedChar="";
				};
				if (this.selectedChar!="") {
				//this.selectedChar.updateGhost(input[0]);
				};
			};
		};


		


    };
    this.draw=function  (ctx) {
    	//console.log(this.gameObjects["bloodDrops"])

    	for (var i = this.currentVisualObjects.length - 1; i >= 0; i--) {
			this.currentVisualObjects[i].draw(ctx);
		};
		//write(ctx,this.lastX,20,30,"black",16);
		//DRAW OBJECTS IN DICT
		for (var key in this.gameObjects) {
			for (var i = this.gameObjects[key].length - 1; i >= 0; i--) {
				this.gameObjects[key][i].draw(ctx);
			};
		};
		//CUSTOM////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////
	
		//this.writeStats(ctx);

		//END////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////
		for (var i = this.currentMenuObjects.length - 1; i >= 0; i--) {
			this.currentMenuObjects[i].draw(ctx);
		};
		//
		this.writeScore(ctx);
    };
    this.bloodSplatter=function  (color,initialX,initialY) {
    	console.log("blood")
    	//Add blood purple
		for (var i = this.params["bloodAmount"] ; i >= 0; i--) {
			var r=Math.random();
			var r2=Math.random();
			var r3=Math.random();
			var rr1=Math.random();
			var rr2=Math.random();
			
			var sx=r*this.params["bloodSpeedVariance"] ;
			var sy=r2*this.params["bloodSpeedVariance"] ;
			
			if (rr1>0.5) {
				sx=sx*-1;
			};
			if (rr2>0.5) {
				sy=sy*-1;
			};
			
			var r4=Math.random();
			var x=initialX-(this.params["bloodSplatter"] /2)+(this.params["bloodSplatter"]*r4);
			var r5=Math.random();
			var y=initialY-(this.params["bloodSplatter"]/2)+(this.params["bloodSplatter"]*r5);
			this.gameObjects["bloodDrops"].push(new BloodDrop(x,y,this.params["bloodBaseSize"]*r3,sx,sy,this.params["bloodYmax"],color) );
		};
    };
   
	this.stageEnded=function  (argument) {
		console.log("stage finished");
	};
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//CUSTOM/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//body..
	this.spawnPumpking=function  () {

		if (this.spawnedTimes>=this.params["endAfter"]) {this.endGame()};
		this.spawnedTimes+=1;
		this.params["spawnRate"]-=this.params["spawnRateChange"];
		this.timers=[new TimedEvent (params["spawnRate"],1,this,"spawnPumpking")];
		// body...
		/*
		var r= Math.random();
		
		var p = getPumpkin(this.params["spawnPos1X"],0,10);
		if (r>0.5) {
			var p = getPumpkin(this.params["spawnPos2X"],0,10);
		};
		*/
		//BIG P
		var p = getBigPumpkin(randomChoose(this.positions),-80,10);
		if (this.spawnedTimes==20||this.spawnedTimes==this.params["endAfter"]-25) {
			var p = getBigPumpkin2(randomChoose(this.positions),-80,10);
		};
		this.gameObjects["pumpkins"].push(p);
		//MATTER
		this.World.addBody(this.engine.world,p.matterBody);

	};
	//clicked any
	this.clickedBig=function  (obj) {
		master.kabo=1;
		if (this.spawnedTimes>=this.params["endAfter"]-2) {
				document.addEventListener('touchstart', function () {
	        // Start playing audio when the user clicks anywhere on the page,
	        // to force Mobile Safari to load the audio.
	        document.removeEventListener('touchstart', arguments.callee, false);
	        //sounds.playSound("rantan");
	        //sounds.playSound("scream");
	        //if (master.kabo==1) {sounds.playSound("kabocha");};
	        sounds.playSound("scream");
	        
	        //sounds.playSound("scream");
	        
	        
	        }, false);
        };
		// body...
		sounds.playSound("kabocha");
		this.scoreShake=this.scoreShakeMax;
		this.params["score"]+=100;
		this.bloodSplatter("darkgreen",obj.params["x"],obj.params["y"]);
	};
	this.writeScore=function  (ctx) {
		// body...
		var m=ctx.measureText(String(this.params["score"]));
		if (this.scoreShake<0) {this.scoreShake+=1;this.scoreShake*=-1}
		else if(this.scoreShake>0){this.scoreShake-=1;this.scoreShake*=-1};
		//console.log(m.width)
		write(ctx,this.params["score"],this.scoreShake-(m.width/2)+master.canvas.width/2,80,"#E66C2C",60); 
	};
	this.endGame=function  () {
		// body...
		sounds.stopAll();
		master.ctx.clearRect(0,0,master.canvas.width,master.canvas.height);
		//sounds.playSound("scream");
		document.addEventListener('touchstart', function () {
        // Start playing audio when the user clicks anywhere on the page,
        // to force Mobile Safari to load the audio.
        document.removeEventListener('touchstart', arguments.callee, false);
        //sounds.playSound("rantan");
        //sounds.playSound("scream");
        //if (master.kabo==1) {sounds.playSound("kabocha");};
        //sounds.playSound("kabocha");
        
        sounds.playSound("scream");
        
        
        }, false);
		master.init("result_screen","");


		//$('html, body').animate({scrollTop: $(document).height()}, 'slow');
	};
	/*this.endGame2=function  () {
		$('html, body').animate({scrollTop: $(document).height()}, 'slow');
	};*/
	this.collideWithPumpkin=function  (obj1,obj2) {
		//console.log("col")
		obj1.params["grounded"]=1;
		obj2.params["grounded"]=1;
	};
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//END//////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};