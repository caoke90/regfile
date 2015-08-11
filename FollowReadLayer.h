//
//  FollowReadLayer.h
//  house
//
//  Created by jesson on 12-10-29.
//  Copyright 2012年 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "cocos2d.h"
#import "AudioManager.h"
#import "U6GameBaseLayer.h"

#define TouchThreePoint  3

#define YellowPen 1
#define RedPen  2

#define Green    4
#define Eraser   5

#define BookTag   6
#define LeftPicTag   7
#define RightPicTag   8
#define LionPicTag   9
#define TurnPageTag   10
#define RadioTag   11
#define NextTag   12
#define LastTag   13

#define T10BgMusic         @"t10bgmusic.mp3"
#define T10ClickEraser     @"t10clickeraser.wav"
#define T10ClickPen         @"t10clickpen.wav"
#define T10CatChange     @"t10catchange.wav"
#define T10CatShake         @"t10catshake.wav"
#define T10CatWait            @"t10catwait.wav"
#define T10Page                @"t10page.wav"
#define T10LionMakeFace  @"t10lion1.wav"
#define T10LionLike            @"t10lion2.wav"
#define T10LionAngry           @"t10lion3.wav"
#define T10GenDu               @"t10gendu"

@interface FollowReadLayer : U6GameBaseLayer<AnimationPlayDelegate,AnimationRecordDelegate,PlayProtocol>
{
    CCSprite *LionPlayer;
    int touchNum;
    float animationTime;
    
    AudioManager *audioManager;
    id speakAction;
    id listenAction;
    id waitAction;
    BOOL isSpeaking;
    BOOL isListening;
    
    int m_animaltag;
    int CurrentPagNum;
    int SumPageNum;
    NSArray *leftImage;
    NSArray *rightImage;
    
    CGPoint startPosition;
    
    NSMutableArray *penArray;
    NSString *animalNameImg;

    NSDate *lastClickDate;
    BOOL isalwaysClick;
    AVAudioPlayer *player;
    NSArray *audioArray;
    id pointOneAction;
    BOOL isReadWord;
    BOOL isLionStart;
}
@property(nonatomic,retain) NSDate *lastClickDate;
@property(nonatomic,retain)  id waitAction;
+(CCScene *) scene;
-(id)init:(int)animaltag;
@end
