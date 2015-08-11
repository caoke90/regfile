//
//  FollowMainLayer.m
//  house
//
//  Created by jesson on 12-11-1.
//  Copyright 2012年 __MyCompanyName__. All rights reserved.
//

#import "FollowMainLayer.h"
#import "PersonalApi.h"
#import "LoadingLayer.h"
#import "PublicApi_macro.h"
#import "SceneFourLayer.h"
#import "SceneThreeLayer.h"
@implementation FollowMainLayer

+(CCScene *) scene
{
	CCScene *scene = [CCScene node];
	FollowMainLayer *layer = [FollowMainLayer node];
	[scene addChild: layer];
    
	return scene;
}

-(void)addButton:(NSString *)Nimage andHimage:(NSString *)Himage Sel:(SEL)fun Target:(id)target Position:(CGPoint)p Tag:(int)btntag
{
    CCSprite* nsprite = [CCSprite spriteWithFile:Nimage];
    CCSprite* hsprite2 = [CCSprite spriteWithFile:Himage];
    
    CCMenuItemSprite * itemSprite=[CCMenuItemSprite itemWithNormalSprite:nsprite selectedSprite:hsprite2 target:target selector:fun];
    itemSprite.tag = btntag;
    
    CCMenu *myMenu = [CCMenu menuWithItems:itemSprite, nil];
    myMenu.tag = btntag;
    myMenu.position=ccp(p.x,p.y);
    [target addChild:myMenu];
}

-(void)ClickBack
{
    [[SimpleAudioEngine sharedEngine] playEffect:BaseBackAudio];
    [[SimpleAudioEngine sharedEngine] stopBackgroundMusic];
    [[SimpleAudioEngine sharedEngine] stopAllEffect];
    UnitName name =  [PersonalApi getAppInstance].unit;
    if ([PersonalApi getAppInstance].backLevel == 1) {
        //返回教学篇
        [[CCDirector sharedDirector] replaceScene:[SceneFourLayer initWithTargetLayer:name]];
        
    }else if ([PersonalApi getAppInstance].backLevel == 2) {
        //返回复习篇
        [[CCDirector sharedDirector] replaceScene:[SceneThreeLayer initWithTargetLayer:name]];
    }
}

-(id)init
{
    self = [super init];
    if (self)
    {
        //背景图片
        CCSprite *bg = [CCSprite spriteWithFile:@"t10menubg.png"];
        bg.position = ccp(512, 384);
        [self addChild:bg];
        
        LionPlayer = [CCSprite spriteWithFile:@"t10menulion.png"];
        LionPlayer.position = ccp(236, 211);
        [self addChild:LionPlayer];
        [LionPlayer runAction:[CCRepeatForever actionWithAction:[CCSequence actions:[CCScaleTo actionWithDuration:0.5 scale:1.05],[CCScaleTo actionWithDuration:0.5 scale:1.0], nil]]];
        
        catPlayer = [CCSprite spriteWithFile:@"t10menucat.png"];
        catPlayer.position = ccp(873, 152);
        [self addChild:catPlayer];
        [catPlayer runAction:[CCRepeatForever actionWithAction:[CCSequence actions:[CCScaleTo actionWithDuration:0.5 scale:1.05],[CCScaleTo actionWithDuration:0.5 scale:1.0], nil]]];
        
        CCSprite *word = [CCSprite spriteWithFile:@"t10menuword.png"];
        word.position = ccp(510, 526);
        [self addChild:word];
        [self addButton:@"t13back.png" andHimage:@"t13back.png" Sel:@selector(ClickBack) Target:self Position:ccp(75, 725) Tag:200];
    }
    return  self;
}
- (void) onEnter
{
    [[[CCDirector sharedDirector] touchDispatcher] addTargetedDelegate:self priority:0 swallowsTouches:YES];
    [[SimpleAudioEngine sharedEngine]playEffect:FollowMeAudio];
    [super onEnter];
}
- (void) onExit
{
    [[[CCDirector sharedDirector] touchDispatcher] removeDelegate:self];
    [super onExit];
}
-(BOOL)ccTouchBegan:(UITouch *)touch withEvent:(UIEvent *)event
{
    
    return YES;
}
- (void)ccTouchEnded:(UITouch *)touch withEvent:(UIEvent *)event
{
    CGPoint location = [touch locationInView: [touch view]];
    location = [[CCDirector sharedDirector] convertToGL: location];
    
    if (CGRectContainsPoint(LionPlayer.boundingBox, location))
    {
        [[SimpleAudioEngine sharedEngine] playEffect:PubBtnClickAudio];
        [[CCDirector sharedDirector] replaceScene:[LoadingLayer initWithTargetLayer:_U6FollowReadLayerLeft]];
    }
    if (CGRectContainsPoint(catPlayer.boundingBox, location))
    {
        [[SimpleAudioEngine sharedEngine] playEffect:PubBtnClickAudio];
        [[CCDirector sharedDirector] replaceScene:[LoadingLayer initWithTargetLayer:_U6FollowReadLayerRight]];
    }
}
-(void)dealloc
{
    [[CCTextureCache sharedTextureCache] removeUnusedTextures];
    [super dealloc];
}
@end
