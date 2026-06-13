---
marp: true
theme: idp
paginate: false
html: true
footer: <span>Projeto de Pesquisa</span><span>Pré-projeto de dissertação</span><span>Fabricio Fernandes Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

## Projeto de Pesquisa

# Técnicas de Avaliação de Sistemas RAG: aplicação empírica a discursos legislativos do Senado Federal

<div class="objectives">

**Objetivo da apresentação**

- Simulação da banca de qualificação
</div>

<div class="contact">
Fabricio Fernandes Santana<br>
Disciplina: Projeto de Pesquisa<br>
Profs. Drs. Hélio Bomfim de Macêdo Filho<br>
e Marcelo Rodrigo de Souza Pita <br>

junho/2026

</div>

---

# Contextualização temática

- Grandes modelos de linguagem produzem texto em linguagem natural, mas não são, por definição, mecanismos confiáveis de recuperação documental.
- Sistemas **RAG** combinam geração textual com recuperação de documentos em base externa.
- Essa arquitetura pode favorecer atualização, rastreabilidade, controle documental e respostas ancoradas em evidências.
- Em acervos públicos, especialmente legislativos, respostas generativas precisam ser verificáveis, rastreáveis e compatíveis com transparência, responsabilização e governança.

---

# Problemática

- A avaliação de sistemas RAG é multidimensional: envolve recuperação, geração, fidelidade ao contexto, fontes, julgamento humano e avaliação automatizada.
- Uma resposta fluente pode estar apoiada em evidências frágeis ou extrapolar o contexto recuperado.
- Órgãos públicos acumulam acervos de alto valor institucional, mas precisam de critérios explícitos para avaliar respostas generativas.
- No Legislativo, discursos parlamentares têm volume elevado, diversidade temática, dispersão temporal, variação terminológica e forte dependência de metadados.

---

# Problemática: Pipeline RAG

<img src="../images/chatbot-rag/rag-pipeline.png" style="display:block; max-width:100%; max-height:470px; margin:0 auto; object-fit:contain;">

<div class="small">

Componentes do pipeline condicionam recuperação, contexto, fidelidade ao acervo e verificabilidade das respostas.

</div>

---

# Problema de pesquisa

<div class="callout">

**Pergunta de pesquisa**

Como técnicas de avaliação de sistemas RAG podem ser organizadas e aplicadas à análise de recuperação, geração e verificabilidade em discursos da 56ª Legislatura do Senado Federal?

</div>

---

# Objetivo geral

Sistematizar técnicas de avaliação de sistemas RAG e aplicá-las a um caso empírico de consulta a discursos da 56ª Legislatura do Senado Federal, com foco na recuperação documental, na geração de respostas e na verificabilidade das fontes.

---

# Objetivos específicos

<!-- _class: compact -->

1. Sistematizar a literatura sobre avaliação de RAG: métricas de recuperação, avaliação de geração, benchmarks, rubricas, avaliação humana e LLM como juiz.
2. Selecionar técnicas de avaliação aplicáveis ao caso empírico, contemplando recuperação, geração, verificabilidade, robustez e governança.
3. Caracterizar o acervo de discursos parlamentares da 56ª Legislatura do Senado Federal.
4. Construir bateria de perguntas de teste, com categorias, respostas esperadas e evidências documentais de referência.
5. Aplicar métricas, rubrica humana e avaliação auxiliar por LLM como juiz.
6. Analisar complementaridade, limites e condições de uso das técnicas avaliativas.

---

# Referencial Teórico

<!-- _class: compact -->

<div class="columns" style="--columns: 3;">

<div class="callout">

**1. IA generativa, RAG e recuperação de informação**

- LLMs e transformers
- Geração textual ancorada em documentos
- Pipeline RAG: chunks, metadados, embeddings, busca e prompt

</div>

<div class="callout">

**2. Informação legislativa, transparência e acervos parlamentares**

- Discursos como memória institucional
- Acesso formal e acesso substantivo
- Autoria, temporalidade e metadados

</div>

<div class="callout">

**3. Avaliação de sistemas RAG e governança pública de IA**

- Recuperação, geração e fontes
- Avaliação humana e LLM como juiz
- Supervisão, auditoria e usos aceitáveis

</div>

</div>

---

# Hipóteses de estudo

<!-- _class: compact -->

- **P1:** evidências pertinentes ajudam a sustentar a verificabilidade; a geração ainda pode extrapolar ou citar mal as fontes.
- **P2:** o desempenho tende a cair em perguntas com múltiplas evidências, raciocínio em etapas ou informação ausente.
- **P3:** LLM como juiz ajuda na triagem e na escala; a validação humana segue necessária.
- **P4:** o juízo sobre uso institucional depende da combinação entre desempenho técnico e requisitos verificáveis de governança.

<div class="small">

</div>

---

# Método de pesquisa

<!-- _class: compact -->

<div class="columns">

<div>

**Delineamento**

- Pesquisa aplicada, exploratória e descritiva
- Abordagem multimétodos
- Orientação hipotético-dedutiva com componente indutivo na análise de erros
- Design Science Research como enquadramento do artefato

</div>

<div>

**Coleta e análise**

- Corpus: discursos da 56ª Legislatura do Senado Federal
- Bateria de perguntas e gold standard
- Métricas: Hit@k, Recall@k, Precision@k, MRR e nDCG
- Rubrica humana, LLM como juiz e análise qualitativa de casos críticos

</div>

</div>

---

# Referências

<!-- _class: compact -->

<div class="tiny">

- ALMEIDA, Patricia Gomes Rêgo de; SANTOS JÚNIOR, Carlos Denner dos. Artificial intelligence governance. _Government Information Quarterly_, 2025.
- BANDEIRA, Cristina Leston; BERNARDES, Cristiane Brum. Information vs Engagement in Parliamentary Websites. _Revista de Sociologia e Política_, 2016.
- ES, Shahul et al. Ragas: Automated Evaluation of Retrieval Augmented Generation. 2023.
- GAO, Yunfan et al. Retrieval-Augmented Generation for Large Language Models: A Survey. 2023.
- GUPTA, Shailja; RANJAN, Rajesh; SINGH, Surya Narayan. A Comprehensive Survey of RAG. 2024.
- HEVNER, Alan R. et al. Design Science in Information Systems Research. _MIS Quarterly_, 2004.
- INTER-PARLIAMENTARY UNION. _Use Cases for AI in Parliaments_. 2024.
- LEWIS, Patrick et al. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. _NeurIPS_, 2020.
- LIU, Yang et al. G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment. 2023.
- SAAD-FALCON, Jon et al. ARES: Automated Evaluation Framework for RAG Systems. 2024.
- WESTMINSTER FOUNDATION FOR DEMOCRACY. _Guidelines for AI in Parliaments_. 2023.

</div>
