//
//  FollowReadLayer.m
//  house
//
//  Created by jesson on 12-10-29.
//  Copyright 2012年 __MyCompanyName__. All rights reserved.
//

#import "FollowReadLayer.h"
#import "PersonalApi.h"
#import "PublicApi_macro.h"
#import "FollowMainLayer.h"

@implementation FollowReadLayer
@synthesize lastClickDate;
@synthesize waitAction;
+(CCScene *) scene
{
	CCScene *scene = [CCScene node];
	FollowReadLayer *layer = [FollowReadLayer node];
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

//狮子待机动作
-(void)Lion_Wait_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame];
    
    for(int i = 1; i <=3; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
    }
    
    CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame1];
    
    CCSpriteFrame *frame2 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame2];
    
    CCSpriteFrame *frame3 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,4]];
    [animFrames addObject:frame3];
    
    CCSpriteFrame *frame4 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,5]];
    [animFrames addObject:frame4];
    
    CCSpriteFrame *frame5 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,5]];
    [animFrames addObject:frame5];
    
    CCSpriteFrame *frame6 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,4]];
    [animFrames addObject:frame6];
    
    CCSpriteFrame *frame7 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame7];

    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *secene =[CCSequence actions:animate,nil];
    [sender runAction:secene];
}
//点三下动作
-(void)Lion_Touch_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame];
    
    for(int i = 1; i <=4; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
    }
    for(int i = 0; i <=2; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,5]];
        [animFrames addObject:frame];
        
        CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,6]];
        [animFrames addObject:frame1];
    }
    CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,4]];
    [animFrames addObject:frame1];
    
    CCSpriteFrame *frame2 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame2];
    
    CCSpriteFrame *frame3 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame3];
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *seq = [CCSequence actions:animate,nil];
    [sender runAction:seq];
}
//点一下动作
-(void)Lion_Catch_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame];
    
    CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame1];
    
    for(int i = 0; i <=3; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,2]];
        [animFrames addObject:frame];
        
        CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,3]];
        [animFrames addObject:frame1];
    }
     
    CCSpriteFrame *frame2 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame2];
    
    CCSpriteFrame *frame3 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame3];
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    pointOneAction= [CCSequence actions:animate,nil];
    [sender runAction:pointOneAction];
     [[SimpleAudioEngine sharedEngine] playEffect:T10LionLike];
}
//挤脸
-(void)Lion_Face_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame];
    
    CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame1];
    
    for(int i = 0; i <=3; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,2]];
        [animFrames addObject:frame];
        
        CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,3]];
        [animFrames addObject:frame1];
    }
    
    CCSpriteFrame *frame2 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame2];
    
    CCSpriteFrame *frame3 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame3];
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *seq = [CCSequence actions:animate,nil];
    [sender runAction:seq];
}
//说话
-(void)Lion_Speak_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    for(int i = 1; i <=7; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
        
    }
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.2f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    speakAction= [CCRepeatForever actionWithAction:[CCSequence actions:animate,nil]];
    [sender runAction:speakAction];
}
//听
-(void)BeginListen_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    for(int i = 1; i <=3; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
        
    }
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.2f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *secene = [CCSequence actions:animate,nil];
    [sender runAction:secene];
}
-(void)Lion_Listen_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    for(int i = 4; i <=6; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
        
    }
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.2f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    listenAction = [CCRepeatForever actionWithAction:[CCSequence actions:animate,nil]];
    [sender runAction:listenAction];
}

-(void)Lion_EndListen_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    for(int i = 3; i <=1; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
        
    }
    CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lion.png"]];
    [animFrames addObject:frame1];
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *sence =  [CCSequence actions:animate,nil];
    [sender runAction:sence];
}
-(void)Lion_Breath_Action:(NSString *)imageName imageCount:(int)num obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    for(int i = 1; i <=num; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
    }
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.2f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    self.waitAction = [CCRepeatForever actionWithAction:[CCSequence actions:[CCDelayTime actionWithDuration:1.0],animate,nil]];
    [sender runAction:waitAction];
}

//猫待机动作
-(void)Cat_Wait_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10catwait1.png"]];
    [animFrames addObject:frame];
    
    CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame1];
    
    CCSpriteFrame *frame2 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,2]];
    [animFrames addObject:frame2];
    
    for(int i = 0; i <= 2; i++)
    {
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,3]];
        [animFrames addObject:frame];
        
        CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,4]];
        [animFrames addObject:frame1];
    }
    
    CCSpriteFrame *frame3 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,2]];
    [animFrames addObject:frame3];
    CCSpriteFrame *frame4 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame4];
    CCSpriteFrame *frame5 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10catwait1.png"]];
    [animFrames addObject:frame5];
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *seq = [CCSequence actions:animate,nil];
    [sender runAction:seq];
}

-(void)Cat_WaitTwo_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10catwait1.png"]];
    [animFrames addObject:frame];
    
    CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame1];
    CCSpriteFrame *frame2 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,2]];
    [animFrames addObject:frame2];
    CCSpriteFrame *frame6 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,3]];
    [animFrames addObject:frame6];
    
    for(int i = 0; i <= 2; i++)
    {
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,4]];
        [animFrames addObject:frame];
        
        CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,5]];
        [animFrames addObject:frame1];
    }
    
    CCSpriteFrame *frame7 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,3]];
    [animFrames addObject:frame7];
    CCSpriteFrame *frame3 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,2]];
    [animFrames addObject:frame3];
    CCSpriteFrame *frame4 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame4];
    CCSpriteFrame *frame5 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10catwait1.png"]];
    [animFrames addObject:frame5];
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    self.waitAction = [CCRepeatForever actionWithAction:[CCSequence actions:[CCDelayTime actionWithDuration:1.0],animate,nil]];
    [sender runAction:waitAction];
}

//猫提示动作
-(void)Cat_Catch_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10catwait1.png"]];
    [animFrames addObject:frame];
    
    CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame1];
    
    CCSpriteFrame *frame2 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,2]];
    [animFrames addObject:frame2];
    
    for(int i = 0; i <= 3; i++)
    {
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,3]];
        [animFrames addObject:frame];
        
        CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,4]];
        [animFrames addObject:frame1];
    }
    
    CCSpriteFrame *frame3 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,2]];
    [animFrames addObject:frame3];
    CCSpriteFrame *frame4 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,1]];
    [animFrames addObject:frame4];
    CCSpriteFrame *frame5 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10catwait1.png"]];
    [animFrames addObject:frame5];
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    pointOneAction = [CCSequence actions:animate,nil];
    [sender runAction:pointOneAction];
      [[SimpleAudioEngine sharedEngine] playEffect:T10CatShake];
}
//点三下动作
-(void)Cat_Touch_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10catwait1.png"]];
    [animFrames addObject:frame];
    
    for(int i = 1; i <=6; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
    }
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *seq = [CCSequence actions:animate,[animate reverse],nil];
    [sender runAction:seq];
}

-(void)Cat_Listen_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    for(int i = 4; i <=8; i++)
    {
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
    }
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.2f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    listenAction = [CCRepeatForever actionWithAction:[CCSequence actions:animate,nil]];
    [sender runAction:listenAction];
}

//猫说话动作
-(void)Cat_Speak_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    for(int i = 1; i <=5; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
        
    }
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    speakAction= [CCRepeatForever actionWithAction:[CCSequence actions:animate,nil]];
    [sender runAction:speakAction];
}
//猫停止听
-(void)Cat_EndListen_Action:(NSString *)imageName  obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    
    for(int i = 3; i <=1; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
        
    }
    CCSpriteFrame *frame1 = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10catwait1.png"]];
    [animFrames addObject:frame1];
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.15f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *sence =  [CCSequence actions:animate,nil];
    [sender runAction:sence];
}

-(void)Btn_Action:(NSString *)imageName imageCount:(int)num obj:(id)sender
{
    NSMutableArray *animFrames = [NSMutableArray array];
    for(int i = 1; i <=num; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
    }
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.3f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *seq = [CCRepeatForever actionWithAction:animate];
    
    [sender runAction:seq];
}

-(BOOL)shouldPlayRadomAnimation
{
    if (isListening || isSpeaking || [LionPlayer numberOfRunningActions])
    {
        return NO;
    }
    else
    {
        return YES;
    }
}
-(void)BeginListenAction
{
    if (m_animaltag)
    {
         [self  BeginListen_Action:@"t10listen" obj:LionPlayer];
    }
   else
   {
        [self  BeginListen_Action:@"t10catlisten" obj:LionPlayer];
   }
}
-(void)ListeningAction
{
    if (m_animaltag)
    {
         [self Lion_Listen_Action:@"t10listen" obj:LionPlayer];
    }
   else
   {
       [self Cat_Listen_Action:@"t10catlisten" obj:LionPlayer];
   }
}
//AnimationRecordDelegate
-(void)readyToListen
{
    isReadWord = NO;
    if ([LionPlayer numberOfRunningActions] > 0)
    {
        [LionPlayer stopAllActions];
//        [LionPlayer setDisplayFrame:[[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:animalNameImg]];
    }
    [self runAction:[CCSequence actions:[CCCallFunc actionWithTarget:self selector:@selector(BeginListenAction)],[CCCallFunc actionWithTarget:self selector:@selector(ListeningAction)], nil]];
    isListening = YES;
}
-(void)startListion
{
//    if ([LionPlayer numberOfRunningActions] > 0)
//    {
//        [LionPlayer stopAllActions];
//    }
//    [self runAction:[CCSequence actions:[CCCallFunc actionWithTarget:self selector:@selector(BeginListenAction)],[CCCallFunc actionWithTarget:self selector:@selector(ListeningAction)], nil]];
//     isListening = YES;
}
-(void)endListion
{
     isListening = NO;
    [LionPlayer stopAllActions];
    [LionPlayer setDisplayFrame:[[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:animalNameImg]];
    if (m_animaltag)
    {
         [self Lion_EndListen_Action:@"t10listen" obj:LionPlayer];
    }
   else
   {
       [self Cat_EndListen_Action:@"t10catlisten" obj:LionPlayer];
   }
    isSpeaking = YES;
}
//AnimationPlayDelegate
-(void)startSpeak
{
     isSpeaking = YES;
    [LionPlayer stopAllActions];
    if (m_animaltag)
    {
         [self Lion_Speak_Action:@"t10speak" obj:LionPlayer];
    }
    else
    {
        [self Cat_Speak_Action:@"t10catspeak" obj:LionPlayer];
    }
}
-(void)stopSpeak
{
    [LionPlayer stopAction:speakAction];
    [LionPlayer setDisplayFrame:[[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:animalNameImg]];
    isSpeaking = NO;
    animationTime = 0;
    if (!isReadWord)
    {
        if (!isLionStart)
        {
            if (CurrentPagNum != SumPageNum-1)
            {
                [self Btn_Action:@"t10next" imageCount:2 obj:[self getChildByTag:NextTag]];
            }
            if (CurrentPagNum)
            {
                [self Btn_Action:@"t10back" imageCount:2 obj:[self getChildByTag:LastTag]];
            }
        }
    }
}
-(void)NextTurnPageEnd
{
    CCSprite *leftSprite = (CCSprite *)[self getChildByTag:LeftPicTag];
    [leftSprite setDisplayFrame:[[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[leftImage objectAtIndex:CurrentPagNum]]];
    CCSprite *turnpage = (CCSprite *)[self getChildByTag:TurnPageTag];
    turnpage.visible = NO;
    if (CurrentPagNum > 22 && CurrentPagNum < 29)
    {
        [self getChildByTag:LionPicTag].visible = YES;
        [(CCSprite *)[self getChildByTag:LionPicTag] setDisplayFrame:[[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lionsay%d.png",CurrentPagNum-4]]];
    }
    else
    {
        [self getChildByTag:LionPicTag].visible = NO;
    }
    [self runAction:[CCSequence actions:[CCDelayTime actionWithDuration:0.1],[CCCallFunc actionWithTarget:self selector:@selector(ReadWord)], nil]];
}
-(void)LastTurnPageEnd
{
    CCSprite *rightSprite = (CCSprite *)[self getChildByTag:RightPicTag];
    [rightSprite setDisplayFrame:[[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[rightImage objectAtIndex:CurrentPagNum]]];
    CCSprite *turnpage = (CCSprite *)[self getChildByTag:TurnPageTag];
    turnpage.visible = NO;
    if (CurrentPagNum > 22 && CurrentPagNum < 29)
    {
        [self getChildByTag:LionPicTag].visible = YES;
        [(CCSprite *)[self getChildByTag:LionPicTag] setDisplayFrame:[[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"t10lionsay%d.png",CurrentPagNum-4]]];
    }
    else
    {
        [self getChildByTag:LionPicTag].visible = NO;
    }
     [self runAction:[CCSequence actions:[CCDelayTime actionWithDuration:0.1],[CCCallFunc actionWithTarget:self selector:@selector(ReadWord)], nil]];
}
-(void)run_Action:(NSString *)imageName imageCount:(int)num obj:(id)sender backBook:(BOOL)isback
{
    NSMutableArray *animFrames = [NSMutableArray array];
    for(int i = 1; i <=num; i++)
    {
        
        CCSpriteFrame *frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",imageName,i]];
        [animFrames addObject:frame];
    }
    
    CCAnimation *animation = [CCAnimation animationWithSpriteFrames:animFrames delay:0.05f];
    CCAnimate* animate = [CCAnimate actionWithAnimation:animation];
    
    CCSequence *seq = nil;
    if (isback)
    {
        seq = [CCSequence actions:[animate reverse],[CCCallFunc actionWithTarget:self selector:@selector(LastTurnPageEnd)], nil];
    }
    else
    {
        seq = [CCSequence actions:animate,[CCCallFunc actionWithTarget:self selector:@selector(NextTurnPageEnd)], nil];
    }
    [sender runAction:seq];
}

-(void)GoNextBookPage
{
     [[SimpleAudioEngine sharedEngine] playEffect:T10Page];
    if (CurrentPagNum != SumPageNum-1)
    {
       [[self getChildByTag:NextTag] stopAllActions];
    }
    if (CurrentPagNum)
    {
       [[self getChildByTag:LastTag] stopAllActions];
    }
    NSLog(@"CurrentPagNum = %d",CurrentPagNum);
    if (CurrentPagNum == SumPageNum-1)
    {
        return;
    }
    CurrentPagNum++;
    if (CurrentPagNum == SumPageNum-1)
    {
         [[self getChildByTag:NextTag] runAction:[CCHide action]];
    }
    [[self getChildByTag:LastTag] runAction:[CCShow action]];
    CCSprite *rightSprite = (CCSprite *)[self getChildByTag:RightPicTag];
    [rightSprite setDisplayFrame:[[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[rightImage objectAtIndex:CurrentPagNum]]];
    CCSprite *turnpage = (CCSprite *)[self getChildByTag:TurnPageTag];
    turnpage.visible = YES;
    [self run_Action:@"t10turn" imageCount:6 obj:turnpage backBook:NO];
}
-(void)GoLastBookPage
{
     [[SimpleAudioEngine sharedEngine] playEffect:T10Page];
    if (CurrentPagNum != SumPageNum-1)
    {
        [[self getChildByTag:NextTag] stopAllActions];
    }
    if (CurrentPagNum)
    {
        [[self getChildByTag:LastTag] stopAllActions];
    }
    NSLog(@"CurrentPagNum = %d",CurrentPagNum);
    if (CurrentPagNum == 0)
    {
        return;
    }
    CurrentPagNum--;
    if (CurrentPagNum == 0)
    {
          [[self getChildByTag:LastTag] runAction:[CCHide action]];
    }
    [[self getChildByTag:NextTag] runAction:[CCShow action]];
    CCSprite *leftSprite = (CCSprite *)[self getChildByTag:LeftPicTag];
    [leftSprite setDisplayFrame:[[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[leftImage objectAtIndex:CurrentPagNum]]];
    CCSprite *turnpage = (CCSprite *)[self getChildByTag:TurnPageTag];
    turnpage.visible = YES;
    [self run_Action:@"t10turn" imageCount:6 obj:turnpage backBook:YES];
}
-(void)onStartPlay
{
     [audioManager.apdelegate startSpeak];
}
-(void)onStopPlay
{
    @try
    {
        [audioManager.apdelegate stopSpeak];
        if (!isLionStart)
        {
             [audioManager StartRecordThread];
        }
        else
        {
              isLionStart = NO;
            [self runAction:[CCSequence actions:[CCDelayTime actionWithDuration:0.5],[CCCallFunc actionWithTarget:self selector:@selector(ReadWord)], nil]];
        }
    }
    @catch (NSException *exception)
    {
        [audioManager.apdelegate stopSpeak];
        audioManager.voiceManager.ppdelegate = nil;
    }
    @finally
    {
        audioManager.voiceManager.ppdelegate = nil;
    }
}
-(void)ReadWord
{
//    if (CurrentPagNum != SumPageNum-1)
//    {
//        [[self getChildByTag:NextTag] stopAllActions];
//    }
//    if (CurrentPagNum)
//    {
//        [[self getChildByTag:LastTag] stopAllActions];
//    }
    isReadWord = YES;
    NSString *filepath = [[NSBundle mainBundle] pathForResource:[audioArray objectAtIndex:CurrentPagNum] ofType:@"mp3"];
    NSURL *url = [NSURL URLWithString:filepath];
    audioManager.voiceManager.ppdelegate = self;
    [audioManager.voiceManager  StartChangeVoice:url];
}
//点击录音机
-(void)RadioBtnClick
{
    if (!isListening && !isSpeaking)
    {
        if (CurrentPagNum != SumPageNum-1)
        {
            [[self getChildByTag:NextTag] stopAllActions];
        }
        if (CurrentPagNum)
        {
            [[self getChildByTag:LastTag] stopAllActions];
        }
        [self ReadWord];
    }
}
-(void)preloadAudio
{
    [[SimpleAudioEngine sharedEngine] preloadBackgroundMusic:T10BgMusic];
}
-(void)LionStartSpeak
{
    isLionStart = YES;
    NSString *filepath = [[NSBundle mainBundle] pathForResource:T10GenDu ofType:@"mp3"];
    NSURL *url = [NSURL URLWithString:filepath];
    audioManager.voiceManager.ppdelegate = self;
    [audioManager.voiceManager  StartChangeVoice:url];
}

-(void)ClickBack
{
    [[SimpleAudioEngine sharedEngine]stopBackgroundMusic];
    CCScene *scene = [CCScene node];
    FollowMainLayer * puzzle = [[FollowMainLayer alloc]init];
    [scene addChild:puzzle];
    [[CCDirector sharedDirector] replaceScene:[CCTransitionFade transitionWithDuration:0.3 scene:scene]];
    [puzzle release];
}

-(id)init:(int)animaltag
{
    self = [super init];
    if (self)
    {
        m_animaltag = animaltag;
//        m_animaltag = 1;
        [[NSUserDefaults standardUserDefaults] setInteger:m_animaltag forKey:AnimalId];
        CGPoint playerPoint;
        if (m_animaltag)
        {
            //狮子 1
            [PersonalApi addBatchNode:@"t10pointandspeak" AddTarget:self];
            [PersonalApi addBatchNode:@"t10speakandface" AddTarget:self];
            [PersonalApi addBatchNode:@"t10listen" AddTarget:self];
            animalNameImg = @"t10lion.png";
            playerPoint = ccp(486, 476);
        }
        else
        {
            //猫 0
            [PersonalApi addBatchNode:@"t10catAnimation" AddTarget:self];
            [PersonalApi addBatchNode:@"t10catAnimation2" AddTarget:self];
             animalNameImg = @"t10catwait1.png";
            playerPoint = ccp(512, 400);
        }
          
         [PersonalApi addBatchNode:@"t10things" AddTarget:self];
        //背景图片
        CCSprite *bg = [CCSprite spriteWithFile:@"T10followMebg.png"];
        bg.position = ccp(512, 384);
        [self addChild:bg];
        
        LionPlayer = [CCSprite spriteWithSpriteFrameName:animalNameImg];
        LionPlayer.position = playerPoint;
        [self addChild:LionPlayer];

        //桌子
        CCSprite *desk = [CCSprite spriteWithFile:@"T10followMedesk.png"];
        desk.position = ccp(512, 115);
        [self addChild:desk];
        
        penArray = [[NSMutableArray alloc]init];
        
        NSString *filepath = [[NSBundle mainBundle]pathForResource:@"OtherImage" ofType:@"plist"];
        NSArray* spritesArray = [[NSArray alloc] initWithContentsOfFile:filepath];
        for (int i=0; i<[spritesArray count]; i++)
        {
            NSDictionary *dic = [spritesArray objectAtIndex:i];
            int x = [[dic objectForKey:@"x"] intValue];
            int y =  [[dic objectForKey:@"y"] intValue];
            int tag = [[dic objectForKey:@"tag"] intValue];
            
            if (tag == RadioTag)
            {
                [PersonalApi addButton:[NSString stringWithFormat:@"%@1.png",[dic objectForKey:@"image"]] andHimage:[NSString stringWithFormat:@"%@2.png",[dic objectForKey:@"image"]] Sel:@selector(RadioBtnClick) Target:self Position:ccp(x, y) Tag:tag];
            }
            else
            {
                CCSprite *sprite = [CCSprite spriteWithSpriteFrameName:[dic objectForKey:@"image"]];
                sprite.tag = tag;
                if (tag == TurnPageTag || tag == LionPicTag)
                {
                    sprite.visible = NO;
                }
                if (tag >= YellowPen && tag <=  Eraser)
                {
                    [penArray addObject:sprite];
                }
                sprite.position = ccp(x, y);
                [self addChild:sprite];
            }
        }
        [spritesArray release];
        [self getChildByTag:LastTag].visible = NO;
        NSString *leftpath = [[NSBundle mainBundle]pathForResource:@"AllWord" ofType:@"plist"];
        NSString *rightpath = [[NSBundle mainBundle]pathForResource:@"AllImage" ofType:@"plist"];
        NSString *audiopath = [[NSBundle mainBundle]pathForResource:@"AllSound" ofType:@"plist"];
        leftImage =  [[NSArray alloc] initWithContentsOfFile:leftpath];
        rightImage = [[NSArray alloc]initWithContentsOfFile:rightpath];
        audioArray = [[NSArray alloc]initWithContentsOfFile:audiopath];
        SumPageNum = [leftImage count];
        CurrentPagNum = 0;
        
        //数据初始化
        audioManager = [[AudioManager alloc]init];
        audioManager.apdelegate = self;
        audioManager.ardelegate = self;
        touchNum = 0;
        isListening = NO;
        isSpeaking = NO;
        isalwaysClick = NO;
        isReadWord = NO;
        isLionStart = NO;
        
        [self addButton:@"uiback.png" andHimage:@"uiback.png" Sel:@selector(ClickBack) Target:self Position:ccp(960, 50) Tag:1000];
        [self preloadAudio];
        [self schedule:@selector(updateAnimation) interval:0.5];
    }
    return self;
}
-(void)updateAnimation
{
    animationTime += 0.5;
    if (touchNum >= TouchThreePoint && !isSpeaking && !isListening)
    {
        if (m_animaltag)
        {
            [LionPlayer stopAllActions];
//             [[SimpleAudioEngine sharedEngine] playEffect:T10LionAngry];
            [self Lion_Touch_Action:@"t10pointmore" obj:LionPlayer];
        }
        else
        {
             [LionPlayer stopAllActions];
              [[SimpleAudioEngine sharedEngine] playEffect:T10CatChange];
            [self Cat_Touch_Action:@"t10catpoint" obj:LionPlayer];
        }
        touchNum = 0;
        animationTime = 0;
    }
    
    if (animationTime > 9 && !isListening && !isSpeaking)
    {
        if (waitAction)
        {
            [LionPlayer stopAction:waitAction];
            self.waitAction = nil;
        }
//       int index =  arc4random()%2;
//       if (index == 0)
//       {
//            if (m_animaltag)
//            {
//                  [self Lion_Wait_Action:@"t10wait" obj:LionPlayer];
//            }
//          else
//             {
//                 [self Cat_Wait_Action:@"t10catwait" obj:LionPlayer];
//            }
//      }
//    else
//        {
        if (m_animaltag)
        {
            [self Lion_Face_Action:@"t10face" obj:LionPlayer];
              [[SimpleAudioEngine sharedEngine] playEffect:T10LionMakeFace];
        }
        else
        {
             [self Cat_Wait_Action:@"t10catwait" obj:LionPlayer];
            [[SimpleAudioEngine sharedEngine] playEffect:T10CatWait];
//            [self Cat_WaitTwo_Action:@"t10catwaiting" obj:LionPlayer];
        }
//         }
        animationTime = 0;
    }
    if (![LionPlayer numberOfRunningActions] && !isListening && !isSpeaking)
    {
        if (m_animaltag)
        {
              [self Lion_Breath_Action:@"t10breath" imageCount:4 obj:LionPlayer];
//             [self Lion_Wait_Action:@"t10wait" obj:LionPlayer];
        }
        else
        {
             [self Cat_WaitTwo_Action:@"t10catwaiting" obj:LionPlayer];
        }
    }
}
//-(void) update:(ccTime)delta
//{
//    animationTime += delta;
//    
//    if (touchNum >= TouchThreePoint && [self shouldPlayRadomAnimation] && !isalwaysClick)
//    {
//        if (m_animaltag)
//        {
//            [self Lion_Touch_Action:@"t10pointmore" obj:LionPlayer];
//        }
//        else
//        {
//            [self Cat_Touch_Action:@"t10catpoint" obj:LionPlayer];
//        }
//        animationTime = 0;
//        touchNum = 0;
//    }
//
//    if (animationTime > 5 && [self shouldPlayRadomAnimation])
//    {
////        int index =  arc4random()%2;
////        if (index == 0)
////        {
////            if (m_animaltag)
////            {
////                [self Lion_Wait_Action:@"t10wait" obj:LionPlayer];
////            }
////            else
////            {
////                [self Cat_Wait_Action:@"t10catwait" obj:LionPlayer];
////            }
////        }
////        else
////        {
//            if (m_animaltag)
//            {
//                 [self Lion_Face_Action:@"t10face" obj:LionPlayer];
//            }
//            else
//            {
//                [self Cat_WaitTwo_Action:@"t10catwaiting" obj:LionPlayer];
//            }
////        }
//        animationTime = 0;
//    }
//}
-(void)dealloc
{
    [audioManager release];
    if (m_animaltag)
    {
        [[CCSpriteFrameCache sharedSpriteFrameCache]removeSpriteFramesFromFile:@"t10pointandspeak.plist"];
        [[CCSpriteFrameCache sharedSpriteFrameCache]removeSpriteFramesFromFile:@"t10speakandface.plist"];
        [[CCSpriteFrameCache sharedSpriteFrameCache]removeSpriteFramesFromFile:@"t10listen.plist"];
    }
     else
     {
         [[CCSpriteFrameCache sharedSpriteFrameCache]removeSpriteFramesFromFile:@"t10catAnimation.plist"];
         [[CCSpriteFrameCache sharedSpriteFrameCache]removeSpriteFramesFromFile:@"t10catAnimation2.plist"];
     }
     [[CCSpriteFrameCache sharedSpriteFrameCache]removeSpriteFramesFromFile:@"t10things.plist"];
    [[CCTextureCache sharedTextureCache] removeUnusedTextures];
    [leftImage release];
    [rightImage release];
    [audioArray release];
    [super dealloc];
}
//-(void)judgeTouchPlayer
//{
//      [self unschedule:@selector(judgeTouchPlayer)];
//
//}
//-(void)isAlwaysClick:(NSDate*)lastClicktime
//{
//    NSDate *now = [NSDate date];
//    NSLog(@"[lastClicktime timeIntervalSinceDate:now] = %f",[lastClicktime timeIntervalSinceDate:now]);
//    if ([lastClicktime timeIntervalSinceDate:now] > 10)
//    {
//        isalwaysClick = NO;
//    }
//    else
//    {
//        isalwaysClick = YES;
//    }
//}
- (void) onEnter
{
    [[[CCDirector sharedDirector] touchDispatcher] addTargetedDelegate:self priority:0 swallowsTouches:YES];
     [[SimpleAudioEngine sharedEngine] playBackgroundMusic:T10BgMusic loop:YES];
    [self LionStartSpeak];
    [super onEnter];
}
- (void) onExit
{
    [[[CCDirector sharedDirector] touchDispatcher] removeDelegate:self];
    if (isListening)
    {
         [audioManager StopRecordThread];
    }
    [super onExit];
}
- (BOOL)ccTouchBegan:(UITouch *)touch withEvent:(UIEvent *)event
{
    CGPoint location = [touch locationInView: [touch view]];
    location = [[CCDirector sharedDirector] convertToGL: location];
    startPosition = CGPointZero;

//    CGRect playerRect;
//    if (m_animaltag)
//    {
//        playerRect = CGRectMake(286, 278, 458, 455);
//    }
//    else
//    {
//        playerRect = CGRectMake(344, 251, 317, 256);
//    }
//    if (CGRectContainsPoint(playerRect, location))
//    {
//           NSDate *now = [NSDate date];
//           NSLog(@"[now timeIntervalSinceDate:lastClickDate] = %f",[now timeIntervalSinceDate:lastClickDate]);
//           if ([now timeIntervalSinceDate:lastClickDate] < 1)
//           {
//                  isalwaysClick = YES;
//           }
//          else
//         {
//                  isalwaysClick = NO;
//          }
//        self.lastClickDate = now;
//    }
    
    if (CGRectContainsPoint([[self getChildByTag:BookTag] boundingBox], location))
    {
          startPosition = location;
    }
    return YES;
}

- (void)ccTouchEnded:(UITouch *)touch withEvent:(UIEvent *)event
{
      CGPoint location = [touch locationInView: [touch view]];
      location = [[CCDirector sharedDirector] convertToGL: location];
      CCSprite *turnpage = (CCSprite *)[self getChildByTag:TurnPageTag];
    BOOL isTurnPage = NO;
    //蜡笔动
    for (CCSprite *sprite in penArray)
    {
        if (CGRectContainsPoint(sprite.boundingBox, location))
        {
            if (![sprite numberOfRunningActions])
            {
                if (sprite.tag == Eraser)
                {
                       [[SimpleAudioEngine sharedEngine] playEffect:T10ClickEraser];
                }
                else
                {
                       [[SimpleAudioEngine sharedEngine] playEffect:T10ClickPen];
                }
                  [sprite runAction:[CCSequence actions:[CCJumpTo actionWithDuration:0.4 position:ccp(sprite.position.x, sprite.position.y) height:15.0 jumps:2], nil]];
            }
        }
    }
    //书翻页
    if (startPosition.x != 0 && startPosition.y != 0 && ![turnpage numberOfRunningActions]  && !isSpeaking && !isListening)
    {
        if (location.x - startPosition.x > 20 && [[self getChildByTag:LastTag] visible])
        {
//             [audioManager StopRecordThread];
            isTurnPage = YES;
            [self GoLastBookPage];
//             [self ReadWord];
        }
        else if(location.x - startPosition.x < -20 && [[self getChildByTag:NextTag] visible])
        {
//             [audioManager StopRecordThread];
            isTurnPage = YES;
            [self GoNextBookPage];
//             [self ReadWord];
        }
    }
    //点击录音机
//     if (CGRectContainsPoint([[self getChildByTag:RadioTag] boundingBox], location) && !isListening && !isSpeaking && !isTurnPage)
//      {
//          if (CurrentPagNum != SumPageNum-1)
//          {
//              [[self getChildByTag:NextTag] stopAllActions];
//          }
//          if (CurrentPagNum)
//          {
//              [[self getChildByTag:LastTag] stopAllActions];
//          }
////           [audioManager StopRecordThread];
//          [self ReadWord];
//      }
    //点击箭头
    if (CGRectContainsPoint([[self getChildByTag:NextTag] boundingBox], location) && [[self getChildByTag:NextTag] visible]  && !isSpeaking &&!isListening && !isTurnPage)
    {
//        [audioManager StopRecordThread];
        isTurnPage = YES;
        [self GoNextBookPage];
//        [self ReadWord];
    }
    if (CGRectContainsPoint([[self getChildByTag:LastTag] boundingBox], location) && [[self getChildByTag:LastTag] visible]  && !isSpeaking && !isListening && !isTurnPage)
    {
//         [audioManager StopRecordThread];
        isTurnPage = YES;
        [self GoLastBookPage];
//        [self ReadWord];
    }
    //点击书
//    if (CGRectContainsPoint([[self getChildByTag:BookTag] boundingBox], location) && !isListening && !isSpeaking && !isTurnPage)
//    {
//        [audioManager StartRecordThread];
//    }

    //点击狮子
    CGRect playerRect;
    if (m_animaltag)
    {
         playerRect = CGRectMake(286, 278, 458, 455);
    }
    else
    {
        playerRect = CGRectMake(344, 251, 317, 256);
    }
    if (CGRectContainsPoint(playerRect, location) && !isSpeaking && !isListening)
    {
        touchNum++;
        if (waitAction)
        {
            [LionPlayer stopAction:waitAction];
            self.waitAction = nil;
        }
        if ([self shouldPlayRadomAnimation] && (touchNum % 3))
        {
            if (m_animaltag)
            {
               
                [self Lion_Catch_Action:@"t10pointout" obj:LionPlayer];
            }
            else
            {
               
                [self Cat_Catch_Action:@"t10catout" obj:LionPlayer];
            }
            animationTime = 0;
        }
    }
}
@end
