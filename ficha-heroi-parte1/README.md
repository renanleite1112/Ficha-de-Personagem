# Ficha de Herói — Auros Veyr, o Cronista da Última Hora

Ficha de personagem de RPG feita para a disciplina de Desenvolvimento Web, usando só HTML5 e CSS3. Nada de JavaScript — isso fica para a Parte 2 do projeto, que vai adicionar interatividade nessa mesma página.

## O personagem

Auros Veyr é um autômato consciente criado para observar o tempo. Um experimento do seu criador deu errado, destruiu o laboratório e deixou Auros ligado ao Meridiano Zero, um relógio que permite alterar pequenos pedaços da realidade. Hoje ele trabalha como agente do Observatório do Último Sino, investigando anomalias temporais ao lado do Morrow, um corvo mecânico que lembra de coisas que o próprio tempo apagou.

> "O futuro não está escrito. Apenas está atrasado."

## Como abrir

Dois cliques no `index.html` e pronto (tem também o `ABRIR-SITE.bat`). A internet é usada só para as fontes e os ícones via CDN; sem conexão a página abre do mesmo jeito, apenas com fontes padrão.

## Decisões de UI/UX

O edital pedia pesquisa de UI/UX, então antes de escrever o CSS li sobre alguns princípios e tentei aplicar de verdade, em vez de só deixar bonito:

**Hierarquia visual** — o nome do Auros é o maior texto da página, com gradiente dourado, seguido do retrato e dos dados principais. Quem abre o site entende quem é o personagem antes de qualquer outra coisa.

**Contraste** — as combinações de texto e fundo foram testadas no padrão WCAG AA (a maioria passa de 9:1). Cores vivas como dourado, ciano, o roxo das raridades épicas e o vermelho das ameaças ficam só em destaques, nunca em texto longo.

**Consistência** — inventário, ameaças e habilidades seguem o mesmo padrão de card: mesma borda, mesmos cantos decorativos, mesma etiqueta. Depois que você entende um, entende todos.

**Proximidade (Gestalt)** — ícone, nome, valor e barra de cada atributo ficam juntos no mesmo bloco.

**Affordance e feedback** — abas, cards e botões reagem ao hover (mudam o fundo, crescem de leve, ganham sombra) e o foco pelo teclado fica visível em ciano.

**Lei de Fitts** — links e botões têm no mínimo 44px de altura para funcionar bem no celular.

**Fluxo de leitura** — a ordem das seções conta a ficha na sequência natural: quem é → de onde veio → o que faz → o que possui → o que enfrenta → onde encontrá-lo.

## Detalhes técnicos

- Flexbox no menu, CSS Grid no inventário e nas ameaças (1 coluna no celular, 2 no tablet, 3 no desktop)
- Barras de atributo feitas só com div e `width` em porcentagem
- Paleta e espaçamentos centralizados em variáveis no `:root`
- Pseudo-elementos nos cantos dos cards, nos rebites das abas e na numeração das conquistas
- Dossiê expansível com `details`/`summary`, navegação suave nas âncoras e animações sutis nos elementos temporais — tudo sem uma linha de JavaScript
