---
marp: true
theme: idp
paginate: false
html: true
footer: <span>Programação Orientada a Objetos</span><span>Entrada e saída de dados</span><span>2026.2</span><span>Prof. Fabricio Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

# Entrada e saída de dados em Java

## Programação Orientada a Objetos

<div class="objectives">

**Objetivos da aula**

- Compreender os fluxos de entrada e saída de uma aplicação console
- Conhecer os principais mecanismos de entrada e saída em Java
- Ler, converter, validar e formatar dados
- Escolher o mecanismo adequado para cada situação

</div>

<div class="contact">
2026.2<br>
Prof. Fabricio Santana<br>
fabricio.santana@idp.edu.br<br>
www.linkedin.com/in/fabriciofsantana/
</div>

---

# Um programa conversa com o ambiente

<div class="columns" style="align-items: center;">

<div>

**Entrada**

Dados chegam ao programa por teclado, arquivo, rede, argumentos ou outro sistema.

</div>

<div>

**Processamento**

O programa interpreta, valida e transforma os dados recebidos.

</div>

</div>

<div>

**Saída**

Resultados e diagnósticos seguem para o terminal, arquivo, rede ou outro sistema.

</div>

---

<!-- _class: compact -->

# Entrada e saída em aplicações console

<div class="columns">
<div>

**Entrada de dados**

- [`java.util.Scanner`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html): leitura simples e conversão de tipos
- [`java.io.BufferedReader`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedReader.html): leitura eficiente de texto
- [`java.io.Console`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Console.html): interação com um terminal
- [`System.in`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/System.html#in): fluxo padrão de bytes

</div><div>

**Saída de dados**

- [`System.out`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/System.html#out): saída padrão
- [`System.err`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/System.html#err): saída de erros e diagnósticos
- `System.out.print`, `System.out.println` e `System.out.printf`: formas de imprimir

</div></div>

<div class="source">Fonte: <a href="https://docs.oracle.com/en/java/javase/21/docs/api/">Java SE 21 &amp; JDK 21 API Specification</a></div>

---

# Fluxos (_stream_) padrão

<table class="small">
<thead><tr><th>Fluxo</th><th>Tipo</th><th>Uso habitual</th></tr></thead>
<tbody>
<tr><td><code>System.in</code></td><td><code>InputStream</code></td><td>Entrada padrão, normalmente o teclado</td></tr>
<tr><td><code>System.out</code></td><td><code>PrintStream</code></td><td>Resultados normais da aplicação</td></tr>
<tr><td><code>System.err</code></td><td><code>PrintStream</code></td><td>Erros e mensagens de diagnóstico</td></tr>
</tbody>
</table>

> São fluxos independentes e podem ser redirecionados pelo sistema operacional.

```console
$ java Programa < entrada.txt > saida.txt 2> erros.txt
```

---

# Como imprimir dados?

```java
String nome = "Ana";
int pontos = 95;

System.out.print("Olá, ");       // não quebra a linha
System.out.println(nome);        // quebra a linha
System.out.printf("Pontos: %d%n", pontos);
System.err.println("Exemplo de diagnóstico");
```

- `println` acrescenta o separador de linha da plataforma
- Em `printf`, prefira `%n` a `\n` para uma quebra de linha portável
- Use `System.err` para erros; isso permite separar resultados e diagnósticos

---

<!-- _class: compact -->

# Como formatar a saída com printf?

<div class="columns small">
<div>

| Formato | Valor |
|---|---|
| `%s` | texto |
| `%d` | inteiro decimal |
| `%f` | ponto flutuante |
| `%b` | booleano |
| `%c` | caractere |
| `%n` | nova linha |

</div><div>

```java
String item = "Café";
int quantidade = 2;
double preco = 8.5;

System.out.printf(
    "%-12s %3d %8.2f%n",
    item, quantidade, preco
);
```

```console
Café           2     8,50
```

</div></div>

<div class="source">Fonte: <a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Formatter.html">Formatter — Java SE 21</a></div>

---

# Por que o Locale importa?

O locale influencia a leitura e a impressão de números, datas e moedas.

```java
import java.util.Locale;

double valor = 1234.5;

System.out.printf(Locale.of("pt", "BR"), "%.2f%n", valor);
// 1234,50

System.out.printf(Locale.US, "%.2f%n", valor);
// 1234.50
```

> Defina o locale explicitamente quando o formato fizer parte do protocolo, do teste ou da especificação do programa.

---

<!-- _class: compact -->

# Como ler dados com Scanner?

```java
import java.util.Scanner;

Scanner input = new Scanner(System.in);

System.out.print("Idade: ");
int idade = input.nextInt();

System.out.print("Altura: ");
double altura = input.nextDouble();

System.out.printf("Idade: %d; altura: %.2f%n", idade, altura);
```

- `new Scanner(System.in)` associa o scanner à entrada padrão
- Métodos `nextInt`, `nextDouble` e similares leem e convertem o próximo *token*
- O delimitador padrão é espaço em branco

<div class="source">Fonte: <a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html">Scanner — Java SE 21</a></div>

---

<!-- _class: compact -->

# Principais métodos da classe Scanner?

<table class="small">
<thead><tr><th>Método</th><th>Resultado</th></tr></thead>
<tbody>
<tr><td><code>next()</code></td><td>Próximo token como <code>String</code></td></tr>
<tr><td><code>nextLine()</code></td><td>Restante da linha como <code>String</code></td></tr>
<tr><td><code>nextInt()</code></td><td>Próximo token convertido para <code>int</code></td></tr>
<tr><td><code>nextDouble()</code></td><td>Próximo token convertido para <code>double</code></td></tr>
<tr><td><code>nextBoolean()</code></td><td>Próximo token convertido para <code>boolean</code></td></tr>
<tr><td><code>hasNextInt()</code></td><td>Informa se o próximo token representa um <code>int</code></td></tr>
<tr><td><code>hasNextLine()</code></td><td>Informa se existe outra linha</td></tr>
</tbody>
</table>

<div class="source">Fonte: <a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html">Scanner — Java SE 21</a></div>

---

# Qual é a armadilha de nextLine()?

```java
System.out.print("Idade: ");
int idade = input.nextInt();
input.nextLine(); // consome a quebra de linha pendente

System.out.print("Nome completo: ");
String nome = input.nextLine();
```

- `nextInt()` consome o número, mas deixa o delimitador no fluxo
- O `nextLine()` seguinte pode encontrar imediatamente o fim da linha
- Uma alternativa simples é ler todas as entradas com `nextLine()` e converter

```java
int idade = Integer.parseInt(input.nextLine());
```

---

<!-- _class: compact -->

# Como validar uma entrada com Scanner?

```java
int idade;

while (true) {
  System.out.print("Idade: ");

  if (input.hasNextInt()) {
    idade = input.nextInt();
    break;
  }

  System.err.println("Digite um número inteiro.");
  input.next(); // descarta o token inválido
}
```

> Nunca presuma que a entrada do usuário é válida. Detecte o erro, explique o formato esperado e permita uma nova tentativa quando apropriado.

---

<!-- _class: compact -->

# Quando fechar o Scanner?

Objetos que controlam recursos devem ser fechados quando não forem mais necessários.

**try-with-reources**

```java
try (Scanner input = new Scanner(arquivo)) {
  while (input.hasNextLine()) {
    System.out.println(input.nextLine());
  }
} // fechamento automático
```

Entretanto, há um cuidado com a entrada padrão:

- `input.close()` também fecha o `System.in` subjacente
- Depois disso, outras partes do programa não poderão ler da entrada padrão
- Em uma aplicação console pequena, crie um único leitor e gerencie seu ciclo de vida no ponto de entrada
- Não feche um leitor de `System.in` dentro de um método que não é responsável pelo fluxo

---

# Como usar BufferedReader?

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

BufferedReader reader = new BufferedReader(
    new InputStreamReader(System.in, StandardCharsets.UTF_8)
);

System.out.print("Nome: ");
String nome = reader.readLine();
```

- `System.in` fornece bytes
- `InputStreamReader` decodifica bytes em caracteres
- `BufferedReader` armazena caracteres e oferece `readLine()`
- As operações podem lançar `IOException`

---

# Como converter texto lido pelo BufferedReader?

`readLine()` retorna uma `String`; a conversão é explícita.

```java
System.out.print("Idade: ");
String linha = reader.readLine();

try {
  int idade = Integer.parseInt(linha.trim());
  System.out.printf("Idade: %d%n", idade);
} catch (NumberFormatException e) {
  System.err.println("Idade inválida: " + linha);
}
```

Outras conversões comuns:

- `Long.parseLong(texto)`
- `Double.parseDouble(texto)`
- `Boolean.parseBoolean(texto)`

---

# Como usar Console?

```java
import java.io.Console;
import java.util.Arrays;

Console console = System.console();

if (console == null) {
  System.err.println("Console indisponível.");
  return;
}

String usuario = console.readLine("Usuário: ");
char[] senha = console.readPassword("Senha: ");

// usa a senha...
Arrays.fill(senha, '\0');
```

---

# Como usar Console?

- `readPassword()` evita exibir a senha e retorna `char[]`
- `System.console()` pode retornar `null` em IDEs e terminais integrados
- Limpar o vetor reduz o tempo de permanência da senha na memória

<div class="source">Fonte: <a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Console.html">Console — Java SE 21</a></div>

---

# Qual mecanismo escolher?

<table class="small">
<thead><tr><th>Situação</th><th>Escolha sugerida</th></tr></thead>
<tbody>
<tr><td>Aprendizagem e entrada interativa simples</td><td><code>Scanner</code></td></tr>
<tr><td>Muitas linhas de texto ou controle explícito da conversão</td><td><code>BufferedReader</code></td></tr>
<tr><td>Senha ou interação direta com terminal</td><td><code>Console</code></td></tr>
<tr><td>Resultado normal</td><td><code>System.out</code></td></tr>
<tr><td>Erro ou diagnóstico</td><td><code>System.err</code></td></tr>
</tbody>
</table>

> A melhor escolha depende do formato, do volume, do ambiente de execução e do tratamento de erros necessário.

---

<!-- _class: compact -->

# Exemplo: calcular o IMC

```java
import java.util.Locale;

public class Imc {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

    System.out.print("Peso em kg: ");
    double peso = input.nextDouble();
    System.out.print("Altura em m: ");
    double altura = input.nextDouble();

    if (peso <= 0 || altura <= 0) {
      System.err.println("Peso e altura devem ser positivos.");
      return;
    }

    double imc = peso / (altura * altura);
    System.out.printf("IMC: %.2f%n", imc);
  }
}
```

---

# Testar programas com entrada padrão

Crie uma entrada reproduzível e redirecione os fluxos:

```console
$ printf "70.0 1.75\n" > entrada.txt
$ java Imc < entrada.txt
Peso em kg: Altura em m: IMC: 22.86
```

Isso permite:

- Repetir exatamente o mesmo cenário
- Automatizar testes de várias entradas
- Comparar a saída produzida com a saída esperada
- Testar separadamente entradas válidas, limites e dados inválidos

---

# O que aprendemos?

- Entrada e saída são organizadas como fluxos
- `Scanner` facilita a leitura e a conversão de tokens
- `BufferedReader` lê texto de forma eficiente e exige conversão explícita
- `Console` é apropriado para terminais e leitura de senhas
- `print`, `println` e `printf` atendem a diferentes formatos de saída
- Locale e charset fazem parte do contrato dos dados
- Validação e tratamento de erros tornam a aplicação confiável
- `System.out` e `System.err` devem comunicar propósitos diferentes
