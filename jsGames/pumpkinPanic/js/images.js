//var images=[];
images={};
var numImages=0;
var numImagesToLoad=0;
function imageName (src) {
    var type=src.substring(src.length-3,src.length);
    var i  = src.lastIndexOf('/');
    var ii = src.indexOf('.'+type);
    return src.slice(i+1,ii);
};
function preloadImages(imageSources) {
	//var len=arguments.length;
	numImages=imageSources.length;
	numImagesToLoad=imageSources.length;
    for (i = 0; i < imageSources.length; i++) {
    	console.log(imageName(imageSources[i]))
        images[imageName(imageSources[i])] = new Image();
        images[imageName(imageSources[i])].src = imageSources[i];
        images[imageName(imageSources[i])].onload=function  () {
        	//numImagesToLoad-=1;
        	//console.log("image loaded,"+numImagesToLoad+" more left");
        	imageLoaded();
        };
    }
};
function imageLoaded (argument) {
	// body...
	numImagesToLoad-=1;
	console.log("image loaded,"+numImagesToLoad+" more left");
	if (numImagesToLoad==0) {
		//master.init("main_menu","");
		assetsLoaded("IMAGES");
	};
};