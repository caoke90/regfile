//

// "SnowBallFightLayer.h"
// "cc.AudioEngine.h"
// "PersonalApi.h"
// "SceneThreeLayer.h"
// "SceneFourLayer.h"

var aniSprite=cc.Layer.extend({







end

implementation SnowBallFightLayer

enum
{
    kTreeTag,
    kSledTag,
    kBall1Tag,
    kWormTag,
    kMouseTag,
    kCatTag,
    kLionTag,
    
    kBackTag,
    kSnowManTag,
};
scene:function()
{
    var scene = cc.Scene.create();
    var layer = SnowBallFightLayer.create();
    scene.addChild(layer);
    return scene;
},

init:function()
{
    this.init();
     {
        animals = NSMutableArray.alloc() init();
        balls = NSMutableArray.alloc() init();
        points = NSMutableArray.alloc() init();
        
        cc.SpriteFrameCache.getInstance().addSpriteFramesWithFile("s76pics.plist");
        
        var bg = cc.Sprite.create(s76Bj_png);
        bg.setPosition( cc.p(512, 384));
        this.addChild(bg);
        
        var shadow = cc.Sprite.createWithSpriteFrameName("s76Tree_Shadow.png");
        shadow.setPosition( cc.p(256, 427));
        shadow.anchorPovar = cc.p(0.5, 0.05);
        this.addChild(shadow,1);
        
        var tree = cc.Sprite.createWithSpriteFrameName("s76Tree.png");
        tree.setPosition( cc.p(256, 427));
        tree.anchorPovar = cc.p(0.5, 0.05);
        tree.setTag( kTreeTag);
        this.addChild(tree,1);
        
        var sled = cc.Sprite.createWithSpriteFrameName("s76Sled.png");
        sled.setPosition( cc.p(104, 86));
        sled.setTag( kSledTag);
        this.addChild(sled,1);
        
        var ballShadow = cc.Sprite.createWithSpriteFrameName("s76Snowball_Shadow.png");
        ballShadow.setPosition( cc.p(840, 377));
        ballShadow.setScale( 0.3;
        this.addChild(ballShadow,1);
        
        var ball = cc.Sprite.createWithSpriteFrameName("s76Snowball.png");
        ball.setPosition( cc.p(840, 377));
        ball.setScale( 0.3;
        ball.setTag( kBall1Tag);
        ball.userData = ballShadow;
        this.addChild(ball,1);
        
        var worm  =aniSprite.createWithSpriteFrameName("s76Worm1.png");
        worm.delaySeconds = 0.5;
        worm.delaySeconds2 = (0|Math.random()*30+10)/10.0;
        worm.count = 3;
        worm.hidePosition = cc.p(295, 270);
        worm.moveToPosition = cc.p(494, 270);
        worm.setTag( kWormTag);
        worm.setPosition( worm.hidePosition);
        worm.deadCount = 0;
        this.addChild(worm,1);
        animals.push(worm);
        
        var cat = aniSprite.createWithSpriteFrameName("s76Cat1.png");
        cat.delaySeconds = 1;
        cat.delaySeconds2 = (0|Math.random()*30+10)/10.0;
        cat.setTag( kCatTag);
        cat.hidePosition = cc.p(853, 278);
        cat.moveToPosition = cc.p(595, 278);
        cat.count = 2;
        cat.setPosition( cat.hidePosition);
        cat.deadCount = 0;
        this.addChild(cat,1);
        animals.push(cat);
        
        var mouse = aniSprite.createWithSpriteFrameName("s76Mouse1.png");
        mouse.delaySeconds = 1.5;
        mouse.delaySeconds2 = (0|Math.random()*30+10)/10.0;
        mouse.hidePosition = cc.p(594, 417);
        mouse.moveToPosition = cc.p(415, 417);
        mouse.count = 1;
        mouse.setTag( kMouseTag);
        mouse.setPosition( mouse.hidePosition);
        mouse.deadCount = 0;
        this.addChild(mouse,1);
        animals.push(mouse);
        
        var wood1 = cc.Sprite.createWithSpriteFrameName("s76Wood.png");
        wood1.setPosition( cc.p(291, 263));
        wood1.setScale( 0.9;
        this.addChild(wood1,99);
        
        var wood2 = cc.Sprite.createWithSpriteFrameName("s76Wood.png");
        wood2.setPosition( cc.p(863, 267));
        this.addChild(wood2,99);
        
        var wood3 = cc.Sprite.createWithSpriteFrameName("s76Wood.png");
        wood3.setPosition( cc.p(603, 405));
        wood3.setScale( 0.85;
        this.addChild(wood3,99);
        
        
        
        var snowMan = cc.Sprite.createWithSpriteFrameName("s76snowman1.png");
        snowMan.setPosition( cc.p(86, 395));
        snowMan.setTag( kSnowManTag);
        this.addChild(snowMan,2);
        
        
        snowBallWord = cc.Sprite.createWithSpriteFrameName("s76Snowball_word.png");
        snowBallWord.setPosition( cc.p(515, 152));
        snowBallWord.visible = false;
        this.addChild(snowBallWord,99);
        
        
        var snow = cc.ParticleSystemQuad.particleWithFile("pubSnowDown.plist");
        snow.setPosition( cc.p(512, 768));
        this.addChild(snow,99);
        
        this.isTouchEnabled( true);
        this.lionIn();
        
        cc.AudioEngine.getInstance().playMusic("s76backgroundmusic.mp3",true);
        
        
    }
    return this;
},



createRectByPoint:function(pos,w,h)
{
    return.cc.RectMake(pos.x-w/2.0, pos.y -h/2.0, w, h);
},

showHand:function()
{
    var hand = cc.Sprite.createWithSpriteFrameName("hand1.png");
    hand.setPosition( cc.p(512, 71));
    this.addChild(hand,99);
    hand.runAction(cc.Sequence.create(cc.MoveTo.create(.5,cc.p(512, 270)),cc.CallFunc.create(function(){
        hand.removeFromParent(true);
    },this),null));
},

judgeComplete:function()
{
    if (animals.length == 0) {
        
        this.unschedule(this.judge);
        
        var sp = cc.Sprite.create(s76bigsnow_png);
        sp.setPosition( cc.p(512, 384));
        sp.setScale( 0;
        this.addChild(sp,99);
        
        
        sp.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.CallFunc.create(function(){
            cc.AudioEngine.getInstance().playEffect("s76win.wav");
            cc.AudioEngine.getInstance().playEffect("s76ilovewinter.mp3");
        },this),cc.Spawn.create(cc.ScaleTo.create(1.6,1.0),cc.Repeat.create(cc.RotateBy.create(0.2,45),8),null),
                       cc.DelayTime.create(2),cc.CallFunc.create(function(){
            
            var name =  PersonalApi.getAppInstance().unit;
            if (PersonalApi.getAppInstance().backLevel == 1) {
                cc.Director.getInstance().replaceScene(SceneFourLayer.initWithTargetLayer(name));
                
            }else if (PersonalApi.getAppInstance().backLevel == 2) {
                cc.Director.getInstance().replaceScene(SceneThreeLayer.initWithTargetLayer(name));
            }            
        },this),null));
    }
},

judge:function()
{
    if (balls.length>0) {
        for(var ik=0;ik<balls.length;ik++){
    var ball=balls[ik];
            
for(var i = 0;i < animals.length;i++){
                var ani = (aniSprite*)animals[i];
                if (ani.getTag() == kLionTag) {
                    var rect;
                    if (ani.getPosition().x >= 810) {
                        rect = this.createRectByPoint(cc.p(ani.getPosition().x+9,ani.getPosition().y-27),120,160);
                    }
                    if (ani.getPosition().x<810) {
                        rect = this.createRectByPoint(cc.p(ani.getPosition().x,ani.getPosition().y+20),120,70);
                    }
                    if (cc.Rect.CCRectContainsPoint(rect, ball.getPosition())) {
                        
                        
                        this.runAction(cc.Sequence.create(cc.DelayTime.create(.5),cc.CallFunc.create(function(){
                            
                        },this),null));
                        
                        cc.AudioEngine.getInstance().playEffect("s76animalliedown.wav");
                        
                        var lionDown = cc.Sprite.createWithSpriteFrameName("s76Lion_Down.png");
                        lionDown.setPosition( ani.getPosition());
                        this.addChild(lionDown,1);
                        
                        animals.removeObject(ani);
                        ani.visible = false;
                        
                        ani.deadCount ++;
                        var flag = false;
                        if (ani.deadCount < 2) {
                            flag = true;
                            lionDown.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.CallFunc.create(function(){
                                lionDown.removeFromParent(true);
                                
                                ani.visible = true;
                                ani.setPosition( ani.hidePosition);
                                animals.push(ani);
                                
                            },this),null));
                        }
                        else{
                            ani.stopAllActions();
                        }
                        if (flag == false) {
                            this.judgeComplete();
                        }
                        if (balls.containsObject(ball)) {
                            balls.removeObject(ball);
                            ball.removeFromParent(true);
                            return;
                        }
                    }
                }
                if (ani.getTag() == kMouseTag) {
                    if (ani.getPosition().x <= 540) {
                        var rect = this.createRectByPoint(cc.p(ani.getPosition().x+5,ani.getPosition().y-15),50,70);
                        if (cc.Rect.CCRectContainsPoint(rect, ball.getPosition())) {
                            
                            cc.AudioEngine.getInstance().playEffect("s76animalliedown.wav");
                            var mouseDown = cc.Sprite.createWithSpriteFrameName("s76Mouse_Down.png");
                            mouseDown.setPosition( ani.getPosition());
                            
                            this.addChild(mouseDown,1);
                            
                            animals.removeObject(ani);
                            ani.visible = false;
                            ani.deadCount ++;
                            
                            var flag = false;
                            
                            if (ani.deadCount < 2) {
                                flag = true;
                                mouseDown.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.CallFunc.create(function(){
                                    mouseDown.removeFromParent(true);
                                    
                                    ani.visible = true;
                                    ani.setPosition( ani.hidePosition);
                                    animals.push(ani);
                                    
                                },this),null));
                            }
                            else{
                                ani.stopAllActions();
                            }
                            
                            if (flag == false) {
                                this.judgeComplete();
                            }
                            if (balls.containsObject(ball)) {
                                balls.removeObject(ball);
                                ball.removeFromParent(true);
                                return;
                            }
                        }
                    }
                }
                if (ani.getTag() == kWormTag) {
                    
                    if (ani.getPosition().x>=412) {
                        var rect = this.createRectByPoint(cc.p(ani.getPosition().x+10,ani.getPosition().y-7),30,75);
                        if (cc.Rect.CCRectContainsPoint(rect, ball.getPosition())) {
                            cc.AudioEngine.getInstance().playEffect("s76animalliedown.wav");
                            var wormDown = cc.Sprite.createWithSpriteFrameName("s76Worm_Down.png");
                            wormDown.setPosition( ani.getPosition());
                            
                            this.addChild(wormDown,1);
                            
                            
                            animals.removeObject(ani);
                            ani.visible = false;
                            ani.deadCount ++;
                            var flag = false;
                            if (ani.deadCount < 2) {
                                flag = true;
                                wormDown.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.CallFunc.create(function(){
                                    wormDown.removeFromParent(true);
                                    
                                    ani.visible = true;
                                    ani.setPosition( ani.hidePosition);
                                    animals.push(ani);
                                    
                                },this),null));
                            }
                            else{
                                ani.stopAllActions();
                            }
                            if (flag == false) {
                                this.judgeComplete();
                            }
                            if (balls.containsObject(ball)) {
                                balls.removeObject(ball);
                                ball.removeFromParent(true);
                                return;
                            }
                        }
                    }
                }
                if (ani.getTag() == kCatTag) {
                    
                    if (ani.getPosition().x<=725) {
                        var rect = this.createRectByPoint(cc.p(ani.getPosition().x,ani.getPosition().y-20),70,80);
                        if (cc.Rect.CCRectContainsPoint(rect, ball.getPosition())) {

                            cc.AudioEngine.getInstance().playEffect("s76animalliedown.wav");
                            var catDown = cc.Sprite.createWithSpriteFrameName("s76Cat_Down.png");
                            catDown.setPosition( ani.getPosition());

                            this.addChild(catDown,1);
                            
                            animals.removeObject(ani);
                            ani.visible = false;
                            ani.deadCount ++;
                            var flag = false;
                            if (ani.deadCount < 2) {
                                flag = true;
                                catDown.runAction(cc.Sequence.create(cc.DelayTime.create(1.0),cc.CallFunc.create(function(){
                                    catDown.removeFromParent(true);
                                    
                                    ani.visible = true;
                                    ani.setPosition( ani.hidePosition);
                                    animals.push(ani);
                                    
                                },this),null));
                            }
                            else{
                                ani.stopAllActions();
                            }
                            if (flag == false) {
                                this.judgeComplete();
                            }
                            if (balls.containsObject(ball)) {
                                
                                balls.removeObject(ball);
                                ball.removeFromParent(true);
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
    else{
        if (animals.length!= 0) {
            this.addSnowBalls();
        }
    }
},

lionIn:function()
{
    var lion = cc.Sprite.createWithSpriteFrameName("s76Lion_A1.png");
    lion.setPosition( cc.p(1096, 466));
    this.addChild(lion,1);
    
    var frames1 = [];
    for (var i =0; i<2; i++) {
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("s76Lion_A"+parseInt(i+1)+".png");
        frames1.push(frame);
    }
    var animation1 = cc.Animation.create(frames1,1.0/6.0);
    
    var action1 = cc.Animate.create(animation1);
    
    this.runAction(cc.Sequence.create(cc.CallFunc.create(function(){
        lion.runAction(cc.MoveTo.create(.3,cc.p(991, 466)));
    },this), null));
    
    [lion runAction:[cc.Sequence create:
                     cc.MoveTo.create(.3,cc.p(991, 466)),
                     cc.DelayTime.create(1.0/6.0),
                     cc.Repeat.create(action1,4),
                     cc.MoveTo.create(.3,cc.p(1096, 466)),[cc.CallFunc create:function(){
        
        lion.setPosition( cc.p(1092, 630));
        
        lion.removeFromParent(true);
        
        var new = aniSprite.createWithSpriteFrameName("s76Lion_B.png");
        new.setPosition( cc.p(1092,630));
        new.delaySeconds = 2;
        new.delaySeconds2 = (0|Math.random()*30+10)/10.0;
        new.setTag( kLionTag);
        new.count = 0;
        new.hidePosition = cc.p(594, 472);
        new.moveToPosition = cc.p(900, 472);
        new.deadCount = 0;
        this.addChild(new,1);
        
        var frames1 = [];
        for (var i =0; i<5; i++) {
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("s76Lion_C"+parseInt(i+1)+".png");
            frames1.push(frame);
        }
        var animation1 = cc.Animation.create(frames1,1.0/12.0);
        var action1 = cc.Animate.create(animation1);
        
        
        var frames2 = [];
        
        for (var i =0; i < 9; i++) {
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("s76Lion_D"+parseInt(i+1)+".png");
            frames2.push(frame);
        }
        for (var i =0; i < 9; i++) {
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("s76Lion_D"+parseInt(i+1)+".png");
            frames2.push(frame);
        }
        for (var i =0; i < 4; i++) {
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("s76Lion_D"+parseInt(i+1)+".png");
            frames2.push(frame);
        }
        var endFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("s76Lion_EStop.png");
        frames2.push(endFrame);
        
        var animation2 = cc.Animation.create(frames2,1.0/6.0);
        var action2 = cc.Animate.create(animation2);
        
        var s = this.getChildByTag(kBall1Tag);
        s.runAction(cc.Sequence.create(cc.DelayTime.create(1.0/3.0),cc.CallFunc.create(function(){
            this.removeChild(s.userData,true);
            this.removeChild(s,true);
        },this),null));
        
        cc.AudioEngine.getInstance().playEffect("s76lionjumpin.wav");
        
        new.runAction(cc.Sequence.create(cc.MoveTo.create(1.0/6.0,cc.p(857, 472)),action1,cc.CallFunc.create(function(){
            
            animals.push(new);
            
            var word1 = cc.Sprite.createWithSpriteFrameName("s76Box1.png");
            word1.setPosition( cc.p(687, 623));
            this.addChild(word1,99);
            
            word1.runAction(cc.Sequence.create(cc.DelayTime.create(1),cc.CallFunc.create(function(){
                word1.removeFromParent(true);
            },this),null));
            
            var word2 = cc.Sprite.createWithSpriteFrameName("s76Box2.png");
            word2.setPosition( cc.p(687, 623));
            word2.visible = false;
            this.addChild(word2,99);
            
            word2.runAction(cc.Sequence.create(cc.DelayTime.create(1.5),cc.CallFunc.create(function(){
                word2.visible = true;
            },this),cc.DelayTime.create(2.5),cc.CallFunc.create(function(){
                word2.removeFromParent(true);
                this.addSnowBalls();
                
                
                var mouse = (aniSprite*)this.getChildByTag(kMouseTag);
                var worm = (aniSprite*)this.getChildByTag(kWormTag);
                var cat = (aniSprite*)this.getChildByTag(kCatTag);
                var lion = (aniSprite*)this.getChildByTag(kLionTag);
                
                
                cc.AudioEngine.getInstance().playEffect("s76animalout.wav");
                
                mouse.runAction(cc.MoveTo.create(.5,mouse.moveToPosition));
                worm.runAction(cc.MoveTo.create(.5,worm.moveToPosition));
                cat.runAction(cc.MoveTo.create(.5,cat.moveToPosition));
                
                lion.runAction(cc.Sequence.create(cc.DelayTime.create(1),cc.CallFunc.create(function(){
                    this.animalsMove();
                    
                    this.schedule(this.judge);
                },this),null));
                
            }),null));
            cc.AudioEngine.getInstance().playEffect("s76lionsay.mp3");
            
        }),action2,null));
    }],null]];
},

animalMove:function(sp)
{
    var animalName;
    if (sp.getTag() == kWormTag) {
        animalName = "s76Worm";
    }
    if (sp.getTag() == kCatTag) {
        animalName = "s76Cat";
    }
    if (sp.getTag() == kMouseTag) {
        animalName = "s76Mouse";
    }
    if (sp.getTag() == kLionTag) {
        animalName = "s76Lion";
    }
    
    var frames2 = [];
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(animalName+parseInt(1)+".png");
    frames2.push(frame);
    var animation2 = cc.Animation.create(frames2,1.0/6.0);
    var action2 = cc.Animate.create(animation2);
    
    sp.delaySeconds2 = (0|Math.random()*30+10)/10.0;
    sp.delaySeconds = (0|Math.random()*20+10)/10.0;
    sp.count++;
    if (sp.count<3) {
        sp.runAction(cc.Sequence.create(cc.MoveTo.create(1,sp.hidePosition),action2,cc.DelayTime.create(sp.delaySeconds),cc.MoveTo.create(1,sp.moveToPosition),cc.DelayTime.create(1),null));
    }
    else{
        sp.count = 0;
        var frames = [];
        for (var i = 0; i<5; i++) {
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(animalName+parseInt(i+1)+".png");
            frames.push(frame);
        }
        var animation = cc.Animation.create(frames,1.0/6.0);
        var action = cc.Animate.create(animation);
        
        sp.runAction(cc.Sequence.create(cc.MoveTo.create(1,sp.hidePosition),action2,cc.DelayTime.create(sp.delaySeconds),cc.MoveTo.create(1,sp.moveToPosition),action,cc.CallFunc.create(function(){
            var random = 0|Math.random()*3;
            
            if (random == 1) {
                var s = cc.Sprite.create(s76Snowball_Down_png);
                s.setPosition( cc.p(512, 384));
                this.addChild(s,99);
                cc.AudioEngine.getInstance().playEffect("s76snowballonscreen.wav");
                s.runAction(cc.Sequence.create(cc.DelayTime.create(.5),cc.FadeOut.create(.5),cc.CallFunc.create(function(){
                    s.removeFromParent(true);
                },this),null));
            }
        }),null));
    }
},

animalsMove:function()
{
for(var ik=0;ik<animals.length;ik++){
    var sp=animals[ik];
        sp.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.CallFuncN.create(this,selector(,)),cc.DelayTime.create(2+sp.delaySeconds+sp.delaySeconds2),null)));
    }
},

addSnowBalls:function()
{
    var ballShadow = cc.Sprite.createWithSpriteFrameName("s76Snowball_Shadow.png");
    ballShadow.setPosition( cc.p(512, 71-150));
    this.addChild(ballShadow,99);
    
    ballShadow.runAction(cc.MoveTo.create(.5,cc.pAdd(ballShadow.getPosition(), cc.p(0, 150))));
    
    var ball = cc.Sprite.createWithSpriteFrameName("s76Snowball.png");
    ball.setPosition( ballShadow.getPosition());
    ball.userData = ballShadow;
    this.addChild(ball,99);
    balls.push(ball);
    
    ball.runAction(cc.MoveTo.create(.5,cc.pAdd(ball.getPosition(), cc.p(0, 150))));
    
    cc.AudioEngine.getInstance().playEffect("s76snowballup.wav");
    
    
    this.schedule(this.showHand,5);
},

onTouchesBegan:function(touches,event)
{
    var touch = touches.anyObject();
    var location =touches[0].getLocation();
    
    var sled = this.getChildByTag(kSledTag);
    if (cc.Rect.CCRectContainsPoint(sled.getBoundingBoxToWorld(), location)) {
        
        if (sled.numberOfRunningActions() == 0) {
            cc.AudioEngine.getInstance().playEffect("s77sled.wav");
            sled.runAction(cc.Sequence.create(cc.EaseIn.create(cc.MoveTo.create(.5,cc.p(-70, 43)),1.5),cc.DelayTime.create(2),cc.EaseOut.create(cc.MoveTo.create(.5,cc.p(104, 86)),1.5),null));
        }
        return;
    }
    var snowman = this.getChildByTag(kSnowManTag);
    if (cc.Rect.CCRectContainsPoint(snowman.getBoundingBoxToWorld(), location)) {
        
        if (snowman.numberOfRunningActions() == 0) {
            cc.AudioEngine.getInstance().playEffect("s76snowmanshake.wav");
            var frames = [];
            
            
            for (var i =0; i < 3; i++) {
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("s76snowman"+parseInt(i+1)+".png");
                frames.push(frame);
            }
            var animation = cc.Animation.create(frames,0.1);
            snowman.runAction(cc.Repeat.create(cc.Animate.create(animation),2));
        }
        return;
    }
    var tree = this.getChildByTag(kTreeTag);
    if (cc.Rect.CCRectContainsPoint(tree.getBoundingBoxToWorld(), location)) {
        if (tree.numberOfRunningActions() == 0) {
            cc.AudioEngine.getInstance().playEffect("s76treeshake.wav");
            tree.runAction(cc.Repeat.create(cc.Sequence.create(cc.RotateTo.create(.1,-5),
                                                        cc.RotateTo.create(.1,0),
                                                        cc.RotateTo.create(.1,5),
                                                        cc.RotateTo.create(.1,0),null),1));
        }
    }
    var count = balls.length;
else if(count>0){
for(var ik=0;ik<balls.length;ik++){
    var ball=balls[ik];
if(cc.Rect.CCRectContainsPoint(ball.getBoundingBoxToWorld(),location)){
                touchedSprite = ball;
                beginPos = touchedSprite.getPosition();
                
                
                if (snowBallWord.numberOfRunningActions() == 0) {
                    
                    
                    cc.AudioEngine.getInstance().playEffect("pubsnowball.mp3");
                    
                    snowBallWord.visible = true;
                    snowBallWord.runAction(cc.Sequence.create(cc.DelayTime.create(1),cc.CallFunc.create(function(){
                        snowBallWord.visible = false;
                    },this),null));
                }
            }
        }
    }
},

onTouchesMoved:function(touches,event)
{
    var touch = touches.anyObject();
    var location =touches[0].getLocation();
    
    if (touchedSprite) {
        points.push(NSValue.valueWithCGPoint(location));
        
        if (!timerFlag) {
            
            timerFlag = true;
            this.runAction(cc.Sequence.create(cc.DelayTime.create(0.05),cc.CallFunc.create(function(){
                
                var begin = cc.p(512, 71);
                var pos =parseInt( points.lastObject() CGPo);
                
                var dis1 = cc.pDistance(begin, pos);
                
                var dis2 = dis1*5+100;
                
                var X = begin.x+(-begin.x+pos.x)*dis2/dis1;
                var Y = begin.y+(-begin.y+pos.y)*dis2/dis1;
                 
                var shadow = touchedSprite.userData;
                
                this.unschedule(this.showHand);
                
                var config;
                config.controlPoint_1 = begin;
                config.controlPoint_2 = cc.p(X, Y+100);
                config.endPosition = cc.p(X, Y);
                cc.AudioEngine.getInstance().playEffect("s76snowballthrow.wav");
                touchedSprite.runAction(cc.Sequence.create(cc.Spawn.create(cc.BezierTo.create(dis2/700.0,config),cc.ScaleTo.create(dis2/700.0,1-(dis2/500)),null),cc.CallFuncN.create(function(cc.Node* node){
                    balls.removeObject(node);
                    node.removeFromParent(true);
                    
                    },this),null));
                
                if (shadow != null) {
                    
                    if (this.children().containsObject(shadow)) {
                        shadow.removeFromParent(true);
                    }
                }
                touchedSprite  = null;
                points=[];
                timerFlag = false;
                 
                }),null));
            }
    }
},

onTouchesEnded:function(touches,event)
{
    if (touchedSprite) {
        points=[];
        touchedSprite = null;
    }
}
})
