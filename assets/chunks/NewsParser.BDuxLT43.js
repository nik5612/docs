import{p as c,v as f,c as _,o as u,r as w,t as P}from"./framework.Bc-hQ86P.js";const A=`---
title: Заголовок новости
date: 2023-11-15
image: ./images/news1.png
excerpt: Краткое описание новости для превью
---

Полный текст новости...`,b=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"})),U=`---
title: "Заголовок новости"
date: 2024-01-01
excerpt: "Краткое описание новостиsdfga;dsiufgaSLDUIFGPSDUIfbp iushf P IUDSAu hgpAS PASU DPASUHD UHASCD UASHP UASHD ASUHDPAS UPASUD HPAS PSAUH PAUSH PU HASPXUI ASPUIOAHS PUA P UASHP UAPHUASH PU ASP UA SP UAHSXU ASPXUH ASPUX APSUX OP AU UAS HXPAU HPASUXH PAU PASUHX ASUXHAP UHPA UASH PU"
image: ./images/news1.png
---

**Основной текст новости** начинается здесь...

- Маркированные списки
- Работают корректно

[Ссылки](https://example.com) также поддерживаются.`,v=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"})),y=`---
title: Заголовок новости
date: 2023-11-15
image: ./images/news1.png
excerpt: Краткое описание новости для превью
---

Полный текст новости...`,j=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),O=`---
title: Заголовок новости
date: 2023-11-15
image: ./images/news1.png
excerpt: Краткое описание новости для превью
---

Полный текст новости...`,H=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"})),D=`---
title: Заголовок новости
date: 2023-11-15
image: ./images/news1.png
excerpt: Краткое описание новости для превью
---

Полный текст новости...`,h=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"})),x=`---
title: Котики Атакуют2 Месть ситхов
date: 2025-11-17
image: ./images/news1.png
excerpt: Атака котиков. Никому не спрятаться, все умрут от милоты
---
![Всплывающая подсказка](./images/news1.png "Всплывающая подсказка при наведении")


Полный текст новости...sadSAD
`,M=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"})),z=`---
title: Котики Атакуют2 Месть ситхов2212112
date: 2025-11-17
image: ./images/news1.png
excerpt: Атака котиков. Никому не спрятаться, все умрут от милоты
---
![Всплывающая подсказка](./images/news1.png "Всплывающая подсказка при наведении")


Полный текст новости...sadSAD
`,T=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"})),X=`---
title: Котики Атакуют
date: 2025-10-17
image: ./images/news1.png
excerpt: Атака котиков. Никому не спрятаться, все умрут от милоты
---
![Всплывающая подсказка](./images/news1.png "Всплывающая подсказка при наведении")


Полный текст новости...sadSAD
`,k=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"})),I=`---
title: Котики Ата
date: 2025-11-17
image: ./images/news1.png
excerpt: Атака котиков. Никому не спрятаться, все умрут от милоты
---
![Всплывающая подсказка](./images/news1.png "Всплывающая подсказка при наведении")


Полный текст новости...sadSAD
`,$=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"})),F={class:"news-parser"},N={key:0},B={key:1,class:"error"},G={__name:"NewsParser",setup(C){const l=c([]),p=c(!0),i=c(null);f(async()=>{try{const e=Object.assign({"../news/2024/april/news5.md":b,"../news/2024/april/news6.md":v,"../news/2025/april/news2.md":j,"../news/2025/april/news3.md":H,"../news/2025/april/news4.md":h,"../news/2025/july/2025-07-07.md":M,"../news/2025/july/2025-07-08.md":T,"../news/2025/july/2025-10-07.md":k,"../news/2025/july/2sdfds.md":$});l.value=Object.entries(e).map(([n,t])=>{const o=n.replace("../news/",""),a=o.split("/").pop().replace(".md",""),r=t.default,s=d(r);return{url:`../news/${o.replace(".md",".html")}`,title:s.title||a,date:g(s.date),excerpt:s.excerpt||"",image:s.image?m(s.image,o):null,rawContent:r}}),l.value.sort((n,t)=>t.date-n.date)}catch(e){i.value="Ошибка загрузки новостей",console.error("NewsParser error:",e)}finally{p.value=!1}});function d(e){const n=/^---\s*\n([\s\S]*?)\n---\s*\n?/,t=e.match(n);if(!t)return{};try{const o={};return t[1].split(`
`).forEach(a=>{const r=a.indexOf(":");if(r>0){const s=a.slice(0,r).trim(),S=a.slice(r+1).trim();o[s]=S.replace(/^['"]|['"]$/g,"")}}),o}catch{return{}}}function g(e){if(!e)return new Date;try{return new Date(e.includes("-")?e:e.split(".").reverse().join("-"))}catch{return new Date}}function m(e,n){return`/docs/news/${n.split("/").slice(0,-1).join("/")}/${e}`}return(e,n)=>(u(),_("div",F,[p.value?(u(),_("div",N,"Загрузка новостей...")):i.value?(u(),_("div",B,P(i.value),1)):w(e.$slots,"default",{key:2,news:l.value})]))}};export{G as _};
