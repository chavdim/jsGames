function Entity (debugMode,entityType,animImg,params,functions) {
    this.debugMode=debugMode;
    this.entityType=entityType;
    this.animImg=animImg;
    this.params=params;
    this.functions=functions;
    //RECT
    this.rect=new Rect(this.params["x"],this.params["y"],this.params["width"],this.params["height"]);
    //DELETE CONDITION
    this.dead=0;
    //image
    if (this.animImg!="") {
        this.animatedImage=animImg;
    };
    //ANIMATION CHANGE
    this.changeBack=0;
    this.dieAfteranim=0;
    //CUSTOM////////////////////////////////////////////////////
    this.ghostx=0;
    this.ghosty=0;
    this.ghostRect=new Rect(this.params["x"],this.params["y"],this.params["width"]/2,this.params["height"]/2);
    //this.matterBody=master.game.Bodies.rectangle(this.params["x"],this.params["y"],this.params["width"],this.params["height"]);
    this.matterBody=master.game.Bodies.circle ( this.params["x"],this.params["y"],this.params["width"]/2.5 ,[] ,10 ) 
    this.update=function  (gameParams,inputList) {
        //this.rect.set(this.params["x"],this.params["y"]);
        this.ckeckIfClicked(inputList);
        this.doOnUpdate();
    };
    this.draw=function  (ctx) {
        this.rect.set(this.params["x"]-(this.params["width"]/2),this.params["y"]-(this.params["height"]/2));
        if (this.debugMode==1) {
            ctx.fillStyle="black";
            this.rect.draw(ctx); 
            write(ctx,this.entityType,this.params["x"]+2,this.params["y"]+10,"red",12);
        };
        this.drawImage(ctx);
    };
    this.drawImage=function  (ctx) {
        if (this.animImg!="") {
            //TEST
            //this.animatedImage.draw(ctx,this.params["x"]-(this.params["width"]/2),this.params["y"]-(this.params["height"]/2));
            this.animatedImage.drawDegrees(ctx,this.params["x"],this.params["y"],
                this.matterBody.angle);
            //TEMPORARY ANIMATION
            /////////////////////
            this.changeBack-=1;
                if (this.changeBack==0) {
                    //RETURN ORIGINAL OR DIE
                    if (this.dieAfteranim==1) {
                        this.dead=1;
                    }
                    else{
                        this.resetAnimations();
                        this.animatedImage=this.animImg;
                    };
                };
        };
    };
    this.ckeckIfClicked=function  (inputList) {
        input=inputList[0];
        active=inputList[2];
        processed=inputList[1];
        if (processed==0&&active==1) {
            if (pointInRect(input.pageX-$('#gamecanvas').offset().left,input.pageY-$('#gamecanvas').offset().top,this.rect)) {
                console.log("entity selected");
                this.onclick();
            };
        };
    };
    this.onclick=function  () {
        document.addEventListener('touchstart', function () {
        // Start playing audio when the user clicks anywhere on the page,
        // to force Mobile Safari to load the audio.
        document.removeEventListener('touchstart', arguments.callee, false);
        //sounds.playSound("rantan");
        //sounds.playSound("scream");
        //if (master.kabo==1) {sounds.playSound("kabocha");};
        sounds.playSound("kabocha");
        
        //sounds.playSound("scream");
        
        
        }, false);
        //CUSTOM////
        if (this.entityType=="pumpkin") {
            console.log("clicked");
            master.game.selectedChar=this;
            master.game.swipeStartX=this.params["x"];
        };
        if (this.entityType=="bigPumpkin") {
            console.log("clickedBig");
            //master.game.selectedChar=this;
            //master.game.swipeStartX=this.params["x"];
            this.params["hp"]-=this.params["hpPerClick"];
            master.game.clickedBig(this);
            if (this.params["hp"]<=0) {
                this.dead=1;
                //
                master.game.World.remove(master.game.engine.world,this.matterBody,true);
            };
        };
    };
    this.doAnim=function  (name) {
        this.animatedImage = this.params[name];
        this.changeBack =(this.params[name].frames-1)*this.params[name].frameRate;
    };
    this.resetAnimations=function  () {
        //this.params["dieAnim"].currentFrame=0;
        this.params["shootAnim"].currentFrame=0;
    };
    //CUSTOM////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //CUSTOM////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    this.doOnUpdate=function  () {
        //MATTER.JS
        this.params["x"]=this.matterBody.position.x;
        this.params["y"]=this.matterBody.position.y;
        //
        if (this.params["x"]<-100||this.params["x"]>master.canvas.width+100) {
            this.dead=1;
        };
        if (this.params["y"]>master.canvas.height) {
            this.dead=1;
        };
        /*
        if (this.params["y"]>((master.canvas.height/2)-this.params["height"])) {
            this.params["grounded"]=1;

        };
        // body...
        if (this.params["grounded"]==0) {
            this.params["y"]+= this.params["fallSpeed"];
            this.params["x"] +=this.params["currentSway"];
            this.params["currentSway"]+=this.params["addSway"];
            //REACHED MAX
            if (Math.abs(this.params["currentSway"])>=this.params["sway"]){
                //console.log(this.params["addSway"])
                //CASE LEFT SWAY
                if (this.params["addSway"]==1) {

                    this.params["addSway"]= -1;
                }
                //CASE RIGHT SWAY
                else if (this.params["addSway"]==-1) {
                    this.params["addSway"]=1;
                };
            };
        };
        */
        
    };

};
///////////////CUSTOM/////////////////////////////////////
//////////////////////////////////////////////////////////
function BloodRect (x,y,w,h,color) {
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.color=color;
    //
    this.left=this.x;
    this.right=this.x+this.w;
    this.top=this.y;
    this.bottom=this.y+this.h;
    //
    this.set =function  (x,y) {
        this.x=x;
        this.y=y;
        //
        this.left=this.x;
        this.right=this.x+this.w;
        this.top=this.y;
        this.bottom=this.y+this.h;
        return this;
    };

    this.setSize=function (w,h) {
        this.w=w;
        this.h=h;
        this.right=this.x+this.w;
        this.bottom=this.y+this.h;
        this.top=this.y;
        this.left=this.x;
    };
    this.draw=function  (ctx) {
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        //if (this.w>=20) {ctx.strokeStyle = "orange";
        //ctx.lineWidth = 4;
        //ctx.strokeRect(this.x,this.y,this.w,this.h);
    };
};

//