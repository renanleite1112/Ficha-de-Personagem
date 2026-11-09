# Ficha de Herói — Auros Veyr, o Cronista da Última Hora

Ficha de personagem de RPG feita para a disciplina de Desenvolvimento Web. A Parte 1 entregou a estrutura em HTML5 e o layout responsivo em CSS3. A Parte 2 adiciona o comportamento com JavaScript, no arquivo `script.js`.

## O personagem

Auros Veyr é um autômato consciente criado para observar o tempo. Um experimento do seu criador deu errado, destruiu o laboratório e deixou Auros ligado ao Meridiano Zero, um relógio que permite alterar pequenos pedaços da realidade. Hoje ele trabalha como agente do Observatório do Último Sino, investigando anomalias temporais ao lado do Morrow, um corvo mecânico que lembra de coisas que o próprio tempo apagou.

> "O futuro não está escrito. Apenas está atrasado."

## Como abrir

Dois cliques no `index.html` e pronto (tem também o `ABRIR-SITE.bat`). A internet é usada só para as fontes e os ícones via CDN. Sem conexão a página abre do mesmo jeito, apenas com as fontes padrão e sem os ícones.

## Funcionalidades de JavaScript

**Menu hambúrguer** — em telas pequenas o menu fica recolhido e abre pelo botão. O ícone troca entre as três barras e o X, e o `aria-expanded` acompanha o estado. O menu fecha sozinho quando a pessoa escolhe um link ou quando a janela cresce para o tamanho de desktop.

**Inventário dinâmico** — os seis itens ficam em um array de objetos no `script.js`, cada um com nome, tipo, raridade, categoria, descrição e imagem. Os cards são criados com `createElement` dentro de um `forEach`, então o HTML não tem nenhum card escrito à mão. Os botões de categoria filtram a lista e o contador de itens se atualiza junto. Cada card também tem um botão de favorito.

**Barra de experiência** — o botão "Ganhar XP" soma uma quantidade aleatória entre 15 e 30 pontos e a barra cresce com transição. Ao passar de 100 XP o nível sobe, a mensagem "Nível up!" aparece e o excedente continua contando para o próximo nível. O botão "Reiniciar" devolve tudo ao começo.

**Ver história completa** — um botão na seção Sobre revela três parágrafos a mais da história do Auros. O texto alterna entre "Ver história completa" e "Ver menos" com o operador ternário.

**Formulário da guilda** — o envio é controlado com `preventDefault()`. O script confere se nome, e-mail e mensagem foram preenchidos e valida o formato do e-mail com expressão regular. Cada campo com problema recebe um aviso embaixo e uma borda vermelha, e o aviso some assim que a pessoa começa a corrigir. Nada de `alert()`.

**Saudação pelo horário** — o topo da ficha cumprimenta o visitante conforme a hora do dia, com "Bom dia", "Boa tarde" ou "Boa noite".

**Modo diurno da guilda** — o botão de sol no cabeçalho troca a classe do `<body>` e a página passa do modo noturno para um modo claro. Como a Parte 1 já usava variáveis no `:root`, a troca acontece só redefinindo as cores.

**Extras** — barra fina de progresso de leitura no topo, botão de voltar ao topo que aparece depois de rolar, e rolagem suave entre as seções.

**Pesquisa complementar** — a funcionalidade escolhida fora do conteúdo visto em aula foi o `IntersectionObserver`, usado para revelar os blocos conforme a rolagem. Ele avisa quando um elemento entra na tela sem precisar escutar o evento de scroll a cada quadro, o que deixa a página mais leve. Também entraram o evento `animationend` para limpar o número flutuante do XP, o `dataset` para ler a categoria de cada botão de filtro e o `scrollIntoView` com rolagem suave.

## Decisões de UI/UX

### Parte 1 — hierarquia, contraste e consistência

**Hierarquia visual** — o nome do Auros é o maior texto da página, com gradiente dourado, seguido do retrato e dos dados principais. Quem abre o site entende quem é o personagem antes de qualquer outra coisa.

**Contraste** — as combinações de texto e fundo foram testadas no padrão WCAG AA (a maioria passa de 9:1). Cores vivas como dourado, ciano, o roxo das raridades épicas e o vermelho das ameaças ficam só em destaques, nunca em texto longo.

**Consistência** — inventário, ameaças e habilidades seguem o mesmo padrão de card: mesma borda, mesmos cantos decorativos, mesma etiqueta. Depois que você entende um, entende todos.

**Proximidade (Gestalt)** — ícone, nome, valor e barra de cada atributo ficam juntos no mesmo bloco.

**Affordance e feedback** — abas, cards e botões reagem ao hover (mudam o fundo, crescem de leve, ganham sombra) e o foco pelo teclado fica visível em ciano.

**Lei de Fitts** — links e botões têm no mínimo 44px de altura para funcionar bem no celular.

**Fluxo de leitura** — a ordem das seções conta a ficha na sequência natural: quem é → de onde veio → o que faz → o que possui → o que enfrenta → onde encontrá-lo.

### Parte 2 — interação

**Visibilidade do estado do sistema** — o botão do menu muda de ícone e de rótulo conforme abre e fecha, e o `aria-expanded` avisa os leitores de tela. A categoria ativa do inventário fica destacada em dourado e as outras ficam neutras. A barra de XP mostra o valor em número além da largura, e o nível aparece escrito ao lado.

**Feedback imediato** — ganhar XP solta um "+25 XP" que sobe e desaparece, a barra cresce na hora e a mensagem embaixo diz quantos pontos faltam para o próximo nível. Ao subir de nível o painel inteiro responde: o número do nível dá um pulo, a barra solta um brilho que a atravessa e a mensagem entra destacada. Favoritar um item faz a estrela pular e o contador somar, e trocar de categoria dá um pulo no botão escolhido. Enviar o formulário mostra uma resposta na tela em vez de recarregar a página.

**Prevenção de erros** — o formulário avisa campo por campo o que está faltando, com o texto embaixo do campo e a borda em vermelho, antes de qualquer envio. O aviso desaparece assim que a pessoa começa a digitar de novo, para não ficar acusando um campo que já foi corrigido.

**Controle e liberdade do usuário** — o menu, a história expandida e os filtros podem ser abertos e fechados quantas vezes quiser, sem recarregar nada. O XP tem um botão de reiniciar. O botão de voltar ao topo aparece só quando faz sentido.

**Consistência com a Parte 1** — os estados novos reaproveitam as cores, as bordas e as transições que já existiam. O botão de filtro ativo usa o mesmo dourado dos títulos, o campo com erro usa o mesmo vermelho das ameaças e o foco continua em ciano.

**Movimento com propósito** — as seções aparecem conforme a rolagem, os cards do inventário entram um depois do outro quando o filtro muda e o item de destaque tem um brilho lento. Quem prefere menos movimento é respeitado pelo `prefers-reduced-motion`, que já existia na Parte 1.

## Detalhes técnicos

- Flexbox no menu, CSS Grid no inventário e nas ameaças (1 coluna no celular, 2 no tablet, 3 no desktop)
- Barras de atributo e de XP feitas só com div e `width` em porcentagem
- Paleta e espaçamentos centralizados em variáveis no `:root`, o que permitiu o modo diurno trocar tudo de uma vez
- Pseudo-elementos nos cantos dos cards, nos rebites das abas e na numeração das conquistas
- Dossiê expansível com `details`/`summary` e navegação suave nas âncoras
- `IntersectionObserver` para revelar os blocos na rolagem, com a classe `vai-revelar` entrando pelo script para a página continuar visível se o JavaScript não carregar
- Os `console.log()` usados durante o desenvolvimento foram removidos antes da entrega

## Estrutura de arquivos

```
ficha-heroi-parte2/
  index.html
  style.css
  script.js
  imagens/
  ABRIR-SITE.bat
  README.md
```
