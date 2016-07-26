$(window).load(function () {
	master.init("main_menu","none");
});
var master={
	init:function  (mode,param) {
		//DEBUG LOG 
		console.log("master initiated in mode,param:",mode,param);
		//END
		//CANVAS CONTEXT DECLARATION
		master.canvas=document.getElementById('gamecanvas');
		master.ctx=master.canvas.getContext('2d');
		//CONTEXT2
		master.canvas2=document.getElementById('gamecanvas2');
		master.ctx2=master.canvas2.getContext('2d');
		//TRANSITION
		master.transition=new RectClearTransition(master.canvas.width,master.canvas.height); 
		//END

		//GAME MECHANICAL VARIABLES
		master.mode=mode;
		master.isGameMode=0;
		master.clearTimeOutsOnce=1;
		master.param=param;
		master.updateDelay=40;
		inputHandler.processed=1;
		mainTimeout=0;
		master.clearTimeouts();

		//GAME TIMED EVENTS
		master.timedEvents=[];
		//END

		//PREPARE
		master.prepareObjects(master.mode,param);
		//START
		master.mainLoop();


	},
	prepareObjects:function  (mode,param) {
		//AUDIO
		//sounds.playSound("button");
		//TRANSITION ACTIVATION
		master.transition.activate();
		//GAME OBJECTS
		master.currentVisualObjects=[];
		master.currentGameObjects=[];
		master.currentMenuObjects=[];
		//END
		if (mode=="main_menu") {
			master.isGameMode=0;
			master.currentVisualObjects=getMainMenuBG();
			master.currentMenuObjects=getMainMenuMenuObjects();
		}
		else if (mode=="explination") {
			console.log(1)
			master.isGameMode=0;
			this.mode="explination";
			master.currentVisualObjects=getExplinationBG();
			master.currentMenuObjects=getExplinationMenuObjects();
		}
		else if (mode=="stage_mode") {
			master.prepareGame(param);

		}
		else if (mode=="mad_run") {}
		else if (mode=="result_screen") {};
	},
	prepareGame:function  (param) {
		//Game (stage,attributes,objects)
		master.game=new Game(param,{},{});
		master.isGameMode=1;
		//master.currentGameObjects=getStageGameObjects(master.param);
		//master.currentVisualObjects=getStageBG(master.param);
		//master.currentMenuObjects=getStageMenuObjects(master.param);
	},
	mainLoop:function  () {
		master.updateGame(inputHandler.getMouseInput());
		master.updateView();
		//MAINLOOP TIMEOUT
		mainTimeout=window.setTimeout(master.mainLoop,master.updateDelay);
	},
	updateGame:function  (input) {
		//UPDATE ALL OBJECTS
		try{
			for (var i = master.currentGameObjects.length - 1; i >= 0; i--) {
				master.currentGameObjects[i].update(input);
			};
			for (var i = master.currentMenuObjects.length - 1; i >= 0; i--) {
				master.currentMenuObjects[i].update(input);
			};
			for (var i = master.currentVisualObjects.length - 1; i >= 0; i--) {
				master.currentVisualObjects[i].update(input);
			};
		}
		catch(e){};
		//UPDATE GAME AGENT
		if (master.isGameMode==1) {
		master.game.update(input,inputHandler.processed);
		};
		
		//INPUT HAS BEEN PROCESSED
		inputHandler.processed=1;

	},
	updateView:function  () {
		//CLEAR ALL CONTEXT 
		master.clearView();
		//END
		for (var i = master.currentVisualObjects.length - 1; i >= 0; i--) {
			master.currentVisualObjects[i].draw(master.ctx);
		};
		for (var i = master.currentGameObjects.length - 1; i >= 0; i--) {
			master.currentGameObjects[i].draw(master.ctx);
		};
		for (var i = master.currentMenuObjects.length - 1; i >= 0; i--) {
			master.currentMenuObjects[i].draw(master.ctx);
		};
		if (this.mode=="main_menu") {

			write (this.ctx,"FOREST",60,160,"green",100) ;
			write (this.ctx,"GROWTH",60,260,"green",100) ;

			drawFilledCircle (520+65,440,50,"green",this.ctx);
            this.ctx.fillStyle="black";
            this.ctx.fillRect(515+65,490,10,90);

            drawFilledCircle (660+65,400,80,"green",this.ctx);
            this.ctx.fillStyle="black";
            this.ctx.fillRect(652+65,479,16,120);

            
		};
		if (this.mode=="explination") {

			write (this.ctx,"grow a beautifull forest",60,160,"green",22) ;
			write (this.ctx,"before being designated for cutting.",60,200,"green",22) ;

			write (this.ctx,"reach max Value ensure your forest survives and win.",60,240,"green",22) ;
			write (this.ctx,"buy upgrades for your forest to improve stats.",60,280,"green",22) ;

			write (this.ctx,"the bigger your forrest is the more money you will get",60,320,"green",22) ;
			write (this.ctx,"..however the bigger it is the more desirable for cutting it becomes.",60,360,"green",22) ;
            
		};

		//DRAW GAME AGENT
		if (master.isGameMode==1) {
		  master.game.draw(master.ctx);
		};
		//TRANSITION UPDATE
		master.transition.draw(master.ctx2);

	},
	clearView:function  () {
		master.ctx.clearRect(0,0,master.canvas.width,master.canvas.height);
	},
	clearTimeouts:function  () {
		clearTimeout(mainTimeout);
	},

};





