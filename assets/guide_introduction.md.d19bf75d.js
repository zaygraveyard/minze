import{_ as e,c as t,o,a as r}from"./app.378e6094.js";const f='{"title":"Introduction","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overview","slug":"overview"},{"level":2,"title":"Features","slug":"features"},{"level":2,"title":"Architecture","slug":"architecture"},{"level":2,"title":"Browser Support","slug":"browser-support"}],"relativePath":"guide/introduction.md","lastUpdated":1644425477934}',a={},n=r('<h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h1><blockquote><p>Minze is a dead-simple framework for shareable web components.</p></blockquote><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>Minze (German shorthand for &quot;Peppermint&quot;, pronounced <a href="https://upload.wikimedia.org/wikipedia/commons/c/c2/De-Minze.ogg" target="_blank" rel="noopener noreferrer"><code>/\u02C8m\u026Ant\u0361s\u0259/</code></a>) lets you rapidly build native web components.</p><p>It is not a framework for building complex user interfaces or single-page apps, like React, Vue or Angular. Instead, you can use Minze to create <code>encapsulated</code>, <code>reusable</code>, <code>maintainable</code>, <code>cross-framework</code> native web components.</p><p>Minze was made to be accessible to everyone, and to be easy to use. It removes a lot of complexity from the creation of custom web components.</p><p>Possible use cases:</p><ul><li><p><strong>Design Systems</strong>: Create cross-framework design system libraries and share them with your team or the world. Define once, use everywhere.</p></li><li><p><strong>Light Alternative</strong>: If you don&#39;t want to use a common framework, but still want to create some components with JavaScript functionality for your site, you can use Minze.</p></li><li><p><strong>Browser Native Extending</strong>: You can add Minze to any web project and create components without using any build tools to extend its functionality.</p></li></ul><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-hidden="true">#</a></h2><ul><li>\u{1F476} Simple - Dive right in by <a href="/guide/installation.html#cli">scaffolding a project</a> or using a <a href="/guide/installation.html#cdn">CDN link</a>.</li><li>\u26A1 Fast - Tiny footprint ~2KB (minified and compressed).</li><li>\u{1F680} Modern - Based on the latest technologies around web components.</li><li>\u{1F4E6} Shareable - Build component libraries or design systems. Define once, use everywhere.</li><li>\u{1F3B2} Framework Agnostic - Use Minze with any common framework - React, Vue, Angular ...</li><li>\u{1F512} Typed API - Scale your component library with ease by using TypeScript.</li></ul><h2 id="architecture" tabindex="-1">Architecture <a class="header-anchor" href="#architecture" aria-hidden="true">#</a></h2><p>Minze consists of two main classes:</p><ul><li><strong>Minze</strong> - A class with multiple static methods and properties for common tasks, like defining several components at once.</li><li><strong>MinzeElement</strong> - A class that can be used to extend from to create custom web components. It adds an abstraction layer around the web components API and adds several additional features like reactivity.</li></ul><p>There&#39;s also a <a href="/guide/installation.html#cli">CLI tool</a> that can be used to create a development and publishing environment for Minze components. Out of the box, it comes with <a href="https://rollupjs.org/" target="_blank" rel="noopener noreferrer">rollup</a> and <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">vite</a> and optionally <code>TypeScript</code>.</p><h2 id="browser-support" tabindex="-1">Browser Support <a class="header-anchor" href="#browser-support" aria-hidden="true">#</a></h2><p>By default, Minze is transpiled to <code>ES6</code>. Minze should be compatible with all <a href="https://caniuse.com/?search=es6" target="_blank" rel="noopener noreferrer">browsers supporting ES6</a> and <a href="https://caniuse.com/?search=Custom%20Elements" target="_blank" rel="noopener noreferrer">Custom Elements</a>.</p>',16),i=[n];function s(l,c,d,p,u,h){return o(),t("div",null,i)}var b=e(a,[["render",s]]);export{f as __pageData,b as default};
