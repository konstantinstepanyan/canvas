document.addEventListener("DOMContentLoaded",()=>{const e=["#b3d5fc","#98d9d9","#ede493"],t=document.querySelectorAll(".chart__input");console.log(typeof t);const o=document.querySelector("#canvas"),a=o.getContext("2d"),l=100,r=80,n=220,c=190,s=50,d=30,i=70,u="18px",h="Tahoma";a.beginPath(),a.translate(0,o.height),a.rotate(-Math.PI/2),a.fillText("x",50,10),a.fillText("y",0,100),a.moveTo(0,0),a.quadraticCurveTo(220,250,250,500),a.stroke(),a.closePath();const f=document.querySelector(".chart__data");f.addEventListener("submit",m=>{m.preventDefault(),(e=>{a.clearRect(0,0,o.width,o.height);let t=r,f=i;const m=s+l;for(const l of e){const e=l.value*c/100;a.fillStyle=l.color,a.font=`${u} ${h}`,a.save(),a.translate(0,o.height),a.rotate(-Math.PI/2),a.fillText(l.name.toUpperCase(),d,f),a.restore(),a.fillRect(t,n,s,-e),t+=m,f+=m}})((o=>Array.from(t).map((t,o)=>({name:t.name,value:t.value,color:e[o]})))()),f.reset()})});