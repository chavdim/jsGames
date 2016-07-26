function KakikouriGame (stage) {
	//GAME VARIABLES
	this.gravity=1;
	//
	this.currentGameObjects=getStageGameObjects(this.param);
	this.currentVisualObjects=getStageBG(this.param);
	this.currentMenuObjects=getStageMenuObjects(this.param);
	//
	//this.player=new Player(280,180,20);
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
		"bloodBaseSize":6,
		"bloodSizeVariance":110,
		"bloodSpeedVariance":18,
		"bloodSplatter":1,
		"bloodYmax":20,
		"chickenBloodRatio":2,
	};
	//
	this.kouri=new Player("./images/cup.png",18,30,40);
	this.player=new Player("./images/noneface.png",0,0,40);
	this.ice=new Player("./images/bigice.png",20,256,40);
	//
	this.gameObjects={
		"players":[],
		"enemies":[this.kouri,this.ice,this.player],
		"boosts":[],
		"bloodDrops":[],
	};
	//kakikouri
	this.meterMax=100;
	this.meterValue=this.meterMax/1.5;
	this.meterWidth=40;
	this.meterDelay=1/3;

	this.eatGain=16;
	this.remainingIce=60;
	this.decreaceIceBy=10;
	this.remainingTime=12;

	this.changingIce=0;
	this.changingIce2=0;

	this.level=1;
    this.lvl2IceAmount=100;
    this.lvl2Time=15;

    this.alpha=0;
    this.blueness=0;
    //POWERS
    this.power1Used=0;
    this.power2Used=0;
    this.power3Used=0;
    this.power4Used=0;
    this.kiin=0;
    //shigeki
    this.shigekiCounter=0;
    this.shigekiZoneWidth=170;
	this.update=function  (input,param) {
		//UPDATE OBJECTS IN DICT
		for (var key in this.gameObjects) {
			for (var i = this.gameObjects[key].length - 1; i >= 0; i--) {
				this.gameObjects[key][i].update(this.gameAttributes);

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

		//UPDATE TIMED EVENTS
		for (var i = this.timers.length - 1; i >= 0; i--) {
			this.timers[i].update();
		};
		//
		if (this.meterValue>this.meterMax-20 && this.kiin!=1 ) {
			this.kiin=1;
			this.kiinFunc();
		};
		if (this.kiin==1) {
			if (this.meterValue<=this.meterMax/1.7) {
    		this.kiin=0;
    	};
		};
		//kouri
		if (this.remainingIce<=0) {this.finishedIce()};
		if (this.remainingTime>0 && this.remainingIce>0 && this.changingIce==0) {
			this.remainingTime-=0.024;
			this.remainingTime=Math.floor(this.remainingTime * 100) / 100;
		};
		if (this.remainingTime<0) {this.remainingTime=0};
		if (this.changingIce==1) {
			this.kouri.x-=8;
			this.ice.x-=8;
			if (this.kouri.x<-400) {
				this.kouri.x=game.canvas.width+60;
				this.ice.x=game.canvas.width+60;
				this.changingIce2=1;
				this.ice.y-=this.level*30;
			};
			if (this.changingIce2==1 && this.kouri.x<(game.canvas.width/2)-150) {
				
				this.changingIce=0;
				this.changingIce2=0;

			};
		};
		if (this.meterValue>0) {this.meterValue-=this.meterDelay};
		if (this.meterValue<0) {this.meterValue=-1};
		//UPDATE OBJECTS
		for (var i = this.currentMenuObjects.length - 1; i >= 0; i--) {
			this.currentMenuObjects[i].update(input);
		};
		for (var i = this.currentVisualObjects.length - 1; i >= 0; i--) {
			this.currentVisualObjects[i].update();
		};
    };
    this.kiinFunc=function  () {
    	// body...
    	console.log("kiin");
    	this.player.animatedImage.resetChange();
    	this.meterValue=this.meterMax-20;
    	this.player.animatedImage.changeForAWhile("./images/kiinface.png",80);
    };
    this.drawMeter=function  (ctx) {
    	// meter value
    	//ctx.fillStyle="grey";
    	//ctx.fillRect(0,0,game.canvas.width,this.meterWidth+20);
    	ctx.fillStyle="red";
    	ctx.fillRect(34,24,game.canvas.width*(this.meterValue/100) -20,this.meterWidth-5);
    	ctx.fillStyle="darkred";
    	ctx.fillRect(game.canvas.width-this.shigekiZoneWidth,24,this.shigekiZoneWidth-30,this.meterWidth-20);
    };
    this.drawRemainingIce=function  (ctx) {
    	//write(ctx,this.remainingIce,10,100,"blue",24); 
    };
    this.drawTimer=function  (ctx) {
    	write(ctx,this.remainingTime,130,130,"black",64); 
    };
    this.drawShigekiCount=function  (ctx) {
    	var i=this.shigekiCounter*5;
    	if (this.shigekiCounter>15) {i=15*5};
    	write(ctx,this.shigekiCounter+"刺激",10,320,"red",34+(i)); 
    };
    this.drawToungue=function  (ctx) {
    	// body...
    	ctx.fillStyle="blue";
		ctx.globalAlpha=this.alpha/100;
    	ctx.fillRect(170,550,140/2,120/2);
    	ctx.globalAlpha=1;
    };
    this.draw=function  (ctx) {
    	ctx.fillStyle="red";
    	ctx.fillRect(380,0,20,120);
    	ctx.fillStyle="blue";
		ctx.fillRect(0,0,20,120);
    	this.drawMeter(ctx);
    	for (var i = this.currentVisualObjects.length - 1; i >= 0; i--) {
			this.currentVisualObjects[i].draw(ctx);
		};

		//DRAW OBJECTS IN DICT
		for (var key in this.gameObjects) {
			for (var i = this.gameObjects[key].length - 1; i >= 0; i--) {
				this.gameObjects[key][i].draw(ctx);
			};
		};
		ctx.fillStyle="brown";
		ctx.fillRect(0,416,400,70);
		for (var i = this.currentMenuObjects.length - 1; i >= 0; i--) {
			this.currentMenuObjects[i].draw(ctx);
		};
		//kakikouri
		
		this.drawRemainingIce(ctx);
		this.drawTimer(ctx);
		this.drawToungue(ctx);
		this.drawShigekiCount(ctx);
    };
    this.usePower=function  (num) {
    	// body...
    	if (num==1) {
    		if (this.power1Used==0) {
    			this.power1Used=1;
    			this.currentMenuObjects[6].changeForAWhile("./images/yellow2.png",10);
    		};
    	};
    	if (num==2) {
    		if (this.power2Used==0) {
    			this.power2Used=1;
    			this.currentMenuObjects[7].changeForAWhile("./images/red2.png",10);
    		};
    	};
    	if (num==3) {
    		if (this.power3Used==0) {
    			this.power3Used=1;
    			this.currentMenuObjects[8].changeForAWhile("./images/blue2.png",10);
    			this.bigEat();
    		};
    	};
    	if (num==4) {
    		this.power4Used=1;
    		this.currentMenuObjects[9].changeForAWhile("./images/green2.png",10);
    	};
    };
    this.bigEat=function  () {
    	if (this.kiin==1) {return};
    	// body...
    	this.eat();
    	this.meterValue-=this.eatGain;
    	this.eat();
    	this.meterValue-=this.eatGain;
    	this.eat();
    	this.isItShigeki();
    };
    this.isItShigeki=function  (argument) {
    	// body...
    	var a=game.canvas.width*(this.meterValue/100) -20;
    	var b=game.canvas.width-this.shigekiZoneWidth;
    	if (a>b) {
    		this.shigekiCounter+=1;
    		this.player.animatedImage.changeForAWhile("./images/happy.png",10);
    	};


    };
    this.eat=function  () {
    	sounds.playSound("kakikoori");
    	if (this.kiin==1) {return};
    	if (this.changingIce!=0) {return};
    	// body...
    	this.meterValue+=this.eatGain;
    	this.remainingIce-=this.decreaceIceBy;
    	//this.alpha+=5;
    	this.currentMenuObjects[0].animatedImage.changeForAWhile("./images/mouthClosed.png",8);
    	this.blueness+=1;
    	if (this.blueness>3) {
    		//this.currentMenuObjects[0].animatedImage.changeImage();
    	};
    	this.bloodSplatter("blue",this.player.x+300,this.player.y+280);
    	if (this.remainingIce>0) {
    		//this.player.animatedImage.changeForAWhile("./images/painPlayer.png",10);
    		//this.player.animatedImage.changeForAWhile2("./images/eatAnim.png",10,5,22);
    	};
    	this.ice.y+=10;
    	this.player.doEatAnim(game.ctx);
    	this.isItShigeki();
    };
    this.finishedIce=function  () {
    	// body...
    	this.level+=1;
    	this.changingIce=1;
    	if (this.level==2) {
    		//this.remainingIce=this.lvl2IceAmount;
    		//this.remainingTime=this.lvl2Time;
    		//this.ice.y-=60;
    	};
    	this.remainingIce=this.level*30;
    	this.remainingTime=10+(this.level*2);
    	this.alpha=0;
    	//
    	this.power1Used=0;
   	 	this.power2Used=0;
   		this.power3Used=0;
    	this.power4Used=0;
    	this.player.animatedImage.changeForAWhile("./images/satisfied.png",95);
    	this.shigekiZoneWidth-=15;
    	
    	
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
    this.fell=function  (argument) {
    	// body...
    };
	this.stageEnded=function  (argument) {
		console.log("stage finished");
	};
};