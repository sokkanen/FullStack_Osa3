(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(39)},37:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),u=n.n(a),c=n(11),r=n.n(c),i=n(2),o=function(e,t){return""!==e&&void 0!==t?t.filter(function(t){return t.name.includes(e)}):t},l=function(e,t){return e.map(function(e){return e.name}).includes(t)},m=function(e){var t=e.person,n=e.handler;return u.a.createElement("div",null,u.a.createElement("li",null,t.name,"  ",t.number,u.a.createElement("button",{onClick:function(){return n(t)}},"poista")))},f=n(3),s=n.n(f),d="/api/persons",v=function(){return s.a.get(d)},p=function(e){return s.a.post(d,e)},E=function(e){s.a.delete("".concat(d,"/").concat(e)).then(function(e){console.log(e)})},b=function(e){return s.a.put("".concat(d,"/").concat(e.id),e)},j=function(e){var t=e.message;return""===t?null:u.a.createElement("div",{className:"note"},t)},h=function(e){var t=e.message;return""===t?null:u.a.createElement("div",{className:"error"},t)},O=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)([]),f=Object(i.a)(r,2),s=f[0],d=f[1],O=Object(a.useState)(""),g=Object(i.a)(O,2),k=g[0],w=g[1],S=Object(a.useState)(""),y=Object(i.a)(S,2),C=y[0],N=y[1],J=Object(a.useState)(""),P=Object(i.a)(J,2),T=P[0],x=P[1],B=Object(a.useState)(""),D=Object(i.a)(B,2),H=D[0],I=D[1],L=Object(a.useState)(""),q=Object(i.a)(L,2),z=q[0],A=q[1];Object(a.useEffect)(function(){v().then(function(e){c(e.data),d(e.data)})},[]);var F=function(e){I(e),setTimeout(function(){I("")},5e3)},G=function(e){A(e),setTimeout(function(){A("")},5e3)},K=function(e){if(window.confirm("Poistetaanko ".concat(e.name," ?"))){E(e.id);var t=n.filter(function(t){return t.name!==e.name});c(t),d(t),F("".concat(e.name," poistettu."))}};return u.a.createElement("div",null,u.a.createElement("h2",null,"Puhelinluettelo"),u.a.createElement(j,{message:H}),u.a.createElement(h,{message:z}),u.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",u.a.createElement("input",{value:T,onChange:function(e){x(e.target.value),d(o(e.target.value,n))}})),u.a.createElement("h3",null,"Lis\xe4\xe4 uusi"),u.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={name:k,number:C};if(l(n,k)){if(window.confirm("".concat(t.name," on jo luettelossa, korvataanko vanha numero uudella?"))){var a=n.filter(function(e){return e.name===t.name})[0];t.id=a.id,b(t).then(function(e){c(n.map(function(n){return n.id!==t.id?n:e.data})),d(n.map(function(n){return n.id!==t.id?n:e.data})),F("".concat(t.name," muokattu."))}).catch(function(e){c(n.filter(function(e){return e.id!==t.id})),d(n.filter(function(e){return e.id!==t.id})),G("Henkil\xf6n ".concat(t.name," tietoja ei l\xf6ydy tietokannasta."))})}w(""),N("")}else p(t).then(function(e){t.id=e.data.id;var a=n.concat(t);c(a),d(a),w(""),N(""),F("".concat(t.name," tallennettu."))}).catch(function(e){G("".concat(e.response.data.error))})}},u.a.createElement("div",null,"nimi: ",u.a.createElement("input",{value:k,onChange:function(e){w(e.target.value)}})),u.a.createElement("div",null,"numero: ",u.a.createElement("input",{value:C,onChange:function(e){N(e.target.value)}})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))),u.a.createElement("h3",null,"Numerot"),s.map(function(e){return u.a.createElement(m,{key:e.name,person:e,handler:K})}))};n(37);r.a.render(u.a.createElement(O,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.e39be1f3.chunk.js.map