//

#ifndef math_kg_LYJCIUIIGameStepOne_h
#define math_kg_LYJCIUIIGameStepOne_h

#include "cocos2d.h"
#include "cocos-ext.h"
#include "././pubTools/SKGameBasicLayer.h"
var namespace cocos2d;
var namespace cocos2d::extension;


var LYJCIUIIGameStepOne: public SKGameBasicLayer
{
public:
.CREATE_FUNC(LYJCIUIIGameStepOne);
    var bool.init();
    ~LYJCIUIIGameStepOne();
    var cocos2d::cc.Scene*.scene();
    var.initSocks();//初始化袜子 有两种位子
    var.initAnimation();//开场动画
    var.exitAnimation();//离场动画
    var.boxExitAnimation();//盒子退出动画
    var.checkEndGame();//检查游戏是否结束
    var.nextStep();//进入下一步
    var.firstTich(var tag);//教学提示
    var .registerWithTouchDispatcher();
    var .onTouchesBegan(cocos2d::cc.Set* pTouches, cocos2d::cc.Event* pEvent);
    var .onTouchesMoved(cocos2d::cc.Set* pTouches, cocos2d::cc.Event* pEvent);
    var .onTouchesEnded(cocos2d::cc.Set* pTouches, cocos2d::cc.Event* pEvent);
    var .ccTouchesCancelled(cocos2d::cc.Set* pTouches, cocos2d::cc.Event* pEvent);

    var .onEnter();
    var .onExit();
    var.removeCurrentSprite(cc.Node* sprite);//移除移动的单子袜子
    var.addKnotedSocrs(var sprite);//添加打结的袜子
    var.isTouchedSocr(var tag);//检查是否触摸到袜子
    var.socrInitAnimation();//大箱子到位的盒子内袜子动画
    
    var.playJiaoxueEffect();//教学音效
    var.playWaziFanhuiEffect();//袜子返回的音效

    
    var.showTishi();//开启5秒计时
    var.scheduleTishi(float dt = 0.0);//计算器执行
    var.execTishi(float dt = 0.0);   //箭头的动画
    
    var.schedulePlayTishi();//开启5秒计时
    var.execPlayTishi(float dt = 0.0);//玩耍提示

private:

    cocos2d::cc.Array* iCanSelectArray;//单子袜子的数组
    cocos2d::cc.Array* iKnotedSocrsArray;//打结袜子数组

    var iKnotedSocrsIndex;//动画指数
    var isBoxOpen;//抽屉是否打开
    var boxDestion;//触摸点到抽屉位置的距离
    var isTouchBashou;//是否触摸到把手
    var isFirstTeach;//教学提示
    var tagForTeach;
    
    std::map<int, cc.Point> *s_pos_inited;

    var openbox_movetime;//移动的声音判断
    var playTishiNum;//没有操作计时
    var isPlaying; //是否在进行操作
};

#endif
