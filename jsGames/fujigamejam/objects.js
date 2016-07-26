$(window).load(function () {
    //imgs.init();
    //sounds.init();
});
//
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
function Player (src,x,y,size) {
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
    this.animatedImage=new AnimatedImage(src,1,1,0,0,0,0);
    //
    this.frameRate=3;
    this.frameT=0;
    this.imgFrame=0;
    this.maxFrame=6;
    this.animType=0;
    this.fartColors=["#FF0000","#FF7F00","#FFFF00","#00FF00","#00FFFF","#0000FF","#8B00FF"];
    //
    this.eatAnim=new AnimatedImage("./images/z.png",5,4,0,0,0,0);
    this.anim2=0;
    this.doEatAnim=function  (ctx) {
        // body...
        //this.eatAnim.draw(ctx,this.x,this.y);
        this.anim2=8;
    };

    this.update=function  (paramDic) {
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
        if (this.anim2==0) {
            this.animatedImage.draw(ctx,this.x,this.y);
        };
        if (this.anim2>1) {
            this.eatAnim.draw(ctx,this.x,this.y);
            this.anim2-=1;
            if (this.anim2==1) {this.anim2=0};
        };
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

