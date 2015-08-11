cc=console
var path=require("path")

module.exports=function(){
    var thelayer="",endfunc=""
    var funcArr=[]
    var id= 0,id2=0
    var arr1=[],arr2=[]
//格式化
    var gsh=  [
        [/#define (\w+) /g,"var $1="],
        [/enum *\{([\s\S]*?)\};/g,function(m,p1){
            return p1.replace(/\n/,"var ")
        }],
        [/#include /g,"//#include "],
        [/\nusing /g,"\n//using "],
        [/CCDictionary +(\w+?);/g,"var $1=[];"],
        [/std\:\:map\<int\, CCPoint\> +(\w+?);/g,"var $1=[];"],

        //匹配函数
        [/(\n\s+)(\w+ *\*)/g,"$1var "],
        //
        [/ (CCPoint|bool|float|int|CCSetIterator|void) /g,"var "],
        [/\((CCPoint|bool|float|int|CCSetIterator)\)/g,""],
        [/(for.*?)int/g,"$1var"],
        [/\(\w+ *\*\)/g,""],
        [/new CCArray.*?\)/g,"[]"],

        ["count()","length"],
        ["NULL","null"],
        ["->","."],

        [/\.at\((.*)\)/g,"[$1]"],
        ["CCPointMake","cc.p"],
        ["addObject","push"],
        //路径处理
        ["CCSpriteFrameCache::sharedSpriteFrameCache().addSpriteFramesWithFile","cc.spriteFrameCache.addSpriteFrames"],
        ["CCParticleSystemQuad::create","cc.ParticleSystem.create"],
        ["CCSpriteFrameCache::sharedSpriteFrameCache().removeSpriteFramesFromFile","cc.spriteFrameCache.removeSpriteFramesFromFile"],
        ["CocosDenshion::SimpleAudioEngine::sharedEngine()","cc.audioEngine"],
        ["playBackgroundMusic","playMusic"],

        ["CCSprite::createWithSpriteFrameName(","cc.Sprite.create('#'+"],
        ["'#'+\"",'"#'],
        ["CCSprite::create","cc.Sprite.create"],
        [/\("(res.*?)"\)/g,function(m,p1){
            var name=path.basename(p1).replace(/(\.|-)/,"_")
            return "(res."+name+")"
        }],

        ["CCFileUtils::sharedFileUtils().fullPathForFilename","cc.loader.getRes"],
        ["CCDictionary::createWithContentsOfFile",""],
        [".c_str()",""],
        [".getCString()",""],
        [".release()","=null"],
        ["::","."],
        ["CCSequence","cc.Sequence"],
        ["CCDelayTime","cc.DelayTime"],
        ["CCMove","cc.Move"],
        ["CCRepeat","cc.Repeat"],
        ["CCRotate","cc.Rotate"],
        ["CCCallFunc","cc.CallFunc"],
        ["CCHide","cc.Hide"],
        ["CCScale","cc.Scale"],
        ["CCInteger","cc.Integer"],
        ["CCJump","cc.Jump"],
        ["CCSpawn.createWithTwoActions","cc.Spawn.create"],
        ["CCEaseElasticOut","cc.EaseElasticOut"],
        ["CCLog","cc.log"],
        ["ccp(","cc.p("],
        ["CCArray.create()","[]"],
        [/\(.*?\)/g,function(m,p1){
            m= m.replace(/(\d).f/g,"$1")
            return m.replace(/(\d)f/g,"$1")
        }],
        [/(\w+)\.intValue\(\)/g,"parseInt($1)"],
        [/(\w+)\.floatValue\(\)/g,"parseFloat($1)"],
        [/\(\((.*?)\)\.intValue\(\)/g,"(parseInt($1)"],
        [/\(\((.*?)\)\.floatValue\(\)/g,"(parseFloat($1)"],
        [".intValue()",""],
        [".floatValue()",""],
        [/([^=]*)\.boolValue\(\)/g,"$1"],
        [/([^=]*)\.getCString\(\)/g,"$1"],
        [/\.autorelease\(\)/g,""],
        ["removeFromParentAndCleanup","removeFromParent"],
        [/(\S+)\.removeObject\((.*)\)/g,"cc.arrayRemoveObject($1,$2)"],
        ["boundingBox","getBoundingBox"],
        ["std.string","var"],
        ["CCDirector.sharedDirector()","//CCDirector.sharedDirector()"],
        ["new map<int, CCPoint>","{}"],
        [/(\s)(getChildByTag|convertTouchToNodeSpace|unschedule|schedule)/g,"$1this.$2"],
        [/\.insert\(std.make_pair\((.*?),(.*)\)\);/g,'[$1]=$2;'],

        [/([^ ]+?)\.intersectsRect\((.+?)\)/g,"cc.intersectsRect($1,$2)"],
        ["cc.intersectsRect(if","if(cc.intersectsRect"],
        ["(void)","()"],
        []
    ]
    var pipei=[
        //给{}编号
        [/[\{\}]/g,function(m){
            if(m=="{"){
                m=m+"<%"+id2+"%>"
                id2++
            }
            if(m=="}"){
                id2--
                m="<%"+id2+"%>"+m
            }
            return m
        }],
        [/[\(\)]/g,function(m){
            if(m=="("){
                id++
                arr1.push(id)
                m=m+"<%"+id+"%>"
            }
            if(m==")"){
                var curid=arr1.pop()
                m="<%"+curid+"%>"+m

            }
            return m
        }],


        [/\.setObject\((<%\d+%>)(.*),(.*?)\1\)/g,"[parseInt($3)]=$2"],
        [/\.removeObjectForKey\((<%\d+%>)(.*?)\1\)/g,"[$2]=null"],
        [/\.objectForKey\((<%\d+%>)(.*?)\1\)/g,"[$2]"],
        [/\.getControlPointAtIndex\((<%\d+%>)(.*?)\1\)/g,"[$2]"],
        [/\.objectAtIndex\((<%\d+%>)(.*?)\1\)/g,"[$2]"],
        [/CCString\.createWithFormat\((<%\d+%>)(.*?)\1\)/g,function(m,p1,p2){
            var params= []
            params=p2.split(",")
            var str=params[0].replace("%d","\"+parseInt("+ params[1]+")+\"")
            return str
        }],
        [/CCARRAY_FOREACH\((<%\d+%>)(.*)\1\)\s*\{(<%\d+%>)([\s\S]*?)\3\}/g,function(m,p1,p2,p3,p4){
            var params=p2.split(",")
            m=params[0]+".forEach(function("+params[1]+"){"+p4+"})"

            return m
        }],
        [/cc\.CallFunc\.create\((<%\d+%>)([\s\S]*?)\1/g,function(m,p1,p2,p3){
            var params=p2.split(",")
            var temp=params[0]
            params[0]=params[1].replace(/callfunc_selector\((<%\d+%>)([\s\S]*?)\1\)/,"$2")
            params[1]=temp
            m=m.replace(p2,params.join(","))
            return m
        }],
        [/schedule\((<%\d+%>)([\s\S]*?)\1/g,function(m,p1,p2,p3){

            var f2=p2.replace(/schedule_selector\((<%\d+%>)([\s\S]*?)\1\)/,"$2")

            m=m.replace(p2,f2)
            return m
        }],
        //获取layer
        [/(\w+)\.init\((<%\d+%>)\2\)/,function(m,p1){
            cc.log(p1)
            thelayer=p1
            return m
        }],
        [/(?!\n)(.*)\s*\{<%0%>([\s\S]+?)<%0%>\}/g,function(m,p1,p2){
            if(!thelayer){return m;}
            var name,params
            p1.replace(new RegExp(thelayer+"\\.(.*?)\\((.*?)\\)","g"),function(m,p1,p2){
                name=p1
                params=p2.replace(/([\.\w]+?) \**/g,"")

            })
            if(!name){return m;}
            if(name=="~"+thelayer){
                name=thelayer
            }
            if(name=="scene"){
                endfunc=p2
                return "";
            }else{
                if(funcArr.indexOf(name)==-1){
                    funcArr.push(name)
                }
            }
            p2=p2.replace(new RegExp(thelayer,"g"),"this")

            return name+":function("+params+"){<%0%>\n"+p2+"\n<%0%>},"
        }],
        [/(.*\{<%0%>)/,function(m,p1){
            if(!thelayer){
                return m
            }
            return "var "+thelayer+"=cc.Layer.extend({\n"+m
        }],

        [/\}\,\s+$/,function(m,p1){
            var n1="}\n})\n"
            return n1
        }],
        [/(\}\)\n)$/,function(m,p1){

            if(!endfunc){
                endfunc="\nvar scene = CCScene.create();\n    var layer = new "+thelayer+"();\nscene.addChild(layer);\nlayer.init();\nreturn scene;";

            }
            endfunc=endfunc.replace(thelayer+".create","new "+thelayer)

            var n2=thelayer+".scene=function(){"+endfunc+"\n}"
            return p1+n2
        }],
        ["CCScene","cc.Scene"],
        [/(\w+\.\w+\(.*?\))\.containsPoint\((<%\d+%>)(.+?)\2\)/g,"cc.rectContainsPoint($1,$3)"],
        [/(\w+)\.containsPoint\((<%\d+%>)(.+?)\2\)/g,"cc.rectContainsPoint($1,$3)"],
        [/<%\d+%>/g,""],
        //global
        [/[\s\S]+/,function(m,p1){
            if(!thelayer){return m;}
            funcArr.forEach(function(e){
                m=m.replace(new RegExp("[^\.]"+e+"\\(","g"),"this."+e+"(")
                cc.log(e)
            })
            return m
        }],
        []
    ]
    var pipei2=[
        [/\(\*(\w+)\)/g,"$1"],
        ["cocos2d.CCArray *","var "],
        [/CCArray\.createWithCapacity\(\d+\)/g,"[]"],
        [/\(\w+\* /g,"("],
        [/\w+\* /g,""],
        ["CCLayer","this"],
        ["CCAnimation","cc.Animation"],
        ["setFlipX","setFlippedX"],
        ["cc.spriteFrameCache.addSpriteFrameWithFile","cc.spriteFrameCache.addSpriteFrames"],
        ["CCSpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName","cc.spriteFrameCache.getSpriteFrame"],
        ["cc.AudioEngine.getInstance()","cc.audioEngine"],
        ["cc.Director.getInstance()","cc.director"],
        ["CCTextureCache.sharedTextureCache().removeUnusedTextures()","//CCTextureCache.sharedTextureCache().removeUnusedTextures()"],
        ["CCEaseBounceInOut","cc.EaseBounceInOut"],
        ["CCRANDOM_0_1()","Math.random()"],
        ["CCSpawn","cc.Spawn"],
        ["CCBezierTo","cc.BezierTo"],
        ["SimpleAudioEngine.sharedEngine()","cc.audioEngine"],
        ["preloadBackgroundMusic","preloadMusic"],
        ["arc4random()%","0|Math.random()*"],
        [/CCPointArray\.create\(\d+\)/g,"[]"],

        ["push_back","push"],
        ["addControlPoint","push"],
        ["CCEaseSine","cc.EaseSine"],
        [".removeAllObjects()","=[]"],
        []
    ];
       return [].concat(gsh,pipei,pipei2)
}



