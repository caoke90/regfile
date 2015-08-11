//
//  SnowBallFightLayer.h
//  SnowBallFightLayer
//
//  Created by apple  on 12-12-10.
//
//

#import "cocos2d.h"
#import "sGameBaseLayer.h"


@interface aniSprite : CCSprite
@property(nonatomic,readwrite)CGPoint hidePosition;
@property(nonatomic,readwrite)CGPoint moveToPosition;
@property(nonatomic,readwrite)int count;
@property(nonatomic,readwrite)float delaySeconds;
@property(nonatomic,readwrite)float delaySeconds2;
@property(nonatomic,readwrite)int deadCount;
@end


@interface SnowBallFightLayer : sGameBaseLayer
{
    NSMutableArray* animals;
    NSMutableArray* balls;
    
    CCSprite* touchedSprite;
    NSMutableArray* points;
    
    CGPoint beginPos;
    
    
    float randomTime;
    
    BOOL timerFlag;
    
    
    CCSprite* snowBallWord;
    
    
}
+(CCScene*)scene;
@end
