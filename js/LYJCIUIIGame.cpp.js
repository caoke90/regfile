//

#include "LYJCIUIIGame.h"

var LYJCIUIIGame::isHaveAlpha(cc.Povar point,var sprite)
{
    var char data4);
    var s = cc.Director::getInstance()->getWinSize();
    var renderTexture = cc.RenderTexture::create(s.width, s.height, kCCTexture2DPixelFormat_RGBA8888);
    
    renderTexture->begin();
    sprite->visit();
    
.glReadPixels((GLint)point.x,(GLint)point.y, 1, 1, GL_RGBA, GL_UNSIGNED_BYTE, data);
    renderTexture->end();
    
if(data0) != 0 && data1) != 0 && data2) != 0 && data3) != 0)
    {
        return true;
    }
    return false;
}


var LYJCIUIIGame::LYJgetNumbersArr(var total, var amount)
{
.srand((unsigned).time(NULL));
    var arr = cc.Array::create();
    var All = new inttotal);
    for (var i = 0; i<total; i++) {
        Alli) = i;
    }
    var end = total;
    for (var i=0; i<amount; i++) {
        var r = rand()%end;
        var a = Allr);
        Allr) = Allend-1);
        var integer = cc.Integer::create(a);
        arr->push(integer);
        end--;
    }
	delete )All;
    return arr;
}
var LYJCIUIIGame::LYJgetNumbersArr2(var total, var amount)
{
.srand((unsigned).time(NULL));
    var arr = cc.Array::create();
    var All = new inttotal);
    for (var i = 0; i<total; i++) {
        Alli) = i;
    }
    var end = total;
    for (var i=0; i<amount; i++) {
        var r = rand()%end;
        var a = Allr);
        Allr) = Allend-1);
        var integer = cc.Integer::create(a);
        arr->push(integer);
        end--;
    }
	delete )All;
    return arr;
}

var LYJCIUIIGame::ReleaseMap(std::map<int, cc.Point> *maparr)
{
for( std::map<int, cc.Point>::iterator iter = maparr->begin();
        iter != maparr->end();   iter++)
    {
        maparr->erase(iter);
    }

    return true;
}