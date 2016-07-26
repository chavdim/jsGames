var images=[];
function preloadImages() {
	var len=arguments.length;
    for (i = 0; i < len; i++) {
        images[i] = new Image();
        images[i].src = preloadImages.arguments[i];
        images[i].onLoad=function  () {
        	len-=1;
        	console.log("image loaded,"+len+" more left");
        };
    }
};