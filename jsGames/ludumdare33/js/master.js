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
		master.updateDelay=26;
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
		master.mode=mode;
		//AUDIO
		//sounds.playSound("button",loop=0);
		sounds.stopAll();
		sounds.dic["menuBgm"].volume=1;
		//TRANSITION ACTIVATION
		master.doTransition();
		//GAME OBJECTS
		master.currentVisualObjects=[];
		master.currentGameObjects=[];
		master.currentMenuObjects=[];
		//END

		if (mode=="main_menu") {
			sounds.playSound("menuBgm",loop=1);
			master.isGameMode=0;
			master.currentVisualObjects=getMainMenuBG();
			master.currentMenuObjects=getMainMenuMenuObjects();
		}
		else if (mode=="explination") {
			sounds.playSound("menuBgm",loop=1);
			master.isGameMode=0;
			master.currentVisualObjects=getExplinationBG();
			master.currentMenuObjects=getExplinationMenuObjects();
		}
		else if (mode=="game_over") {
			sounds.playSound("menuBgm",loop=1);
			master.isGameMode=0;
			master.currentVisualObjects=getGameOverBG();
			master.currentMenuObjects=getGameOverMenuObjects();
		}
		else if (mode=="you_win") {

			sounds.playSound("menuBgm",loop=1);
			master.isGameMode=0;
			master.currentVisualObjects=getYouWinBG();
			master.currentMenuObjects=getYouWinMenuObjects();
		}
		else if (mode=="game_mode") {
			sounds.dic["gameBgm"].volume=0.35;
			sounds.dic["chase"].volume=0.06;
			sounds.dic["eatMan"].volume=0.15;
			sounds.dic["jump"].volume=0.1;
			sounds.dic["upgrade"].volume=0.25;

			sounds.playSound("gameBgm",loop=1);
			master.prepareGame("");
		};

	},
	doTransition:function  () {
		// body...
		master.transition.activate();
	},
	prepareGame:function  (param) {
		//Game (stage,attributes,objects)

		master.game=new Game(param,getGameAttributes(),getGameObjects());
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
		//DRAW GAME AGENT
		if (master.isGameMode==1) {
		master.game.draw(master.ctx);
		};
		//SPECIAL 
		if (master.mode=="you_win") {
			console.log(22)
		write(master.ctx,"you won in "+master.game.gameAttributes["days"]+" days.",50,410,"white",29);
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





