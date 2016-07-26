$(window).load(function () {
	inputHandler.init();
});
onKey=function  (key) {
	//DEBUG LOG
	console.log("key pressed")
	//END
};
onClickOrTouch=function  (mouse) {
	inputHandler.mouseInputObj=mouse;
	inputHandler.processed=0;
	inputHandler.active=1;
	/*
	
		if(mouse.touches.length == 1){ // Only deal with one finger
		    var touch = e.touches[0]; // Get the information for finger #1
		    var node = touch.target; // Find the node the drag started from
		    node.style.position = "absolute";
		    node.style.left = touch.pageX + "px";
		    node.style.top = touch.pageY + "px";
		    game.mouseX=touch.pageX;
		    game.mouseY=touch.pageY;
		};
	*/
};
onMouseDown=function  (mouse) {
	inputHandler.mouseInputObj=mouse;
	inputHandler.processed=0;
	inputHandler.active=1;

	mouse.preventDefault();
	
};
onMouseUp=function  (mouse) {
    //var x=inputHandler.mouseInputObj.pageX;
    //var y=inputHandler.mouseInputObj.pageY;

	inputHandler.mouseInputObj=mouse;
	inputHandler.processed=0;
	inputHandler.active=0;
    
    //CUSTOM
    //master.game.lastX=mouse.pageX;
   // var touch = mouse.targetTouches[0];
    // Place element where the finger is
    //inputHandler.mouseInputObj.pageX = touch.pageX;
   //inputHandler.mouseInputObj.pageY = touch.pageY;
    
    
    
};
onMouseMove=function  (mouse) {
	inputHandler.mouseInputObj=mouse;
	//CUSTOM
	if (master.game) {
   		master.game.lastX=mouse.pageX-$('#gamecanvas').offset().left;
    };
	//inputHandler.processed=0;
	//inputHandler.active=0;
};
var inputHandler={
	init:function  () {
		document.getElementById('gamebody').addEventListener('keypress',onKey,true);
		document.getElementById('gamebody').addEventListener('click',onClickOrTouch,true);
		document.getElementById('gamebody').addEventListener('mousedown',onMouseDown,true);
		document.getElementById('gamebody').addEventListener('mouseup',onMouseUp,true);
		document.getElementById('gamebody').addEventListener('mousemove',onMouseMove,true);
        document.getElementById('gamebody').addEventListener('touchmove',onMouseMove,true);
		document.getElementById('gamebody').addEventListener('touchstart',onMouseDown,true )
		document.getElementById('gamebody').addEventListener('touchend',onMouseUp,true )
        
		inputHandler.mouseInputObj="NONE";
		inputHandler.processed=1;
		inputHandler.active=0;
	},
	getMouseInput:function  () {
		return([inputHandler.mouseInputObj,inputHandler.processed,inputHandler.active]);
	},
}