function Player (x,y,size,type) {
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
    if (type==0) { this.animatedImage=new AnimatedImage("./images/monster.png",3,3,0,0,0,0);};
    if (type==1) { this.animatedImage=new AnimatedImage("./images/hero.png",3,3,0,0,0,0);};
    this.typ=type;
    //
    this.frameRate=3;
    this.frameT=0;
    this.imgFrame=0;
    this.maxFrame=6;
    this.animType=0;
    this.fartColors=["#FF0000","#FF7F00","#FFFF00","#00FF00","#00FFFF","#0000FF","#8B00FF"];
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
        if (this.typ==1) {
        this.animatedImage.draw(ctx,this.x-30,this.y);
        };
        if (this.typ==0) {
        this.animatedImage.draw(ctx,this.x-80,this.y);
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
//

