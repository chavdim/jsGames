$(window).load(function () {
	game.init("main_menu",0);
});
//DEBUG
//var start = new Date().getTime();
var game={
	init:function  (mode,param) {
		sounds.muteAll();
		//debug purpose
		console.log(localStorage.getItem("levelsUnlocked"));
		//localStorage.setItem("chickens", 0);
		//storage
		if (!localStorage.getItem("levelsUnlocked")) {
			localStorage.setItem("levelsUnlocked", 1);
		};
		if (!localStorage.getItem("chickens")) {
			localStorage.setItem("chickens", 0);
		};
		if (!localStorage.getItem("highScore")) {
			localStorage.setItem("highScore", 0);
		};
		//localStorage.getItem("levelsUnlocked")
		//console.log(localStorage.getItem("levelsUnlocked"));
		//DEBUG LOG 
		//console.log("game initiated in mode,param:",mode,param);
		
		//END
		//CANVAS CONTEXT DECLARATION
		game.canvas=document.getElementById('gamecanvas');
		game.ctx=game.canvas.getContext('2d');
		//CONTEXT2
		game.canvas2=document.getElementById('gamecanvas2');
		game.ctx2=game.canvas2.getContext('2d');
		//TRANSITION
		//game.transition=new RectClearTransition(game.canvas.width,game.canvas.height); 
		game.transition=new FadeTransition(game.canvas.width,game.canvas.height,0.075,0.1);  
		//END
		//GAME VARIABLES
		game.gravity=1;
		//GAME MECHANICAL VARIABLES
		game.mode=mode;
		game.isGameMode=0;
		game.clearTimeOutsOnce=1;
		game.param=param;
		game.p1=0;
		game.p2=0;
		game.p3=0;
		game.possibleRefund=0;
		//delay is 22
		game.updateDelay=22;
        game.paused=0;
		inputHandler.processed=1;
		mainTimeout=0;
		game.clearTimeouts();
        

		
		
		//GAME TIMED EVENTS
		game.timedEvents=[];
		//END

		//PREPARE
		game.initScreen(game.mode,param);
		//game.prepareObjects(game.mode,param);
		//START
		game.mainLoop();


	},
	initScreen:function  (mode,param,p1,p2,p3) {
		//Check if stage unlocked
		game.possibleRefund=0;
		if (param!="same") {
			game.param=param;
		};
		var lvl =localStorage.getItem("levelsUnlocked");
		//console.log(param)
		if (game.param<=lvl) {
			//SOUND
			sounds.playSound("button");
			//TRANSITION ACTIVATION
			game.transition.activate();
			//
			game.mode=mode;
			
			
			//game.p1=p1;
			//game.p2=p2;
			//game.p3=p3;
		};
		
	},
	addPower:function  (power) {
		var c =localStorage.getItem("chickens");
		var cost1=5;
		var cost2=10;
		var cost3=20;
		if (power==1) {
			if (c>=cost1&&game.p1==0) {
				game.p1=1;
				c-=cost1;
				game.possibleRefund+=3;
			};
		};
		if (power==2) {
			if (c>=cost2&&game.p2==0) {
				game.p2=1;
				c-=cost2;
				game.possibleRefund+=5;
			};
		};
		if (power==3) {
			if (c>=cost3&&game.p3==0) {
				game.p3=1;
				c-=cost3;
				game.possibleRefund+=8;
			};
		};
		localStorage.setItem("chickens",c);
	},
	refund:function  () {
		var c =parseInt(localStorage.getItem("chickens")) + game.possibleRefund;
		localStorage.setItem("chickens",c);
	},
	prepareObjects:function  (mode,param) {
		//console.log(mode)
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
			var lvl =localStorage.getItem("levelsUnlocked");
			//
			game.isGameMode=0;
			game.currentVisualObjects=getStageSelectBG();
			game.currentMenuObjects=getStageSelectMenuObjects();
			//toggle unavailable stages
			console.log(lvl);
			for (var i = game.currentMenuObjects.length  - 1; i >= lvl; i--) {
				game.currentMenuObjects[i].pressable=0;
			};
			game.currentMenuObjects[game.currentMenuObjects.length  - 1].pressable=1;

		}
		else if (mode=="stage_mode") {
			//sounds.playSound("gloomysky2",1);
			game.prepareGame(game.param);

		}
		else if (mode=="select_powerups") {
			//sounds.playSound("gloomysky2",1);
			//game.prepareGame(param);
			game.isGameMode=0;
			game.currentVisualObjects=getPowerSelectBG();
			game.currentMenuObjects=getPowerSelectMenuObjects();

		}
		else if (mode=="mad_run") {
			game.prepareMadGame(game.param);
		}
		else if (mode=="result_screen") {};
	},
	prepareGame:function  (param) {
		game.pakupakuGame=new PakuPakuGame(param);
		game.isGameMode=1;
		console.log(game.p1,game.p2,game.p3)

		//game.currentGameObjects=getStageGameObjects(game.param);
		//game.currentVisualObjects=getStageBG(game.param);
		//game.currentMenuObjects=getStageMenuObjects(game.param);
	},
	prepareMadGame:function  (param) {
		game.pakupakuGame=new PakuPakuMadGame(param);
		game.isGameMode=1;

		//game.currentGameObjects=getStageGameObjects(game.param);
		//game.currentVisualObjects=getStageBG(game.param);
		//game.currentMenuObjects=getStageMenuObjects(game.param);
	},
	mainLoop:function  () {
		//console.log(new Date().getTime()-start )
        if(game.paused==0){
		if (game.transition.stall()==false) {
			game.updateGame(inputHandler.getMouseInput());
			game.updateView();
		};
		game.updateTransition();
        };
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
		game.pakupakuGame.update(input,inputHandler.processed);
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
			game.pakupakuGame.draw(game.ctx);
		};
		//chicken
		if (game.mode=="main_menu"&&game.transition.switchScreen==0) {
			var chickens=localStorage.getItem("chickens");
			write(game.ctx,chickens,90,41,"yellow",32); 
		};
		if (game.mode=="select_powerups"&&game.transition.switchScreen==0) {
			var chickens=localStorage.getItem("chickens");
			write(game.ctx,chickens,90,41,"yellow",32); 
		};
		if (game.mode=="stage_select"&&game.transition.switchScreen==0) {
			var chickens=localStorage.getItem("chickens");
			write(game.ctx,chickens,90,41,"yellow",32); 
		};
		
		
		


	},
	updateTransition:function  () {
		//TRANSITION UPDATE
		game.transition.draw(game.ctx2);
		//console.log(game.transition.switchScreen)
		if (game.transition.switchScreen==1) {
			game.prepareObjects(game.mode,game.param)
			game.transition.switchScreen=0;
		};
	},
	clearView:function  () {
		game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
		game.ctx2.clearRect(0,0,game.canvas.width,game.canvas.height);
	},
	clearTimeouts:function  () {
		clearTimeout(mainTimeout);
	},

};





