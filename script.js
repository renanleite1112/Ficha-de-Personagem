/* =========================================================
   Ficha de Heroi - Auros Veyr
   Parte 2 do projeto. Toda a interatividade da pagina fica aqui.
   ========================================================= */


/* ---------- atalhos ---------- */

// pega um elemento pelo id
function pegar(id) {
  return document.getElementById(id);
}

// pega todos os elementos que combinam com o seletor
function pegarTodos(seletor) {
  return document.querySelectorAll(seletor);
}


/* ---------- saudacao pelo horario ---------- */

// mostra um cumprimento diferente conforme a hora do visitante
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

  campo.textContent = periodo + ", cronista. O Meridiano Zero registrou sua chegada.";
}


/* ---------- menu hamburguer ---------- */

function ligarMenu() {
  const botao = pegar("botao-menu");
  const menu = pegar("menu-principal");
  if (!botao || !menu) return;

  const icone = botao.querySelector("i");

  // abre e fecha o menu trocando a classe e o icone
  function alternarMenu() {
    const aberto = menu.classList.toggle("aberto");

    botao.setAttribute("aria-expanded", aberto);
    botao.title = aberto ? "Fechar menu" : "Abrir menu";

    if (icone) {
      icone.className = aberto ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
  }

  botao.addEventListener("click", alternarMenu);

  // fecha o menu quando a pessoa escolhe um link
  pegarTodos(".link-navegacao").forEach(function (link) {
    link.addEventListener("click", function () {
      if (menu.classList.contains("aberto")) {
        alternarMenu();
      }
    });
  });

  // se a tela virar desktop com o menu aberto, fecha pra nao sobrar estado estranho
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && menu.classList.contains("aberto")) {
      alternarMenu();
    }
  });
}


/* ---------- rolagem suave entre as secoes ---------- */

function ligarRolagemSuave() {
  pegarTodos('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (evento) {
      const alvo = document.querySelector(link.getAttribute("href"));
      if (!alvo) return;

      evento.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth", block: "start" });

      // devolve o foco pro bloco de destino, ajuda quem navega pelo teclado
      alvo.setAttribute("tabindex", "-1");
      alvo.focus({ preventScroll: true });
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

    botao.setAttribute("aria-pressed", diurno);
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

  window.addEventListener("scroll", atualizar);
  window.addEventListener("resize", atualizar);
  atualizar();
}


/* ---------- botao de voltar ao topo ---------- */

function ligarBotaoTopo() {
  const botao = pegar("botao-topo");
  if (!botao) return;

  function atualizar() {
    botao.classList.toggle("visivel", window.scrollY > 600);
  }

  botao.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", atualizar);
  atualizar();
}


/* ---------- revelar blocos conforme a rolagem ---------- */

// guarda o observador pra reaproveitar nos cards do inventario
let observadorRevelacao = null;

function prepararRevelacao() {
  // a classe entra so pelo script, se o js nao rodar a pagina fica visivel
  document.body.classList.add("vai-revelar");

  if (!("IntersectionObserver" in window)) return;

  observadorRevelacao = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("revelado");
        observadorRevelacao.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
}

// coloca os elementos na fila de revelacao
function revelarAlvos(alvos) {
  alvos.forEach(function (alvo) {
    if (observadorRevelacao) {
      observadorRevelacao.observe(alvo);
    } else {
      alvo.classList.add("revelado");
    }
  });
}


/* ---------- inventario ---------- */

// todo o acervo do Auros fica nesse array
// cada item guarda nome, tipo, raridade, categoria, descricao e imagem
const itens = [
  {
    nome: "Meridiano Zero",
    tipo: "Artefato temporal",
    raridade: "Lendário",
    categoria: "Artefato",
    descricao: "Relógio de bolso com três mecanismos concêntricos que desafiam a relojoaria convencional. Ancora Auros em um ponto do tempo e permite pequenas alterações na realidade.",
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
    descricao: "Corvo mecânico que preserva memórias de linhas temporais descartadas, e bica o relógio do mestre quando ele está prestes a errar.",
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

// guarda o nome dos itens que a pessoa marcou como favoritos
const favoritos = [];

// guarda a categoria que esta sendo mostrada agora
let filtroAtual = "todos";

// transforma o nome da raridade na classe que o CSS ja usa
function classeRaridade(raridade) {
  const mapa = {
    "Incomum": "incomum",
    "Raro": "raro",
    "Épico": "epico",
    "Lendário": "lendario"
  };
  return mapa[raridade] || "incomum";
}

// monta o card de um item usando createElement
function criarCard(item) {
  const card = document.createElement("article");
  card.className = "card-item";

  if (item.destaque) {
    card.classList.add("card-item--destaque");
  }

  // o selo de engrenagem so aparece no item de destaque
  if (item.destaque) {
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
    const selo = document.createElement("p");
    selo.className = "card-selo";
    selo.textContent = item.selo;
    conteudo.appendChild(selo);
  }

  const titulo = document.createElement("h3");
  titulo.className = "card-titulo";
  titulo.textContent = item.nome;
  conteudo.appendChild(titulo);

  const raridade = document.createElement("p");
  raridade.className = "card-raridade card-raridade--" + classeRaridade(item.raridade);
  raridade.textContent = item.raridade + " · " + item.tipo;
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

  // botao de favoritar, fica no canto do card
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

  return card;
}

// deixa o botao de favorito com a aparencia certa quando o card e redesenhado
function aplicarEstadoFavorito(card, nome) {
  const botao = card.querySelector(".botao-favorito");
  if (!botao) return;

  const marcado = favoritos.indexOf(nome) !== -1;

  botao.classList.toggle("ativo", marcado);
  botao.setAttribute("aria-pressed", marcado);
  botao.title = marcado ? "Remover dos favoritos" : "Marcar como favorito";
}

// devolve os itens que combinam com o filtro que esta ativo
function itensFiltrados() {
  return itens.filter(function (item) {
    if (filtroAtual === "todos") return true;
    if (filtroAtual === "favoritos") return favoritos.indexOf(item.nome) !== -1;
    return item.categoria === filtroAtual;
  });
}

// desenha os itens na tela conforme o filtro escolhido
// o animar so liga quando a lista muda, na primeira carga quem aparece e a secao
function desenharInventario(filtro, animar) {
  const grade = pegar("inventario-grid");
  if (!grade) return;

  filtroAtual = filtro || "todos";

  // limpa o que ja estava na tela antes de desenhar de novo
  grade.innerHTML = "";

  const lista = itensFiltrados();

  // quando o filtro nao acha nada, entra um aviso no lugar dos cards
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

  // cria um card pra cada item da lista
  lista.forEach(function (item, indice) {
    const card = criarCard(item);
    aplicarEstadoFavorito(card, item.nome);

    if (animar) {
      // atraso pequeno pra um card entrar depois do outro
      card.classList.add("card-entrando");
      card.style.animationDelay = (indice * 0.06) + "s";
    }

    grade.appendChild(card);
  });

  atualizarContador();
}

// atualiza o texto que conta quantos itens estao aparecendo
function atualizarContador() {
  const contador = pegar("contador-itens");
  if (!contador) return;

  const mostrados = itensFiltrados().length;

  let texto = mostrados === itens.length
    ? itens.length + " itens no acervo"
    : mostrados + " de " + itens.length + " itens no acervo";

  if (favoritos.length > 0) {
    texto += " · " + favoritos.length + (favoritos.length > 1 ? " favoritos" : " favorito");
  }

  contador.textContent = texto;
}

// liga os botoes de categoria do inventario
function ligarFiltros() {
  const botoes = pegarTodos(".botao-filtro");

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      // marca so o botao clicado e apaga o destaque dos outros
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

// marca ou desmarca um item como favorito
function alternarFavorito(nome, botao) {
  const posicao = favoritos.indexOf(nome);

  if (posicao === -1) {
    favoritos.push(nome);
  } else {
    favoritos.splice(posicao, 1);
  }

  const marcado = posicao === -1;

  botao.classList.toggle("ativo", marcado);
  botao.setAttribute("aria-pressed", marcado);
  botao.title = marcado ? "Remover dos favoritos" : "Marcar como favorito";

  // com o filtro de favoritos aberto o card precisa sair da lista na hora
  if (filtroAtual === "favoritos") {
    desenharInventario("favoritos", true);
    return;
  }

  atualizarContador();
}


/* ---------- barra de experiencia ---------- */

const XP_META = 100;

let xpAtual = 0;
let nivel = 1;

function ligarXp() {
  const botao = pegar("botao-xp");
  const botaoReset = pegar("botao-xp-reset");
  if (!botao) return;

  botao.addEventListener("click", ganharXp);

  if (botaoReset) {
    botaoReset.addEventListener("click", reiniciarXp);
  }

  atualizarXp();
}

// soma uma quantidade aleatoria de xp e confere se subiu de nivel
function ganharXp() {
  const ganho = Math.floor(Math.random() * 16) + 15;
  xpAtual += ganho;

  mostrarGanho(ganho);

  const mensagem = pegar("xp-mensagem");

  if (xpAtual >= XP_META) {
    xpAtual -= XP_META;
    nivel += 1;

    if (mensagem) {
      mensagem.textContent = "Nível up! Auros chegou ao nível " + nivel + ".";
      mensagem.classList.add("destaque");
    }

    // toca a animacao de subida de nivel no painel inteiro
    tocarSubidaDeNivel();

    // tira o destaque depois de um tempo
    setTimeout(function () {
      if (mensagem) mensagem.classList.remove("destaque");
    }, 2600);
  } else if (mensagem) {
    mensagem.textContent = "Registro atualizado. Faltam " + (XP_META - xpAtual) + " XP para o próximo nível.";
    mensagem.classList.remove("destaque");
  }

  atualizarXp();
}

// liga a animacao de subida de nivel e desliga quando ela termina
function tocarSubidaDeNivel() {
  const painel = document.querySelector(".painel-xp");
  if (!painel) return;

  painel.classList.remove("subiu");

  // forca o navegador a recalcular antes de ligar a classe de novo
  // sem isso a animacao nao reinicia quando sobe dois niveis seguidos
  void painel.offsetWidth;

  painel.classList.add("subiu");

  setTimeout(function () {
    painel.classList.remove("subiu");
  }, 1400);
}

// solta um numero flutuante em cima do painel
function mostrarGanho(ganho) {
  const painel = document.querySelector(".painel-xp");
  if (!painel) return;

  const aviso = document.createElement("span");
  aviso.className = "xp-ganho";
  aviso.textContent = "+" + ganho + " XP";
  painel.appendChild(aviso);

  // tira o elemento da tela quando a animacao acaba
  aviso.addEventListener("animationend", function () {
    aviso.remove();
  });
}

// pinta a barra e os numeros na tela
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

// volta tudo pro comeco
function reiniciarXp() {
  xpAtual = 0;
  nivel = 1;

  const mensagem = pegar("xp-mensagem");
  if (mensagem) {
    mensagem.textContent = "Registro reiniciado.";
    mensagem.classList.remove("destaque");
  }

  atualizarXp();
}


/* ---------- ver mais na historia ---------- */

function ligarHistoria() {
  const botao = pegar("botao-historia");
  const bloco = pegar("historia-completa");
  const texto = pegar("texto-historia");
  if (!botao || !bloco) return;

  const icone = botao.querySelector("i");

  botao.addEventListener("click", function () {
    const aberto = bloco.classList.toggle("revelado");

    // troca o texto e o icone conforme o estado
    if (texto) {
      texto.textContent = aberto ? "Ver menos" : "Ver história completa";
    }

    if (icone) {
      icone.className = aberto ? "fa-solid fa-book" : "fa-solid fa-book-open";
    }

    botao.setAttribute("aria-expanded", aberto);
  });
}


/* ---------- formulario da guilda ---------- */

// confere se o email tem um formato aceitavel
function emailValido(email) {
  const modelo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return modelo.test(email);
}

// escreve a mensagem de erro embaixo do campo
function mostrarErro(campo, texto) {
  const aviso = pegar("erro-" + campo);
  const entrada = pegar("campo-" + campo);

  if (aviso) aviso.textContent = texto;

  if (entrada) {
    entrada.classList.add("campo-invalido");
    entrada.setAttribute("aria-invalid", "true");
  }
}

// limpa o erro de um campo
function limparErro(campo) {
  const aviso = pegar("erro-" + campo);
  const entrada = pegar("campo-" + campo);

  if (aviso) aviso.textContent = "";

  if (entrada) {
    entrada.classList.remove("campo-invalido");
    entrada.removeAttribute("aria-invalid");
  }
}

// aviso de que deu tudo certo
function avisarSucesso(nome) {
  const status = pegar("formulario-status");
  if (!status) return;

  status.textContent = "Mensagem enviada, " + nome + ". A guilda responde no próximo ciclo.";
  status.className = "formulario-status sucesso";
}

// aviso de que faltou alguma coisa
function avisarFalha() {
  const status = pegar("formulario-status");
  if (!status) return;

  status.textContent = "Faltou preencher algum campo. Confira os avisos acima.";
  status.className = "formulario-status falha";
}

function ligarFormulario() {
  const formulario = pegar("formulario-guilda");
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    // segura o envio pra validar antes
    evento.preventDefault();

    const nome = pegar("campo-nome");
    const email = pegar("campo-email");
    const mensagem = pegar("campo-mensagem");

    let tudoCerto = true;

    // limpa os erros da tentativa anterior
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

// apaga o aviso assim que a pessoa comeca a corrigir o campo
function ligarLimpezaDeErros() {
  ["nome", "email", "mensagem"].forEach(function (campo) {
    const entrada = pegar("campo-" + campo);
    if (!entrada) return;

    entrada.addEventListener("input", function () {
      limparErro(campo);
    });
  });
}


/* ---------- inicio ---------- */

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
  ligarHistoria();
  ligarFormulario();
  ligarLimpezaDeErros();

  // desenha o inventario e depois revela o resto da pagina
  desenharInventario("todos", false);
  revelarAlvos(pegarTodos(".secao, .conquista-item, .habilidade-item"));
}

// espera o HTML carregar antes de mexer em qualquer coisa
document.addEventListener("DOMContentLoaded", iniciar);
