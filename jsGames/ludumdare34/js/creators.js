//GAME CREATORS
//AUDIO SOURCES
function getAudioSrcList () {
	return [

        "./sounds/button.wav"
            ];
};
//MAINMENU
function getMainMenuBG () {
	var bgObj=[
	//new BackgroundVisualObject(imgSource="./images/mainMenu.png",animatedImages=[])
	];
	return bgObj;
};
function getMainMenuMenuObjects (argument) {
	var menuObj=[
	new Button("start",100,340,150,60,function func () {master.prepareObjects("explination","none")} )
	];
	return menuObj;
};
//EXPLINATION
function getExplinationBG () {
	var bgObj=[
	//new BackgroundVisualObject(imgSource="./images/exlination.png",animatedImages=[])
	];
	return bgObj;
};
function getExplinationMenuObjects (argument) {
	var menuObj=[
	//new Button("0",175,120,60,60,function func () {master.prepareObjects("stage_mode",0);} ),new Button("1",175,190,60,60,function func () {master.prepareObjects("stage_mode",1);} ),
	//new Button("2",175,260,60,60,function func () {master.prepareObjects("stage_mode",2);} ),new Button("3",175,330,60,60,function func () {master.prepareObjects("stage_mode",3);} ),
    //new Button("4",175,400,60,60,function func () {master.prepareObjects("stage_mode",4);} ),new Button("Menu",175,470,60,60,function func () {master.prepareObjects("main_menu",0);} )  
    new Button("start",100,400,150,60,function func () {master.prepareObjects("stage_mode","none")} )
    ];
	return menuObj;
};
//STAGE
function getStageBG (which) {
	var bgObj=[

	//new ScrollingBG(["./images/bg1.png","./images/bg1.png"],"right",1/4,windowWidth=400),
	//new ScrollingBG(["./images/bg2.png","./images/bg2.png"],"right",1/8,windowWidth=400)
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
	new Button("   upgrade",-22,485,150,60,function func () {master.game.upgradeMenu("none")} ),
	new Button("new",780,20,120,60,function func () {master.prepareObjects("stage_mode","none")} )
	];
	return menuObj;
};
//STAGE non basic
function getResultMenuObjects (which) {
	var menuObj=[
	//new Button("reset",175,120,60,60,function func () {master.prepareObjects("stage_mode",which);} ),
	//new Button("stages",175,190,60,60,function func () {master.prepareObjects("stage_select","none");} )
	];
	return menuObj;
};