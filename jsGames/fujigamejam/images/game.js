$(window).load(function () {
	game.init("main_menu",0);
});
//DEBUG
var start = new Date().getTime();
var game={
	init:function  (mode,param) {
		//DEBUG LOG 
		console.log("game initiated in mode,param:",mode,param);
		
		//END
		//CANVAS CONTEXT DECLARATION
		game.canvas=document.getElementById('gamecanvas');
		game.ctx=game.canvas.getContext('2d');
		//CONTEXT2
		game.canvas2=document.getElementById('gamecanvas2');
		game.ctx2=game.canvas2.getContext('2d');
		//TRANSITION
		game.transition=new RectClearTransition(game.canvas.width,game.canvas.height); 
		//END
		//GAME VARIABLES
		game.gravity=1;
		//GAME MECHANICAL VARIABLES
		game.mode=mode;
		game.isGameMode=0;
		game.clearTimeOutsOnce=1;
		game.param=param;
		game.updateDelay=22;
		inputHandler.processed=1;
		mainTimeout=0;
		game.clearTimeouts();
		
		
		//GAME TIMED EVENTS
		game.timedEvents=[];
		//END

		//PREPARE
		game.prepareObjects(game.mode,param);
		//START
		game.mainLoop();


	},
	prepareObjects:function  (mode,param) {
		//AUDIO
		sounds.playSound("button");
		//TRANSITION ACTIVATION
		game.transition.activate();
		//GAME OBJECTS
		game.currentVisualObjects=[];
		game.currentGameObjects=[];
		game.currentMenuObjects=[];
		//END
		if (mode=="main_menu") {
			game.isGameMode=0;
			game.currentVisualObjects=getMainMenuBG();
			game.currentMenuObjects=getMainMenuMenuObjects();
		}
		else if (mode=="stage_select") {
			game.isGameMode=0;
			game.currentVisualObjects=getStageSelectBG();
			game.currentMenuObjects=getStageSelectMenuObjects();
		}
		else if (mode=="stage_mode") {
			game.prepareGame(param);

		}
		else if (mode=="mad_run") {}
		else if (mode=="result_screen") {};
	},
	prepareGame:function  (param) {
		game.kakikouriGame=new KakikouriGame(param);
		game.isGameMode=1;

		//game.currentGameObjects=getStageGameObjects(game.param);
		//game.currentVisualObjects=getStageBG(game.param);
		//game.currentMenuObjects=getStageMenuObjects(game.param);
	},
	mainLoop:function  () {
		//console.log(new Date().getTime()-start )
		game.updateGame(inputHandler.getMouseInput());
		game.updateView();
		//start = new Date().getTime()
		//MAINLOOP TIMEOUT
		
		mainTimeout=window.setTimeout(game.mainLoop,game.updateDelay);
	},
	updateGame:function  (input) {
		//UPDATE ALL OBJECTS
		try{
			for (var i = game.currentGameObjects.length - 1; i >= 0; i--) {
				game.currentGameObjects[i].update(input);
			};
			for (var i = game.currentMenuObjects.length - 1; i >= 0; i--) {
				game.currentMenuObjects[i].update(input);
			};
			for (var i = game.currentVisualObjects.length - 1; i >= 0; i--) {
				game.currentVisualObjects[i].update(input);
			};
		}
		catch(e){};
		//UPDATE GAME AGENT
		if (game.isGameMode==1) {
		game.kakikouriGame.update(input,inputHandler.processed);
		};
		//END
		//INPUT HAS BEEN PROCESSED
		inputHandler.processed=1;

	},
	updateView:function  () {
		//CLEAR ALL CONTEXT 
		game.clearView();
		//END
		for (var i = game.currentVisualObjects.length - 1; i >= 0; i--) {
			game.currentVisualObjects[i].draw(game.ctx);
		};
		for (var i = game.currentGameObjects.length - 1; i >= 0; i--) {
			game.currentGameObjects[i].draw(game.ctx);
		};
		for (var i = game.currentMenuObjects.length - 1; i >= 0; i--) {
			game.currentMenuObjects[i].draw(game.ctx);
		};
		//DRAW GAME AGENT
		if (game.isGameMode==1) {
		game.kakikouriGame.draw(game.ctx);
		};
		//TRANSITION UPDATE
		game.transition.draw(game.ctx2);

	},
	clearView:function  () {
		game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
	},
	clearTimeouts:function  () {
		clearTimeout(mainTimeout);
	},

};





