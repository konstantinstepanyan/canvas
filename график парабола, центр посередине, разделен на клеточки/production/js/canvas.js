document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("canvas_plot"),t=e.clientWidth,o=e.clientHeight,s=50*Math.round(t/50/2),m=60*Math.round(o/60/2);(({canvas:e,cellWidth:s=50,cellHeight:m=150,shifts:l={xNumberNamesLeft:5,xNumberNamesLeftDown:30,XNumberNamesRight:-20,XNumberNamesRightDown:30,YNumberNamesTop:11,YNumberNamesTopDown:20,YNumberNamesBottom:5,YNumberNamesBottomDown:0,XAxisNamesLeft:1.5*s,XAxisNamesDown:m,YAxisNamesLeft:s/2,YAxisNamesDown:1.5*m}})=>{console.log(e);const a=e.getContext("2d");a.fillStyle="#000",a.font=`${s/2}px Arial`,a.textAligh="left",a.textBaselinke="top";for(let e=0;e<=t;e+=s)0==e?(a.beginPath(),a.strokeStyle="#f00",a.moveTo(s/10,0),a.lineTo(s/10,o),a.stroke(),a.closePath()):(a.beginPath(),a.strokeStyle="#bbb",a.moveTo(e,0),a.lineTo(e,o),a.stroke(),a.closePath()),a.fillText(e,e+l.XNumberNamesRight,l.XNumberNamesRightDown);for(let e=0;e<=o;e+=m)0==e?(a.beginPath(),a.strokeStyle="#f00",a.moveTo(0,m/10),a.lineTo(t,m/10)):(a.beginPath(),a.strokeStyle="#bbb",a.moveTo(0,e),a.lineTo(t,e)),a.fillText(e,l.YNumberNamesBottom,e+l.YNumberNamesBottomDown),a.stroke(),a.closePath();a.beginPath(),a.strokeStyle="#000000",a.moveTo(0,0),a.lineTo(0,o),a.fillStyle="#f00",a.fillText("y",l.YAxisNamesLeft,l.YAxisNamesDown),a.moveTo(0,0),a.lineTo(t,0),a.fillText("x",l.XAxisNamesLeft,l.XAxisNamesDown),a.stroke(),a.closePath(),a.fillStyle="#f00",a.beginPath(),a.moveTo(0,0),a.lineTo(s,m),a.stroke(),a.closePath()})({canvas:e}),(({canvas:e,cellWidth:l=50,cellHeight:a=150,shifts:i={xNumberNamesLeft:5,xNumberNamesLeftDown:30,XNumberNamesRight:-20,XNumberNamesRightDown:30,YNumberNamesTop:11,YNumberNamesTopDown:20,YNumberNamesBottom:5,YNumberNamesBottomDown:0,XAxisNamesLeft:1.5*l,XAxisNamesDown:a,YAxisNamesLeft:l/2,YAxisNamesDown:1.5*a}})=>{const n=e.getContext("2d");n.beginPath(),n.strokeStyle="#000000",n.moveTo(s,0),n.lineTo(s,o),n.moveTo(0,m),n.lineTo(t,m),n.stroke(),n.closePath(),n.fillStyle="#f00";for(let e=0;e<=t;e++){const t=(e-s)/l,o=Math.pow(t,2);n.fillRect(t*l+s,m-a*o,4,4)}})({canvas:e})});