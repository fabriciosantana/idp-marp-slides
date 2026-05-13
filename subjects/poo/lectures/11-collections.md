---
marp: true
theme: idp
paginate: true
html: true
footer: <span>Programação Orientada a Objetos</span><span>Collections Framework</span><span>Prof. Fabricio Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

## Programação Orientada a Objetos

# Java Collections Framework

<div class="objectives">

**Objetivos da aula**

- Compreender o papel do _Java Collections Framework_
- Diferenciar interfaces, implementações e algoritmos
- Conhecer `List`, `Set`, `Queue`, `Deque` e `Map`
- Realizar operações comuns em coleções
- Reconhecer diferenças de desempenho das coleções

</div>

<div class="contact">
Prof. Fabricio Santana<br>
fabricio.santana@idp.edu.br<br>
www.linkedin.com/in/fabriciofsantana/
</div>

---

# Por que coleções?

- Resolve as limitações dos Arrays:
  - tamanho fixo
  - pouca expressividade sobre intenção
  - operações comuns precisam ser implementadas manualmente
  - remoção, busca, ordenação e agrupamento viram código repetitivo

<div class="callout">

**Ideia central**

Coleções oferecem estruturas padronizadas para representar grupos de objetos e manipular esses grupos de forma uniforme

</div>

---

<!-- _class: compact -->

# O que é uma coleção?

- Estrutura de dados que pode conter referências a outros objetos
- Pode conter referências a objetos de qualquer tipo que tenha o relacionamento "é-um" (herança) com o tipo de elemento da coleção
- Uma coleção é um objeto que representa um grupo de objetos
- Exemplos
  - uma turma com vários alunos;
  - uma fila de atendimento;
  - um conjunto de matrículas sem repetição;
  - um dicionário que associa CPF a pessoa;
  - um histórico ordenado de eventos.

---

# O que é _Java Collections Framework_?

<div class="callout">

**Arquitetura unificada**

O _Java Collections Framework_ é uma arquitetura para representar e manipular coleções independentemente dos detalhes de implementação.

</div>

Na prática:

- o código é programado orientado para interfaces;
- as implementações podem ser trocadas;
- algoritmos comuns ficam disponíveis em APIs padronizadas.

---

# Benefícios principais

O uso do _collections framework_:

- reduz esforço de programação;
- melhora desempenho com implementações eficientes;
- permite interoperabilidade entre APIs;
- reduz o esforço de aprender e projetar APIs;
- favorece reuso por meio de interfaces e algoritmos comuns.

---

<!-- _class: compact -->

# Principais interfaces do _collections framework_

As interfaces estão disponíveis no pacote `java.util`

<table class="tiny">
  <thead>
    <tr>
      <th>Interface</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Collection</code></td>
      <td>Interface raiz da hierarquia de coleções. Dela derivam interfaces como <code>Set</code>, <code>Queue</code> e <code>List</code>.</td>
    </tr>
    <tr>
      <td><code>Set</code></td>
      <td>Coleção que não permite elementos duplicados.</td>
    </tr>
    <tr>
      <td><code>List</code></td>
      <td>Coleção ordenada por posição que pode conter elementos duplicados.</td>
    </tr>
    <tr>
      <td><code>Queue</code></td>
      <td>Coleção normalmente usada como fila, em geral com política primeiro a entrar, primeiro a sair.</td>
    </tr>
    <tr>
      <td><code>Dequeue</code></td>
      <td>Fila duplamente encadeada, pode funcionar como fila e pillha.</td>
    </tr>
    <tr>
      <td><code>Map</code></td>
      <td>Estrutura que associa chaves a valores e não permite chaves duplicadas. Não deriva de <code>Collection</code>.</td>
    </tr>
    <tr>
      <td><code>SortedMap</code></td>
      <td>Um <Map> com ordenação natural pela chave ou por um comparador.</td>
    </tr>    
  </tbody>
</table>

---

<!-- _class: compact -->

# Principais classes do _collections framework_

As classes do _collections framework_ estão disponíveis no pacote `java.util`.

<table class="tiny">
  <thead>
    <tr>
      <th>Implementação</th>
      <th>Interface principal</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ArrayList</code></td>
      <td><code>List</code></td>
      <td>Lista baseada em array redimensionável. Boa para acesso por índice e percorrimento.</td>
    </tr>
    <tr>
      <td><code>LinkedList</code></td>
      <td><code>List</code> / <code>Deque</code></td>
      <td>Lista encadeada. Pode ser usada como lista, fila ou pilha.</td>
    </tr>
    <tr>
      <td><code>HashSet</code></td>
      <td><code>Set</code></td>
      <td>Conjunto baseado em tabela hash. Não garante ordem dos elementos.</td>
    </tr>
    <tr>
      <td><code>TreeSet</code></td>
      <td><code>SortedSet</code></td>
      <td>Conjunto ordenado, normalmente pela ordem natural dos elementos ou por um comparador.</td>
    </tr>
    <tr>
      <td><code>HashMap</code></td>
      <td><code>Map</code></td>
      <td>Mapa baseado em tabela hash. Associa chaves a valores e não garante ordem.</td>
    </tr>
    <tr>
      <td><code>TreeMap</code></td>
      <td><code>SortedMap</code></td>
      <td>Mapa ordenado pelas chaves, usando ordem natural ou um comparador.</td>
    </tr>
    <tr>
      <td><code>ArrayDeque</code></td>
      <td><code>Deque</code></td>
      <td>Fila de duas pontas baseada em array redimensionável. Útil para filas e pilhas.</td>
    </tr>
  </tbody>
</table>

---

# Qual coleção escolher?

<div class="callout">

**Critérios**

- Requisitos de memória
- Desempenho em operações de adicionar, remover, ordenar e procurar elementos

</div>

---

# java.util.ArrayList

- Estrutura de dados semelhante a um array que pode ser redimensionado dinamicamente
- armazena referências a objetos de um tipo
- o tipo pode ser definido na declaração (_generics_), viabilizando a verificação de tipo em tempo de compilação

```java
import java.util.ArrayList;
//...
ArrayList turma = new ArrayList();
turma.add(new Aluno("Fabricio"));
turma.add(new Aluno("João"));
System.out.println(alunos); //[Fabricio, João]
```

---

# Interfaces: visão geral

<div class="callout">

**Separar contrato de implementação**

Uma interface define o que uma coleção deve fazer; uma classe concreta define como isso será feito.

</div>

Exemplo:

```java
List<String> nomes = new ArrayList<>();
Set<Integer> matriculas = new HashSet<>();
Map<String, Aluno> alunosPorCpf = new HashMap<>();
```

O tipo à esquerda comunica intenção. O tipo à direita escolhe a estrutura concreta.

---

<!-- _class: compact -->

# Collection e seus descendentes

A interface mais básica é `java.util.Collection`.

Principais descendentes:

- `Set`: conjunto sem elementos duplicados.
- `SortedSet`: conjunto ordenado.
- `NavigableSet`: conjunto ordenado com operações de navegação.
- `Queue`: fila.
- `Deque`: fila de duas pontas.
- `BlockingQueue`, `TransferQueue` e `BlockingDeque`: variações para concorrência.

<div class="source">Fonte: <a href="https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html">Oracle Java SE 8 - Collections Framework Overview</a></div>

---

# Map é diferente

`Map` não é uma `Collection` no sentido estrito.

Um mapa associa **chaves** a **valores**:

```java
Map<String, Integer> frequencia = new HashMap<>();
frequencia.put("Java", 3);
frequencia.put("POO", 2);

Integer ocorrencias = frequencia.get("Java");
```

Mesmo não sendo uma coleção, `Map` oferece visões manipuláveis como coleções: `keySet()`, `values()` e `entrySet()`.

---

# Escolha por intenção

<table class="small">
  <thead>
    <tr>
      <th>Quando você precisa...</th>
      <th>Use</th>
      <th>Exemplo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>manter ordem por posição</td>
      <td><code>List</code></td>
      <td>notas de um aluno</td>
    </tr>
    <tr>
      <td>evitar duplicidade</td>
      <td><code>Set</code></td>
      <td>matrículas inscritas</td>
    </tr>
    <tr>
      <td>processar por ordem de chegada</td>
      <td><code>Queue</code></td>
      <td>fila de atendimento</td>
    </tr>
    <tr>
      <td>associar chave e valor</td>
      <td><code>Map</code></td>
      <td>CPF → aluno</td>
    </tr>
  </tbody>
</table>

---

<!-- _class: compact -->

# Implementações gerais

<table class="tiny">
  <thead>
    <tr>
      <th>Interface</th>
      <th>Tabela hash</th>
      <th>Array redimensionável</th>
      <th>Árvore balanceada</th>
      <th>Lista ligada</th>
      <th>Hash + lista ligada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Set</code></td>
      <td><code>HashSet</code></td>
      <td></td>
      <td><code>TreeSet</code></td>
      <td></td>
      <td><code>LinkedHashSet</code></td>
    </tr>
    <tr>
      <td><code>List</code></td>
      <td></td>
      <td><code>ArrayList</code></td>
      <td></td>
      <td><code>LinkedList</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>Deque</code></td>
      <td></td>
      <td><code>ArrayDeque</code></td>
      <td></td>
      <td><code>LinkedList</code></td>
      <td></td>
    </tr>
    <tr>
      <td><code>Map</code></td>
      <td><code>HashMap</code></td>
      <td></td>
      <td><code>TreeMap</code></td>
      <td></td>
      <td><code>LinkedHashMap</code></td>
    </tr>
  </tbody>
</table>

<div class="source">Fonte: <a href="https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html">Oracle Java SE 8 - Collections Framework Overview</a></div>

---

# List

Use `List` quando:

- a posição importa;
- elementos repetidos são permitidos;
- você precisa acessar por índice;
- a ordem de inserção deve ser preservada.

```java
List<String> disciplinas = new ArrayList<>();
disciplinas.add("Algoritmos");
disciplinas.add("POO");
disciplinas.add("Banco de Dados");

System.out.println(disciplinas.get(1)); // POO
```

---

# ArrayList ou LinkedList?

<div class="columns small">

<div class="callout">

**ArrayList**

- boa escolha padrão;
- acesso por índice rápido;
- bom para percorrer e consultar;
- inserções no meio podem custar caro.

</div>

<div class="callout">

**LinkedList**

- implementa `List` e `Deque`;
- pode ajudar em inserções/remoções nas extremidades;
- acesso por índice tende a ser mais caro.

</div>

</div>

---

# Set

Use `Set` quando duplicidade não faz sentido.

```java
Set<String> linguagens = new HashSet<>();
linguagens.add("Java");
linguagens.add("Python");
linguagens.add("Java");

System.out.println(linguagens.size()); // 2
```

<div class="callout">

**Atenção**

Para objetos próprios, `Set` depende de `equals()` e `hashCode()` para decidir se dois elementos são iguais.

</div>

---

# Escolhendo um Set

<table class="small">
  <thead>
    <tr>
      <th>Implementação</th>
      <th>Característica principal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>HashSet</code></td>
      <td>não garante ordem; costuma ser eficiente para busca.</td>
    </tr>
    <tr>
      <td><code>LinkedHashSet</code></td>
      <td>mantém ordem de inserção.</td>
    </tr>
    <tr>
      <td><code>TreeSet</code></td>
      <td>mantém elementos ordenados.</td>
    </tr>
  </tbody>
</table>

---

# Map

Use `Map` quando o acesso natural é por chave.

```java
Map<String, Aluno> alunos = new HashMap<>();

alunos.put("123.456.789-00", new Aluno("Ana"));
alunos.put("987.654.321-00", new Aluno("Bruno"));

Aluno aluno = alunos.get("123.456.789-00");
```

Chaves são únicas. Se uma chave for inserida novamente, o valor anterior será substituído.

---

# Percorrendo um Map

```java
for (String cpf : alunos.keySet()) {
    System.out.println(cpf);
}

for (Aluno aluno : alunos.values()) {
    System.out.println(aluno.nome());
}

for (Map.Entry<String, Aluno> entrada : alunos.entrySet()) {
    System.out.println(entrada.getKey() + ": " + entrada.getValue());
}
```

`entrySet()` costuma ser a melhor opção quando você precisa de chave e valor.

---

# Queue e Deque

`Queue` representa uma fila.

```java
Queue<String> fila = new ArrayDeque<>();
fila.add("Ana");
fila.add("Bruno");

System.out.println(fila.remove()); // Ana
```

`Deque` permite inserir e remover nas duas pontas.

```java
Deque<String> historico = new ArrayDeque<>();
historico.push("Tela inicial");
historico.push("Cadastro");
System.out.println(historico.pop()); // Cadastro
```

---

<!-- _class: compact -->

# Generics

Generics tornam o tipo dos elementos explícito.

```java
List<String> nomes = new ArrayList<>();
nomes.add("Ana");
// nomes.add(10); // erro de compilação
```

Sem generics, erros aparecem tarde:

```java
List nomes = new ArrayList();
nomes.add("Ana");
nomes.add(10);
```

<div class="callout">

**Regra prática**

Prefira coleções parametrizadas: `List<Aluno>`, `Set<String>`, `Map<Long, Pedido>`.

</div>

---

# Iteração

Formas comuns de percorrer coleções:

```java
for (String nome : nomes) {
    System.out.println(nome);
}

nomes.forEach(System.out::println);
```

Quando for remover durante a iteração, use `Iterator`:

```java
Iterator<String> it = nomes.iterator();
while (it.hasNext()) {
    if (it.next().isBlank()) {
        it.remove();
    }
}
```

---

# Operações opcionais

Algumas operações de modificação podem ser opcionais.

Uma implementação pode lançar:

```java
UnsupportedOperationException
```

Exemplo comum:

```java
List<String> nomes = Arrays.asList("Ana", "Bruno");
nomes.add("Carla"); // pode lançar UnsupportedOperationException
```

<div class="source">Fonte: <a href="https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html">Oracle Java SE 8 - Collections Framework Overview</a></div>

---

<!-- _class: compact -->

# Termos importantes

<table class="small">
  <thead>
    <tr>
      <th>Termo</th>
      <th>Ideia</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>unmodifiable</td>
      <td>não permite operações como <code>add</code>, <code>remove</code> ou <code>clear</code>.</td>
    </tr>
    <tr>
      <td>immutable</td>
      <td>garante que nenhuma alteração visível ocorrerá na coleção.</td>
    </tr>
    <tr>
      <td>fixed-size</td>
      <td>mantém tamanho constante, ainda que elementos possam mudar.</td>
    </tr>
    <tr>
      <td>random access</td>
      <td>acesso indexado rápido, geralmente em tempo constante.</td>
    </tr>
  </tbody>
</table>

---

# Algoritmos

A classe `Collections` oferece métodos estáticos para operações comuns.

```java
List<Integer> notas = new ArrayList<>(List.of(8, 10, 6));

Collections.sort(notas);
Collections.reverse(notas);
Collections.shuffle(notas);

Integer maior = Collections.max(notas);
Integer menor = Collections.min(notas);
```

<div class="callout">

**Reuso**

Você usa algoritmos prontos sem acoplar o código a uma implementação específica.

</div>

---

# Wrappers

Wrappers adicionam comportamento a coleções existentes.

```java
List<String> nomes = new ArrayList<>();

List<String> sincronizada =
    Collections.synchronizedList(nomes);

List<String> somenteLeitura =
    Collections.unmodifiableList(nomes);
```

Segundo a Oracle, os wrappers podem acrescentar funcionalidades como sincronização a implementações não sincronizadas.

---

# Iteradores fail-fast

As implementações novas possuem iteradores _fail-fast_.

<div class="callout">

**O que isso significa?**

Se a coleção for modificada de forma indevida enquanto está sendo percorrida, o iterador tenta detectar o problema rapidamente.

</div>

Exemplo do erro comum:

```java
for (String nome : nomes) {
    nomes.remove(nome); // risco de ConcurrentModificationException
}
```

---

# Concorrência

Coleções usadas por várias threads exigem cuidado.

Interfaces e classes específicas ajudam nesse cenário:

- `BlockingQueue`
- `ConcurrentMap`
- `ConcurrentNavigableMap`
- `CopyOnWriteArrayList`
- `ConcurrentHashMap`
- `ConcurrentSkipListMap`

<div class="source">Fonte: <a href="https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html">Oracle Java SE 8 - Collections Framework Overview</a></div>

---

# Exemplo completo

```java
record Aluno(String nome, String matricula) {}

List<Aluno> alunos = List.of(
    new Aluno("Ana", "001"),
    new Aluno("Bruno", "002"),
    new Aluno("Ana", "003")
);

Map<String, Long> porNome = alunos.stream()
    .collect(Collectors.groupingBy(
        Aluno::nome,
        Collectors.counting()
    ));

System.out.println(porNome);
```

Coleções se integram naturalmente com APIs modernas como Streams.

---

# Boas práticas

- Programe para interfaces: `List`, `Set`, `Map`.
- Escolha implementação conforme uso esperado.
- Use generics sempre que possível.
- Não dependa de ordem quando a implementação não garante ordem.
- Implemente `equals()` e `hashCode()` corretamente em objetos usados em `Set` ou como chave de `Map`.
- Prefira APIs prontas antes de reinventar estruturas.

---

<!-- _class: compact -->

# Exercício 1

Modele um cadastro simples de alunos.

Requisitos:

- Crie uma classe ou `record` `Aluno`.
- Armazene alunos em uma `List<Aluno>`.
- Permita alunos com o mesmo nome.
- Liste todos os alunos em ordem de cadastro.
- Conte quantos alunos existem.

Depois responda:

- `ArrayList` é uma boa escolha aqui? Por quê?

---

<!-- _class: compact -->

# Exercício 2

Agora controle matrículas inscritas em uma atividade.

Requisitos:

- Use `Set<String>` para armazenar matrículas.
- Tente inserir a mesma matrícula duas vezes.
- Exiba a quantidade final de inscrições.
- Troque `HashSet` por `LinkedHashSet`.

Depois responda:

- O que mudou?
- O que permaneceu igual?

---

<!-- _class: compact -->

# Exercício 3

Crie um índice de alunos por matrícula.

Requisitos:

- Use `Map<String, Aluno>`.
- Cadastre pelo menos três alunos.
- Busque um aluno pela matrícula.
- Percorra o mapa usando `entrySet()`.
- Teste o que acontece ao inserir uma matrícula repetida.

Depois responda:

- Por que `Map` não é simplesmente uma lista?

---

# Fechamento

<div class="callout">

**Mensagem principal**

O Java Collections Framework permite escrever código mais claro, reutilizável e eficiente ao separar intenção, contrato e implementação.

</div>

Para escolher bem:

- comece pela interface;
- pense em duplicidade, ordem, busca e concorrência;
- só então escolha a implementação.

<div class="source">Fonte principal: <a href="https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html">Oracle Java SE 8 - Collections Framework Overview</a></div>
