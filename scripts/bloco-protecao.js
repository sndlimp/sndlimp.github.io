// ═══════════ PROTEÇÃO CONTRA CÓPIA ═══════════
// Injetado via bloco-includes.js — não requer alteração no HTML
(function() {
    'use strict';

    // CSS: bloqueia seleção de texto
    var style = document.createElement('style');
    style.textContent = 'body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}';
    document.head.appendChild(style);

    // Meta tags anti-cache
    var meta1 = document.createElement('meta');
    meta1.httpEquiv = 'Cache-Control';
    meta1.content = 'no-store, no-cache, must-revalidate';
    document.head.appendChild(meta1);

    var meta2 = document.createElement('meta');
    meta2.httpEquiv = 'Pragma';
    meta2.content = 'no-cache';
    document.head.appendChild(meta2);

    // Bloqueia botão direito
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

    // Bloqueia arrastar
    document.addEventListener('dragstart', function(e) { e.preventDefault(); });

    // Bloqueia atalhos
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); return false; }
        if (e.ctrlKey && e.shiftKey && (e.key==='I'||e.key==='J'||e.key==='C'||e.keyCode===73||e.keyCode===74||e.keyCode===67)) { e.preventDefault(); return false; }
        if (e.ctrlKey && (e.key==='u'||e.key==='U'||e.keyCode===85)) { e.preventDefault(); return false; }
        if (e.ctrlKey && (e.key==='s'||e.key==='S'||e.keyCode===83)) { e.preventDefault(); return false; }
        if (e.ctrlKey && (e.key==='p'||e.key==='P'||e.keyCode===80)) { e.preventDefault(); return false; }
        if (e.ctrlKey && (e.key==='c'||e.key==='C'||e.keyCode===67)) { var s=window.getSelection(); if(s&&s.toString().length>0){ e.preventDefault(); return false; } }
    });

    // Substitui conteúdo copiado
    document.addEventListener('copy', function(e) { e.preventDefault(); e.clipboardData.setData('text/plain','Cópia não autorizada.'); });

    console.log('%c🔒 Proteção ativa %c— Cópia bloqueada.','color:#78BE20;font-weight:bold;','color:#ff6b6b;');
})();
