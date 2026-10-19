/**
 * Aplicativo da Mostra de Trabalhos - SNCT 2026 - IFSC Câmpus Canoinhas
 */

// Configuração e Metadados das Categorias
const CATEGORY_CONFIG = {
  'Relatos': {
    name: 'Relatos de Experiência e Extensão',
    shortName: 'Relatos',
    icon: '<i class="fa-solid fa-comments"></i>',
    description: 'Vivências acadêmicas, projetos de extensão universitária e protagonismo estudantil.'
  },
  'Edificações': {
    name: 'Edificações',
    shortName: 'Edificações',
    icon: '<i class="fa-solid fa-building"></i>',
    description: 'Pesquisas em materiais, sustentabilidade na construção, acessibilidade e engenharia.'
  },
  'Viticultura': {
    name: 'Viticultura e Fruticultura',
    shortName: 'Viticultura',
    icon: '<i class="fa-solid fa-wine-glass"></i>',
    description: 'Fenologia de videiras, enologia, manejo de pomares e vitivinicultura regional.'
  },
  'Agronomia1': {
    name: 'Agronomia — Sessão 1',
    shortName: 'Agronomia 1',
    icon: '<i class="fa-solid fa-seedling"></i>',
    description: 'Estudos em fisiologia vegetal, manejo agronômico, patologia e solos.'
  },
  'Agronomia2': {
    name: 'Agronomia — Sessão 2',
    shortName: 'Agronomia 2',
    icon: '<i class="fa-solid fa-wheat-awn"></i>',
    description: 'Biotecnologia agrícola, controle biológico, sementes e práticas agroecológicas.'
  }
};

// Estado da Aplicação
const state = {
  category: 'all',
  searchQuery: '',
  videoFilter: 'all', // 'all', 'with_video', 'pending'
  activeModalWork: null
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  updateStats();
  renderCategoryTabs();
  renderWorks();
  setupEventListeners();
  checkUrlHash();
}

/**
 * Atualiza os contadores no topo da página
 */
function updateStats() {
  const total = TRABALHOS_DATA.length;
  const withVideo = TRABALHOS_DATA.filter(t => t.link && t.link.trim() !== '').length;
  const categoriesCount = Object.keys(CATEGORY_CONFIG).length;

  const totalEl = document.getElementById('stat-total-works');
  const videosEl = document.getElementById('stat-total-videos');
  const catsEl = document.getElementById('stat-total-categories');

  if (totalEl) totalEl.textContent = total;
  if (videosEl) videosEl.textContent = withVideo;
  if (catsEl) catsEl.textContent = categoriesCount;
}

/**
 * Renderiza as abas de categoria dinâmicas com contagem de itens
 */
function renderCategoryTabs() {
  const tabsContainer = document.getElementById('categories-tabs');
  if (!tabsContainer) return;

  const totalAll = TRABALHOS_DATA.length;

  let html = `
    <button class="cat-tab ${state.category === 'all' ? 'active' : ''}" data-cat="all">
      <span><i class="fa-solid fa-border-all"></i> Todas</span>
      <span class="cat-count">${totalAll}</span>
    </button>
  `;

  for (const [key, cfg] of Object.entries(CATEGORY_CONFIG)) {
    const count = TRABALHOS_DATA.filter(t => t.categoria === key).length;
    const isActive = state.category === key;
    html += `
      <button class="cat-tab ${isActive ? 'active' : ''}" data-cat="${key}">
        <span>${cfg.icon} ${cfg.shortName}</span>
        <span class="cat-count">${count}</span>
      </button>
    `;
  }

  tabsContainer.innerHTML = html;

  // Eventos de clique nas tabs
  tabsContainer.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      setCategory(cat);
    });
  });
}

/**
 * Define a categoria ativa
 */
function setCategory(catKey) {
  state.category = catKey;

  // Atualiza classe ativa nas abas
  document.querySelectorAll('.cat-tab').forEach(tab => {
    if (tab.getAttribute('data-cat') === catKey) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  renderWorks();

  // Scroll suave se estiver em uma categoria específica
  if (catKey !== 'all') {
    const secEl = document.getElementById(`cat-section-${catKey}`);
    if (secEl) {
      secEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

/**
 * Filtra a lista de trabalhos com base no estado atual
 */
function getFilteredWorks() {
  const query = state.searchQuery.trim().toLowerCase();

  return TRABALHOS_DATA.filter(work => {
    // Filtro por Categoria
    if (state.category !== 'all' && work.categoria !== state.category) {
      return false;
    }

    // Filtro por Status do Vídeo
    const hasLink = Boolean(work.link && work.link.trim() !== '');
    if (state.videoFilter === 'with_video' && !hasLink) {
      return false;
    }
    if (state.videoFilter === 'pending' && hasLink) {
      return false;
    }

    // Filtro por Busca (Título, Autores, ID)
    if (query) {
      const matchTitle = work.titulo.toLowerCase().includes(query);
      const matchAuthors = work.autores.toLowerCase().includes(query);
      const matchId = String(work.id) === query || `#${work.id}` === query || `id ${work.id}` === query;
      const matchCategory = work.categoria.toLowerCase().includes(query);

      return matchTitle || matchAuthors || matchId || matchCategory;
    }

    return true;
  });
}

/**
 * Renderiza os trabalhos organizados por seções de categoria
 */
function renderWorks() {
  const container = document.getElementById('works-container');
  if (!container) return;

  const filtered = getFilteredWorks();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
        <h3>Nenhum trabalho encontrado</h3>
        <p>Não encontramos trabalhos para os filtros selecionados ou termo de busca.</p>
        <button class="btn-reset-filter" id="btn-reset-filters"><i class="fa-solid fa-rotate-left"></i> Limpar Filtros e Busca</button>
      </div>
    `;

    document.getElementById('btn-reset-filters')?.addEventListener('click', resetFilters);
    return;
  }

  // Se o usuário selecionou uma categoria específica ou se todas estão visíveis
  const categoriesToRender = state.category === 'all'
    ? Object.keys(CATEGORY_CONFIG)
    : [state.category];

  let html = '';

  categoriesToRender.forEach(catKey => {
    const catWorks = filtered.filter(w => w.categoria === catKey);
    if (catWorks.length === 0) return;

    const catMeta = CATEGORY_CONFIG[catKey] || { name: catKey, icon: '<i class="fa-solid fa-folder-open"></i>', description: '' };

    html += `
      <section class="category-section" id="cat-section-${catKey}">
        <div class="category-header">
          <div class="category-title-group">
            <div class="category-badge-icon">${catMeta.icon}</div>
            <div>
              <h2 class="category-title">${catMeta.name}</h2>
              <small style="color: var(--color-text-muted); font-size: 0.85rem;">${catMeta.description}</small>
            </div>
          </div>
          <span class="category-total-badge">${catWorks.length} ${catWorks.length === 1 ? 'trabalho' : 'trabalhos'}</span>
        </div>

        <div class="works-grid">
          ${catWorks.map(work => createWorkCardHTML(work)).join('')}
        </div>
      </section>
    `;
  });

  container.innerHTML = html;

  // Registrar listeners nos cartões
  attachCardListeners();
}

/**
 * Gera o HTML de um Card com thumbnail de fundo @thumb.png
 */
function createWorkCardHTML(work) {
  const hasLink = Boolean(work.link && work.link.trim() !== '');
  const linkType = detectLinkType(work.link);
  const formattedId = String(work.id).padStart(2, '0');

  let badgeText = '<i class="fa-regular fa-clock"></i> Em breve';
  let badgeClass = 'no-link';

  if (hasLink) {
    badgeText = linkType === 'youtube' 
      ? '<i class="fa-brands fa-youtube"></i> YouTube' 
      : (linkType === 'drive' ? '<i class="fa-brands fa-google-drive"></i> Drive' : '<i class="fa-solid fa-circle-play"></i> Vídeo');
    badgeClass = 'has-link';
  }

  return `
    <article class="work-card" id="trabalho-${work.id}" data-id="${work.id}">
      <!-- Thumbnail 16:9 com thumb.png como background -->
      <div class="card-thumb-container" tabindex="0" role="button" aria-label="Apresentação do trabalho ${work.id}: ${escapeHtml(work.titulo)}">
        <div class="card-thumb-overlay"></div>

        <!-- Topo da Thumb: Badge de status -->
        <div class="thumb-top">
          <span class="thumb-video-badge ${badgeClass}">${badgeText}</span>
        </div>

        <!-- Centro da Thumb: Título do Trabalho -->
        <div class="thumb-center">
          <h3 class="thumb-work-title" title="${escapeHtml(work.titulo)}">
            ${escapeHtml(work.titulo)}
          </h3>
        </div>

        <!-- Overlay de Play ao passar o mouse -->
        <div class="thumb-play-overlay ${hasLink ? 'can-play' : ''}">
          <div class="play-circle-btn">
            ${hasLink ? '<i class="fa-solid fa-play" style="margin-left: 2px;"></i>' : '<i class="fa-solid fa-circle-info"></i>'}
          </div>
        </div>

        <!-- Rodapé da Thumb: ID pequeno no canto inferior direito -->
        <div class="thumb-bottom">
          <span class="thumb-id-badge" title="Identificador do trabalho">#${formattedId}</span>
        </div>
      </div>

      <!-- Informações complementares abaixo da Thumb -->
      <div class="card-body">
        <div class="card-authors-group">
          <span class="authors-icon"><i class="fa-solid fa-user-group"></i></span>
          <span class="card-authors-text" title="${escapeHtml(work.autores)}">
            <strong>Autores:</strong> ${escapeHtml(work.autores)}
          </span>
        </div>

        <div class="card-actions">
          ${hasLink
      ? `<button class="btn-watch active-link btn-open-video" data-id="${work.id}">
                 <span><i class="fa-solid fa-play" style="font-size:0.85em; margin-right:4px;"></i> Assistir Trabalho</span>
               </button>`
      : `<button class="btn-watch disabled-link btn-no-link" data-id="${work.id}">
                 <span><i class="fa-regular fa-clock" style="margin-right:4px;"></i> Vídeo em breve</span>
               </button>`
    }
          <button class="btn-details" data-id="${work.id}" title="Ver detalhes completos do trabalho" aria-label="Ver detalhes">
            <i class="fa-solid fa-circle-info"></i>
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Atribui os eventos de clique para cada card
 */
function attachCardListeners() {
  // Clique na thumbnail (ação principal)
  document.querySelectorAll('.card-thumb-container').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      const card = thumb.closest('.work-card');
      const workId = parseInt(card.getAttribute('data-id'), 10);
      handleWorkAction(workId);
    });

    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const card = thumb.closest('.work-card');
        const workId = parseInt(card.getAttribute('data-id'), 10);
        handleWorkAction(workId);
      }
    });
  });

  // Botão "Assistir Trabalho"
  document.querySelectorAll('.btn-open-video').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const workId = parseInt(btn.getAttribute('data-id'), 10);
      handleWorkAction(workId);
    });
  });

  // Botão "Vídeo em breve"
  document.querySelectorAll('.btn-no-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const workId = parseInt(btn.getAttribute('data-id'), 10);
      openDetailsModal(workId);
    });
  });

  // Botão de detalhes (ícone 'i')
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const workId = parseInt(btn.getAttribute('data-id'), 10);
      openDetailsModal(workId);
    });
  });
}

/**
 * Manipula a ação primária do trabalho
 */
function handleWorkAction(workId) {
  const work = TRABALHOS_DATA.find(w => w.id === workId);
  if (!work) return;

  if (work.link && work.link.trim() !== '') {
    openVideoModal(work);
  } else {
    showToast(`O vídeo do trabalho #${work.id} será disponibilizado em breve!`);
    openDetailsModal(workId);
  }
}

/**
 * Detecta o tipo de link (YouTube, Drive, Canva, etc.)
 */
function detectLinkType(url) {
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  if (lower.includes('drive.google.com')) return 'drive';
  if (lower.includes('canva.com') || lower.includes('canva.link')) return 'canva';
  return 'external';
}

/**
 * Extrai o ID do vídeo do YouTube para montagem do iframe embed
 */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  try {
    // youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch && shortMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}?autoplay=1&rel=0`;
    }

    // youtube.com/watch?v=VIDEO_ID
    const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (longMatch && longMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${longMatch[1]}?autoplay=1&rel=0`;
    }
  } catch (err) {
    console.error('Erro ao processar URL do YouTube:', err);
  }

  return null;
}

/**
 * Abre o Modal com Player de Vídeo e Informações
 */
function openVideoModal(work) {
  state.activeModalWork = work;
  const modal = document.getElementById('work-modal');
  const playerContainer = document.getElementById('modal-player');
  const embedUrl = getYouTubeEmbedUrl(work.link);
  const linkType = detectLinkType(work.link);
  const formattedId = String(work.id).padStart(2, '0');

  // Preenche dados
  document.getElementById('modal-work-id').textContent = `Trabalho Científico #${formattedId}`;
  document.getElementById('modal-work-title').textContent = work.titulo;
  document.getElementById('modal-work-category').textContent = CATEGORY_CONFIG[work.categoria]?.name || work.categoria;
  document.getElementById('modal-work-authors').textContent = work.autores;

  // Monta o Player
  if (embedUrl) {
    playerContainer.innerHTML = `
      <iframe 
        src="${embedUrl}" 
        title="${escapeHtml(work.titulo)}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  } else {
    // Para links do Google Drive, Canva ou outros
    const typeLabel = linkType === 'drive' ? 'Google Drive' : (linkType === 'canva' ? 'Canva' : 'externo');
    const brandIcon = linkType === 'drive' ? '<i class="fa-brands fa-google-drive"></i>' : (linkType === 'canva' ? '<i class="fa-solid fa-palette"></i>' : '<i class="fa-solid fa-arrow-up-right-from-square"></i>');

    playerContainer.innerHTML = `
      <div class="modal-player-placeholder">
        <div class="icon"><i class="fa-solid fa-clapperboard"></i></div>
        <h3>Vídeo hospedado no ${typeLabel}</h3>
        <p style="max-width: 480px; margin: 8px auto 20px; font-size: 0.95rem; opacity: 0.9;">
          Este vídeo está hospedado na plataforma <strong>${typeLabel}</strong>. Clique no botão abaixo para assistir à apresentação completa em uma nova aba.
        </p>
        <a href="${work.link}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 1rem; padding: 12px 26px;">
          ${brandIcon} Abrir Apresentação no ${typeLabel} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.85em; margin-left:6px;"></i>
        </a>
      </div>
    `;
  }

  // Botão de Link Externo no Rodapé
  const externalBtn = document.getElementById('modal-external-link');
  if (work.link) {
    externalBtn.href = work.link;
    externalBtn.style.display = 'inline-flex';
    if (linkType === 'youtube') {
      externalBtn.innerHTML = `<i class="fa-brands fa-youtube"></i> Abrir no YouTube <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.85em; margin-left:6px;"></i>`;
    } else if (linkType === 'drive') {
      externalBtn.innerHTML = `<i class="fa-brands fa-google-drive"></i> Abrir no Google Drive <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.85em; margin-left:6px;"></i>`;
    } else {
      externalBtn.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> Abrir Link Original`;
    }
  } else {
    externalBtn.style.display = 'none';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Abre o Modal em modo Detalhes (inclusive quando ainda não possui link)
 */
function openDetailsModal(workId) {
  const work = TRABALHOS_DATA.find(w => w.id === workId);
  if (!work) return;

  state.activeModalWork = work;
  const modal = document.getElementById('work-modal');
  const playerContainer = document.getElementById('modal-player');
  const formattedId = String(work.id).padStart(2, '0');

  // Preenche dados
  document.getElementById('modal-work-id').textContent = `Trabalho Científico #${formattedId}`;
  document.getElementById('modal-work-title').textContent = work.titulo;
  document.getElementById('modal-work-category').textContent = CATEGORY_CONFIG[work.categoria]?.name || work.categoria;
  document.getElementById('modal-work-authors').textContent = work.autores;

  if (work.link && work.link.trim() !== '') {
    openVideoModal(work);
    return;
  }

  // Placeholder elegante para trabalhos sem link cadastrado
  playerContainer.innerHTML = `
    <div class="modal-player-placeholder" style="background: linear-gradient(135deg, #2d1738 0%, #3f1f4f 100%);">
      <div class="icon"><i class="fa-regular fa-clock"></i></div>
      <h3 style="font-size: 1.25rem;">Apresentação em Vídeo a Caminho</h3>
      <p style="max-width: 460px; margin: 8px auto 16px; font-size: 0.92rem; opacity: 0.88;">
        O link de vídeo deste trabalho ainda está sendo processado pela comissão organizadora da SNCT e estará disponível em breve.
      </p>
      <div style="background: rgba(255,255,255,0.12); padding: 8px 16px; border-radius: 999px; font-size: 0.82rem;">
        Identificador do trabalho: <strong>#${formattedId}</strong>
      </div>
    </div>
  `;

  const externalBtn = document.getElementById('modal-external-link');
  externalBtn.style.display = 'none';

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Fecha o Modal
 */
function closeModal() {
  const modal = document.getElementById('work-modal');
  const playerContainer = document.getElementById('modal-player');

  // Limpa o iframe para parar o áudio/vídeo imediatamente
  if (playerContainer) {
    playerContainer.innerHTML = '';
  }

  modal.classList.remove('open');
  document.body.style.overflow = '';
  state.activeModalWork = null;
}

/**
 * Exibe notificação temporária toast
 */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--color-coral-400); font-size: 1rem;"><i class="fa-solid fa-bullhorn"></i></span>
    <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Configura os ouvintes de eventos globais
 */
function setupEventListeners() {
  // Barra de Pesquisa
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
      }
      renderWorks();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      state.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderWorks();
    });
  }

  // Filtros de Status (Vídeo vs Todos)
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.videoFilter = btn.getAttribute('data-status');
      renderWorks();
    });
  });

  // Modal Close
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('modal-close-footer-btn')?.addEventListener('click', closeModal);

  // Fechar ao clicar no backdrop do modal
  const modal = document.getElementById('work-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Tecla ESC fecha modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Botão Voltar ao Topo
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Botão Compartilhar Trabalho dentro do Modal
  document.getElementById('modal-share-btn')?.addEventListener('click', () => {
    if (!state.activeModalWork) return;
    const workUrl = `${window.location.origin}${window.location.pathname}#trabalho-${state.activeModalWork.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(workUrl).then(() => {
        showToast('Link do trabalho copiado para a área de transferência!');
      });
    } else {
      showToast(`Link: ${workUrl}`);
    }
  });
}

/**
 * Reseta todos os filtros
 */
function resetFilters() {
  state.category = 'all';
  state.searchQuery = '';
  state.videoFilter = 'all';

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (clearSearchBtn) clearSearchBtn.style.display = 'none';

  document.querySelectorAll('.status-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-status') === 'all');
  });

  renderCategoryTabs();
  renderWorks();
}

/**
 * Verifica se a URL contém uma âncora direta para um trabalho (#trabalho-10)
 */
function checkUrlHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#trabalho-')) {
    const id = parseInt(hash.replace('#trabalho-', ''), 10);
    if (!isNaN(id)) {
      setTimeout(() => {
        const card = document.getElementById(`trabalho-${id}`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.style.outline = '3px solid var(--color-coral-500)';
          card.style.outlineOffset = '4px';
          setTimeout(() => {
            card.style.outline = '';
          }, 3500);
        }
      }, 500);
    }
  }
}

/**
 * Utilitário de escape de HTML
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
