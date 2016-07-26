function AnimatedImage (imgSource,frames,frameRate,displaceX,displaceY,speedX,speedY) {
	//CREATE IMAGE OBJECT WITH SOURCE
	this.img=new Image();
	this.img.src=imgSource;
	//END
	this.frames=frames;
	this.currentFrame=0;
	this.frameRate=frameRate;
	//CHANGE FRAME WHEN frameRateCounter = 0
	this.frameChangeCounter=frameRate;
	this.widthPerFrame=this.img.width/this.frames;
	//DISPLACEMENT
	this.displaceX=displaceX;
	this.displaceY=displaceY;
	this.speedX=speedX;
	this.speedY=speedY;
	this.draw=function  (ctx,x,y) {
		this.widthPerFrame=this.img.width/this.frames;
		this.frameChangeCounter+=1;
        if (this.frameChangeCounter>=this.frameRate) {
            this.frameChangeCounter=0;
            this.currentFrame+=1;
            if (this.currentFrame>=this.frames) {this.currentFrame=0};
        };
        //displacement of original image
        var imgx=this.currentFrame * this.widthPerFrame;
        var imgy=0;
        //width and height cut off from original image
        var imgw=this.widthPerFrame;
        var imgh=this.img.height;
        //console.log(this.img,imgx,imgy,imgw,imgh,x-10,y-10,imgw*1.3,imgh*1.3)
        ctx.drawImage(this.img,imgx,imgy,imgw,imgh,x-10,y-10,imgw*1.3,imgh*1.3);
    };
};

//Scrolls images in given directio. {"left","right","up","down"}
function ScrollingBG (imageSrcList,scrollDirection,scrollSpeed,windowWidth) {
	this.imageList=[];
	var xOffset=0;
	for (var i = imageSrcList.length - 1; i >= 0; i--) {
		//SETUP INITIAL IMAGES
		if (scrollDirection=="left") {
			this.imageList.push(new SingleImage(imageSrcList[i],xOffset,61));
			xOffset+=windowWidth;
		};
		if (scrollDirection=="right") {
			this.imageList.push(new SingleImage(imageSrcList[i],xOffset,61));
			xOffset-=windowWidth;
		};
	};
	this.scrollDirection=scrollDirection;
	this.scrollSpeed=scrollSpeed;
	this.windowWidth=windowWidth;
	this.update=function  () {
		//UPDATE ALL IMAGES
		for (var i = this.imageList.length - 1; i >= 0; i--) {
			if (this.scrollDirection=="left") {
				this.imageList[i].x-=this.scrollSpeed;
				//Change Position when out of screen
				if (this.imageList[i].x<-this.windowWidth) {
					this.imageList[i].x=this.windowWidth;
				};
			};
			if (this.scrollDirection=="right") {
				this.imageList[i].x+=this.scrollSpeed;
				//Change Position when out of screen
				if (this.imageList[i].x>this.windowWidth) {
					this.imageList[i].x=-this.windowWidth;
				};
			};
			this.imageList[i].update();
		};
	};
	this.draw=function  (ctx) {
		//DRAW ALL IMAGES
		for (var i = this.imageList.length - 1; i >= 0; i--) {
			this.imageList[i].draw(ctx);
		};
	};
};
//***********INCOMPLETE***************
function MultilayerScrollingBG (imageSrcListList,scrollDirection,scrollSpeedList,windowWidth) {
	this.imageList=[];
	var xOffset=0;
	for (var i = imageSrcList.length - 1; i >= 0; i--) {
		//SETUP INITIAL IMAGES
		if (scrollDirection=="left") {
			this.imageList.push(new SingleImage(imageSrcList[i],xOffset,0));
			xOffset+=windowWidth;
		};
	};
	this.scrollDirection=scrollDirection;
	this.scrollSpeed=scrollSpeed;
	this.windowWidth=windowWidth;
	this.update=function  () {
		//UPDATE ALL IMAGES
		for (var i = this.imageList.length - 1; i >= 0; i--) {
			if (this.scrollDirection=="left") {
				this.imageList[i].x-=this.scrollSpeed;
				//Change Position when out of screen
				if (this.imageList[i].x<-this.windowWidth) {
					this.imageList[i].x=this.windowWidth;
				};
			};
			this.imageList[i].update();
		};
	};
	this.draw=function  (ctx) {
		//DRAW ALL IMAGES
		for (var i = this.imageList.length - 1; i >= 0; i--) {
			this.imageList[i].draw(ctx);
		};
	};
};
//
function SingleImage (src,x,y) {
	this.img=new Image();
	this.img.src=src;
	this.x=x;
	this.y=y;
	this.update=function  () {

	};
	this.draw=function  (ctx) {
		ctx.drawImage(this.img,this.x,this.y);
	};
};
//END
function BackgroundVisualObject (imgSource,animatedImages) {
	//CREATE IMAGE OBJECT WITH SOURCE
	this.img=new Image();
	this.img.src=imgSource;
	//END
	this.animatedImages=animatedImages;
	this.update=function  () {
		//UPDATE ALL ANIMATIONS
		for (var i = this.animatedImages.length - 1; i >= 0; i--) {
			this.animatedImages[i].update();
		};
	};
	this.draw=function  (ctx) {
		//DRAW BG IMAGE
		ctx.drawImage(this.img,0,0);
		//DRAW ALL ANIMATIONS
		for (var i = this.animatedImages.length - 1; i >= 0; i--) {
			this.animatedImages[i].draw(ctx);
		};
	};
};
function RectClearTransition (width,height) {
	this.rectSize=0;
	this.windowW=width;
	this.windowH=height;
	this.growBy=44;
	this.stopWhen=height;
	if (width>height) {this.stopWhen=width};
	this.update=function  () {
	};
	this.draw=function  (ctx) {
		if (this.rectSize>0) {
			ctx.fillStyle="black";
			ctx.fillRect(0,0,this.windowW,this.windowH);
			ctx.clearRect((this.windowW/2)-this.rectSize/2, (this.windowH/2)-this.rectSize/2,this.rectSize,this.rectSize);
			this.rectSize+=this.growBy;
			if (this.rectSize>this.stopWhen+this.growBy) {this.rectSize=0};
		};
	};
	this.activate=function  () {
		this.rectSize+=1;
	};
	this.stall=function  () {
		return false
	};
};
function FadeTransition (width,height,fadeoutSpeed,fadeinSpeed) {
	this.width=width;
	this.height=height;
	this.speed1=fadeoutSpeed;
	this.speed2=fadeinSpeed;

	this.alpha=0;
	this.state="inactive";

	this.switchScreen=0;
	this.active=0;
	this.update=function  () {
	};
	this.draw=function  (ctx) {

		var originalStyle=ctx.fillStyle;
		ctx.fillStyle="black";
		if (this.state=="fadeout") {
			ctx.globalAlpha=this.alpha;
    		this.alpha+=this.speed1;
    		if (this.alpha>=1) {
    			this.state="fadein";
    			this.switchScreen=1;
    		};
		};
		if (this.state=="fadein") {
			ctx.globalAlpha=this.alpha;
    		this.alpha-=this.speed2;
    		if (this.alpha<=0) {
    			this.state="inactive";
    			this.alpha=0;
    			this.switchScreen=0;
    		};
		};

		ctx.fillRect(0,0,this.width,this.height);
    	ctx.globalAlpha=0;
    	ctx.fillStyle=originalStyle;
	};
	this.activateNoChangeScreen=function  () {
		this.active=1;
		this.state="fadeout";
	};
	this.stall=function  () {
		if (this.state=="fadeout") {return true};
		return false
	};
	this.activate=function  () {
		this.active=0;
		this.state="fadeout";
		this.switchScreen=1;
	};
};