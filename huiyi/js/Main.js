/* 头像出现规则：
	1，随机屏幕一个点，如果这个点为中心的圆内没有其它点，那么出现
	2，如果100次循环找不出点，证明屏幕已经被头像球占满了
   要消除的头像:
   	3, 如果一个头像的圆点在要消除的部位出现，则先给这个头像名字设置为 hipos	,当摇奖大球出现时自动消失
*/
var loadingLayer,appLayer,avatarLayer,luckingLayer,awardLayer,loader,gridLayer,starsLayer,rainLayer;
var star,rain;
var imgData=new Array(
		{name:"back",path:"./images/luck_meeting_bg.jpg"},
		{name:"wone",path:"./images/wone.png"},	
		{name:"wtwo",path:"./images/wtwo.png"},	
		{name:"wthree",path:"./images/wthree.png"},	
		{name:'btn',path:'./images/btn.jpg'}
	);
var tmpData=new Array(); //存储头像，读来一个存一个，把所有数据读进来，并随新数据push进来，显示一个remove一个，直到数组为空，不再加头像
var allData=new Array(); //所有数据，刷新页面时直接把读出来的所有数据放在这里，并随新数据push进来
var imglist={},tmpImglist={},allImglist={};
var addcount=0;
var avag=0.1;
var g=0.08; //开奖旋转加速度
var runindex=0; //头像缓运行速度
var pointArr=[]; //保证两个圆不会重叠
var shineindex=0; //星星闪动频率
var tranindex=0; //头像翻转频率 

var notcount=0; //如果100次都没得到不重叠的点，那么不再添加头像
var allowcreate=1; //是否允许产生头像
var flag=0; //步骤  0 按钮出现  1 触发按钮收集头像 2,按钮上移后开始转头像

var up_distance;
var ro_angle=0,the_angle=0; //旋转角度和，每次转度
var ro_g=1; //旋转加速度

var wone_num=10;
var wtwo_num=10;
var wthree_num=10;


function main(){
		// LGlobal.setDebug(true);		
		LGlobal.align = LStageAlign.TOP_MIDDLE;
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
		LSystem.screen(LStage.FULL_SCREEN);


		appLayer=new LSprite();
		addChild(appLayer);

		loadingLayer=new LoadingSample3();
		appLayer.addChild(loadingLayer);

		LLoadManage.load(
			imgData,
			function(progress) {
				loadingLayer.setProgress(progress);
			},
			actInit
		);
}
var listkey=''; //文件名
function actInit(result){
	imglist=result;	
	appLayer.removeChild(loadingLayer);
	loadingLayer=null;

	var background=new Background();
	appLayer.addChild(background);


	starsLayer=new LSprite();
	appLayer.addChild(starsLayer);
	rainLayer=new LSprite();
	appLayer.addChild(rainLayer);
	avatarLayer=new LSprite();
	appLayer.addChild(avatarLayer);
	luckingLayer=new LSprite();
	appLayer.addChild(luckingLayer);
	awardLayer=new LSprite();
	appLayer.addChild(awardLayer);
	

	gridLayer=new LSprite();
	appLayer.addChild(gridLayer);

	star = new Star();
	starsLayer.addChild(star);
	rain = new MeteorRain();
	rainLayer.addChild(rain);



	//starsLayer.graphics.drawLine('1','#fff',[LGlobal.width/2,0,LGlobal.width/2,LGlobal.height]);
	//gridLayer.graphics.drawLine('1','#fff',[LGlobal.width/2+66,0,LGlobal.width/2+66,LGlobal.height]);
	// gridLayer.graphics.drawLine('1','#fff',[0,LGlobal.height/2,LGlobal.width,LGlobal.height/2]);

	up_distance=LGlobal.height/4;

	//第一个参数一般用文件名listkey
	listkey='fresh';
	// loadImgAgain("http://thirdwx.qlogo.cn/mmopen/vi_32/joXcgmQODQ4OKNzuIhy00mMyP0flFQnIavVHGeW0dX4dKhzhYwzX8RTN5Rf45waQW9axtCsZseuzoPZCQON49A/132");
	loadImgNow("http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoHyocVZRTaRicslTVibANWcr6c63Sr18uibhVkfiakafd7baYQHibnBSnSXORqaFH7fj5qZdXL1yykibxA/132");
	

	actStart();
}

function loadImgNow(imgurl){
	loader = new LLoader();
	loader.addEventListener(LEvent.COMPLETE, loadBitmapdataNow);
	loader.load(imgurl);	
}

function loadBitmapdataNow(event){
	tmpImglist[listkey]=event.target;
	allImglist[listkey]=event.target;
}
var theindex=0;
function actStart(){
	appLayer.addEventListener(LEvent.ENTER_FRAME, actframe);

	LEvent.addEventListener(LGlobal.window, LKeyboardEvent.KEY_DOWN, onkeydown);

}
var luck;
function onkeydown(event){	
	switch(event.keyCode) {
		case 49:
			//1键为开1等奖
			if (!luck) {				
				luck=new Luck('wone');
				flag=1;
			}
			break;
		case 50: 
			//2键为开2等奖
			if (!luck){
				luck=new Luck('wtwo');	
				flag=1;
			}		
			break;
		case 51:
			//3等奖
			if (!luck){
				luck=new Luck('wthree');
				flag=1;
			}
			break;
		case 32:
			//空格执行开奖动作
			if (luck) {		
				if(flag==3){
					flag=4;
				}	
				if(flag==2){
					//开奖
					the_angle=0; 
					flag=3;
				}
				if(flag==1){
					//准备开奖,慢转								
					luck.flyToBtn();
					wbitmapdata=new LBitmapData(imglist[luck.grade]);
					wbigmap=new LBitmap(wbitmapdata);
					awardLayer.addChild(wbigmap);
					awardLayer.x=LGlobal.width- LGlobal.width/8;
					awardLayer.y=30;
				}
				
				
			}
			break;
		case 52:
			var ava= avatarLayer.childList[0];
			// var bitmapdata=new LBitmapData(imglist['fresh']);

			

			// avatarLayer.graphics.drawArc('3','yellow',[ava.x,ava.y,ava.radius,0,6.28]);
			ava.graphics.drawArc('3','red',[0,0,ava.radius,0,6.28]);
			// ava.graphics.drawArc('3','yellow',[196.3,255.01,ava.radius+10,0,6.28]);
			// console.log(avatarLayer.y + ' -- ' + ava.x + '--' + ava.y);
			// ava.rotatex=self.radius;
			// ava.rotatey=self.radius;
			// self.rotate
			//

			var tmpMatrix = new LMatrix();
			tmpMatrix.scale(1,-0.5).translate(0,ava.radius+ava.radius/4);
			ava.transform.matrix=tmpMatrix;
			// ava.y=ava.y+ava.radius-12;  //12是边框厚度的2倍


			setTimeout(function(){


				var tmpMatrix = new LMatrix();
				tmpMatrix.scale(1,1);
				ava.transform.matrix=tmpMatrix;

				// ava.y=ava.y-33*(1-0.1)+12*0.1;

			},1000);
			

			// var j=-1;			
			// if (Math.random()>0.5) {
			// 	j=1;
			// 	var tmpMatrix = new LMatrix();
			// 	tmpMatrix.scale(1,j).translate(0,0);
			// 	ava.transform.matrix=tmpMatrix;
			// } else {
			// 	j=-0.4
			// 	var tmpMatrix = new LMatrix();
			// 	tmpMatrix.scale(1,j).translate(0,ava.radius*2-ava.radius*j/2);
			// 	ava.transform.matrix=tmpMatrix;
			// }
			// console.log(j);

			ava.graphics.drawLine('1','#fff',[avatarLayer.x,avatarLayer.y,avatarLayer.x+ava.radius*2,avatarLayer.y]);
			ava.graphics.drawLine('1','#fff',[avatarLayer.x,avatarLayer.y,avatarLayer.x,avatarLayer.y+ava.radius*2]);
			// for (var i=0;i<2000;i++){
				// if(i==1200) {
				// 	console.log(i);
				// 	tmpMatrix.scale(1,-1).translate(0,ava.radius*2);
				// 	ava.transform.matrix=tmpMatrix;
				// }
				// setTimeout(function(){
				// 	localtion

				// },1000);
			// }
		
			
			// setTimeout(function(){
			// 	tmpMatrix.scale(1,-1).translate(0,ava.radius*2);
			// 	ava.transform.matrix=tmpMatrix;
			// },500);
			
			// tmpMatrix.scale(1,-1).translate(0,ava.radius*2);

			// console.log(avatarLayer.y + ' -- ' + ava.x + '--' + ava.y);
			//ava.graphics.drawArc('10','yellow',[ava.radius,ava.radius,ava.radius+10,0,6.28]);
			// ava.createme(bitmapdata);
			// console.log(ava);
			break;
	}
	

}
function ondown(){
	console.log('ondown');
}
function onclick(){
	console.log('click ok')
}
 //星星闪起来
function playStars(){
	for (var n = 0; n < starCount; n++){  
		starArr[n].getColor();  
		starArr[n].draw();  
	}
}


var num=1;
var scaleindex=0;
function actframe(){
	if (shineindex++ >20){
		shineindex=0;
		star.shine();//绘制闪动的星星	
	}

	rain.runnow();

	
	//头像自己移动
	if (flag<2 && runindex++ > 2){
		runindex=0;
		var k=-1;
		for (k in avatarLayer.childList) {
			if (k>=0) {
				avatarLayer.childList[k].run();
			}
		}
	}
	if (avatarLayer.childList.length>0 && flag==0 && tranindex++>200){
		tranindex=0;	
		
		var tmpx= avatarLayer.childList[0].x;
		var tmpy= avatarLayer.childList[0].y;

		
		var tmpMatrix = new LMatrix();
		tmpMatrix.scale(1,-0.5).translate(0,avatarLayer.childList[0].radius+avatarLayer.childList[0].radius/4);
		avatarLayer.childList[0].transform.matrix=tmpMatrix;

		setTimeout(function(){
			var tmpMatrix = new LMatrix();	
			tmpMatrix.scale(1,1);
			avatarLayer.childList[0].transform.matrix=tmpMatrix;			

			avatarLayer.removeChild(avatarLayer.childList[0]);
			var newavatar=new Avatar(tmpImglist[listkey],'solid',33,tmpx,tmpy);

		},200);		
	}
	if (allowcreate==1 && theindex++>2) {
		theindex=0;
		var key;
		for(key in tmpImglist) {
			// console.log(key);
			if (key != '') {
				var avatar=new Avatar(tmpImglist[listkey]);						
				// delete tmpImglist[key];
			}
		}
		// allowcreate=0;
	}

	//开奖按钮是否存在
	if (luck) {
		luckingLayer.childList[0].onLuckframe();
	}
	
	
	if (luck && avatarLayer.childList.length==0 && flag==1){
		if (luck.y>up_distance){
			luck.y-=g;
			g++;
		} else {
			// luck.pointY=luck.pointY;
			flag=2;
			g=0.08; //恢复一下
		}
	}	

	if (luck && flag==2 && ro_angle<360)
	{		
		var avatar=new Avatar(allImglist[listkey],'lucking');
		avatar.x=0;
		avatar.y=luck.radius;
		avatar.rotate=ro_angle;

		luck.addChild(avatar);
		ro_angle+=40;	

	}
	if (flag==2){	
		the_angle+=ro_g;
		luck.rotate=the_angle;

		if(the_angle>=360)the_angle=0;		
	}
	if (flag==3){
		the_angle+=ro_g;
		luck.rotate=the_angle;
		the_angle+=ro_g;
		luck.rotate=the_angle;
		the_angle+=ro_g;
		luck.rotate=the_angle;
		the_angle+=ro_g;

		if(the_angle>=360000)the_angle=0;
	}
	if (flag==4) {
		award_num=wone_num;
		if (theindex++>50){	
			theindex=0;
			wavatar=new Avatar(allImglist[listkey],'getluck',44);

			avatarLayer.addChild(wavatar);

			// console.log(avatarLayer.length);

			// num++;
			// trace(num);
		}

		
		if (num>=award_num){
			flag=5;
		}
	}

	

}

function rotateNow(ro_g){
		the_angle+=ro_g;
		luckingLayer.rotate=the_angle;

		if(the_angle>=360)the_angle=0;

}
function showFont(){
	// new LT
}
