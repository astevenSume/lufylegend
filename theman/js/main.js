var loadingLayer,backLayer,graphiscMap,nextLayer,stageLayer,background;
var imglist={};
var stageSpeed=0,STAGE_STEP=1,MOVE_STEP=2;
var imgData=new Array(
		{name:"back",path:"./images/back.png"},		
		{name:"hero",path:"./images/hero.png"},
		{name:"wheel",path:"./images/wheel.png"},
		{name:"floor0",path:"./images/floor0.png"},
		{name:"floor1",path:"./images/floor1.png"},
		{name:"floor2",path:"./images/floor2.png"},
		{name:"floor3",path:"./images/floor3.png"},
		// {name:""}
	);
var hero=null;
var g=0.08;
//按比例缩放后的Global并不是计算时需要用到的global了,因为实际宽度还要以320为基础
// console.log(333);
function main(){
	backLayer=new LSprite();
	backLayer.graphics.drawRect(1,"#000000",[0,0,320,480],true,"#000000");

	addChild(backLayer);
	loadingLayer=new LoadingSample2(50);
	backLayer.addChild(loadingLayer);

	LLoadManage.load(
			imgData,
			function(progress) {
				loadingLayer.setProgress(progress);
			},
			gameInit
		);
}
function gameInit(result){
	imglist=result;
	backLayer.removeChild(loadingLayer);
	loadingLayer=null;

	gameStart();
}
function gameStart(){	
	backLayer.die();
	backLayer.removeAllChild();

	background = new Background();
	backLayer.addChild(background);

	wallInit();

	hero=new Chara();
	hero.x=140;
	hero.y=100;
	hero.hp=hero.maxHp;
	backLayer.addChild(hero);

	stageInit();
	backLayer.addEventListener(LEvent.ENTER_FRAME, onbackframe);
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,mouseup);

	if (!LGlobal.canTouch) {
		LEvent.addEventListener(window, LKeyboardEvent.KEY_DOWN, down);
		LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, up);
	}

}
function wallInit(){
	var bitmapdata=new LBitmapData(imglist['floor3']) 
	var wallbitmap = new LBitmap(bitmapdata);
	wallbitmap.rotate=180;
	background.addChild(wallbitmap);
	bitmapup1=new LBitmap(bitmapdata);
	bitmapup1.rotate=180;
	bitmapup1.x=90;
	background.addChild(bitmapup1);
	bitmapup2=new LBitmap(bitmapdata);
	bitmapup2.rotate=180;
	bitmapup2.x=90*2;
	background.addChild(bitmapup2);
	bitmapup3=new LBitmap(bitmapdata);	
	bitmapup3.rotate=180;
	bitmapup3.x=90*3;
	background.addChild(bitmapup3);

}
function up(event) {
	if (!hero)return;
	hero.moveType=null;
	hero.changeAction();
	// hero.isJump=false;
}
function down(event){
	if (hero.moveType) return;
	if (event.keyCode==37) {
		hero.moveType="left";
	} else if (event.keyCode==39) {
		hero.moveType="right";
	}
	hero.changeAction();
}
function mousedown(event){
	if (event.offsetX <= realGlobal.width*0.5) {
		down({keyCode:37});
	} else {
		down({keyCode:39});
	}
}
function mouseup(event){	
	hero.moveType=null;
	hero.changeAction();
}

function onbackframe(){
	background.run();
	if (stageSpeed-- < 0){
		stageSpeed=100;
		addStage();
	}
	var found=false;
	hero.isJump=true;
	for(var i=0;i<stageLayer.childList.length;i++){	
		var _child=stageLayer.childList[i];
		if (_child.y < -_child.getHeight()) {
			stageLayer.removeChild(_child);
		}
		// console.log(_child.hy);
		if (!found && 
			 hero.x+30 >= _child.x && hero.x <= _child.x + 90 && 
			 hero.y+50 >= _child.y+_child.hy && hero._charaOld+50 <= _child.y+_child.hy+1) {
			hero.isJump=false;
			hero.changeAction();
			_child.child=hero;
			hero.speed=0;  //为0时停在板上
			hero.y=_child.y-49+_child.hy;
			_child.hitRun();

			// console.log(i + " --- " + found);
			found=true;
		} else {
			_child.child=null;
		}
		_child.onframe();
	}
	if (hero.isJump) hero.anime.setAction(1,0);
		
	if (hero) {
		hero.onheroframe();
		if (hero.hp <=0) {
			backLayer.removeChild(hero);
			hero=null;
			gameOver();
		}
	}
}
function gameOver(){
	backLayer.die();
	var overLayer=new LSprite();
	backLayer.addChild(overLayer);
	overLayer.graphics.drawRect(4,'#ff8800',[0,0,200,100],true,'#ffffff');
	overLayer.x=(realGlobal.width-overLayer.getWidth())*0.5;
	overLayer.y=(realGlobal.height-overLayer.getHeight())*0.5;
	var txt;
	txt=new LTextField();
	txt.text="成绩: " + 4;
	txt.x=20;
	txt.y=20;
	overLayer.addChild(txt);
	txt=new LTextField();
	txt.text="----over----";
	txt.x=20;
	txt.y=50;
	overLayer.addChild(txt);
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(event){
		gameStart(true);
	})


}

function stageInit(){
	stageLayer=new LSprite();
	backLayer.addChild(stageLayer);
	layers=0;
	var mstage=new Floor01();
	mstage.x=110;
	mstage.y=300;
	stageLayer.addChild(mstage);
}
function addStage(){
	var mstage;
	var index=Math.random()*6;
	console.log(index);
	if(index < 1){
		mstage = new Floor01();
	}else if(index < 2){
		mstage = new Floor02();
	}else if(index < 3){
		mstage = new Floor03();
	}else if(index < 4){
		mstage = new Floor04();
	}else if(index < 5){
		mstage = new Floor05();
	}else if(index < 6){
		mstage = new Floor06();
	}



	mstage.y=380;
	mstage.x=Math.random()*280;
	stageLayer.addChild(mstage);
}




