webpackJsonp([2],{IP0f:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),window.AudioContext=window.AudioContext||window.webkitAudioContext;var a,i,o,r,s,c,l=null,u=!1,d=null,h=null,p=null,v=null,m={note:"-",pitch:"-",detune:"-"};function f(){alert("Stream generation failed.")}function g(t){v=l.createMediaStreamSource(t),(h=l.createAnalyser()).fftSize=2048,v.connect(h),C()}function _(){u&&(d.stop(0),d=null,h=null,u=!1,window.cancelAnimationFrame||(window.cancelAnimationFrame=window.webkitCancelAnimationFrame),window.cancelAnimationFrame(w)),function(t,e){try{navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,navigator.getUserMedia(t,e,f)}catch(t){alert("getUserMedia threw exception :"+t)}}({audio:{mandatory:{googEchoCancellation:"false",googAutoGainControl:"false",googNoiseSuppression:"false",googHighpassFilter:"false"},optional:[]}},g)}window.onload=function(){l=new AudioContext,Math.max(4,Math.floor(l.sampleRate/5e3)),a=document.getElementById("detector"),document.getElementById("output"),(p=document.getElementById("waveform"))&&((i=p.getContext("2d")).strokeStyle="black",i.lineWidth=1),o=document.getElementById("pitch"),r=document.getElementById("note"),document.getElementById("note2"),s=document.getElementById("detune"),c=document.getElementById("detune_amt"),a.ondragenter=function(){return this.classList.add("droptarget"),!1},a.ondragleave=function(){return this.classList.remove("droptarget"),!1},a.ondrop=function(t){this.classList.remove("droptarget"),t.preventDefault(),null;var e=new FileReader;return e.onload=function(t){l.decodeAudioData(t.target.result,function(t){t},function(){alert("error loading!")})},e.onerror=function(t){alert("Error: "+e.error)},e.readAsArrayBuffer(t.dataTransfer.files[0]),!1}};var w=null,M=new Float32Array(2048),b=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];function A(t,e){return Math.floor(1200*Math.log(t/function(t){return 440*Math.pow(2,(t-69)/12)}(e))/Math.log(2))}var y=null,F=null,k=null;function C(t){new Array;if(h){h.getFloatTimeDomainData(M);var e,n,i=function(t,e){for(var n=t.length,a=0,i=0;i<n;i++){var o=t[i];a+=o*o}if((a=Math.sqrt(a/n))<.01)return-1;var r=0,s=n-1;for(i=0;i<n/2;i++)if(Math.abs(t[i])<.2){r=i;break}for(i=1;i<n/2;i++)if(Math.abs(t[n-i])<.2){s=n-i;break}n=(t=t.slice(r,s)).length;var c=new Array(n).fill(0);for(i=0;i<n;i++)for(var l=0;l<n-i;l++)c[i]=c[i]+t[l]*t[l+i];for(var u=0;c[u]>c[u+1];)u++;var d=-1,h=-1;for(i=u;i<n;i++)c[i]>d&&(d=c[i],h=i);var p=h,v=c[p-1],m=c[p],f=c[p+1],g=(v+f-2*m)/2;return g&&(p-=(f-v)/2/(2*g)),e/p}(M,l.sampleRate);-1==i?(a.className="vague",o.innerText="--",r.innerText="-",s.className="",c.innerText="--"):(a.className="confident",y=i,o.innerText=Math.round(y),m.pitch=Math.round(y),e=y,n=Math.log(e/440)/Math.log(2)*12,F=Math.round(n)+69,r.innerHTML=b[F%12],m.note=b[F%12],0==(k=A(y,F))?(s.className="",c.innerHTML="--"):(k<0?(s.className="flat",m.detune=Math.abs(k)+"b"):(s.className="sharp",m.detune=Math.abs(k)+"#"),c.innerHTML=Math.abs(k))),window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame),w=window.requestAnimationFrame(C)}}var E=n("b/bh"),x={data:function(){return{toggleLiveInput:_,notes:[],piano:E.a,timer:null,pitch_data:m}},components:{navigation:n("bwGm").a},methods:{getNote:function(){this.notes.push(this.pitch);this.pitch.pitch>33&&this.pitch.pitch<63||(this.pitch.pitch>=63&&this.pitch.pitch<=134||(this.pitch.pitch>134&&this.pitch.pitch<269||(this.pitch.pitch>=269&&this.pitch.pitch<=510||this.pitch.pitch>510&&this.pitch.pitch)))},stop:function(){clearInterval(this.timer)}}},I={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("navigation"),t._v(" "),n("p",[n("v-btn",{attrs:{color:""},on:{click:t.toggleLiveInput}},[t._v("use live input")]),t._v(" "),n("v-btn",{on:{click:t.getNote}},[t._v("get Note")])],1),t._v(" "),t._m(0),t._v(" "),n("span",[t._v("Note: "+t._s(t.pitch_data.note)+" ")]),t._v(" "),n("br"),t._v(" "),n("span",[t._v("Frquency: "+t._s(t.pitch_data.pitch))]),t._v(" "),n("br"),t._v(" "),n("span",[t._v("Cents: "+t._s(t.pitch_data.detune))]),t._v(" "),n("br"),t._v(" "),n("v-btn",{attrs:{color:"purple"},on:{click:t.stop}},[t._v("Stop")])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vague",attrs:{id:"detector"}},[n("div",{staticClass:"pitch"},[n("span",{attrs:{id:"pitch"}},[t._v("--")]),t._v("Hz")]),t._v(" "),n("div",{staticClass:"note"},[n("span",{attrs:{id:"note"}},[t._v("--")])]),t._v(" "),n("canvas",{attrs:{id:"output",width:"300",height:"42"}}),t._v(" "),n("div",{attrs:{id:"detune"}},[n("span",{attrs:{id:"detune_amt"}},[t._v("--")]),n("span",{attrs:{id:"flat"}},[t._v("cents ♭")]),n("span",{attrs:{id:"sharp"}},[t._v("cents ♯")])])])}]};var L=n("VU/8")(x,I,!1,function(t){n("KkLL")},null,null);e.default=L.exports},KkLL:function(t,e){}});
//# sourceMappingURL=2.5152c9cbdf88d092a94c.js.map