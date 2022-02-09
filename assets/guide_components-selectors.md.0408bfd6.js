import{_ as n,c as s,o as a,a as t}from"./app.378e6094.js";const g='{"title":"Selectors","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components-selectors.md","lastUpdated":1644425477934}',e={},o=t(`<h1 id="selectors" tabindex="-1">Selectors <a class="header-anchor" href="#selectors" aria-hidden="true">#</a></h1><p>You can use selectors to select elements within the components <code>html</code> template (shadow DOM) by providing a valid <code>CSS</code> selector.</p><ul><li><code>select</code> - Selects the first element that matches the selector.</li><li><code>selectAll</code> - Selects all elements that match the selector.</li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>When using selectors with Hooks, keep in mind that the template might not be yet rendered during certain Hooks like <code>onStart</code> and <code>onReactive</code>.</p></div><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div id=&quot;my-div&quot;&gt;&lt;/div&gt;
    &lt;div&gt;&lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&#39;#my-div&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> elements <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">selectAll</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> elements<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,7),p=[o];function c(l,i,u,k,r,d){return a(),s("div",null,p)}var h=n(e,[["render",c]]);export{g as __pageData,h as default};
