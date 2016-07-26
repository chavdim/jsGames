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
	//CHANGE TIME
	this.changeTime=0;
	this.imageOriginal=0;
	this.draw=function  (ctx,x,y) {
		//
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
    this.resetChange=function  () {
    	// body...
    	this.changeTime=0;
    	this.img=new Image();
		this.img.src=this.imageOriginal;
    };
    this.changeForAWhile2=function  (src,t,frames,frameRate) {

    	
    	if (this.changeTime!=0) {return};
    	this.imageOriginal=this.img.src;
    	this.changeTime=t;
    	this.img=new Image();
		this.img.src=src;

		this.frames=frames;
		this.currentFrame=0;
		this.frameRate=frameRate;
		//CHANGE FRAME WHEN frameRateCounter = 0
		this.frameChangeCounter=frameRate;
		this.widthPerFrame=this.img.width/this.frames;
    };
    this.changeImage=function  (src) {
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
function BackgroundVisualObject (imgSource,animatedImages,ydisp) {
	//CREATE IMAGE OBJECT WITH SOURCE
	this.img=new Image();
	this.img.src=imgSource;
	//END
	this.animatedImages=animatedImages;
	this.ydisp=ydisp;
	//CHANGE TIME
	this.changeTime=0;
	this.imageOriginal=0;
	this.update=function  () {
		//UPDATE ALL ANIMATIONS
		for (var i = this.animatedImages.length - 1; i >= 0; i--) {
			this.animatedImages[i].update();
		};
		//CHANGE TIME
        if (this.changeTime>0) {
        	this.changeTime-=1;
        	if (this.changeTime==0) {
        		this.img=new Image();
				this.img.src=this.imageOriginal;
        	};
        };
	};
	this.draw=function  (ctx) {
		//DRAW BG IMAGE
		ctx.drawImage(this.img,0,0+this.ydisp);
		//DRAW ALL ANIMATIONS
		for (var i = this.animatedImages.length - 1; i >= 0; i--) {
			this.animatedImages[i].draw(ctx);
		};
	};
	this.changeForAWhile=function  (src,t) {

    	if (this.changeTime!=0) {return};
    	this.imageOriginal=this.img.src;
    	this.changeTime=t;
    	this.img=new Image();
		this.img.src=src;
    };
    this.changeImage=function  (src) {
    	this.img=new Image();
		this.img.src=src;
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
};