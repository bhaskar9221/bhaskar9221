# Bhaskar Mondal

**Machine & Deep Learning Engineer** · first principles, evaluation, and the systems that ship them.

I work at the level of the algorithm, not just the API. That means deriving the math before using it, reimplementing the core methods in NumPy to confirm I understand them, and measuring a model against baselines before trusting it. I am most interested in deep learning, generative models, and evaluating models honestly. I want to do work where the question is at least as interesting as the demo.

[Email](mailto:bhaskarmondal7221@gmail.com) · [LinkedIn](https://linkedin.com/in/bhaskar9221) · [Kaggle](https://kaggle.com/bhaskarkumar11) · [LeetCode](https://leetcode.com/bhaskar9221) · **Open to ML research and engineering roles**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/research-map-dark.svg">
  <img src="assets/research-map.svg" alt="A five-stage research workflow: first principles, from scratch, evaluation, generative models, and systems, with an iteration loop from evaluation back to rebuilding." width="100%">
</picture>

---

### Research interests

Deep learning and representation learning · generative models · optimization from first principles · evaluation and benchmarking · efficient inference

---

### Selected work

**[BareMetalML](https://github.com/bhaskar9221/BareMetalML)** · Python, NumPy · *in progress*
Reimplementing core ML algorithms from scratch to verify the math, not just use it. Linear regression (normal equation, SGD, Ridge), logistic regression (binary cross-entropy, one-vs-rest), decision trees (Gini and entropy splits), and Random Forest (bagging). Includes my own train/test split, scalers, and metrics.

**Speech emotion recognition** · PyTorch · Arcitech AI
A CNN trained from scratch across four benchmark datasets (RAVDESS, TESS, CREMA-D, SAVEE). Reached ~88% accuracy over 7 classes in under 50 MB, sized for edge deployment.

**RAG with hallucination mitigation** · LangChain, FAISS · Ebizon Cloud
A retrieval pipeline over Oracle Cloud documentation. Benchmarked five LLMs on an 80–100 question set, then built confidence scoring, citation verification, and answer cross-checking to reduce unsupported output.

**AnimeGAN** · PyTorch · *in progress*
A GAN built from scratch to study image-to-image translation and what the generator actually learns.

---

### Experience

**AI Engineer Intern** · Arcitech AI · `Jul – Dec 2025`
Trained the speech-emotion CNN and shipped the production pipeline around it: transcription, NER, PII redaction, emotion scoring, and a 12-KPI analytics engine, served through FastAPI for 100–150 calls per run. Benchmarked Whisper against AssemblyAI on noisy audio and moved to the model that won.

**AI Engineer Intern** · Ebizon Cloud · `Mar – May 2025`
Built the RAG pipeline above, including the LLM benchmark and the hallucination-mitigation framework. Refined chunking, retrieval, and prompting against the evaluation set instead of by intuition.

---

### Benchmarks and evaluation

| Kaggle | Result | Field |
|:--|:--:|:--|
| Academic Success Classification | **47 / 2,684** · top 2% | Tabular classification |
| Irrigation Need Prediction | **86 / 4,315** · top 2% | Tabular classification |
| Calorie Expenditure Prediction | **150 / 4,316** · top 4% | Tabular regression |
| [LLM 20 Questions](https://www.kaggle.com/competitions/llm-20-questions) | 832 teams | LLM agent |

I treat evaluation as part of the research, not a final checkbox: benchmark against baselines, report where the model fails, and only then claim a result.

---

### Toolbox

Python · PyTorch · TensorFlow · Keras · NumPy · scikit-learn · XGBoost · LightGBM · CatBoost

LangChain · Hugging Face · OpenAI · OpenRouter · FAISS · RAG · prompt engineering

FastAPI · Docker · MLflow · GCP · AWS · Git · Streamlit · Gradio

SQL (MySQL, PostgreSQL) · C/C++ (basic)

---

<sub>Open to machine learning research and engineering work. [bhaskarmondal7221@gmail.com](mailto:bhaskarmondal7221@gmail.com)</sub>
