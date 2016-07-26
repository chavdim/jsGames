function doWithProbabilityX (x,parent,doIf) {
    var r=Math.random();
    if (r<=x) {parent[doIf]()};
};
function randomChoose (list) {
    // body...
    var percentEach=1/list.length;
    for (var i = list.length - 1; i >= 0; i--) {
        if (Math.random()<percentEach) {
            return list[i];
        };
    };
    return list[Math.round(list.length/2)];
};
function TimedEvent (time,countDownBy,parent,onZero) {
	this.time=time;
	this.timeCounter=time;
	this.countDownBy=countDownBy;
    this.parent=parent;
	this.onZero=onZero;
    this.active=1;
    this.update=function  () {
        if (this.active==0) {return};
        this.timeCounter-=this.countDownBy;
        if (this.timeCounter<=0) {
            this.parent[onZero]();
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
//CUSTOM/////////////////////////////
function drawRotated(canvas,ctx,image,x,y,degrees){
    //ctx.clearRect(0,0,canvas.width,canvas.height);

    // save the unrotated ctx of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    ctx.save();

    // move to the center of the canvas
    ctx.translate(x,y);

    // rotate the canvas to the specified degrees
    ctx.rotate(degrees);

    //console.log(image,x-image.width/2,y-image.width/2)
    // draw the image
    // since the ctx is rotated, the image will be rotated also
    ctx.drawImage(image,-image.width/2,-image.width/2);

    // we’re done with the rotating so restore the unrotated ctx
    ctx.restore();
}
function CollisionHandlerCustom (name,objList1,parent,onCollision,collisionDetectionFunction) {
    for (var i = 0 ; i < objList1.length; i++) {
        var obj=objList1[i];
        for (var ii = 1 + i; ii < objList1.length; ii++) {
            var obj2=objList1[ii];
            if (collisionDetectionFunction(obj.rect,obj2.rect)) {
                parent[onCollision](obj,obj2);
            };
        };
        
    };
};
function EventTrigger (var1,type,var2,onEvent) {
    if (type=="<") {
        if (var1<var2) {
            onEvent();
        };
    };
    if (type=="<=") {
        if (var1<=var2) {
            onEvent();
        };
    };
    if (type==">") {
        if (var1>var2) {
            onEvent();
        };
    };
    if (type==">=") {
        if (var1>=var2) {
            onEvent();
        };
    };
    if (type=="==") {
        if (var1==var2) {
            onEvent();
        };
    };
    if (type=="!=") {
        if (var1!=var2) {
            onEvent();
        };
    };
};
function Button (text,x,y,w,h,onclick) {
	this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.onclick=onclick;
    this.rect=new Rect(x,y,w,h);
    this.protoTypeText=text;
    this.update=function  (inputList) {
    	input=inputList[0];
    	processed=inputList[1];
    	if (processed==0) {
	    	if (pointInRect(input.pageX-$('#gamecanvas').offset().left,input.pageY-$('#gamecanvas').offset().top,this.rect)) {
	            console.log("pressed");
	            this.onclick();
	        };
        };
    };
    this.draw=function  (ctx) {
        ctx.fillStyle="black";
        this.rect.draw(ctx);
        write(ctx,this.protoTypeText,this.x+10,this.y+30,"white",20); 
    };
};
function write (ctx,text,x,y,color,size) {
    ctx.fillStyle = color;
    //ctx.font = "bold " + size.toString() + "px sans-serif";
    ctx.font = "bold " + size.toString() + "px hallo";
    ctx.fillText(text, x, y);
};
//Splatter effect
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
    this.defaultGravity=1;

    this.dead=0;
    //
    this.rainbow=["#FF0000","#FF7F00","#FFFF00","#00FF00","#00FFFF","#0000FF","#8B00FF"];
    this.colorCount=0;
    this.update=function  (param) {
        if (this.y>=master.canvas.height+60) {this.dead=1};
        if (this.speedY<this.yMax) {
            var g=0;
            if(typeof param["gravity"] === 'undefined'){
                g=this.defaultGravity;
            }
            else{
                g=param["gravity"];
            };
            this.speedY+=g;
        };

        this.x+=this.speedX;
        this.y+=this.speedY;
        this.circle.set(this.x,this.y);
        //

    };
    this.draw=function  (ctx) {
        this.circle.draw(ctx,this.rainbow[this.colorCount]);
        this.colorCount+=1;
        if (this.colorCount>this.rainbow.length-1) {this.colorCount=0;};
    };
};
function BloodDropBlock (x,y,size,speedX,speedY,yMax,color) {
    this.x=x;
    this.y=y;
    this.size=size;
    this.color=color;

    this.circle=new Circle(this.x-(this.size/2),this.y-(this.size/2),this.size);
    this.rect=new BloodRect(this.x,this.y,size,size,color);

    this.dead=0;
    this.speedX=speedX;
    this.speedY=speedY;
    this.yMax=yMax;
    this.defaultGravity=1;

    this.dead=0;
    this.update=function  (param) {
        if (this.y>=master.canvas.height/2) {this.dead=1};
        if (this.speedY<this.yMax) {
            var g=0;
            if(typeof param["gravity"] === 'undefined'){
                g=this.defaultGravity;
            }
            else{
                g=param["gravity"];
            };
            this.speedY+=g;
        };

        this.x+=this.speedX;
        this.y+=this.speedY;
        this.rect.set(this.x,this.y);
        //

    };
    this.draw=function  (ctx) {
        this.rect.draw(ctx);
    };
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
    	//ctx.fillRect(this.x,this.y,this.w,this.h);
    	if (this.w>=20) {ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
		ctx.strokeRect(this.x,this.y,this.w,this.h);
    };

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
/*
    this.addFromMap=function  () {
        //console.log("add from map");
        //TRY CATCH resets stage when no more objects in current map
        //try{
            //REPEATING
            if (this.repeated==this.stageData["objects"][this.timeStep][0][0]) {
                this.timeStep+=1;
                this.repeated=0;
            };
            for (var i = this.stageData["objects"][this.timeStep].length - 1; i >= 1; i--) {
                var y=this.stageData["objects"][this.timeStep][i][2];
                var speed=this.stageData["objects"][this.timeStep][i][3];
                //ADD ENEMIES
                if ( this.stageData["objects"][this.timeStep][i][0]==0) {
                    this.gameObjects["enemies"].push(new Enemy(-this.enemySize,y,this.enemySize,speed));
                }
                //ADD CHICKEN
                else if (this.stageData["objects"][this.timeStep][i][0]==1) {
                    this.gameObjects["boosts"].push(new Boost(-this.enemySize+this.stageData["objects"][this.timeStep][i][0],y,this.enemySize,speed,this.boostAdd));
                };
            };
            this.repeated+=1;
        //}
        //catch(e){
        //  console.log(e);
            //this.stageEnded()
        //};

    }*/