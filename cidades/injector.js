/**
 * SNDLimp — Injector de Conteúdo Variável
 * 7 perfis de conteúdo (~35-40% diferente entre si)
 * Cada cidade recebe um perfil + ordenação de seções única
 */
(function(){
  var dataScript = document.getElementById('cidade-data');
  if (!dataScript) return;
  var cidade;
  try { cidade = JSON.parse(dataScript.textContent); } catch(e) { return; }

  var slug   = cidade.slug;
  var nome   = cidade.nome;
  var regiao = cidade.regiao;
  var profile = cidade.profile || 0;
  var ordem   = cidade.ordem || [0, 1, 2];
  var waMsg  = cidade.whatsapp_msg || ('Olá! Quero agendar limpeza em ' + nome + '/RS.');
  var waLink = 'https://wa.me/555196033200?text=' + encodeURIComponent(waMsg);

  // ═══════════════════════════════════════
  // 7 PERFIS DE CONTEÚDO
  // ═══════════════════════════════════════

  var perfis = {};

  // ── PERFIL 0: Foco em poeira/estiagem ──
  perfis[0] = {
    heroH1: 'A <em>poeira da estiagem</em> está reduzindo a geração dos seus painéis em ' + nome + '?',
    heroSub: 'Períodos secos acumulam camadas de pó que bloqueiam a luz solar. A <strong>SNDLimp</strong> resolve isso com técnica.',
    prejuizoH2: 'O <em>custo invisível</em> da poeira nos módulos',
    prejuizoTexto: 'Em ' + nome + ', os períodos de estiagem depositam uma camada fina de pó sobre os painéis. Essa poeira parece inofensiva, mas reduz a captação solar de forma progressiva. Estudos do setor indicam que a sujeira acumulada pode cortar entre 15% e 25% da geração — e esse prejuízo aparece todo mês na conta de luz.',
    prejuizoValor: 'até R$50/mês',
    prejuizoLabel: 'é o que <strong>cada placa</strong> pode deixar de gerar',
    solucaoH2: 'Como a <em>SNDLimp</em> atua em ' + nome,
    solucaoTexto: 'Utilizamos água deionizada e escovas com cerdas macias que removem a poeira sem riscar o vidro antirreflexo. O processo é rápido, não usa produtos abrasivos e preserva a integridade dos módulos. Após a limpeza, a eficiência é restaurada em até 98%.',
    beneficios: [
      { icon: '💧', titulo: 'Água deionizada', texto: 'Sem minerais que mancham. Secagem uniforme, sem resíduos.' },
      { icon: '📋', titulo: 'Relatório fotográfico', texto: 'Registro completo do antes e depois de cada módulo.' },
      { icon: '⏱️', titulo: 'Execução ágil', texto: 'Em poucas horas seu sistema volta a produzir no máximo.' }
    ],
    faqH2: 'Dúvidas sobre limpeza em ' + nome,
    faq: [
      { q: 'Com que frequência devo limpar as placas em ' + nome + '?', r: 'Recomendamos a cada 4 a 6 meses, especialmente após períodos de estiagem. A poeira seca adere com mais facilidade e reduz a geração.' },
      { q: 'A chuva não resolve o problema?', r: 'A chuva remove apenas parte da sujeira superficial. A poeira fina da estiagem forma uma crosta que só sai com limpeza técnica.' },
      { q: 'A limpeza pode danificar as placas?', r: 'Não. Usamos água deionizada e escovas específicas para vidro fotovoltaico. Nada de esponjas abrasivas ou produtos químicos.' }
    ],
    ctaTexto: 'Agendar Limpeza em ' + nome,
    ctaH2: 'Recupere a <em>eficiência</em> do seu sistema'
  };

  // ── PERFIL 1: Foco em fuligem/poluição urbana ──
  perfis[1] = {
    heroH1: 'A <em>fuligem urbana</em> está comprometendo seus painéis solares em ' + nome + '?',
    heroSub: 'Resíduos de tráfego, indústria e poluição formam uma película escura sobre os módulos. A <strong>SNDLimp</strong> remove com segurança.',
    prejuizoH2: 'O <em>impacto da poluição</em> no seu investimento',
    prejuizoTexto: 'Em áreas urbanas como ' + nome + ', a fuligem de veículos e indústrias se deposita diariamente sobre os painéis. Essa camada escura bloqueia a radiação solar e reduz a eficiência do sistema. A perda pode chegar a 25% ao mês — dinheiro que deixa de entrar no seu bolso.',
    prejuizoValor: 'até 25%',
    prejuizoLabel: 'de <strong>eficiência perdida</strong> por acúmulo de fuligem',
    solucaoH2: 'A <em>solução técnica</em> da SNDLimp',
    solucaoTexto: 'Nossa equipe utiliza equipamentos com filtragem por osmose reversa e escovas de nylon atóxico. Removemos a fuligem sem agredir o vidro temperado dos módulos. O resultado é visível: painéis que voltam a captar como no primeiro dia.',
    beneficios: [
      { icon: '🔬', titulo: 'Osmose reversa', texto: 'Água purificada que não deixa manchas nem resíduos minerais.' },
      { icon: '🛡️', titulo: 'Equipe segurada', texto: 'Profissionais treinados e com seguro para trabalhos em altura.' },
      { icon: '📈', titulo: 'Garantia de resultado', texto: 'Eficiência restaurada comprovada por relatório fotográfico.' }
    ],
    faqH2: 'Perguntas frequentes — ' + nome,
    faq: [
      { q: 'A fuligem realmente afeta a geração de energia?', r: 'Sim. A fuligem cria uma barreira opaca que reduz a incidência de luz. Em ' + nome + ', onde há tráfego intenso, o acúmulo é mais rápido.' },
      { q: 'Quanto tempo dura a limpeza?', r: 'Uma residência padrão leva de 2 a 4 horas. O sistema fica parado apenas durante a execução.' },
      { q: 'Qual o valor do serviço?', r: 'O valor varia conforme o número de placas e a altura do telhado. Entre em contato para um orçamento personalizado.' }
    ],
    ctaTexto: 'Solicitar Orçamento',
    ctaH2: 'Pare de <em>perder dinheiro</em> com placas sujas'
  };

  // ── PERFIL 2: Foco em excrementos de aves ──
  perfis[2] = {
    heroH1: 'Excrementos de <em>aves</em> estão manchando seus painéis em ' + nome + '?',
    heroSub: 'Fezes de pombos e outras aves criam pontos quentes que danificam as células. A <strong>SNDLimp</strong> remove com técnica adequada.',
    prejuizoH2: 'O <em>dano real</em> que as aves causam',
    prejuizoTexto: 'Em ' + nome + ', é comum que aves pousem sobre os painéis solares. Os excrementos não só bloqueiam a luz como criam "hot spots" — pontos de superaquecimento que podem danificar permanentemente as células fotovoltaicas. Uma placa com acúmulo de fezes pode perder até 30% de geração.',
    prejuizoValor: 'até 30%',
    prejuizoLabel: 'de <strong>perda por hot spots</strong> em placas com fezes',
    solucaoH2: 'Como <em>removemos</em> sem danificar',
    solucaoTexto: 'Usamos produtos biodegradáveis específicos para dissolver matéria orgânica sem agredir o vidro. A aplicação é feita com baixa pressão e escovas ultra macias. Nada de raspar ou usar produtos caseiros que riscam a superfície antirreflexo.',
    beneficios: [
      { icon: '🧴', titulo: 'Produtos biodegradáveis', texto: 'Fórmula que dissolve resíduos orgânicos sem agredir o meio ambiente.' },
      { icon: '🔍', titulo: 'Inspeção visual', texto: 'Identificamos pontos críticos antes de iniciar a limpeza.' },
      { icon: '✅', titulo: 'Sem riscos', texto: 'Técnica que preserva o vidro antirreflexo dos seus módulos.' }
    ],
    faqH2: 'Dúvidas comuns — ' + nome,
    faq: [
      { q: 'Fezes de aves podem danificar permanentemente as placas?', r: 'Sim. Os hot spots causados por excrementos podem queimar células. A limpeza regular previne esse dano.' },
      { q: 'A garantia do fabricante cobre danos por sujeira?', r: 'Não. A maioria das garantias exclui danos por falta de manutenção. A limpeza é essencial para manter a cobertura.' },
      { q: 'Como evitar que aves pousem nos painéis?', r: 'Podemos orientar sobre barreiras físicas após a limpeza. Mas a limpeza periódica é a medida mais eficaz.' }
    ],
    ctaTexto: 'Proteger Meu Investimento',
    ctaH2: 'Não deixe as <em>aves</em> acabarem com sua economia'
  };

  // ── PERFIL 3: Foco em pólen/resíduos orgânicos ──
  perfis[3] = {
    heroH1: 'O <em>pólen e resíduos</em> da vegetação estão reduzindo a eficiência dos seus painéis em ' + nome + '?',
    heroSub: 'Áreas arborizadas depositam pólen, seiva e folhas sobre os módulos. A <strong>SNDLimp</strong> restaura a captação.',
    prejuizoH2: 'Quando a <em>natureza</em> atrapalha a geração',
    prejuizoTexto: 'Em regiões com vegetação abundante como ' + nome + ', o pólen e resíduos vegetais formam uma película aderente sobre os painéis. Diferente da poeira comum, essa camada orgânica gruda no vidro e não sai com chuva. O acúmulo progressivo pode reduzir a geração em até 20%.',
    prejuizoValor: 'até 20%',
    prejuizoLabel: 'de <strong>geração perdida</strong> por resíduos orgânicos',
    solucaoH2: 'A <em>limpeza certa</em> para cada tipo de sujeira',
    solucaoTexto: 'Cada tipo de resíduo exige uma abordagem específica. Para matéria orgânica, usamos solução biodegradável com pH neutro que dissolve o pólen sem reagir com o vidro. O enxágue com água deionizada garante acabamento impecável.',
    beneficios: [
      { icon: '🌿', titulo: 'pH neutro', texto: 'Solução que remove orgânicos sem alterar a superfície do vidro.' },
      { icon: '📅', titulo: 'Agendamento flexível', texto: 'Horários que se adaptam à sua rotina, inclusive fins de semana.' },
      { icon: '📊', titulo: 'Monitoramento', texto: 'Acompanhe a evolução da geração antes e depois da limpeza.' }
    ],
    faqH2: 'Perguntas sobre limpeza em ' + nome,
    faq: [
      { q: 'O pólen realmente reduz a geração?', r: 'Sim. O pólen cria uma película que difunde a luz. Em ' + nome + ', a proximidade com áreas verdes torna a limpeza ainda mais importante.' },
      { q: 'Com que frequência limpar em áreas arborizadas?', r: 'A cada 3 a 4 meses, especialmente na primavera quando a concentração de pólen é maior.' },
      { q: 'A limpeza remove todos os tipos de resíduos?', r: 'Sim. Nossa técnica é adaptada para cada tipo de sujeira: poeira, pólen, fuligem e excrementos.' }
    ],
    ctaTexto: 'Agendar Avaliação',
    ctaH2: 'Devolva a <em>potência máxima</em> ao seu sistema'
  };

  // ── PERFIL 4: Foco em calcário/poeira de construção ──
  perfis[4] = {
    heroH1: 'A <em>poeira de obras</em> está prejudicando seus painéis solares em ' + nome + '?',
    heroSub: 'Resíduos de construção civil e calcário formam crostas difíceis de remover. A <strong>SNDLimp</strong> tem a solução.',
    prejuizoH2: 'O <em>efeito abrasivo</em> da poeira de construção',
    prejuizoTexto: 'Em ' + nome + ', o crescimento urbano traz obras e reformas que liberam partículas de calcário e cimento no ar. Esses resíduos, quando depositados sobre os painéis, formam uma crosta que risca o vidro se removida de forma incorreta. A perda de geração pode ultrapassar 25%.',
    prejuizoValor: 'até 25%',
    prejuizoLabel: 'de <strong>eficiência comprometida</strong> por resíduos de construção',
    solucaoH2: 'Remoção <em>segura</em> de crostas minerais',
    solucaoTexto: 'Para resíduos minerais, utilizamos pré-lavagem com água deionizada para amolecer a crosta, seguida de escovação com cerdas específicas que não riscam. O processo é 100% seguro para o vidro antirreflexo dos seus módulos.',
    beneficios: [
      { icon: '🪣', titulo: 'Pré-lavagem técnica', texto: 'Amolecimento controlado da crosta antes da remoção.' },
      { icon: '👷', titulo: 'Técnicos locais', texto: 'Equipe que conhece as condições específicas de ' + nome + '.' },
      { icon: '📸', titulo: 'Registro completo', texto: 'Fotos de cada etapa: antes, durante e depois.' }
    ],
    faqH2: 'Dúvidas frequentes — ' + nome,
    faq: [
      { q: 'Poeira de obra pode riscar as placas?', r: 'Se removida incorretamente, sim. Nossa técnica usa pré-lavagem para evitar atrito de partículas sobre o vidro.' },
      { q: 'Quanto tempo após uma obra devo limpar?', r: 'Recomendamos limpeza imediata após a conclusão de obras próximas. O acúmulo de calcário endurece com o tempo.' },
      { q: 'Vocês atendem condomínios e empresas?', r: 'Sim. Atendemos residências, condomínios, empresas e propriedades rurais em ' + nome + ' e região.' }
    ],
    ctaTexto: 'Limpar Agora',
    ctaH2: 'Não deixe o <em>calcário</em> corroer seu investimento'
  };

  // ── PERFIL 5: Foco em umidade/limo ──
  perfis[5] = {
    heroH1: 'A <em>umidade</em> está criando limo nos seus painéis em ' + nome + '?',
    heroSub: 'O clima úmido favorece o crescimento de micro-organismos sobre os módulos. A <strong>SNDLimp</strong> elimina com segurança.',
    prejuizoH2: 'O <em>problema silencioso</em> da umidade',
    prejuizoTexto: 'Em ' + nome + ', a umidade elevada cria condições para o crescimento de limo e fungos nas bordas dos painéis. Esses micro-organismos não só bloqueiam a luz como retêm umidade contra o vidro, acelerando a degradação. A perda de eficiência pode chegar a 20% ao mês.',
    prejuizoValor: 'até 20%',
    prejuizoLabel: 'de <strong>eficiência perdida</strong> por limo e umidade',
    solucaoH2: 'Eliminação <em>completa</em> de micro-organismos',
    solucaoTexto: 'Aplicamos solução antimicrobiana biodegradável que elimina limo e fungos sem danificar os módulos. A limpeza inclui as bordas e a estrutura de fixação, onde a umidade mais se acumula. Resultado: painéis limpos e protegidos por mais tempo.',
    beneficios: [
      { icon: '🧪', titulo: 'Antimicrobiano seguro', texto: 'Elimina limo e fungos sem agredir o vidro fotovoltaico.' },
      { icon: '🔧', titulo: 'Limpeza das bordas', texto: 'Atenção especial aos pontos onde a umidade se acumula.' },
      { icon: '🔄', titulo: 'Proteção duradoura', texto: 'O tratamento retarda o reaparecimento de micro-organismos.' }
    ],
    faqH2: 'Perguntas sobre umidade — ' + nome,
    faq: [
      { q: 'O limo realmente afeta as placas solares?', r: 'Sim. O limo bloqueia a luz e retém umidade, acelerando a degradação do vidro. Em ' + nome + ', o clima favorece esse problema.' },
      { q: 'A limpeza remove o limo definitivamente?', r: 'Removemos completamente. O tratamento antimicrobiano retarda o reaparecimento, mas a limpeza periódica continua recomendada.' },
      { q: 'Quais os sinais de que preciso de limpeza?', r: 'Manchas esverdeadas nas bordas, redução na conta de luz e acúmulo visível de sujeira são os principais indicadores.' }
    ],
    ctaTexto: 'Eliminar Limo',
    ctaH2: 'Recupere a <em>potência</em> que a umidade levou'
  };

  // ── PERFIL 6: Foco em resíduos de colheita/queimadas ──
  perfis[6] = {
    heroH1: 'Resíduos de <em>colheita e queimadas</em> estão sujando seus painéis em ' + nome + '?',
    heroSub: 'Fuligem de cana, cinzas e poeira agrícola reduzem drasticamente a geração. A <strong>SNDLimp</strong> resolve.',
    prejuizoH2: 'O <em>impacto agrícola</em> na geração solar',
    prejuizoTexto: 'Em ' + nome + ', as atividades agrícolas sazonais liberam partículas de fuligem, cinzas e poeira de colheita que se depositam sobre os painéis. Essa camada escura e oleosa adere fortemente ao vidro e não sai com chuva. A perda de geração pode chegar a 30% em períodos de safra.',
    prejuizoValor: 'até 30%',
    prejuizoLabel: 'de <strong>perda na safra</strong> por fuligem agrícola',
    solucaoH2: 'Limpeza <em>pós-colheita</em> especializada',
    solucaoTexto: 'Desenvolvemos um protocolo específico para resíduos de colheita: desengraxante biodegradável seguido de enxágue com água deionizada. O processo remove a fuligem oleosa sem deixar resíduos e sem agredir o vidro dos módulos.',
    beneficios: [
      { icon: '🚜', titulo: 'Protocolo agrícola', texto: 'Técnica específica para fuligem de colheita e queimadas.' },
      { icon: '📅', titulo: 'Agendamento sazonal', texto: 'Programamos a limpeza após os períodos críticos de safra.' },
      { icon: '🏠', titulo: 'Atendimento rural', texto: 'Atendemos propriedades rurais e sistemas off-grid em ' + nome + '.' }
    ],
    faqH2: 'Dúvidas sobre limpeza rural — ' + nome,
    faq: [
      { q: 'Fuligem de queimada danifica as placas?', r: 'Sim. A fuligem é oleosa e adere fortemente. Se não removida, pode causar manchas permanentes e hot spots.' },
      { q: 'Com que frequência limpar em área rural?', r: 'Recomendamos após cada período de colheita ou queimada, além da limpeza regular a cada 4 meses.' },
      { q: 'Vocês atendem propriedades afastadas?', r: 'Sim. Atendemos toda a região de ' + nome + ' e arredores, incluindo áreas rurais.' }
    ],
    ctaTexto: 'Agendar Limpeza Rural',
    ctaH2: 'Proteja seu <em>investimento rural</em> da fuligem'
  };

  // ═══════════════════════════════════════
  // MONTAGEM DO CONTEÚDO
  // ═══════════════════════════════════════

  var p = perfis[profile];

  // ── Seções disponíveis ──
  function secaoPrejuizo() {
    return '' +
    '<section class="section" id="prejuizo">' +
    '  <div class="container">' +
    '    <h2>' + p.prejuizoH2 + '</h2>' +
    '    <p>' + p.prejuizoTexto + '</p>' +
    '    <div class="destaque-card">' +
    '      <span class="valor">' + p.prejuizoValor + '</span>' +
    '      <span class="label">' + p.prejuizoLabel + '</span>' +
    '    </div>' +
    '    <p class="text-center mt-20">' +
    '      <a href="../economia.html" class="btn-amarelo">📊 Quero saber se posso perder dinheiro!</a>' +
    '    </p>' +
    '  </div>' +
    '</section>';
  }

  function secaoSolucao() {
    return '' +
    '<section class="section section-dark" id="solucao">' +
    '  <div class="container">' +
    '    <h2>' + p.solucaoH2 + '</h2>' +
    '    <div class="antes-depois-grid">' +
    '      <div>' +
    '        <img src="../img/servico1.webp" alt="Placas solares antes da limpeza em ' + nome + '" class="img-full" loading="lazy">' +
    '        <div class="caption">🔴 Antes</div>' +
    '      </div>' +
    '      <div>' +
    '        <img src="../img/servico5.webp" alt="Placas solares depois da limpeza em ' + nome + '" class="img-full" loading="lazy">' +
    '        <div class="caption">🟢 Depois</div>' +
    '      </div>' +
    '    </div>' +
    '    <p>' + p.solucaoTexto + '</p>' +
    '    <p class="text-center mt-20">' +
    '      <a href="' + waLink + '" class="btn-cta-hero" target="_blank" rel="noopener">📅 ' + p.ctaTexto + '</a>' +
    '    </p>' +
    '  </div>' +
    '</section>';
  }

  function secaoBeneficios() {
    var cards = '';
    for (var i = 0; i < p.beneficios.length; i++) {
      var b = p.beneficios[i];
      cards += '' +
      '<div class="beneficio-card">' +
      '  <span class="icon">' + b.icon + '</span>' +
      '  <h3>' + b.titulo + '</h3>' +
      '  <p>' + b.texto + '</p>' +
      '</div>';
    }
    return '' +
    '<section class="section" id="beneficios">' +
    '  <div class="container">' +
    '    <h2>Por que a <em>SNDLimp</em> em ' + nome + '?</h2>' +
    '    <div class="beneficios-grid">' + cards + '</div>' +
    '    <p class="text-center mt-20">' +
    '      <a href="../galeria.html" class="btn-amarelo">📸 Ver Galeria Completa de Fotos</a>' +
    '    </p>' +
    '  </div>' +
    '</section>';
  }

  function secaoFAQ() {
    var items = '';
    for (var i = 0; i < p.faq.length; i++) {
      var f = p.faq[i];
      items += '' +
      '<div style="background:#1a1a1a;border:1px solid rgba(245,166,35,0.15);border-radius:12px;padding:16px;margin-bottom:12px;">' +
      '  <h3 style="font-size:0.9rem;color:#F5A623;margin-bottom:6px;text-transform:none;letter-spacing:0;">' + f.q + '</h3>' +
      '  <p style="font-size:0.82rem;color:#bbb;margin:0;">' + f.r + '</p>' +
      '</div>';
    }
    return '' +
    '<section class="section section-dark" id="faq">' +
    '  <div class="container">' +
    '    <h2>' + p.faqH2 + '</h2>' +
    '    ' + items +
    '  </div>' +
    '</section>';
  }

  function secaoCTAFinal() {
    return '' +
    '<section class="section" id="cta-final">' +
    '  <div class="container text-center">' +
    '    <h2>' + p.ctaH2 + '</h2>' +
    '    <p style="color:#bbb;margin-bottom:20px;">Atendimento profissional em ' + nome + ' e região. Entre em contato e agende sua limpeza.</p>' +
    '    <a href="' + waLink + '" class="btn-cta-hero" target="_blank" rel="noopener">📱 ' + p.ctaTexto + '</a>' +
    '  </div>' +
    '</section>';
  }

  // ── Hero (sempre primeiro) ──
  var heroHTML = '' +
  '<section class="hero">' +
  '  <div class="container">' +
  '    <h1>' + p.heroH1 + '</h1>' +
  '    <p class="hero-sub">' + p.heroSub + '</p>' +
  '    <a href="' + waLink + '" class="btn-cta-hero" target="_blank" rel="noopener">📱 ' + p.ctaTexto + '</a>' +
  '  </div>' +
  '</section>';

  // ── Monta seções na ordem definida pelo perfil ──
  var secoes = [secaoPrejuizo, secaoSolucao, secaoBeneficios];
  var conteudo = heroHTML;
  for (var i = 0; i < ordem.length; i++) {
    conteudo += secoes[ordem[i]]();
  }
  conteudo += secaoFAQ();
  conteudo += secaoCTAFinal();

  // ── Injeta no DOM ──
  document.getElementById('conteudo-principal').innerHTML = conteudo;

  // ── Atualiza title dinamicamente ──
  document.title = 'SNDLimp — Limpeza de Placas Solares em ' + nome + '/RS';

})();