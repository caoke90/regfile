//格式化
var gsh=  [
    //匹配函数
    [/\n *\/\/.*/g,""],
    [/@synthesize.*/g,""],
    [/([\-\+][\d\D]*?)(?=\n+\-)/g,function(m,p1){
        return p1+",\n";
    }],
    [/(\w+) \*/g,function(m,p1){
        return p1+"* "
    }],
    [/int /g,"var "],
    [/(\n *)(\w+) (?=\w+)/g,function(m,p1,p2){
        if(p2=="return"||p2=="else"||p2=="case"){
            return m;
        }
        return p1+"var "
    }],
    ["ccTouchesBegan","onTouchesBegan"],
    ["ccTouchesMoved","onTouchesMoved"],
    ["ccTouchesEnded","onTouchesEnded"],
    ["ccTouchBegan","onTouchesBegan"],
    ["ccTouchMoved","onTouchesMoved"],
    ["ccTouchEnded","onTouchesEnded"],
    [/YES/g,"true"],
    [/NO/g,"false"],
    [/nil/g,"null"],
    ["NSLog","//NSLog"],
    [/(\n-.*)\{/g,function(m,p1){
        return p1+"\n{"
    }],
    ["ccp","cc.p"],
    ["#import","//"],
    []
]

var pipei=[
    [/(\n *)\w+\*/g,function(m,p1){
        return p1+"var"
    }],
    [/\(var *\)/g,""],
    [/\n\+/g,"\n-"],
    [/(\n-.*?:)(.*)/g,function(m,p1,p2){
        p2=p2.replace(/ +\w+:/g,",");
        return p1+"function("+p2+")"
    }],
    [/\n-[\(\)\w]+(.*)/g,function(m,p1){
        if(m.indexOf(":">-1)){
            return m
        }
        return m+":function()"
    }],
    [/\n- *\(.*?\)/g,function(m,p1){
        return "";
    }],

    [/@implementation (\w+)([\d\D]*)@end/,function(m,p1,p2){
        return "var "+p1+"=cc.Layer.extend({"+p2+"})";
    }],
    [/if *\(self\)/g,""],
    [/\[(\w+) +(\w+)\]/g,function(m,p1,p2){
        return p1+"."+p2+"()";
    }],
    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],

    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],
    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],
    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],
    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],
    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],
    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],
    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],
    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],
    [/\[([^[]*?)\]/g,function(m,p1){
        p1=p1.replace(/:/,"(");
        p1=p1.replace(/ *\w*\:/g,",");
        return p1+")";
    }],
    [/\},\n*/g,"},\n\n"],
    [/\(\)(\w+)/g,function(m,p1){
        return "()."+p1;
    }],
    [/([^=]+?) +(\w+\()/g,function(m,p1,p2){
        return p1+"."+p2;
    }],
    [/(\d+)f/g,function(m,p1){
        return p1;
    }],

    [/(\W)CC/g,function(m,p1){
        return p1+"cc.";
    }],
    ["super","this"],
    ["self","this"],
    [/(\w+)(\:function[\d\D]*?\})/g,function(m,p1,p2){
        p2=p2.replace("this."+p1,"this._super")
        return p1+p2;
    }],
    [/\.isEqualToString\((.*?)\)/g,function(m,p1){
        return "=="+p1
    }],

    []
]
var pipei2=[
    [/(.+\.)position *=([^\;]+)/g,function(m,p1,p2){
        return p1+"setPosition("+p2+")";
    }],
    [".position",".getPosition()"],
    [/(\w+\.)tag *=([^\;^\=]+)/g,function(m,p1,p2){
        return p1+"setTag("+p2+")";
    }],
    [".tag",".getTag()"],
    [/(\w+\.)isTouchEnabled *=([^\;]+)/g,function(m,p1,p2){
        return p1+"isTouchEnabled("+p2+")";
    }],
    ["playBackgroundMusic","playMusic"],
    ["stopBackgroundMusic","stopMusic"],
    ["addObject","push"],
    [/@selector\((\w+)\)/g,function(m,p1){
        return "this."+p1;
    }],
    [/\. *release *\(\)/g,"=null"],
    ["animationWithSpriteFrames","create"],
    ["actionWithDuration","create"],
    ["actionWithAction","create"],
    ["actionWithAnimation","create"],
    ["actionWithTarget","create"],
    ["actions","create"],
    ["spriteWithFile","create"],
    ["actionWithBlock","create"],
    ["itemWithNormalSprite","create"],
    ["menuWithItems","create"],
    [".action(",".create"],
    [".node",".create"],
    ["NSMutableArray.array()","[]"],
    ["CallBlock","CallFunc"],
    [/\^/g,"function"],
    ["void",""],
    ["spriteFrameByName","getSpriteFrame"],
    ["sharedSpriteFrameCache","getInstance"],
    ["spriteWithSpriteFrameName","createWithSpriteFrameName"],

    ["CGRectContainsPoint","cc.Rect.CCRectContainsPoint"],
    ["boundingBox","getBoundingBoxToWorld()"],
    [/NSString.stringWithFormat\((.*?),(.*?),(.*?)\)/g,function(m,p1,p2,p3){
        p1=p1.replace("%@","\"+"+p2+"+\"")
        p1=p1.replace("%d","\"+parseInt("+p3+")+\"")
        return p1
    }],
    [/NSString.stringWithFormat\((.*?),(.*?)\)/g,function(m,p1,p2){
        p1=p1.replace("%@","\"+"+p2+"+\"")
        p1=p1.replace("%d","\"+parseInt("+p2+")+\"")
        return p1;
    }],

    ["NSString.stringWithFormat",""],
    ["@",""],
    [/(cc\.CallFunc\.create\()(.+?),(.+?)(\))/g,function(m,p1,p2,p3,p4){
        return p1+p3+","+p2+p4
    }],
    [/(CallFunc[\d\D]*?\})(\),)/g,function(m,p1,p2){
        return p1+",this"+p2
    }],
    [/[^=]+pathForResource\(\"(\w+)\",\"(\w+)\"\)/g,function(m,p1,p2,p3){
        return "cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe("+p1+"_"+p2+")"
    }],
    ["SimpleAudioEngine","cc.AudioEngine"],
    ["sharedEngine","getInstance"],
    ["sharedDirector","getInstance"],
    [".for","for"],

    [" stopAllActions",".stopAllActions("],
    ["create)",".create()"],

    [/\},\n+ *\w+(?=\n)/g,function(m){
        return m+":function()"
    }],

    [" stopSpeak)",".stopSpeak()"],
    [" startSpeak)",".startSpeak()"],
    [/this *= *this/g,"this"],
    ["init)","init()"],
    ["stopMusic)","stopMusic()"],
    [" removeUnusedTextures)",".removeUnusedTextures()"],
    ["stopMusic)","stopMusic()"],
    [/finally[\d\D]+?\}/g,function(m){
        return ""
    }],
    [/(catch[\d\D]+?)var/g,function(m,p1){
        return p1
    }],
    [/.*addTargetedDelegate.*true.*/g,"this.setTouchEnabled(true);"],
    [/.*removeDelegate.*/g,"this.setTouchEnabled(false);"],
    ["touch,event","touches,event"],
    [/[^=]*convertToGL.*/g,"touches[0].getLocation();"],
    ["NSArray.alloc().initWithContentsOfFile",""],
    ["CGPointZero","cc.PointZero"],
    ["CGRectMake","cc.RectMake"],
    [" getBoundingBoxToWorld())",".getBoundingBoxToWorld()"],
    [" visible)","._visible"],
    ["count()","length"],
    [" count)",".length"],
    [/([^=^;^<^>^\n]*?) *intValue\)/g,function(m,p1){
        return "parseInt("+p1+")";
    }],

    [/.objectAtIndex\((.+?)\)/g,function(m,p1){
        return "["+p1+"]";
    }],
    [/.objectForKey\((.+?)\)/g,function(m,p1){
        return "["+p1+"]";
    }],
    [/[^=]*NSMutableArray.*init]/g,"[]"],
    [" winSize)",".getWinSize()"],
    [") stopMusic",").stopMusic"],
    ["else.if","else if"],
    [".if","else if"],
    [" CGPointValue)",""],
    [" stopAllEffect)",".stopAllEffect()"],
    [/function\((.*)\)/g,function(m,p1){
        p1=p1.replace(/\(.*?\)/g,"")
        return "function("+p1+")";
    }],
    ["\n-","\n"],
    [/(\n *scene) */,function(m,p1){
        return p1+":function()"
    }],
    ["ccc3","cc.c3"],
    [/NSMutableDictionary.*\((.+?)\)/g,function(m,p1){
        return p1;
    }],
    [/PersonalApi\.addBatchNode\(\"(.*?)\",.*/g,function(m,p1){
        return "addBatchNodeRes("+p1+"_png,"+p1+"_plist"+",this"+",0);"
    }],
    [/arc4random\(\) *%/g,"0|Math.random()*"],
    [/function *\(.*\)/g,function(m,p1){
        return m.replace(/:/g,",");
    }],
    [".intValue()",""],
    [".removeAllObjects()","=[]"],
    ["..","."],
    [/\"\"\+/g,""],
    [/\+\"\"/g,""],
    [/dealloc[\d\D]*?\}\,/g,""],
    ["removeObjectAtIndex","remove"],
    ["labelWithString","create"],
    [")removeFromParentAndCleanup",").removeFromParentAndCleanup"],
    ["removeFromParentAndCleanup","removeFromParent"],
    [/\(cc.Sprite *\* *\)/g,""],
    [/\( *touch *, *event *\)/g,"(touches,event)"],
    [/var location .*\n.*location =touches\[0\]\.getLocation\(\)\;/g,"var location =touches[0].getLocation();"],
    ["cc.Sprite*","var"],
    [/for *\(.* (.*) in (.*)\)[\n ]*\{/g,function(m,p1,p2){
        return "for(var ik=0;ik<"+p2+".length;ik++){\n"+"    var "+p1+"="+p2+"[ik];";
//         return m+"这里有个坑";
    }],
    [/(\{[^\}]*)else if/g,function(m,p1){
        return p1+"if"
    }],
    [/\[\((.*)\]\)/g,function(m,p1){
        return "["+p1+"]";
    }],
    [/(Sprite\.create\()\"(.*?)\"(\))/g,function(m,p1,p2,p3){
        return p1+p2.replace(".","_")+p3
    }],
    [".scale =",".setScale("],
    ["()()","()"],
    []
];
module.exports=[].concat(gsh,pipei,pipei2)

