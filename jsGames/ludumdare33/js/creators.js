//PRELOAD IMAGES
preloadImages(
"./images/mainMenu.png",
"./images/big_button.png",
"./images/big_buttonPressed.png",
"./images/explination.png",
"./images/gameOver.png",
"./images/moon.png",
"./images/sun.png",
"./images/bg1.png",
"./images/bg2.png",
"./images/gameMenuBg.png",
"./images/gameBg.png",
"./images/monster.png",
"./images/hero.png",
"./images/youWin.png"
);
//GAME CREATORS
//AUDIO SOURCES
var yOff=50;
function getAudioSrcList () {
	return [

        "./sounds/button.wav",
        "./sounds/menuBgm.wav",
        "./sounds/gameBgm.wav",
        "./sounds/chase.wav",
        "./sounds/upgrade.wav",
        "./sounds/jump.wav",
        "./sounds/eatMan.wav"
            ];
};
//MAINMENU
function getMainMenuBG () {
	var bgObj=[
	new BackgroundVisualObject(imgSource="./images/mainMenu.png",animatedImages=[],0,0)
	];
	return bgObj;
};
function getMainMenuMenuObjects (argument) {
	var menuObj=[
	new Button("./images/big_button.png","",142,460+yOff,140,120,function func () {master.prepareObjects("explination","none");}),
	];
	return menuObj;
};
//EXPLINATION
function getExplinationBG () {
	var bgObj=[
	new BackgroundVisualObject(imgSource="./images/explination.png",animatedImages=[],0,0)
	];
	return bgObj;
};
function getExplinationMenuObjects () {
	var menuObj=[
	new Button("./images/big_button.png","",142,460+yOff,140,120,function func () {master.prepareObjects("game_mode","none");}),
    ];
	return menuObj;
};
//GAMEOVER
function getGameOverBG () {
	var bgObj=[
	new BackgroundVisualObject(imgSource="./images/gameOver.png",animatedImages=[],0,0)
	];
	return bgObj;
};
function getGameOverMenuObjects () {
	var menuObj=[
	new Button("./images/big_button.png","",142,460+yOff,140,120,function func () {master.prepareObjects("explination","none");}),
    ];
	return menuObj;
};
//YOUWIN
function getYouWinBG () {
	var bgObj=[
	new BackgroundVisualObject(imgSource="./images/youWin.png",animatedImages=[],0,0),

	];
	return bgObj;
};
function getYouWinMenuObjects () {
	var menuObj=[
	new Button("./images/big_button.png","",142,460+yOff,140,120,function func () {master.prepareObjects("explination","none");}),
	//new Button("./images/small_button.png","restart",125,254,90,60,function func () {master.prepareObjects("explination","none")} )
    ];
	return menuObj;
};
//GAMEMODE
function getGameModeBG (which) {
	var bgObj=[
	new ScrollingBG(["./images/moon.png","./images/moon.png"],"right",1/2.9,windowWidth=462),
	new ScrollingBG(["./images/bg1.png","./images/bg1.png"],"right",1/4,windowWidth=392),
	new BackgroundVisualObject(imgSource="./images/gameMenuBg.png",animatedImages=[],0,340),
	new BackgroundVisualObject(imgSource="./images/gameBg.png",animatedImages=[],0,0),

	
	];
	return bgObj;
};
function getGameModeGameObjects (which) {
	var gameObj=[
	//new Player(280,60,20)
	];
	return gameObj;
};
function getGameModeMenuObjects (which) {
	//var bg1Image=new Image();bg1Image.src="./bg1.png";
	//var	bg2Image=new Image();bg2Image.src="./bg2.png";
	var menuObj=[
	new Button("./images/small_button.png","reset",312,24,60,40,function func () {master.prepareObjects("explination","none");}),

	new Button("./images/big_button.png","",142,460+yOff,140,120,function func () {master.game.mainButtonPressed();}),
	new Button("./images/small_button.png","spd1",175,396+yOff,60,40,function func () {master.game.upgrade("plus1");}),
	new Button("./images/small_button.png","spd10",30,460+yOff,60,40,function func () {master.game.upgrade("plus10");}),
	new Button("./images/small_button.png","spd100",30,520+yOff,60,40,function func () {master.game.upgrade("plus100");}),

	new Button("./images/small_button.png","jump",master.canvas.width-90,460+yOff,60,40,function func () {master.game.abillity("jump");}),
	new Button("./images/small_button.png","money",master.canvas.width-90,520+yOff,60,40,function func () {master.game.abillity("money");}),

	new Button("./images/small_button.png","mute",20,24,60,40,function func () {sounds.muteAll()}),
	];
	return menuObj;
};
//GAME non basic
function getResultMenuObjects (which) {
	var menuObj=[
	//new Button("reset",175,120,60,60,function func () {master.prepareObjects("stage_mode",which);} ),
	];
	return menuObj;
};
function getGameAttributes (which) {
	var attributes={
		"gravity":1,
	"nightTime":1,
	"time":0,
	"timeDecay":0.2,
	"startDist":startDist,
	"baseMs":0.1,
	"increaseSpeedBy":1.5,
	"addPerClick":4,
	"bonusClicks":0,

	"menRemaining":10,
	"maxBonus":200,
	"bonusForNextRound":200,
	"maxTime":200,
	"remainingTime":200,
	"credits":10,
	"creditGainBeforeBoost":0.04,
	"creditGain":0.04,
	"creditPerEat":30,
	"timeBonusMultiplier":0.5,

	"upgrade1":1,
	"upgrade2":1,
	"upgrade3":1,
	"cost1":20,
	"cost2":50,
	"upgradeCap":7,
	"Mmultiplier":1.7,
	"level":1,
	"days":0,

	"jumpDistance":100,
	"upgradeM":1,
	//FIXES
	"moneyFix":0,
		//BLOOD STATS
		"bloodAmount":30,
		"bloodBaseSize":6,
		"bloodSizeVariance":110,
		"bloodSpeedVariance":18,
		"bloodSplatter":1,
		"bloodYmax":20,
		"chickenBloodRatio":2,
	};
	return attributes;
};
var startDist=110;
function getGameObjects (which) {
	var menuObj={
	"player":[new Player(master.canvas.width-startDist,230,20,0)],
	"enemy":[new Player(startDist,265,20,1)],
	"bloodDrops":[]
	};
	return menuObj;
};