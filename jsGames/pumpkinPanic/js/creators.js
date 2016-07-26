//GAME CREATORS
//PRELOAD IMAGES
preloadImages(
	getImageSrcList()
);
preloadAudio(
	getAudioSrcList()
);
var pumpi=new AnimatedImage ("./design/pumpkin2.png",1,2,1);

//IMAGE SOURCES
function getImageSrcList () {
	return [
      "./design/pumpkin3.png",
	  "./design/pumpkin2.png",
	  "./design/pumpkin.png",
	  "./design/game_bg.png",
	  "./design/panic.jpg" ,
	  "./design/halloween.png",
	  "./design/scary.png"
    ];
};
//AUDIO SOURCES
function getAudioSrcList () {
	return [
        //"./sounds/button.wav",
        "./sounds/scream.wav",
        "./sounds/rantan.wav",
        "./sounds/kabocha.wav",
        //"./sounds/crash.mp3"
    ];
};
//MAINMENU///////////////////////////////////////////
function getMainMenuBG () {
	var bgObj=[
	//new BackgroundVisualObject(imgSource="./design/logo.png",animatedImages=[],0,0)
	new BackgroundVisualObject2(images["halloween"],animatedImages=[],0,0)
	];
	return bgObj;
};
function getMainMenuMenuObjects (argument) {
	var menuObj=[
	new Button("start",125,254,150,60,function func () {master.prepareObjects("stage_mode","")} )
	];
	return menuObj;
};
//RESULT///////////////////////////////////////////
function getResultBG () {
	var bgObj=[
	//new BackgroundVisualObject(imgSource="./design/logo.png",animatedImages=[],0,0)
	new BackgroundVisualObjectWithShake(images["scary"],animatedImages=[],0,0,26)
	];
	return bgObj;
};
function getResultMenuObjects (argument) {
	var menuObj=[
	new Button("restart",168,675,150,60,function func () {
		sounds.playSound("rantan");
		$('html, body').animate({scrollTop: 0}, 'slow');
		master.prepareObjects("stage_mode","")} )
	];
	return menuObj;
};
//STAGE//////////////////////////////////////////////
function getStageBG (which) {
	var bgObj=[
	//new ScrollingBG(["./images/bg2.png","./images/bg2.png"],"right",1/8,windowWidth=400)
	//new BackgroundVisualObject(imgSource="./design/turret.png",animatedImages=[],120,228),
	//new BackgroundVisualObject(imgSource="./design/panic.jpg",animatedImages=[],0,0),
	new BackgroundVisualObject2(images["halloween"],animatedImages=[],0,0)
	];
	return bgObj;
};
function getStageMenuObjects (which) {
	var menuObj=[
	//make new Button (text,x,y,w,h,onclick)
	];
	return menuObj;
};
//GAME STATS
function getGameAttributes (which) {
	var attributes={
		"gravity":1,
		//
		"spawnPos1X":15+master.canvas.width/3,
		"spawnPos2X":(master.canvas.width/1.5)-15,
		"spawnRate":14,
		"spawnRateChange":0.1,
		"endAfter":125,
		"score":0,
		//BLOOD STATS
		"bloodAmount":18,
		"bloodBaseSize":10,
		"bloodSizeVariance":110,
		"bloodSpeedVariance":26,
		"bloodSplatter":1,
		"bloodYmax":20,
		"chickenBloodRatio":2,
	};
	return attributes;
};
var blockSize=100;
var positions={
};
function getGameObjects (which) {
	var menuObj={
	"pumpkins":[],
	"bloodDrops":[]
	};
	return menuObj;
};

function getPumpkin (xpos,ypos,sway) {
	var z=new Entity(debugMode=0,"pumpkin",new AnimatedImage ("./design/pumpkin3.png",1,2,1),
		{	//for rect
			"x":xpos,
			"y":-100,
			"sway":sway,
			"currentSway":sway,
			"addSway":-1,

			"width":blockSize*1,
			"height":blockSize*0.7,
			"fallSpeed":6,
			"hp":"100",

			"grounded":0,
			//"dieAnim":new AnimatedImage ("./design/creatureDie.png",6,2,1),
		},{});
	return z;
};

function getBigPumpkin (xpos,ypos,sway) {
	var z=new Entity(debugMode=0,"bigPumpkin",new AnimatedImage2 (images["pumpkin2"],1,2,1),
		{	//for rect
			"x":xpos,
			"y":ypos,
			"sway":sway,
			"currentSway":sway,
			"addSway":-1,
			"hpPerClick":10,

			"width":blockSize,
			"height":blockSize,
			"fallSpeed":2,
			"hp":"10",
			//"dieAnim":new AnimatedImage ("./design/creatureDie.png",6,2,1),
		},{});
	return z;
};
function getBigPumpkin2 (xpos,ypos,sway) {
	var z=new Entity(debugMode=0,"bigPumpkin",new AnimatedImage2 (images["pumpkin"],1,2,1),
		{	//for rect
			"x":xpos,
			"y":ypos,
			"sway":sway,
			"currentSway":sway,
			"addSway":-1,
			"hpPerClick":10,

			"width":blockSize,
			"height":blockSize,
			"fallSpeed":2,
			"hp":"80",
			//"dieAnim":new AnimatedImage ("./design/creatureDie.png",6,2,1),
		},{});
	return z;
};