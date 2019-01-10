function mains(){

	if(!LGlobal.cantouch){
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
	}
	
	// console.log("aa");
}
function onkeyup(event){

	console.log("ddd");
}