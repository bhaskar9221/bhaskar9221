# Bhaskar Mondal

**Machine & Deep Learning Engineer**

[Email](mailto:bhaskarmondal7221@gmail.com) · [LinkedIn](https://linkedin.com/in/bhaskar9221) · [Kaggle](https://kaggle.com/bhaskarkumar11) · Open to ML research, research engineering, and ML engineering roles

<!--
  When your site or Google Scholar profile is live, add them here:
  [Website](https://your-site) · [Google Scholar](https://scholar.google.com/...)
-->

---

### Research statement

I am an engineer by training and a scientist at heart. I care less about which library solves a problem and more about whether I can derive the solution, reimplement it, and show where it breaks.

My work follows one loop: understand the math, rebuild the method from scratch, measure it against a reference, and only then trust the result. I am drawn to deep learning, generative models, and the unglamorous part of research that makes results mean something: evaluation.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/research-map-dark.svg">
  <img src="assets/research-map.svg" alt="A five-stage research workflow: first principles, from scratch, evaluation, generative models, and systems, with an iteration loop from evaluation back to rebuilding." width="100%">
</picture>

### Research interests

Deep learning and representation learning · generative models · optimization from first principles · evaluation and benchmarking · efficient inference

---

### Selected work

**BareMetalML** · Python, NumPy · [repository](https://github.com/bhaskar9221/BareMetalML)
*Question:* how much does building an algorithm yourself actually teach you about it?
*Method:* implemented eight algorithms from scratch: linear and logistic regression, decision trees, Random Forest, KNN, Naive Bayes, K-Means, and PCA. Scikit-learn appears only as a verification oracle and baseline.
*Result:* every implementation matches sklearn within 1e-10 on the same data. A head-to-head notebook trains all classifiers on one split, where the decision tree's 100% train accuracy next to 93% test accuracy shows overfitting directly in the decision boundary.

**Speech emotion recognition** · PyTorch · Arcitech AI
*Question:* can a small model generalize across recording conditions and speakers?
*Method:* trained a CNN from scratch on RAVDESS, TESS, CREMA-D, and SAVEE, under a 50 MB edge-deployment constraint.
*Result:* ~88% accuracy across 7 emotion classes, small enough to run at the edge.

**RAG with hallucination mitigation** · LangChain, FAISS · Ebizon Cloud
*Question:* how do you make a retrieval system's answers verifiable, not just fluent?
*Method:* built retrieval over Oracle Cloud documentation, then benchmarked five LLMs on an 80–100 question set.
*Result:* added confidence scoring, citation verification, and answer cross-checking, and selected models on measured grounding rather than impression.

**AnimeGAN** · PyTorch · *in progress*
*Question:* what does a generator actually learn about style, and what does it preserve from the input?
*Method:* building a GAN from scratch to control and inspect the components, rather than fine-tuning an existing one.

---

### Open questions

The problems I am currently circling. Each has a method attached.

- **How much does behavioral verification prove?** BareMetalML matches sklearn numerically, but that is not the same as understanding the failure modes. Next: stress the implementations on degenerate inputs and sparse regimes, and compare where they break.
- **Do tree ensembles degrade gracefully or collapse?** Train Random Forest under controlled label noise and track when the ensemble stops beating a single tree.
- **What does the generator actually encode?** Probe AnimeGAN's latent space for content-versus-style separation instead of judging only by samples.
- **Can evaluation be cheap and honest?** Small, well-constructed question sets against larger ones, to see how much evaluation you can do without a huge budget.

---

### Experience

**AI Engineer Intern** · Arcitech AI · `Jul – Dec 2025`
*Problem:* turn call recordings into measurable signals without giving up accuracy or deployability.
Worked across the pipeline: a from-scratch CNN for speech emotion, transcription with Whisper and then AssemblyAI after benchmarking on noisy audio, NER, PII redaction, emotion scoring, and a 12-KPI analytics engine, served through FastAPI for 100–150 calls per run.

**AI Engineer Intern** · Ebizon Cloud · `Mar – May 2025`
*Problem:* make a documentation assistant's answers verifiable.
Built the RAG pipeline and its evaluation, including the five-model benchmark and the hallucination-mitigation framework, refining chunking, retrieval, and prompting against the eval set rather than by intuition.

---

### Evaluation principles

1. Baseline before claim. A result means nothing without a reference point.
2. Measure where the model fails, not just how often it succeeds.
3. Report the constraint: size, latency, or cost, since it usually explains the tradeoff.
4. Prefer a small, well-designed eval you trust over a large, noisy one.

---

### Benchmarks

| Kaggle | Result | Field |
|:--|:--:|:--|
| Academic Success Classification | **47 / 2,684** · top 2% | Tabular classification |
| Irrigation Need Prediction | **86 / 4,315** · top 2% | Tabular classification |
| Calorie Expenditure Prediction | **150 / 4,316** · top 4% | Tabular regression |
| [LLM 20 Questions](https://www.kaggle.com/competitions/llm-20-questions) | 832 teams | LLM agent |

---

### Toolbox

Python · PyTorch · TensorFlow · Keras · NumPy · scikit-learn · XGBoost · LightGBM · CatBoost

LangChain · Hugging Face · OpenAI · OpenRouter · FAISS · RAG · prompt engineering

FastAPI · Docker · MLflow · GCP · AWS · Git · Streamlit · Gradio

SQL (MySQL, PostgreSQL) · C/C++ (basic)

---

<sub>[bhaskarmondal7221@gmail.com](mailto:bhaskarmondal7221@gmail.com) · Open to machine learning research and engineering work.</sub>
