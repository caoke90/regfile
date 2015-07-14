var fs = require('fs');
var str,arr;
cc=console
arr=require('./reg.js')
var h=fs.readFileSync("LYJCIUIIGameStepOne.h").toString();
var cpp=fs.readFileSync("LYJCIUIIGameStepOne.cpp").toString();
var str=h+cpp

var tihuan=function(filename){

    for(var i=0;i<arr.length;i++){
        var p1,p2;
        p1=arr[i][0];
        p2=arr[i][1];
        if(typeof p1=="string"){
             p1=p1.replace(/[\(\)\[\]\\\*\^\:\.\+]/g,function(m){
                 return "\\"+m;
             })

            p1=new RegExp(p1,"g")

        }
        str=str.replace(p1,p2)
    }

    fs.mkdir("js",function(err){
        if(err){return;}
    })
    fs.writeFile("js/"+filename+'.js',str,function(err){
        console.log("------结束-------")
    })

}
tihuan("LYJCIUIIGameStepOne")