//格式化
var gsh=  [
    //匹配函数
    [/#ifndef .*\n/g,""],
    [/#define .*\n/g,""],
    [/#include.*\n/g,""],
    [/using .*\n/g,""],
    [/class (.*): public (.*)/g,function(m,p1,p2){
        if(!p2){
            p2="cc.Layer"
        }
        return "var "+p1+"="+p2+".extend({})"
    }],

    []
]

var pipei=[

    []
]
var pipei2=[

    []
];
module.exports=[].concat(gsh,pipei,pipei2)

