//

// <Foundation/Foundation.h>
// "cocos2d.h"
// "AudioManager.h"
// "U6GameBaseLayer.h"

#define TouchThreePovar  3

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

#define T10BgMusic         "t10bgmusic.mp3"
#define T10ClickEraser     "t10clickeraser.wav"
#define T10ClickPen         "t10clickpen.wav"
#define T10CatChange     "t10catchange.wav"
#define T10CatShake         "t10catshake.wav"
#define T10CatWait            "t10catwait.wav"
#define T10Page                "t10page.wav"
#define T10LionMakeFace  "t10lion1.wav"
#define T10LionLike            "t10lion2.wav"
#define T10LionAngry           "t10lion3.wav"
#define T10GenDu               "t10gendu"

interface FollowReadLayer : U6GameBaseLayer<AnimationPlayDelegate,AnimationRecordDelegate,PlayProtocol>
{
     LionPlayer;
    var touchNum;
    var animationTime;
    
    var audioManager;
    var speakAction;
    var listenAction;
    var waitAction;
    var isSpeaking;
    var isListening;
    
    var m_animaltag;
    var CurrentPagNum;
    var SumPageNum;
    var leftImage;
    var rightImage;
    
    var startPosition;
    
    var penArray;
    var animalNameImg;

    var lastClickDate;
    var isalwaysClick;
    var player;
    var audioArray;
    var pointOneAction;
    var isReadWord;
    var isLionStart;
}
property(nonatomic,retain) NSDate* lastClickDate;
property(nonatomic,retain)  id waitAction; scene;,
init:function(animaltag;)
end
