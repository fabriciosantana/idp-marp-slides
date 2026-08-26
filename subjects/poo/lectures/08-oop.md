---
marp: true
theme: idp
paginate: false
html: true
footer: <span>Programação Orientada a Objetos</span><span>Introdução à Orientação a Objetos</span><span>2026.2</span><span>Prof. Fabricio Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

# Introdução à Orientação a Objetos

## Programação Orientada a Objetos

<div class="objectives">

**Objetivos da aula**

- Conhecer os pilares da orientação a objetos
- Compreender os conceitos de classes e objetos
- Criar classes com atributos, construtores e métodos
- Encapsular estado, validações e regras de negócio
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

<!-- _class: compact -->

# Pilares da orientação a objetos

<table class="small">
<thead><tr><th>Pilar</th><th>Ideia central</th><th>Exemplo</th></tr></thead>
<tbody>
<tr><td><strong>Abstração</strong></td><td>Representar somente características relevantes do conceito</td><td><code>Account</code> modela titular, saldo, depósito e saque</td></tr>
<tr><td><strong>Encapsulamento</strong></td><td>Proteger o estado e controlar como ele pode mudar</td><td><code>balance</code> privado, alterado por <code>deposit</code></td></tr>
<tr><td><strong>Herança</strong></td><td>Criar um tipo mais específico a partir de outro</td><td><code>SavingsAccount extends Account</code></td></tr>
<tr><td><strong>Polimorfismo</strong></td><td>Tratar objetos diferentes por um tipo comum</td><td>Uma referência <code>Account</code> pode apontar para uma <code>SavingsAccount</code></td></tr>
</tbody>
</table>

```java
Account account = new SavingsAccount("Ana", 100.0);
account.deposit(50.0);
```

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

<!-- _class: compact -->

# Organização dos arquivos Java

Uma classe pública de nível superior deve estar em um arquivo com o mesmo nome.

```text
src/
├── Account.java     → public class Account
└── AccountApp.java  → public class AccountApp
```

```console
$ javac -d bin src/Account.java src/AccountApp.java
$ java -cp bin AccountApp
```

- Um arquivo pode declarar outros tipos não públicos
- Classes do mesmo pacote podem ser referenciadas diretamente
- Para utilizar uma classe de outro pacote, normalmente se declara um `import`
- A declaração `package`, quando existir, identifica o pacote da classe

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

<!-- _class: compact -->

# Modificadores de acesso

Modificadores de acesso determinam de onde um tipo ou membro pode ser utilizado.

<table class="small">
<thead><tr><th>Modificador</th><th>Acesso</th></tr></thead>
<tbody>
<tr><td><code>public</code></td><td>Disponível para outras classes</td></tr>
<tr><td><code>private</code></td><td>Restrito à classe que declara o membro</td></tr>
<tr><td>Sem modificador</td><td>Restrito às classes do mesmo pacote</td></tr>
<tr><td><code>protected</code></td><td>Disponível no pacote e, sob regras específicas, para subclasses</td></tr>
</tbody>
</table>

- Prefira atributos `private` para proteger o estado
- Exponha como `public` somente o que fizer parte da API da classe
- O uso de `protected` será aprofundado junto com herança

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

<!-- _class: compact -->

# Argumentos inválidos

A classe pode normalizar argumentos inválidos para preservar suas invariantes:

<table class="small">
<thead><tr><th>Argumento recebido</th><th>Estado adotado</th></tr></thead>
<tbody>
<tr><td>Nome <code>null</code> ou vazio</td><td><code>"Sem nome"</code></td></tr>
<tr><td>Saldo negativo</td><td><code>0.0</code></td></tr>
</tbody>
</table>

- O objeto sempre é construído em um estado válido
- A correção silenciosa é uma decisão de implementação
- Outra implementação poderia ignorar o argumento e manter o estado anterior
- Também seria possível rejeitar o argumento com `IllegalArgumentException`
- A escolha deve ser explícita, previsível e aplicada de forma consistente

---

<!-- _class: compact -->

# Rejeição de argumentos inválidos

Uma classe também pode rejeitar argumentos que violem seu contrato.

```java
public Time(int hour, int minute, int second) {
  if (hour < 0 || hour >= 24
      || minute < 0 || minute >= 60
      || second < 0 || second >= 60) {
    throw new IllegalArgumentException(
        "Hora, minuto ou segundo fora do intervalo"
    );
  }

  this.hour = hour;
  //...
}
```

- `throw` interrompe imediatamente a execução
- A construção não é concluída e nenhuma referência válida é atribuída ao chamador
- `IllegalArgumentException` informa que um argumento viola o contrato
- O chamador pode capturar a exceção, mas não é obrigado a fazê-lo

---

<!-- _class: compact -->

# Palavra-chave this

```java
public Account(String name, double balance) {
  // Exemplo simplificado: as validações foram omitidas.
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

# Escopo de atributos, parâmetros e variáveis locais

```java
public class Account {
  private double balance; // atributo de instância

  public void deposit(double amount) { // parâmetro
    double previousBalance = balance;  // variável local

    if (amount > 0.0) {
      balance += amount;
    }
  }
}
```

- Atributos existem enquanto o objeto existir
- Parâmetros existem durante a execução da chamada
- Variáveis locais existem somente no bloco em que foram declaradas
- Atributos recebem valores padrão; variáveis locais precisam ser inicializadas antes do uso
- Um parâmetro pode ocultar um atributo de mesmo nome; `this` seleciona o atributo

---

<!-- _class: compact -->

# Sobrecarga de construtores

<div class="columns">
<div>

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

</div>
<div>

- Os construtores possuem listas de parâmetros diferentes
- `this(...)` delega para outro construtor da mesma classe
- A delegação deve ser a primeira instrução do construtor
- Centralizar a inicialização evita duplicação de regras
- Métodos também podem ser sobrecarregados quando possuem assinaturas diferentes
- Alterar somente o tipo de retorno não cria uma nova sobrecarga

</div>
</div>

---

<!-- _class: compact -->

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

# Métodos de instância e métodos estáticos

<table class="small">
<thead><tr><th>Método de instância</th><th>Método estático</th></tr></thead>
<tbody>
<tr><td>Representa comportamento do objeto</td><td>Pertence à classe</td></tr>
<tr><td>Chamado por uma referência</td><td>Chamado pelo nome da classe</td></tr>
<tr><td>Acessa atributos diretamente</td><td>Não acessa atributos de instância diretamente</td></tr>
<tr><td>Pode utilizar <code>this</code></td><td>Não possui <code>this</code></td></tr>
</tbody>
</table>

```java
account.deposit(50.0);          // método de instância
double maior = Math.max(2, 5);  // método estático
```

> O método `main` é estático porque a JVM precisa executá-lo antes de existir um objeto da classe da aplicação.

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

<div class="columns">

<div>

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
</div>

<div>

- *Getters* fornecem leitura controlada
- *Setters* permitem alteração controlada
- Nem todo atributo precisa de ambos
- Não ofereça `setBalance`: depósitos e saques expressam melhor as regras do domínio

</div>

</div>


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

# Passagem de argumentos por valor

Java sempre copia o valor fornecido como argumento.

```java
static void rename(Account account) {
  account.setName("Novo nome");
}

Account original = new Account("Ana", 100.0);
rename(original);
System.out.println(original.getName()); // Novo nome
```

- Para um tipo primitivo, copia-se o valor primitivo
- Para um objeto, copia-se o valor da referência
- Parâmetro e argumento podem, portanto, alcançar o mesmo objeto
- Alterar o objeto pelo parâmetro pode ser observado pelo chamador
- Atribuir outra referência ao parâmetro não altera a variável do chamador

> Java não passa objetos por referência; passa por valor uma referência ao objeto.

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
    this.name = name != null && !name.isBlank()
        ? name : "Sem nome";
    this.age = age >= 0 ? age : 0;
    this.course = course != null && !course.isBlank()
        ? course : "Não informado";
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
