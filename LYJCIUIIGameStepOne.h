//
//  LYJCIUIIGameStepOne.h
//  math_kg
//
//  Created by lili on 13-6-6.
//
//

#ifndef math_kg_LYJCIUIIGameStepOne_h
#define math_kg_LYJCIUIIGameStepOne_h

#include "cocos2d.h"
#include "cocos-ext.h"
#include "../../pubTools/SKGameBasicLayer.h"
// 131icon game
using namespace cocos2d;
using namespace cocos2d::extension;


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
