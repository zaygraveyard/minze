import{_ as n,c as s,o as a,a as t}from"./app.378e6094.js";const h='{"title":"Data","description":"","frontmatter":{},"headers":[{"level":2,"title":"this","slug":"this"},{"level":2,"title":"Properties","slug":"properties"},{"level":2,"title":"Reactive Properties","slug":"reactive-properties"},{"level":2,"title":"Attribute Properties / Attributes","slug":"attribute-properties-attributes"},{"level":2,"title":"Observed Attributes","slug":"observed-attributes"}],"relativePath":"guide/components-data.md","lastUpdated":1644425477934}',e={},p=t(`<h1 id="data" tabindex="-1">Data <a class="header-anchor" href="#data" aria-hidden="true">#</a></h1><p>A Minze component has multiple ways of defining data. Every method serves its own purpose. But at the end of the day, all data is going to be accessible from the component in the form of properties.</p><h2 id="this" tabindex="-1">this <a class="header-anchor" href="#this" aria-hidden="true">#</a></h2><p>Accessing any property or method that is defined on the component requires the use of <code>this</code>. Inside the component, <code>this</code> refers to the component itself. The example below illustrates this.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">const</span> myProperty <span class="token operator">=</span> <span class="token string">&#39;Constant&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  myProperty <span class="token operator">=</span> <span class="token string">&#39;Component Property&#39;</span>

  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      myProperty<span class="token punctuation">,</span> <span class="token comment">// Constant</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>myProperty <span class="token comment">// Component Property</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-hidden="true">#</a></h2><p>Regular non-reactive property.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  myProperty <span class="token operator">=</span> <span class="token string">&#39;Hello Minze!&#39;</span>

  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>myProperty<span class="token punctuation">)</span> <span class="token comment">// Hello Minze!</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="reactive-properties" tabindex="-1">Reactive Properties <a class="header-anchor" href="#reactive-properties" aria-hidden="true">#</a></h2><p><code>reactive</code> dynamically creates reactive properties on the element. A change to a reactive property will request a component re-render. <code>reactive</code> should be an array containing one or more strings or tuples. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.</p><p>Every tuple takes up to 3 values. The first 2 are required, the third is optional.</p><p>Tuple structure: [<code>name</code>, <code>value</code>, <code>exposeAttr?</code>]</p><ol><li><strong>name:</strong> has to be a <code>camelCase</code> string.</li><li><strong>value:</strong> can be any value.</li><li><strong>exposeAttr:</strong> (optional) not defined or <code>true</code></li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>The created property is always the source of truth and not the exposed attribute. So when changing the attribute value, the property will not be updated. But changing the property value will update the attribute.</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you use the shorthand notation and provide a <code>camelCase</code> string instead of a tuple for a reactive property, the reactive property will be created with a default value of <code>null</code>.</p></div><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  reactive <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;myShorthand&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;myProperty&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello Minze!&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;myNumber&#39;</span><span class="token punctuation">,</span> <span class="token number">99</span><span class="token punctuation">]</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">]</span>

  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>myShorthand<span class="token punctuation">,</span> <span class="token comment">// null</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>myProperty<span class="token punctuation">,</span> <span class="token comment">// Hello Minze!</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>myNumber <span class="token comment">// 99</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="attribute-properties-attributes" tabindex="-1">Attribute Properties / Attributes <a class="header-anchor" href="#attribute-properties-attributes" aria-hidden="true">#</a></h2><p><code>attrs</code> dynamically creates reactive properties for attributes. A change to a reactive attribute property will request a component re-render. <code>attrs</code> should be an array containing one or more strings or tuples. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.</p><p>Every tuple takes up to 2 values. The first 1 is required, the second is optional.</p><p>Tuple structure: [<code>name</code>, <code>value?</code>]</p><ol><li><strong>name:</strong> has to be a <code>dash-case</code> string.</li><li><strong>value:</strong> (optional) not defined or any value type, which will be used to set the initial attribute, if none is found on the HTML element.</li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>All created attribute properties can be accessed inside the component with the <code>camelCase</code> notation. E.g. for <code>my-attribute</code> the attribute property will be <code>myAttribute</code>.</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>The attribute on the component is always the source of truth and not the created attribute property. So when the attribute value changes, the property will be updated. But changing the property will <strong>not</strong> update the attribute.</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>With the exception of <code>undefined</code>, <code>null</code>, <code>false</code> or <code>true</code>, all attribute properties will always be from type <code>string</code>, no matter the provided value type.</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you use the shorthand notation and provide a <code>dash-case</code> string instead of a tuple for a reactive attribute property, the reactive attribute property will be created with a default value of <code>null</code>.</p></div><div class="danger custom-block"><p class="custom-block-title">WARNING</p><p>For attribute property updates to be effective (on attribute changes), you have to make these attributes <strong>observable</strong>. It can be done by providing them to <strong><a href="#observed-attributes">observedAttributes</a></strong>.</p></div><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  attrs <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;my-attribute&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;my-second-attribute&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;my-third-attribute&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello Minze again!&#39;</span><span class="token punctuation">]</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">]</span>

  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>myAttribute<span class="token punctuation">,</span> <span class="token comment">// null</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>mySecondAttribute<span class="token punctuation">,</span> <span class="token comment">// Hello Minze!</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>myThirdAttribute <span class="token comment">// Hello Minze again!</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span> <span class="token attr-name">my-second-attribute</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Hello Minze!<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="observed-attributes" tabindex="-1">Observed Attributes <a class="header-anchor" href="#observed-attributes" aria-hidden="true">#</a></h2><p>The <code>observedAttributes</code> property defines attribute names that should be observed and updates any attribute properties defined by <code>attrs</code> accordingly.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><code>observedAttributes</code> has to be a <code>static</code> property.</p></div><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  attrs <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;my-attribute&#39;</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">]</span>

  <span class="token keyword">static</span> observedAttributes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;my-attribute&#39;</span><span class="token punctuation">]</span>

  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>myAttribute<span class="token punctuation">)</span> <span class="token comment">// Hello Minze!</span>
  <span class="token punctuation">}</span>

  <span class="token function">onAttributeChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>myAttribute<span class="token punctuation">)</span> <span class="token comment">// whatever the new attribute value is</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span> <span class="token attr-name">my-attribute</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Hello Minze!<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,41),o=[p];function c(l,i,u,r,k,d){return a(),s("div",null,o)}var y=n(e,[["render",c]]);export{h as __pageData,y as default};
