$(window).load(function () {
	//master.init("main_menu","");
});
assetsToLoad=2;
function assetsLoaded (which) {
	console.log(which+" LOADED");
	assetsToLoad-=1;
	if (assetsToLoad==0) {
		master.init("main_menu","");
	};
}
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
		//master.transition=new RectClearTransition(master.canvas.width,master.canvas.height);
		master.transition=new FadeTransition(master.canvas.width,master.canvas.height,0.20,0.01);
		//END

		//GAME MECHANICAL VARIABLES
		master.mode=mode;
		master.isGameMode=0;
		master.clearTimeOutsOnce=1;
		master.param=param;
		master.updateDelay=22;
		inputHandler.processed=1;
		mainTimeout=0;
		master.clearTimeouts();

		master.currentVisualObjects=[];
		master.currentGameObjects=[];
		master.currentMenuObjects=[];

		//GAME TIMED EVENTS
		master.timedEvents=[];
		//END

		//PREPARE
		master.prepareObjects(master.mode,param);
		//START
		master.mainLoop();

		//CUSTOM
		master.shake=40;
		master.kabo=0;


	},
	prepareObjects:function  (mode,param) {
		
		//AUDIO
		//sounds.playSound("button");
		//TRANSITION ACTIVATION
		master.clearTimeouts();
		master.mode=mode;
		master.param=param;
		master.transition.activate();
	},
	prepareObjects2:function  (mode,param) {
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
		else if (mode=="stage_mode") {
			//sounds.playSound("rantan");
			master.prepareGame(param);
		}
		else if (mode=="mad_run") {}
		else if (mode=="result_screen") {
			master.clearTimeouts();
			sounds.playSound("scream");
			master.currentVisualObjects=getResultBG();
			master.currentMenuObjects=getResultMenuObjects();
			window.setTimeout(master.scroll,3000);
		};
	},
	scroll:function  () {
		$('html, body').animate({scrollTop: $(document).height()}, 'slow');
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
		master.kabo=0;
		master.updateGame(inputHandler.getMouseInput());
		master.updateView();
		//MAINLOOP TIMEOUT
		mainTimeout=window.setTimeout(master.mainLoop,master.updateDelay);
	},
	updateGame:function  (input) {
		//CUSTOM

		if (master.shake<0) {master.shake+=1;master.shake*=-1}
		else if(master.shake>0){master.shake-=1;master.shake*=-1};
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
		//TRANSITION UPDATE
		master.transition.draw(master.ctx2);
		if (master.transition.switchScreen==1&&master.transition.active==0) {
			console.log(master.mode,master.param);
			master.prepareObjects2(master.mode,master.param);
			master.transition.switchScreen=0;
		};

	},
	clearView:function  () {
		master.ctx.clearRect(0,0,master.canvas.width,master.canvas.height/2);
		master.ctx2.clearRect(0,0,master.canvas.width,master.canvas.height);
	},
	clearTimeouts:function  () {
		clearTimeout(mainTimeout);
	},

};





