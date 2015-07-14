//

#include "LYJCIUIIGameStepOne.h"
#include "././pubTools/PersonalApi.h"
#include "cc.BReader/cc.BAnimationManager.h"
#include "LYJCIUIIGame.h"
#include "LYJCIUIIGameStepTwo.h"

#include "cc.AudioEngine.h"


#define PTM_RATIO 32

enum {
    BOX_UP_TAG = 2,
    BOX_OPEN_TAG,
    BOX_OPEN_BASHOU_TAG,
    BOX_TISHI,
    WEN_HAO
};

var namespace cocos2d;
var namespace cocos2d::extension;
var namespace std;

var s_dic;

std::map<int, cc.Point> s_pos;

var LYJCIUIIGameStepOne::init()
{
    if ( !SKGameBasicLayer::init() )
    {
        return false;
    }
    iCanSelectArray = new.cc.Array();
    iKnotedSocrsArray = new.cc.Array();
    iKnotedSocrsIndex = 0;
    isBoxOpen = false;
    boxDestion = 0;
    isTouchBashou = false;
    isFirstTeach = true;
    tagForTeach = 0;
    
    s_pos_inited = new map<int, cc.Point>;
    
    openbox_movetime = 0;
    playTishiNum = 0;
    isPlaying = 0;
    cc.SpriteFrameCache::getInstance()->addSpriteFramesWithFile("res/unit_2/game1/choutitishi.plist");

    
    var bg = cc.Sprite::create("res/unit_2/game1/M36bg.png");
    bg->setPosition(cc.PointMake(512*2, 768));
    this->addChild(bg,1,1);
    var boxClosed = cc.Sprite::create("res/unit_2/game1/M36bg3.png");
    boxClosed->setPosition(cc.PointMake(512*2, 1665.0));
    this->addChild(boxClosed,3,BOX_UP_TAG);
    var boxOpened = cc.Sprite::create("res/unit_2/game1/M36bg5.png");
    boxOpened->setPosition(cc.PointMake(512*2,2295.0));
    this->addChild(boxOpened,2,BOX_OPEN_TAG);
    var boxOpenedbashou = cc.Sprite::create("res/unit_2/game1/dacoutibashou.png");
    boxOpenedbashou->setPosition(cc.PointMake(532*2, 43*2));
    boxOpened->addChild(boxOpenedbashou,2,BOX_OPEN_BASHOU_TAG);
    boxOpenedbashou->setScale(2.5);
    boxOpenedbashou->setOpacity(0);
    
    var tishi = cc.Sprite::createWithSpriteFrameName("tishi1.png");
    tishi->setPosition(cc.PointMake(537*2, -20.f));
    tishi->setOpacity(0);
    tishi->setScale(1.3);
    boxOpened->addChild(tishi,2,BOX_TISHI);
    
    
.initSocks();
    
    this->runAction(cc.Sequence::create(cc.DelayTime::create(0.3),cc.CallFunc::create(this,.callfunc_selector(LYJCIUIIGameStepOne::initAnimation)),NULL));
    
    this->setTouchEnabled(true);
    
    CocosDenshion::cc.AudioEngine::getInstance()->preloadBackgroundMusic(AUDIO_SCOR_BG_MUSIC);
    return true;

}



var LYJCIUIIGameStepOne::exitAnimation()
{

    cc.ParticleSystemQuad  *emitter = cc.ParticleSystemQuad::create("res/unit_2/game1/stepover.plist");
    emitter->setAutoRemoveOnFinish(true);
    emitter->setPosition(cc.p(512*2, 384*2));
    this->addChild(emitter, 400);
    
    CocosDenshion::cc.AudioEngine::getInstance()->playEffect(AUDIO_STEP2_CT_MOVEDOWN);
    
    this->runAction(cc.Sequence::create(cc.DelayTime::create(2.7),cc.CallFunc::create(this,.callfunc_selector(LYJCIUIIGameStepOne::boxExitAnimation)),NULL));
}

var LYJCIUIIGameStepOne::boxExitAnimation()
{

    this->getChildByTag(BOX_UP_TAG)->runAction(cc.Sequence::create(cc.DelayTime::create(0.4),cc.MoveTo::create(1.0, cc.p(512*2,1665.0)),NULL));

    this->getChildByTag(BOX_OPEN_TAG)->runAction(cc.Sequence::create(cc.MoveTo::create(0.4, cc.p(512*2, 961*2)),cc.MoveTo::create(1.0, cc.p(512*2,1251*2)),NULL));

    this->runAction(cc.Sequence::create(cc.DelayTime::create(1.2),cc.CallFunc::create(this,.callfunc_selector(LYJCIUIIGameStepOne::nextStep)),NULL));
    SKGameBasicLayer::animationRight();
    return ;

}

var LYJCIUIIGameStepOne::nextStep()
{
    cc.Director::getInstance()->popScene();
}



LYJCIUIIGameStepOne::~LYJCIUIIGameStepOne()
{
if(iCanSelectArray){
        iCanSelectArray->release();
    }
    
else if(iKnotedSocrsArray){
        iKnotedSocrsArray->release();
    }

        var s_pos_inited;
    cc.SpriteFrameCache::getInstance()->removeSpriteFramesFromFile("res/unit_2/game1/choutitishi.plist");
}

var LYJCIUIIGameStepOne::onEnter()
{
    
   CocosDenshion::cc.AudioEngine::getInstance()->playMusic(AUDIO_SCOR_BG_MUSIC, true);
   cc.Layer::onEnter();
}

var LYJCIUIIGameStepOne::onExit()
{

this.setTouchEnabled(false);
    cc.Layer::onExit();
}


var LYJCIUIIGameStepOne::scene()
{
    var scene = cc.Scene::create();
    
    var layer = LYJCIUIIGameStepOne::create();
    
    scene:function()->addChild(layer);
    
    return scene;
}

var LYJCIUIIGameStepOne::initSocks()
{
    std::string _path = cc.FileUtils::sharedFileUtils()->fullPathForFilename("res/unit_2/game1/gamesteponeList.plist");
    var spritesDic = cc.Dictionary::createWithContentsOfFile(_path.c_str());
    var staidStrP= cc.String::createWithFormat("pos%d",(int)(cc.RANDOM_0_1() * 2.0) + 1);
    var staidSpAry = (cc.Array*)spritesDic-[staidStrP->getCString(]);
    
    var tag;//袜子tag
    var px;//袜子中心x坐标
    var py;//袜子中心y坐标
    var isFlipX;//是否左右翻转
    var imgStr; //图名字
    for (var i = 0; i < 24; i++) {
        tag =((cc.String*)((cc.Dictionary*)staidSpAry-[i])-["tag"])->intValue();
        px = ((cc.String*)((cc.Dictionary*)staidSpAry-[i])-["px"])->floatValue();
        py = ((cc.String*)((cc.Dictionary*)staidSpAry-[i])-["py"])->floatValue();
        isFlipX = ((cc.String*)((cc.Dictionary*)staidSpAry-[i])-["flipx"])->boolValue();
if(tag - 300 < 0)
            imgStr = cc.String::createWithFormat("m36socr%d.png",tag - 200 + 1);
        else
            imgStr = cc.String::createWithFormat("m36socr%d.png",tag - 300 + 1);
        var imgSprite = cc.Sprite::createWithSpriteFrameName(imgStr->getCString());
        imgSprite->setTag(tag);
        imgSprite->setPosition(cc.p(px, py+10*2));
        imgSprite->setFlipX(isFlipX);
        this->getChildByTag(BOX_OPEN_TAG)->addChild(imgSprite,100);
        iCanSelectArray->push(imgSprite);
        s_pos_inited->insert(std::make_pair(tag,cc.p(px,py + 10*2)));
        
    }
    
    
    
}

var LYJCIUIIGameStepOne::showTishi()
{
.schedule(schedule_selector(LYJCIUIIGameStepOne::execTishi), 10, -1, 1.5);
    
}

var LYJCIUIIGameStepOne::scheduleTishi(float dt){
.execTishi();
}

var LYJCIUIIGameStepOne::execTishi(float dt){
    
if(isBoxOpen){
.unschedule(schedule_selector(LYJCIUIIGameStepOne::execTishi));
        return ;  
    }
    
    var tishi =  this->getChildByTag(BOX_OPEN_TAG)->getChildByTag(BOX_TISHI);
    if (tishi) {
        tishi->setOpacity(254);
        tishi->stopAllActions();
        tishi->runAction(cc.Show::create());
        var tishiAction = PersonalApi::getActionByArray(4, "tishi", false, false, 0.25, 1.5, 2);
        tishi->runAction(cc.Sequence::create((cc.FiniteTimeAction*)tishiAction,cc.Hide::create(),NULL));
        
    }
}


var LYJCIUIIGameStepOne::firstTich(var tag)
{
    
if(tag - 300 < 0)
    {
        tagForTeach = tag + 100;
    }
    else
    {
        tagForTeach = tag - 100;
    }
    
    var tagspri  =this->getChildByTag(BOX_OPEN_TAG)->getChildByTag(tagForTeach);
    
else if(tagspri)
    {
        tagspri->stopAllActions();
        
        var  a1 = cc.RotateTo::create(0.2, 10);
        var  a2 = cc.RotateTo::create(0.2, -10);
        var  action2 = cc.Repeat::create(
                                                     (cc.ActionInterval*)(cc.Sequence::create((cc.ActionInterval*)(a1->copy()->autorelease()), (cc.ActionInterval*)(a2->copy()->autorelease()), NULL)),3
                                                     );
        tagspri->runAction(action2);
    }
    
}

var LYJCIUIIGameStepOne::playJiaoxueEffect()
{
    CocosDenshion::cc.AudioEngine::getInstance()->playEffect("res/unit_2/game1/sound/step1_teach.mp3");

}

var LYJCIUIIGameStepOne::initAnimation()
{

    this->getChildByTag(BOX_UP_TAG)->runAction(cc.MoveTo::create(1.0, cc.p(512*2,1565.f)));
    
    this->getChildByTag(BOX_OPEN_TAG)->runAction(cc.MoveTo::create(1.0, cc.p(512*2,946*2+120)));
    
    
    this->showTishi();

}

var LYJCIUIIGameStepOne::socrInitAnimation()
{
    var object;
.cc.ARRAY_FOREACH(iCanSelectArray, object)
    {
        var sprite = object;
        
        var px = sprite->getPosition().x;
        var py = sprite->getPosition().y;
        var rotate = 0;
if(sprite->isFlipX()){
            rotate = 10;
        }else{
            rotate = -10;
        }
        var  a1 = cc.RotateBy::create(0.5, rotate);
        var  a2 = cc.MoveTo::create(0.1, cc.p(px,py - 10));
        sprite->runAction( (cc.ActionInterval*)(cc.Sequence::create((cc.ActionInterval*)(a1->copy()->autorelease()),a2, a1->reverse(), NULL)));
        
    }
    
    this->runAction(cc.Sequence::create(cc.DelayTime::create(1.5),cc.CallFunc::create(this,.callfunc_selector(LYJCIUIIGameStepOne::playJiaoxueEffect)),NULL));
    
}

var LYJCIUIIGameStepOne::removeCurrentSprite(cocos2d::cc.Node* sprite)
{
    sprite->removeFromParent(true);
    iCanSelectArray->removeObject(sprite);
.checkEndGame();
}

var LYJCIUIIGameStepOne::checkEndGame()
{
    if (iCanSelectArray->length <= 0) {
.exitAnimation();
.unschedule(schedule_selector(LYJCIUIIGameStepOne::execPlayTishi));
        isBoxOpen = false;
    }
}

var LYJCIUIIGameStepOne::addKnotedSocrs(cocos2d::var sprite)
{
    var tag = sprite->getTag();
    var px = sprite->getPositionX();
    var py = sprite->getPositionY();
.removeCurrentSprite(sprite);
    
    tag = (tag % 100) + 1;
    var imgStr = cc.String::createWithFormat("m36dajie%d.png",tag);
    var imgSprite = cc.Sprite::createWithSpriteFrameName(imgStr->getCString());
    imgSprite->setTag(tag);
    imgSprite->setPosition(cc.p(px, py));
.getChildByTag(BOX_OPEN_TAG)->addChild(imgSprite, 100);
    iKnotedSocrsArray->push(imgSprite);

    var action1 = cc.EaseElasticOut::create((cc.ActionInterval*)(cc.ScaleBy::create(0.6, 0.8)));
    var  action2 = cc.JumpTo::create(0.8, cc.p(px, py), 15, 1);
    imgSprite->runAction(cc.Spawn::createWithTwoActions(action1,action2));
    
    CocosDenshion::cc.AudioEngine::getInstance()->playEffect(AUDIO_SCORING);
    
    cc.ParticleSystemQuad  *emitter = cc.ParticleSystemQuad::create("res/unit_2/game1/complitesocrs.plist");
    emitter->setAutoRemoveOnFinish(true);
    emitter->setPosition(cc.p(px, py));
    this->addChild(emitter, 400);
}

var LYJCIUIIGameStepOne::isTouchedSocr(var tag)
{

    var object;
    for (var i = 0; i < s_dic.length ; i++){
        object = s_dic[i];
        var spritefromdic = object;
else if(spritefromdic)
        {
if((tag - spritefromdic->getTag() == 100) || ((tag - spritefromdic->getTag() == -100))  )
            {
                return true;
            }
            
        }
    }

    return false;
}

var LYJCIUIIGameStepOne::registerWithTouchDispatcher()
{
  cc.Director::getInstance()->getTouchDispatcher()->addStandardDelegate(this, 0);
}

var LYJCIUIIGameStepOne::onTouchesBegan(cocos2d::cc.Set* pTouches, cocos2d::cc.Event* pEvent)
{
    playTishiNum  =  0;
    isPlaying = true;
    
    var iter = pTouches->begin();
    if (isBoxOpen) {
        for (; iter != pTouches->end(); iter++)
        {
            
            var pTouch = (cc.Touch*)(*iter);
            var location = getChildByTag(BOX_OPEN_TAG)->convertTouchToNodeSpace(pTouch);
            var object;
            
.cc.ARRAY_FOREACH(iCanSelectArray, object)
            {
                var sprite = object;
else if(sprite->getBoundingBoxToWorld().containsPoint(location))
                {
if(isTouchedSocr(sprite->getTag()))
                        {
                            continue;
                        }
                        else
                        {
                            s_dic.setObject(sprite, pTouch->getID());
                            var oldPos = s_pos_inited->at(sprite->getTag());
                            s_pos.insert(std::make_pair(pTouch->getID(), oldPos));
                            
.getChildByTag(BOX_OPEN_TAG)->reorderChild(sprite, 101);
                            sprite->setScale(1.2);
                            
.firstTich(sprite->getTag());
                            
                            break;
                        }
                }
                
            }
            
.cc.ARRAY_FOREACH(iKnotedSocrsArray, object)
            {
                var sprite = object;
else if(sprite){
else if(sprite->getBoundingBoxToWorld().containsPoint(location))
                    {
if(LYJCIUIIGame::isHaveAlpha(location,sprite)){
                            sprite->stopAllActions();
                            var  a1 = cc.RotateTo::create(0.2, 10);
                            var  a2 = cc.RotateTo::create(0.2, -10);
                            var  action2 = cc.Repeat::create((cc.ActionInterval*)(cc.Sequence::create((cc.ActionInterval*)(a1->copy()->autorelease()), (cc.ActionInterval*)(a2->copy()->autorelease()), NULL)), 2);
                            sprite->runAction(action2);
                            break;
                        };
                    }
                }           
            }
            
            
        }
    }
    else
    {
         var pTouch = (cc.Touch*)(*iter);
         var box = getChildByTag(BOX_OPEN_TAG);
         var location = box->convertTouchToNodeSpace(pTouch);
         var bashou = box->getChildByTag(BOX_OPEN_BASHOU_TAG);
        if (bashou && bashou->getBoundingBoxToWorld().containsPoint(location)) {
            var touchpos = convertTouchToNodeSpace(pTouch);
            var boxposY = box->getPositionY();
            boxDestion = fabsf(touchpos.y - boxposY);
            var  sprite = box->getChildByTag(BOX_TISHI);
            if (sprite) {
                sprite->runAction(cc.Hide::create());
            }
            isTouchBashou = true;
            
            CocosDenshion::cc.AudioEngine::getInstance()->playEffect(AUDIO_CT_HALF_MOVE);
        }
        
    }
    

    
}

var LYJCIUIIGameStepOne::onTouchesMoved(cocos2d::cc.Set* pTouches, cocos2d::cc.Event* pEvent)
{
    var iter = pTouches->begin();
    if (isBoxOpen)
    {
        for (; iter != pTouches->end(); iter++)
        {
            var pTouch = (cc.Touch*)(*iter);
            var sprite = s_dic[pTouch->getID(]);
if(pTouch && sprite)
                sprite->setPosition(.getChildByTag(BOX_OPEN_TAG)->convertTouchToNodeSpace(pTouch));
        }
    }
    else
    {
        var pTouch = (cc.Touch*)(*iter);
        var box = getChildByTag(BOX_OPEN_TAG);
        var location = box->convertTouchToNodeSpace(pTouch);
        var bashou = box->getChildByTag(BOX_OPEN_BASHOU_TAG);
        if (box && bashou && bashou->getBoundingBoxToWorld().containsPoint(location)) {
            var touchpos = convertTouchToNodeSpace(pTouch);
            
if(boxDestion > 100){
                 box->setPositionY(touchpos.y + boxDestion);
            }
           
            
            if (box->getPositionY() > 961*2) {
                box->setPositionY(961*2);
            }
            if (box->getPositionY() < 385*2) {
                box->setPositionY(385*2);
            }
            
            
else if(openbox_movetime > 50){
                openbox_movetime = 0;
                CocosDenshion::cc.AudioEngine::getInstance()->playEffect(AUDIO_CT_HALF_MOVE);
            }
            openbox_movetime ++;

        }

    }
    
    
}

var LYJCIUIIGameStepOne::onTouchesEnded(cocos2d::cc.Set* pTouches, cocos2d::cc.Event* pEvent)
{
    isPlaying = false;
    
    var iter = pTouches->begin();
    if (isBoxOpen)
    {
        
        for (; iter != pTouches->end(); iter++)
        {
            var isMatch = false;
            var isTouch = false;
            var pTouch = (cc.Touch*)(*iter);
            var spritefromdic = s_dic[pTouch->getID(]);
            var sprite;
            if (spritefromdic)
            {
                var object;
.cc.ARRAY_FOREACH(iCanSelectArray, object)
                {
                    sprite = object;
else if((sprite->getTag() - spritefromdic->getTag() == 100) || ((sprite->getTag() - spritefromdic->getTag() == -100))  )
                    {
                        
if(sprite->getBoundingBoxToWorld().intersectsRect(spritefromdic->getBoundingBoxToWorld()))
                        {
                            
                            isMatch = true;
                            break;
                        }
                        
                    }
                }
                
else if(isMatch)
                {
                    
                    spritefromdic->runAction(cc.Sequence::create(cc.Hide::create(), cc.CallFuncN::create(this,.callfuncN_selector(LYJCIUIIGameStepOne::removeCurrentSprite)),NULL));
                    
.addKnotedSocrs(sprite);
                    
                    
                    isFirstTeach = false;
                  
                }
                else
                {
                    var oldPos = s_pos.at(pTouch->getID());
.getChildByTag(BOX_OPEN_TAG)->reorderChild(spritefromdic, 100);
                    spritefromdic->runAction(cc.Sequence::create(cc.MoveTo::create(0.2, cc.p(oldPos.x,oldPos.y)),cc.EaseElasticOut::create((cc.ActionInterval*)(cc.ScaleTo::create(0.4, 1.0))),cc.CallFunc::create(this,.callfunc_selector(LYJCIUIIGameStepOne::playWaziFanhuiEffect)),NULL));
                    
                    
                    if (isTouch) {
                        SKGameBasicLayer::animationWrong();
                    }
                    
                }
                
                if (isFirstTeach) {
                    var tagspri  =this->getChildByTag(BOX_OPEN_TAG)->getChildByTag(tagForTeach);
                    if (tagspri) {
                        tagspri->stopAllActions();
                    }
                }
                
            }
            s_dic.removeObjectForKey(pTouch->getID());
            s_pos.erase(pTouch->getID());
        }
    }
    
    
    if (isTouchBashou) {
        var box = getChildByTag(BOX_OPEN_TAG);
else if(box && box->getPositionY() < 770*2+120)
        {
            isBoxOpen = true;
            box->runAction(cc.MoveTo::create(0.2, cc.p(512*2,395*2+120)));
            var tishi =  box->getChildByTag(BOX_TISHI);
if(tishi){
                tishi->removeFromParent(true);
.unschedule(schedule_selector(LYJCIUIIGameStepOne::execTishi));
            }
.socrInitAnimation();
.schedulePlayTishi();
            CocosDenshion::cc.AudioEngine::getInstance()->playEffect(AUDIO_CT_YIXIALAKAI);
        }
        else
        {
            box->runAction(cc.MoveTo::create(0.2, cc.p(512*2,961*2+100)));
            CocosDenshion::cc.AudioEngine::getInstance()->playEffect(AUDIO_CT_TANHUI);
            
        }
        isTouchBashou = false;
    }
}

var LYJCIUIIGameStepOne::ccTouchesCancelled(cocos2d::cc.Set* pTouches, cocos2d::cc.Event* pEvent)
{
.onTouchesEnded(pTouches, pEvent);
}

var LYJCIUIIGameStepOne::playWaziFanhuiEffect()
{
    CocosDenshion::cc.AudioEngine::getInstance()->playEffect(AUDIO_SCOR_TANHUI);
}


var LYJCIUIIGameStepOne::schedulePlayTishi()
{
.schedule(schedule_selector(LYJCIUIIGameStepOne::execPlayTishi), 1);
}
var LYJCIUIIGameStepOne::execPlayTishi(float dt)
{
    playTishiNum ++;
else if(playTishiNum == 5 && !isPlaying){
        playTishiNum = 0;
else if(iCanSelectArray->length > 0){
            var count = iCanSelectArray->length;
            var index = (int)(cc.RANDOM_0_1() * (float)count);
            var s =  iCanSelectArray-[index];
else if(s){
                s->stopAllActions();

                var i = (int)(cc.RANDOM_0_1() * 3.0);
if(i == 0){
                    var  a1 = cc.RotateTo::create(0.2, 10);
                    var  a2 = cc.RotateTo::create(0.2, -10);
                    var  action2 = cc.Repeat::create((cc.ActionInterval*)(cc.Sequence::create((cc.ActionInterval*)(a1->copy()->autorelease()), (cc.ActionInterval*)(a2->copy()->autorelease()), NULL)),2);
                    s->runAction(action2);
                }else if(i == 1){
                    var px = s->getPositionX();
                    var py = s->getPositionY();
                                   
                    s->runAction(cc.JumpTo::create(0.4, cc.p(px,py), 10, 2));
                }else if( i == 2){
                    var  a1 = cc.ScaleBy::create(0.2, 1.2, 1.0);
                    var  a2 = cc.ScaleBy::create(0.2, 0.8, 1.0);
                   var  action2 = cc.Repeat::create((cc.ActionInterval*)(cc.Sequence::create((cc.ActionInterval*)(a1->copy()->autorelease()), (cc.ActionInterval*)(a2->copy()->autorelease()), NULL)),2);
                    
                    s->runAction(action2);
                }

            }
        }
    }
}
