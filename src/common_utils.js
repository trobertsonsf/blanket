/*
  Blanket.js
  Common utils
  Version 2.0
*/

(function(isNode,globalScope){
    var title = "BLANKET",
        showDebug=false;

    function debug(msg){
        if (showDebug){
            console.log(title,"-",msg);
        }
    }

    function enableDebug(){
        showDebug=true;
    }

    function matchPatternAttribute(filename,pattern){
        if (typeof pattern === 'string'){
            if (pattern.indexOf("[") === 0){
                //treat as array
                var pattenArr = pattern.slice(1,pattern.length-1).split(",");
                return pattenArr.some(function(elem){
                    return matchPatternAttribute(filename,normalizeBackslashes(elem.slice(1,-1)));
                });
            }else if ( pattern.indexOf("//") === 0){
                var ex = pattern.slice(2,pattern.lastIndexOf('/')),
                    mods = pattern.slice(pattern.lastIndexOf('/')+1),
                    regex = new RegExp(ex,mods);
                return regex.test(filename);
            }else if (pattern.indexOf("#") === 0){
                return globalScope[pattern.slice(1)].call(globalScope,filename);
            }else{
                return filename.indexOf(normalizeBackslashes(pattern)) > -1;
            }
        }else if ( pattern instanceof Array ){
            return pattern.some(function(elem){
                return matchPatternAttribute(filename,elem);
            });
        }else if (pattern instanceof RegExp){
            return pattern.test(filename);
        }else if (typeof pattern === "function"){
            return pattern.call(globalScope,filename);
        }
    }

    function normalizeBackslashes(str) {
        return str.replace(/\\/g, '/');
    }

    var exportables = {
        debug: debug,
        enableDebug: enableDebug,
        matchPatternAttribute: matchPatternAttribute
    };

    if (isNode) {
        module.exports = exportables;
    } else {
        globalScope.Blanket.utils = exportables;
    }
})(typeof window === "undefined",typeof window === "undefined" ? global : window);
