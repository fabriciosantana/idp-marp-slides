---
marp: true
theme: idp
paginate: false
html: true
footer: <span>Programação Orientada a Objetos</span><span>Acesso a banco de dados com JDBC</span><span>Prof. Fabricio Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

## Programação Orientada a Objetos

# Acesso a banco de dados com JDBC

<div class="objectives">

**Objetivos da aula**

- Revisar conceitos de bancos relacionais e SQL
- Compreender o papel da API JDBC em aplicações Java
- Conectar uma aplicação Java a um banco usando `DriverManager` e `Connection`
- Usar `Statement`, `PreparedStatement` e `ResultSet`
- Executar `SELECT`, `INSERT`, `UPDATE` e `DELETE`
- Tratar exceções com `SQLException`
- Controlar transações com `commit` e `rollback`
- Organizar acesso a dados com uma camada DAO

</div>

<div class="contact">
Prof. Fabricio Santana<br>
fabricio.santana@idp.edu.br<br>
www.linkedin.com/in/fabriciofsantana/
</div>

---

# Por que banco de dados?

- Variáveis, objetos, arrays e coleções ficam em memória
  - ao encerrar o programa, esses dados desaparecem
- Arquivos permitem persistência, mas têm limites importantes
  - concorrência difícil
  - busca e filtro manuais
  - integridade depende do código da aplicação
  - relatórios e cruzamentos ficam trabalhosos
- Bancos de dados oferecem persistência com estrutura, consulta, segurança, transações e controle de acesso

---

# Banco de dados: o que é?

> Banco de dados é uma coleção organizada de dados relacionados, mantida para permitir armazenamento, recuperação, alteração e controle desses dados.

<div class="callout">

**Ideia central**

Em vez de salvar apenas bytes ou linhas de texto, a aplicação conversa com um sistema especializado em armazenar dados, validar regras e responder consultas.

</div>

---

<!-- _class: compact -->

# Tipos de banco de dados

Existem diferentes tipos de banco de dados, cada um otimizado para uma forma de organizar, consultar e escalar os dados.

<table class="tiny">
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Características principais</th>
      <th>Cenário recomendado</th>
      <th>Exemplos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Relacional</td>
      <td>Tabelas, SQL, chaves e restrições de integridade.</td>
      <td>Sistemas transacionais, cadastros, financeiro e acadêmico.</td>
      <td>PostgreSQL, MySQL, Oracle</td>
    </tr>
    <tr>
      <td>Documento</td>
      <td>Registros flexíveis em JSON/BSON.</td>
      <td>Conteúdo semiestruturado, catálogos, perfis e APIs.</td>
      <td>MongoDB, CouchDB</td>
    </tr>
    <tr>
      <td>Chave-valor</td>
      <td>Acesso simples por chave e baixa latência.</td>
      <td>Cache, sessões, preferências e busca por identificador.</td>
      <td>Redis, DynamoDB</td>
    </tr>
    <tr>
      <td>Colunar</td>
      <td>Dados organizados por colunas; bom para agregações.</td>
      <td>Relatórios, BI, data warehouse e histórico.</td>
      <td>BigQuery, Redshift, ClickHouse</td>
    </tr>
    <tr>
      <td>Grafo</td>
      <td>Nós e relacionamentos como centro do modelo.</td>
      <td>Redes sociais, recomendações, fraude e rotas.</td>
      <td>Neo4j, Amazon Neptune</td>
    </tr>
    <tr>
      <td>Vetorial</td>
      <td>Armazena vetores e busca por similaridade semântica.</td>
      <td>Busca semântica, RAG, recomendação e IA generativa.</td>
      <td>Pinecone, Weaviate, Milvus, pgvector</td>
    </tr>
  </tbody>
</table>

---

# SGBD: o que é?

**SGBD** significa Sistema Gerenciador de Banco de Dados.

Em inglês, aparece como **DBMS**: _Database Management System_.

**Responsabilidades comuns**

- armazenar dados em estruturas persistentes
- controlar acesso de vários usuários
- aplicar restrições de integridade
- recuperar dados com linguagem de consulta
- controlar transações e concorrência
- oferecer mecanismos de backup, auditoria e segurança

---

<!-- _class: compact -->

# Banco de dados relacional: visão geral

Bancos de dados relacionais organizam informações

- em tabelas (**entidades**)
- conectadas por chaves (**relacionamento**),
- permitindo consultar (**_query_**) e
- manipular dados (**_manipulation_**)
- impondo restrições explícitas

### Conceitos importantes

<table class="tiny">
  <thead>
    <tr>
      <th>Conceito</th>
      <th>Descrição</th>
      <th>Exemplo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tabela</td>
      <td>Conjunto de linhas com a mesma estrutura.</td>
      <td><code>aluno</code>, <code>curso</code>, <code>matricula</code></td>
    </tr>
    <tr>
      <td>Coluna</td>
      <td>Atributo tipado da tabela.</td>
      <td><code>nome VARCHAR</code>, <code>nota NUMERIC</code></td>
    </tr>
    <tr>
      <td>Linha</td>
      <td>Registro com valores para as colunas.</td>
      <td>Um aluno específico.</td>
    </tr>
    <tr>
      <td>Chave primária</td>
      <td>Identifica uma linha de forma única.</td>
      <td><code>id</code></td>
    </tr>
    <tr>
      <td>Chave estrangeira</td>
      <td>Relaciona uma linha a outra tabela.</td>
      <td><code>curso_id</code></td>
    </tr>
  </tbody>
</table>

---

<!-- _class: compact -->

# Modelo entidade-relacionamento

<div class="columns">
<div>

O modelo entidade-relacionamento descreve os principais conceitos do domínio (**entidade**), seus atributos e como eles se relacionam (**relacionamento**).

</div>
<div>

<img src="../images/13-bank-er-diagram.png" style="display:block; max-width:100%; max-height:420px; margin:0 auto; object-fit:contain;">

</div>
</div>

---

# SQL: linguagem do banco relacional

**SQL** significa _Structured Query Language_.

Ela permite descrever o que queremos consultar ou alterar no banco.

<table class="tiny">
  <thead>
    <tr>
      <th>Categoria</th>
      <th>Comandos comuns</th>
      <th>Uso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DQL<br><em>Data Query Language</em></td>
      <td><code>SELECT</code></td>
      <td>Recuperar dados.</td>
    </tr>
    <tr>
      <td>DML<br><em>Data Manipulation Language</em></td>
      <td><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></td>
      <td>Manipular registros.</td>
    </tr>
    <tr>
      <td>DDL<br><em>Data Definition Language</em></td>
      <td><code>CREATE TABLE</code>, <code>ALTER TABLE</code>, <code>DROP</code></td>
      <td>Definir estrutura.</td>
    </tr>
    <tr>
      <td>TCL<br><em>Transaction Control Language</em></td>
      <td><code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code></td>
      <td>Controlar transações.</td>
    </tr>
  </tbody>
</table>

---

<!-- _class: compact -->

# SQL: exemplo de consulta

```sql
SELECT c.nome, ct.numero, ct.tipo, ct.saldo
FROM cliente c
JOIN conta ct ON ct.id_cliente = c.id_cliente
JOIN agencia a ON a.id_agencia = ct.id_agencia
WHERE a.cidade = 'Brasilia'
ORDER BY c.nome, ct.numero;
```

**Leitura da consulta**

- `SELECT`: quais colunas retornar
- `FROM`: tabela principal da consulta
- `JOIN`: relação entre tabelas por chaves
- `WHERE`: filtro aplicado às linhas
- `ORDER BY`: ordenação do resultado

> A consulta lista contas de clientes em uma cidade.

---

<!-- _class: compact -->

# SQL: exemplo de inserção

```sql
INSERT INTO conta (
    numero,
    tipo,
    saldo,
    id_cliente,
    id_agencia
) VALUES (
    '000123-4',
    'CORRENTE',
    1500.00,
    1,
    2
);
```

**Leitura do comando**

- `INSERT INTO`: tabela que receberá o novo registro
- lista de colunas: define quais campos serão preenchidos
- `VALUES`: informa os valores a serem gravados

> A inserção cria uma nova conta vinculada a um cliente e a uma agência.

---

<!-- _class: compact -->

# SQL: exemplo de atualização

```sql
UPDATE conta
SET saldo = 1750.00
WHERE numero = '000123-4';
```

**Leitura do comando**

- `UPDATE`: tabela que será alterada
- `SET`: coluna e novo valor
- `WHERE`: filtro que define qual registro será atualizado

> A atualização altera o saldo da conta informada.

---

<!-- _class: compact -->

# SQL: exemplo de deleção

```sql
DELETE FROM transacao
WHERE id_transacao = 10;
```

**Leitura do comando**

- `DELETE FROM`: tabela de onde o registro será removido
- `WHERE`: filtro que define qual linha será excluída

> A deleção remove uma transação específica.

---

# Do Java para o SQL: operações CRUD

Operações comuns de uma aplicação aparecem como comandos SQL.

<table class="tiny">
  <thead>
    <tr>
      <th>Operação</th>
      <th>Significado</th>
      <th>SQL comum</th>
      <th>Exemplo de método Java</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Create</td>
      <td>Criar registro</td>
      <td><code>INSERT</code></td>
      <td><code>salvar(aluno)</code></td>
    </tr>
    <tr>
      <td>Read</td>
      <td>Ler registros</td>
      <td><code>SELECT</code></td>
      <td><code>buscarPorId(id)</code></td>
    </tr>
    <tr>
      <td>Update</td>
      <td>Atualizar registro</td>
      <td><code>UPDATE</code></td>
      <td><code>atualizar(aluno)</code></td>
    </tr>
    <tr>
      <td>Delete</td>
      <td>Excluir registro</td>
      <td><code>DELETE</code></td>
      <td><code>remover(id)</code></td>
    </tr>
  </tbody>
</table>

---

<!-- _class: compact -->

# Do modelo relacional ao modelo de classes

Uma aplicação orientada a objetos costuma representar, em **classes**, os mesmos conceitos que o banco relacional organiza em **tabelas**.

<div class="columns">
<div>

**Diagrama ER**

<img src="../images/13-bank-er-diagram.png" style="display:block; max-width:100%; max-height:390px; margin:0 auto; object-fit:contain;">

</div>
<div>

**Diagrama de classes**

<img src="../images/13-bank-class-diagram.png" style="display:block; max-width:100%; max-height:390px; margin:0 auto; object-fit:contain;">

</div>
</div>

---

# JDBC API: o que é?

**JDBC** significa _Java Database Connectivity_.

> JDBC é a API padrão do Java para conectar aplicações a bancos de dados relacionais, executar comandos SQL e processar resultados.

**Papel do JDBC**

- padronizar o código Java de acesso a dados
- esconder parte das diferenças entre fornecedores de banco
- permitir que drivers específicos façam a comunicação real com o SGBD

---

<!-- _class: compact -->

# JDBC API: arquitetura cliente-servidor

Na arquitetura cliente-servidor, a aplicação cliente envia requisições ao servidor de banco de dados, que processa os comandos e devolve os resultados.

<img src="../images/13-jdbc-client-server.png" style="display:block; max-width:100%; max-height:380px; margin:12px auto; object-fit:contain;">

Para que essa comunicação aconteça, a aplicação precisa de um driver JDBC compatível com o banco que será acessado.

---

<!-- _class: compact -->

# JDBC API: driver

> Driver JDBC é uma biblioteca que oferece uma implementação concreta da API JDBC e gerencia a comunicação entre a aplicação Java e um banco de dados.

**Exemplos**

- PostgreSQL: driver PostgreSQL JDBC
- MySQL: MySQL Connector/J
- Oracle: Oracle JDBC Driver
- SQL Server: Microsoft JDBC Driver

<div class="callout">

**Regra**

O código usa as interfaces do JDBC; o driver traduz essas chamadas para o protocolo do banco.

</div>

---

# JDBC API: URL de conexão (_conection string_)

Para conectar, a aplicação informa uma URL JDBC.

```text
jdbc:subprotocolo://host:porta/banco
```

**Exemplos**

```text
jdbc:postgresql://localhost:5432/escola
jdbc:mysql://localhost:3306/escola
jdbc:h2:mem:escola
jdbc:sqlite:escola.db
```

Além da URL, normalmente usamos usuário e senha.

---

# Arquitetura de conexão com banco de dados

## Cenário típico de conexão com banco de dados

<img src="../images/13-postgresql-architecture.png" style="display:block; max-width:100%; max-height:460px; margin:0 auto; object-fit:contain;">

---

<!-- _class: compact -->

# Estrutura básica de um programa

Estrutura básica de um programa java para acessar banco de dados.

```java
try {
    // 1. estabelecer conexão com o banco
    // 2. criar Statement ou PreparedStatement
    // 3. executar SQL
    // 4. processar ResultSet ou linhas afetadas
} catch (SQLException e) {
    // tratar erro de banco
} finally {
    // fechar ResultSet, Statement e Connection
}
```

Prefira usar `try-with-resources` para fechamento automático dos recursos.

---

# JDBC API: onde fica?

A API principal está no pacote `java.sql`.

Funcionalidades complementares aparecem em `javax.sql`.

<table class="tiny">
  <thead>
    <tr>
      <th>Pacote</th>
      <th>Papel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>java.sql</code></td>
      <td>Interfaces e classes centrais: <code>DriverManager</code>, <code>Connection</code>, <code>Statement</code>, <code>PreparedStatement</code>, <code>ResultSet</code>, <code>SQLException</code>.</td>
    </tr>
    <tr>
      <td><code>javax.sql</code></td>
      <td>Recursos mais avançados, como <code>DataSource</code>, pool de conexões e <code>RowSet</code>.</td>
    </tr>
  </tbody>
</table>

---

# JDBC API: interfaces principais

<img src="../images/13-jdbc-api.png" style="display:block; max-width:100%; max-height:460px; margin:0 auto; object-fit:contain;">

---

<!-- _class: compact -->

# java.sql.DriverManager: obter conexão

O `DriverManager` localiza um driver JDBC compatível e devolve uma conexão pronta para a aplicação conversar com o banco de dados.

<div class="columns">
<div>

<img src="../images/13-drivermanager-connection.png" style="display:block; max-width:100%; max-height:360px; margin:0 auto; object-fit:contain;">

</div>
<div>

- `getConnection(url, user, password)`: abre conexão informando URL, usuário e senha
- `getConnection(url)`: abre conexão quando a URL já carrega as demais informações
- `getDriver(url)`: identifica qual driver atende a URL informada

</div>
</div>

---

<!-- _class: compact -->

# java.sql.Connection: sessão com banco de dados

`Connection` representa a sessão aberta entre a aplicação Java e o banco de dados; a partir dela, o programa cria comandos SQL e controla transações.

<div class="columns">
<div>

<img src="../images/13-connection-class.png">

</div>
<div>

- `createStatement()`: cria um `Statement` para executar SQL estático
- `prepareStatement(sql)`: cria um `PreparedStatement` para SQL parametrizado
- `setAutoCommit(boolean)`: define se cada comando será confirmado automaticamente
- `commit()` / `rollback()`: confirma ou desfaz uma transação
- `close()`: fecha a conexão e libera o recurso

</div>
</div>

---

<!-- _class: compact -->

# Conectar a um banco de dados PostgreSQL

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestaConexao {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/escola";
        String user = "postgres";
        String password = "postgres";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println("Conectado!");
        } catch (SQLException e) {
            System.err.println("Falha: " + e.getMessage());
        }
    }
}
```

---

<!-- _class: compact -->

# java.sql.Statement: comando SQL fixo

`Statement` é usado quando o programa precisa executar um comando SQL fixo, escrito diretamente como texto no código.

<div class="columns">
<div>

<img src="../images/13-statement-class.png" style="display:block; max-width:100%; max-height:320px; margin:0 auto; object-fit:contain;">

</div>
<div>

- `executeQuery(sql)`: executa consulta que retorna linhas, normalmente um `SELECT`, e devolve um `ResultSet`
- `executeUpdate(sql)`: executa `INSERT`, `UPDATE`, `DELETE` e devolve a quantidade de linhas afetadas
- `execute(sql)`: executa um comando genérico quando o retorno pode variar e devolve um `boolean`
- `close()`: fecha o statement e libera o recurso

</div>
</div>

---

<!-- _class: compact -->

# java.sql.Statement: exemplo

> Um `Statement` serve bem para SQL fixo que não depende de valores externos e é fácil de ler quando a consulta está toda no código.

<div class="columns">
<div>

O programa cria um `Statement`, executa uma consulta SQL fixa e percorre o `ResultSet` para ler os dados retornados.

</div>
<div>

```java
String sql = """
    SELECT id_conta, numero, saldo
    FROM conta
    ORDER BY numero
    """;

try (
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery(sql)
) {
    while (rs.next()) {
        System.out.println(rs.getString("numero"));
    }
}
```

</div>
</div>

---

<!-- _class: compact -->

# java.sql.Statement: risco de _SQL injection_

> _SQL injection_ é um ataque em que dados maliciosos inseridos em um texto SQL fazem o comando executar algo diferente do esperado.

Evite montar SQL concatenando dados externos.

```java
String email = entradaDoUsuario;

String sql = "SELECT * FROM aluno WHERE email = '" + email + "'";
```

Se a entrada contiver trechos de SQL, o comando final pode fazer algo diferente do esperado.

<div class="callout">

**Recomendação**

Quando houver parâmetro externo, use `PreparedStatement`.

</div>

---

<!-- _class: compact -->

# java.sql.PreparedStatement: exemplo

> Um `PreparedStatement` é ideal quando o SQL depende de parâmetros, porque separa o texto do comando dos parâmetros e ajuda a evitar SQL injection.

<div class="columns">
<div>

- o SQL é preparado com um placeholder `?`
- parâmetros são associados com métodos como `setString`, `setInt` e `setObject`
- `executeQuery()` roda consultas e `executeUpdate()` roda alterações
- `close()` libera o recurso ao final do uso

</div>
<div>

```java
String sql = """
    SELECT id_conta, numero, saldo
    FROM conta
    WHERE id_cliente = ?
    """;

try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setInt(1, 1);

    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getString("numero"));
        }
    }
}
```

</div>
</div>

---

<!-- _class: compact -->

# java.sql.PreparedStatement: INSERT

```java
String sql = """
    INSERT INTO aluno (nome, email, nota)
    VALUES (?, ?, ?)
    """;

try (
    Connection conn = DriverManager.getConnection(url, user, password);
    PreparedStatement ps = conn.prepareStatement(sql)
) {
    ps.setString(1, "Ana");
    ps.setString(2, "ana@email.com");
    ps.setBigDecimal(3, new BigDecimal("9.5"));

    int linhas = ps.executeUpdate();
    System.out.println("Linhas inseridas: " + linhas);
}
```

`executeUpdate` retorna a quantidade de linhas afetadas.

---

<!-- _class: compact -->

# java.sql.PreparedStatement: UPDATE e DELETE

<div class="columns">
<div>

**UPDATE**

```java
String sql = """
    UPDATE aluno
    SET nota = ?
    WHERE id = ?
    """;

try (PreparedStatement ps =
         conn.prepareStatement(sql)) {
    ps.setBigDecimal(1, novaNota);
    ps.setInt(2, id);

    int linhas = ps.executeUpdate();
}
```

</div>
<div>

**DELETE**

```java
String sql = """
    DELETE FROM aluno
    WHERE id = ?
    """;

try (PreparedStatement ps =
         conn.prepareStatement(sql)) {
    ps.setInt(1, id);

    int linhas = ps.executeUpdate();
}
```

</div>
</div>

---

<!-- _class: compact -->

# java.sql.PreparedStatement: benefícios

- **Segurança:** reduz risco de SQL injection
- **Clareza:** SQL e parâmetros ficam separados
- **Tipos:** `setString`, `setInt`, `setBigDecimal`, `setObject`
- **Reuso:** o mesmo comando pode ser executado várias vezes com valores diferentes
- **Performance:** o banco pode reaproveitar o plano de execução em alguns cenários

```java
ps.setString(1, aluno.getNome());
ps.setString(2, aluno.getEmail());
ps.setBigDecimal(3, aluno.getNota());
```

---

<!-- _class: compact -->

# java.sql.CallableStatement: _stored procedures_

`CallableStatement` é usado para chamar procedures e funções definidas no próprio banco de dados, inclusive com parâmetros de entrada e saída.

<div class="columns">
<div>

<img src="../images/13-callablestatement-class.png" style="display:block; max-width:100%; max-height:320px; margin:0 auto; object-fit:contain;">

</div>
<div>

- `registerOutParameter(index, type)`: registra um parâmetro de saída
- `setObject(index, value)`: envia um valor de entrada para a procedure ou função
- `execute()`: executa a chamada
- `getObject(index)`: lê um valor retornado pelo banco
- `close()`: fecha o callable statement

</div>
</div>

---

<!-- _class: compact -->

# java.sql.CallableStatement: exemplo

> `CallableStatement` é a classe usada quando a aplicação Java precisa chamar uma rotina já definida dentro do banco de dados.

<div class="columns">
<div>

- `CallableStatement` executa stored procedures e funções armazenadas no banco.
- Use `prepareCall("{ call nome(?, ?) }")` para criar a chamada.
- `setXxx(index, value)` define parâmetros de entrada.
- `registerOutParameter(index, type)` define parâmetros de saída.
- `execute()` roda a rotina e `getXxx(index)` lê o valor de saída.
- Esse mecanismo permite encapsular lógica no banco e integrá-la ao fluxo Java.

</div>
<div>

**Stored Procedure**

```sql
CREATE PROCEDURE recalcular_saldo (IN p_id_conta INT)
BEGIN
    UPDATE conta
    SET saldo = saldo + 100
    WHERE id_conta = p_id_conta;
END;
```

**CallableStatement**

```java
String sql = "{ call recalcular_saldo(?) }";

try (CallableStatement cs = conn.prepareCall(sql)) {
    cs.setInt(1, 10);
    cs.execute();
}
```

</div>
</div>

---

<!-- _class: compact -->

# java.sql.ResultSet: exemplo

`ResultSet` encapsula o resultado de uma consulta SQL e fornece métodos para navegar e ler cada linha retornada.

<div class="columns">
<div>

<img src="../images/13-resultset-overview.png" style="display:block; max-width:100%; max-height:420px; margin:0 auto; object-fit:contain;">

</div>
<div>

- `next()`: avança o cursor para a próxima linha do resultado.
- `getXxx(...)`: lê o valor de uma coluna na linha atual usando nome ou índice.
- `wasNull()`: confirma se o valor lido era `NULL`.
- `getMetaData()`: obtém informações sobre as colunas do resultado.
- `close()`: libera recursos associados ao `ResultSet`.
- `first()`, `last()`, `previous()`: navegação opcional em conjuntos roláveis.

</div>
</div>

---

# java.sql.ResultSet: exemplo

> `ResultSet` representa o resultado de uma consulta como um cursor que aponta para uma linha por vez.

<div class="columns">
<div>

- Por padrão, o cursor começa antes da primeira linha.

- Para acessar a primeira linha, chamamos `next()`.

- Quando `next()` retorna `false`, não há mais linhas.

</div>
<div>

```java
while (rs.next()) {
    int id = rs.getInt("id");
    String nome = rs.getString("nome");
    BigDecimal nota = rs.getBigDecimal("nota");
}
```

</div>
</div>

---

# java.sql.ResultSet: cursor

<img src="../images/13-resultset-cursor.png" style="display:block; max-width:100%; max-height:460px; margin:0 auto; object-fit:contain;">

---

<!-- _class: compact -->

# java.sql.ResultSet: leitura de colunas

Antes de ler valores do `ResultSet`, o cursor deve estar posicionado em uma linha válida e a aplicação deve usar o tipo correto para cada coluna.

<table class="tiny">
  <thead>
    <tr>
      <th>Método</th>
      <th>Tipo Java comum</th>
      <th>Uso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>getString</code></td>
      <td><code>String</code></td>
      <td>Texto, nomes, códigos e emails.</td>
    </tr>
    <tr>
      <td><code>getInt</code></td>
      <td><code>int</code></td>
      <td>Identificadores e contadores inteiros.</td>
    </tr>
    <tr>
      <td><code>getBigDecimal</code></td>
      <td><code>BigDecimal</code></td>
      <td>Valores decimais que exigem precisão.</td>
    </tr>
    <tr>
      <td><code>getDate</code>, <code>getTimestamp</code></td>
      <td><code>Date</code>, <code>Timestamp</code></td>
      <td>Código legado ou integração com tipos SQL.</td>
    </tr>
    <tr>
      <td><code>getObject</code></td>
      <td>Tipo informado ou genérico</td>
      <td>Leitura flexível, inclusive com tipos modernos.</td>
    </tr>
  </tbody>
</table>

Prefira nomes de coluna a índices para deixar o código mais legível.

---

<!-- _class: compact -->

# java.sql.ResultSet: mapeando linha para objeto

Mapear dados relacionais para objetos significa transformar cada linha retornada pelo banco em uma instância da classe usada pela aplicação.

<div class="columns small">
<div>

**Classe de domínio**

```java
public class Aluno {
    private int id;
    private String nome;
    private String email;
    private BigDecimal nota;

    public Aluno(int id, String nome, String email, BigDecimal nota) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.nota = nota;
    }
}
```

</div>
<div>

**Linha do banco para objeto**

```java
Aluno aluno = new Aluno(
    rs.getInt("id"),
    rs.getString("nome"),
    rs.getString("email"),
    rs.getBigDecimal("nota")
);
```

O banco devolve linhas; a aplicação costuma trabalhar com objetos.

</div>
</div>

---

<!-- _class: compact -->

# java.sql.ResultSet: trabalhando com coleções

```java
List<Aluno> alunos = new ArrayList<>();

String sql = """
    SELECT id, nome, email, nota
    FROM aluno
    ORDER BY nome
    """;

try (
    PreparedStatement ps = conn.prepareStatement(sql);
    ResultSet rs = ps.executeQuery()
) {
    while (rs.next()) {
        alunos.add(new Aluno(
            rs.getInt("id"),
            rs.getString("nome"),
            rs.getString("email"),
            rs.getBigDecimal("nota")
        ));
    }
}
```

Aqui, JDBC e Collections trabalham juntos.

---

<!-- _class: compact -->

# JDBC API: fluxo de consulta

<img src="../images/13-jdbc-query-sequence.png" style="display:block; max-width:100%; max-height:460px; margin:0 auto; object-fit:contain;">

---

# Transação: conceito

> Transação é uma sequência de operações de banco tratada como uma única unidade lógica de trabalho.

Exemplo:

- debitar valor de uma conta
- creditar valor em outra conta
- registrar histórico da transferência

Essas operações devem ser confirmadas juntas ou desfeitas juntas.

---

<!-- _class: compact -->

# Transação: propriedades ACID

As propriedades ACID definem como uma transação deve se comportar para garantir integridade, isolamento e confiança nos dados.

<table class="tiny">
  <thead>
    <tr>
      <th>Propriedade</th>
      <th>Ideia</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Atomicidade</td>
      <td>Ou todas as operações da transação acontecem, ou nenhuma fica permanente.</td>
    </tr>
    <tr>
      <td>Consistência</td>
      <td>As regras de integridade do banco continuam válidas.</td>
    </tr>
    <tr>
      <td>Isolamento</td>
      <td>Transações concorrentes não devem interferir indevidamente umas nas outras.</td>
    </tr>
    <tr>
      <td>Durabilidade</td>
      <td>Depois do <code>commit</code>, o resultado confirmado deve sobreviver a falhas previstas.</td>
    </tr>
  </tbody>
</table>

---

# Transação: ciclo de vida

<img src="../images/13-transaction-lifecycle.png" style="display:block; max-width:100%; max-height:460px; margin:0 auto; object-fit:contain;">

---

<!-- _class: compact -->

# java.sql.Connection: controle de transação

A classe `Connection` pode ser utilizada para controlar transações, incluindo commit, rollback, savepoints e isolamento.

<div class="columns">
<div>

<img src="../images/13-connection-transaction-control.png" style="display:block; max-width:100%; max-height:420px; margin:0 auto; object-fit:contain;">

</div>
<div>

- `setAutoCommit(false)`: desliga o modo de confirmação automática.
- `getAutoCommit()`: verifica se a conexão confirma comandos automaticamente.
- `commit()`: confirma todas as operações da transação.
- `rollback()`: desfaz todas as operações desde o último commit.
- `setSavepoint()`: cria um ponto intermediário para rollback parcial.
- `rollback(Savepoint)`: desfaz até o savepoint especificado.
- `setTransactionIsolation(int)`: define o nível de isolamento da transação.
- `close()`: finaliza a conexão e libera recursos.

</div>
</div>

<div class="callout">

**Nota**: `Connection` concentra tanto o controle básico de transação quanto recursos avançados como savepoints e níveis de isolamento.

</div>

---

<!-- _class: compact -->

# java.sql.Connection: exemplo de transação

```java
try (Connection conn =
         DriverManager.getConnection(url, user, password)) {
    conn.setAutoCommit(false);

    try {
        atualizarEstoque(conn, produtoId, quantidade);
        registrarVenda(conn, produtoId, quantidade);

        conn.commit();
    } catch (SQLException e) {
        conn.rollback();
        throw e;
    }
}
```

Por padrão, `autoCommit` costuma vir como `true`: cada comando é confirmado automaticamente.

---

# java.sql.Connection: ciclo de vida da conexão

<img src="../images/13-jdbc-workflow.png" style="display:block; max-width:100%; max-height:460px; margin:0 auto; object-fit:contain;">

---

<!-- _class: compact -->

# try-with-resources

Declare `Connection`, `Statement` e `ResultSet` no cabeçalho do `try` para que o Java chame `close()` em cada recurso automaticamente.

```java
try (
    Connection conn = DriverManager.getConnection(url, user, password);
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery(sql)
) {
    while (rs.next()) {
        System.out.println(rs.getString("nome"));
    }
} catch (SQLException e) {
    System.err.println("Erro JDBC: " + e.getMessage());
}
```

> Se uma conexão não for fechada, ela pode continuar ocupada no banco, impedindo que outras operações usem esse recurso.

---

# java.sql.SQLException

> `SQLException` é a exceção base de erros JDBC.

Ela pode indicar:

- URL inválida
- usuário ou senha incorretos
- driver ausente
- tabela ou coluna inexistente
- violação de chave primária ou estrangeira
- erro de sintaxe SQL
- indisponibilidade do banco

---

<!-- _class: compact -->

# java.sql.SQLException: informações úteis

```java
try {
    // operacoes JDBC
} catch (SQLException e) {
    System.err.println("Mensagem: " + e.getMessage());
    System.err.println("SQLState: " + e.getSQLState());
    System.err.println("Codigo: " + e.getErrorCode());

    SQLException proxima = e.getNextException();
    while (proxima != null) {
        System.err.println(proxima.getMessage());
        proxima = proxima.getNextException();
    }
}
```

<div class="callout">

**Recomendação**

Use as mensagens para entender o erro. Em produção, registre logs e evite expor detalhes sensíveis ao usuário final.

</div>

---

<!-- _class: compact -->

# JDBC API: metadados

> JDBC também permite consultar informações sobre resultados e sobre o banco.

No contexto da JDBC API, metadado é um conjunto de informações que descreve os próprios dados ou o ambiente de banco, como nomes de colunas, tipos SQL, parâmetros, tabelas e recursos suportados.

<table class="tiny">
  <thead>
    <tr>
      <th>Interface</th>
      <th>O que descreve</th>
      <th>Uso comum</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ResultSetMetaData</code></td>
      <td>Colunas retornadas por uma consulta.</td>
      <td>Tabelas dinâmicas, exportação e logs.</td>
    </tr>
    <tr>
      <td><code>DatabaseMetaData</code></td>
      <td>Banco, driver, tabelas, chaves e recursos suportados.</td>
      <td>Ferramentas, diagnóstico e introspecção.</td>
    </tr>
    <tr>
      <td><code>ParameterMetaData</code></td>
      <td>Parâmetros de um comando preparado.</td>
      <td>SQL dinâmico e validações avançadas.</td>
    </tr>
    <tr>
      <td><code>RowSetMetaData</code></td>
      <td>Estrutura de colunas em objetos do tipo <code>RowSet</code>.</td>
      <td>Aplicações com <code>RowSet</code>, dados desconectados e configuração programática de colunas.</td>
    </tr>
  </tbody>
</table>

---

<!-- _class: compact -->

# java.sql.ResultSetMetaData

`ResultSetMetaData` descreve as colunas devolvidas por uma consulta, permitindo descobrir nomes, tipos e propriedades sem depender de conhecimento prévio da estrutura.

<div class="columns">
<div>

<img src="../images/13-resultsetmetadata-class.png" style="display:block; max-width:100%; max-height:320px; margin:0 auto; object-fit:contain;">

</div>
<div>

- É obtido a partir de `ResultSet` por meio do método `getMetaData()`
- `getColumnCount()`: informa quantas colunas existem no resultado
- `getColumnName(index)`: devolve o nome de uma coluna
- `getColumnTypeName(index)`: devolve o tipo SQL da coluna
- `isNullable(index)`: informa se a coluna aceita `NULL`
- `isAutoIncrement(index)`: indica se a coluna é autoincremento

</div>
</div>

---

<!-- _class: compact -->

# java.sql.ResultSetMetaData: exemplo

> `ResultSetMetaData` pode ser usando para inspecionar o resultado de uma consulta e montar saídas dinâmicas sem fixar os nomes das colunas no código.

<div class="columns">
<div>

O código executa um `SELECT`, obtém o metadado do `ResultSet` e percorre cada coluna para descobrir seu nome e tipo SQL.

</div>
<div>

```java
String sql = "SELECT id, nome, email FROM aluno";

try (
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery(sql)
) {
    ResultSetMetaData meta = rs.getMetaData();
    int colunas = meta.getColumnCount();

    for (int i = 1; i <= colunas; i++) {
        System.out.printf(
            "%s (%s)%n",
            meta.getColumnName(i),
            meta.getColumnTypeName(i)
        );
    }
}
```

</div>
</div>

---

<!-- _class: compact -->

# java.sql.DatabaseMetaData

> `DatabaseMetaData` descreve o ambiente do banco e do driver, incluindo produto, recursos suportados e objetos disponíveis no SGBD.

<div class="columns">
<div>

<img src="../images/13-databasemetadata-class.png" style="display:block; max-width:100%; max-height:320px; margin:0 auto; object-fit:contain;">

É obtido a partir de `Connection` por meio do método `getMetaData()`

</div>
<div>

- `getDatabaseProductName()`: informa o nome do banco
- `getDriverName()`: informa o driver JDBC em uso
- `getURL()`: devolve a URL da conexão atual
- `getTables(...)`: lista tabelas visíveis para a conexão
- `supportsTransactions()`: informa se o banco suporta transações

</div>
</div>

---

# java.sql.DatabaseMetaData: exemplo

> `DatabaseMetaData` é útil quando o programa precisa diagnosticar o ambiente, listar objetos do banco ou adaptar o comportamento ao SGBD conectado.

<div class="columns">
<div>

O código pergunta ao banco qual produto está em uso, qual driver foi carregado e se transações são suportadas pela conexão atual.

</div>
<div>

```java
DatabaseMetaData meta = conn.getMetaData();

System.out.println(meta.getDatabaseProductName());
System.out.println(meta.getDriverName());
System.out.println(meta.supportsTransactions());
```

</div>
</div>

---

<!-- _class: compact -->

# java.sql.ParameterMetaData

> `ParameterMetaData` descreve os parâmetros de um `PreparedStatement`, ajudando a saber quantos existem e quais tipos ou modos o banco espera.

<div class="columns">
<div>

<img src="../images/13-parametermetadata-class.png" style="display:block; max-width:100%; max-height:320px; margin:0 auto; object-fit:contain;">

É obtido a partir de `PreparedStatement` por meio do método `getParameterMetaData()`

</div>
<div>

- `getParameterCount()`: informa quantos parâmetros `?` existem
- `getParameterType(index)`: devolve o tipo SQL do parâmetro
- `getParameterTypeName(index)`: devolve o nome do tipo SQL
- `isNullable(index)`: informa se o parâmetro aceita `NULL`
- `getParameterMode(index)`: informa se o parâmetro é `IN`, `OUT` ou `INOUT`

</div>
</div>

---

# java.sql.ParameterMetaData: exemplo

> `ParameterMetaData` ajuda em cenários mais dinâmicos, quando o programa precisa inspecionar a assinatura do comando preparado antes de preencher os valores.

<div class="columns">
<div>

O código cria um `PreparedStatement`, obtém o metadado dos parâmetros e verifica quantos placeholders existem e qual tipo SQL o banco espera.

</div>
<div>

```java
String sql = "SELECT * FROM conta WHERE id_cliente = ? AND tipo = ?";

try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ParameterMetaData meta = ps.getParameterMetaData();

    System.out.println(meta.getParameterCount());
    System.out.println(meta.getParameterTypeName(1));
    System.out.println(meta.getParameterTypeName(2));
}
```

</div>
</div>

---

<!-- _class: compact -->

# javax.sql.RowSetMetaData

`RowSetMetaData` descreve a estrutura de colunas de um `RowSet`, sendo útil quando trabalhamos com dados desconectados e precisamos configurar suas colunas programaticamente.

<div class="columns">
<div>

<img src="../images/13-rowsetmetadata-class.png" style="display:block; max-width:100%; max-height:320px; margin:0 auto; object-fit:contain;">

</div>
<div>

- Costuma ser configurado por uma implementação concreta, como `RowSetMetaDataImpl`
- `setColumnCount(count)`: define a quantidade de colunas
- `setColumnName(index, name)`: define o nome de uma coluna
- `setColumnType(index, type)`: define o tipo SQL da coluna
- `setNullable(index, flag)`: define se a coluna aceita `NULL`
- `setTableName(index, name)`: associa a coluna a uma tabela lógica

</div>
</div>

---

<!-- _class: compact -->

# javax.sql.RowSetMetaData: exemplo de uso

Esse metadado aparece com mais frequência em APIs de `RowSet`, quando a aplicação precisa descrever colunas de forma manual em estruturas desconectadas.

<div class="columns">
<div>

O código usa uma implementação concreta de `RowSetMetaData` para definir duas colunas, seus nomes e seus tipos SQL.

</div>
<div>

```java
RowSetMetaDataImpl meta = new RowSetMetaDataImpl();

meta.setColumnCount(2);
meta.setColumnName(1, "id_conta");
meta.setColumnType(1, Types.INTEGER);
meta.setColumnName(2, "numero");
meta.setColumnType(2, Types.VARCHAR);
```

</div>
</div>

---

# JDBC API: resumo

A tabela resume os principais elementos da API JDBC e mostra em que momento cada um aparece no fluxo de acesso ao banco.

<table class="tiny">
  <thead>
    <tr>
      <th>Elemento</th>
      <th>Papel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>DriverManager</code></td>
      <td>Obtém uma conexão a partir da URL JDBC, usuário e senha.</td>
    </tr>
    <tr>
      <td><code>DataSource</code></td>
      <td>Alternativa mais flexível para obter conexões, comum com pool.</td>
    </tr>
    <tr>
      <td><code>Connection</code></td>
      <td>Representa a sessão aberta com o banco.</td>
    </tr>
    <tr>
      <td><code>Statement</code></td>
      <td>Executa SQL estático, sem parâmetros externos.</td>
    </tr>
    <tr>
      <td><code>PreparedStatement</code></td>
      <td>Executa SQL parametrizado com placeholders <code>?</code>.</td>
    </tr>
    <tr>
      <td><code>ResultSet</code></td>
      <td>Cursor usado para percorrer linhas retornadas por uma consulta.</td>
    </tr>
    <tr>
      <td><code>SQLException</code></td>
      <td>Exceção base para erros de acesso ao banco.</td>
    </tr>
  </tbody>
</table>

---

# javax.sql.DataSource: alternativa

`DataSource` é uma alternativa ao `DriverManager` para obter conexões.

Em aplicações profissionais, ele costuma ser preferido porque permite:

- configuração centralizada
- pool de conexões
- integração com servidores, frameworks e containers
- troca da implementação sem mudar o código de negócio

```java
try (Connection conn = dataSource.getConnection()) {
    // usar a conexao
}
```

---

<!-- _class: compact -->

# javax.sql.DataSource: pool de conexões

Abrir conexão com banco pode custar caro.

Um pool mantém conexões prontas para reuso.

**Fluxo simplificado**

- a aplicação pede uma conexão
- o pool entrega uma conexão disponível
- o código usa a conexão
- ao chamar `close()`, a conexão volta para o pool

<div class="callout">

**Importante**

Mesmo com pool, continue usando `try-with-resources`. O `close()` devolve a conexão ao pool.

</div>

---

<!-- _class: compact -->

# Problemas comuns

Os erros abaixo aparecem com frequência em programas JDBC e ajudam a interpretar rapidamente a origem de uma falha de conexão ou execução SQL.

<table class="tiny">
  <thead>
    <tr>
      <th>Erro</th>
      <th>Sintoma</th>
      <th>Correção</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Driver fora do classpath</td>
      <td><code>No suitable driver</code></td>
      <td>Adicionar dependência do driver JDBC.</td>
    </tr>
    <tr>
      <td>URL errada</td>
      <td>Falha de conexão</td>
      <td>Conferir protocolo, host, porta e nome do banco.</td>
    </tr>
    <tr>
      <td>Coluna inexistente</td>
      <td>Erro ao executar consulta</td>
      <td>Conferir SQL e estrutura da tabela.</td>
    </tr>
    <tr>
      <td>Recurso não fechado</td>
      <td>Conexões esgotadas</td>
      <td>Usar <code>try-with-resources</code>.</td>
    </tr>
    <tr>
      <td>Concatenar SQL com entrada externa</td>
      <td>Risco de SQL injection</td>
      <td>Usar <code>PreparedStatement</code>.</td>
    </tr>
  </tbody>
</table>

---

# Organização com DAO

DAO significa _Data Access Object_.

> Um DAO concentra o código de acesso ao banco para uma entidade ou agregado, evitando espalhar SQL pela aplicação inteira.

<img src="../images/13-dao-layer.png" style="display:block; max-width:100%; max-height:360px; margin:0 auto; object-fit:contain;">

---

<!-- _class: compact -->

# DAO: exemplo de interface mental

```java
public class AlunoDao {
    private final Connection conn;

    public AlunoDao(Connection conn) {
        this.conn = conn;
    }

    public void salvar(Aluno aluno) throws SQLException {
        String sql = """
            INSERT INTO aluno (nome, email, nota)
            VALUES (?, ?, ?)
            """;

        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, aluno.getNome());
            ps.setString(2, aluno.getEmail());
            ps.setBigDecimal(3, aluno.getNota());
            ps.executeUpdate();
        }
    }
}
```

---

<!-- _class: compact -->

# Boas práticas

- Use `PreparedStatement` para dados externos
- Feche `Connection`, `Statement` e `ResultSet` com `try-with-resources`
- Não deixe senha fixa no código-fonte
- Separe SQL de regras de negócio quando a aplicação crescer
- Valide a quantidade de linhas afetadas em `UPDATE` e `DELETE`
- Use transações quando múltiplas operações precisarem ser atômicas
- Registre erros com contexto, mas não exponha credenciais em mensagens

<!-- _class: compact -->

# JDBC: resumo

<table class="tiny">
  <thead>
    <tr>
      <th>Elemento</th>
      <th>Você deve lembrar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Connection</code></td>
      <td>Representa a conexão aberta com o banco.</td>
    </tr>
    <tr>
      <td><code>Statement</code></td>
      <td>Executa SQL fixo.</td>
    </tr>
    <tr>
      <td><code>PreparedStatement</code></td>
      <td>Executa SQL com parâmetros; é a escolha padrão para CRUD.</td>
    </tr>
    <tr>
      <td><code>ResultSet</code></td>
      <td>Percorre linhas retornadas por <code>SELECT</code>.</td>
    </tr>
    <tr>
      <td><code>SQLException</code></td>
      <td>Representa falhas de banco, SQL, driver ou conexão.</td>
    </tr>
    <tr>
      <td><code>commit</code> / <code>rollback</code></td>
      <td>Confirmam ou desfazem uma transação manual.</td>
    </tr>
  </tbody>
</table>

---

# Atividade prática

Crie uma aplicação Java que cadastre e consulte alunos em uma tabela relacional.

**Requisitos**

- criar a tabela `aluno`
- inserir alunos com `PreparedStatement`
- listar alunos ordenados por nome
- buscar aluno por email
- atualizar nota de um aluno
- remover aluno por id
- usar `try-with-resources`
- tratar `SQLException` exibindo mensagem, `SQLState` e código

---

# Atividade prática: roteiro

1. Crie a classe `Aluno`
2. Crie a classe `AlunoDao`
3. Implemente `salvar`, `listar`, `buscarPorEmail`, `atualizarNota` e `remover`
4. Crie uma classe `Main` para testar as operações
5. Use transação quando o teste executar mais de uma alteração dependente
6. Ao final, explique em quais pontos a aplicação usou CRUD

---

<!-- _class: compact -->

# Referências

- Oracle Java Documentation: `java.sql`
  - https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/package-summary.html
- Oracle Java Documentation: `javax.sql`
  - https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/javax/sql/package-summary.html
- PostgreSQL JDBC Driver
  - https://jdbc.postgresql.org/
- Deitel, Paul; Deitel, Harvey. _Java: How to Program, Early Objects_. 11. ed. Pearson, 2017.

---

# Fechamento

Nesta aula, JDBC apareceu como a ponte entre objetos Java e dados relacionais.

**O ponto mais importante**

> Use `PreparedStatement`, feche recursos corretamente e controle transações quando várias operações precisarem ser confirmadas juntas.
