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
	/*
	game.mouse=mouse;
	game.mouseX=mouse.pageX;
	game.mouseY=mouse.pageY;
	clicked=1;
	if (game.started==1) {
		game.jump();
	}
	else{
		if (game.onMenu!=1) {
		game.started=1;
		};
		if (game.onMenu==1) {
		
		};
	};
	
		if(mouse.touches.length == 1){ // Only deal with one finger
		    var touch = e.touches[0]; // Get the information for finger #1
		    var node = touch.target; // Find the node the drag started from
		    node.style.position = "absolute";
		    node.style.left = touch.pageX + "px";
		    node.style.top = touch.pageY + "px";
		    game.mouseX=touch.pageX;
		    game.mouseY=touch.pageY;
		};*/
};
var inputHandler={
	init:function  () {
		document.getElementById('gamebody').addEventListener('keypress',onKey,true);
		document.getElementById('gamebody').addEventListener('click',onClickOrTouch,true);
		document.getElementById('gamebody').addEventListener('touchstart',onClickOrTouch,true )
		inputHandler.mouseInputObj="NONE";
		inputHandler.processed=1;
	},
	getMouseInput:function  () {
		return([inputHandler.mouseInputObj,inputHandler.processed]);
	},
}