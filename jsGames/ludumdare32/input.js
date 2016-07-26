function Input () {
	this.keyDownBindings={};
	this.keyUpBindings={};
	this.keyDownParams={};
	this.keyUpParams={};
	this.keyDownIds={};
	this.keyUpIds={};
	this.bindKeyTo=function  (key,type,id,func,param1,param2) {
		if (type=="keydown") {
			this.keyDownIds[key]=id;
			this.keyDownBindings[key]=func;
			this.keyDownParams[key]=[param1,param2];
		}
		else if (type=="keyup") {
			this.keyUpIds[key]=id;
			this.keyUpBindings[key]=func;
			this.keyUpParams[key]=[param1,param2];
		};
	};
	this.registerInput=function  (inputObj) {
		var which=inputObj.which;
		if (inputObj.type=='keydown') {
			var obj = this.keyDownIds[which];
			var func = this.keyDownBindings[which]
		//this.keyDownBindings[which](this.keyDownParams[which][0],this.keyDownParams[which][1]);
		//obj.func(this.keyDownParams[which][0],this.keyDownParams[which][1]);
		//console.log(this.keyDownParams[which][0],this.keyDownParams[which][1]);
			/*switch(func){
				case'changeStat':
				obj.changeStat(this.keyDownParams[which][0],this.keyDownParams[which][1]) 
				break;
				case'addSushi':
				obj.addSushi(this.keyDownParams[which][0]) 
				break;
			};*/
			obj[func](this.keyDownParams[which][0]);
		}
		else if (inputObj.type=='keyup') {
			var obj = this.keyUpIds[which];
			var func = this.keyUpBindings[which]
		//this.keyDownBindings[which](this.keyDownParams[which][0],this.keyDownParams[which][1]);
		//obj.func(this.keyDownParams[which][0],this.keyDownParams[which][1]);
		//console.log(this.keyDownParams[which][0],this.keyDownParams[which][1]);
			/*switch(func){
				case'changeStat':
				obj.changeStat(this.keyDownParams[which][0],this.keyDownParams[which][1]) 
				break;
				case'addSushi':
				obj.addSushi(this.keyDownParams[which][0]) 
				break;
			};*/
			obj[func](this.keyUpParams[which][0]);
		};
	};
};