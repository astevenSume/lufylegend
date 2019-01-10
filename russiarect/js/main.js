var loadinglayer,backLayer,graphicsMap,nextlayer;
var imglist={};
var imgData=new Array(
		{name:"backImage",path:"./images/backImage.png"},
		{name:"r1",path:"./images/r1.png"},
		{name:"r2",path:"./images/r2.png"},
		{name:"r3",path:"./images/r3.png"},
		{name:"r4",path:"./images/r4.png"},
	);

var Box;
var nextBox;
//当前方块的位置
var pointBox={x:0,y:0};
var map;
var nodeList;
var bitmapdataList;
var START_X1=15,START_Y1=20,START_X2=228,START_Y2=65;
//方块下落速度相关
var speed=2,speedMax=13,speedText,speedIndex = 0;

var myKey={
	keyControl:null,
	step:1,
	stepindex:0,
	isTouchDown:false,
	touchX:0,
	touchY:0,
	touchMove:false
};


function main(){
	map=[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],	
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],	
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]	
	];

	backLayer=new LSprite();
	backLayer.graphics.drawRect(1,'#000000',[0,0,320,480],true,"#000000");
	addChild(backLayer);

	loadinglayer=new LoadingSample1();
	backLayer.addChild(loadinglayer);

	LLoadManage.load(
			imgData,
			function(progress){
				loadinglayer.setProgress(progress);
			},
			gameInit	
		);
}
function gameInit(result){
	imglist=result;
	backLayer.removeChild(loadinglayer);
	loadinglayer=null;

	var title=new LTextField();
	title.x=50;
	title.y=100;
	title.size=30;
	title.color='#ffffff';
	backLayer.addChild(title);
	title.text='~盒子游戏来了~';

	backLayer.graphics.drawRect(1,"#ffffff",[50,240,220,40]);
	var txtClick=new LTextField();
	txtClick.size=18;
	txtClick.color='#ffffff';
	txtClick.text="点击页面开始游戏";
	txtClick.x=(LGlobal.width-txtClick.getWidth())/2;
	txtClick.y=250;
	backLayer.addChild(txtClick);
	gameToStart();

	// txtClick.addEventListener(LMouseEvent.MOUSE_UP,gameToStart);

}
function gameToStart(){
	backLayer.die();
	backLayer.removeAllChild();
	var bitmap=new LBitmap(new LBitmapData(imglist["backImage"]));
	backLayer.addChild(bitmap);

	nextlayer=new LSprite();
	backLayer.addChild(nextlayer);
	graphicsMap=new LSprite();
	backLayer.addChild(graphicsMap);

	bitmapdataList=[
		new LBitmapData(imglist["r1"]),
		new LBitmapData(imglist["r2"]),
		new LBitmapData(imglist["r3"]),
		new LBitmapData(imglist["r4"]),
	];

	nodeList=[];
	var i,j,nArr,bitmap;
	for(i=0;i<map.length;i++){
		nArr=[];
		for(j=0;j<map[0].length;j++){
			bitmap=new LBitmap(bitmapdataList[0]);
			bitmap.x=bitmap.getWidth()*j+START_X1;
			bitmap.y=bitmap.getHeight()*i+START_Y1;
			graphicsMap.addChild(bitmap);

			nArr[j]={
				"index":-1,
				"value":0,
				"bitmap":bitmap
			};
			nodeList[i]=nArr;
		}
	}
	Box=new Box();
	getNewBox();	
	plusBox();

	drawMap();

	backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);

		//添加鼠标按下，鼠标弹起和鼠标移动事件
	// backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,touchDown);
	// backLayer.addEventListener(LMouseEvent.MOUSE_UP,touchUp);
	// backLayer.addEventListener(LMouseEvent.MOUSE_MOVE,touchMove);
	if(!LGlobal.canTouch){
		//PC的时候，添加键盘事件 【上 下 左 右】
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
	}
	console.log(LGlobal.canTouch);
	if(!LGlobal.canTouch){
		// LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN, onkeydown);
		// LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP, onkeyup)
		// LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP, onkeyup);
	}

	
}
function changeBox(){
	var saveBox=nowBox;
	nowBox=[
			   [0,0,0,0],
			   [0,0,0,0],
			   [0,0,0,0],
			   [0,0,0,0]
	];
	var i,j;
	for(i=0;i<saveBox.length;i++){
		for(j=0;j<saveBox[0].length;j++){
		    nowBox[i][j]=saveBox[(3-j)][i];
		}
	}
	
	if (!checkPlus(0,0)) {
		nowBox=saveBox;		
	}

}
function onkeydown(event){
	if (myKey.keyControl != null) return;
	if(event.keyCode==37){
		myKey.keyControl="left";
	} else if (event.keyCode==38){
		myKey.keyControl="up";
	} else if (event.keyCode==39){
		myKey.keyControl="right";
	} else if (event.keyCode==39){
		myKey.keyControl="down";
	}
}
//键盘弹起事件
function onkeyup(event){
	console.log(111123);
	myKey.keyControl = null;
	myKey.stepindex = 0;
}
// function onkeyup(event){
// 	console.log(11111111);
// 	myKey.keyControl=null;
// 	myKey.stepindex=0;
// }

function onframe(){	
	minusBox();
	// console.log(myKey.keyControl);
	if (myKey.keyControl!=null && myKey.stepindex-- <0){
		myKey.stepindex=myKey.step;
		switch(myKey.keyControl){
			case "left":
				if (checkPlus(-1,0)){
					pointBox.x -= 1;
					if(true){
						myKey.keyControl = null;
						myKey.touchMove = true;
						myKey.touchX = 0;
					}
				}
				break;
			case "right":
				if (checkPlus(1,0)){
					pointBox.x += 1;
					if( true){
						myKey.keyControl = null;
						myKey.touchMove = true;
						myKey.touchX = 0;
					}
				}
				break;
			case "down":
				if (checkPlus(0,1)){
					pointBox.y += 1;
					if(true){
						myKey.keyControl = null;
						myKey.touchMove = true;
						myKey.touchY = 0;
					}
				}
				break;
			case "up":
				changeBox();
				if(true){
					myKey.keyControl = null;
					myKey.stepindex = 0;
				}
				break;
		}
	}

	countnow++;	
	if (speedIndex++> speed) {
	 	speedIndex=0;
	 	if (checkPlus(0,1)) {
	 		pointBox.y++;
	 	} else {
	 		plusBox();
	 		if(pointBox.y<0){
				gameOver();
				return false;
			}
			removeBox();
			getNewBox();
		}
	}
	plusBox();
	drawMap();
}
function gameOver(){
	backLayer.die();
	var txt=new LTextField();
	txt.color="#ff0000";
	txt.size=40;
	txt.text="游戏结束"
	txt.x=(LGlobal.width-txt.getWidth())/2;
	txt.y=200;
	backLayer.addChild(txt);
}
function drawMap(){
	var i,j,box1=15;
	for(i=0;i<map.length;i++){
		for(j=0;j<map[0].length;j++){
			if(nodeList[i][j]["index"]>=0){
				nodeList[i][j]["bitmap"].bitmapData=bitmapdataList[nodeList[i][j]["index"]];
			} else {
				nodeList[i][j]["bitmap"].bitmapData=null;
			}
		}
	}
}
//
//ny传1 ，就是检测到一行是否有方块或
function checkPlus(nx,ny){
	if (pointBox.y<0) {
		if(pointBox.x + nx < 0 || pointBox.x + nx > map[0].length - 4){
			return false;
		}
	}
	// if (pointBox.y)
	var i,j;
	for(i=0;i<nowBox.length;i++){
		for(j=0;j<nowBox[0].length;j++){
			// console.log(i+pointBox.y+ny);	
			// console.log(map.length);
			if(i+pointBox.y<0){				
				continue;
			} else if(i+pointBox.y+ny>=map.length || j+pointBox.x+nx<0 || j+pointBox.x+nx>=map[0].length){
				if (nowBox[i][j]==0){
					continue;
				}else {				
					return false;
				}
			}
			//在操作区域内下一行是否有方块
			if (nowBox[i][j]>0 && map[i+pointBox.y+ny][j+pointBox.x+nx]>0){
				return false;
			}		

		}
		
	}
	return true;
}

var countnow=0;
//移除方块
function minusBox(){
	var i,j;
	for(i=0;i<nowBox.length;i++){
		for(j=0;j<nowBox[i].length;j++){
			if(i+pointBox.y < 0 || i+pointBox.y >= map.length || j+pointBox.x < 0 || j+pointBox.x >= map[0].length){
				continue;
			}
			map[i+pointBox.y][j+pointBox.x]=map[i+pointBox.y][j+pointBox.x]-nowBox[i][j];
			nodeList[i+pointBox.y][j+pointBox.x]["index"] = map[i+pointBox.y][j+pointBox.x] - 1;
		}
	}
}
//添加方块
function plusBox(){
	var i,j;
	for(i=0;i<nowBox.length;i++){
		for(j=0;j<nowBox[i].length;j++){
			if(i+pointBox.y < 0 || i+pointBox.y >= map.length || j+pointBox.x < 0 || j+pointBox.x >= map[0].length){
				continue;
			}
			map[i+pointBox.y][j+pointBox.x]=nowBox[i][j]+map[i+pointBox.y][j+pointBox.x];
			nodeList[i+pointBox.y][j+pointBox.x]["index"] = map[i+pointBox.y][j+pointBox.x] - 1;
		}			
	}
}

function getNewBox(){
	if (nextBox==null) {
		nextBox=Box.getBox();
	}
	nowBox=nextBox;
	pointBox.x=3;
	pointBox.y=-4;
	nextBox=Box.getBox();

	nextlayer.removeAllChild();
	var i,j,bitmap;
	for(i=0;i<nextBox.length;i++) {	
		for(j=0;j<nextBox[0].length;j++){
			if(nextBox[i][j]==0){
				continue;
			}
			// console.log(nextBox[i][j]);			
			bitmap=new LBitmap(bitmapdataList[nextBox[i][j]-1]);			
			bitmap.x=bitmap.getWidth()*j+START_X2;
			bitmap.y=bitmap.getHeight()*i+START_Y2;

			nextlayer.addChild(bitmap);
		}
	}

}
function moveLine(line){
	var i;
	for (i=line;i>1;i--){
		for(j=0;j<map[0].length;j++){
			map[i][j]=map[i-1][j];
			nodeList[i][j].index=nodeList[i-1][j].index;
		}		
	}
	// for(j=0;j<map[0].length;j++){
	// 		map[0][j]=0;
	// 		nodeList[i][j].index=-1;
	// }
}
function removeBox(){
	var i,j,count=0;
	for(i=pointBox.y;i<(pointBox.y+4);i++){
		if (i<0 || i>=map.length) continue;
		for(j=0;j<map[0].length;j++){
			if(map[i][j]==0){
				break;
			}
			if(j==map[0].length-1){
				moveLine(i);
				count++;
			}
		}
	}
}

