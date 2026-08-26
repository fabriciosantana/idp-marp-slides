---
marp: true
theme: idp
paginate: false
html: true
footer: <span>Programação Orientada a Objetos</span><span>Tipos personalizados</span><span>2026.2</span><span>Prof. Fabricio Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

# Definição de tipos personalizados em Java

## Programação Orientada a Objetos

<div class="objectives">

**Objetivos da aula**

- Modelar conceitos do domínio por meio de classes e objetos
- Criar classes com atributos, construtores e métodos
- Encapsular estado, validações e regras de negócio simples
- Criar e utilizar objetos em aplicações console

</div>

<div class="contact">
2026.2<br>
Prof. Fabricio Santana<br>
fabricio.santana@idp.edu.br<br>
www.linkedin.com/in/fabriciofsantana/
</div>

---

# Tipos da linguagem Java

> Uma classe declarada pelo programador define um novo tipo por referência.

<div class="columns">
<div>

**Tipos primitivos**

- Fornecidos pela linguagem
- Representam valores básicos
- Exemplos: `int`, `double`, `boolean`, `char`

</div>
<div>

**Tipos por referência**

- Classes, interfaces e arrays
- Podem representar conceitos do domínio
- Exemplos: `String`, `Scanner`, `Account`

</div>
</div>

---

# Classes e objetos

<div class="columns">
<div>

**Classe**

- Define um tipo
- Descreve estado e comportamento
- Funciona como uma especificação para seus objetos

</div>
<div>

**Objeto**

- É uma instância de uma classe
- Possui identidade e estado próprios
- Executa os comportamentos definidos pela classe

</div>
</div>

```java
Account contaAna = new Account("Ana", 100.0);
Account contaBia = new Account("Bia", 250.0);
```

`contaAna` e `contaBia` referenciam objetos distintos do mesmo tipo.

---

# Estrutura de uma classe

<div class="columns">
<div>

```java
public class Account {
  // atributos: estado do objeto
  private String name;
  private double balance;

  // construtor: inicialização do objeto
  public Account(String name, double balance) {
    this.name = name;
    this.balance = balance;
  }

  // método: comportamento do objeto
  public void deposit(double amount) {
    balance += amount;
  }
}
```

</div>

<div>

A declaração da classe reúne os dados e as operações relacionadas ao mesmo conceito.

</div>

</div>





---

# Atributos e estado

```java
private String name;
private double balance;
```

- Cada objeto possui seus próprios valores para os atributos de instância
- `name` e `balance` formam parte do estado de uma conta
- A palavra-chave `private` restringe o acesso à própria classe
- Atributos recebem valores padrão antes da execução do construtor

<table class="small">
<thead><tr><th>Categoria</th><th>Valor padrão</th></tr></thead>
<tbody>
<tr><td>Tipos numéricos</td><td><code>0</code> ou equivalente</td></tr>
<tr><td><code>boolean</code></td><td><code>false</code></td></tr>
<tr><td>Tipos por referência</td><td><code>null</code></td></tr>
</tbody>
</table>

---

# Construtores

```java
public Account(String name, double balance) {
  this.name = name != null && !name.isBlank()
      ? name
      : "Sem nome";

  if (balance >= 0.0) {
    this.balance = balance;
  }
}
```

- Possuem o mesmo nome da classe
- Não declaram tipo de retorno
- São executados durante a criação do objeto com `new`
- Estabelecem o estado inicial
- Podem validar argumentos e proteger invariantes

> Se nenhum construtor for declarado, o compilador fornece um construtor padrão sem parâmetros. Ao declarar qualquer construtor, esse padrão deixa de ser fornecido.

---

# Palavra-chave this

```java
public Account(String name, double balance) {
  this.name = name;
  this.balance = balance;
}
```

- `this` referencia o objeto que está executando o construtor ou método
- `this.name` seleciona o atributo do objeto
- `name` seleciona o parâmetro do construtor
- O uso elimina a ambiguidade quando atributo e parâmetro possuem o mesmo nome

```text
this.name = name;
    │        └── parâmetro
    └─────────── atributo do objeto atual
```

---

<!-- _class: compact -->

# Sobrecarga de construtores

Uma classe pode oferecer diferentes formas válidas de inicialização.

```java
public Account(String name) {
  this(name, 0.0);
}

public Account(String name, double balance) {
  this.name = name != null && !name.isBlank()
      ? name
      : "Sem nome";
  this.balance = balance >= 0.0 ? balance : 0.0;
}
```

- Os construtores possuem listas de parâmetros diferentes
- `this(...)` delega para outro construtor da mesma classe
- A delegação deve ser a primeira instrução do construtor
- Centralizar a inicialização evita duplicação de regras

---

# Métodos de instância

```java
public void deposit(double amount) {
  if (amount > 0.0) {
    balance += amount;
  }
}
```

- Representam comportamentos dos objetos
- Podem receber parâmetros e produzir um resultado
- Acessam diretamente os atributos do objeto atual
- Um método `void` executa uma ação sem devolver valor

```java
Account account = new Account("Ana", 100.0);
account.deposit(50.0);
```

> A chamada envia ao objeto a mensagem para executar o comportamento `deposit`.

---

# Encapsulamento

Encapsular significa controlar o acesso ao estado e concentrar as regras na classe responsável.

```java
private double balance;

public void deposit(double amount) {
  if (amount <= 0.0) {
    return;
  }

  balance += amount;
}
```

- Código externo não altera `balance` diretamente
- Toda alteração passa pela validação de `deposit`
- A representação interna pode mudar sem afetar quem utiliza a classe

---

# Invariantes da classe

Uma invariante é uma condição que deve permanecer verdadeira para todo objeto válido.

```text
Account: balance >= 0
Student: name não vazio e age >= 0
```

Construtores e métodos públicos devem preservar essas condições.

```java
public boolean withdraw(double amount) {
  if (amount <= 0.0 || amount > balance) {
    return false;
  }

  balance -= amount;
  return true;
}
```

> Não basta esconder os atributos: encapsulamento também envolve proteger as regras do objeto.

---

# Métodos de acesso

```java
public String getName() {
  return name;
}

public void setName(String name) {
  if (name != null && !name.isBlank()) {
    this.name = name;
  }
}

public double getBalance() {
  return balance;
}
```

- *Getters* fornecem leitura controlada
- *Setters* permitem alteração controlada
- Nem todo atributo precisa de ambos
- Não ofereça `setBalance`: depósitos e saques expressam melhor as regras do domínio

---

<!-- _class: compact -->

# Classe Account

```java
public class Account {
  private String name;
  private double balance;

  public Account(String name, double balance) {
    this.name = name != null && !name.isBlank()
        ? name
        : "Sem nome";
    this.balance = balance >= 0.0 ? balance : 0.0;
  }

  public String getName() { return name; }
  public double getBalance() { return balance; }

  public void setName(String name) {
    if (name != null && !name.isBlank()) {
      this.name = name;
    }
  }

  public void deposit(double amount) {
    if (amount > 0.0) balance += amount;
  }
}
```

---

# Criação e utilização de objetos

```java
Account account = new Account("Ana", 100.0);

account.deposit(50.0);

System.out.printf(
    java.util.Locale.of("pt", "BR"),
    "Titular: %s; saldo: %.2f%n",
    account.getName(),
    account.getBalance()
);
```

```console
Titular: Ana; saldo: 150,00
```

- `new` cria o objeto e executa o construtor
- `account` armazena uma referência ao objeto
- O operador `.` seleciona um método do objeto

---

# Referências e null

```java
Account primeira = new Account("Ana", 100.0);
Account segunda = primeira;

segunda.deposit(50.0);
System.out.println(primeira.getBalance()); // 150.0
```

As duas variáveis referenciam o mesmo objeto.

```java
Account account = null;
account.deposit(50.0); // NullPointerException
```

- `null` representa a ausência de uma referência
- Atribuir uma referência não cria uma cópia do objeto
- Alterações são observadas por todas as referências ao mesmo objeto

---

<!-- _class: compact -->

# Objetos em uma aplicação console

```java
import java.util.Locale;
import java.util.Scanner;

public class AccountApp {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in).useLocale(Locale.US);

    System.out.print("Titular: ");
    String name = input.nextLine();
    System.out.print("Saldo inicial: ");
    double initialBalance = input.nextDouble();

    Account account = new Account(name, initialBalance);

    System.out.print("Depósito: ");
    account.deposit(input.nextDouble());

    System.out.printf(Locale.US, "Saldo: %.2f%n",
        account.getBalance());
  }
}
```

---

# Separação de responsabilidades

<div class="columns">
<div class="callout">

**Account**

- Representa a conta
- Mantém seu estado
- Valida depósitos
- Preserva suas invariantes

</div>
<div class="callout">

**AccountApp**

- Lê dados do console
- Cria e utiliza objetos
- Formata resultados
- Trata a interação com o usuário

</div>
</div>

> A regra do saldo pertence à classe de domínio, não à interface console.

---

<!-- _class: compact -->

# Outro tipo personalizado: Student

```java
public class Student {
  private String name;
  private int age;
  private String course;

  public Student(String name, int age, String course) {
    this.name = name;
    this.age = age;
    this.course = course;
  }

  public String getName() { return name; }
  public int getAge() { return age; }
  public String getCourse() { return course; }

  @Override
  public String toString() {
    return "Student{name='%s', age=%d, course='%s'}"
        .formatted(name, age, course);
  }
}
```

---

# Representação textual com toString

Toda classe herda um método `toString()` de `Object`.

```java
Student student = new Student("Ana", 20, "Direito");
System.out.println(student);
```

Quando um objeto é concatenado ou enviado para `println`, Java utiliza sua representação textual.

- `@Override` informa que o método redefine um método herdado
- Uma boa representação auxilia logs, diagnóstico e testes
- Evite incluir senhas ou outros dados sensíveis
- `toString()` representa o objeto; não deve implementar a interface completa com o usuário

<div class="source">Fonte: <a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#toString()">Object.toString — Java SE 21</a></div>

---

# Objetos mutáveis e imutáveis

<div class="columns small">
<div>

**Mutável**

- O estado pode mudar após a construção
- `Account` muda com depósitos e saques
- Exige cuidado para preservar invariantes

</div>
<div>

**Imutável**

- O estado não muda após a construção
- Atributos podem ser declarados `final`
- Não fornece setters nem expõe estado modificável

</div>
</div>

```java
public final class Student {
  private final String name;
  private final int age;
  // construtor e getters
}
```

> Imutabilidade reduz estados possíveis e facilita o raciocínio sobre o programa.

---

# Cuidados ao modelar valores monetários

Os exemplos usam `double` para manter o foco na definição de classes, mas números binários de ponto flutuante não representam todos os valores decimais exatamente.

```java
System.out.println(0.1 + 0.2); // 0.30000000000000004
```

Em aplicações financeiras reais, considere `BigDecimal`:

```java
BigDecimal balance = new BigDecimal("100.00");
BigDecimal amount = new BigDecimal("10.50");
balance = balance.add(amount);
```

> Escolher o tipo adequado também faz parte da modelagem do domínio.

---

# Testes das regras da classe

Teste o comportamento observável e as invariantes:

```java
Account account = new Account("Ana", 100.0);

account.deposit(50.0);
assert account.getBalance() == 150.0;

account.deposit(-20.0);
assert account.getBalance() == 150.0;
```

Execute com `java -ea` para habilitar as asserções.

Cenários mínimos:

- Construção com saldo válido, zero e negativo
- Depósito positivo, zero e negativo
- Nome válido, vazio e `null`
- Saque válido, negativo e superior ao saldo, quando implementado

---

# Boas práticas

- Mantenha atributos de instância `private`
- Construa objetos em estados válidos
- Preserve invariantes em todos os métodos públicos
- Forneça métodos de acesso somente quando necessários
- Prefira operações de domínio a setters genéricos
- Separe interação com o usuário das regras da classe
- Use nomes que expressem conceitos e comportamentos
- Documente contratos relevantes e escreva testes automatizados

---

# Síntese da aula

- Classes definem novos tipos por referência
- Objetos possuem identidade, estado e comportamento
- Construtores estabelecem o estado inicial
- `this` referencia o objeto atual
- Métodos compõem a interface pública da classe
- Encapsulamento protege estado e regras
- Getters e setters devem existir apenas quando fizerem sentido
- Referências diferentes podem apontar para o mesmo objeto
- A classe de domínio e a aplicação console possuem responsabilidades distintas

<div class="source">Referências: <a href="https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html">JLS Chapter 8 — Classes</a>; <a href="https://docs.oracle.com/javase/tutorial/java/javaOO/">Classes and Objects — Java Tutorials</a>.</div>
