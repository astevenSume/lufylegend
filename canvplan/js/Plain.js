function Plain(x,y,shootX,shootY,bitmapData,hp){
	base(this,LSprite,[]);
	var self=this;

	self.x=x;
	self.y=y;

	self.shootX=shootX;
	self.shootY=shootY;

	self.canshoot=false;

	self.move=[0,0];

	self.speed=1;

	self.hp=hp;

	self.isdie=false;

	self.bitmap=new LBitmap(bitmapData);
	self.addChild(self.bitmap);
}
Plain.prototype.setBullet=function(bulletIndex) {
	this.bullet=bulletIndex;
}
Plain.prototype.shoot=function(){
	var self=this;
	var bullet=bulletList[self.bullet];
	if (self.shootIndex++ < bullet.step)return;
	self.shootIndex=0;
	for (i=0;i<bullet.count;i++){
		var angle=i*bullet.angle+bullet.startAngle;	
		xspeed=bullet.speed*Math.cos(angle*Math.PI/180);
		yspeed=bullet.speed*Math.sin(angle*Math.PI/180);
		var params={
			bitmapData:self.bulletBitmapData,
			x:self.x+self.shootX,
			y:self.y+self.shootY,
			xspeed:xspeed,
			yspeed:yspeed,
			belong:self.belong
		};
		obj = new Bullet(params);
		bulletLayer.addChild(obj);
	}
}
Plain.prototype.onplainframe=function(event){
	var self=this;
	self.x += self.move[0]*self.speed;
	self.y += self.move[1]*self.speed;

	if(self.canshoot)self.shoot();
}
