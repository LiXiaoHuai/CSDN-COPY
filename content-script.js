// ==UserScript==
// @name        CSDN 可选可复制
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      HOcto6
// @description 2024/12/09 下午17:46:04
// ==/UserScript==

const $ = document.querySelector.bind(document);

// 样式修改
const cssText = '#content_views pre {user-select: unset !important;} #content_views pre code {user-select: unset !important;}';
const style = document.createElement('style');
style.innerHTML = cssText;
document.body.appendChild(style);

setTimeout(() => {
  // 移除Event Listene
  const $content_views = $('#content_views');
  $content_views.outerHTML = $content_views.outerHTML;

  // 点击复制
  const copyButton = document.querySelectorAll('[data-title="登录后复制"]');
  Array.from(copyButton).forEach(item => {
    const parent = item.parentElement;
    const newDiv = document.createElement('div');
    newDiv.classList.add('hljs-button');
    newDiv.dataset.title = '点击复制';
    newDiv.onclick = (e) => {
      const textContent = parent.textContent;
      const input = document.createElement('input');
      input.value = textContent;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove()
    }
    parent.insertBefore(newDiv, item);
    parent.removeChild(item);
  })
  // 移除 关注才能查看
  const hide = document.querySelectorAll('.hide-article-box')
  Array.from(hide).forEach(item => {
    item.remove()
  })
  // 设置全部可见
  const $article_content = $("#article_content")
  $article_content.style.height = 'auto';
  $article_content.style.overflow = 'auto';
}, 500)