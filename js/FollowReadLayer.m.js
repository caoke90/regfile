//

// "FollowReadLayer.h"
// "PersonalApi.h"
// "PublicApi_macro.h"
// "FollowMainLayer.h"

var FollowReadLayer=cc.Layer.extend({

 scene:function()
{
	cc.Scene* scene = cc.Scene.create();
	FollowReadLayer* layer = FollowReadLayer.create();
	scene.addChild( layer);
    
	return scene;
},

addButton:function(Nimage,Himage,fun,target,p,btntag)
{
    var nsprite = cc.Sprite.create(Nimage);
    var hsprite2 = cc.Sprite.create(Himage);
    
    var  itemSprite=cc.MenuItemSprite.create(nsprite,hsprite2,target,fun);
    itemSprite.setTag( btntag);
    
    var myMenu = cc.Menu.create(itemSprite, null);
    myMenu.setTag( btntag);
    myMenu.setPosition(cc.p(p.x,p.y));
    target.addChild(myMenu);
},

Lion_Wait_Action:function(imageName,sender)
{
    var animFrames = [];
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame);
    
for(var i = 1; i <=3; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
    }
    
    var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame1);
    
    var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame2);
    
    var frame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(4)+".png");
    animFrames.push(frame3);
    
    var frame4 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(5)+".png");
    animFrames.push(frame4);
    
    var frame5 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(5)+".png");
    animFrames.push(frame5);
    
    var frame6 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(4)+".png");
    animFrames.push(frame6);
    
    var frame7 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame7);

    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    var secene =cc.Sequence.create(animate,null);
    sender.runAction(secene);
},

Lion_Touch_Action:function(imageName,sender)
{
    var animFrames = [];
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame);
    
for(var i = 1; i <=4; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
    }
for(var i = 0; i <=2; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(5)+".png");
        animFrames.push(frame);
        
        var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(6)+".png");
        animFrames.push(frame1);
    }
    var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(4)+".png");
    animFrames.push(frame1);
    
    var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame2);
    
    var frame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame3);
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    var seq = cc.Sequence.create(animate,null);
    sender.runAction(seq);
},

Lion_Catch_Action:function(imageName,sender)
{
    var animFrames = [];
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame);
    
    var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame1);
    
for(var i = 0; i <=3; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(2)+".png");
        animFrames.push(frame);
        
        var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(3)+".png");
        animFrames.push(frame1);
    }
     
    var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame2);
    
    var frame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame3);
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    pointOneAction= cc.Sequence.create(animate,null);
    sender.runAction(pointOneAction);
     cc.AudioEngine.getInstance().playEffect(T10LionLike);
},

Lion_Face_Action:function(imageName,sender)
{
    var animFrames = [];
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame);
    
    var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame1);
    
for(var i = 0; i <=3; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(2)+".png");
        animFrames.push(frame);
        
        var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(3)+".png");
        animFrames.push(frame1);
    }
    
    var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame2);
    
    var frame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame3);
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    var seq = cc.Sequence.create(animate,null);
    sender.runAction(seq);
},

Lion_Speak_Action:function(imageName,sender)
{
    var animFrames = [];
    
for(var i = 1; i <=7; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
        
    }
    
    var animation = cc.Animation.create(animFrames,0.2);
    var animate = cc.Animate.create(animation);
    
    speakAction= cc.RepeatForever.create(cc.Sequence.create(animate,null));
    sender.runAction(speakAction);
},

BeginListen_Action:function(imageName,sender)
{
    var animFrames = [];
    
for(var i = 1; i <=3; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
        
    }
    
    var animation = cc.Animation.create(animFrames,0.2);
    var animate = cc.Animate.create(animation);
    
    var secene = cc.Sequence.create(animate,null);
    sender.runAction(secene);
},

Lion_Listen_Action:function(imageName,sender)
{
    var animFrames = [];
    
for(var i = 4; i <=6; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
        
    }
    
    var animation = cc.Animation.create(animFrames,0.2);
    var animate = cc.Animate.create(animation);
    
    listenAction = cc.RepeatForever.create(cc.Sequence.create(animate,null));
    sender.runAction(listenAction);
},

Lion_EndListen_Action:function(imageName,sender)
{
    var animFrames = [];
    
for(var i = 3; i <=1; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
        
    }
    var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10lion.png"));
    animFrames.push(frame1);
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    var sence =  cc.Sequence.create(animate,null);
    sender.runAction(sence);
},

Lion_Breath_Action:function(imageName,num,sender)
{
    var animFrames = [];
for(var i = 1; i <=num; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
    }
    
    var animation = cc.Animation.create(animFrames,0.2);
    var animate = cc.Animate.create(animation);
    
    this.waitAction = cc.RepeatForever.create(cc.Sequence.create(cc.DelayTime.create(1.0),animate,null));
    sender.runAction(waitAction);
},

Cat_Wait_Action:function(imageName,sender)
{
    var animFrames = [];
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10catwait1.png"));
    animFrames.push(frame);
    
    var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame1);
    
    var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(2)+".png");
    animFrames.push(frame2);
    
for(var i = 0; i <= 2; i++)
    {
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(3)+".png");
        animFrames.push(frame);
        
        var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(4)+".png");
        animFrames.push(frame1);
    }
    
    var frame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(2)+".png");
    animFrames.push(frame3);
    var frame4 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame4);
    var frame5 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10catwait1.png"));
    animFrames.push(frame5);
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    var seq = cc.Sequence.create(animate,null);
    sender.runAction(seq);
},

Cat_WaitTwo_Action:function(imageName,sender)
{
    var animFrames = [];
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10catwait1.png"));
    animFrames.push(frame);
    
    var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame1);
    var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(2)+".png");
    animFrames.push(frame2);
    var frame6 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(3)+".png");
    animFrames.push(frame6);
    
for(var i = 0; i <= 2; i++)
    {
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(4)+".png");
        animFrames.push(frame);
        
        var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(5)+".png");
        animFrames.push(frame1);
    }
    
    var frame7 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(3)+".png");
    animFrames.push(frame7);
    var frame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(2)+".png");
    animFrames.push(frame3);
    var frame4 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame4);
    var frame5 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10catwait1.png"));
    animFrames.push(frame5);
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    this.waitAction = cc.RepeatForever.create(cc.Sequence.create(cc.DelayTime.create(1.0),animate,null));
    sender.runAction(waitAction);
},

Cat_Catch_Action:function(imageName,sender)
{
    var animFrames = [];
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10catwait1.png"));
    animFrames.push(frame);
    
    var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame1);
    
    var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(2)+".png");
    animFrames.push(frame2);
    
for(var i = 0; i <= 3; i++)
    {
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(3)+".png");
        animFrames.push(frame);
        
        var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(4)+".png");
        animFrames.push(frame1);
    }
    
    var frame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(2)+".png");
    animFrames.push(frame3);
    var frame4 = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(1)+".png");
    animFrames.push(frame4);
    var frame5 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10catwait1.png"));
    animFrames.push(frame5);
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    pointOneAction = cc.Sequence.create(animate,null);
    sender.runAction(pointOneAction);
      cc.AudioEngine.getInstance().playEffect(T10CatShake);
},

Cat_Touch_Action:function(imageName,sender)
{
    var animFrames = [];
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10catwait1.png"));
    animFrames.push(frame);
    
for(var i = 1; i <=6; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
    }
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    var seq = cc.Sequence.create(animate,animate.reverse(),null);
    sender.runAction(seq);
},

Cat_Listen_Action:function(imageName,sender)
{
    var animFrames = [];
    
for(var i = 4; i <=8; i++)
    {
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
    }
    
    var animation = cc.Animation.create(animFrames,0.2);
    var animate = cc.Animate.create(animation);
    
    listenAction = cc.RepeatForever.create(cc.Sequence.create(animate,null));
    sender.runAction(listenAction);
},

Cat_Speak_Action:function(imageName,sender)
{
    var animFrames = [];
    
for(var i = 1; i <=5; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
        
    }
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    speakAction= cc.RepeatForever.create(cc.Sequence.create(animate,null));
    sender.runAction(speakAction);
},

Cat_EndListen_Action:function(imageName,sender)
{
    var animFrames = [];
    
for(var i = 3; i <=1; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
        
    }
    var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(("t10catwait1.png"));
    animFrames.push(frame1);
    
    var animation = cc.Animation.create(animFrames,0.15);
    var animate = cc.Animate.create(animation);
    
    var sence =  cc.Sequence.create(animate,null);
    sender.runAction(sence);
},

Btn_Action:function(imageName,num,sender)
{
    var animFrames = [];
for(var i = 1; i <=num; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
    }
    
    var animation = cc.Animation.create(animFrames,0.3);
    var animate = cc.Animate.create(animation);
    
    var seq = cc.RepeatForever.create(animate);
    
    sender.runAction(seq);
},

shouldPlayRadomAnimation:function()
{
    if (isListening || isSpeaking || LionPlayer.numberOfRunningActions())
    {
        return false;
    }
    else
    {
        return true;
    }
},

BeginListenAction:function()
{
    if (m_animaltag)
    {
         this.BeginListen_Action("t10listen",LionPlayer);
    }
   else
   {
        this.BeginListen_Action("t10catlisten",LionPlayer);
   }
},

ListeningAction:function()
{
    if (m_animaltag)
    {
         this.Lion_Listen_Action("t10listen",LionPlayer);
    }
   else
   {
       this.Cat_Listen_Action("t10catlisten",LionPlayer);
   }
},

readyToListen:function()
{
    isReadWord = false;
    if (LionPlayer.numberOfRunningActions() > 0)
    {
        LionPlayer.stopAllActions();
    }
    this.runAction(cc.Sequence.create(cc.CallFunc.create(this.BeginListenAction,this),cc.CallFunc.create(this.ListeningAction,this), null));
    isListening = true;
},

startListion:function()
{
},

endListion:function()
{
     isListening = false;
    LionPlayer.stopAllActions();
    LionPlayer.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(animalNameImg));
    if (m_animaltag)
    {
         this.Lion_EndListen_Action("t10listen",LionPlayer);
    }
   else
   {
       this.Cat_EndListen_Action("t10catlisten",LionPlayer);
   }
    isSpeaking = true;
},

startSpeak:function()
{
     isSpeaking = true;
    LionPlayer.stopAllActions();
    if (m_animaltag)
    {
         this.Lion_Speak_Action("t10speak",LionPlayer);
    }
    else
    {
        this.Cat_Speak_Action("t10catspeak",LionPlayer);
    }
},

stopSpeak:function()
{
    LionPlayer.stopAction(speakAction);
    LionPlayer.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(animalNameImg));
    isSpeaking = false;
    animationTime = 0;
    if (!isReadWord)
    {
        if (!isLionStart)
        {
            if (CurrentPagNum != SumPageNum-1)
            {
                this.Btn_Action("t10next",2,this.getChildByTag(NextTag));
            }
            if (CurrentPagNum)
            {
                this.Btn_Action("t10back",2,this.getChildByTag(LastTag));
            }
        }
    }
},

NextTurnPageEnd:function()
{
    var leftSprite = this.getChildByTag(LeftPicTag);
    leftSprite.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(leftImage[CurrentPagNum]));
    var turnpage = this.getChildByTag(TurnPageTag);
    turnpage.visible = false;
    if (CurrentPagNum > 22 && CurrentPagNum < 29)
    {
        this.getChildByTag(LionPicTag).visible = true;
        this.getChildByTag(LionPicTag).setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("t10lionsay"+parseInt(CurrentPagNum-4)+".png"));
    }
    else
    {
        this.getChildByTag(LionPicTag).visible = false;
    }
    this.runAction(cc.Sequence.create(cc.DelayTime.create(0.1),cc.CallFunc.create(this.ReadWord,this), null));
},

LastTurnPageEnd:function()
{
    var rightSprite = this.getChildByTag(RightPicTag);
    rightSprite.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(rightImage[CurrentPagNum]));
    var turnpage = this.getChildByTag(TurnPageTag);
    turnpage.visible = false;
    if (CurrentPagNum > 22 && CurrentPagNum < 29)
    {
        this.getChildByTag(LionPicTag).visible = true;
        this.getChildByTag(LionPicTag).setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("t10lionsay"+parseInt(CurrentPagNum-4)+".png"));
    }
    else
    {
        this.getChildByTag(LionPicTag).visible = false;
    }
     this.runAction(cc.Sequence.create(cc.DelayTime.create(0.1),cc.CallFunc.create(this.ReadWord,this), null));
},

run_Action:function(imageName,num,sender,isback)
{
    var animFrames = [];
for(var i = 1; i <=num; i++)
    {
        
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(imageName+parseInt(i)+".png");
        animFrames.push(frame);
    }
    
    var animation = cc.Animation.create(animFrames,0.05);
    var animate = cc.Animate.create(animation);
    
    var seq = null;
    if (isback)
    {
        seq = cc.Sequence.create(animate.reverse(),cc.CallFunc.create(this.LastTurnPageEnd,this), null);
    }
    else
    {
        seq = cc.Sequence.create(animate,cc.CallFunc.create(this.NextTurnPageEnd,this), null);
    }
    sender.runAction(seq);
},

GoNextBookPage:function()
{
     cc.AudioEngine.getInstance().playEffect(T10Page);
    if (CurrentPagNum != SumPageNum-1)
    {
       this.getChildByTag(NextTag).stopAllActions();
    }
    if (CurrentPagNum)
    {
       this.getChildByTag(LastTag).stopAllActions();
    }
    //NSLog("CurrentPagNum = %d",CurrentPagNum);
    if (CurrentPagNum == SumPageNum-1)
    {
        return;
    }
    CurrentPagNum++;
    if (CurrentPagNum == SumPageNum-1)
    {
         this.getChildByTag(NextTag).runAction(cc.Hide.create());
    }
    this.getChildByTag(LastTag).runAction(cc.Show.create());
    var rightSprite = this.getChildByTag(RightPicTag);
    rightSprite.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(rightImage[CurrentPagNum]));
    var turnpage = this.getChildByTag(TurnPageTag);
    turnpage.visible = true;
    this.run_Action("t10turn",6,turnpage,false);
},

GoLastBookPage:function()
{
     cc.AudioEngine.getInstance().playEffect(T10Page);
    if (CurrentPagNum != SumPageNum-1)
    {
        this.getChildByTag(NextTag).stopAllActions();
    }
    if (CurrentPagNum)
    {
        this.getChildByTag(LastTag).stopAllActions();
    }
    //NSLog("CurrentPagNum = %d",CurrentPagNum);
    if (CurrentPagNum == 0)
    {
        return;
    }
    CurrentPagNum--;
    if (CurrentPagNum == 0)
    {
          this.getChildByTag(LastTag).runAction(cc.Hide.create());
    }
    this.getChildByTag(NextTag).runAction(cc.Show.create());
    var leftSprite = this.getChildByTag(LeftPicTag);
    leftSprite.setDisplayFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(leftImage[CurrentPagNum]));
    var turnpage = this.getChildByTag(TurnPageTag);
    turnpage.visible = true;
    this.run_Action("t10turn",6,turnpage,true);
},

onStartPlay:function()
{
     audioManager.apdelegate.startSpeak();
},

onStopPlay:function()
{
    try
    {
        audioManager.apdelegate.stopSpeak();
        if (!isLionStart)
        {
             audioManager.StartRecordThread();
        }
        else
        {
              isLionStart = false;
            this.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.CallFunc.create(this.ReadWord,this), null));
        }
    }
    catch (NSException* exception)
    {
        audioManager.apdelegate.stopSpeak();
        audioManager.voiceManager.ppdelegate = null;
    }
    
},

ReadWord:function()
{
    isReadWord = true;
     filepath = NSBundle.mainBundle().pathForResource(audioArray[CurrentPagNum],"mp3");
    var url = NSURL.URLWithString(filepath);
    audioManager.voiceManager.ppdelegate = this;
    audioManager.voiceManager.StartChangeVoice(url);
},

RadioBtnClick:function()
{
    if (!isListening && !isSpeaking)
    {
        if (CurrentPagNum != SumPageNum-1)
        {
            this.getChildByTag(NextTag).stopAllActions();
        }
        if (CurrentPagNum)
        {
            this.getChildByTag(LastTag).stopAllActions();
        }
        this.ReadWord();
    }
},

preloadAudio:function()
{
    cc.AudioEngine.getInstance().preloadBackgroundMusic(T10BgMusic);
},

LionStartSpeak:function()
{
    isLionStart = true;
    var filepath = NSBundle.mainBundle().pathForResource(T10GenDu,"mp3");
    var url = NSURL.URLWithString(filepath);
    audioManager.voiceManager.ppdelegate = this;
    audioManager.voiceManager.StartChangeVoice(url);
},

ClickBack:function()
{
    cc.AudioEngine.getInstance().stopMusic();
    var scene = cc.Scene.create();
    var  puzzle = FollowMainLayer.alloc().init();
    scene.addChild(puzzle);
    cc.Director.getInstance().replaceScene(cc.TransitionFade.transitionWithDuration(0.3,scene));
    puzzle=null;
},

init:function(animaltag)
{
    this._super();
    
    {
        m_animaltag = animaltag;
        NSUserDefaults.standardUserDefaults().setInteger(m_animaltag,AnimalId);
        var playerPoint;
        if (m_animaltag)
        {
            addBatchNodeRes(t10pointandspeak_png,t10pointandspeak_plist,this,0);
            addBatchNodeRes(t10speakandface_png,t10speakandface_plist,this,0);
            addBatchNodeRes(t10listen_png,t10listen_plist,this,0);
            animalNameImg = "t10lion.png";
            playerPovar = cc.p(486, 476);
        }
        else
        {
            addBatchNodeRes(t10catAnimation_png,t10catAnimation_plist,this,0);
            addBatchNodeRes(t10catAnimation2_png,t10catAnimation2_plist,this,0);
             animalNameImg = "t10catwait1.png";
            playerPovar = cc.p(512, 400);
        }
          
         addBatchNodeRes(t10things_png,t10things_plist,this,0);
        var bg = cc.Sprite.create(T10ollowMebg_png);
        bg.setPosition( cc.p(512, 384));
        this.addChild(bg);
        
        LionPlayer = cc.Sprite.createWithSpriteFrameName(animalNameImg);
        LionPlayer.setPosition( playerPoint);
        this.addChild(LionPlayer);

        var desk = cc.Sprite.create(T10ollowMedesk_png);
        desk.setPosition( cc.p(512, 115));
        this.addChild(desk);
        
        penArray = NSMutableArray.alloc().init();
        
        var filepath =cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(OtherImage_plist);
        var spritesArray = (filepath);
        for (var i=0; i<spritesArray.length; i++)
        {
            var dic = spritesArray[i];
            var x =parseInt( dic["x"]);
            var y =parseInt(  dic["y"]);
            var tag =parseInt( dic["tag"]);
            
            if (tag == RadioTag)
            {
                PersonalApi.addButton(dic["image"])+"1.png"),this.RadioBtnClick,this,cc.p(x, y),tag);
            }
            else
            {
                var sprite = cc.Sprite.createWithSpriteFrameName(dic["image"]);
                sprite.setTag( tag);
                if (tag == TurnPageTag || tag == LionPicTag)
                {
                    sprite.visible = false;
                }
                if (tag >= YellowPen && tag <=  Eraser)
                {
                    penArray.push(sprite);
                }
                sprite.setPosition( cc.p(x, y));
                this.addChild(sprite);
            }
        }
        spritesArray=null;
        this.getChildByTag(LastTag).visible = false;
        var leftpath =cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(AllWord_plist);
        var rightpath =cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(AllImage_plist);
        var audiopath =cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(AllSound_plist);
        leftImage =  (leftpath);
        rightImage = (rightpath);
        audioArray = (audiopath);
        SumPageNum = leftImage.length;
        CurrentPagNum = 0;
        
        audioManager = AudioManager.alloc().init();
        audioManager.apdelegate = this;
        audioManager.ardelegate = this;
        touchNum = 0;
        isListening = false;
        isSpeaking = false;
        isalwaysClick = false;
        isReadWord = false;
        isLionStart = false;
        
        this.addButton("uiback.png","uiback.png",this.ClickBack,this,cc.p(960, 50),1000);
        this.preloadAudio();
        this.schedule(this.updateAnimation,0.5);
    }
    return this;
},

updateAnimation:function()
{
    animationTime += 0.5;
    if (touchNum >= TouchThreePovar && !isSpeaking && !isListening)
    {
        if (m_animaltag)
        {
            LionPlayer.stopAllActions();
            this.Lion_Touch_Action("t10pointmore",LionPlayer);
        }
        else
        {
             LionPlayer.stopAllActions();
              cc.AudioEngine.getInstance().playEffect(T10CatChange);
            this.Cat_Touch_Action("t10catpoint",LionPlayer);
        }
        touchNum = 0;
        animationTime = 0;
    }
    
    if (animationTime > 9 && !isListening && !isSpeaking)
    {
        if (waitAction)
        {
            LionPlayer.stopAction(waitAction);
            this.waitAction = null;
        }
        if (m_animaltag)
        {
            this.Lion_Face_Action("t10ace",LionPlayer);
              cc.AudioEngine.getInstance().playEffect(T10LionMakeFace);
        }
        else
        {
             this.Cat_Wait_Action("t10catwait",LionPlayer);
            cc.AudioEngine.getInstance().playEffect(T10CatWait);
        }
        animationTime = 0;
    }
    if (!LionPlayer.numberOfRunningActions() && !isListening && !isSpeaking)
    {
        if (m_animaltag)
        {
              this.Lion_Breath_Action("t10breath",4,LionPlayer);
        }
        else
        {
             this.Cat_WaitTwo_Action("t10catwaiting",LionPlayer);
        }
    }
},



 onEnter:function()
{
this.setTouchEnabled(true);
     cc.AudioEngine.getInstance().playMusic(T10BgMusic,true);
    this.LionStartSpeak();
    this.onEnter();
},

 onExit:function()
{
this.setTouchEnabled(false);
    if (isListening)
    {
         audioManager.StopRecordThread();
    }
    this.onExit();
},

onTouchesBegan:function(touches,event)
{
    var location =touches[0].getLocation();
    startPosition = cc.PointZero;

    
    if (cc.Rect.CCRectContainsPoint(this.getChildByTag(BookTag).getBoundingBoxToWorld(), location))
    {
          startPosition = location;
    }
    return true;
},

onTouchesEnded:function(touches,event)
{
      var location =touches[0].getLocation();
      var turnpage = this.getChildByTag(TurnPageTag);
    var isTurnPage = false;
    for(var ik=0;ik<penArray.length;ik++){
    var sprite=penArray[ik];
        if (cc.Rect.CCRectContainsPoint(sprite.getBoundingBoxToWorld(), location))
        {
            if (!sprite.numberOfRunningActions())
            {
                if (sprite.getTag() == Eraser)
                {
                       cc.AudioEngine.getInstance().playEffect(T10ClickEraser);
                }
                else
                {
                       cc.AudioEngine.getInstance().playEffect(T10ClickPen);
                }
                  sprite.runAction(cc.Sequence.create(cc.JumpTo.create(0.4,cc.p(sprite.getPosition().x, sprite.getPosition().y),15.0,2), null));
            }
        }
    }
    if (startPosition.x != 0 && startPosition.y != 0 && !turnpage.numberOfRunningActions()  && !isSpeaking && !isListening)
    {
        if (location.x - startPosition.x > 20 && this.getChildByTag(LastTag)._visible)
        {
            isTurnPage = true;
            this.GoLastBookPage();
        }
        else if(location.x - startPosition.x < -20 && this.getChildByTag(NextTag)._visible)
        {
            isTurnPage = true;
            this.GoNextBookPage();
        }
    }
    if (cc.Rect.CCRectContainsPoint(this.getChildByTag(NextTag).getBoundingBoxToWorld(), location) && this.getChildByTag(NextTag)._visible  && !isSpeaking &&!isListening && !isTurnPage)
    {
        isTurnPage = true;
        this.GoNextBookPage();
    }
    if (cc.Rect.CCRectContainsPoint(this.getChildByTag(LastTag).getBoundingBoxToWorld(), location) && this.getChildByTag(LastTag)._visible  && !isSpeaking && !isListening && !isTurnPage)
    {
        isTurnPage = true;
        this.GoLastBookPage();
    }

    var playerRect;
    if (m_animaltag)
    {
         playerRect = cc.RectMake(286, 278, 458, 455);
    }
    else
    {
        playerRect = cc.RectMake(344, 251, 317, 256);
    }
    if (cc.Rect.CCRectContainsPoint(playerRect, location) && !isSpeaking && !isListening)
    {
        touchNum++;
        if (waitAction)
        {
            LionPlayer.stopAction(waitAction);
            this.waitAction = null;
        }
        if (this.shouldPlayRadomAnimation() && (touchNum % 3))
        {
            if (m_animaltag)
            {
               
                this.Lion_Catch_Action("t10pointout",LionPlayer);
            }
            else
            {
               
                this.Cat_Catch_Action("t10catout",LionPlayer);
            }
            animationTime = 0;
        }
    }
}
})
