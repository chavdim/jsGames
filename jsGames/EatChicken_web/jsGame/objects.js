$(window).load(function () {
    //imgs.init();
    //sounds.init();
});
//
function WinScreenMad (x,y,stage) {
    this.x=x;
    this.y=y;
    this.image=new SingleImage("./images/resultMad.png",0,0);
    this.score = 0;
    this.active=0;
    this.moveSpeed=30;
    this.stageNum=stage
    this.hOffset=60;
    //buttons
    this.buttons=getMadWinResultMenuObjects(stage);
    this.update=function  (input) {

        //this.image.x=this.x;
        this.image.y=this.y-300;
        //sroll down on game win
        if (this.active==1) {
            if (this.y<this.hOffset+game.canvas.height/2) {

                this.y+=this.moveSpeed;
            };
        };
        for (var i = this.buttons.length - 1; i >= 0; i--) {
            //this.buttons[i].x=this.x;
            this.buttons[i].y= -40 + this.y + 90*i;
            this.buttons[i].update(input);
        };

    };
    this.draw=function  (ctx) {
        //ctx.fillRect(this.x,this.y,20,20);
        this.image.draw(ctx);
        for (var i = this.buttons.length - 1; i >= 0; i--) {
            this.buttons[i].draw(ctx);
        };
        if (this.y>game.canvas.height/2) {
            write(ctx,this.score,this.x+14,this.y-66,"yellow",26); 
        };
        
    };
    this.activate=function  (score) {
        this.score=score;
        this.active=1;
    };
};
function WinScreen (x,y,stage) {
    this.x=x;
    this.y=y;
    this.image=new SingleImage("./images/result.png",0,0);
    this.score = 0;
    this.active=0;
    this.moveSpeed=20;
    this.stageNum=stage
    //buttons
    this.buttons=getWinResultMenuObjects(stage);
    this.update=function  (input) {

        //this.image.x=this.x;
        this.image.y=this.y-300;
        //sroll down on game win
        if (this.active==1) {
            if (this.y<game.canvas.height/2) {

                this.y+=this.moveSpeed;
            };
        };
        for (var i = this.buttons.length - 1; i >= 0; i--) {
            //this.buttons[i].x=this.x;
            this.buttons[i].y= -40 + this.y + 90*i;
            this.buttons[i].update(input);
        };

    };
    this.draw=function  (ctx) {
        //ctx.fillRect(this.x,this.y,20,20);
        this.image.draw(ctx);
        for (var i = this.buttons.length - 1; i >= 0; i--) {
            this.buttons[i].draw(ctx);
        };
        if (this.y>game.canvas.height/2) {
            write(ctx,this.score,this.x+14,this.y-66,"yellow",26); 
        };
        
    };
    this.activate=function  (score) {
        this.score=score;
        this.active=1;
    };
};
function BloodDrop (x,y,size,speedX,speedY,yMax,color) {
    this.x=x;
    this.y=y;
    this.size=size;
    this.color=color;

    this.circle=new Circle(this.x-(this.size/2),this.y-(this.size/2),this.size);
    this.dead=0;
    this.speedX=speedX;
    this.speedY=speedY;
    this.yMax=yMax;

    this.update=function  (param) {
        if (this.speedY<this.yMax) {
            this.speedY+=param["gravity"];
        };

        this.x+=this.speedX;
        this.y+=this.speedY;
        this.circle.set(this.x,this.y);
        //

    };
    this.draw=function  (ctx) {
        this.circle.draw(ctx,this.color);
    };

};
function Enemy (x,y,size,speed) {
    this.x=x;
    this.y=y;
    this.size=size;

    this.rect=new Rect(x,y,this.size,this.size);
    this.dead=0;
    this.speed=speed;
    //image stats
    this.frameRate=3;
    this.frameT=0;
    this.imgFrame=0;
    this.maxFrame=5;

    //image stats
    this.animatedImage=new AnimatedImage("./images/enemy.png",5,3,0,0,0,0);
    this.update=function  (ctx) {
        //image frames
        this.frameT+=1;
        if (this.frameT>=this.frameRate) {
            this.frameT=0;
            this.imgFrame+=1;
            if (this.imgFrame>=this.maxFrame) {this.imgFrame=0};
        };
        //
        this.x+=this.speed;
        this.rect.set(this.x,this.y);
        //this.draw(ctx);
    };
    this.draw=function  (ctx) {
        //ctx.fillStyle="black";
        //this.rect.draw(ctx);
        this.drawImage(ctx);
    };
    this.drawImage=function  (ctx) {
        this.animatedImage.draw(ctx,this.x,this.y);
        /*
        var img=game.enemyImage;
        //displacement of original image
        var imgx=this.imgFrame * (img.width/this.maxFrame);
        var imgy=0;
        //width and height sut off from original image
        var imgw=(img.width/this.maxFrame);
        var imgh=img.height;
        ctx.drawImage(img,imgx,imgy,imgw,imgh,this.x-10,this.y-10,imgw*1.3,imgh*1.3);
        */
    };

};
function Boost (x,y,size,speed,add) {
    this.x=x;
    this.y=y;
    this.size=size+20;
    this.add=add;

    this.rect=new Rect(x,y,this.size,this.size);
    this.dead=0;
    this.speed=speed;
    //image stats
    this.frameRate=3;
    this.frameT=0;
    this.imgFrame=0;
    this.maxFrame=3;
    this.animatedImage=new AnimatedImage("./images/chicken.png",3,3,0,0,0,0);
    this.update=function  (ctx) {
        //image frames
        this.frameT+=1;
        if (this.frameT>=this.frameRate) {
            this.frameT=0;
            this.imgFrame+=1;
            if (this.imgFrame>=this.maxFrame) {this.imgFrame=0};
        };

        //
        this.x+=this.speed;
        this.rect.set(this.x-10,this.y-10);
        //this.draw(ctx);
    };
    this.draw=function  (ctx) {
        //ctx.fillStyle="yellow";
        //this.rect.draw(ctx);
        this.drawImage(ctx);
    };
    this.drawImage=function  (ctx) {
        this.animatedImage.draw(ctx,this.x,this.y);
        /*
        var img=game.starImage;
        //displacement of original image
        var imgx=this.imgFrame * (img.width/this.maxFrame);
        var imgy=0;
        //width and height sut off from original image
        var imgw=(img.width/this.maxFrame);
        var imgh=img.height;
        ctx.drawImage(img,imgx,imgy,imgw,imgh,this.x-5-5,this.y-5,imgw*1.2,imgh*1.2);
        */
    };

};
function Player (x,y,size) {
    this.x=x;
    this.y=y;
    this.size=size;

    this.rect=new Rect(x,y,this.size,this.size);
    this.dead=0;
    this.speed=3;
    this.energy=100;

    this.yVector=0;
    this.yMax=28;

    this.jumpAcceleration=16;
    this.jumpMax=-46;
    this.stopJump=0;
    this.fartTime=40;
    //
    this.circles=[];
    this.circleAddTime=2;
    this.circleAddTimer=0;
    this.circleInitialR=size/1.0;
    this.circleMoveSpeed=1;
    //image stats
    this.animatedImage=new AnimatedImage("./images/purple.png",6,3,0,0,0,0);
    //
    this.frameRate=3;
    this.frameT=0;
    this.imgFrame=0;
    this.maxFrame=6;
    this.animType=0;
    //this.fartColors=["#FF0000","#FF7F00","#FFFF00","#00FF00","#00FFFF","#0000FF","#8B00FF"];
    this.fartColors=["white"];
    this.activateRainbow=function  () {
        this.fartColors=["#FF0000","#FF7F00","#FFFF00","#00FF00","#00FFFF","#0000FF","#8B00FF"];
    };
    this.update=function  (paramDic) {
        this.y+=this.yVector;
        if (this.yVector>0) {
            this.stopJump=1;
        };
        if (this.yVector<this.yMax) {
            this.yVector+=paramDic["gravity"];
        };
        //image frames
        
        //
        this.energy-=paramDic["drainRate"];
        if (this.stopJump>=1) {
            this.stopJump-=1;
        };
        if (this.stopJump>0) {
            this.circleAddTimer+=1;
            if (this.circleAddTimer==this.circleAddTime) {
                var r=this.circleInitialR*(this.energy/100)+4;
                this.circles.push(new Circle(this.x+(this.size/2)+20,this.y+(this.size),r));
                this.circleAddTimer=0;
            };
        };
        
        //
        this.rect.set(this.x,this.y);
        
        //this.draw(ctx);
    };
    this.draw=function  (ctx) {
        ctx.fillStyle="green";
        //this.rect.draw(ctx);
        ctx.fillStyle="white";
        //ctx.clearRect(this.x+2,this.y+2,(this.size/5),(this.size/5));
        //ctx.clearRect(this.x+8,this.y+2,(this.size/5),(this.size/5));
        var f=0;
        for (var i = this.circles.length - 1; i >= 0; i--) {
            this.circles[i].x += this.circleMoveSpeed*5;
            this.circles[i].r -= this.circleMoveSpeed;

            this.circles[i].update(ctx,this.fartColors[f]);
            f+=1;
            if (f==this.fartColors.length) {f=0};

            if (this.circles[i].r <=1) {
                this.circles.splice(i,1);
            };
        };
        this.drawImage(ctx);
        //ctx.drawImage(game.playerImage,this.x-22,this.y-10);

    };
    this.drawImage=function  (ctx) {
        this.animatedImage.draw(ctx,this.x,this.y-30);
    };
    this.jump=function  (paramDic) {
        if (this.energy>0) {

        this.energy-=paramDic["jumpCost"];
        //sounds.dic["jump"].volume=0.5;
        //sounds.dic["jump"].play();
        this.stopJump= this.fartTime;
        //if (this.stopJump!=1&&this.yVector>this.jumpMax) {
        this.yVector=0;
        this.yVector-=this.jumpAcceleration;
        this.grounded=0;
       // };
        //if (this.yVector<=this.jumpMax) {
          //  this.stopJump=1;
           // this.yVector=this.jumpMax
        //};
        };
    };
    this.collideWithEnemy=function  (enemy) {
        if (rectCollision(this.rect,enemy.rect)) {
            return true;
        };
    };    
};
//

