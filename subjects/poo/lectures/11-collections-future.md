# Java Collections Framework: curso avançado futuro

Este documento registra tópicos para uma continuação avançada da aula de _Java Collections Framework_.

## Objetivo geral

Aprofundar o uso de coleções em Java, indo além da escolha básica entre `List`, `Set`, `Queue`, `Deque` e `Map`, com foco em funcionamento interno, contratos, desempenho, concorrência e desenho de APIs.

## Tópicos sugeridos

### 1. Implementação interna das estruturas

- `ArrayList`: array redimensionável, capacidade, realocação e custo amortizado.
- `LinkedList`: nós, referências para anterior/próximo e custo de memória.
- `HashMap` e `HashSet`: hashing, _buckets_, colisões, fator de carga e redimensionamento.
- `LinkedHashMap` e `LinkedHashSet`: manutenção de ordem por lista encadeada.
- `TreeMap` e `TreeSet`: árvore rubro-negra, ordenação e navegação.
- `PriorityQueue`: heap binário e prioridade pela cabeça da fila.

### 2. Complexidade e desempenho

- Complexidade média, pior caso e amortizada.
- Diferença entre acesso por índice, busca, inserção e remoção.
- Impacto de colisões em estruturas baseadas em hash.
- Custo de memória das principais implementações.
- Quando uma implementação teoricamente melhor pode ser pior na prática.
- Introdução a medições com JMH.

### 3. Contratos de igualdade, hashing e ordenação

- Relação entre `equals()` e `hashCode()`.
- Consequências de implementar apenas um dos dois.
- Mutabilidade de objetos usados em `HashSet` ou como chave de `HashMap`.
- `Comparable` e `Comparator`.
- Consistência entre `compareTo()` e `equals()`.
- Problemas em `TreeSet` e `TreeMap` quando a comparação não representa a identidade esperada.

### 4. Views, iteradores e efeitos colaterais

- `subList()` como visão da lista original.
- `keySet()`, `values()` e `entrySet()` como visões do mapa.
- Views reversas com `reversed()`, `descendingSet()` e `descendingMap()`.
- Iteradores _fail-fast_.
- Iteradores _weakly consistent_ em coleções concorrentes.
- Remoção segura durante iteração.

### 5. Imutabilidade e modificação opcional

- `List.of()`, `Set.of()` e `Map.of()`.
- `List.copyOf()`, `Set.copyOf()` e `Map.copyOf()`.
- Diferença entre coleção imutável e visão não modificável.
- `Collections.unmodifiableList()` e similares.
- `UnsupportedOperationException`.
- Coleções de tamanho fixo, como listas obtidas com `Arrays.asList()`.

### 6. Concorrência

- Limitações de coleções não sincronizadas.
- `Collections.synchronizedList()` e sincronização externa durante iteração.
- `ConcurrentHashMap`.
- `ConcurrentSkipListMap` e `ConcurrentSkipListSet`.
- `CopyOnWriteArrayList` e `CopyOnWriteArraySet`.
- `BlockingQueue`, `TransferQueue` e `BlockingDeque`.
- Casos de uso: filas produtor-consumidor, cache compartilhado e leitura frequente.

### 7. Streams e coletores

- Transformação de coleções com `stream()`.
- `Collectors.toList()`, `toSet()` e `toMap()`.
- Tratamento de chaves duplicadas em `toMap()`.
- `groupingBy()` para agrupamento.
- `partitioningBy()` para classificação booleana.
- Escolha explícita da implementação resultante.
- Relação entre streams, imutabilidade e efeitos colaterais.

### 8. APIs sequenciadas do Java 21

- `SequencedCollection`.
- `SequencedSet`.
- `SequencedMap`.
- `getFirst()`, `getLast()`, `addFirst()`, `addLast()`.
- `reversed()`.
- Diferença entre ordem de encontro, ordem de inserção e ordem por comparação.
- Impacto em `ArrayList`, `LinkedHashSet`, `LinkedHashMap`, `TreeSet` e `TreeMap`.

### 9. Padrões de modelagem com coleções

- Índice por chave com `Map<K, V>`.
- Agrupamento com `Map<K, List<V>>` e `Map<K, Set<V>>`.
- Índice invertido.
- Ranking com `TreeMap`.
- Agendamento com `PriorityQueue`.
- Cache LRU com `LinkedHashMap`.
- Remoção de duplicados preservando ordem com `LinkedHashSet`.

### 10. Implementações especializadas e legadas

- `EnumSet`.
- `EnumMap`.
- `WeakHashMap`.
- `IdentityHashMap`.
- `Vector` e `Hashtable` como legados.
- Quando conhecer essas classes ajuda na leitura de código existente.

## Possível sequência de aulas

1. Funcionamento interno e custo das principais estruturas.
2. Contratos: igualdade, hashing, comparação e mutabilidade.
3. Views, iteradores, imutabilidade e APIs sequenciadas.
4. Concorrência e coleções especializadas.
5. Streams, coletores e padrões de modelagem.
6. Estudos de caso e análise de desempenho.

## Estudos de caso sugeridos

- Implementar um cache LRU com `LinkedHashMap`.
- Criar um índice invertido de palavras para documentos.
- Montar um ranking navegável com `TreeMap`.
- Simular uma central de tarefas com `PriorityQueue`.
- Comparar desempenho de `ArrayList`, `LinkedList`, `HashSet` e `TreeSet`.
- Refatorar código legado que usa `Vector` ou `Hashtable`.

## Resultado esperado

Ao final do módulo avançado, o estudante deve ser capaz de:

- escolher coleções considerando contrato, desempenho e memória;
- identificar bugs causados por `equals()`, `hashCode()` e `compareTo()`;
- entender o comportamento de views e iteradores;
- usar coleções concorrentes em cenários adequados;
- modelar estruturas de dados compostas com `Map`, `List` e `Set`;
- justificar tecnicamente a escolha de uma implementação.
