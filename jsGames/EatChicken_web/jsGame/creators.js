//GAME CREATORS
//AUDIO SOURCES
function getAudioSrcList () {
	return [
        "./sounds/gloomysky2.mp3",
        "./sounds/jump.wav",
        "./sounds/chicken.wav",
        "./sounds/explode.wav",
        "./sounds/button.wav",
        "./sounds/s1.wav"
            ];
};
//MAINMENU
function getMainMenuBG () {
	var bgObj=[
	new BackgroundVisualObject(imgSource="./images/menu1.png",animatedImages=[])
	];
	return bgObj;
};
function getMainMenuMenuObjects (argument) {
	var menuObj=[
	new Button(0,"Stages",125,254,150,60,function func () {game.initScreen("stage_select",0)} ),
	new Button(0,"Madrun",125,345,150,60,function func () {game.initScreen("mad_run",0)} )
	];
	return menuObj;
};
//STAGE SELECT
function getStageSelectBG () {
	var bgObj=[
	new BackgroundVisualObject(imgSource="./images/stages1.png",animatedImages=[])
	];
	return bgObj;
};
function getStageSelectMenuObjects (argument) {
	var menuObj=[
	new Button(0,"0",175,120,60,60,function func () {game.initScreen("select_powerups",0);} ),new Button(0,"1",175,190,60,60,function func () {game.initScreen("select_powerups",1);} ),
	new Button(0,"2",175,260,60,60,function func () {game.initScreen("select_powerups",2);} ),new Button(0,"3",175,330,60,60,function func () {game.initScreen("select_powerups",3);} ),
    new Button(0,"4",175,400,60,60,function func () {game.initScreen("select_powerups",4);} ),new Button(0,"Menu",175,470,60,60,function func () {game.initScreen("main_menu",0);} )  
    ];
	return menuObj;
};
//POWERUP SELECT
function getPowerSelectBG () {
	var bgObj=[
	new BackgroundVisualObject(imgSource="./images/powerUps.png",animatedImages=[])
	];
	return bgObj;
};
function getPowerSelectMenuObjects (argument) {
	var menuObj=[
	new Button(0,"pow1",272,272,60,60,function func () {game.addPower(1)} ),
	new Button(0,"pow2",272,344,60,60,function func () {game.addPower(2)} ),
	new Button(0,"pow3",272,417,60,60,function func () {game.addPower(3)} ),
	new Button(0,"back",85,537,60,60,function func () {
		game.refund();
		game.initScreen("stage_select",0);
	} ),
	new Button(0,"start",191,538,130,60,function func () {game.initScreen("stage_mode","same");} )    
    ];
	return menuObj;
};
//STAGE
function getStageBG (which) {
	if (which==1) {
		var bgObj=[
		new ScrollingBG(["./images/bg1.png","./images/bg1.png"],"right",1/4,windowWidth=400),
		new ScrollingBG(["./images/bg2.png","./images/bg2.png"],"right",1/8,windowWidth=400)
		];
	};
	if (which==0) {
		var bgObj=[
		new ScrollingBG(["./images/bg1n.png","./images/bg1n.png"],"right",1/4,windowWidth=400)
		];
	};
	if (which==2) {
		var bgObj=[
		new ScrollingBG(["./images/bg3.png","./images/bg3.png"],"right",1/4,windowWidth=400)
		];
	};
	if (which==3) {
		var bgObj=[
		new ScrollingBG(["./images/bg4.png","./images/bg4.png"],"right",1/4,windowWidth=400)
		];
	};
	if (which==4) {
		var bgObj=[
		new ScrollingBG(["./images/bg5.png","./images/bg5.png"],"right",1/4,windowWidth=400)
		];
	};
	
	return bgObj;
};
function getStageGameObjects (which) {
	var gameObj=[
	//new Player(280,60,20)
	];
	return gameObj;
};
function getStageMenuObjects (which) {
	//var bg1Image=new Image();bg1Image.src="./bg1.png";
	//var	bg2Image=new Image();bg2Image.src="./bg2.png";
	var menuObj=[

	];
	return menuObj;
};
//STAGE non basic
function getResultMenuObjects (which) {
	var menuObj=[
	new Button(0,"reset",128,470,150,68,function func () {game.initScreen("stage_mode",which);} ),
	new Button(0,"stages",128,380,150,68,function func () {game.initScreen("stage_select",0);} )
	];
	return menuObj;
};
function getWinResultMenuObjects (which) {
	if (which<4) {
		var menuObj=[
		new Button(0,"stages",128,50,150,68,function func () {game.initScreen("stage_select",0);} ),
		new Button(0,"replay",128,120,150,68,function func () {game.initScreen("stage_mode",which);} ),
		new Button(0,"next",128,190,150,68,function func () {game.initScreen("stage_mode",which +1);} )
		];
	}
	else{
		var menuObj=[
		new Button(0,"reset",175,50,60,60,function func () {game.initScreen("stage_mode",which);} ),
		//new Button(0,"next",175,120,60,60,function func () {game.initScreen("stage_mode",which+1);} ),
		new Button(0,"stages",175,190,60,60,function func () {game.initScreen("stage_select",0);} )
		];
	};
	return menuObj;
};
function getMadWinResultMenuObjects (which) {
		var menuObj=[
		new Button(0,"stages",128,50,150,68,function func () {game.initScreen("stage_select",0);} ),
		new Button(0,"replay",128,120,150,68,function func () {game.initScreen("mad_run",which);} )
		];
	return menuObj;
};
function getStageColors () {
	var colDic={
		0:"lightblue",
		1:"orange",
		2:"purple",
		3:"red",
		//BLOOD STATS
		4:"darkred",
		5:"darkred",

	};
	return colDic;
};