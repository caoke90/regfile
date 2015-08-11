//
//  FollowMainLayer.h
//  house
//
//  Created by jesson on 12-11-1.
//  Copyright 2012年 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "cocos2d.h"

#define FollowMeAudio @"titlefollowme.mp3"
@interface FollowMainLayer : CCLayer
{
    CCSprite *LionPlayer;
    CCSprite *catPlayer;
}
+(CCScene *) scene;

@end
