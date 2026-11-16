/* =========================================================
   Ficha de Herói — Auros Veyr | Parte 2
   Tudo que a página faz quando alguém clica está aqui.
   ========================================================= */

/* ---------- atalhos ---------- */

function pegar(id) {
  return document.getElementById(id);
}

function pegarTodos(seletor) {
  return document.querySelectorAll(seletor);
}

/* ---------- saudação pelo horário ---------- */

function montarSaudacao() {
  const campo = pegar("saudacao");
  if (!campo) return;

  const hora = new Date().getHours();
  let periodo;

  if (hora >= 5 && hora < 12) {
    periodo = "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    periodo = "Boa tarde";
  } else {
    periodo = "Boa noite";
  }

  campo.textContent = periodo + ", viajante. O Meridiano Zero registrou sua chegada.";
}

/* ---------- menu hambúrguer ---------- */

function ligarMenu() {
  const botao = pegar("botao-menu");
  const menu = pegar("menu-principal");
  if (!botao || !menu) return;

  const icone = botao.querySelector("i");

  function alternarMenu() {
    const aberto = menu.classList.toggle("aberto");

    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    botao.title = aberto ? "Fechar menu" : "Abrir menu";

    if (icone) {
      icone.className = aberto ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
  }

  botao.addEventListener("click", alternarMenu);

  // um link escolhido fecha o menu no celular
  pegarTodos(".link-navegacao").forEach(function (link) {
    link.addEventListener("click", function () {
      if (menu.classList.contains("aberto")) alternarMenu();
    });
  });

  // se a janela crescer, o menu não pode ficar aberto
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900 && menu.classList.contains("aberto")) {
      alternarMenu();
    }
  });
}

/* ---------- rolagem suave entre as seções ---------- */

function ligarRolagemSuave() {
  pegarTodos('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (evento) {
      const alvo = document.querySelector(link.getAttribute("href"));
      if (!alvo) return;

      evento.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth", block: "start" });

      // devolve o foco para o destino
      alvo.setAttribute("tabindex", "-1");
      alvo.focus({ preventScroll: true });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });
}

/* ---------- modo diurno da guilda ---------- */

function ligarTema() {
  const botao = pegar("botao-tema");
  if (!botao) return;

  const icone = botao.querySelector("i");

  botao.addEventListener("click", function () {
    const diurno = document.body.classList.toggle("modo-diurno");

    botao.setAttribute("aria-pressed", diurno ? "true" : "false");
    botao.title = diurno ? "Voltar ao modo noturno" : "Alternar modo diurno da guilda";

    if (icone) {
      icone.className = diurno ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }
  });
}

/* ---------- barra de progresso da leitura ---------- */

function ligarBarraProgresso() {
  const barra = pegar("barra-progresso");
  if (!barra) return;

  function atualizar() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const porcento = total > 0 ? (window.scrollY / total) * 100 : 0;
    barra.style.width = porcento + "%";
  }

  window.addEventListener("scroll", atualizar, { passive: true });
  window.addEventListener("resize", atualizar);
  atualizar();
}

/* ---------- botão de voltar ao topo ---------- */

function ligarBotaoTopo() {
  const botao = pegar("botao-topo");
  if (!botao) return;

  function atualizar() {
    botao.classList.toggle("visivel", window.scrollY > 600);
  }

  botao.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", atualizar, { passive: true });
  atualizar();
}

/* ---------- revelação dos blocos na rolagem ---------- */

let observadorRevelacao = null;

function prepararRevelacao() {
  // a classe vem pelo script: sem JS a página continua visível
  document.body.classList.add("vai-revelar");

  const alvos = pegarTodos(".secao, .cronica-evento, .habilidade-item, .conquista-item");

  if (!("IntersectionObserver" in window)) {
    alvos.forEach(function (alvo) { alvo.classList.add("revelado"); });
    return;
  }

  observadorRevelacao = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("revelado");
        observadorRevelacao.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  alvos.forEach(function (alvo) { observadorRevelacao.observe(alvo); });
}

/* ---------- inventário ---------- */

// o acervo inteiro fica neste array
// cada item tem nome, tipo, raridade, categoria, descrição e imagem
const itens = [
  {
    nome: "Meridiano Zero",
    tipo: "Artefato temporal",
    raridade: "Lendário",
    categoria: "Artefato",
    descricao: "Relógio de bolso com três mecanismos concêntricos. Ancora Auros em um ponto do tempo e permite pequenas alterações na realidade.",
    imagem: "imagens/item-meridiano-zero.jpg",
    alt: "O relógio de bolso Meridiano Zero, artefato lendário de mecanismos concêntricos de ouro.",
    destaque: true,
    selo: "Artefato Lendário",
    citacao: "Enquanto houver um ponteiro, ainda existe uma escolha."
  },
  {
    nome: "Morrow",
    tipo: "Companheiro autômato",
    raridade: "Lendário",
    categoria: "Companheiro",
    descricao: "Corvo mecânico que preserva memórias de linhas temporais descartadas. Bica o relógio do mestre quando ele está prestes a errar.",
    imagem: "imagens/item-morrow.jpg",
    alt: "Morrow, o corvo autômato companheiro de Auros Veyr."
  },
  {
    nome: "Agulha de Vhalor",
    tipo: "Arma",
    raridade: "Épico",
    categoria: "Arma",
    descricao: "Lâmina fina acoplada ao antebraço, forjada para atingir pontos exatos das estruturas mecânicas inimigas.",
    imagem: "imagens/item-agulha-vhalor.jpg",
    alt: "A Agulha de Vhalor, lâmina fina acoplada ao antebraço do herói."
  },
  {
    nome: "Ampulheta de Âmbar",
    tipo: "Dispositivo temporal",
    raridade: "Raro",
    categoria: "Relíquia",
    descricao: "Contém partículas de Âmbar Cronal e desacelera mecanismos adversários por alguns segundos.",
    imagem: "imagens/item-ampulheta-ambar.jpg",
    alt: "A Ampulheta de Âmbar, frasco com partículas de Âmbar Cronal."
  },
  {
    nome: "Chave do Relojoeiro",
    tipo: "Ferramenta",
    raridade: "Incomum",
    categoria: "Ferramenta",
    descricao: "Ferramenta multifuncional usada para reparar e ajustar os mecanismos do próprio corpo.",
    imagem: "imagens/item-chave-relojoeiro.jpg",
    alt: "A Chave do Relojoeiro, ferramenta multifuncional de reparo."
  },
  {
    nome: "Lâmpada de Éter",
    tipo: "Equipamento",
    raridade: "Raro",
    categoria: "Relíquia",
    descricao: "Revela distorções temporais invisíveis a olho nu.",
    imagem: "imagens/item-lampada-eter.jpg",
    alt: "A Lâmpada de Éter acesa, capaz de revelar distorções temporais invisíveis."
  }
];

// guarda os nomes marcados como favoritos
const favoritos = [];

// guarda a categoria exibida no momento
let filtroAtual = "todos";

// converte a raridade na classe do CSS
function classeRaridade(raridade) {
  const mapa = {
    "Incomum": "incomum",
    "Raro": "raro",
    "Épico": "epico",
    "Lendário": "lendario"
  };
  return mapa[raridade] || "incomum";
}

// cria o card de um item
function criarCard(item) {
  const card = document.createElement("article");
  card.className = "card-item";
  card.classList.add("card-item--" + classeRaridade(item.raridade));

  if (item.destaque) {
    card.classList.add("card-item--destaque");

    const selo = document.createElement("span");
    selo.className = "selo-engrenagem";
    selo.setAttribute("aria-hidden", "true");
    selo.innerHTML = '<i class="fa-solid fa-gear"></i>';
    card.appendChild(selo);
  }

  const imagem = document.createElement("img");
  imagem.className = "card-imagem";
  imagem.src = item.imagem;
  imagem.alt = item.alt;
  imagem.loading = "lazy";
  card.appendChild(imagem);

  const conteudo = document.createElement("div");
  conteudo.className = "card-conteudo";

  if (item.selo) {
    const seloTexto = document.createElement("p");
    seloTexto.className = "card-selo";
    seloTexto.textContent = item.selo;
    conteudo.appendChild(seloTexto);
  }

  const titulo = document.createElement("h3");
  titulo.className = "card-titulo";
  titulo.textContent = item.nome;
  conteudo.appendChild(titulo);

  const raridade = document.createElement("p");
  raridade.className = "card-raridade card-raridade--" + classeRaridade(item.raridade);
  raridade.textContent = item.raridade + ", " + item.tipo;
  conteudo.appendChild(raridade);

  const descricao = document.createElement("p");
  descricao.className = "card-descricao";
  descricao.textContent = item.descricao;
  conteudo.appendChild(descricao);

  if (item.citacao) {
    const citacao = document.createElement("p");
    citacao.className = "card-citacao";
    citacao.textContent = item.citacao;
    conteudo.appendChild(citacao);
  }

  card.appendChild(conteudo);

  const botaoFavorito = document.createElement("button");
  botaoFavorito.className = "botao-favorito";
  botaoFavorito.type = "button";
  botaoFavorito.setAttribute("aria-pressed", "false");
  botaoFavorito.title = "Marcar como favorito";
  botaoFavorito.innerHTML = '<i class="fa-solid fa-star" aria-hidden="true"></i>';
  botaoFavorito.addEventListener("click", function () {
    alternarFavorito(item.nome, botaoFavorito);
  });
  card.appendChild(botaoFavorito);

  aplicarEstadoFavorito(card, item.nome);

  return card;
}

// acerta o visual do botão de favorito ao redesenhar
function aplicarEstadoFavorito(card, nome) {
  const botao = card.querySelector(".botao-favorito");
  if (!botao) return;

  const marcado = favoritos.indexOf(nome) !== -1;

  botao.classList.toggle("ativo", marcado);
  botao.setAttribute("aria-pressed", marcado ? "true" : "false");
  botao.title = marcado ? "Remover dos favoritos" : "Marcar como favorito";
}

// filtra o array pelo tipo ou pelos favoritos
function itensFiltrados() {
  return itens.filter(function (item) {
    if (filtroAtual === "todos") return true;
    if (filtroAtual === "favoritos") return favoritos.indexOf(item.nome) !== -1;
    return item.categoria === filtroAtual;
  });
}

// reconstrói os cards na tela
function desenharInventario(filtro, animar) {
  const grade = pegar("inventario-grid");
  if (!grade) return;

  filtroAtual = filtro || "todos";
  grade.innerHTML = "";

  const lista = itensFiltrados();

  if (lista.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "inventario-vazio";
    vazio.textContent = filtroAtual === "favoritos"
      ? "Nenhum item marcado como favorito ainda. Clique na estrela de um card para guardar aqui."
      : "Nenhum item nessa categoria.";
    grade.appendChild(vazio);
    atualizarContador();
    return;
  }

  lista.forEach(function (item, indice) {
    const card = criarCard(item);

    if (animar) {
      card.classList.add("card-entrando");
      card.style.animationDelay = (indice * 0.06) + "s";
    }

    grade.appendChild(card);
  });

  atualizarContador();
}

// atualiza o contador de itens
function atualizarContador() {
  const contador = pegar("contador-itens");
  if (!contador) return;

  const mostrados = itensFiltrados().length;

  let texto = mostrados === itens.length
    ? itens.length + " itens no acervo"
    : mostrados + " de " + itens.length + " itens no acervo";

  if (favoritos.length > 0) {
    texto += ", " + favoritos.length + (favoritos.length > 1 ? " favoritos" : " favorito");
  }

  contador.textContent = texto;
}

// liga os botões de filtro
function ligarFiltros() {
  const botoes = pegarTodos(".botao-filtro");

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      botoes.forEach(function (outro) {
        outro.classList.remove("ativo");
        outro.setAttribute("aria-pressed", "false");
      });

      botao.classList.add("ativo");
      botao.setAttribute("aria-pressed", "true");

      desenharInventario(botao.dataset.filtro, true);
    });
  });
}

// alterna o favorito de um item
function alternarFavorito(nome, botao) {
  const posicao = favoritos.indexOf(nome);
  const marcado = posicao === -1;

  if (marcado) {
    favoritos.push(nome);
  } else {
    favoritos.splice(posicao, 1);
  }

  botao.classList.toggle("ativo", marcado);
  botao.setAttribute("aria-pressed", marcado ? "true" : "false");
  botao.title = marcado ? "Remover dos favoritos" : "Marcar como favorito";

  // com o filtro de favoritos aberto, o card sai da lista na hora
  if (filtroAtual === "favoritos") {
    desenharInventario("favoritos", true);
    return;
  }

  atualizarContador();
}

/* ---------- barra de experiência ---------- */

const XP_META = 100;

let xpAtual = 0;
let nivel = 1;

// guarda os valores iniciais dos atributos
const valoresIniciais = {};

function guardarValoresIniciais() {
  pegarTodos(".atributos-painel .barra-atributo").forEach(function (barra) {
    const trilho = barra.querySelector(".barra-trilho");
    const rotulo = barra.querySelector(".barra-atributo-rotulo");
    if (!trilho || !rotulo) return;

    valoresIniciais[rotulo.textContent.trim()] = parseInt(trilho.getAttribute("aria-valuenow"), 10);
  });
}

function restaurarAtributos() {
  pegarTodos(".atributos-painel .barra-atributo").forEach(function (barra) {
    const trilho = barra.querySelector(".barra-trilho");
    const preenchimento = barra.querySelector(".barra-preenchimento");
    const valor = barra.querySelector(".barra-atributo-valor");
    const rotulo = barra.querySelector(".barra-atributo-rotulo");
    if (!trilho || !preenchimento || !valor || !rotulo) return;

    const nome = rotulo.textContent.trim();
    const original = valoresIniciais[nome];
    if (original === undefined) return;

    trilho.setAttribute("aria-valuenow", original);
    preenchimento.style.width = original + "%";

    if (valor.firstChild) {
      valor.firstChild.nodeValue = original + " ";
    }

    trilho.setAttribute("aria-label", nome + ": " + original + " de 100");

    desenharBotoesAtributo(barra);
  });
}

// cada missão deixa Auros mais forte
function evoluirAtributos(bonus) {
  pegarTodos(".atributos-painel .barra-atributo").forEach(function (barra) {
    const trilho = barra.querySelector(".barra-trilho");
    const preenchimento = barra.querySelector(".barra-preenchimento");
    const valor = barra.querySelector(".barra-atributo-valor");
    const rotulo = barra.querySelector(".barra-atributo-rotulo");
    if (!trilho || !preenchimento || !valor) return;

    const atual = parseInt(trilho.getAttribute("aria-valuenow"), 10);
    if (isNaN(atual)) return;

    const novo = Math.min(atual + 1 + bonus, 100);
    if (novo === atual) return;

    trilho.setAttribute("aria-valuenow", novo);
    preenchimento.style.width = novo + "%";

    if (valor.firstChild) {
      valor.firstChild.nodeValue = novo + " ";
    }

    const nome = rotulo ? rotulo.textContent.trim() : "Atributo";
    trilho.setAttribute("aria-label", nome + ": " + novo + " de 100");

    desenharBotoesAtributo(barra);

    barra.classList.remove("atributo-subiu");
    void barra.offsetWidth;
    barra.classList.add("atributo-subiu");
  });
}

function ganharXp() {
  const ganho = Math.floor(Math.random() * 16) + 15;
  xpAtual += ganho;

  mostrarGanho(ganho);

  const mensagem = pegar("xp-mensagem");

  if (xpAtual >= XP_META) {
    xpAtual -= XP_META;
    nivel += 1;

    evoluirAtributos(3);

    if (mensagem) {
      mensagem.textContent = "Nível up! Auros chegou ao nível " + nivel + ".";
      mensagem.classList.add("destaque");
    }

    tocarSubidaDeNivel();

    setTimeout(function () {
      if (mensagem) mensagem.classList.remove("destaque");
    }, 2600);
  } else {
    evoluirAtributos(0);

    if (mensagem) {
      mensagem.textContent = "Registro atualizado. Faltam " + (XP_META - xpAtual) + " XP para o próximo nível.";
      mensagem.classList.remove("destaque");
    }
  }

  atualizarXp();
}

function tocarSubidaDeNivel() {
  const painel = pegar("painel-xp") || document.querySelector(".painel-xp");
  if (!painel) return;

  painel.classList.remove("subiu");
  void painel.offsetWidth;
  painel.classList.add("subiu");

  setTimeout(function () {
    painel.classList.remove("subiu");
  }, 1200);
}

function mostrarGanho(ganho) {
  const painel = document.querySelector(".painel-xp");
  if (!painel) return;

  const aviso = document.createElement("span");
  aviso.className = "xp-ganho";
  aviso.textContent = "+" + ganho + " XP";
  painel.appendChild(aviso);

  aviso.addEventListener("animationend", function () {
    aviso.remove();
  });
}

function atualizarXp() {
  const preenchimento = pegar("xp-preenchimento");
  const trilho = pegar("xp-trilho");
  const valor = pegar("xp-atual");
  const rotuloNivel = pegar("xp-nivel");

  if (preenchimento) preenchimento.style.width = xpAtual + "%";
  if (trilho) trilho.setAttribute("aria-valuenow", xpAtual);
  if (valor) valor.textContent = xpAtual;
  if (rotuloNivel) rotuloNivel.textContent = nivel;
}

function reiniciarXp() {
  xpAtual = 0;
  nivel = 1;

  restaurarAtributos();

  const mensagem = pegar("xp-mensagem");
  if (mensagem) {
    mensagem.textContent = "Registro reiniciado.";
    mensagem.classList.remove("destaque");
  }

  atualizarXp();
}

function ligarXp() {
  const botao = pegar("botao-xp");
  const botaoReset = pegar("botao-xp-reset");
  if (!botao) return;

  botao.addEventListener("click", ganharXp);

  if (botaoReset) {
    botaoReset.addEventListener("click", reiniciarXp);
  }

  guardarValoresIniciais();
  atualizarXp();
}

/* ---------- pontos de atributo ---------- */

function nomeDoAtributo(barra) {
  const rotulo = barra.querySelector(".barra-atributo-rotulo");
  return rotulo ? rotulo.textContent.trim() : "";
}

// cria os botões de + e - ao lado do valor do atributo
function criarControleDeAtributo(barra, nome) {
  const valor = barra.querySelector(".barra-atributo-valor");
  if (!valor) return;

  const controle = document.createElement("div");
  controle.className = "atributo-controle";

  const botaoMenos = document.createElement("button");
  botaoMenos.type = "button";
  botaoMenos.className = "atributo-ponto-botao atributo-ponto-botao--menos";
  botaoMenos.setAttribute("aria-label", "Remover um ponto de " + nome);
  botaoMenos.innerHTML = '<i class="fa-solid fa-minus" aria-hidden="true"></i>';

  const botaoMais = document.createElement("button");
  botaoMais.type = "button";
  botaoMais.className = "atributo-ponto-botao atributo-ponto-botao--mais";
  botaoMais.setAttribute("aria-label", "Adicionar um ponto de " + nome);
  botaoMais.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i>';

  valor.parentNode.insertBefore(controle, valor);
  controle.appendChild(botaoMenos);
  controle.appendChild(valor);
  controle.appendChild(botaoMais);

  botaoMenos.addEventListener("click", function () {
    alterarAtributo(nome, -1);
  });

  botaoMais.addEventListener("click", function () {
    alterarAtributo(nome, 1);
  });

  desenharBotoesAtributo(barra);
}

// aplica um novo valor ao texto, à barra e ao leitor de tela
function aplicarValorAtributo(barra, novo) {
  const trilho = barra.querySelector(".barra-trilho");
  const preenchimento = barra.querySelector(".barra-preenchimento");
  const valor = barra.querySelector(".barra-atributo-valor");
  const rotulo = barra.querySelector(".barra-atributo-rotulo");
  const nome = rotulo ? rotulo.textContent.trim() : "Atributo";

  if (trilho) trilho.setAttribute("aria-valuenow", novo);
  if (preenchimento) preenchimento.style.width = novo + "%";
  if (valor && valor.firstChild) valor.firstChild.nodeValue = novo + " ";
  if (trilho) trilho.setAttribute("aria-label", nome + ": " + novo + " de 100");
}

// liga ou desliga os botões conforme os limites
function desenharBotoesAtributo(barra) {
  const trilho = barra.querySelector(".barra-trilho");
  const atual = trilho ? parseInt(trilho.getAttribute("aria-valuenow"), 10) : 0;
  const menos = barra.querySelector(".atributo-ponto-botao--menos");
  const mais = barra.querySelector(".atributo-ponto-botao--mais");

  if (menos) menos.disabled = atual <= 0;
  if (mais) mais.disabled = atual >= 100;
}

function barraDoAtributo(nome) {
  let encontrado = null;

  pegarTodos(".atributos-painel .barra-atributo").forEach(function (barra) {
    if (nomeDoAtributo(barra) === nome) encontrado = barra;
  });

  return encontrado;
}

function alterarAtributo(nome, diferenca) {
  const barra = barraDoAtributo(nome);
  if (!barra) return;

  const trilho = barra.querySelector(".barra-trilho");
  if (!trilho) return;

  const atual = parseInt(trilho.getAttribute("aria-valuenow"), 10);
  if (isNaN(atual)) return;

  const novo = Math.max(0, Math.min(100, atual + diferenca));
  if (novo === atual) return;

  aplicarValorAtributo(barra, novo);
  desenharBotoesAtributo(barra);

  barra.classList.remove("atributo-subiu");
  void barra.offsetWidth;
  barra.classList.add("atributo-subiu");
}

function ligarAtributos() {
  pegarTodos(".atributos-painel .barra-atributo").forEach(function (barra) {
    criarControleDeAtributo(barra, nomeDoAtributo(barra));
  });
}

/* ---------- ver mais na história ---------- */

function ligarHistoria() {
  const botao = pegar("botao-historia");
  const bloco = pegar("historia-completa");
  const texto = pegar("texto-historia");
  if (!botao || !bloco) return;

  const icone = botao.querySelector("i");

  botao.addEventListener("click", function () {
    const aberto = bloco.classList.toggle("revelado");

    if (texto) {
      texto.textContent = aberto ? "Ver menos" : "Ver história completa";
    }

    if (icone) {
      icone.className = aberto ? "fa-solid fa-book" : "fa-solid fa-book-open";
    }

    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
}

/* ---------- formulário da guilda ---------- */

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mostrarErro(campo, texto) {
  const aviso = pegar("erro-" + campo);
  const entrada = pegar("campo-" + campo);

  if (aviso) aviso.textContent = texto;

  if (entrada) {
    entrada.classList.add("campo-invalido");
    entrada.setAttribute("aria-invalid", "true");
  }
}

function limparErro(campo) {
  const aviso = pegar("erro-" + campo);
  const entrada = pegar("campo-" + campo);

  if (aviso) aviso.textContent = "";

  if (entrada) {
    entrada.classList.remove("campo-invalido");
    entrada.removeAttribute("aria-invalid");
  }
}

function avisarSucesso(nome) {
  const status = pegar("formulario-status");
  if (!status) return;

  status.textContent = "Mensagem enviada, " + nome + ". A guilda responde no próximo ciclo.";
  status.className = "formulario-status sucesso";

  const resposta = pegar("guilda-resposta");
  if (resposta) resposta.classList.add("visivel");
}

function avisarFalha() {
  const status = pegar("formulario-status");
  if (!status) return;

  status.textContent = "Faltou preencher algum campo. Confira os avisos acima.";
  status.className = "formulario-status falha";

  const resposta = pegar("guilda-resposta");
  if (resposta) resposta.classList.remove("visivel");
}

function ligarFormulario() {
  const formulario = pegar("formulario-guilda");
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = pegar("campo-nome");
    const email = pegar("campo-email");
    const mensagem = pegar("campo-mensagem");

    let tudoCerto = true;

    limparErro("nome");
    limparErro("email");
    limparErro("mensagem");

    if (nome.value.trim() === "") {
      mostrarErro("nome", "Escreva o nome do agente.");
      tudoCerto = false;
    }

    if (email.value.trim() === "") {
      mostrarErro("email", "Informe um e-mail para resposta.");
      tudoCerto = false;
    } else if (!emailValido(email.value.trim())) {
      mostrarErro("email", "Esse e-mail parece incompleto. Confira o formato.");
      tudoCerto = false;
    }

    if (mensagem.value.trim() === "") {
      mostrarErro("mensagem", "Escreva a mensagem antes de enviar.");
      tudoCerto = false;
    }

    if (tudoCerto) {
      avisarSucesso(nome.value.trim());
      formulario.reset();
    } else {
      avisarFalha();
    }
  });
}

// apaga o aviso assim que a pessoa começa a corrigir o campo
function ligarLimpezaDeErros() {
  ["nome", "email", "mensagem"].forEach(function (campo) {
    const entrada = pegar("campo-" + campo);
    if (!entrada) return;

    entrada.addEventListener("input", function () {
      limparErro(campo);
      const resposta = pegar("guilda-resposta");
      if (resposta) resposta.classList.remove("visivel");
    });
  });
}

/* ---------- oráculo do meridiano (dados) ---------- */

// o desenho de cada dado: o corpo (polígono) e as facetas (linhas)
// o número fica no meio da forma
const DADOS = {
  4: {
    corpo: "50,8 92,86 8,86",
    facetas: "M50 58 L50 8 M50 58 L92 86 M50 58 L8 86",
    numeroY: 58
  },
  6: {
    corpo: "50,6 90,28 90,72 50,94 10,72 10,28",
    facetas: "M50 6 L50 50 M10 72 L50 50 M90 72 L50 50",
    numeroY: 50
  },
  8: {
    corpo: "50,4 96,50 50,96 4,50",
    facetas: "M4 50 L96 50 M50 4 L50 96",
    numeroY: 50
  },
  10: {
    corpo: "50,4 91,38 68,94 32,94 9,38",
    facetas: "M9 38 L91 38 M50 4 L50 38 M50 38 L32 94 M50 38 L68 94",
    numeroY: 50
  },
  12: {
    corpo: "50,6 95,40 78,92 22,92 5,40",
    facetas: "M50 6 L50 30 M95 40 L71 47 M78 92 L63 76 M22 92 L37 76 M5 40 L29 47 "
      + "M50 30 L71 47 L63 76 L37 76 L29 47 Z",
    numeroY: 50
  },
  20: {
    corpo: "50,4 93,27 93,73 50,96 7,73 7,27",
    facetas: "M50 24 L76 66 L24 66 Z M50 4 L50 24 M93 27 L76 66 M93 73 L76 66 "
      + "M50 96 L50 66 M7 73 L24 66 M7 27 L24 66",
    numeroY: 50
  }
};

let dadoAtual = 6;
let rolando = false;
let confirmandoLimpeza = false;
let timerLimpeza = null;

const historico = [];
const MAX_HISTORICO = 20;
const POR_PAGINA = 5;
let paginaHistorico = 0;

// sorteio justo com o gerador do navegador
// descarta os valores que favoreceriam algum número
function numeroJusto(lados) {
  if (window.crypto && typeof crypto.getRandomValues === "function") {
    const limite = Math.floor(0x100000000 / lados) * lados;
    const buffer = new Uint32Array(1);

    let valor;
    do {
      crypto.getRandomValues(buffer);
      valor = buffer[0];
    } while (valor >= limite);

    return (valor % lados) + 1;
  }

  return Math.floor(Math.random() * lados) + 1;
}

// monta o SVG do dado
function svgDoDado(lados, valor) {
  const forma = DADOS[lados];
  const texto = valor === null || valor === undefined ? "–" : valor;

  return '<svg class="dado-forma" viewBox="0 0 100 100" aria-hidden="true">'
    + '<polygon class="dado-corpo" points="' + forma.corpo + '"></polygon>'
    + '<path d="' + forma.facetas + '"></path>'
    + '<text class="dado-numero" x="50" y="' + forma.numeroY + '" '
    + 'text-anchor="middle" dominant-baseline="central">' + texto + '</text>'
    + '</svg>';
}

// mostra o dado no palco
function desenharDado(lados, valor) {
  const caixa = pegar("dado-svg");
  if (!caixa) return;

  caixa.innerHTML = svgDoDado(lados, valor);
}

// monta os botões de dado
function construirSeletor() {
  const caixa = pegar("dados-seletor");
  if (!caixa) return;

  Object.keys(DADOS).forEach(function (lados) {
    const botao = document.createElement("button");
    const numero = parseInt(lados, 10);

    botao.type = "button";
    botao.className = "botao-dado";
    botao.dataset.dado = lados;
    botao.setAttribute("aria-pressed", "false");
    botao.innerHTML = svgDoDado(numero, numero) + "<span>d" + lados + "</span>";
    botao.addEventListener("click", function () {
      escolherDado(numero);
    });

    caixa.appendChild(botao);
  });
}

// troca o dado escolhido
function escolherDado(lados) {
  if (rolando) return;

  dadoAtual = lados;

  pegarTodos(".botao-dado").forEach(function (botao) {
    const ativo = parseInt(botao.dataset.dado, 10) === lados;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", ativo ? "true" : "false");
  });

  const tipo = pegar("dado-tipo");
  if (tipo) tipo.textContent = "d" + lados;

  desenharDado(lados, null);
}

// gira o dado até parar no resultado
function rolarDado() {
  if (rolando) return;

  rolando = true;

  const botao = pegar("botao-rolar");
  const palco = pegar("dado-palco");
  const resultado = pegar("dado-resultado");
  const status = pegar("dado-status");

  if (botao) botao.disabled = true;
  if (palco) {
    palco.classList.remove("pronto");
    palco.classList.add("girando");
  }
  if (status) status.textContent = "O Meridiano está girando...";

  const valorFinal = numeroJusto(dadoAtual);

  // gira números rápidos antes de parar
  const intervalo = setInterval(function () {
    const visto = numeroJusto(dadoAtual);
    desenharDado(dadoAtual, visto);
    if (resultado) resultado.textContent = visto;
  }, 80);

  setTimeout(function () {
    clearInterval(intervalo);

    desenharDado(dadoAtual, valorFinal);
    if (resultado) resultado.textContent = valorFinal;
    if (status) status.textContent = "O Oráculo respondeu " + valorFinal + " em d" + dadoAtual + ".";

    if (palco) {
      palco.classList.remove("girando");
      palco.classList.add("pronto");
      setTimeout(function () {
        palco.classList.remove("pronto");
      }, 700);
    }

    adicionarHistorico(valorFinal, dadoAtual);

    rolando = false;
    if (botao) botao.disabled = false;
  }, 700);
}

function horaFormatada() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function adicionarHistorico(valor, lados) {
  historico.unshift({ valor: valor, lados: lados, hora: horaFormatada() });

  if (historico.length > MAX_HISTORICO) {
    historico.pop();
  }

  paginaHistorico = 0;
  desenharHistorico();
}

function desenharHistorico() {
  const lista = pegar("historico-lista");
  const contador = pegar("historico-contador");
  const botaoLimpar = pegar("botao-limpar-historico");

  if (!lista) return;

  lista.innerHTML = "";

  const total = historico.length;
  const paginas = Math.max(1, Math.ceil(total / POR_PAGINA));

  if (paginaHistorico > paginas - 1) paginaHistorico = paginas - 1;
  if (paginaHistorico < 0) paginaHistorico = 0;

  if (total === 0) {
    const vazio = document.createElement("li");
    vazio.className = "historico-vazio";
    vazio.textContent = "Nenhuma jogada registrada ainda.";
    lista.appendChild(vazio);

    if (contador) contador.textContent = "Nenhuma jogada registrada.";
    if (botaoLimpar) botaoLimpar.disabled = true;
    desenharPaginacao(paginas);
    return;
  }

  const inicio = paginaHistorico * POR_PAGINA;
  const fim = Math.min(inicio + POR_PAGINA, total);

  historico.slice(inicio, fim).forEach(function (registro) {
    const item = document.createElement("li");
    item.className = "historico-item";

    const valor = document.createElement("span");
    valor.className = "historico-item-valor";
    valor.textContent = registro.valor;

    const tipo = document.createElement("span");
    tipo.className = "historico-item-tipo";
    tipo.textContent = "d" + registro.lados;

    const hora = document.createElement("span");
    hora.className = "historico-item-hora";
    hora.textContent = registro.hora;

    item.appendChild(valor);
    item.appendChild(tipo);
    item.appendChild(hora);

    lista.appendChild(item);
  });

  if (contador) {
    contador.textContent = total === 1
      ? "1 jogada registrada."
      : total + " jogadas registradas.";
  }

  if (botaoLimpar) botaoLimpar.disabled = false;

  desenharPaginacao(paginas);
}

function desenharPaginacao(paginas) {
  const caixa = pegar("historico-paginacao");
  if (!caixa) return;

  const anterior = pegar("pagina-anterior");
  const proxima = pegar("pagina-proxima");
  const rotulo = pegar("pagina-rotulo");

  caixa.hidden = paginas <= 1;

  if (rotulo) rotulo.textContent = "Página " + (paginaHistorico + 1) + " de " + paginas;
  if (anterior) {
    anterior.disabled = paginaHistorico === 0;
    anterior.setAttribute("aria-disabled", paginaHistorico === 0 ? "true" : "false");
  }
  if (proxima) {
    proxima.disabled = paginaHistorico >= paginas - 1;
    proxima.setAttribute("aria-disabled", paginaHistorico >= paginas - 1 ? "true" : "false");
  }
}

function ligarPaginacao() {
  const anterior = pegar("pagina-anterior");
  const proxima = pegar("pagina-proxima");

  if (anterior) {
    anterior.addEventListener("click", function () {
      if (paginaHistorico === 0) return;
      paginaHistorico -= 1;
      desenharHistorico();
    });
  }

  if (proxima) {
    proxima.addEventListener("click", function () {
      const paginas = Math.max(1, Math.ceil(historico.length / POR_PAGINA));
      if (paginaHistorico >= paginas - 1) return;
      paginaHistorico += 1;
      desenharHistorico();
    });
  }
}

// o primeiro clique só pede confirmação
function desfazerConfirmacao() {
  confirmandoLimpeza = false;

  const botao = pegar("botao-limpar-historico");
  if (!botao) return;

  const rotulo = botao.querySelector("span");
  if (rotulo) rotulo.textContent = "Limpar histórico";

  botao.classList.remove("confirmando");

  if (timerLimpeza) {
    clearTimeout(timerLimpeza);
    timerLimpeza = null;
  }
}

function ligarLimpezaHistorico() {
  const botao = pegar("botao-limpar-historico");
  if (!botao) return;

  const rotulo = botao.querySelector("span");
  const status = pegar("dado-status");

  botao.addEventListener("click", function () {
    if (historico.length === 0) return;

    if (!confirmandoLimpeza) {
      confirmandoLimpeza = true;
      botao.classList.add("confirmando");
      if (rotulo) rotulo.textContent = "Confirmar limpeza";

      timerLimpeza = setTimeout(desfazerConfirmacao, 3500);
      return;
    }

    historico.length = 0;
    paginaHistorico = 0;
    desenharHistorico();
    desfazerConfirmacao();

    if (status) status.textContent = "Histórico apagado. O Meridiano começa uma página nova.";
  });
}

/* ---------- início ---------- */

function iniciar() {
  montarSaudacao();
  prepararRevelacao();

  ligarMenu();
  ligarRolagemSuave();
  ligarTema();
  ligarBarraProgresso();
  ligarBotaoTopo();
  ligarFiltros();
  ligarXp();
  ligarAtributos();
  ligarHistoria();
  ligarFormulario();
  ligarLimpezaDeErros();

  construirSeletor();
  escolherDado(6);
  ligarLimpezaHistorico();
  ligarPaginacao();
  if (pegar("botao-rolar")) {
    pegar("botao-rolar").addEventListener("click", rolarDado);
  }
  desenharHistorico();

  // desenha o inventário antes de revelar o resto
  desenharInventario("todos", false);
}

document.addEventListener("DOMContentLoaded", iniciar);
