"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[113],{113:(_,i,t)=>{t.r(i),t.d(i,{DemoModule:()=>y});var u=t(6814),d=t(9168),e=t(9776),m=t(1386),s=t(9212);let g=(()=>{var n;class c{constructor(){this.captchaResponse=""}resolved(a){const o=a&&`${a.substring(0,7)}...${a.substring(a.length-7)}`;this.captchaResponse+=`${JSON.stringify(o)}\n`}onError(a){this.captchaResponse+="ERROR; error details (if any) have been logged to console\n",console.log("reCAPTCHA error encountered; details:",a)}}return(n=c).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=s.Xpm({type:n,selectors:[["recaptcha-demo"]],decls:8,vars:1,consts:[["errorMode","handled","size","invisible",3,"resolved","errored"],["captchaRef","reCaptcha"],[3,"click"]],template:function(a,o){if(1&a){const j=s.EpF();s.TgZ(0,"re-captcha",0,1),s.NdJ("resolved",function(p){return o.resolved(p)})("errored",function(p){return o.onError(p)}),s.qZA(),s.TgZ(2,"button",2),s.NdJ("click",function(){s.CHM(j);const p=s.MAs(1);return s.KtG(p.execute())}),s._uU(3,"Submit"),s.qZA(),s.TgZ(4,"button",2),s.NdJ("click",function(){s.CHM(j);const p=s.MAs(1);return s.KtG(p.reset())}),s._uU(5,"Reset"),s.qZA(),s.TgZ(6,"pre"),s._uU(7),s.qZA()}2&a&&(s.xp6(7),s.hij("reCAPTCHA response log:\n",o.captchaResponse||"(empty)",""))},dependencies:[e.wT],encapsulation:2}),c})();var h=t(2598);const f=[{path:"",component:g,data:{page:{feature:"invisible",title:"Invisible reCAPTCHA API Example",content:{component:'<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Component</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@angular/core&quot;</span>;\n\n<span class="hljs-keyword">import</span> { <span class="hljs-title class_">RecaptchaErrorParameters</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;ng-recaptcha&quot;</span>;\n\n<span class="hljs-meta">@Component</span>({\n  <span class="hljs-attr">selector</span>: <span class="hljs-string">&quot;recaptcha-demo&quot;</span>,\n  <span class="hljs-attr">templateUrl</span>: <span class="hljs-string">&quot;./invisible-demo.component.html&quot;</span>,\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">InvisibleDemoComponent</span> {\n  <span class="hljs-keyword">public</span> captchaResponse = <span class="hljs-string">&quot;&quot;</span>;\n  <span class="hljs-keyword">public</span> <span class="hljs-title function_">resolved</span>(<span class="hljs-attr">captchaResponse</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {\n    <span class="hljs-keyword">const</span> newResponse = captchaResponse\n      ? <span class="hljs-string">`<span class="hljs-subst">${captchaResponse.substring(<span class="hljs-number">0</span>, <span class="hljs-number">7</span>)}</span>...<span class="hljs-subst">${captchaResponse.substring(captchaResponse.length - <span class="hljs-number">7</span>)}</span>`</span>\n      : captchaResponse;\n    <span class="hljs-variable language_">this</span>.<span class="hljs-property">captchaResponse</span> += <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(newResponse)}</span>\\n`</span>;\n  }\n\n  <span class="hljs-keyword">public</span> <span class="hljs-title function_">onError</span>(<span class="hljs-attr">errorDetails</span>: <span class="hljs-title class_">RecaptchaErrorParameters</span>): <span class="hljs-built_in">void</span> {\n    <span class="hljs-variable language_">this</span>.<span class="hljs-property">captchaResponse</span> += <span class="hljs-string">`ERROR; error details (if any) have been logged to console\\n`</span>;\n    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`reCAPTCHA error encountered; details:`</span>, errorDetails);\n  }\n}\n',html:'<span class="hljs-tag">&lt;<span class="hljs-name">re-captcha</span>\n  #<span class="hljs-attr">captchaRef</span>=<span class="hljs-string">&quot;reCaptcha&quot;</span>\n  (<span class="hljs-attr">resolved</span>)=<span class="hljs-string">&quot;resolved($event)&quot;</span>\n  (<span class="hljs-attr">errored</span>)=<span class="hljs-string">&quot;onError($event)&quot;</span>\n  <span class="hljs-attr">errorMode</span>=<span class="hljs-string">&quot;handled&quot;</span>\n  <span class="hljs-attr">size</span>=<span class="hljs-string">&quot;invisible&quot;</span>\n&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">re-captcha</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">&quot;captchaRef.execute()&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">&quot;captchaRef.reset()&quot;</span>&gt;</span>Reset<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>\nreCAPTCHA response log:\n{{ captchaResponse || &quot;(empty)&quot; }}&lt;/pre\n&gt;\n',module:'<span class="hljs-keyword">import</span> { <span class="hljs-title class_">NgModule</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@angular/core&quot;</span>;\n<span class="hljs-keyword">import</span> { <span class="hljs-title class_">CommonModule</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@angular/common&quot;</span>;\n<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Routes</span>, <span class="hljs-title class_">RouterModule</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@angular/router&quot;</span>;\n\n<span class="hljs-keyword">import</span> {\n  <span class="hljs-title class_">RecaptchaModule</span>,\n  <span class="hljs-title class_">RecaptchaSettings</span>,\n  <span class="hljs-title class_">RecaptchaLoaderOptions</span>,\n  <span class="hljs-variable constant_">RECAPTCHA_LOADER_OPTIONS</span>,\n  <span class="hljs-variable constant_">RECAPTCHA_SETTINGS</span>,\n  <span class="hljs-variable constant_">RECAPTCHA_V3_SITE_KEY</span>,\n} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;ng-recaptcha&quot;</span>;\n\n<span class="hljs-keyword">import</span> { parseLangFromHref } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../../parse-lang-from-href&quot;</span>;\n<span class="hljs-keyword">import</span> { <span class="hljs-title class_">InvisibleDemoComponent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./invisible-demo.component&quot;</span>;\n<span class="hljs-keyword">import</span> { settings } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./invisible-demo.data&quot;</span>;\n<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConfigService</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../config.service&quot;</span>;\n\n<span class="hljs-keyword">const</span> <span class="hljs-attr">routes</span>: <span class="hljs-title class_">Routes</span> = [\n  {\n    <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;&quot;</span>,\n    <span class="hljs-attr">component</span>: <span class="hljs-title class_">InvisibleDemoComponent</span>,\n    <span class="hljs-attr">data</span>: { <span class="hljs-attr">page</span>: settings },\n  },\n];\n\n<span class="hljs-meta">@NgModule</span>({\n  <span class="hljs-attr">declarations</span>: [<span class="hljs-title class_">InvisibleDemoComponent</span>],\n  <span class="hljs-attr">imports</span>: [<span class="hljs-title class_">RouterModule</span>.<span class="hljs-title function_">forChild</span>(routes), <span class="hljs-title class_">RecaptchaModule</span>, <span class="hljs-title class_">CommonModule</span>],\n  <span class="hljs-attr">providers</span>: [\n    {\n      <span class="hljs-attr">provide</span>: <span class="hljs-variable constant_">RECAPTCHA_V3_SITE_KEY</span>,\n      <span class="hljs-attr">useFactory</span>: <span class="hljs-function">(<span class="hljs-params">config: ConfigService</span>) =&gt;</span> {\n        <span class="hljs-keyword">return</span> config.<span class="hljs-property">recaptchaSiteKeyV3</span>;\n      },\n      <span class="hljs-attr">deps</span>: [<span class="hljs-title class_">ConfigService</span>],\n    },\n    {\n      <span class="hljs-attr">provide</span>: <span class="hljs-variable constant_">RECAPTCHA_SETTINGS</span>,\n      <span class="hljs-attr">useFactory</span>: (<span class="hljs-attr">config</span>: <span class="hljs-title class_">ConfigService</span>): <span class="hljs-function"><span class="hljs-params">RecaptchaSettings</span> =&gt;</span> {\n        <span class="hljs-keyword">return</span> { <span class="hljs-attr">siteKey</span>: config.<span class="hljs-property">recaptchaSiteKeyV2Invisible</span> };\n      },\n      <span class="hljs-attr">deps</span>: [<span class="hljs-title class_">ConfigService</span>],\n    },\n    {\n      <span class="hljs-attr">provide</span>: <span class="hljs-variable constant_">RECAPTCHA_LOADER_OPTIONS</span>,\n      <span class="hljs-attr">useValue</span>: {\n        <span class="hljs-title function_">onBeforeLoad</span>(<span class="hljs-params">url</span>) {\n          <span class="hljs-keyword">const</span> langOverride = <span class="hljs-title function_">parseLangFromHref</span>();\n          <span class="hljs-keyword">if</span> (langOverride) url.<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&quot;hl&quot;</span>, langOverride);\n\n          <span class="hljs-keyword">return</span> { url };\n        },\n      } <span class="hljs-keyword">as</span> <span class="hljs-title class_">RecaptchaLoaderOptions</span>,\n    },\n  ],\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">DemoModule</span> {}\n'}}}}];let y=(()=>{var n;class c{}return(n=c).\u0275fac=function(a){return new(a||n)},n.\u0275mod=s.oAB({type:n}),n.\u0275inj=s.cJS({providers:[{provide:e.We,useFactory:l=>l.recaptchaSiteKeyV3,deps:[h.E]},{provide:e.BZ,useFactory:l=>({siteKey:l.recaptchaSiteKeyV2Invisible}),deps:[h.E]},{provide:e.iV,useValue:{onBeforeLoad(l){const a=(0,m.g)();return a&&l.searchParams.set("hl",a),{url:l}}}}],imports:[d.Bz.forChild(f),e.a,u.ez]}),c})()}}]);