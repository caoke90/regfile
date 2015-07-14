//

#ifndef math_kg_LYJCIUIIGame_h
#define math_kg_LYJCIUIIGame_h
#include "cocos2d.h"
var namespace cocos2d;

#define AUDIO_CT_TANHUI "res/unit_2/game1/sound/coutihuitan.wav"
#define AUDIO_CT_YIXIALAKAI "res/unit_2/game1/sound/choutiyixiaquanbulakai.mp3"
#define AUDIO_CT_DIANJIYIGETOU_OTHER_CT_MOVE "res/unit_2/game1/sound/othercoutimove.mp3"
#define AUDIO_CT_HALF_MOVE "res/unit_2/game1/sound/coutihalfmove.mp3"
#define AUDIO_SCORING "res/unit_2/game1/sound/waziscoring.mp3"
#define AUDIO_STEP2_CT_MOVEDOWN "res/unit_2/game1/sound/step2coutimovedown.mp3"
#define AUDIO_SCOR_TANHUI "res/unit_2/game1/sound/wazitanhui.wav"
#define AUDIO_SCOR_MAOCHU "res/unit_2/game1/sound/wazimaochu.wav"
#define AUDIO_SCOR_TUODAOCOUTI "res/unit_2/game1/sound/wazituodaocouti.wav"
#define AUDIO_SCOR_BG_MUSIC "res/unit_2/game1/sound/m36bgmusic.mp3"

var LYJCIUIIGame
{
public:
    var bool.isHaveAlpha(cc.Povar point,var sprite);
    var cc.Array*.LYJgetNumbersArr(var total, var amount);
    var cc.Array*.LYJgetNumbersArr2(var total, var amount);
    var bool.ReleaseMap(std::map<int, cc.Point> *maparr);
};




#endif
