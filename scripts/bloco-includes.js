// ══════════ INCLUIR DINÂMICO ═══════════
// Salve em: https://sndlimp.com.br/scripts/bloco-incluir.js
// Adicione no HTML: <script src="https://sndlimp.com.br/scripts/bloco-incluir.js" defer></script>

(function() {
  const BASE = 'https://sndlimp.com.br/';

  function injetar(arquivo, seletorAlvo, posicao, nocache) {
    var url = BASE + arquivo + (nocache ? '?v=' + Date.now() : '');
    return fetch(url)
      .then(r => r.text())
      .then(html => {
        const alvo = document.querySelector(seletorAlvo);
        if (alvo) alvo.insertAdjacentHTML(posicao, html);
      })
      .catch(() => {});
  }

  // Banner de cookies
  injetar('compartilhado/bloco-cookies.html', 'body', 'beforeend', false);

  // GA4 / GTM
  injetar('compartilhado/bloco-ga4-gtm.html', 'head', 'beforeend', false);

  // Proteção contra cópia (condicional)
  if (document.querySelector('meta[name="protecao-copia"]')) {
    var s = document.createElement('script');
    s.src = BASE + 'scripts/bloco-protecao.js?v=' + Date.now();
    document.head.appendChild(s);
  }

  // ═══ LÓGICA COOKIES (delegação no document — sempre funciona) ═══
  document.addEventListener('click', function(e) {
    if (e.target.id === 'btn-aceitar-cookies') {
      var banner = document.getElementById('cookie-banner');
      if (banner) banner.style.display = 'none';
      localStorage.setItem('lgpd_cookies_aceitos', '1');
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
          functionality_storage: 'denied',
          security_storage: 'granted'
        });
      }
    }
    if (e.target.id === 'btn-recusar-cookies') {
      var bannerRec = document.getElementById('cookie-banner');
      if (bannerRec) bannerRec.style.display = 'none';
      localStorage.setItem('lgpd_cookies_aceitos', '0');
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'denied',
          security_storage: 'granted'
        });
      }
    }
    if (e.target.id === 'gerenciar-cookies') {
      e.preventDefault();
      var b = document.getElementById('cookie-banner');
      if (b) b.style.display = 'flex';
      localStorage.removeItem('lgpd_cookies_aceitos');
    }
  });

  // ═══ VERIFICA SE JÁ ESCOLHEU (polling até o banner existir) ═══
  function esconderSeAceito() {
    var banner = document.getElementById('cookie-banner');
    var escolha = localStorage.getItem('lgpd_cookies_aceitos');
    if (banner && (escolha === '1' || escolha === '0')) {
      banner.style.display = 'none';
      return true;
    }
    return false;
  }
  if (!esconderSeAceito()) {
    var tentativas = 0;
    var timer = setInterval(function() {
      tentativas++;
      if (esconderSeAceito() || tentativas > 20) clearInterval(timer);
    }, 300);
  }

  // ═══ LINK "POLÍTICA DE PRIVACIDADE" NO RODAPÉ ═══
  document.addEventListener('DOMContentLoaded', function() {
    var footer = document.querySelector('footer') || document.querySelector('.footer') || document.body;
    var div = document.createElement('div');
    div.style.cssText = 'text-align:center;margin-top:12px;font-size:0.7rem;color:#888;';

    div.innerHTML  = '<a href="https://sndlimp.com.br/privacidade.html" style="color:#888;text-decoration:none;">Política de Privacidade</a>';
    div.innerHTML += '<br><a href="https://edusidegum.com.br" target="_blank" rel="noopener" style="color:#888;text-decoration:none;">Desenvolvido por e-Sid Solutions M.E.</a>';
    div.innerHTML += ' · <a href="#" id="gerenciar-cookies" style="color:#888;text-decoration:none;">Gerenciar cookies</a>';

    footer.appendChild(div);
  });

})();