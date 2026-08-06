# Slides com Marp

## Estrutura

- `themes/idp.css`: tema Marp com paleta, capa, barra superior, rodapé e logo.
- `assets/IDP.png`: logo usado pelo tema.
- `subjects/`: disciplinas, aulas e materiais de apoio.
- `subjects/poo/poo.md`: arquivo principal da disciplina POO.
- `subjects/poo/lectures/01-introduction.md`: aula de exemplo.
- `.marprc.yml`: registra o tema local para o Marp CLI.

```text
.
├── assets/
│   └── IDP.png
├── themes/
│   └── idp.css
├── subjects/
│   └── poo/
│       ├── code/
│       │   └── OlaMundo.java
│       ├── images/
│       │   ├── 01-alice.jpeg
│       │   └── 01-cartoon.png
│       ├── lectures/
│       │   └── 01-introduction.md
│       ├── references/
│       │   └── referencias.bib
│       └── poo.md
└── dist/
    ├── html/
    └── pdf/
```

## Como usar

No front matter do arquivo Markdown:

```yaml
---
marp: true
theme: idp
paginate: true
html: true
footer: <span>Curso</span><span>Aula</span><span>Professor</span>
---
```

Para a capa, use a classe local no primeiro slide:

```markdown
<!-- _class: title -->
<!-- _paginate: false -->

## Nome da Disciplina

# Titulo da Aula

<div class="objectives">

**Objetivos da aula**

- Objetivo 1
- Objetivo 2

</div>

<div class="contact">
Prof. Nome<br>
email@dominio.com<br>
linkedin.com/in/seu-perfil
</div>
```

## Renderizacao

Com Node.js e npm instalados:

```bash
npm install
npm run html
npm run pdf
```

Para uma aula isolada:

```bash
npm run html:poo:01
npm run pdf:poo:01
```

Para gerar PDF, o Marp CLI precisa encontrar Chrome, Edge ou Firefox instalado
no ambiente.

O script de HTML tambem copia os assets necessarios para `dist/assets/` e
`dist/images/`, de modo que imagens e logo funcionem ao abrir o arquivo gerado.

Tambem e possivel usar a extensao Marp for VS Code apontando para
`themes/idp.css` como tema local.
