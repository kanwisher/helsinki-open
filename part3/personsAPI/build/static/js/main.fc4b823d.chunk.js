(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,t,n){e.exports=n(41)},23:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(15),c=n.n(o),u=(n(23),n(2)),l=function(e){var t=e.person,n=t.id,r=t.name,o=t.number,c=e.deleteClicked;return a.a.createElement(a.a.Fragment,null,a.a.createElement("li",null,r," ",o),a.a.createElement("button",{onClick:function(){return c(n)}},"delete"))},i=function(e){var t=e.persons,n=e.filter,r=e.deleteClicked,o=t.filter((function(e){return e.name.toLowerCase().includes(n.trim().toLowerCase())}));return a.a.createElement("ul",null,o.length?o.map((function(e){return a.a.createElement(l,{key:e.name,person:e,deleteClicked:r})})):"Add your first user!")},s=function(e){var t=e.filter,n=e.setFilter;return a.a.createElement("div",null,"Filter by name: ",a.a.createElement("input",{type:"text",value:t,onChange:function(e){return n(e.target.value)}}))},m=n(16),f=n(17),d=n(4),p=n.n(d),h=function(e){return e.data},v=function(){return p.a.get("/api/persons").then(h)},b=function(e){return p.a.post("/api/persons",e).then(h)},w=function(e){return p.a.delete("".concat("/api/persons","/").concat(e)).then(h)},E=function(e,t){return p.a.put("".concat("/api/persons","/").concat(e),t).then(h)},g=function(e){var t=e.newName,n=e.newPhone,r=e.setNewName,o=e.setNewPhone,c=e.persons,u=e.setPersons,l=e.setMessage;return a.a.createElement("form",null,a.a.createElement("div",null,"name: ",a.a.createElement("input",{type:"text",value:t,onChange:function(e){return r(e.target.value)}}),"phone: ",a.a.createElement("input",{type:"tel",value:n,onChange:function(e){return o(e.target.value)}})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit",onClick:function(e){e.preventDefault();var a=t.trim(),i=c.find((function(e){return e.name.toLowerCase()===a.toLowerCase()}));if(!a||!n)return l({content:"All fields are required",type:"error"});var s={name:a,number:n};if(r(""),o(""),i){if(window.confirm("".concat(i.name," is already added to phonebook, replace the old number with a new one?"))){var d=Object(f.a)({},i,{number:n});E(i.id,d).then((function(e){console.log(e),u(c.map((function(t){return t.id!==i.id?t:e})))})),l({content:"Updated ".concat(s.name,"'s phone number"),type:"success"}),setTimeout((function(){return l(null)}),2e3)}}else b(s).then((function(e){u([].concat(Object(m.a)(c),[e])),l({content:"Added ".concat(s.name),type:"success"}),setTimeout((function(){return l(null)}),2e3)})).catch((function(e){console.log("here!",e),l({content:e.response.data.error,type:"error"}),setTimeout((function(){return l(null)}),2e3)}))}},"add")))},y=function(e){var t=e.message;if(null===t)return null;var n=t.content,r=t.type;return a.a.createElement("div",{className:r},n)},k=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),l=Object(u.a)(c,2),m=l[0],f=l[1],d=Object(r.useState)(""),p=Object(u.a)(d,2),h=p[0],b=p[1],E=Object(r.useState)(""),k=Object(u.a)(E,2),j=k[0],C=k[1],O=Object(r.useState)(null),N=Object(u.a)(O,2),P=N[0],S=N[1],A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2e3;S(e),setTimeout((function(){return S(null)}),t)};Object(r.useEffect)((function(){v().then((function(e){return o(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(y,{message:P}),a.a.createElement(s,{filter:m,setFilter:f}),a.a.createElement(g,{newPhone:j,newName:h,setNewName:b,setNewPhone:C,persons:n,setPersons:o,setMessage:S}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(i,{persons:n,filter:m,deleteClicked:function(e){window.confirm("Are you sure you want to delete?")&&w(e).then((function(t){console.log(t),o(n.filter((function(t){return t.id!==e}))),A({content:"Deleted user",type:"success"})})).catch((function(t){o(n.filter((function(t){return t.id!==e}))),A({content:"User was already deleted.",type:"error"})}))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.fc4b823d.chunk.js.map