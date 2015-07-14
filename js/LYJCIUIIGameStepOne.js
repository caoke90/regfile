//
//  LYJCIUIIGameStepOne.h
//  math_kg
//
//  Created by lili on 13-6-6.
//
//


// 131icon game


class LYJCIUIIGameStepOne
{
public:
    CREATE_FUNC(LYJCIUIIGameStepOne);
    virtual bool init();
    ~LYJCIUIIGameStepOne();
    static cocos2d::CCScene* scene();
    void initSocks();//初始化袜子 有两种位子
    void initAnimation();//开场动画
    void exitAnimation();//离场动画
    void boxExitAnimation();//盒子退出动画
    void checkEndGame();//检查游戏是否结束
    void nextStep();//进入下一步
    void firstTich(int tag);//教学提示
    //触屏事件的重写
    virtual void registerWithTouchDispatcher(void);
    virtual void ccTouchesBegan(cocos2d::CCSet *pTouches, cocos2d::CCEvent *pEvent);
    virtual void ccTouchesMoved(cocos2d::CCSet *pTouches, cocos2d::CCEvent *pEvent);
    virtual void ccTouchesEnded(cocos2d::CCSet *pTouches, cocos2d::CCEvent *pEvent);
    virtual void ccTouchesCancelled(cocos2d::CCSet *pTouches, cocos2d::CCEvent *pEvent);

    virtual void onEnter();
    virtual void onExit();
    void removeCurrentSprite(CCNode *sprite);//移除移动的单子袜子
    void addKnotedSocrs(CCSprite *sprite);//添加打结的袜子
    bool isTouchedSocr(int tag);//检查是否触摸到袜子
    void socrInitAnimation();//大箱子到位的盒子内袜子动画
    
    void playJiaoxueEffect();//教学音效
    void playWaziFanhuiEffect();//袜子返回的音效

    
    void showTishi();//开启5秒计时
    void scheduleTishi(float dt = 0.0f);//计算器执行
    void execTishi(float dt = 0.0f);   //箭头的动画
    
    void schedulePlayTishi();//开启5秒计时
    void execPlayTishi(float dt = 0.0f);//玩耍提示

private:

    cocos2d::CCArray *iCanSelectArray;//单子袜子的数组
    cocos2d::CCArray *iKnotedSocrsArray;//打结袜子数组

    int iKnotedSocrsIndex;//动画指数
    bool isBoxOpen;//抽屉是否打开
    float boxDestion;//触摸点到抽屉位置的距离
    bool isTouchBashou;//是否触摸到把手
    bool isFirstTeach;//教学提示
    int tagForTeach;
    
    std::map<int, CCPoint> *s_pos_inited;

    int openbox_movetime;//移动的声音判断
    int playTishiNum;//没有操作计时
    bool isPlaying; //是否在进行操作
};

#endif
﻿//
//  LYJCIUIIGameStepOne.cpp
//  math_kg
//
//  Created by lili on 13-6-6.
//
//

#include "LYJCIUIIGameStepOne.h"
#include "../../pubTools/PersonalApi.h"
#include "CCBReader/CCBAnimationManager.h"
#include "LYJCIUIIGame.h"
#include "LYJCIUIIGameStepTwo.h"

#include "SimpleAudioEngine.h"


#define PTM_RATIO 32

enum {
    BOX_UP_TAG = 2,
    BOX_OPEN_TAG,
    BOX_OPEN_BASHOU_TAG,
    BOX_TISHI,
    WEN_HAO
};

using namespace cocos2d;
using namespace cocos2d::extension;
using namespace std;

CCDictionary s_dic;

std::map<int, CCPoint> s_pos;

bool LYJCIUIIGameStepOne::init()
{
    if ( !SKGameBasicLayer::init() )
    {
        return false;
    }
    iCanSelectArray = new CCArray();
    iKnotedSocrsArray = new CCArray();
    iKnotedSocrsIndex = 0;
    isBoxOpen = false;
    boxDestion = 0;
    isTouchBashou = false;
    isFirstTeach = true;
    tagForTeach = 0;
    
    s_pos_inited = new map<int, CCPoint>;
    
    openbox_movetime = 0;
    playTishiNum = 0;
    isPlaying = 0;
    //打包的图片
    CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("res/unit_2/game1/choutitishi.plist");

//    SKGameBasicLayer::getLionSpr()->setPositionX(1400);
    
    CCSprite *bg = CCSprite::create("res/unit_2/game1/M36bg.png");
    bg->setPosition(CCPointMake(512*2, 768));
    this->addChild(bg,1,1);
    //关闭的抽屉
    CCSprite *boxClosed = CCSprite::create("res/unit_2/game1/M36bg3.png");
    boxClosed->setPosition(CCPointMake(512*2, 1665.0));
    this->addChild(boxClosed,3,BOX_UP_TAG);
    //抽屉
    CCSprite *boxOpened = CCSprite::create("res/unit_2/game1/M36bg5.png");
    boxOpened->setPosition(CCPointMake(512*2,2295.0));
    this->addChild(boxOpened,2,BOX_OPEN_TAG);
    //抽屉把手
    CCSprite *boxOpenedbashou = CCSprite::create("res/unit_2/game1/dacoutibashou.png");
    boxOpenedbashou->setPosition(CCPointMake(532*2, 43*2));
    boxOpened->addChild(boxOpenedbashou,2,BOX_OPEN_BASHOU_TAG);
    boxOpenedbashou->setScale(2.5);
    boxOpenedbashou->setOpacity(0);
    
    //提示
    CCSprite *tishi = CCSprite::createWithSpriteFrameName("tishi1.png");
    tishi->setPosition(CCPointMake(537*2, -20.f));
    tishi->setOpacity(0);
    tishi->setScale(1.3);
    boxOpened->addChild(tishi,2,BOX_TISHI);
    
    //问号
//    CCMenuItemSprite *wenhao = CCMenuItemSprite::create(CCSprite::create("warning_tolearn.png"), CCSprite::create("warning_tolearn.png"), this, menu_selector(LYJCIUIIGameStepOne::toStepOneTeach));
//    CCMenu *wenhaoMenu = CCMenu::createWithItem(wenhao);
//    wenhaoMenu->setPosition(CCPointMake(960, 713));
//    this->addChild(wenhaoMenu,500,WEN_HAO);
    
    //初始化所有的袜子
    initSocks();
    
    this->runAction(CCSequence::create(CCDelayTime::create(0.3),CCCallFunc::create(this, callfunc_selector(LYJCIUIIGameStepOne::initAnimation)),NULL));
    
    this->setTouchEnabled(true);
    
    CocosDenshion::SimpleAudioEngine::sharedEngine()->preloadBackgroundMusic(AUDIO_SCOR_BG_MUSIC);
    return true;

}



void LYJCIUIIGameStepOne::exitAnimation()
{

    //粒子效果
    CCParticleSystemQuad  *emitter = CCParticleSystemQuad::create("res/unit_2/game1/stepover.plist");
    emitter->setAutoRemoveOnFinish(true);
    emitter->setPosition(ccp(512*2, 384*2));
    this->addChild(emitter, 400);
    
    CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect(AUDIO_STEP2_CT_MOVEDOWN);
    
    this->runAction(CCSequence::create(CCDelayTime::create(2.7),CCCallFunc::create(this, callfunc_selector(LYJCIUIIGameStepOne::boxExitAnimation)),NULL));
}

void LYJCIUIIGameStepOne::boxExitAnimation()
{

    this->getChildByTag(BOX_UP_TAG)->runAction(CCSequence::create(CCDelayTime::create(0.4f),CCMoveTo::create(1.0f, ccp(512*2,1665.0)),NULL));

    //关闭的抽屉
    this->getChildByTag(BOX_OPEN_TAG)->runAction(CCSequence::create(CCMoveTo::create(0.4f, ccp(512*2, 961*2)),CCMoveTo::create(1.0f, ccp(512*2,1251*2)),NULL));

    this->runAction(CCSequence::create(CCDelayTime::create(1.2f),CCCallFunc::create(this, callfunc_selector(LYJCIUIIGameStepOne::nextStep)),NULL));
    SKGameBasicLayer::animationRight();
    return ;

}

void LYJCIUIIGameStepOne::nextStep()
{
//    CCScene* pScene = CCTransitionCrossFade::create(1.2f,SKGameMenu::scene());
//    if (pScene)
//    {
//        CCDirector::sharedDirector()->replaceScene(pScene);
//    }
    CCDirector::sharedDirector()->popScene();
}



LYJCIUIIGameStepOne::~LYJCIUIIGameStepOne()
{
    if(iCanSelectArray){
        iCanSelectArray->release();
    }
    
    if(iKnotedSocrsArray){
        iKnotedSocrsArray->release();
    }

//    if(LYJCIUIIGame::ReleaseMap(s_pos_inited))
//    {
        delete s_pos_inited;
//    }
    CCSpriteFrameCache::sharedSpriteFrameCache()->removeSpriteFramesFromFile("res/unit_2/game1/choutitishi.plist");
}

void LYJCIUIIGameStepOne::onEnter()
{
    
   CocosDenshion::SimpleAudioEngine::sharedEngine()->playBackgroundMusic(AUDIO_SCOR_BG_MUSIC, true);
   CCLayer::onEnter();
}

void LYJCIUIIGameStepOne::onExit()
{

    CCDirector::sharedDirector()->getTouchDispatcher()->removeDelegate(this);
    CCLayer::onExit();
}


CCScene* LYJCIUIIGameStepOne::scene()
{
    // 'scene' is an autorelease object
    CCScene *scene = CCScene::create();
    
    // 'layer' is an autorelease object
    LYJCIUIIGameStepOne *layer = LYJCIUIIGameStepOne::create();
    
    // add layer as a child to scene
    scene->addChild(layer);
    
    // return the scene
    return scene;
}

//初始化袜子
void LYJCIUIIGameStepOne::initSocks()
{
    //取坐标信息
    std::string _path = CCFileUtils::sharedFileUtils()->fullPathForFilename("res/unit_2/game1/gamesteponeList.plist");
    CCDictionary* spritesDic = CCDictionary::createWithContentsOfFile(_path.c_str());
    CCString *staidStrP= CCString::createWithFormat("pos%d",(int)(CCRANDOM_0_1() * 2.0) + 1);
    CCArray *staidSpAry = (CCArray*)spritesDic->objectForKey(staidStrP->getCString());
//    CCLog("saaistrp:%s",staidStrP->getCString());
    
    int tag;//袜子tag
    int px;//袜子中心x坐标
    int py;//袜子中心y坐标
    bool isFlipX;//是否左右翻转
    CCString *imgStr; //图名字
    for (int i = 0; i < 24; i++) {
        tag =((CCString*)((CCDictionary*)staidSpAry->objectAtIndex(i))->objectForKey("tag"))->intValue();
        px = ((CCString*)((CCDictionary*)staidSpAry->objectAtIndex(i))->objectForKey("px"))->floatValue();
        py = ((CCString*)((CCDictionary*)staidSpAry->objectAtIndex(i))->objectForKey("py"))->floatValue();
        isFlipX = ((CCString*)((CCDictionary*)staidSpAry->objectAtIndex(i))->objectForKey("flipx"))->boolValue();
        if(tag - 300 < 0)
            imgStr = CCString::createWithFormat("m36socr%d.png",tag - 200 + 1);
        else
            imgStr = CCString::createWithFormat("m36socr%d.png",tag - 300 + 1);
//        CCLog("imgName:%s",imgStr->getCString());
        CCSprite *imgSprite = CCSprite::createWithSpriteFrameName(imgStr->getCString());
        imgSprite->setTag(tag);
        imgSprite->setPosition(ccp(px, py+10*2));
        imgSprite->setFlipX(isFlipX);
        this->getChildByTag(BOX_OPEN_TAG)->addChild(imgSprite,100);
        iCanSelectArray->addObject(imgSprite);
        s_pos_inited->insert(std::make_pair(tag,ccp(px,py + 10*2)));
        
    }
    
    
    
}

//开启5秒计时
void LYJCIUIIGameStepOne::showTishi()
{
    schedule(schedule_selector(LYJCIUIIGameStepOne::execTishi), 10, -1, 1.5);
    
}

//计时器执行
void LYJCIUIIGameStepOne::scheduleTishi(float dt){
    execTishi();
}

//箭头的动画
void LYJCIUIIGameStepOne::execTishi(float dt){
    
    if(isBoxOpen){
        unschedule(schedule_selector(LYJCIUIIGameStepOne::execTishi));
        return ;  
    }
    
    CCSprite* tishi = (CCSprite *) this->getChildByTag(BOX_OPEN_TAG)->getChildByTag(BOX_TISHI);
    if (tishi) {
        tishi->setOpacity(254);
        tishi->stopAllActions();
        tishi->runAction(CCShow::create());
        //提示动画
        CCAction *tishiAction = PersonalApi::getActionByArray(4, "tishi", false, false, 0.25, 1.5, 2);
        tishi->runAction(CCSequence::create((CCFiniteTimeAction*)tishiAction,CCHide::create(),NULL));
        
    }
}


void LYJCIUIIGameStepOne::firstTich(int tag)
{
    
    if(tag - 300 < 0)
    {
        tagForTeach = tag + 100;
    }
    else
    {
        tagForTeach = tag - 100;
    }
    
    //CCLog("seletect tag:%d",tag);
    CCSprite* tagspri  =(CCSprite*)this->getChildByTag(BOX_OPEN_TAG)->getChildByTag(tagForTeach);
    
    if(tagspri)
    {
        tagspri->stopAllActions();
        
        CCActionInterval*  a1 = CCRotateTo::create(0.2, 10);
        CCActionInterval*  a2 = CCRotateTo::create(0.2, -10);
        CCAction*  action2 = CCRepeat::create(
                                                     (CCActionInterval*)(CCSequence::create((CCActionInterval*)(a1->copy()->autorelease()), (CCActionInterval*)(a2->copy()->autorelease()), NULL)),3
                                                     );
        tagspri->runAction(action2);
    }
    
}

void LYJCIUIIGameStepOne::playJiaoxueEffect()
{
    CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect("res/unit_2/game1/sound/step1_teach.mp3");

}

void LYJCIUIIGameStepOne::initAnimation()
{

    this->getChildByTag(BOX_UP_TAG)->runAction(CCMoveTo::create(1.0f, ccp(512*2,1565.f)));
    
    this->getChildByTag(BOX_OPEN_TAG)->runAction(CCMoveTo::create(1.0f, ccp(512*2,946*2+120)));
    
    
    this->showTishi();

}

void LYJCIUIIGameStepOne::socrInitAnimation()
{
    CCObject *object;
    CCARRAY_FOREACH(iCanSelectArray, object)
    {
        CCSprite *sprite = (CCSprite *)object;
        
        float px = sprite->getPosition().x;
        float py = sprite->getPosition().y;
        float rotate = 0;
        if(sprite->isFlipX()){
            rotate = 10;
        }else{
            rotate = -10;
        }
        CCActionInterval*  a1 = CCRotateBy::create(0.5f, rotate);
        CCActionInterval*  a2 = CCMoveTo::create(0.1f, ccp(px,py - 10));
        sprite->runAction( (CCActionInterval*)(CCSequence::create((CCActionInterval*)(a1->copy()->autorelease()),a2, a1->reverse(), NULL)));
        
    }
    
    this->runAction(CCSequence::create(CCDelayTime::create(1.5f),CCCallFunc::create(this, callfunc_selector(LYJCIUIIGameStepOne::playJiaoxueEffect)),NULL));
    
}

void LYJCIUIIGameStepOne::removeCurrentSprite(cocos2d::CCNode *sprite)
{
    sprite->removeFromParentAndCleanup(true);
    iCanSelectArray->removeObject(sprite);
    //CCLog("iCanSelectArray->count:%d", iCanSelectArray->count());
    checkEndGame();
}

void LYJCIUIIGameStepOne::checkEndGame()
{
    if (iCanSelectArray->count() <= 0) {
        exitAnimation();
        unschedule(schedule_selector(LYJCIUIIGameStepOne::execPlayTishi));
        isBoxOpen = false;
    }
}

void LYJCIUIIGameStepOne::addKnotedSocrs(cocos2d::CCSprite *sprite)
{
    int tag = sprite->getTag();
    int px = sprite->getPositionX();
    int py = sprite->getPositionY();
    removeCurrentSprite(sprite);
    
    tag = (tag % 100) + 1;
    //CCLog("addKotedSocr Tag:%d ",tag);
    CCString *imgStr = CCString::createWithFormat("m36dajie%d.png",tag);
    CCSprite *imgSprite = CCSprite::createWithSpriteFrameName(imgStr->getCString());
    imgSprite->setTag(tag);
    imgSprite->setPosition(ccp(px, py));
    getChildByTag(BOX_OPEN_TAG)->addChild(imgSprite, 100);
    iKnotedSocrsArray->addObject(imgSprite);

    CCActionInterval* action1 = CCEaseElasticOut::create((CCActionInterval*)(CCScaleBy::create(0.6f, 0.8f)));
    CCActionInterval*  action2 = CCJumpTo::create(0.8f, ccp(px, py), 15, 1);
    imgSprite->runAction(CCSpawn::createWithTwoActions(action1,action2));
    
    CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect(AUDIO_SCORING);
    
    //粒子效果
    CCParticleSystemQuad  *emitter = CCParticleSystemQuad::create("res/unit_2/game1/complitesocrs.plist");
    emitter->setAutoRemoveOnFinish(true);
    emitter->setPosition(ccp(px, py));
    this->addChild(emitter, 400);
}

bool LYJCIUIIGameStepOne::isTouchedSocr(int tag)
{

    CCObject *object;
    for (int i = 0; i < s_dic.count() ; i++){
        object = s_dic.objectForKey(i);
        CCSprite *spritefromdic = (CCSprite *)object;
        //如果点到的不是透明区域
        if(spritefromdic)
        {
            //CCLog("from dic tag = %d , spr tag = %d", spritefromdic->getTag(),tag);
            //相同的袜子被选中
            if((tag - spritefromdic->getTag() == 100) || ((tag - spritefromdic->getTag() == -100))  )
            {
                return true;
            }
            
        }
    }

    return false;
}

void LYJCIUIIGameStepOne::registerWithTouchDispatcher(void)
{
  CCDirector::sharedDirector()->getTouchDispatcher()->addStandardDelegate(this, 0);
}

void LYJCIUIIGameStepOne::ccTouchesBegan(cocos2d::CCSet *pTouches, cocos2d::CCEvent *pEvent)
{
    //无操作提示 计数 回复
    playTishiNum  =  0;
    isPlaying = true;
    
    CCSetIterator iter = pTouches->begin();
    if (isBoxOpen) {
        for (; iter != pTouches->end(); iter++)
        {
            
            CCTouch* pTouch = (CCTouch*)(*iter);
            //CCLog("%d,%2f    2%f",pTouch->getID(),pTouch->getLocation().x,pTouch->getLocation().y);
            CCPoint location = getChildByTag(BOX_OPEN_TAG)->convertTouchToNodeSpace(pTouch);
            CCObject *object;
            
            //单击未选择的袜子
            CCARRAY_FOREACH(iCanSelectArray, object)
            {
                CCSprite *sprite = (CCSprite *)object;
                //如果点到的不是透明区域
                if(sprite->boundingBox().containsPoint(location))
                {
//                    if (LYJCIUIIGame::isHaveAlpha(location, sprite))
//                    {
                        if(isTouchedSocr(sprite->getTag()))
                        {
                            continue;
                        }
                        else
                        {
                            s_dic.setObject(sprite, pTouch->getID());
                            //s_pos.setObject(new ccp(sprite->getPositionX() , sprite->getPositionY()), pTouch->getID());
                            CCPoint oldPos = s_pos_inited->at(sprite->getTag());
                            s_pos.insert(std::make_pair(pTouch->getID(), oldPos));
                            
                            getChildByTag(BOX_OPEN_TAG)->reorderChild(sprite, 101);
                            sprite->setScale(1.2f);
                            
                            //第一次教学
//                            if (isFirstTeach) {
                                firstTich(sprite->getTag());
//                            }
                            
                            break;
                        }
//                    }
                }
                
            }
            
            //单击打结的袜子
            CCARRAY_FOREACH(iKnotedSocrsArray, object)
            {
                CCSprite *sprite = (CCSprite *)object;
                //如果点到的不是透明区域
                if(sprite){
                    if(sprite->boundingBox().containsPoint(location))
                    {
                        if(LYJCIUIIGame::isHaveAlpha(location,sprite)){
                            sprite->stopAllActions();
                            CCActionInterval*  a1 = CCRotateTo::create(0.2, 10);
                            CCActionInterval*  a2 = CCRotateTo::create(0.2, -10);
                            CCAction*  action2 = CCRepeat::create((CCActionInterval*)(CCSequence::create((CCActionInterval*)(a1->copy()->autorelease()), (CCActionInterval*)(a2->copy()->autorelease()), NULL)), 2);
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
         CCTouch* pTouch = (CCTouch*)(*iter);
         CCSprite* box = (CCSprite *)getChildByTag(BOX_OPEN_TAG);
         CCPoint location = box->convertTouchToNodeSpace(pTouch);
         CCSprite* bashou = (CCSprite *)box->getChildByTag(BOX_OPEN_BASHOU_TAG);
        if (bashou && bashou->boundingBox().containsPoint(location)) {
            //CCLog("bashouo....");
            CCPoint touchpos = convertTouchToNodeSpace(pTouch);
            float boxposY = box->getPositionY();
            boxDestion = fabsf(touchpos.y - boxposY);
            CCSprite * sprite = (CCSprite*)box->getChildByTag(BOX_TISHI);
            if (sprite) {
                sprite->runAction(CCHide::create());
            }
            isTouchBashou = true;
            
            CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect(AUDIO_CT_HALF_MOVE);
        }
        
    }
    

    
}

void LYJCIUIIGameStepOne::ccTouchesMoved(cocos2d::CCSet *pTouches, cocos2d::CCEvent *pEvent)
{
    CCSetIterator iter = pTouches->begin();
    if (isBoxOpen)
    {
        for (; iter != pTouches->end(); iter++)
        {
            CCTouch* pTouch = (CCTouch*)(*iter);
            CCSprite* sprite = (CCSprite*)s_dic.objectForKey(pTouch->getID());
            if(pTouch && sprite)
                sprite->setPosition( getChildByTag(BOX_OPEN_TAG)->convertTouchToNodeSpace(pTouch));
        }
    }
    else
    {
        CCTouch* pTouch = (CCTouch*)(*iter);
        CCSprite* box = (CCSprite *)getChildByTag(BOX_OPEN_TAG);
        CCPoint location = box->convertTouchToNodeSpace(pTouch);
        CCSprite* bashou = (CCSprite *)box->getChildByTag(BOX_OPEN_BASHOU_TAG);
        if (box && bashou && bashou->boundingBox().containsPoint(location)) {
            CCPoint touchpos = convertTouchToNodeSpace(pTouch);
            
            if(boxDestion > 100){
                 box->setPositionY(touchpos.y + boxDestion);
            }
           
//            CCLog("boxDestion:%f", boxDestion);
            
            if (box->getPositionY() > 961*2) {
                box->setPositionY(961*2);
            }
            if (box->getPositionY() < 385*2) {
                box->setPositionY(385*2);
            }
            
            
            if(openbox_movetime > 50){
                openbox_movetime = 0;
                CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect(AUDIO_CT_HALF_MOVE);
            }
            openbox_movetime ++;

            //CCLog("box posy= %.2f", box->getPositionY());
        }

    }
    
    
}

void LYJCIUIIGameStepOne::ccTouchesEnded(cocos2d::CCSet *pTouches, cocos2d::CCEvent *pEvent)
{
    //是否在操作
    isPlaying = false;
    
    CCSetIterator iter = pTouches->begin();
    if (isBoxOpen)
    {
        
        for (; iter != pTouches->end(); iter++)
        {
            bool isMatch = false;
            bool isTouch = false;
            CCTouch* pTouch = (CCTouch*)(*iter);
            CCSprite* spritefromdic = (CCSprite*)s_dic.objectForKey(pTouch->getID());
            CCSprite *sprite;
            if (spritefromdic)
            {
                CCObject *object;
                CCARRAY_FOREACH(iCanSelectArray, object)
                {
                    sprite = (CCSprite *)object;
                    if((sprite->getTag() - spritefromdic->getTag() == 100) || ((sprite->getTag() - spritefromdic->getTag() == -100))  )
                    {
                        
                        if(sprite->boundingBox().intersectsRect(spritefromdic->boundingBox()))
                        {
                            //CCLog("choose some socr! moving sprite tag:%d    taget sprite tag:%d",spritefromdic->getTag(),sprite->getTag() );
                            
                            isMatch = true;
                            break;
                        }
                        
                    }
                }
                
                if(isMatch)
                {
                    
                    //移除移动的只袜子
                    spritefromdic->runAction(CCSequence::create(CCHide::create(), CCCallFuncN::create(this, callfuncN_selector(LYJCIUIIGameStepOne::removeCurrentSprite)),NULL));
                    
                    //添加打结袜子
                    addKnotedSocrs(sprite);
                    
                    //
                    //SKGameBasicLayer::animationRight();
                    
                    //教学
                    isFirstTeach = false;
                  
                }
                else
                {
                    //回到以前的位置
                    //CCPoint *oldPos = (CCPoint*)s_pos.objectForKey(pTouch->getID());
                    CCPoint oldPos = s_pos.at(pTouch->getID());
                    getChildByTag(BOX_OPEN_TAG)->reorderChild(spritefromdic, 100);
                    spritefromdic->runAction(CCSequence::create(CCMoveTo::create(0.2, ccp(oldPos.x,oldPos.y)),CCEaseElasticOut::create((CCActionInterval*)(CCScaleTo::create(0.4, 1.0f))),CCCallFunc::create(this, callfunc_selector(LYJCIUIIGameStepOne::playWaziFanhuiEffect)),NULL));
                    
                    
                    if (isTouch) {
                        SKGameBasicLayer::animationWrong();
                    }
                    
                }
                
                //第一次教学完成
                if (isFirstTeach) {
                    //CCLog("setletct tag:%d",tagForTeach);
                    CCSprite* tagspri  =(CCSprite*)this->getChildByTag(BOX_OPEN_TAG)->getChildByTag(tagForTeach);
                    if (tagspri) {
                        tagspri->stopAllActions();
                    }
                }
                
            }
            s_dic.removeObjectForKey(pTouch->getID());
            //s_pos.removeObjectForKey(pTouch->getID());
            s_pos.erase(pTouch->getID());
        }
    }
    
    
    if (isTouchBashou) {
        //抽屉互动
        CCSprite* box = (CCSprite *)getChildByTag(BOX_OPEN_TAG);
        if(box && box->getPositionY() < 770*2+120)
        {
            isBoxOpen = true;
            box->runAction(CCMoveTo::create(0.2, ccp(512*2,395*2+120)));
            CCSprite* tishi = (CCSprite *) box->getChildByTag(BOX_TISHI);
            if(tishi){
                tishi->removeFromParentAndCleanup(true);
                unschedule(schedule_selector(LYJCIUIIGameStepOne::execTishi));
            }
            socrInitAnimation();
            schedulePlayTishi();
            CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect(AUDIO_CT_YIXIALAKAI);
        }
        else
        {
            box->runAction(CCMoveTo::create(0.2, ccp(512*2,961*2+100)));
            CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect(AUDIO_CT_TANHUI);
            
        }
        isTouchBashou = false;
    }
}

void LYJCIUIIGameStepOne::ccTouchesCancelled(cocos2d::CCSet *pTouches, cocos2d::CCEvent *pEvent)
{
    ccTouchesEnded(pTouches, pEvent);
}

void LYJCIUIIGameStepOne::playWaziFanhuiEffect()
{
    CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect(AUDIO_SCOR_TANHUI);
}


void LYJCIUIIGameStepOne::schedulePlayTishi()
{
    schedule(schedule_selector(LYJCIUIIGameStepOne::execPlayTishi), 1);
}
void LYJCIUIIGameStepOne::execPlayTishi(float dt)
{
    playTishiNum ++;
    if(playTishiNum == 5 && !isPlaying){
        playTishiNum = 0;
        if(iCanSelectArray->count() > 0){
            int count = iCanSelectArray->count();
            int index = (int)(CCRANDOM_0_1() * (float)count);
            CCSprite *s = (CCSprite *) iCanSelectArray->objectAtIndex(index);
            if(s){
                s->stopAllActions();

                int i = (int)(CCRANDOM_0_1() * 3.0);
                if(i == 0){
                    CCActionInterval*  a1 = CCRotateTo::create(0.2, 10);
                    CCActionInterval*  a2 = CCRotateTo::create(0.2, -10);
                    CCAction*  action2 = CCRepeat::create((CCActionInterval*)(CCSequence::create((CCActionInterval*)(a1->copy()->autorelease()), (CCActionInterval*)(a2->copy()->autorelease()), NULL)),2);
                    s->runAction(action2);
                }else if(i == 1){
                    int px = s->getPositionX();
                    int py = s->getPositionY();
                                   
                    s->runAction(CCJumpTo::create(0.4, ccp(px,py), 10, 2));
                }else if( i == 2){
                    CCActionInterval*  a1 = CCScaleBy::create(0.2, 1.2f, 1.0f);
                    CCActionInterval*  a2 = CCScaleBy::create(0.2, 0.8f, 1.0f);
                   CCAction*  action2 = CCRepeat::create((CCActionInterval*)(CCSequence::create((CCActionInterval*)(a1->copy()->autorelease()), (CCActionInterval*)(a2->copy()->autorelease()), NULL)),2);
                    
                    s->runAction(action2);
                }

            }
        }
    }
}
