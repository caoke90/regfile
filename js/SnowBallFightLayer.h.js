//

// "cocos2d.h"
// "sGameBaseLayer.h"


interface aniSprite : cc.Sprite
property(nonatomic,readwrite)CGPovar hidePosition;
property(nonatomic,readwrite)CGPovar moveToPosition;
property(nonatomic,readwrite)var count;
property(nonatomic,readwrite)float delaySeconds;
property(nonatomic,readwrite)float delaySeconds2;
property(nonatomic,readwrite)var deadCount;
end


interface SnowBallFightLayer : sGameBaseLayer
{
    var animals;
    var balls;
    
    var touchedSprite;
    var points;
    
    var beginPos;
    
    
    var randomTime;
    
    var timerFlag;
    
    
    var snowBallWord;
    
    
}scene;
end
