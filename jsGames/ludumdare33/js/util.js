function TimedEvent (time,countDownBy,parent,onZero) {
    this.time=time;
    this.timeCounter=time;
    this.countDownBy=countDownBy;
    this.onZero=onZero;
    this.active=1;
    this.update=function  () {
        if (this.active==0) {return};
        this.timeCounter-=this.countDownBy;
        if (this.timeCounter<=0) {
            parent[onZero]();
            this.timeCounter=this.time;
        };
    };
};
function CollisionHandler (name,objList1,objList2,parent,onCollision,collisionDetectionFunction) {
    for (var i = objList1.length - 1; i >= 0; i--) {
        var o1=objList1[i];
        for (var ii = objList2.length - 1; ii >= 0; ii--) {
            var o2=objList2[ii];
            if (collisionDetectionFunction(o1.rect,o2.rect)) {
                parent[onCollision](o1,o2);
                break;
            };
        };
    };
};
function Button (src,text,x,y,w,h,onclick) {
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.onclick=onclick;
    this.rect=new Rect(x,y,w,h);
    this.protoTypeText=text;
    this.src=src;
    if (this.src!="") {
        this.animatedImage=new AnimatedImage(src,1,1,0,0,0,0);
    };
    this.update=function  (inputList) {
        input=inputList[0];
        processed=inputList[1];
        if (processed==0) {
            if (pointInRect(input.pageX-10,input.pageY-10,this.rect)) {
                console.log("pressed");
                this.onclick();
            };
        };
    };
    this.draw=function  (ctx) {
        ctx.fillStyle="red";
        //this.rect.draw(ctx);
        if (this.src!="") {
            this.animatedImage.draw(ctx,this.x-15,this.y-15);
        };
        write(ctx,this.protoTypeText,this.x+10,this.y+26,"white",13); 
    };
    this.changeForAWhile=function(src,t) {
        // body...
        if (this.src!="") {
            this.animatedImage.changeForAWhile(src,t);
        };
    };
};
function write (ctx,text,x,y,color,size) {
    ctx.fillStyle = color;
    ctx.font = "bold " + size.toString() + "px sans-serif";
    ctx.fillText(text, x, y);
};
//CIRCLES
function Circle (x,y,r) {
    this.x=x;
    this.y=y;
    this.r=r;
    this.dead=0;
    this.set =function  (x,y) {
        this.x=x;
        this.y=y;
    };
    this.update=function  (ctx,color) {
        this.draw(ctx,color);
    };
    this.draw=function  (ctx,color) {
        drawCircle(this.x,this.y,this.r,color,ctx);
    };
};
function drawCircle (x,y,r,color,ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle =color;
    ctx.fill();
};
function cutCircle (context, x, y, radius){
    context.globalCompositeOperation = 'destination-out'
    context.arc(x, y, radius, 0, Math.PI*2, true);
    context.fill();
};
//RECT
function Rect (x,y,w,h) {
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
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
        ctx.fillRect(this.x,this.y,this.w,this.h);
        if (this.w>=20) {ctx.strokeStyle = "black";
        ctx.strokeRect(this.x,this.y,this.w,this.h);};

    };
};
function pointInRect (x,y,rect) {
    if(x>=rect.left && x<=rect.right && y>=rect.top && y<=rect.bottom ){return true;}
    else if(rect.h<0&&rect.w>0){
        if(x>rect.left && x<rect.right && y<rect.top && y>rect.bottom ){return true;};
    }
    else if(rect.h>0&&rect.w<0){
        if(x<rect.left && x>rect.right && y>rect.top && y<rect.bottom ){return true;};
    }
    else if(rect.h<0&&rect.w<0){
        if(x<rect.left && x>rect.right && y<rect.top && y>rect.bottom ){return true;};
    }
    else{return false;};
};
function rectCollision (rect1, rect2) {
    var rp1 = [[rect1.x,rect1.y],[rect1.x+rect1.w,rect1.y],[rect1.x,rect1.y+rect1.h],
    [rect1.x+rect1.w,rect1.y+rect1.h]];
    var rp2 = [[rect2.x,rect2.y],[rect2.x+rect2.w,rect2.y],[rect2.x,rect2.y+rect2.h],
    [rect2.x+rect2.w,rect2.y+rect2.h]];

    for (var i =0; i < rp1.length; i++) {
        if(pointInRect(rp1[i][0],rp1[i][1],rect2)==true ){return true;}
    };
    for (var i =0; i < rp2.length; i++) {
        if(pointInRect(rp2[i][0],rp2[i][1],rect1)==true ){return true;}
    };
    return false;
};