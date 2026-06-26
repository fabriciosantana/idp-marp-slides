---
marp: true
theme: idp
paginate: false
html: true
footer: <span>Projeto de Ciência de Dados e Inteligência Artificial</span><span>Pré-projeto de pesquisa</span><span>Fabricio Fernandes Santana</span>
---

<!-- _class: title -->
<!-- _paginate: false -->

## Projeto de Ciência de Dados e Inteligência Artificial

# Técnicas de Avaliação de Sistemas RAG: aplicação empírica a discursos legislativos do Senado Federal

<div class="objectives">

**Objetivo da apresentação**

- Simulação da banca de qualificação
</div>

<div class="contact">
Fabricio Fernandes Santana<br>
Pré-projeto de pesquisa<br>
Profs. Drs. Hélio Bomfim de Macêdo Filho<br>
e Marcelo Rodrigo de Souza Pita <br><br>
junho/2026

</div>

---

<!-- _class: compact -->

# Contextualização temática

## No Senado Federal são proferidos milhares de discursos

<div class="columns">

<div>

- Grande volume de dados textuais
- Transparência não garante acesso
- Necessidade de recuperar informação
- Limitação na recuperação tradicional
- Contexto público exige verificabilidade
- IA generativa apresenta riscos
- RAG oferece mitigação via pipeline
- Métodos para avaliação de RAG

> Ausência de um protocolo de avaliação de sistema RAG no contexto público

</div>

<div>

<img src="../images/chatbot-rag/pronunciamentos-por-ano.png">

<div class="small">

(BLANCO, 2025).

</div>

</div>

---

<!-- _class: compact -->

# Problemática

- **Discursos parlamentares**: alto volume e extensos (~15.000 entre 2019-2023)
- **Recuperação da Informação**: necessidade de conhecimento especializado
- **Alucinação**: resposta fluente de IA generativa pode estar apoiada em evidências frágeis ou extrapolar o contexto recuperado.
- **RAG**: envolve recuperação, geração das respostas, verificabilidade das fontes, fidelidade ao contexto, julgamento humano e avaliação automatizada.
- **Avaliação no contexto público**: necessidade de critérios explícitos para avaliar respostas generativas.

---

# Problemática: Pipeline RAG

<img src="../images/chatbot-rag/rag-pipeline.png">

<div class="small">

> Componentes do pipeline condicionam recuperação, contexto, fidelidade ao acervo e verificabilidade das respostas.

</div>

---

# Problema de pesquisa

<div class="callout">

**Pergunta de pesquisa**

Como técnicas de avaliação de sistemas RAG podem ser organizadas em um protocolo e aplicadas a um sistema RAG voltado à consulta de discursos da 56ª Legislatura do Senado Federal, com foco na análise da recuperação documental, da geração de respostas e da verificabilidade das fontes?

</div>

---

# Objetivo geral

**Organizar técnicas** de avaliação de sistemas RAG **em um protocolo articulado** e **aplicá-lo a um caso empírico** de consulta a discursos da 56ª Legislatura do Senado Federal, com foco na recuperação documental, na geração de respostas e na verificabilidade das fontes.

---

# Objetivos específicos

<!-- _class: compact -->

1. **Sistematizar a literatura sobre técnicas de avaliação de RAG**, incluindo métricas de recuperação, avaliação de geração, benchmarks, rubricas, avaliação humana e avaliações baseadas no paradigma LLM-as-a-judge;
2. **Selecionar, a partir da sistematização da literatura, técnicas de avaliação de RAG** a serem aplicadas ao caso empírico, contemplando recuperação documental, geração de respostas e verificabilidade das fontes;
3. **Caracterizar o acervo de discursos parlamentares** da 56ª Legislatura do Senado Federal como caso empírico da pesquisa;
4. **Construir uma bateria de perguntas de teste**, com categorias, respostas esperadas e evidências documentais de referência;
5. **Aplicar ao caso empírico o protocolo de avaliação** organizado a partir das técnicas selecionadas;
6. **Analisar a complementaridade e os limites das técnicas avaliativas** quando aplicadas a um acervo legislativo real, com foco na recuperação documental, na geração de respostas e na verificabilidade das fontes.

---

# Referencial Teórico

<!-- _class: compact -->

<div class="columns small" style="--columns: 3;">

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

> Escassez de estudos empíricos que combinem acervo parlamentar real e um pipeline RAG reprodutível e um protocolo de avaliação para o contexto público.

---

# Hipóteses de estudo

<!-- _class: compact -->

> As hipóteses assumem a forma de hipóteses de trabalho vericáveis, ou seja, não serão tratadas como teste causal clássico entre uma variável independente e uma variável dependente única

- **H1:** A pertinência das evidências recuperadas é condição necessária, mas não suficiente, para a verificabilidade das respostas.
- **H2:** O desempenho do sistema tende a ser inferior em perguntas que exigem integração de múltiplas evidências, raciocínio em etapas ou reconhecimento de informação ausente, em comparação com perguntas factuais simples, delimitadas por autor e apoiadas em evidência documental direta.
- **H3:** A avaliação baseada no paradigma LLM-as-a-judge apresentará concordância parcial com a avaliação humana, mas será insuficiente como critério único de qualidade.

<div class="small">

</div>

---

# Método de pesquisa

<!-- _class: compact -->

- **Natureza e abordagem da pesquisa**
  - **Natureza**: aplicada, exploratória e descritiva
  - **Método de abordagem**: hipotético-dedutiva, com componente indutivo
  - **Abordagem**: multimétodos com estratégias quantitativas e qualitativas
  - **Delineamento**: pesquisa bibliográfica, pesquisa documental, estudo de caso aplicado e aplicação controlada do protocolo avaliativo
  - **Enquadramento**: _Design Science Research_
- **Dados e técnicas de coleta**:
  - **Corpus**: discursos da 56ª legislatura obtidos no portal de dados do Senado
  - **Técnicas de coleta**: bibliográfica e técnico-normativa; documental; e, avaliativa
- **Técnicas de análise de dados**
  - **Recuperação documental**: Recall@k, Precision@k, MRR, nDCG, BEIR e Hit@k
  - **Geração de respostas por rubrica**
  - _LLM-as-a-judge_ e **Análise qualitativa de erros e casos críticos**

---

# Método de pesquisa

<img src="../images/chatbot-rag/matriz-metodologia.png">

---

# Recursos

- **Disponibilidade do corpus**
- **Infraestrutura computacional**
- **Disponibilidade de avaliadores humanos**
- **Controle de custos e tempo de execução**

---

# Cronograma

<img src="../images/chatbot-rag/matriz-metodologia.png">

---

# Referências

<!-- _class: compact -->

<div class="tiny">

- ALMEIDA, Patricia Gomes Rêgo de; SANTOS JÚNIOR, Carlos Denner dos. Artificial intelligence governance. _Government Information Quarterly_, 2025.
- BANDEIRA, Cristina Leston; BERNARDES, Cristiane Brum. Information vs Engagement in Parliamentary Websites. _Revista de Sociologia e Política_, 2016.
- BROWN, Tom B. et al. Language Models are Few-Shot Learners. _NeurIPS_, 2020.
- ES, Shahul et al. Ragas: Automated Evaluation of Retrieval Augmented Generation. 2023.
- GAO, Yunfan et al. Retrieval-Augmented Generation for Large Language Models: A Survey. 2023.
- GUPTA, Shailja; RANJAN, Rajesh; SINGH, Surya Narayan. A Comprehensive Survey of RAG. 2024.
- HEVNER, Alan R. et al. Design Science in Information Systems Research. _MIS Quarterly_, 2004.
- INTER-PARLIAMENTARY UNION. _Use Cases for AI in Parliaments_. 2024.
- LEWIS, Patrick et al. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. _NeurIPS_, 2020.
- LIU, Yang et al. G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment. 2023.
- MINAEE, Shervin et al. Large Language Models: A Survey. 2024.
- SAAD-FALCON, Jon et al. ARES: Automated Evaluation Framework for RAG Systems. 2024.
- WESTMINSTER FOUNDATION FOR DEMOCRACY. _Guidelines for AI in Parliaments_. 2023.
- ZHAO, Wayne Xin et al. A Survey of Large Language Models. 2023.

</div>
