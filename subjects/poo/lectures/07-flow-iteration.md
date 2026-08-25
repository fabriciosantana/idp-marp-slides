---
marp: true
theme: idp
paginate: false
html: true
footer: <span>Programação Orientada a Objetos</span><span>Estruturas de repetição</span><span>2026.2</span><span>Prof. Fabricio Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

# Controle de fluxo <br> Estruturas de repetição e comandos de salto

## Programação Orientada a Objetos

<div class="objectives">

**Objetivos da aula**

- Controlar repetições com `for`, `while` e `do-while`
- Escolher entre contadores, condições e sentinelas
- Reconhecer condições de término e invariantes de laço
- Empregar `break`, `continue` e `return` conscientemente

</div>

<div class="contact">
2026.2<br>
Prof. Fabricio Santana<br>
fabricio.santana@idp.edu.br<br>
www.linkedin.com/in/fabriciofsantana/
</div>

---

# Repetição no fluxo de execução

Uma estrutura de repetição executa um bloco enquanto uma condição permitir.

```text
inicializar → testar condição → executar bloco → atualizar
                   ↑                              │
                   └──────────────────────────────┘
```

Todo laço precisa responder:

- Qual é o estado inicial?
- Qual condição mantém a repetição?
- O que muda a cada iteração?
- Por que a execução terminará?

---

# Escolha da estrutura de repetição

<table class="small">
<thead><tr><th>Estrutura</th><th>Use quando...</th></tr></thead>
<tbody>
<tr><td><code>for</code></td><td>Inicialização, condição e atualização formam um contador claro</td></tr>
<tr><td><code>while</code></td><td>A quantidade de repetições depende de uma condição externa</td></tr>
<tr><td><code>do-while</code></td><td>O bloco precisa executar ao menos uma vez</td></tr>
</tbody>
</table>

- `for` e `while` são laços de pré-teste
- `do-while` é um laço de pós-teste
- As três estruturas podem expressar as mesmas repetições, mas não com a mesma clareza

---

# Laço while

```java
int contador = 1;

while (contador <= 5) {
  System.out.println(contador);
  contador++;
}
```

1. Inicializa o estado antes do laço
2. Testa a condição antes de cada iteração
3. Executa o bloco quando a condição é verdadeira
4. Atualiza o estado para se aproximar do término

> Se a condição começar falsa, o bloco não será executado.

---

<!-- _class: compact -->

# Laço controlado por sentinela

Uma sentinela é um valor especial que indica o fim dos dados.

```java
int total = 0;
int quantidade = 0;

System.out.print("Nota (-1 encerra): ");
int nota = input.nextInt();

while (nota != -1) {
  total += nota;
  quantidade++;

  System.out.print("Nota (-1 encerra): ");
  nota = input.nextInt();
}

if (quantidade > 0) {
  double media = (double) total / quantidade;
  System.out.printf("Média: %.2f%n", media);
}
```

---

# Contadores e sentinelas

<div class="columns">
<div class="callout">

**Contador**

- Quantidade conhecida
- Estado numérico previsível
- Exemplo: ler exatamente 10 notas

</div>
<div class="callout">

**Sentinela**

- Quantidade desconhecida
- Um valor especial encerra
- Exemplo: ler notas até receber `-1`

</div>
</div>

> A sentinela não faz parte dos dados processados e não deve ser acumulada ou contada.

---

# Laço do-while

```java
int opcao;

do {
  System.out.println("1 - Continuar");
  System.out.println("0 - Sair");
  opcao = input.nextInt();
} while (opcao != 0);
```

- O corpo executa antes do teste
- É adequado para menus e validações que precisam ocorrer ao menos uma vez
- O ponto e vírgula após `while (condicao);` é obrigatório

> Confirme se a primeira execução realmente deve ocorrer sem testar a condição.

---

# Estrutura do laço for

```java
for (inicializacao; condicao; atualizacao) {
  // instruções repetidas
}
```

```java
for (int numero = 1; numero <= 5; numero++) {
  System.out.println(numero);
}
```

- A inicialização executa uma vez
- A condição é testada antes de cada iteração
- A atualização executa após cada iteração
- A variável declarada no cabeçalho pertence ao escopo do laço

---

# Acumulação com for

```java
int total = 0;

for (int numero = 2; numero <= 20; numero += 2) {
  total += numero;
}

System.out.printf("Soma dos pares: %d%n", total);
```

- O contador gera `2, 4, 6, ..., 20`
- `numero <= 20` define o limite inclusivo
- `numero += 2` aproxima o contador do término
- Ao fim de cada iteração, `total` contém a soma dos pares já visitados

---

# Invariantes de laço

Um invariante é uma propriedade verdadeira antes e depois de cada iteração.

```java
int soma = 0;

for (int i = 1; i <= limite; i++) {
  soma += i;
}
```

Neste exemplo:

> Antes de processar `i`, `soma` contém a soma dos números de `1` até `i - 1`.

O invariante ajuda a explicar por que o algoritmo produz o resultado correto.

---

# Laços aninhados

```java
for (int linha = 1; linha <= 3; linha++) {
  for (int coluna = 1; coluna <= 4; coluna++) {
    System.out.print("* ");
  }
  System.out.println();
}
```

```console
* * * *
* * * *
* * * *
```

- Para cada iteração externa, o laço interno executa por completo
- O exemplo executa o corpo interno `3 × 4 = 12` vezes
- Laços aninhados podem aumentar rapidamente o custo do algoritmo

---

# Erros de limite

Compare as condições:

```java
for (int i = 0; i < 5; i++)  // 0, 1, 2, 3, 4
for (int i = 0; i <= 5; i++) // 0, 1, 2, 3, 4, 5
```

Erros comuns:

- Usar `<` quando o limite deveria ser inclusivo
- Usar `<=` quando existem exatamente `n` posições de `0` a `n - 1`
- Começar em `1` quando os índices começam em `0`
- Atualizar o contador na direção contrária ao término

> Teste a primeira iteração, a última e o caso de zero iterações.

---

# Laços infinitos

```java
int contador = 1;

while (contador <= 5) {
  System.out.println(contador);
  // contador não é atualizado
}
```

Um laço pode não terminar quando:

- O estado usado pela condição não muda
- A atualização afasta o estado da condição de término
- A condição é sempre verdadeira
- Uma entrada externa esperada nunca chega

Use `while (true)` somente quando existir uma saída explícita e fácil de identificar.

---

# Comando break

`break` encerra imediatamente o laço mais interno.

```java
int encontrado = -1;

for (int i = 0; i < 100; i++) {
  if (i * i == 49) {
    encontrado = i;
    break;
  }
}
```

- É útil quando continuar não pode alterar o resultado
- Em laços aninhados, afeta apenas o laço que o contém
- Muitas saídas diferentes podem dificultar a leitura

---

# Comando continue

`continue` interrompe a iteração atual e inicia a próxima.

```java
for (int numero = 1; numero <= 10; numero++) {
  if (numero % 2 != 0) {
    continue;
  }

  System.out.println(numero); // somente pares
}
```

- No `for`, segue para a atualização e depois para a condição
- No `while` e no `do-while`, segue para o teste da condição
- Atualizações esquecidas antes de `continue` podem causar laços infinitos

---

# Comando return dentro de um laço

`return` encerra todo o método, não apenas o laço.

```java
static boolean contemZero(int[] numeros) {
  for (int numero : numeros) {
    if (numero == 0) {
      return true;
    }
  }

  return false;
}
```

- É adequado quando o resultado já foi determinado
- Pode evitar variáveis de controle e níveis extras de aninhamento
- Diferencie claramente `return`, `break` e `continue`

---

# Validação repetida de entrada

```java
int idade;

while (true) {
  System.out.print("Idade: ");

  if (input.hasNextInt()) {
    idade = input.nextInt();
    if (idade >= 0) {
      break;
    }
  } else {
    input.next(); // descarta o token inválido
  }

  System.err.println("Informe um inteiro não negativo.");
}
```

> A repetição transforma uma validação em um diálogo: ler, verificar, explicar e tentar novamente.

---

# Testes de estruturas de repetição

Considere pelo menos:

- Zero iterações, quando permitido
- Exatamente uma iteração
- Várias iterações
- O primeiro e o último valor do intervalo
- A sentinela como primeira entrada
- Entrada inválida seguida de entrada válida
- Condições que poderiam produzir um laço infinito

```text
intervalo de 1 a 5 → testar limites 1 e 5
sentinela -1       → testar -1 como primeira entrada
```

---

# Boas práticas

- Escolha a estrutura que melhor comunica a condição de término
- Mantenha inicialização, condição e atualização fáceis de localizar
- Use nomes descritivos para contadores e acumuladores
- Evite modificar o contador em vários pontos do corpo
- Prefira condições simples e blocos curtos
- Use `break`, `continue` e `return` quando tornarem o fluxo mais claro
- Teste limites, sentinelas e entradas inválidas

---

# Síntese da aula

- `for` é natural para contadores e intervalos
- `while` expressa repetições controladas por uma condição
- `do-while` garante ao menos uma execução
- Contadores e sentinelas representam formas diferentes de término
- Invariantes ajudam a compreender a correção do algoritmo
- Limites incorretos causam uma iteração a mais ou a menos
- `break`, `continue` e `return` alteram o fluxo em níveis diferentes
- Todo laço deve apresentar um caminho claro para terminar

<div class="source">Referências: <a href="https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.12">JLS §14.12 — The while Statement</a>; <a href="https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.13">JLS §14.13 — The do Statement</a>; <a href="https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.14">JLS §14.14 — The for Statement</a>.</div>
