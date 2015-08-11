//
//  SnowBallFightLayer.m
//  SnowBallFightLayer
//
//  Created by apple  on 12-12-10.
//
//

#import "SnowBallFightLayer.h"
#import "SimpleAudioEngine.h"
#import "PersonalApi.h"
#import "SceneThreeLayer.h"
#import "SceneFourLayer.h"

@implementation aniSprite

@synthesize hidePosition;
@synthesize moveToPosition;
@synthesize count;
@synthesize delaySeconds;
@synthesize delaySeconds2;
@synthesize deadCount;
@end

@implementation SnowBallFightLayer

enum
{
    kTreeTag,
    kSledTag,
    kBall1Tag,
    kWormTag,
    kMouseTag,
    kCatTag,
    kLionTag,
    
    kBackTag,
    kSnowManTag,
};

+(CCScene*)scene
{
    CCScene* scene = [CCScene node];
    SnowBallFightLayer* layer = [SnowBallFightLayer node];
    [scene addChild:layer];
    return scene;
}
-(id)init
{
    self = [super init];
    if (self) {
        animals = [[NSMutableArray alloc] init];
        balls = [[NSMutableArray alloc] init];
        points = [[NSMutableArray alloc] init];
        
        [[CCSpriteFrameCache sharedSpriteFrameCache] addSpriteFramesWithFile:@"s76pics.plist"];
        
        //bg
        CCSprite* bg = [CCSprite spriteWithFile:@"s76Bj.png"];
        bg.position = ccp(512, 384);
        [self addChild:bg];
        
        //tree-shadow
        CCSprite* shadow = [CCSprite spriteWithSpriteFrameName:@"s76Tree_Shadow.png"];
        shadow.position = ccp(256, 427);
        shadow.anchorPoint = ccp(0.5, 0.05);
        [self addChild:shadow z:1];
        
        //tree
        CCSprite* tree = [CCSprite spriteWithSpriteFrameName:@"s76Tree.png"];
        tree.position = ccp(256, 427);
        tree.anchorPoint = ccp(0.5, 0.05);
        tree.tag = kTreeTag;
        [self addChild:tree z:1];
        
        //雪橇
        CCSprite* sled = [CCSprite spriteWithSpriteFrameName:@"s76Sled.png"];
        sled.position  = ccp(104, 86);
        sled.tag = kSledTag;
        [self addChild:sled z:1];
        
        //雪球
        CCSprite* ballShadow = [CCSprite spriteWithSpriteFrameName:@"s76Snowball_Shadow.png"];
        ballShadow.position = ccp(840, 377);
        ballShadow.scale = 0.3;
        [self addChild:ballShadow z:1];
        
        CCSprite* ball = [CCSprite spriteWithSpriteFrameName:@"s76Snowball.png"];
        ball.position = ccp(840, 377);
        ball.scale = 0.3;
        ball.tag = kBall1Tag;
        ball.userData = ballShadow;
        [self addChild:ball z:1];
        
        //animals
        aniSprite* worm  =[aniSprite spriteWithSpriteFrameName:@"s76Worm1.png"];
        worm.delaySeconds = 0.5;
        worm.delaySeconds2 = (arc4random()%30+10)/10.0;
        worm.count = 3;
        worm.hidePosition = ccp(295, 270);
        worm.moveToPosition = ccp(494, 270);
        worm.tag = kWormTag;
        worm.position = worm.hidePosition;
        worm.deadCount = 0;
        [self addChild:worm z:1];
        [animals addObject:worm];
        
        aniSprite* cat = [aniSprite spriteWithSpriteFrameName:@"s76Cat1.png"];
        cat.delaySeconds = 1;
        cat.delaySeconds2 = (arc4random()%30+10)/10.0;
        cat.tag = kCatTag;
        cat.hidePosition = ccp(853, 278);
        cat.moveToPosition = ccp(595, 278);
        cat.count = 2;
        cat.position = cat.hidePosition;
        cat.deadCount = 0;
        [self addChild:cat z:1];
        [animals addObject:cat];
        
        aniSprite* mouse = [aniSprite spriteWithSpriteFrameName:@"s76Mouse1.png"];
        mouse.delaySeconds = 1.5;
        mouse.delaySeconds2 = (arc4random()%30+10)/10.0;
        mouse.hidePosition = ccp(594, 417);
        mouse.moveToPosition = ccp(415, 417);
        mouse.count = 1;
        mouse.tag  = kMouseTag;
        mouse.position = mouse.hidePosition;
        mouse.deadCount = 0;
        [self addChild:mouse z:1];
        [animals addObject:mouse];
        
        CCSprite* wood1 = [CCSprite spriteWithSpriteFrameName:@"s76Wood.png"];
        wood1.position = ccp(291, 263);
        wood1.scale = 0.9;
        [self addChild:wood1 z:99];
        
        CCSprite* wood2 = [CCSprite spriteWithSpriteFrameName:@"s76Wood.png"];
        wood2.position = ccp(863, 267);
        [self addChild:wood2 z:99];
        
        CCSprite* wood3 = [CCSprite spriteWithSpriteFrameName:@"s76Wood.png"];
        wood3.position = ccp(603, 405);
        wood3.scale = 0.85;
        [self addChild:wood3 z:99];
        
        
        
        CCSprite* snowMan = [CCSprite spriteWithSpriteFrameName:@"s76snowman1.png"];
        snowMan.position = ccp(86, 395);
        snowMan.tag = kSnowManTag;
        [self addChild:snowMan z:2];
        
        
        snowBallWord = [CCSprite spriteWithSpriteFrameName:@"s76Snowball_word.png"];
        snowBallWord.position = ccp(515, 152);
        snowBallWord.visible = NO;
        [self addChild:snowBallWord z:99];
        
        
        CCParticleSystemQuad* snow = [CCParticleSystemQuad particleWithFile:@"pubSnowDown.plist"];
        snow.position = ccp(512, 768);
        [self addChild:snow z:99];
        
        self.isTouchEnabled = YES;
        [self lionIn];
        
        [[SimpleAudioEngine sharedEngine] playBackgroundMusic:@"s76backgroundmusic.mp3" loop:YES];
        
        
    }
    return self;
}

-(void)dealloc
{
    [[CCSpriteFrameCache sharedSpriteFrameCache] removeSpriteFramesFromFile:@"s76pics.plist"];
    [super dealloc];
    [[CCTextureCache sharedTextureCache] removeUnusedTextures];
}

-(CGRect)createRectByPoint:(CGPoint)pos Width:(float)w Height:(float)h
{
    return CGRectMake(pos.x-w/2.0, pos.y -h/2.0, w, h);
}

-(void)showHand
{
    CCSprite* hand = [CCSprite spriteWithSpriteFrameName:@"hand1.png"];
    hand.position = ccp(512, 71);
    [self addChild:hand z:99];
    [hand runAction:[CCSequence actions:[CCMoveTo actionWithDuration:.5 position:ccp(512, 270)],[CCCallBlock actionWithBlock:^(void){
        [hand removeFromParentAndCleanup:YES];
    }],nil]];
}

-(void)judgeComplete
{
    if ([animals count] == 0) {
        
        [self unschedule:@selector(judge)];
        
        CCSprite* sp = [CCSprite spriteWithFile:@"s76bigsnow.png"];
        sp.position = ccp(512, 384);
        sp.scale = 0;
        [self addChild:sp z:99];
        
        
        [sp runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1.0],[CCCallBlock actionWithBlock:^(void){
            [[SimpleAudioEngine sharedEngine] playEffect:@"s76win.wav"];
            [[SimpleAudioEngine sharedEngine] playEffect:@"s76ilovewinter.mp3"];
        }],[CCSpawn actions:[CCScaleTo actionWithDuration:1.6 scale:1.0],[CCRepeat actionWithAction:[CCRotateBy actionWithDuration:0.2 angle:45] times:8],nil],
                       [CCDelayTime actionWithDuration:2],[CCCallBlock actionWithBlock:^(void){
            
            //返回
            UnitName name =  [PersonalApi getAppInstance].unit;
            if ([PersonalApi getAppInstance].backLevel == 1) {
                //返回教学篇
                [[CCDirector sharedDirector] replaceScene:[SceneFourLayer initWithTargetLayer:name]];
                
            }else if ([PersonalApi getAppInstance].backLevel == 2) {
                //返回复习篇
                [[CCDirector sharedDirector] replaceScene:[SceneThreeLayer initWithTargetLayer:name]];
            }            
        }],nil]];
    }
}

-(void)judge
{
    if ([balls count]>0) {
        for (CCSprite* ball in balls) {
            
            for(int i = 0;i < [animals count];i++){
                aniSprite* ani = (aniSprite*)[animals objectAtIndex:i];
                if (ani.tag == kLionTag) {
                    CGRect rect;
                    if (ani.position.x >= 810) {
                        rect = [self createRectByPoint:ccp(ani.position.x+9,ani.position.y-27) Width:120 Height:160];
                    }
                    if (ani.position.x<810) {
                        rect = [self createRectByPoint:ccp(ani.position.x,ani.position.y+20) Width:120 Height:70];
                    }
                    if (CGRectContainsPoint(rect, ball.position)) {
                        
                        
                        [self runAction:[CCSequence actions:[CCDelayTime actionWithDuration:.5],[CCCallBlock actionWithBlock:^(void){
                            
                        }],nil]];
                        
                        [[SimpleAudioEngine sharedEngine] playEffect:@"s76animalliedown.wav"];
                        
                        //狮子被打倒
                        CCSprite* lionDown = [CCSprite spriteWithSpriteFrameName:@"s76Lion_Down.png"];
                        lionDown.position = ani.position;
                        [self addChild:lionDown z:1];
                        
                        [animals removeObject:ani];
                        ani.visible = NO;
                        //[ani removeFromParentAndCleanup:YES];
                        
                        ani.deadCount ++;
                        BOOL flag = NO;
                        if (ani.deadCount < 2) {
                            flag = YES;
                            [lionDown runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1.0],[CCCallBlock actionWithBlock:^(void){
                                [lionDown removeFromParentAndCleanup:YES];
                                
                                ani.visible = YES;
                                ani.position = ani.hidePosition;
                                [animals addObject:ani];
                                
                            }],nil]];
                        }
                        else{
                            [ani stopAllActions];
                        }
                        if (flag == NO) {
                            [self judgeComplete];
                        }
                        if ([balls containsObject:ball]) {
                            [balls removeObject:ball];
                            [ball removeFromParentAndCleanup:YES];
                            return;
                        }
                    }
                }
                if (ani.tag == kMouseTag) {
                    if (ani.position.x <= 540) {
                        CGRect rect = [self createRectByPoint:ccp(ani.position.x+5,ani.position.y-15) Width:50 Height:70];
                        if (CGRectContainsPoint(rect, ball.position)) {
                            
                            [[SimpleAudioEngine sharedEngine] playEffect:@"s76animalliedown.wav"];
                            //老鼠被打倒
                            CCSprite* mouseDown = [CCSprite spriteWithSpriteFrameName:@"s76Mouse_Down.png"];
                            mouseDown.position = ani.position;
                            
                            [self addChild:mouseDown z:1];
                            
                            [animals removeObject:ani];
                            ani.visible = NO;
                            //[ani removeFromParentAndCleanup:YES];
                            ani.deadCount ++;
                            
                            BOOL flag = NO;
                            
                            if (ani.deadCount < 2) {
                                flag = YES;
                                [mouseDown runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1.0],[CCCallBlock actionWithBlock:^(void){
                                    [mouseDown removeFromParentAndCleanup:YES];
                                    
                                    ani.visible = YES;
                                    ani.position = ani.hidePosition;
                                    [animals addObject:ani];
                                    
                                }],nil]];
                            }
                            else{
                                [ani stopAllActions];
                            }
                            
                            if (flag == NO) {
                                [self judgeComplete];
                            }
                            if ([balls containsObject:ball]) {
                                [balls removeObject:ball];
                                [ball removeFromParentAndCleanup:YES];
                                return;
                            }
                        }
                    }
                }
                if (ani.tag == kWormTag) {
                    
                    if (ani.position.x>=412) {
                        CGRect rect = [self createRectByPoint:ccp(ani.position.x+10,ani.position.y-7) Width:30 Height:75];
                        if (CGRectContainsPoint(rect, ball.position)) {
                            [[SimpleAudioEngine sharedEngine] playEffect:@"s76animalliedown.wav"];
                            //虫子被打倒
                            CCSprite* wormDown = [CCSprite spriteWithSpriteFrameName:@"s76Worm_Down.png"];
                            wormDown.position = ani.position;
                            
                            [self addChild:wormDown z:1];
                            
                            
                            [animals removeObject:ani];
                            ani.visible = NO;
                            //[ani removeFromParentAndCleanup:YES];
                            ani.deadCount ++;
                            BOOL flag = NO;
                            if (ani.deadCount < 2) {
                                flag = YES;
                                [wormDown runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1.0],[CCCallBlock actionWithBlock:^(void){
                                    [wormDown removeFromParentAndCleanup:YES];
                                    
                                    ani.visible = YES;
                                    ani.position = ani.hidePosition;
                                    [animals addObject:ani];
                                    
                                }],nil]];
                            }
                            else{
                                [ani stopAllActions];
                            }
                            if (flag == NO) {
                                [self judgeComplete];
                            }
                            if ([balls containsObject:ball]) {
                                [balls removeObject:ball];
                                [ball removeFromParentAndCleanup:YES];
                                return;
                            }
                        }
                    }
                }
                if (ani.tag == kCatTag) {
                    
                    if (ani.position.x<=725) {
                        CGRect rect = [self createRectByPoint:ccp(ani.position.x,ani.position.y-20) Width:70 Height:80];
                        if (CGRectContainsPoint(rect, ball.position)) {

                            //虫子被打倒
                            [[SimpleAudioEngine sharedEngine] playEffect:@"s76animalliedown.wav"];
                            CCSprite* catDown = [CCSprite spriteWithSpriteFrameName:@"s76Cat_Down.png"];
                            catDown.position = ani.position;

                            [self addChild:catDown z:1];
                            
                            [animals removeObject:ani];
                            ani.visible = NO;
                            //[ani removeFromParentAndCleanup:YES];
                            ani.deadCount ++;
                            BOOL flag = NO;
                            if (ani.deadCount < 2) {
                                flag = YES;
                                [catDown runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1.0],[CCCallBlock actionWithBlock:^(void){
                                    [catDown removeFromParentAndCleanup:YES];
                                    
                                    ani.visible = YES;
                                    ani.position = ani.hidePosition;
                                    [animals addObject:ani];
                                    
                                }],nil]];
                            }
                            else{
                                [ani stopAllActions];
                            }
                            if (flag == NO) {
                                [self judgeComplete];
                            }
                            if ([balls containsObject:ball]) {
                                
                                [balls removeObject:ball];
                                [ball removeFromParentAndCleanup:YES];
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
    else{
        if ([animals count]!= 0) {
            [self addSnowBalls];
        }
    }
}
-(void)lionIn
{
    CCSprite* lion = [CCSprite spriteWithSpriteFrameName:@"s76Lion_A1.png"];
    lion.position = ccp(1096, 466);
    [self addChild:lion z:1];
    
    NSMutableArray* frames1 = [NSMutableArray array];
    for (int i =0; i<2; i++) {
        CCSpriteFrame* frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"s76Lion_A%d.png",i+1]];
        [frames1 addObject:frame];
    }
    CCAnimation* animation1 = [CCAnimation animationWithSpriteFrames:frames1 delay:1.0/6.0];
    
    id action1 = [CCAnimate actionWithAnimation:animation1];
    
    [self runAction:[CCSequence actions:[CCCallBlock actionWithBlock:^(void){
        [lion runAction:[CCMoveTo actionWithDuration:.3 position:ccp(991, 466)]];
    }], nil]];
    
    [lion runAction:[CCSequence actions:
                     [CCMoveTo actionWithDuration:.3 position:ccp(991, 466)],
                     [CCDelayTime actionWithDuration:1.0/6.0],
                     [CCRepeat actionWithAction:action1 times:4],
                     [CCMoveTo actionWithDuration:.3 position:ccp(1096, 466)],[CCCallBlock actionWithBlock:^(void){
        
        lion.position = ccp(1092, 630);
        
        [lion removeFromParentAndCleanup:YES];
        
        aniSprite* new = [aniSprite spriteWithSpriteFrameName:@"s76Lion_B.png"];
        new.position = ccp(1092,630);
        new.delaySeconds = 2;
        new.delaySeconds2 = (arc4random()%30+10)/10.0;
        new.tag = kLionTag;
        new.count = 0;
        new.hidePosition = ccp(594, 472);
        new.moveToPosition = ccp(900, 472);
        new.deadCount = 0;
        [self addChild:new z:1];
        
        NSMutableArray* frames1 = [NSMutableArray array];
        for (int i =0; i<5; i++) {
            CCSpriteFrame* frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"s76Lion_C%d.png",i+1]];
            [frames1 addObject:frame];
        }
        CCAnimation* animation1 = [CCAnimation animationWithSpriteFrames:frames1 delay:1.0/12.0];
        id action1 = [CCAnimate actionWithAnimation:animation1];
        
        
        NSMutableArray* frames2 = [NSMutableArray array];
        
        for (int i =0; i < 9; i++) {
            CCSpriteFrame* frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"s76Lion_D%d.png",i+1]];
            [frames2 addObject:frame];
        }
        for (int i =0; i < 9; i++) {
            CCSpriteFrame* frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"s76Lion_D%d.png",i+1]];
            [frames2 addObject:frame];
        }
        for (int i =0; i < 4; i++) {
            CCSpriteFrame* frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"s76Lion_D%d.png",i+1]];
            [frames2 addObject:frame];
        }
        CCSpriteFrame* endFrame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:@"s76Lion_EStop.png"];
        [frames2 addObject:endFrame];
        
        CCAnimation* animation2 = [CCAnimation animationWithSpriteFrames:frames2 delay:1.0/6.0];
        id action2 = [CCAnimate actionWithAnimation:animation2];
        
        //删除雪球
        CCSprite* s = (CCSprite*)[self getChildByTag:kBall1Tag];
        [s runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1.0/3.0],[CCCallBlock actionWithBlock:^(void){
            [self removeChild:s.userData cleanup:YES];
            [self removeChild:s cleanup:YES];
        }],nil]];
        
        [[SimpleAudioEngine sharedEngine] playEffect:@"s76lionjumpin.wav"];
        
        [new runAction:[CCSequence actions:[CCMoveTo actionWithDuration:1.0/6.0 position:ccp(857, 472)],action1,[CCCallBlock actionWithBlock:^(void){
            
            [animals addObject:new];
            
            CCSprite* word1 = [CCSprite spriteWithSpriteFrameName:@"s76Box1.png"];
            word1.position = ccp(687, 623);
            //word1.visible = NO;
            [self addChild:word1 z:99];
            
            [word1 runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1],[CCCallBlock actionWithBlock:^(void){
                [word1 removeFromParentAndCleanup:YES];
            }],nil]];
            
            CCSprite* word2 = [CCSprite spriteWithSpriteFrameName:@"s76Box2.png"];
            word2.position = ccp(687, 623);
            word2.visible = NO;
            [self addChild:word2 z:99];
            
            [word2 runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1.5],[CCCallBlock actionWithBlock:^(void){
                word2.visible = YES;
            }],[CCDelayTime actionWithDuration:2.5],[CCCallBlock actionWithBlock:^(void){
                [word2 removeFromParentAndCleanup:YES];
                [self addSnowBalls];
                
                //动物开始移动
                
                aniSprite* mouse = (aniSprite*)[self getChildByTag:kMouseTag];
                aniSprite* worm = (aniSprite*)[self getChildByTag:kWormTag];
                aniSprite* cat = (aniSprite*)[self getChildByTag:kCatTag];
                aniSprite* lion = (aniSprite*)[self getChildByTag:kLionTag];
                
                
                [[SimpleAudioEngine sharedEngine] playEffect:@"s76animalout.wav"];
                
                [mouse runAction:[CCMoveTo actionWithDuration:.5 position:mouse.moveToPosition]];
                [worm runAction:[CCMoveTo actionWithDuration:.5 position:worm.moveToPosition]];
                [cat runAction:[CCMoveTo actionWithDuration:.5 position:cat.moveToPosition]];
                
                [lion runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1],[CCCallBlock actionWithBlock:^(void){
                    [self animalsMove];
                    
                    [self schedule:@selector(judge)];
                }],nil]];
                
            }],nil]];
            [[SimpleAudioEngine sharedEngine] playEffect:@"s76lionsay.mp3"];
            
        }],action2,nil]];
    }],nil]];
}

-(void)animalMove:(aniSprite*)sp
{
    NSString* animalName;
    if (sp.tag == kWormTag) {
        animalName = @"s76Worm";
    }
    if (sp.tag == kCatTag) {
        animalName = @"s76Cat";
    }
    if (sp.tag == kMouseTag) {
        animalName = @"s76Mouse";
    }
    if (sp.tag == kLionTag) {
        animalName = @"s76Lion";
    }
    
    NSMutableArray* frames2 = [NSMutableArray array];
    CCSpriteFrame* frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",animalName,1]];
    [frames2 addObject:frame];
    CCAnimation* animation2 = [CCAnimation animationWithSpriteFrames:frames2 delay:1.0/6.0];
    id action2 = [CCAnimate actionWithAnimation:animation2];
    
    sp.delaySeconds2 = (arc4random()%30+10)/10.0;
    sp.delaySeconds = (arc4random()%20+10)/10.0;
    sp.count++;
    if (sp.count<3) {
        [sp runAction:[CCSequence actions:[CCMoveTo actionWithDuration:1 position:sp.hidePosition],action2,[CCDelayTime actionWithDuration:sp.delaySeconds],[CCMoveTo actionWithDuration:1 position:sp.moveToPosition],[CCDelayTime actionWithDuration:1],nil]];
    }
    else{
        sp.count = 0;
        NSMutableArray* frames = [NSMutableArray array];
        for (int i = 0; i<5; i++) {
            CCSpriteFrame* frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"%@%d.png",animalName,i+1]];
            [frames addObject:frame];
        }
        CCAnimation* animation = [CCAnimation animationWithSpriteFrames:frames delay:1.0/6.0];
        id action = [CCAnimate actionWithAnimation:animation];
        
        [sp runAction:[CCSequence actions:[CCMoveTo actionWithDuration:1 position:sp.hidePosition],action2,[CCDelayTime actionWithDuration:sp.delaySeconds],[CCMoveTo actionWithDuration:1 position:sp.moveToPosition],action,[CCCallBlock actionWithBlock:^(void){
            int random = arc4random()%3;
            
            if (random == 1) {
                CCSprite* s = [CCSprite spriteWithFile:@"s76Snowball_Down.png"];
                s.position = ccp(512, 384);
                [self addChild:s z:99];
                [[SimpleAudioEngine sharedEngine] playEffect:@"s76snowballonscreen.wav"];
                [s runAction:[CCSequence actions:[CCDelayTime actionWithDuration:.5],[CCFadeOut actionWithDuration:.5],[CCCallBlock actionWithBlock:^(void){
                    [s removeFromParentAndCleanup:YES];
                }],nil]];
            }
        }],nil]];
    }
}
-(void)animalsMove
{
    for(aniSprite* sp in animals){
        [sp runAction:[CCRepeatForever actionWithAction:[CCSequence actions:[CCCallFuncN actionWithTarget:self selector:@selector(animalMove:)],[CCDelayTime actionWithDuration:2+sp.delaySeconds+sp.delaySeconds2],nil]]];
    }
}

-(void)addSnowBalls
{
    CCSprite* ballShadow = [CCSprite spriteWithSpriteFrameName:@"s76Snowball_Shadow.png"];
    ballShadow.position = ccp(512, 71-150);
    [self addChild:ballShadow z:99];
    
    [ballShadow runAction:[CCMoveTo actionWithDuration:.5 position:ccpAdd(ballShadow.position, ccp(0, 150))]];
    
    CCSprite* ball = [CCSprite spriteWithSpriteFrameName:@"s76Snowball.png"];
    ball.position = ballShadow.position;
    ball.userData = ballShadow;
    [self addChild:ball z:99];
    [balls addObject:ball];
    
    [ball runAction:[CCMoveTo actionWithDuration:.5 position:ccpAdd(ball.position, ccp(0, 150))]];
    
    [[SimpleAudioEngine sharedEngine] playEffect:@"s76snowballup.wav"];
    
    
    [self schedule:@selector(showHand) interval:5];
}

-(void)ccTouchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    UITouch* touch = [touches anyObject];
    CGPoint location = [[CCDirector sharedDirector] convertToGL:[touch locationInView:touch.view]];
    
    //sled
    CCSprite* sled = (CCSprite*)[self getChildByTag:kSledTag];
    if (CGRectContainsPoint([sled boundingBox], location)) {
        
        if ([sled numberOfRunningActions] == 0) {
            [[SimpleAudioEngine sharedEngine] playEffect:@"s77sled.wav"];
            [sled runAction:[CCSequence actions:[CCEaseIn actionWithAction:[CCMoveTo actionWithDuration:.5 position:ccp(-70, 43)] rate:1.5],[CCDelayTime actionWithDuration:2],[CCEaseOut actionWithAction:[CCMoveTo actionWithDuration:.5 position:ccp(104, 86)] rate:1.5],nil]];
        }
        return;
    }
    CCSprite* snowman = (CCSprite*)[self getChildByTag:kSnowManTag];
    if (CGRectContainsPoint([snowman boundingBox], location)) {
        
        if ([snowman numberOfRunningActions] == 0) {
            [[SimpleAudioEngine sharedEngine] playEffect:@"s76snowmanshake.wav"];
            NSMutableArray* frames = [NSMutableArray array];
            
            
            for (int i =0; i < 3; i++) {
                CCSpriteFrame* frame = [[CCSpriteFrameCache sharedSpriteFrameCache] spriteFrameByName:[NSString stringWithFormat:@"s76snowman%d.png",i+1]];
                [frames addObject:frame];
            }
            CCAnimation* animation = [CCAnimation animationWithSpriteFrames:frames delay:0.1];
            [snowman runAction:[CCRepeat actionWithAction:[CCAnimate actionWithAnimation:animation] times:2]];
        }
        return;
    }
    //tree
    CCSprite* tree = (CCSprite*)[self getChildByTag:kTreeTag];
    if (CGRectContainsPoint([tree boundingBox], location)) {
        if ([tree numberOfRunningActions] == 0) {
            [[SimpleAudioEngine sharedEngine] playEffect:@"s76treeshake.wav"];
            [tree runAction:[CCRepeat actionWithAction:[CCSequence actions:[CCRotateTo actionWithDuration:.1 angle:-5],
                                                        [CCRotateTo actionWithDuration:.1 angle:0],
                                                        [CCRotateTo actionWithDuration:.1 angle:5],
                                                        [CCRotateTo actionWithDuration:.1 angle:0],nil] times:1]];
        }
    }
    int count = [balls count];
    if(count>0){
        for(CCSprite* ball in balls){
            if(CGRectContainsPoint([ball boundingBox],location)){
                //ball.position = ccp(ball.position.x, ball.position.y+20);
                touchedSprite = ball;
                beginPos = touchedSprite.position;
                
                
                if ([snowBallWord numberOfRunningActions] == 0) {
                    
                    
                    [[SimpleAudioEngine sharedEngine] playEffect:@"pubsnowball.mp3"];
                    
                    snowBallWord.visible = YES;
                    [snowBallWord runAction:[CCSequence actions:[CCDelayTime actionWithDuration:1],[CCCallBlock actionWithBlock:^(void){
                        snowBallWord.visible = NO;
                    }],nil]];
                }
            }
        }
    }
}
-(void)ccTouchesMoved:(NSSet *)touches withEvent:(UIEvent *)event
{
    UITouch* touch = [touches anyObject];
    CGPoint location = [[CCDirector sharedDirector] convertToGL:[touch locationInView:touch.view]];
    //CGPoint preLocation = [[CCDirector sharedDirector] convertToGL:[touch previousLocationInView:touch.view]];
    
    if (touchedSprite) {
        //touchedSprite.position = location;
        [points addObject:[NSValue valueWithCGPoint:location]];
        
        if (!timerFlag) {
            
            timerFlag = YES;
            [self runAction:[CCSequence actions:[CCDelayTime actionWithDuration:0.05],[CCCallBlock actionWithBlock:^(void){
                
                CGPoint begin = ccp(512, 71);
                CGPoint pos = [[points lastObject] CGPointValue];
                
                float dis1 = ccpDistance(begin, pos);
                
                float dis2 = dis1*5+100;
                
                float X = begin.x+(-begin.x+pos.x)*dis2/dis1;
                float Y = begin.y+(-begin.y+pos.y)*dis2/dis1;
                 
                CCSprite* shadow = touchedSprite.userData;
                
                [self unschedule:@selector(showHand)];
                
                ccBezierConfig config;
                config.controlPoint_1 = begin;
                config.controlPoint_2 = ccp(X, Y+100);
                config.endPosition = ccp(X, Y);
                [[SimpleAudioEngine sharedEngine] playEffect:@"s76snowballthrow.wav"];
                [touchedSprite runAction:[CCSequence actions:[CCSpawn actions:[CCBezierTo actionWithDuration:dis2/700.0 bezier:config],[CCScaleTo actionWithDuration:dis2/700.0 scale:1-(dis2/500)],nil],[CCCallBlockN actionWithBlock:^(CCNode* node){
                    [balls removeObject:node];
                    [node removeFromParentAndCleanup:YES];
                    
                    }],nil]];
                
                if (shadow != nil) {
                    
                    if ([[self children] containsObject:shadow]) {
                        [shadow removeFromParentAndCleanup:YES];
                    }
                }
                touchedSprite  = nil;
                [points removeAllObjects];
                timerFlag = NO;
                 
                }],nil]];
            }
    }
}
-(void)ccTouchesEnded:(NSSet *)touches withEvent:(UIEvent *)event
{
    if (touchedSprite) {
        [points removeAllObjects];
        touchedSprite = nil;
    }
}
@end
