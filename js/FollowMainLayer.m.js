//

// "FollowMainLayer.h"
// "PersonalApi.h"
// "LoadingLayer.h"
// "PublicApi_macro.h"
// "SceneFourLayer.h"
// "SceneThreeLayer.h"
var FollowMainLayer=cc.Layer.extend({
 scene:function()
{
	cc.Scene* scene = cc.Scene.create();
	FollowMainLayer* layer = FollowMainLayer.create();
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

ClickBack:function()
{
    cc.AudioEngine.getInstance().playEffect(BaseBackAudio);
    cc.AudioEngine.getInstance().stopMusic();
    cc.AudioEngine.getInstance().stopAllEffect();
    var name =  PersonalApi.getAppInstance().unit;
    if (PersonalApi.getAppInstance().backLevel == 1) {
        cc.Director.getInstance().replaceScene(SceneFourLayer.initWithTargetLayer(name));
        
    }else if (PersonalApi.getAppInstance().backLevel == 2) {
        cc.Director.getInstance().replaceScene(SceneThreeLayer.initWithTargetLayer(name));
    }
},

init:function()
{
    this.init();
    
    {
        var bg = cc.Sprite.create(t10menubg_png);
        bg.setPosition( cc.p(512, 384));
        this.addChild(bg);
        
        LionPlayer = cc.Sprite.create(t10menulion_png);
        LionPlayer.setPosition( cc.p(236, 211));
        this.addChild(LionPlayer);
        LionPlayer.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.ScaleTo.create(0.5,1.05),cc.ScaleTo.create(0.5,1.0), null)));
        
        catPlayer = cc.Sprite.create(t10menucat_png);
        catPlayer.setPosition( cc.p(873, 152));
        this.addChild(catPlayer);
        catPlayer.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.ScaleTo.create(0.5,1.05),cc.ScaleTo.create(0.5,1.0), null)));
        
        var word = cc.Sprite.create(t10menuword_png);
        word.setPosition( cc.p(510, 526));
        this.addChild(word);
        this.addButton("t13back.png","t13back.png",this.ClickBack,this,cc.p(75, 725),200);
    }
    return  this;
},

 onEnter:function()
{
this.setTouchEnabled(true);
    cc.AudioEngine.getInstance().playEffect(FollowMeAudio);
    this.onEnter();
},

 onExit:function()
{
this.setTouchEnabled(false);
    this.onExit();
},

onTouchesBegan:function(touches,event)
{
    
    return true;
},

onTouchesEnded:function(touches,event)
{
    var location =touches[0].getLocation();
    
    if (cc.Rect.CCRectContainsPoint(LionPlayer.getBoundingBoxToWorld(), location))
    {
        cc.AudioEngine.getInstance().playEffect(PubBtnClickAudio);
        cc.Director.getInstance().replaceScene(LoadingLayer.initWithTargetLayer(_U6FollowReadLayerLeft));
    }
    if (cc.Rect.CCRectContainsPoint(catPlayer.getBoundingBoxToWorld(), location))
    {
        cc.AudioEngine.getInstance().playEffect(PubBtnClickAudio);
        cc.Director.getInstance().replaceScene(LoadingLayer.initWithTargetLayer(_U6FollowReadLayerRight));
    }
},

dealloc:function()
{
    cc.TextureCache.sharedTextureCache().removeUnusedTextures();
    this.dealloc();
}
})
