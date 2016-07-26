function AnimatedImage2 (img,frames,frameRate,scale) {
	//CREATE IMAGE OBJECT WITH SOURCE
	this.img=img;
	//END
	this.frames=frames;
	this.currentFrame=0;
	this.frameRate=frameRate;
	//CHANGE FRAME WHEN frameRateCounter = 0
	this.frameChangeCounter=frameRate;
	this.widthPerFrame=this.img.width/this.frames;
	//DISPLACEMENT
	this.scale=scale;
	//CHANGE TIME
	this.changeTime=0;
	this.imageOriginal=0;
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
        ctx.drawImage(this.img,imgx,imgy,imgw,imgh,x,y,imgw*this.scale,imgh*this.scale);
        //CHANGE TIME
        if (this.changeTime>0) {
        	this.changeTime-=1;
        	if (this.changeTime==0) {
        		this.img=new Image();
				this.img.src=this.imageOriginal;
        	};
        };
    };
    //TESTING
    this.drawDegrees=function  (ctx,x,y,degrees) {
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
        //CUSTOM
        
        drawRotated(master.canvas,ctx,this.img,x,y,degrees);
        //ctx.drawImage(this.img,imgx,imgy,imgw,imgh,x,y,imgw*this.scale,imgh*this.scale);
        //CHANGE TIME
        if (this.changeTime>0) {
        	this.changeTime-=1;
        	if (this.changeTime==0) {
        		this.img=new Image();
				this.img.src=this.imageOriginal;
        	};
        };
    };
    this.changeForAWhile=function  (src,t) {
    	if (this.changeTime!=0) {return};
    	this.imageOriginal=this.img.src;
    	this.changeTime=t;
    	this.img=new Image();
		this.img.src=src;
    };
};
function AnimatedImage (imgSource,frames,frameRate,scale) {
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
	this.scale=scale;
	//CHANGE TIME
	this.changeTime=0;
	this.imageOriginal=0;
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
        ctx.drawImage(this.img,imgx,imgy,imgw,imgh,x,y,imgw*this.scale,imgh*this.scale);
        //CHANGE TIME
        if (this.changeTime>0) {
        	this.changeTime-=1;
        	if (this.changeTime==0) {
        		this.img=new Image();
				this.img.src=this.imageOriginal;
        	};
        };
    };
    //TESTING
    this.drawDegrees=function  (ctx,x,y,degrees) {
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
        //CUSTOM
        
        drawRotated(master.canvas,ctx,this.img,x,y,degrees);
        //ctx.drawImage(this.img,imgx,imgy,imgw,imgh,x,y,imgw*this.scale,imgh*this.scale);
        //CHANGE TIME
        if (this.changeTime>0) {
        	this.changeTime-=1;
        	if (this.changeTime==0) {
        		this.img=new Image();
				this.img.src=this.imageOriginal;
        	};
        };
    };
    this.changeForAWhile=function  (src,t) {
    	if (this.changeTime!=0) {return};
    	this.imageOriginal=this.img.src;
    	this.changeTime=t;
    	this.img=new Image();
		this.img.src=src;
    };
};

//Scrolls images in given directio. {"left","right","up","down"}
function ScrollingBG (imageSrcList,scrollDirection,scrollSpeed,windowWidth) {
	this.imageList=[];
	var xOffset=0;
	for (var i = imageSrcList.length - 1; i >= 0; i--) {
		//SETUP INITIAL IMAGES
		if (scrollDirection=="left") {
			this.imageList.push(new SingleImage(imageSrcList[i],xOffset,0));
			xOffset+=windowWidth;
		};
		if (scrollDirection=="right") {
			this.imageList.push(new SingleImage(imageSrcList[i],xOffset,0));
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
function BackgroundVisualObjectWithShake (img,animatedImages,x,y,shake) {
	//CREATE IMAGE OBJECT WITH SOURCE
	this.img=img;
	this.x=x;
	this.y=y;
	//END
	this.animatedImages=animatedImages;
	this.shake=shake;
	this.update=function  () {
		//UPDATE ALL ANIMATIONS
		for (var i = this.animatedImages.length - 1; i >= 0; i--) {
			this.animatedImages[i].update();
		};
	};
	this.draw=function  (ctx) {
		if (this.shake<0) {this.shake+=1;this.shake*=-1}
		else if(this.shake>0){this.shake-=1;this.shake*=-1};
		//console.log(this.shake)
		//DRAW BG IMAGE
		ctx.drawImage(this.img,this.x+this.shake,this.y);
		//DRAW ALL ANIMATIONS
		for (var i = this.animatedImages.length - 1; i >= 0; i--) {
			this.animatedImages[i].draw(ctx);
		};
	};
};
function BackgroundVisualObject2 (img,animatedImages,x,y) {
	//CREATE IMAGE OBJECT WITH SOURCE
	this.img=img;
	this.x=x;
	this.y=y;
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
		ctx.drawImage(this.img,this.x,this.y);
		//DRAW ALL ANIMATIONS
		for (var i = this.animatedImages.length - 1; i >= 0; i--) {
			this.animatedImages[i].draw(ctx);
		};
	};
};
function BackgroundVisualObject (imgSource,animatedImages,x,y) {
	//CREATE IMAGE OBJECT WITH SOURCE
	this.img=new Image();
	this.img.src=imgSource;
	this.x=x;
	this.y=y;
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
		ctx.drawImage(this.img,this.x,this.y);
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
	this.active=0;
	this.switchScreen=0;
	this.update=function  () {
	};
	this.draw=function  (ctx) {
		this.switchScreen=1;
		if (this.rectSize>0) {
			ctx.fillStyle="black";
			ctx.fillRect(0,0,this.windowW,this.windowH);
			ctx.clearRect((this.windowW/2)-this.rectSize/2, (this.windowH/2)-this.rectSize/2,this.rectSize,this.rectSize);
			this.rectSize+=this.growBy;
			if (this.rectSize>this.stopWhen+this.growBy) {
				this.rectSize=0;
				this.active=0;
			};
		};
	};
	this.activate=function  () {
		this.rectSize+=1;
		this.active=0;
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
		ctx.fillStyle="white";
		if (this.state=="fadeout") {
			ctx.globalAlpha=this.alpha;
    		ctx.fillRect(0,0,this.width,this.height);
    		this.alpha+=this.speed1;
    		if (this.alpha>=1) {
    			this.state="fadein";
    			this.switchScreen=1;
    		};
		};
		if (this.state=="fadein") {
			ctx.globalAlpha=this.alpha;
    		ctx.fillRect(0,0,this.width,this.height);
    		this.alpha-=this.speed2;
    		if (this.alpha<=0) {
    			this.state="inactive";
    		
    			this.alpha=0;
    			this.switchScreen=0;
    		};
		};
    	
    	ctx.globalAlpha=1;
    	ctx.fillStyle=originalStyle;
	};
	this.activateNoChangeScreen=function  () {
		this.active=1;
		this.state="fadeout";
	};
	this.activate=function  () {
		this.active=0;
		this.state="fadeout";
	};
};