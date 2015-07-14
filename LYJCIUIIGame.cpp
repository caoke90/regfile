//
//  LYJCIUIIGame.cpp
//  math_kg
//
//  Created by lili on 13-6-13.
//
//

#include "LYJCIUIIGame.h"

bool LYJCIUIIGame::isHaveAlpha(CCPoint point,CCSprite* sprite)
{
    unsigned char data[4];
    CCSize s = CCDirector::sharedDirector()->getWinSize();
    CCRenderTexture* renderTexture = CCRenderTexture::create(s.width, s.height, kCCTexture2DPixelFormat_RGBA8888);
    
    renderTexture->begin();
    sprite->visit();
    
    glReadPixels((GLint)point.x,(GLint)point.y, 1, 1, GL_RGBA, GL_UNSIGNED_BYTE, data);
    renderTexture->end();
    
    if(data[0] != 0 && data[1] != 0 && data[2] != 0 && data[3] != 0)
    {
        //            CCLog("have");
        return true;
    }
    //        CCLog("not have");
    return false;
}


CCArray* LYJCIUIIGame::LYJgetNumbersArr(int total, int amount)
{
    //int类型的数装入数组中，使用CCInteger进行封装
    srand((unsigned) time(NULL));
    CCArray *arr = CCArray::create();
    int* All = new int[total];
    for (int i = 0; i<total; i++) {
        All[i] = i;
    }
    int end = total;
    for (int i=0; i<amount; i++) {
        int r = rand()%end;
        int a = All[r];
        All[r] = All[end-1];
        CCInteger *integer = CCInteger::create(a);
        arr->addObject(integer);
        end--;
    }
	delete []All;
    return arr;
}
CCArray* LYJCIUIIGame::LYJgetNumbersArr2(int total, int amount)
{
    //int类型的数装入数组中，使用CCInteger进行封装
    srand((unsigned) time(NULL));
    CCArray *arr = CCArray::create();
    int* All = new int[total];
    for (int i = 0; i<total; i++) {
        All[i] = i;
    }
    int end = total;
    for (int i=0; i<amount; i++) {
        int r = rand()%end;
        int a = All[r];
        All[r] = All[end-1];
        CCInteger *integer = CCInteger::create(a);
        arr->addObject(integer);
        end--;
    }
	delete []All;
    return arr;
}

bool LYJCIUIIGame::ReleaseMap(std::map<int, CCPoint> *maparr)
{
    // delete the element
    for( std::map<int, CCPoint>::iterator iter = maparr->begin();
        iter != maparr->end();   iter++)
    {
        maparr->erase(iter);
    }

    return true;
}