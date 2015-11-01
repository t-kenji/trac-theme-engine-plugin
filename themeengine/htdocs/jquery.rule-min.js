!function($){function setArray(rule,elems){rule.length=0,Array.prototype.push.apply(rule,elems)}var storageNode=$('<style rel="alternate stylesheet" type="text/css" />').appendTo("head")[0],sheet=storageNode.sheet?"sheet":"styleSheet",storage=storageNode[sheet],rules=storage.rules?"rules":"cssRules",remove=storage.deleteRule?"deleteRule":"removeRule",owner=storage.ownerNode?"ownerNode":"owningElement",reRule=/^([^{]+)\{([^}]*)\}/m,reStyle=/([^:]+):([^;}]+)/;storage.disabled=!0;var $rule=$.rule=function(r,c){if(!(this instanceof $rule))return new $rule(r,c);if(this.sheets=$rule.sheets(c),r&&reRule.test(r)&&(r=$rule.clean(r)),"object"!=typeof r||r.exec){if(setArray(this,this.sheets.cssRules().get()),r)return this.filter(r)}else setArray(this,r.get?r.get():r.splice?r:[r]);return this};$.extend($rule,{sheets:function(c){var o=c;return"object"!=typeof o&&(o=$.makeArray(document.styleSheets)),o=$(o).not(storage),"string"==typeof c&&(o=o.ownerNode().filter(c).sheet()),o},rule:function(str){return str.selectorText?["",str.selectorText,str.style.cssText]:reRule.exec(str)},appendTo:function(r,ss,skip){switch(typeof ss){case"string":ss=this.sheets(ss);case"object":if(ss[0]&&(ss=ss[0]),ss[sheet]&&(ss=ss[sheet]),ss[rules])break;default:if("object"==typeof r)return r;ss=storage}var p;!skip&&(p=this.parent(r))&&(r=this.remove(r,p));var rule=this.rule(r);return ss.addRule?ss.addRule(rule[1],rule[2]||";"):ss.insertRule&&ss.insertRule(rule[1]+"{"+rule[2]+"}",ss[rules].length),ss[rules][ss[rules].length-1]},remove:function(r,p){if(p=p||this.parent(r),p!=storage){var i=p?$.inArray(r,p[rules]):-1;-1!=i&&(r=this.appendTo(r,0,!0),p[remove](i))}return r},clean:function(r){return $.map(r.split("}"),function(txt){return txt?$rule.appendTo(txt+"}"):void 0})},parent:function(r){if("string"==typeof r||!$.browser.msie)return r.parentStyleSheet;var par;return this.sheets().each(function(){return-1!=$.inArray(r,this[rules])?(par=this,!1):void 0}),par},outerText:function(rule){return rule&&rule.selectorText?[rule.selectorText+"{","	"+rule.style.cssText,"}"].join("\n").toLowerCase():""},text:function(rule,txt){return void 0!==txt&&(rule.style.cssText=txt),rule?rule.style.cssText.toLowerCase():""}}),$rule.fn=$rule.prototype={pushStack:function(rs,sh){var ret=$rule(rs,sh||this.sheets);return ret.prevObject=this,ret},end:function(){return this.prevObject||$rule(0,[])},filter:function(s){var o;return s||(s=/./),s.split?(o=$.trim(s).toLowerCase().split(/\s*,\s*/),s=function(){var s=this.selectorText||"";return!!$.grep(s.toLowerCase().split(/\s*,\s*/),function(sel){return-1!=$.inArray(sel,o)}).length}):s.exec&&(o=s,s=function(){return o.test(this.selectorText)}),this.pushStack($.grep(this,function(e,i){return s.call(e,i)}))},add:function(rs,c){return this.pushStack($.merge(this.get(),$rule(rs,c)))},is:function(s){return!(!s||!this.filter(s).length)},not:function(n,c){return n=$rule(n,c),this.filter(function(){return-1==$.inArray(this,n)})},append:function(s){var rule,rules=this;return $.each(s.split(/\s*;\s*/),function(i,v){(rule=reStyle.exec(v))&&rules.css(rule[1],rule[2])}),this},text:function(txt){return arguments.length?this.each(function(){$rule.text(this,txt)}):$rule.text(this[0])},outerText:function(){return $rule.outerText(this[0])}},$.each({ownerNode:owner,sheet:sheet,cssRules:rules},function(m,a){var many=a==rules;$.fn[m]=function(){return this.map(function(){return many?$.makeArray(this[a]):this[a]})}}),$.fn.cssText=function(){return this.filter("link,style").eq(0).sheet().cssRules().map(function(){return $rule.outerText(this)}).get().join("\n")},$.each("remove,appendTo,parent".split(","),function(k,f){$rule.fn[f]=function(){var args=$.makeArray(arguments),that=this;return args.unshift(0),this.each(function(i){args[0]=this,that[i]=$rule[f].apply($rule,args)||that[i]})}}),$.each("each,index,get,size,eq,slice,map,attr,andSelf,css,show,hide,toggle,queue,dequeue,stop,animate,fadeIn,fadeOut,fadeTo".split(","),function(k,f){$rule.fn[f]=$.fn[f]});var curCSS=$.curCSS;$.curCSS=function(e,a){return"selectorText"in e?e.style[a]||$.prop(e,"opacity"==a?1:0,"curCSS",0,a):curCSS.apply(this,arguments)},$rule.cache={};var mediator=function(original){return function(elm){var id=elm.selectorText;return id&&(arguments[0]=$rule.cache[id]=$rule.cache[id]||{}),original.apply($,arguments)}};$.data=mediator($.data),$.removeData=mediator($.removeData),$(window).unload(function(){$(storage).cssRules().remove()})}(jQuery);