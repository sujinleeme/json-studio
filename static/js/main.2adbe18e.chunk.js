(this["webpackJsonpreact-json-editor"]=this["webpackJsonpreact-json-editor"]||[]).push([[0],{72:function(t,e,n){var i=function(){var t={trace:function(){},yy:{},symbols_:{error:2,JSONString:3,STRING:4,JSONNumber:5,NUMBER:6,JSONNullLiteral:7,NULL:8,JSONBooleanLiteral:9,TRUE:10,FALSE:11,JSONText:12,JSONValue:13,EOF:14,JSONObject:15,JSONArray:16,"{":17,"}":18,JSONMemberList:19,JSONMember:20,":":21,",":22,"[":23,"]":24,JSONElementList:25,$accept:0,$end:1},terminals_:{2:"error",4:"STRING",6:"NUMBER",8:"NULL",10:"TRUE",11:"FALSE",14:"EOF",17:"{",18:"}",21:":",22:",",23:"[",24:"]"},productions_:[0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],performAction:function(t,e,n,i){var r=n.length-1;switch(e){case 1:this.$=t.replace(/\\(\\|")/g,"$1").replace(/\\n/g,"\n").replace(/\\r/g,"\r").replace(/\\t/g,"\t").replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\b/g,"\b");break;case 2:this.$=Number(t);break;case 3:this.$=null;break;case 4:this.$=!0;break;case 5:this.$=!1;break;case 6:return this.$=n[r-1];case 13:this.$={};break;case 14:this.$=n[r-1];break;case 15:this.$=[n[r-2],n[r]];break;case 16:this.$={},this.$[n[r][0]]=n[r][1];break;case 17:this.$=n[r-2],n[r-2][n[r][0]]=n[r][1];break;case 18:this.$=[];break;case 19:this.$=n[r-1];break;case 20:this.$=[n[r]];break;case 21:this.$=n[r-2],n[r-2].push(n[r])}},table:[{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],12:1,13:2,15:7,16:8,17:[1,14],23:[1,15]},{1:[3]},{14:[1,16]},{14:[2,7],18:[2,7],22:[2,7],24:[2,7]},{14:[2,8],18:[2,8],22:[2,8],24:[2,8]},{14:[2,9],18:[2,9],22:[2,9],24:[2,9]},{14:[2,10],18:[2,10],22:[2,10],24:[2,10]},{14:[2,11],18:[2,11],22:[2,11],24:[2,11]},{14:[2,12],18:[2,12],22:[2,12],24:[2,12]},{14:[2,3],18:[2,3],22:[2,3],24:[2,3]},{14:[2,4],18:[2,4],22:[2,4],24:[2,4]},{14:[2,5],18:[2,5],22:[2,5],24:[2,5]},{14:[2,1],18:[2,1],21:[2,1],22:[2,1],24:[2,1]},{14:[2,2],18:[2,2],22:[2,2],24:[2,2]},{3:20,4:[1,12],18:[1,17],19:18,20:19},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:23,15:7,16:8,17:[1,14],23:[1,15],24:[1,21],25:22},{1:[2,6]},{14:[2,13],18:[2,13],22:[2,13],24:[2,13]},{18:[1,24],22:[1,25]},{18:[2,16],22:[2,16]},{21:[1,26]},{14:[2,18],18:[2,18],22:[2,18],24:[2,18]},{22:[1,28],24:[1,27]},{22:[2,20],24:[2,20]},{14:[2,14],18:[2,14],22:[2,14],24:[2,14]},{3:20,4:[1,12],20:29},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:30,15:7,16:8,17:[1,14],23:[1,15]},{14:[2,19],18:[2,19],22:[2,19],24:[2,19]},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:31,15:7,16:8,17:[1,14],23:[1,15]},{18:[2,17],22:[2,17]},{18:[2,15],22:[2,15]},{22:[2,21],24:[2,21]}],defaultActions:{16:[2,6]},parseError:function(t,e){throw new Error(t)},parse:function(t){var e=this,n=[0],i=[null],r=[],s=this.table,a="",o=0,c=0,l=0;this.lexer.setInput(t),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var u=this.lexer.yylloc;function h(){var t;return"number"!==typeof(t=e.lexer.lex()||1)&&(t=e.symbols_[t]||t),t}r.push(u),"function"===typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var d,p,f,y,b,m,g,j,O,x,v={};;){if(f=n[n.length-1],this.defaultActions[f]?y=this.defaultActions[f]:(null==d&&(d=h()),y=s[f]&&s[f][d]),"undefined"===typeof y||!y.length||!y[0]){if(!l){for(m in O=[],s[f])this.terminals_[m]&&m>2&&O.push("'"+this.terminals_[m]+"'");var k="";k=this.lexer.showPosition?"Parse error on line "+(o+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+O.join(", ")+", got '"+this.terminals_[d]+"'":"Parse error on line "+(o+1)+": Unexpected "+(1==d?"end of input":"'"+(this.terminals_[d]||d)+"'"),this.parseError(k,{text:this.lexer.match,token:this.terminals_[d]||d,line:this.lexer.yylineno,loc:u,expected:O})}if(3==l){if(1==d)throw new Error(k||"Parsing halted.");c=this.lexer.yyleng,a=this.lexer.yytext,o=this.lexer.yylineno,u=this.lexer.yylloc,d=h()}for(;!(2..toString()in s[f]);){if(0==f)throw new Error(k||"Parsing halted.");x=1,n.length=n.length-2*x,i.length=i.length-x,r.length=r.length-x,f=n[n.length-1]}p=d,d=2,y=s[f=n[n.length-1]]&&s[f][2],l=3}if(y[0]instanceof Array&&y.length>1)throw new Error("Parse Error: multiple actions possible at state: "+f+", token: "+d);switch(y[0]){case 1:n.push(d),i.push(this.lexer.yytext),r.push(this.lexer.yylloc),n.push(y[1]),d=null,p?(d=p,p=null):(c=this.lexer.yyleng,a=this.lexer.yytext,o=this.lexer.yylineno,u=this.lexer.yylloc,l>0&&l--);break;case 2:if(g=this.productions_[y[1]][1],v.$=i[i.length-g],v._$={first_line:r[r.length-(g||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(g||1)].first_column,last_column:r[r.length-1].last_column},"undefined"!==typeof(b=this.performAction.call(v,a,c,o,this.yy,y[1],i,r)))return b;g&&(n=n.slice(0,-1*g*2),i=i.slice(0,-1*g),r=r.slice(0,-1*g)),n.push(this.productions_[y[1]][0]),i.push(v.$),r.push(v._$),j=s[n[n.length-2]][n[n.length-1]],n.push(j);break;case 3:return!0}}return!0}},e=function(){var t={EOF:1,parseError:function(t,e){if(!this.yy.parseError)throw new Error(t);this.yy.parseError(t,e)},setInput:function(t){return this._input=t,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.match+=t,this.matched+=t,t.match(/\n/)&&this.yylineno++,this._input=this._input.slice(1),t},unput:function(t){return this._input=t+this._input,this},more:function(){return this._more=!0,this},less:function(t){this._input=this.match.slice(t)+this._input},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},next:function(){if(this.done)return this.EOF;var t,e,n,i,r;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var s=this._currentRules(),a=0;a<s.length&&(!(n=this._input.match(this.rules[s[a]]))||e&&!(n[0].length>e[0].length)||(e=n,i=a,this.options.flex));a++);return e?((r=e[0].match(/\n.*/g))&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-1:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.yyleng=this.yytext.length,this._more=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],t=this.performAction.call(this,this.yy,this,s[i],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),t||void 0):""===this._input?this.EOF:void this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return"undefined"!==typeof t?t:this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(t){this.begin(t)},options:{},performAction:function(t,e,n,i){switch(n){case 0:break;case 1:return 6;case 2:return e.yytext=e.yytext.substr(1,e.yyleng-2),4;case 3:return 17;case 4:return 18;case 5:return 23;case 6:return 24;case 7:return 22;case 8:return 21;case 9:return 10;case 10:return 11;case 11:return 8;case 12:return 14;case 13:return"INVALID"}},rules:[/^(?:\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,12,13],inclusive:!0}}};return t}();return t.lexer=e,t}();e.parser=i,e.parse=i.parse.bind(i)},93:function(t,e,n){},99:function(t,e,n){"use strict";n.r(e);var i=n(0),r=n.n(i),s=n(146),a=n(37),o=n.n(a),c=(n(93),n(10)),l=n(4),u=n(150),h=n(153),d=n(147),p=n(5),f=function(){var t=[{key:"title",text:"title",onRender:function(){return Object(p.jsx)(h.a,{variant:"xLarge",nowrap:!0,block:!0,children:"JSON Online Editor"})}}];return Object(p.jsx)(d.a,{styles:{root:{alignItems:"center"}},ariaLabel:"app title",items:t})},y=n(155),b=n(156),m=function(t){var e=t.isSchemaEditorOn,n=t.onSchemaEditorChange,i=t.isSchemaSampleDataOn,r=t.onSchemaSampleDataOn,s=[{key:"use-json-schema",onRender:function(){return Object(p.jsx)(y.a,{children:Object(p.jsx)(b.a,{label:"Use JSON Schema",onChange:n,checked:e})})}},{key:"use-json-schema-sample-data",onRender:function(){return e&&Object(p.jsx)(y.a,{children:Object(p.jsx)(b.a,{label:"Use Sample Schema Data",onChange:r,checked:i})})}}];return Object(p.jsx)("div",{children:Object(p.jsx)(d.a,{styles:{root:{alignItems:"center"}},items:s,ariaLabel:"json content commands"})})},g=n(14),j=n(55),O=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=r.a.useState(t),n=Object(c.a)(e,2),i=n[0],s=n[1],a=r.a.useCallback((function(){s((function(t){return!t}))}),[]);return[i,a]},x=n(144),v=n(30),k=n(157),S=n(42),_=n(145),w=n(151),E="1px solid rgb(237, 235, 233)",C=Object(l.u)({wrapper:{height:"20vh",position:"relative",maxHeight:"inherit"}}),N={root:{padding:0,borderTop:E}},L=function(t,e){return t?Object(p.jsx)(x.a,{stickyPosition:v.a.Header,isScrollSynced:!0,children:e(Object(g.a)(Object(g.a)({},t),{},{styles:N}))}):null},I=function(t){var e=t.errors,n=e.map((function(t){return{key:"error-".concat(Object(w.a)()),problems:t}})),i=[{key:"problems",name:"Problems (".concat(e.length,")"),fieldName:"problems",minWidth:300,maxWidth:300,isResizable:!0}];return Object(p.jsx)(k.a,{scrollbarVisibility:S.b.auto,className:C.wrapper,children:Object(p.jsx)(_.a,{compact:!0,items:n,columns:i,checkboxVisibility:2,onRenderDetailsHeader:L})})},P=function(t){var e=t.title,n=[{key:e,text:e,onRender:function(){return Object(p.jsx)(h.a,{variant:"large",nowrap:!0,block:!0,children:e})}}];return Object(p.jsx)(d.a,{styles:{root:{alignItems:"center"}},ariaLabel:"app title",items:n})},A=function(t){var e=t.onFileHandle,n=Object(i.useRef)(null);return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(y.a,{iconProps:{iconName:"Upload"},text:"Upload",onClick:function(){n.current&&(n.current.value="",n.current.click())}}),Object(p.jsx)("input",{ref:n,style:{display:"none"},onChange:function(t){if(t.target.files){var n=t.target.files[0];e(n)}},type:"file",accept:"application/json"})]})},$=function(t){var e=t.onMinifyClick,n=t.onPrettifyClick,i=t.isAutoPrettifyOn,r=t.onAutoPrettifyChange,s=t.onClearClick,a=t.onDownloadClick,o=t.onUploadClick,c=t.isValidJson,l=[{key:"upload",onRender:function(){return Object(p.jsx)(A,{onFileHandle:o})}},{key:"download",text:"Download",ariaLabel:"Grid view",iconProps:{iconName:"Download"},onClick:a,disabled:!c},{key:"clear",text:"Clear",iconProps:{iconName:"Delete"},onClick:s},{key:"minify",text:"Minify",iconProps:{iconName:"MinimumValue"},onClick:e,disabled:!c||i},{key:"prettify",text:"Prettify",iconProps:{iconName:"MaximumValue"},onClick:n,disabled:!c||i},{key:"auto-prettify",onRender:function(){return Object(p.jsx)(y.a,{children:Object(p.jsx)(b.a,{label:"Auto Prettify",onChange:r,checked:i})})}}];return Object(p.jsx)(d.a,{styles:{root:{alignItems:"center"}},items:l,ariaLabel:"json content commands"})},J=n(54),R=n.n(J),V=n(71),D=function(){var t=Object(V.a)(R.a.mark((function t(e){var n,i,r,s;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=Object(w.a)(),i=new Blob([e],{type:"application/json"}),!window.navigator||!window.navigator.msSaveOrOpenBlob){t.next=6;break}window.navigator.msSaveOrOpenBlob(i,n),t.next=22;break;case 6:return t.prev=6,(r=document.createElement("a")).style.display="none",document.body.appendChild(r),t.next=12,window.URL.createObjectURL(i);case 12:s=t.sent,r.href=s,r.download="".concat(n,".json"),r.click(),window.document.body.removeChild(r),t.next=22;break;case 19:t.prev=19,t.t0=t.catch(6),console.log("Error: fail to download a file.");case 22:case"end":return t.stop()}}),t,null,[[6,19]])})));return function(e){return t.apply(this,arguments)}}(),U=n(72),F=(n.n(U).a,function(t){try{return JSON.parse(t)}catch(e){return{}}}),B={root:{height:"100%",borderTop:E,borderRight:E,borderBottom:E}},M=function(t){var e=t.defaultValue,n=t.schemaValue,r=t.title,s=t.path,a=Object(j.b)(),o=Object(i.useState)([]),l=Object(c.a)(o,2),h=l[0],d=l[1],f=O(!1),y=Object(c.a)(f,2),b=y[0],m=y[1],x=Object(i.useState)(!1),v=Object(c.a)(x,2),k=v[0],S=v[1],_=Object(i.useRef)(null),w=Object(i.useCallback)((function(){var t=_.current;if(t){t.layout({width:"auto",height:"auto"});var e=t._domElement;if(e){var n=e.getBoundingClientRect(),i=n.width,r=n.height;t.layout({width:i,height:r})}}}),[]),E=Object(i.useCallback)((function(){null===a||void 0===a||a.languages.json.jsonDefaults.setDiagnosticsOptions({validate:!0,schemas:n?[{uri:"http://myserver/foo-schema.json",fileMatch:["*"],schema:Object(g.a)({},F(n))}]:void 0})}),[n,a]),C=Object(i.useCallback)((function(){var t;null===(t=_.current)||void 0===t||t.getAction("editor.action.formatDocument").run()}),[]),N=Object(i.useCallback)((function(t){var e=_.current;e&&(e.setValue(t||""),t&&e.getAction("editor.action.formatDocument").run())}),[]);Object(i.useEffect)((function(){N(e)}),[e,N]),Object(i.useEffect)((function(){E()}),[n,E]),Object(i.useEffect)((function(){b&&C()}),[b,C]);var L=Object(i.useCallback)((function(t){var e,n=t.map((function(t){var e=t.startLineNumber,n=t.message;return"line ".concat(e,": ").concat(n)})),i=null===(e=_.current)||void 0===e?void 0:e.getValue(),r=n.length>0;S(!!i&&!r),d(n)}),[]),A=Object(i.useCallback)((function(){b&&C()}),[b,C]);return Object(p.jsxs)(u.a,{styles:B,children:[r&&Object(p.jsx)(u.a.Item,{children:Object(p.jsx)(P,{title:r})}),Object(p.jsx)(u.a.Item,{children:Object(p.jsx)($,{isValidJson:k,isAutoPrettifyOn:b,onAutoPrettifyChange:m,onClearClick:function(){var t;return null===(t=_.current)||void 0===t?void 0:t.setValue("")},onDownloadClick:function(){var t,e=null===(t=_.current)||void 0===t?void 0:t.getValue();e&&D(e)},onMinifyClick:function(){var t=_.current;if(t){var e=function(t){try{return JSON.stringify(JSON.parse(t),null)}catch(e){return t}}(t.getValue());t.setValue(e)}},onPrettifyClick:C,onUploadClick:function(t){var e=new FileReader;e.onload=function(){var t=e.result;N(t)},e.readAsText(t)}})}),Object(p.jsxs)(u.a,{styles:B,children:[Object(p.jsx)(u.a.Item,{grow:!0,align:"stretch",children:Object(p.jsx)(j.a,{language:"json",path:s,options:{automaticLayout:!0,autoClosingBrackets:"always",autoClosingQuotes:"always",formatOnPaste:!0,formatOnType:!0,scrollBeyondLastLine:!1},onMount:function(t){var n;_.current=t,null===(n=t.getModel())||void 0===n||n.updateOptions({tabSize:2,insertSpaces:!1}),window.addEventListener("resize",(function(){w()})),e&&N(function(t){try{return JSON.stringify(JSON.parse(t),null,"\t")}catch(e){return t}}(e))},onChange:A,beforeMount:function(){return E()},onValidate:L})}),Object(p.jsx)(u.a.Item,{children:Object(p.jsx)(I,{errors:h})})]})]})},T='{"name": "Lucrezia Nethersole", "email": "l.nethersole@hotmail.com", "date_of_birth": "2007\u201301\u201323" }',z='{ "name": "sample schema", "type": "object", "properties": { "name": { "title": "Name", "type": "string", "description": "Users full name supporting unicode but no emojis.", "maxLength": 20 }, "email": { "title": "Email", "description": "Like a postal address but for computers.", "type": "string", "format": "email" }, "date_of_birth": { "title": "Date Of Birth", "type": "string", "description": "Date of uses birth in the one and only date standard: ISO 8601.", "format": "date", "example": "1990\u201312\u201328" } }, "required": [ "name" ] }',H={root:{height:"100vh"}},G={root:{height:"100%"}},W=function(t){return Object(l.u)({root:[{width:"50%",height:"100%"},t&&{width:"100%",height:"100%"}]})},q=function(){var t=O(!1),e=Object(c.a)(t,2),n=e[0],r=e[1],s=O(!1),a=Object(c.a)(s,2),o=a[0],l=a[1];return Object(i.useEffect)((function(){!n&&o&&l()}),[n,o,l]),Object(p.jsxs)(u.a,{styles:H,children:[Object(p.jsxs)(u.a.Item,{children:[Object(p.jsx)(f,{}),Object(p.jsx)(m,{isSchemaEditorOn:n,onSchemaEditorChange:r,isSchemaSampleDataOn:o,onSchemaSampleDataOn:l})]}),Object(p.jsxs)(u.a,{wrap:!0,horizontal:!0,grow:!0,styles:G,children:[n&&Object(p.jsx)(u.a.Item,{styles:W(!n),children:Object(p.jsx)(M,{title:"Schema",path:"schema.json",defaultValue:o?z:void 0})}),Object(p.jsx)(u.a.Item,{styles:W(!n),children:Object(p.jsx)(M,{title:n?"Input JSON":"",path:"input_json.json",schemaValue:o?z:void 0,defaultValue:o?T:void 0})})]})]})},Q=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,162)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,s=e.getLCP,a=e.getTTFB;n(t),i(t),r(t),s(t),a(t)}))};o.a.render(Object(p.jsx)(q,{}),document.getElementById("root")),Q(),Object(s.a)()}},[[99,1,2]]]);
//# sourceMappingURL=main.2adbe18e.chunk.js.map