---
marp: true
theme: idp
paginate: false
html: true
footer: <span>Programação Orientada a Objetos</span><span>Manipulação de arquivos em Java</span><span>Prof. Fabricio Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

## Programação Orientada a Objetos

# Manipulação de arquivos em Java

<div class="objectives">

**Objetivos da aula**

- Compreender persistência de dados em arquivos
- Diferenciar arquivos de texto, binários e dados estruturados
- Usar `java.io` para streams, readers, writers e serialização
- Usar `java.nio.file` com `Path`, `Files` e operações em diretórios
- Tratar exceções e fechar recursos corretamente
- Construir pequenos programas que leem, escrevem e processam arquivos

</div>

<div class="contact">
Prof. Fabricio Santana<br>
fabricio.santana@idp.edu.br<br>
www.linkedin.com/in/fabriciofsantana/
</div>

---

# Por que arquivos?

- Variáveis, objetos, arrays e coleções ficam em memória
  - quando o programa termina, esses dados desaparecem
- Arquivos permitem **persistência**
  - dados continuam disponíveis entre execuções
  - outros programas também podem ler ou produzir esses dados
- Um programa real costuma precisar:
  - importar dados
  - exportar relatórios
  - gravar logs
  - salvar configurações
  - processar arquivos recebidos de outros sistemas

---

# Arquivo: o que é?

> Para um programa Java, arquivo é um recurso externo que pode ser acessado por um caminho e processado como fluxo (_stream_) de bytes, caracteres ou registros estruturados.

<div class="callout">

**Ideia central**

Arquivos não são objetos comuns em memória. Eles dependem do sistema operacional, permissões, caminhos, codificação de texto e fechamento de recursos.

</div>

---

# Stream de dados: intuição

**Stream** é um fluxo sequencial de dados.

- **Entrada:** dados vêm de fora para dentro do programa
  - teclado, arquivo, rede, memória
- **Saída:** dados saem do programa
  - console, arquivo, rede, memória
- Em Java, I/O tradicional é modelado como:
  - bytes: `InputStream` e `OutputStream`
  - caracteres: `Reader` e `Writer`

---

# Streams padrão do Java

Quando um programa Java inicia, ele já possui três fluxos padrão:

<table class="tiny">
  <thead>
    <tr>
      <th>Stream</th>
      <th>Tipo</th>
      <th>Uso comum</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>System.in</code></td>
      <td><code>InputStream</code></td>
      <td>Entrada padrão, normalmente teclado.</td>
    </tr>
    <tr>
      <td><code>System.out</code></td>
      <td><code>PrintStream</code></td>
      <td>Saída padrão, normalmente console.</td>
    </tr>
    <tr>
      <td><code>System.err</code></td>
      <td><code>PrintStream</code></td>
      <td>Saída de erro, normalmente console.</td>
    </tr>
  </tbody>
</table>

Esses fluxos podem ser redirecionados com:

- `System.setIn`
- `System.setOut`
- `System.setErr`.

---

# Tipos de arquivos

Antes de escolher uma classe de I/O, precisamos entender como o conteúdo do arquivo será interpretado pelo programa: como texto, como bytes ou como representação de objetos.

<table class="tiny">
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Como o programa enxerga</th>
      <th>Classes comuns</th>
      <th>Exemplos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Texto</td>
      <td>Sequência de caracteres</td>
      <td><code>Reader</code>, <code>Writer</code>, <code>Scanner</code>, <code>Formatter</code></td>
      <td><code>.txt</code>, <code>.csv</code>, <code>.json</code></td>
    </tr>
    <tr>
      <td>Binário</td>
      <td>Sequência de bytes</td>
      <td><code>InputStream</code>, <code>OutputStream</code></td>
      <td><code>.png</code>, <code>.pdf</code>, <code>.zip</code></td>
    </tr>
    <tr>
      <td>Objeto serializado</td>
      <td>Representação binária de objetos Java</td>
      <td><code>ObjectInputStream</code>, <code>ObjectOutputStream</code></td>
      <td><code>.ser</code>, dados internos</td>
    </tr>
  </tbody>
</table>

---

# Bytes vs. caracteres

Todo arquivo é armazenado como bytes; a diferença é se o programa trata esses bytes diretamente ou se os converte para caracteres usando uma codificação de texto.

<div class="columns">
<div>

**Bytes**

```java
try (InputStream in =
         new FileInputStream("foto.png")) {
    byte[] dados = in.readAllBytes();
    System.out.println(dados.length);
}
```

- Adequado para conteúdo binário
- Não interpreta codificação de texto

</div>
<div>

**Caracteres**

```java
try (BufferedReader reader =
         new BufferedReader(
             new FileReader("nomes.txt"))) {
    System.out.println(reader.readLine());
}
```

- Adequado para texto
- Depende de charset

</div>
</div>

---

# Pacotes fundamentais

A manipulação de arquivos em Java envolve mais de um pacote: alguns representam fluxos de dados, outros representam caminhos, operações no sistema de arquivos e utilitários para processar o conteúdo lido.

<table class="tiny">
  <thead>
    <tr>
      <th>Pacote</th>
      <th>Papel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>java.nio.file</code></td>
      <td>API moderna para caminhos, arquivos, diretórios, atributos, cópia, movimentação e remoção.</td>
    </tr>
    <tr>
      <td><code>java.util</code></td>
      <td><code>Scanner</code>, <code>Formatter</code> e coleções úteis no processamento dos dados lidos.</td>
    </tr>
    <tr>
      <td><code>java.nio.charset</code></td>
      <td>Codificação de texto: faz a ponte entre bytes e caracteres com classes como <code>Charset</code> e <code>StandardCharsets</code>.</td>
    </tr>
    <tr>
      <td><code>java.io</code></td>
      <td>API clássica de entrada e saída por streams, readers, writers, arquivos e serialização.</td>
    </tr>
  </tbody>
</table>

---

<!-- _class: compact -->

# Pacotes complementares

Além dos pacotes fundamentais, existem outros pacotes que complementam a manipulação de arquivos em Java.

<table class="tiny">
  <thead>
    <tr>
      <th>Pacote</th>
      <th>Quando aparece</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>java.nio</code></td>
      <td>Buffers e tipos de apoio para operações de I/O mais próximas do sistema, como <code>ByteBuffer</code>.</td>
    </tr>
    <tr>
      <td><code>java.nio.channels</code></td>
      <td>Canais como <code>FileChannel</code>, úteis em arquivos grandes, buffers e I/O de nível mais baixo.</td>
    </tr>
    <tr>
      <td><code>java.nio.file.attribute</code></td>
      <td>Metadados como tamanho, data de modificação, dono, permissões e atributos POSIX.</td>
    </tr>
    <tr>
      <td><code>java.util.zip</code></td>
      <td>Leitura e escrita de arquivos compactados, como ZIP e GZIP.</td>
    </tr>
    <tr>
      <td><code>java.util.jar</code></td>
      <td>Manipulação de arquivos JAR, que são arquivos ZIP com metadados Java.</td>
    </tr>
    <tr>
      <td><code>java.net</code></td>
      <td>Conversão entre caminhos e URIs, além de leitura de recursos remotos quando aplicável.</td>
    </tr>
  </tbody>
</table>

> Esses pacotes estão fora do escopo desta aula

---

# java.nio.file: visão geral

- `java.nio.file` é a API moderna do Java para trabalhar com arquivos e diretórios.
- `Path` representa o caminho de um arquivo ou diretório no sistema de arquivos.
- `Files` concentra métodos estáticos para criar, ler, escrever, copiar, mover, apagar e consultar arquivos.
- `DirectoryStream` permite percorrer o conteúdo de diretórios de forma controlada.
- `StandardOpenOption`, `StandardCopyOption` e `LinkOption` padronizam decisões comuns de abertura, cópia e tratamento de links.
- `FileSystem` e `FileSystems` representam o sistema de arquivos usado pela aplicação.

---

# java.nio.file: classes principais

O pacote `java.nio.file` organiza a manipulação moderna de arquivos em torno de caminhos (`Path`), operações utilitárias (`Files`) e opções padronizadas para abrir, copiar e consultar arquivos.

<img src="../images/12-file-classes-java.nio.png">

---

<!-- _class: compact -->

# java.nio.file: Path, Paths e Files

> Em `java.nio.file`, caminho, criação de caminhos e operações de arquivo são responsabilidades separadas.

<table class="tiny">
  <thead>
    <tr>
      <th>Elemento</th>
      <th>Papel</th>
      <th>Ideia principal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Path</code></td>
      <td>Interface</td>
      <td>Representa a localização de um recurso, permite combinar, normalizar e consultar partes do caminho; não lê nem escreve sozinho, pois as operações ficam em <code>Files</code>, que recebe um <code>Path</code>.</td>
    </tr>
    <tr>
      <td><code>Paths</code></td>
      <td>Classe utilitária</td>
      <td>Oferece <code>get(...)</code> para criar <code>Path</code>; aparece bastante em código escrito antes de <code>Path.of(...)</code>.</td>
    </tr>
    <tr>
      <td><code>Files</code></td>
      <td>Classe utilitária</td>
      <td>Concentra métodos estáticos que recebem <code>Path</code> e interagem com o sistema de arquivos.</td>
    </tr>
  </tbody>
</table>

---

<!-- _class: compact -->

# java.nio.file: Path

<div class="columns">
<div>

> `Path` representa o caminho de um arquivo ou diretório no sistema de arquivos.

<img src="../images/12-path-interface.png" />

</div>
<div>

- **`resolve(...)`:** combina caminhos (ex.: `pasta.resolve("a.txt")`).
- **`of(...)`:** cria um `Path` a partir de uma ou mais partes de caminho.
- **`normalize()`:** remove `.` e `..` do caminho.
- **`toAbsolutePath()` / `toRealPath(...)`:** converte para caminho absoluto (e resolve links/normaliza).
- **`getFileName()` / `getParent()`:** navegação por partes do caminho.
- **`isAbsolute()` / `startsWith()` / `endsWith()`:** consultas sobre o formato do caminho.

</div>
</div>

---

<!-- _class: compact -->

# java.nio.file: Paths

<div class="columns">
<div>

> `Paths` fornece métodos utilitários para criar objetos `Path` a partir de strings ou URIs.

<img src="../images/12-paths-class.png" />

</div>
<div>

- **`get(String..., String...)`:** cria um `Path` a partir de partes de caminho.
- **`get(URI)`:** converte um `URI` em um `Path`.
- **`Path.of(...)`:** alternativa moderna preferida para criar caminhos em código novo.

</div>
</div>

---

<!-- _class: compact -->

# java.nio.file: Files

<div class="columns">
<div>

> `Files` concentra operações de alto nível sobre arquivos e diretórios usando `Path`.

<img src="../images/12-files-class.png" />

</div>
<div>

- **`exists(...)`:** verifica se o caminho existe.
- **`createDirectories(...)`:** cria diretórios, inclusive pais necessários.
- **`readString(...)`:** lê todo o conteúdo de um arquivo como `String`.
- **`writeString(...)`:** escreve texto em um arquivo.
- **`copy(...)` / `move(...)`:** copia ou move arquivos entre caminhos.
- **`deleteIfExists(...)`:** apaga o arquivo se ele existir.
- **`list(...)` / `walk(...)`:** percorre o conteúdo de diretórios.

</div>
</div>

---

<!-- _class: compact -->

# java.nio.file: exemplo

<div class="columns">
<div>

> A interface `Path` representa um caminho para arquivo ou diretório.

```java
Path pasta = Path.of("dados");
Path arquivo = pasta.resolve("mensagem.txt");

Path legado = Paths.get(
    "dados",
    "mensagem.txt"
);
```

- Em código novo, prefira `Path.of(...)`.
- `Paths.get(...)` pode ser mantido em código legado.

</div>
<div>

> A classe `Files` executa operações sobre arquivos e diretórios a partir de um `Path`.

```java
try {
    Files.createDirectories(pasta);

    Files.writeString(
        arquivo,
        "Ola, arquivo!\n"
    );

    String texto = Files.readString(legado);
    System.out.println(texto);
} catch (IOException e) {
    System.err.println(e.getMessage());
}
```

</div>
</div>

---

<!-- _class: practice -->
<!-- _paginate: false -->

# java.nio.file: demostração Path e Files

<iframe
  class="compiler-frame"
  src="https://onecompiler.com/embed/java/44rsv3zhn?hideTitle=false&hideLanguageSelection=false&hideNew=false&hideNewFileOption=false&hideStdin=false&hideResult=false&hideEditorOptions=false&availableLanguages=true&disableAutoComplete=true&theme=light&fontSize=20"
  title="OneCompiler Java"
  allow="clipboard-read; clipboard-write"
></iframe>

---

<!-- _class: practice -->
<!-- _paginate: false -->

# java.nio.file: atividade prática

<div
  data-onecompiler-challenge
  data-challenge-id="44rsv5qmr"
  data-challenge-slug="manipula-o-de-arquivos-java-nio-file-path-e-java-nio-file-files"
>
  <div class="challenge-login">
    <input data-onecompiler-user-token type="password" placeholder="Token do usuário">
    <button data-onecompiler-load type="button">Carregar challenge</button>
  </div>

  <iframe
    data-onecompiler-frame
    class="compiler-frame challenge-frame"
    frameborder="0"
    allowfullscreen
    allowFullScreen
    mozallowfullscreen="true"
    webkitallowfullscreen="true"
    title="OneCompiler Challenge"
  ></iframe>

  <div class="source">
    Desafio: <a data-onecompiler-source href=""></a>
  </div>
</div>

---

<!-- _class: compact -->

# java.nio.file: StandardOpenOption

<div class="columns">
<div>

> `StandardOpenOption` é um enum que diz como um arquivo deve ser aberto ou criado.

- `CREATE`: cria o arquivo se não existir
- `APPEND`: adiciona ao final do arquivo existente
- `TRUNCATE_EXISTING`: substitui o conteúdo ao abrir
- `READ` / `WRITE`: define o modo de acesso

</div>
<div>

```java
Path arquivo = Path.of("dados/mensagem.txt");
try {
    Files.writeString(
        arquivo,
        "Olá, arquivo!\n",
        StandardOpenOption.CREATE,
        StandardOpenOption.APPEND
    );
} catch (IOException e) {
    System.err.println(e.getMessage());
}
```

</div>
</div>

---

<!-- _class: compact -->

# java.nio.file: StandardCopyOption

<div class="columns">
<div>

> `StandardCopyOption` é um enum que controla o comportamento de cópia e movimentação de arquivos.

- `REPLACE_EXISTING`: substitui o destino se já existir
- `COPY_ATTRIBUTES`: preserva atributos do arquivo
- `ATOMIC_MOVE`: tenta mover de forma atômica

</div>
<div>

```java
Path origem = Path.of("dados/mensagem.txt");
Path destino = Path.of("backup/mensagem.txt");

Files.copy(
    origem,
    destino,
    StandardCopyOption.REPLACE_EXISTING
);
```

</div>
</div>

---

<!-- _class: practice -->
<!-- _paginate: false -->

# StandardOpenOption, StandardCopyOption: demo

<iframe
  class="compiler-frame"
  src="https://onecompiler.com/embed/java/44rsxc4bk?hideTitle=false&hideLanguageSelection=false&hideNew=false&hideNewFileOption=false&hideStdin=false&hideResult=false&hideEditorOptions=false&availableLanguages=true&disableAutoComplete=true&theme=light&fontSize=20"
  title="OneCompiler Java"
  allow="clipboard-read; clipboard-write"
></iframe>

---

<!-- _class: compact -->

# java.nio.charset: StandardCharsets

- `StandardCharsets` define encodings de caracteres padrão seguros e convenientemente acessíveis.
- Usar um `Charset` explícito garante que os bytes lidos ou escritos sejam traduzidos corretamente para caracteres.
  - `UTF_8`: codificação UTF-8, recomendada para leitura e escrita de texto.
  - `US_ASCII`: codificação ASCII de 7 bits.
  - `ISO_8859_1`: codificação Latin-1 para texto ocidental.

```java
Path path = Path.of("dados.txt");
String texto = Files.readString(path, StandardCharsets.UTF_8);
Files.writeString(path, texto, StandardCharsets.UTF_8);
```

> Em código novo, prefira informar explicitamente o `Charset`, especialmente quando o arquivo vem de outro sistema.

---

<!-- _class: practice -->
<!-- _paginate: false -->

# java.nio.charset.StandardCharsets: demostração

<iframe
  class="compiler-frame"
  src="https://onecompiler.com/embed/java/44rsycyf7?hideTitle=false&hideLanguageSelection=false&hideNew=false&hideNewFileOption=false&hideStdin=false&hideResult=false&hideEditorOptions=false&availableLanguages=true&disableAutoComplete=true&theme=light&fontSize=20"
  title="OneCompiler Java"
  allow="clipboard-read; clipboard-write"
></iframe>

---

# java.util.Scanner: do console para o arquivo

Em aulas anteriores, usamos `Scanner` para ler dados do console com `System.in`. A mesma classe também pode ler dados de um arquivo, quando recebe um `Path` como fonte de entrada.

<div class="columns">
<div>

```java
Scanner teclado = new Scanner(System.in);

System.out.print("Nome: ");
String nome = teclado.nextLine();
```

- Entrada vem do console
- Usuário digita os dados

</div>
<div>

```java
Path path = Path.of("alunos.txt");

try (Scanner scanner = new Scanner(path)) {
    while (scanner.hasNextLine()) {
        String linha = scanner.nextLine();
        System.out.println(linha);
    }
} catch (IOException e) {
    System.err.println(e.getMessage());
}
```

- Entrada vem do arquivo
- Programa percorre o conteúdo salvo

</div>
</div>

---

# java.util.Formatter: escrita formatada

`Formatter` formata texto com especificadores de formato antes de gravar em um arquivo.

```java
Path path = Path.of("data", "boletim.txt");

try (Formatter out =
         new Formatter(path, StandardCharsets.UTF_8)) {

    out.format("%-20s %5s%n", "Aluno", "Nota");
    out.format("%-20s %5.1f%n", "Ana", 9.5);
    out.format("%-20s %5.1f%n", "Bruno", 7.8);
} catch (IOException e) {
    System.err.println("Erro ao escrever boletim: " + e.getMessage());
}
```

`Formatter` usa a mesma ideia de formatação de `System.out.printf`.

---

<!-- _class: practice -->
<!-- _paginate: false -->

# java.util.Scanner e java.util.Formatter: demo

<iframe
  class="compiler-frame"
  src="https://onecompiler.com/embed/java/44rsywg3w?hideTitle=false&hideLanguageSelection=false&hideNew=false&hideNewFileOption=false&hideStdin=false&hideResult=false&hideEditorOptions=false&availableLanguages=true&disableAutoComplete=true&theme=light&fontSize=20"
  title="OneCompiler Java"
  allow="clipboard-read; clipboard-write"
></iframe>

---

<!-- _class: compact -->

# java.nio.file: FileSystems

<div class="columns">
<div>

> `FileSystems` fornece acesso ao sistema de arquivos padrão e permite criar ou carregar outros sistemas de arquivos.

<img src="../images/12-filesystems-class.png" />

</div>
<div>

- **`getDefault()`:** retorna o `FileSystem` padrão do JRE.
- **`getFileSystem(URI)`:** obtém um `FileSystem` a partir de um URI.
- **`newFileSystem(URI, Map<String,?>)`:** cria um sistema de arquivos especial, como ZIP.
- **`newFileSystem(Path, Map<String,?>)`:** abre um sistema de arquivos para um arquivo de contêiner.

</div>
</div>

---

<!-- _class: compact -->

# java.nio.file: FileSystem

<div class="columns">
<div>

> `FileSystem` representa um sistema de arquivos e expõe caminhos, raízes e o provedor subjacente.

<img src="../images/12-filesystem-class.png" />

</div>
<div>

- **`getPath(String, String...)`:** cria um `Path` dentro deste sistema de arquivos.
- **`getSeparator()`:** retorna o separador de caminhos usado pelo sistema.
- **`getRootDirectories()`:** lista as raízes disponíveis.
- **`isReadOnly()`:** indica se o sistema é somente leitura.

</div>
</div>

---

<!-- _class: compact -->

# java.nio.file: FileSystems e FileSystem

> `FileSystems` dá acesso ao sistema de arquivos atual; `FileSystem` expõe características dele e ajuda a criar caminhos.

```java
FileSystem fs = FileSystems.getDefault();

System.out.println(
    "Separador: " + fs.getSeparator()
);

for (Path raiz : fs.getRootDirectories()) {
    System.out.println("Raiz: " + raiz);
}

Path pasta = fs.getPath("docs");
```

---

<!-- _class: practice -->
<!-- _paginate: false -->

# FileSystems e FileSystem: demostração

<iframe
  class="compiler-frame"
  src="https://onecompiler.com/embed/java/44rt338pv?hideTitle=false&hideLanguageSelection=false&hideNew=false&hideNewFileOption=false&hideStdin=false&hideResult=false&hideEditorOptions=false&availableLanguages=true&disableAutoComplete=true&theme=light&fontSize=20"
  title="OneCompiler Java"
  allow="clipboard-read; clipboard-write"
></iframe>

---

<!-- _class: compact -->

# java.nio.file: DirectoryStream

<div class="columns">
<div>

> `DirectoryStream` permite percorrer o conteúdo de um diretório de forma eficiente e com baixo uso de memória.

<img src="../images/12-directorystream-class.png" />

</div>
<div>

- **`Files.newDirectoryStream(Path)`:** abre um stream para listar entradas de diretório.
- **`iterator()`:** percorre os caminhos retornados.
- **`close()`:** fecha o stream e libera recursos.
- **`Files.newDirectoryStream(Path, String)`:** filtra nomes usando padrões simples.

</div>
</div>

---

<!-- _class: compact -->

# java.nio.file: DirectoryStream (exemplo)

> `DirectoryStream` percorre as entradas de um diretório com uso controlado de recursos.

```java
try (
    DirectoryStream<Path> stream =
        Files.newDirectoryStream(pasta)
) {
    for (Path item : stream) {
        System.out.println(
            item.getFileName()
        );
    }
}
```

- O `try-with-resources` garante o fechamento do stream.

---

<!-- _class: compact -->

# java.nio.file: resumo

<table class="tiny">
  <thead>
    <tr>
      <th>Classe/interface</th>
      <th>Métodos e usos principais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Path</code></td>
      <td><code>of</code>, <code>resolve</code>, <code>normalize</code>, <code>toAbsolutePath</code>, <code>getFileName</code>, <code>getParent</code>.</td>
    </tr>
    <tr>
      <td><code>Paths</code></td>
      <td><code>get</code>. Fábrica legada/conveniente para criar <code>Path</code>; aparece muito em código anterior a <code>Path.of</code>.</td>
    </tr>
    <tr>
      <td><code>Files</code></td>
      <td><code>exists</code>, <code>isRegularFile</code>, <code>createDirectories</code>, <code>readString</code>, <code>readAllLines</code>, <code>writeString</code>, <code>copy</code>, <code>move</code>, <code>deleteIfExists</code>, <code>list</code>, <code>walk</code>.</td>
    </tr>
    <tr>
      <td><code>StandardOpenOption</code></td>
      <td><code>CREATE</code>, <code>CREATE_NEW</code>, <code>APPEND</code>, <code>TRUNCATE_EXISTING</code>, <code>READ</code>, <code>WRITE</code>.</td>
    </tr>
    <tr>
      <td><code>StandardCopyOption</code></td>
      <td><code>REPLACE_EXISTING</code>, <code>COPY_ATTRIBUTES</code>, <code>ATOMIC_MOVE</code>.</td>
    </tr>
    <tr>
      <td><code>StandardCharsets</code></td>
      <td><code>UTF_8</code>, <code>US_ASCII</code>, <code>ISO_8859_1</code>. Define codificações padrão para converter bytes e caracteres.</td>
    </tr>
    <tr>
      <td><code>Scanner</code></td>
      <td><code>nextLine</code>, <code>next</code>, <code>nextDouble</code>, <code>hasNext</code>, <code>useDelimiter</code>. Leitura de dados do console ou de arquivos.</td>
    </tr>
    <tr>
      <td><code>Formatter</code></td>
      <td><code>format</code>. Escrita formatada de texto em arquivo usando especificadores semelhantes ao <code>printf</code>.</td>
    </tr>
    <tr>
      <td><code>FileSystems</code></td>
      <td><code>getDefault</code>, <code>getFileSystem</code>, <code>newFileSystem</code>. Acesso a sistemas de arquivos locais ou especiais.</td>
    </tr>
    <tr>
      <td><code>FileSystem</code></td>
      <td><code>getPath</code>, <code>getSeparator</code>, <code>getRootDirectories</code>, <code>isReadOnly</code>, <code>provider</code>.</td>
    </tr>
    <tr>
      <td><code>DirectoryStream</code></td>
      <td><code>iterator</code>, <code>close</code>. Usado com <code>Files.newDirectoryStream</code> para percorrer diretórios.</td>
    </tr>
  </tbody>
</table>

---

# java.nio.file: fluxo de trabalho

<img src="../images/12-nio-workflow.png">

---

<!-- _class: practice -->
<!-- _paginate: false -->

# java.nio.file: demonstração

<iframe
  class="compiler-frame"
  src="https://onecompiler.com/embed/java/44qtqw3s9?hideTitle=false&hideLanguageSelection=false&hideNew=false&hideNewFileOption=false&hideStdin=false&hideResult=false&hideEditorOptions=false&availableLanguages=true&disableAutoComplete=true&theme=light&fontSize=20"
  title="OneCompiler Java"
  allow="clipboard-read; clipboard-write"
></iframe>

---

<!-- _class: compact -->

# java.io: visão geral

> `java.io` é a API clássica do Java para entrada e saída de dados, organizada em classes que leem e escrevem bytes, caracteres, arquivos e objetos serializados.

**Famílias principais**

- `File`: representa um caminho abstrato de arquivo ou diretório
- `Reader` / `Writer`: leitura e escrita de caracteres
- `FileReader` / `FileWriter`: leitura e escrita de caracteres em arquivos
- `BufferedReader` / `BufferedWriter`: leitura e escrita textual com buffer
- `InputStream` / `OutputStream`: leitura e escrita de bytes
- `ObjectInputStream` / `ObjectOutputStream`: serialização binária de objetos
- `IOException`: erro comum em operações de entrada e saída

---

# java.io: famílias de streams

<img src="../images/12-io-hierarchy.png">

---

<!-- _class: compact -->

# java.io: File

<div class="columns">
<div>

> `File` representa um caminho abstrato para arquivo ou diretório.

Principais métodos:

- `exists()`: verifica se existe
- `isFile()`: verifica se é arquivo
- `isDirectory()`: verifica se é diretório
- `getName()`: retorna o nome
- `getAbsolutePath()`: retorna caminho absoluto
- `length()`: retorna tamanho em bytes
- `toPath()`: converte para `Path`

</div>
<div>

```java
File file = new File("dados.txt");

System.out.println(file.exists());
System.out.println(file.isFile());
System.out.println(file.getName());
System.out.println(file.getAbsolutePath());
System.out.println(file.length());

Path path = file.toPath();
```

<div class="callout">

Em código novo, prefira `Path` e `Files`; use `File` principalmente para entender ou manter código legado.

</div>

</div>
</div>

---

# java.io: Writer

<div class="columns">
<div>

> `Writer` é a base para escrever caracteres em Java.

Principais subclasses para saída de texto:

- em arquivos: `FileWriter`
- com buffer: `BufferedWriter`
- adaptando caracteres para bytes: `OutputStreamWriter`

</div>
<div>

<img src="../images/12-file-classes-java.io-Witer.png">

</div>
</div>

---

<!-- _class: compact -->

# java.io: FileWriter

<div class="columns">
<div>

> `FileWriter` escreve caracteres diretamente em um arquivo.

Principais métodos herdados de `Writer`:

- `write(String)`: escreve texto
- `write(char[])`: escreve caracteres
- `append(CharSequence)`: acrescenta texto
- `flush()`: força a saída pendente
- `close()`: fecha o recurso

Use quando a escrita é simples e não exige controle fino de charset.

</div>
<div>

```java
try (FileWriter writer =
         new FileWriter("mensagem.txt")) {

    writer.write("Primeira linha\n");
    writer.write("Segunda linha\n");
    writer.append("Fim\n");
} catch (IOException e) {
    System.err.println(
        "Erro: " + e.getMessage()
    );
}
```

</div>
</div>

---

<!-- _class: compact -->

# java.io: BufferedWriter

<div class="columns">
<div>

> `BufferedWriter` envolve outro `Writer` e usa buffer para tornar a escrita textual mais eficiente.

Principais métodos:

- `write(String)`: escreve texto
- `newLine()`: escreve quebra de linha
- `flush()`: descarrega o buffer
- `close()`: fecha o recurso

Use quando houver muitas escritas pequenas ou escrita linha a linha.

</div>
<div>

```java
try (BufferedWriter writer =
         new BufferedWriter(
             new FileWriter("log.txt"))) {

    writer.write("Aplicacao iniciada");
    writer.newLine();

    writer.write("Usuario: Ana");
    writer.newLine();
} catch (IOException e) {
    System.err.println(
        "Erro: " + e.getMessage()
    );
}
```

</div>
</div>

---

# java.io: Reader

<div class="columns">
<div>

> `Reader` é a base para ler caracteres em Java.

Principais subclasses para entrada de texto:

- de arquivos: `FileReader`
- com buffer: `BufferedReader`
- adaptando bytes para caracteres: `InputStreamReader`

</div>
<div>

<img src="../images/12-file-classes-java.io-Reader.png">

</div>
</div>

---

<!-- _class: compact -->

# java.io: FileReader

<div class="columns">
<div>

> `FileReader` lê caracteres diretamente de um arquivo.

Principais métodos herdados de `Reader`:

- `read()`: lê um caractere
- `read(char[])`: lê vários caracteres
- `skip(long)`: pula caracteres
- `close()`: fecha o recurso

Use quando a leitura é simples e não precisa ser linha a linha.

</div>
<div>

```java
try (FileReader reader =
         new FileReader("mensagem.txt")) {

    int caractere;

    while ((caractere = reader.read()) != -1) {
        System.out.print((char) caractere);
    }
} catch (IOException e) {
    System.err.println(
        "Erro: " + e.getMessage()
    );
}
```

</div>
</div>

---

<!-- _class: compact -->

# java.io: BufferedReader

<div class="columns">
<div>

> `BufferedReader` envolve outro `Reader` e usa buffer para tornar a leitura textual mais eficiente.

Principais métodos:

- `readLine()`: lê uma linha
- `read()`: lê um caractere
- `lines()`: retorna um `Stream<String>`
- `close()`: fecha o recurso

Use quando quiser ler texto linha a linha.

</div>
<div>

```java
try (BufferedReader reader =
         new BufferedReader(
             new FileReader("mensagem.txt"))) {

    String linha;

    while ((linha = reader.readLine()) != null) {
        System.out.println(linha);
    }
} catch (IOException e) {
    System.err.println(
        "Erro: " + e.getMessage()
    );
}
```

</div>
</div>

---

<!-- _class: practice -->
<!-- _paginate: false -->

# java.io: Reader e Writer

<iframe
  class="compiler-frame"
  src="https://onecompiler.com/embed/java/44r5h796b?hideTitle=false&hideLanguageSelection=false&hideNew=false&hideNewFileOption=false&hideStdin=false&hideResult=false&hideEditorOptions=false&availableLanguages=true&disableAutoComplete=true&theme=light&fontSize=20"
  title="OneCompiler Java"
  allow="clipboard-read; clipboard-write"
></iframe>

---

<!-- _class: compact -->

# java.io: OutputStream

<div class="columns">
<div>

> `OutputStream` é a base para escrever bytes em Java.

Principais subclasses para saída de dados:

- em arquivos: `FileOutputStream`
- com buffer: `BufferedOutputStream`
- com tipos primitivos: `DataOutputStream`
- com objetos serializados: `ObjectOutputStream`

</div>
<div>

<img src="../images/12-file-classes-java.io-outputstream.png">

</div>
</div>

---

<!-- _class: compact -->

# java.io: InputStream

<div class="columns">
<div>

> `InputStream` é a base para ler bytes em Java.

Principais subclasses para entrada de dados:

- de arquivos: `FileInputStream`
- com buffer: `BufferedInputStream`
- com tipos primitivos: `DataInputStream`
- com objetos serializados: `ObjectInputStream`

</div>
<div>

<img src="../images/12-file-classes-java.io-InputStream.png">

</div>
</div>

---

<!-- _class: practice -->
<!-- _paginate: false -->

# java.io: InputStream e OutputStream

<iframe
  class="compiler-frame"
  src="https://onecompiler.com/embed/java/44r7ndarr?hideTitle=false&hideLanguageSelection=false&hideNew=false&hideNewFileOption=false&hideStdin=false&hideResult=false&hideEditorOptions=false&availableLanguages=true&disableAutoComplete=true&theme=light&fontSize=20"
  title="OneCompiler Java"
  allow="clipboard-read; clipboard-write"
></iframe>

---

# Arquivos binários

```java
Path origem = Path.of("imagens", "foto.png");
Path destino = Path.of("backup", "foto.png");

try {
    Files.createDirectories(destino.getParent());

    byte[] bytes = Files.readAllBytes(origem);
    Files.write(destino, bytes);
} catch (IOException e) {
    System.err.println("Erro ao copiar bytes: " + e.getMessage());
}
```

Para arquivos grandes, prefira copiar com `Files.copy` ou processar por streams/buffers.

---

# Serialização de objetos: visão geral

> Serializar é gravar o estado de um objeto em um fluxo de dados (**stream**).

- A serialização transforma um objeto Java em uma sequência de bytes.
- A desserialização reconstrói o objeto a partir desses bytes.
- A classe do objeto precisa implementar `Serializable`.
- A escrita usa `ObjectOutputStream`; a leitura usa `ObjectInputStream`.
- É adequada para cenários internos e controlados, não para troca pública entre sistemas.
- Para integração entre sistemas, prefira formatos abertos e interoperáveis como CSV, JSON, XML ou banco de dados.

---

<!-- _class: practice -->
<!-- _paginate: false -->

# Serialização de objetos: demonstração

<iframe
  class="compiler-frame"
  src="https://onecompiler.com/embed/java/44r7r2emj?hideTitle=false&hideLanguageSelection=false&hideNew=false&hideNewFileOption=false&hideStdin=false&hideResult=false&hideEditorOptions=false&availableLanguages=true&disableAutoComplete=true&theme=light&fontSize=20"
  title="OneCompiler Java"
  allow="clipboard-read; clipboard-write"
></iframe>

---

# try-with-resources

Recursos de I/O precisam ser fechados.

```java
try (BufferedReader reader = Files.newBufferedReader(path)) {
    String linha = reader.readLine();
    System.out.println(linha);
} catch (IOException e) {
    System.err.println("Erro ao ler arquivo: " + e.getMessage());
}
```

O `try-with-resources` fecha automaticamente objetos que implementam `AutoCloseable`, incluindo muitos objetos de `java.io` e `java.nio`.

---

# try-with-resources: ciclo de vida de um recurso

<img src="../images/12-resource-lifecycle.png" style="display:block; max-width:100%; max-height:460px; margin:0 auto; object-fit:contain;">

---

# Ler linhas com Files.readAllLines

```java
Path path = Path.of("data", "alunos.csv");

try {
    List<String> linhas = Files.readAllLines(path, StandardCharsets.UTF_8);

    for (String linha : linhas) {
        System.out.println(linha);
    }
} catch (IOException e) {
    System.err.println("Erro de leitura: " + e.getMessage());
}
```

`readAllLines` carrega todas as linhas em memória.

Use quando o arquivo cabe confortavelmente na memória.

---

<!-- _class: compact -->

# Processar arquivo grande com Files.lines

```java
Path path = Path.of("data", "acessos.log");

try (Stream<String> linhas = Files.lines(path, StandardCharsets.UTF_8)) {
    long erros = linhas
        .filter(linha -> linha.contains("ERROR"))
        .count();

    System.out.println("Erros: " + erros);
} catch (IOException e) {
    System.err.println("Erro ao processar log: " + e.getMessage());
}
```

`Files.lines` devolve um `Stream<String>` e precisa ser fechado.

---

<!-- _class: compact -->

# Diretórios com Files

```java
Path dir = Path.of("data");

try {
    Files.createDirectories(dir);

    try (Stream<Path> arquivos = Files.list(dir)) {
        arquivos
            .filter(Files::isRegularFile)
            .forEach(System.out::println);
    }
} catch (IOException e) {
    System.err.println("Erro no diretorio: " + e.getMessage());
}
```

`Files.list` lista apenas o nível atual do diretório.

---

<!-- _class: compact -->

# Percorrer árvore com Files.walk

```java
Path raiz = Path.of("data");

try (Stream<Path> caminhos = Files.walk(raiz)) {
    caminhos
        .filter(Files::isRegularFile)
        .filter(path -> path.toString().endsWith(".csv"))
        .forEach(System.out::println);
} catch (IOException e) {
    System.err.println("Erro ao percorrer: " + e.getMessage());
}
```

`Files.walk` percorre recursivamente a árvore de diretórios.

---

<!-- _class: compact -->

# BufferedReader e BufferedWriter

```java
Path entrada = Path.of("data", "entrada.txt");
Path saida = Path.of("data", "saida.txt");

try (
    BufferedReader reader =
        Files.newBufferedReader(entrada, StandardCharsets.UTF_8);
    BufferedWriter writer =
        Files.newBufferedWriter(saida, StandardCharsets.UTF_8)
) {
    String linha;

    while ((linha = reader.readLine()) != null) {
        writer.write(linha.toUpperCase());
        writer.newLine();
    }
} catch (IOException e) {
    System.err.println("Erro no processamento: " + e.getMessage());
}
```

Boa escolha para processamento linha a linha.

---

# File: API legada

`java.io.File` representa um caminho abstrato.

```java
File file = new File("data/entrada.txt");

System.out.println(file.exists());
System.out.println(file.isFile());
System.out.println(file.getAbsolutePath());

Path path = file.toPath();
```

<div class="callout">

Em código novo, prefira `Path` e `Files`. Quando encontrar `File` em código legado, use `toPath()` para migrar gradualmente.

</div>

---

# Path vs. File

<table class="tiny">
  <thead>
    <tr>
      <th>Critério</th>
      <th><code>java.io.File</code></th>
      <th><code>java.nio.file.Path</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>API</td>
      <td>Clássica, anterior ao NIO.2.</td>
      <td>Moderna, integrada a <code>Files</code>.</td>
    </tr>
    <tr>
      <td>Operações</td>
      <td>Métodos no próprio objeto.</td>
      <td>Caminho separado das operações.</td>
    </tr>
    <tr>
      <td>Erro</td>
      <td>Muitos métodos retornam <code>false</code>.</td>
      <td>Operações costumam lançar exceções mais informativas.</td>
    </tr>
    <tr>
      <td>Uso recomendado</td>
      <td>Manutenção de código legado.</td>
      <td>Código novo.</td>
    </tr>
  </tbody>
</table>

---

# Canais e buffers

`java.nio.channels.FileChannel` permite I/O com `ByteBuffer`.

```java
Path path = Path.of("data", "binario.dat");

try (FileChannel channel = FileChannel.open(path, StandardOpenOption.READ)) {
    ByteBuffer buffer = ByteBuffer.allocate(1024);

    while (channel.read(buffer) != -1) {
        buffer.flip();
        System.out.println("Bytes lidos: " + buffer.remaining());
        buffer.clear();
    }
} catch (IOException e) {
    System.err.println("Erro no canal: " + e.getMessage());
}
```

Útil quando precisamos de controle fino sobre buffers e canais.

---

# Exceções comuns em I/O

> Em I/O, erros fazem parte do fluxo: arquivos podem não existir, estar protegidos ou ter conteúdo inesperado.

<table class="tiny">
  <thead>
    <tr>
      <th>Exceção</th>
      <th>Situação comum</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>NoSuchFileException</code></td>
      <td>O arquivo informado não existe.</td>
    </tr>
    <tr>
      <td><code>AccessDeniedException</code></td>
      <td>O programa não tem permissão de leitura, escrita ou remoção.</td>
    </tr>
    <tr>
      <td><code>FileAlreadyExistsException</code></td>
      <td>Uma criação com <code>CREATE_NEW</code> encontrou arquivo existente.</td>
    </tr>
    <tr>
      <td><code>DirectoryNotEmptyException</code></td>
      <td>Tentativa de apagar diretório com conteúdo.</td>
    </tr>
    <tr>
      <td><code>MalformedInputException</code></td>
      <td>Bytes do arquivo não combinam com o charset usado para leitura.</td>
    </tr>
    <tr>
      <td><code>InputMismatchException</code></td>
      <td><code>Scanner</code> encontrou token incompatível com o tipo esperado.</td>
    </tr>
  </tbody>
</table>

---

# Boas práticas

- Prefira `Path` e `Files` em código novo
- Use `try-with-resources` para fechar recursos
- Informe `Charset` ao ler ou escrever texto
- Use `readString` e `readAllLines` apenas para arquivos pequenos
- Use `BufferedReader`, `Files.lines` ou streams para arquivos grandes
- Crie diretórios antes de escrever em caminhos novos
- Evite sobrescrever arquivos importantes sem intenção
- Separe parsing de dados da lógica de I/O
- Valide formato, permissões e existência do arquivo

---

# Critérios de escolha

<table class="tiny">
  <thead>
    <tr>
      <th>Necessidade</th>
      <th>Escolha comum</th>
      <th>Motivo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ler arquivo de texto pequeno</td>
      <td><code>Files.readString</code></td>
      <td>Simples e direto.</td>
    </tr>
    <tr>
      <td>Ler linhas de arquivo pequeno</td>
      <td><code>Files.readAllLines</code></td>
      <td>Retorna <code>List&lt;String&gt;</code>.</td>
    </tr>
    <tr>
      <td>Processar arquivo grande</td>
      <td><code>BufferedReader</code> ou <code>Files.lines</code></td>
      <td>Processamento incremental.</td>
    </tr>
    <tr>
      <td>Escrever relatório textual</td>
      <td><code>BufferedWriter</code>, <code>PrintWriter</code> ou <code>Formatter</code></td>
      <td>Controle de linhas e formatação.</td>
    </tr>
    <tr>
      <td>Copiar arquivo</td>
      <td><code>Files.copy</code></td>
      <td>Operação pronta da API.</td>
    </tr>
    <tr>
      <td>Dados binários</td>
      <td><code>InputStream</code>, <code>OutputStream</code>, <code>Files.copy</code></td>
      <td>Preserva bytes sem interpretar texto.</td>
    </tr>
  </tbody>
</table>

---

<!-- _class: compact -->

# Demonstração: criar e ler arquivo

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class DemoArquivo {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("data", "mensagem.txt");

        Files.createDirectories(path.getParent());
        Files.writeString(path, "POO com arquivos\n", StandardCharsets.UTF_8);

        String conteudo = Files.readString(path, StandardCharsets.UTF_8);
        System.out.println(conteudo);
    }
}
```

<!-- TODO: substituir por iframe OneCompiler quando o link da demo for enviado. -->

---

<!-- _class: compact -->

# Demonstração: processar CSV

```java
record Aluno(String nome, double nota) {}

Path path = Path.of("data", "notas.csv");

try (Stream<String> linhas = Files.lines(path, StandardCharsets.UTF_8)) {
    List<Aluno> aprovados = linhas
        .skip(1)
        .map(linha -> linha.split(","))
        .map(colunas -> new Aluno(
            colunas[0],
            Double.parseDouble(colunas[1])
        ))
        .filter(aluno -> aluno.nota() >= 7.0)
        .toList();

    aprovados.forEach(System.out::println);
}
```

<!-- TODO: substituir por iframe OneCompiler quando o link da demo for enviado. -->

---

<!-- _class: compact -->

# Demonstração: relatório de frequência

```java
Path path = Path.of("data", "acessos.log");

try (Stream<String> linhas = Files.lines(path, StandardCharsets.UTF_8)) {
    Map<String, Long> frequencia = linhas
        .map(linha -> linha.split(" ")[0])
        .collect(Collectors.groupingBy(
            ip -> ip,
            Collectors.counting()
        ));

    frequencia.entrySet().stream()
        .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
        .limit(5)
        .forEach(System.out::println);
}
```

<!-- TODO: substituir por iframe OneCompiler quando o link da demo for enviado. -->

---

<!-- _class: practice -->
<!-- _paginate: false -->

# Exercício: agenda em arquivo

Construa um programa que mantenha contatos em `data/contatos.csv`.

Cada contato deve ter:

- nome
- e-mail
- telefone

O programa deve:

- criar o arquivo se ele não existir
- adicionar novos contatos sem apagar os anteriores
- listar os contatos cadastrados
- ignorar linhas vazias

<!-- TODO: substituir por challenge OneCompiler quando o link for enviado. -->

---

<!-- _class: practice -->
<!-- _paginate: false -->

# Exercício: analisador de notas

Leia um arquivo `data/notas.csv` no formato:

```text
nome,nota
Ana,9.5
Bruno,6.8
Carla,8.1
```

O programa deve:

- calcular a média da turma
- listar estudantes aprovados
- gravar `data/aprovados.txt`
- tratar arquivo ausente e nota inválida

<!-- TODO: substituir por challenge OneCompiler quando o link for enviado. -->

---

<!-- _class: practice -->
<!-- _paginate: false -->

# Exercício: organizador de arquivos

Crie um programa que leia todos os arquivos de uma pasta `entrada`.

O programa deve:

- criar uma pasta `saida`
- copiar arquivos `.txt` para `saida/textos`
- copiar arquivos `.csv` para `saida/planilhas`
- ignorar subdiretórios
- imprimir um resumo da quantidade copiada por tipo

<!-- TODO: substituir por challenge OneCompiler quando o link for enviado. -->

---

# Checklist mental

Antes de escrever código de arquivo, pergunte:

- O caminho é relativo ou absoluto?
- O arquivo precisa existir antes da leitura?
- O diretório de destino existe?
- O conteúdo é texto ou binário?
- Qual charset será usado?
- O arquivo cabe em memória?
- A escrita deve substituir ou acrescentar?
- Qual exceção deve ser tratada de forma específica?
- O recurso será fechado automaticamente?

---

# Arquitetura geral de I/O

<img src="../images/12-file-classes.png">

---

# Manipulação de arquivos: mapa da aula

<img src="../images/12-file-mindmap.png">

---

# Referências oficiais

- Oracle Java Tutorial: Basic I/O
  - https://docs.oracle.com/javase/tutorial/essential/io/
- Oracle Java Tutorial: File I/O com NIO.2
  - https://docs.oracle.com/javase/tutorial/essential/io/fileio.html
- Oracle Java Tutorial: try-with-resources
  - https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html
- Java SE API: `java.io`
  - https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/package-summary.html
- Java SE API: `java.nio.file`
  - https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/package-summary.html

<script src="../scripts/onecompiler-challenge.js"></script>
