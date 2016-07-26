//GAME CREATORS
//AUDIO SOURCES
function getAudioSrcList () {
	return [
        "./sounds/gloomysky2.mp3",
        "./sounds/kakikoori.mp3",
        "./sounds/fight.mp3",
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
	new BackgroundVisualObject(imgSource="./images/menu_button.png",animatedImages=[],0),
	new BackgroundVisualObject(imgSource="./images/menu.png",animatedImages=[],0)
	];
	return bgObj;
};
function getMainMenuMenuObjects (argument) {
	var menuObj=[
	new Button("","Stages",25,560,96,70,function func () {game.prepareObjects("stage_mode",2)} )
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
	new Button("","0",175,120,60,60,function func () {game.prepareObjects("stage_mode",0);} ),new Button("1",175,190,60,60,function func () {game.prepareObjects("stage_mode",1);} ),
	new Button("","2",175,260,60,60,function func () {game.prepareObjects("stage_mode",2);} ),new Button("3",175,330,60,60,function func () {game.prepareObjects("stage_mode",3);} ),
    new Button("","4",175,400,60,60,function func () {game.prepareObjects("stage_mode",4);} ),new Button("Menu",175,470,60,60,function func () {game.prepareObjects("main_menu",0);} )  
    ];
	return menuObj;
};
//STAGE
function getStageBG (which) {
	var bgObj=[
	//new ScrollingBG(["./images/bg1.png","./images/bg1.png"],"right",1/4,windowWidth=400),
	//new ScrollingBG(["./images/bg2.png","./images/bg2.png"],"right",1/8,windowWidth=400)

	new BackgroundVisualObject(imgSource="./images/bgMain.png",animatedImages=[],60)
	];
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
	 new Button("./images/mouth.png","eat",135,510,140,120,function func () {game.kakikouriGame.eat();}),
	 //new Button("","p1",10,495,80,40,function func () {game.kakikouriGame.usePower("1");}),
	 //new Button("","p2",90,445,80,40,function func () {game.kakikouriGame.usePower("2");}),
	 //new Button("","p3",220,445,80,40,function func () {game.kakikouriGame.usePower("3");}),
	 new Button("","p4",310,435,80,40,function func () {game.prepareObjects("main_menu",2);}),

	 new BackgroundVisualObject(imgSource="./images/meter.png",animatedImages=[],0),
	//new BackgroundVisualObject(imgSource="./images/yellow.png",animatedImages=[],90),
	//new BackgroundVisualObject(imgSource="./images/red.png",animatedImages=[],90),
	//new BackgroundVisualObject(imgSource="./images/blue.png",animatedImages=[],90),
	new BackgroundVisualObject(imgSource="./images/green.png",animatedImages=[],30),

	new BackgroundVisualObject(imgSource="./images/command_bg.png",animatedImages=[],93)
	];
	return menuObj;
};
//STAGE non basic
function getResultMenuObjects (which) {
	var menuObj=[
	new Button("","reset",175,120,60,60,function func () {game.prepareObjects("stage_mode",which);} ),
	new Button("","stages",175,190,60,60,function func () {game.prepareObjects("stage_select","none");} )
	];
	return menuObj;
};