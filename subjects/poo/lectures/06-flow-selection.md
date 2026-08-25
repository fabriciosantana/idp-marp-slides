---
marp: true
theme: idp
paginate: false
html: true
footer: <span>Programação Orientada a Objetos</span><span>Controle de fluxo - Estruturas de seleção</span><span>2026.2</span><span>Prof. Fabricio Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

# Controle de fluxo <br> estruturas de seleção: `if`, `switch`, `?:`

## Programação Orientada a Objetos

<div class="objectives">

**Objetivos da aula**

- Escolher a estrutura condicional adequada para cada cenário
- Aplicar operadores relacionais e lógicos em decisões
- Construir cadeias `if-else` claras e completas
- Utilizar o operador ternário em expressões condicionais simples: condição `?` verdade `:` falso
- Utilizar as formas clássica e moderna do `switch`: `switch statements` e `switch expressions`

</div>

<div class="contact">
2026.2<br>
Prof. Fabricio Santana<br>
fabricio.santana@idp.edu.br<br>
www.linkedin.com/in/fabriciofsantana/
</div>

---

# Decisões no fluxo de execução

Uma estrutura de seleção escolhe um caminho de execução a partir de uma condição.

```text
               ┌── verdadeira ──> executa uma ação
condição ──────┤
               └── falsa ───────> segue outro caminho
```

- A condição deve produzir um valor `boolean`: `true` ou `false`
- Cada caminho representa um comportamento possível
- Requisitos e casos-limite determinam quais caminhos devem existir

---

# Seleção simples com if

```java
if (saldo >= valorSaque) {
  saldo -= valorSaque;
}
```

- O bloco é executado somente quando a condição é verdadeira
- Se a condição for falsa, a execução continua após o bloco
- As chaves tornam os limites do bloco explícitos

> Em Java, números e referências não são convertidos implicitamente em valores booleanos.

---

# Seleção entre dois caminhos com if-else

```java
if (nota >= 6.0) {
  System.out.println("Aprovado");
} else {
  System.out.println("Reprovado");
}
```

- Apenas um dos blocos será executado
- O `else` trata o complemento lógico da condição
- Não é necessário repetir a condição no segundo caminho

---

<!-- _class: compact -->

# Cadeias if-else

```java
String estacao;

if (mes == 12 || mes == 1 || mes == 2) {
  estacao = "Verão";
} else if (mes >= 3 && mes <= 5) {
  estacao = "Outono";
} else if (mes >= 6 && mes <= 8) {
  estacao = "Inverno";
} else if (mes >= 9 && mes <= 11) {
  estacao = "Primavera";
} else {
  estacao = "Mês inválido";
}
```

- As condições são avaliadas de cima para baixo
- A primeira condição verdadeira encerra a cadeia
- O `else` final trata valores inesperados

---

# Combinação de condições

<table class="small">
<thead><tr><th>Operador</th><th>Significado</th><th>Exemplo</th></tr></thead>
<tbody>
<tr><td><code>&amp;&amp;</code></td><td>E lógico</td><td><code>idade &gt;= 18 &amp;&amp; possuiHabilitacao</code></td></tr>
<tr><td><code>||</code></td><td>OU lógico</td><td><code>dia == 1 || dia == 7</code></td></tr>
<tr><td><code>!</code></td><td>Negação</td><td><code>!arquivoExiste</code></td></tr>
</tbody>
</table>

```java
if (idade >= 18 && possuiHabilitacao) {
  System.out.println("Pode dirigir");
}
```

---

# Avaliação de curto-circuito

`&&` e `||` podem determinar o resultado sem avaliar o segundo operando.

```java
if (divisor != 0 && dividendo / divisor > 2) {
  System.out.println("Resultado maior que 2");
}
```

- Em `a && b`, `b` não é avaliado quando `a` é `false`
- Em `a || b`, `b` não é avaliado quando `a` é `true`
- A ordem pode proteger uma operação que exige uma pré-condição

> Não confunda `&&` e `||` com os operadores `&` e `|`, que sempre avaliam os dois operandos booleanos.

---

# Uso de chaves em blocos condicionais

```java
if (saldo >= saque)
  saldo -= saque;
  System.out.println("Saque realizado"); // sempre executa
```

O recuo visual não altera o significado do programa. Sem chaves, apenas a primeira instrução pertence ao `if`.

```java
if (saldo >= saque) {
  saldo -= saque;
  System.out.println("Saque realizado");
}
```

> Use chaves mesmo em blocos de uma única instrução para reduzir ambiguidades e erros de manutenção.

---

# Operador ternário

```java
int numero = -10;
int absoluto = numero < 0 ? -numero : numero;

System.out.printf(
    "Valor absoluto de %d: %d%n", numero, absoluto
);
```

```text
condição ? valor_quando_true : valor_quando_false
```

- É uma expressão: produz um valor
- É adequado para escolhas curtas e simples
- Evite ternários aninhados ou com efeitos colaterais

---

# switch clássico

```java
switch (opcao) {
  case 1:
    System.out.println("Cadastrar");
    break;
  case 2:
    System.out.println("Consultar");
    break;
  case 0:
    System.out.println("Sair");
    break;
  default:
    System.err.println("Opção inválida");
}
```

- `case` identifica um valor possível
- `break` encerra o `switch`
- `default` trata valores não previstos

---

# Execução em cascata: *fall-through*

No `switch` clássico, a execução continua no próximo `case` quando não encontra um `break`.

```java
switch (dia) {
  case 1:
  case 7:
    System.out.println("Fim de semana");
    break;
  default:
    System.out.println("Dia útil");
}
```

- O agrupamento acima é intencional
- A ausência acidental de `break` é uma fonte comum de erros
- Comente um *fall-through* quando ele for deliberado

---

# switch moderno

```java
switch (opcao) {
  case 1 -> System.out.println("Cadastrar");
  case 2 -> System.out.println("Consultar");
  case 0 -> System.out.println("Sair");
  default -> System.err.println("Opção inválida");
}
```

- A seta `->` elimina o *fall-through*
- Não é necessário usar `break`
- Vários rótulos podem compartilhar a mesma ação

```java
case 1, 7 -> System.out.println("Fim de semana");
```

---

# switch como expressão (_switch expressions_)

```java
String tipoDia = switch (dia) {
  case 1, 7 -> "Fim de semana";
  case 2, 3, 4, 5, 6 -> "Dia útil";
  default -> "Dia inválido";
};
```

- Todos os caminhos devem produzir um valor
- O resultado pode ser atribuído a uma variável
- O ponto e vírgula encerra a expressão completa

```java
int desconto = switch (categoria) {
  case "A" -> 20;
  case "B" -> 10;
  default -> 0;
};
```

---

# Blocos e yield em expressões switch

Um bloco de `switch` usa `yield` para produzir seu resultado.

```java
double valorFinal = switch (categoria) {
  case "A" -> valor * 0.80;
  case "B" -> {
    System.out.println("Desconto promocional");
    yield valor * 0.90;
  }
  default -> valor;
};
```

- Use um bloco quando um caso exigir mais de uma instrução
- `yield` retorna o valor do bloco para a expressão `switch`
- `yield` não encerra o método como `return`

---

# Escolha da estrutura de seleção

<table class="small">
<thead><tr><th>Cenário</th><th>Estrutura sugerida</th></tr></thead>
<tbody>
<tr><td>Executar algo opcionalmente</td><td><code>if</code></td></tr>
<tr><td>Escolher entre dois caminhos</td><td><code>if-else</code></td></tr>
<tr><td>Testar intervalos ou condições diferentes</td><td>Cadeia <code>if-else</code></td></tr>
<tr><td>Comparar uma expressão com valores discretos</td><td><code>switch</code></td></tr>
<tr><td>Produzir um valor a partir de casos discretos</td><td>Expressão <code>switch</code></td></tr>
<tr><td>Produzir um valor a partir de uma condição simples</td><td>Operador ternário</td></tr>
</tbody>
</table>

---

# Testes de estruturas de seleção

Para cada decisão, exercite caminhos diferentes:

- Uma entrada que torne a condição verdadeira
- Uma entrada que torne a condição falsa
- Valores exatamente nos limites
- Valores imediatamente abaixo e acima dos limites
- Valores inválidos tratados pelo `else` ou `default`

```text
idade >= 18  →  testar 17, 18 e 19
mes de 1 a 12  →  testar 0, 1, 12 e 13
```

> Quanto mais decisões independentes, mais caminhos o programa pode apresentar.

---

# Boas práticas

- Escreva condições positivas e legíveis
- Use nomes que expressem intenção em valores e variáveis
- Evite números mágicos; declare constantes quando houver significado de domínio
- Valide a entrada antes de aplicar a regra de negócio
- Prefira `switch` moderno quando o *fall-through* não for necessário
- Evite cadeias e expressões ternárias excessivamente aninhadas
- Documente casos-limite e comportamentos para entradas inválidas

---

# Síntese da aula

- Condições Java sempre produzem `boolean`
- `if`, `if-else` e cadeias representam diferentes quantidades de caminhos
- `&&` e `||` usam avaliação de curto-circuito
- O ternário é adequado para expressões condicionais simples
- O `switch` clássico exige atenção ao _fall-through_
- O `switch` moderno usa `->`, múltiplos rótulos e `yield`
- Casos-limite orientam os testes de decisões

<div class="source">Referências: <a href="https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.9">JLS §14.9 — The if Statement</a>; <a href="https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.11">JLS §14.11 — The switch Statement</a>; <a href="https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.28">JLS §15.28 — Switch Expressions</a>.</div>
