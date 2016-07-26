function Menu () {
	this.mode="main"

	this.mainScreen= new MenuScreen("main",1,[new Button("Stages",125,254,150,60,function func () {game.menu.changeCurrentScreen("stages");game.menu.doTransition2();clearTimeout(gameloopfunc)} )  ]   );
	this.stagesScreen= new MenuScreen("stages",1,[new Button("0",175,120,60,60,function func () {console.log("pressed0");game.clearTimeouts();game.menu.doTransition(game.init,0);} ),new Button("1",175,190,60,60,function func () {console.log("pressed1");game.clearTimeouts();game.menu.doTransition(game.init,1);} ),
												  new Button("2",175,260,60,60,function func () {console.log("pressed");game.clearTimeouts();game.menu.doTransition(game.init,2);} ),new Button("3",175,330,60,60,function func () {console.log("pressed");game.clearTimeouts();game.menu.doTransition(game.init,3);} ) ,
                                                  new Button("4",175,400,60,60,function func () {console.log("pressed");game.clearTimeouts();game.menu.doTransition(game.init,2);} ),new Button("5",175,470,60,60,function func () {console.log("pressed");game.clearTimeouts();game.menu.doTransition(game.init,2);} )  ]   );
    this.resultScreen= new MenuScreen("result",1,
        [new Button("reset",130,250,150,70,function func () {sounds.onButtonPress();game.reset2()} ),new Button("stages",130,340,150,70,function func () {sounds.onButtonPress();game.clearTimeouts();game.menu.changeCurrentScreen("stages");game.onMenu=1;game.updateMenu()} ),
        new Button("menu",130,430,150,70,function func () {sounds.onButtonPress();console.log("return to menu");game.clearTimeouts();game.init(-1,0)} )]);

	this.currentScreen=this.mainScreen;
    this.transition=new Transition1();
    this.transition.on=0;
    this.func=0;
    this.param=game.stageNum;
	this.update=function  (ctx,mouse,clicked) {
        //
        //this.draw(ctx);

        
        if (this.transition.on==1 && this.mode!="stages") {
            this.transition.update(ctx);
            //console.log("this.param",this.param)
            if (this.transition.on==0) {
                debugStage=this.param
                game.stageNum=this.param
                //this.func(this.param);
            };
        }
        else if(this.transition.on==1 && this.mode=="stages"){
            
            this.currentScreen.update(ctx,mouse,clicked);
            this.transition.update(ctx);
        }
        else{
            this.currentScreen.update(ctx,mouse,clicked);
        };
    };
    this.draw=function  (ctx) {

    };
    this.resetTransition=function  () {
        this.transition.on=0;
        this.transition.t=0;
        debugStage=this.param
        game.stageNum=this.param
    };
    this.doTransition2=function  () {
        sounds.onButtonPress();
        // body...
        this.transition.on=1;
    };
    this.doTransition=function  (func,param) {
        sounds.onButtonPress();

        console.log("transition stage",param);
        this.transition.on=1;
        this.func=func;
        this.param=param;


        debugStage=this.param;
        game.stageNum=this.param
        game.init(param,1);

    };
    this.changeCurrentScreen=function  (name) {
    	if (name=="stages") {this.mode="stages";this.currentScreen=this.stagesScreen;game.onMenu=1};
        if (name=="result") {this.mode="result";this.currentScreen=this.resultScreen};
    };
};
function Transition1 () {
    this.players=[];
    this.on=0;
    this.time=34;
    this.t=0;
    for (var i = game.canvas.height ; i >= 0; i-=50) {
        this.players.push(new Player(game.canvas.width-50,i,50))
    };
    this.rect=new Rect(0,0,game.canvas.width,game.canvas.height);
    this.update=function  (ctx) {
        //
        this.t++;
        this.draw(ctx);   
        if (this.t>=this.time) {this.on=0;this.t=0};  
    };
    this.draw=function  (ctx) {
        //ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
        ctx.fillStyle="purple";
        ctx.fillRect(0-(game.canvas.width*(this.t/this.time))-50,0,game.canvas.width,game.canvas.height);
        for (var i = this.players.length - 1; i >= 0; i--) {
            this.players[i].x-=12;
            this.players[i].update(ctx);
        };
    };
};
function MenuScreen (name,bg,buttons) {
	this.mode=name;
	this.buttons=buttons;
	this.update=function  (ctx,mouse,clicked) {
        //console.log(mouse.clientX,mouse.clientY)
        //
        for (var i = this.buttons.length - 1; i >= 0; i--) {
        	if (clicked==1) {

        		if (pointInRect(game.mouseX-10,game.mouseY-10,this.buttons[i].rect)) {
                    console.log("pressed");
                    clicked=0;
                    this.buttons[i].onclick();
                };
        	};	
        };
        this.draw(ctx);
    };
    this.draw=function  (ctx) {
        if (game.menu.mode=="result") {
            game.ctx.clearRect(game.canvas.width/4,game.canvas.height/3,game.canvas.width/2,game.canvas.height/4);
            game.ctx.fillStyle="rgb(139,0,0)";
            game.ctx.fillRect(game.canvas.width/4,game.canvas.height/3,game.canvas.width/2,game.canvas.height/4);
        }
        else{
            game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
		    game.ctx.fillStyle="rgb(139,0,0)";
		    game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        };
        if (this.mode=="stages") {
            var img=game.stages1Image;
        }
        else if (this.mode=="result") {var img=game.reset1Image;}
        else{var img=game.menu1Image;};
        
        ctx.drawImage(img,0,0);
		//buttons
		for (var i = this.buttons.length - 1; i >= 0; i--) {
			this.buttons[i].update(ctx);
		};
    };
};


//MainMenu=new Menu();