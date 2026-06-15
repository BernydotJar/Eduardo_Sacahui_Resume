/* RAG Made Easy — interactive demo. Uses the RAGKit global from rag.bundle.js. */
(function () {
  "use strict";

  const { RAG, ExtractiveGenerator, ClaudeGenerator, evaluate } = window.RAGKit;

  // ---- topics: each loads its own sample docs + suggested questions ----
  const TOPICS = {
    coffee: {
      label: "☕ Aurora Coffee — store handbook",
      questions: [
        "What water temperature for pour-over?",
        "Do gift cards expire?",
        "What does the house blend taste like?",
        "When do espresso machines get cleaned?",
      ],
      docs: [
        `Aurora Coffee — Brewing Handbook

Pour-over coffee should be brewed with water between 92 and 96 degrees Celsius; hotter water extracts bitterness, cooler water under-extracts. Use a medium-fine grind and a 1:16 coffee-to-water ratio.

Espresso shots are pulled at 9 bars of pressure for 25 to 30 seconds. The espresso machines are backflushed and cleaned every night at closing time.

Cold brew steeps for 16 hours in the walk-in fridge and is served within 5 days of brewing.`,
        `Aurora Coffee — Store Policies

Refunds are available within 30 days of purchase with a receipt. Drinks remade for quality reasons are always free.

Gift cards never expire and can be reloaded online or in store. Loyalty members earn one star per dollar; 50 stars equals a free drink of any size.

The shop opens at 7:00 AM on weekdays and 8:00 AM on weekends. Last orders are taken 15 minutes before closing.`,
        `Aurora Coffee — Bean Guide

Our house blend, Midnight Velvet, combines Brazilian and Ethiopian beans roasted to a medium-dark profile with notes of chocolate and ripe cherry.

The single-origin rotation changes monthly. Beans are rested for 7 days after roasting before being served, and whole-bean bags are best within 5 weeks of the roast date printed on the bag.`,
      ],
    },

    pokedex: {
      label: "⚡ Pokédex — Pokémon field notes",
      questions: [
        "How does Pikachu grow up?",
        "Which type beats Water?",
        "What is Mewtwo made from?",
        "What type is Charizard?",
      ],
      docs: [
        `Pokédex — Kanto Starters & Friends

Pikachu is an Electric-type Pokémon. It stores electricity in its cheeks and releases it in lightning-based attacks. Pikachu evolves from Pichu when leveled up with high friendship, and evolves into Raichu when exposed to a Thunder Stone.

Charizard is a dual Fire and Flying-type Pokémon and the final evolution of Charmander. It can breathe fire hot enough to melt boulders.

Bulbasaur is a dual Grass and Poison-type Pokémon. It carries a plant seed on its back that grows as it evolves into Ivysaur and then Venusaur, absorbing sunlight for energy.`,
        `Pokédex — Types & Battles

Pokémon battles are governed by a type matchup chart. Water is strong against Fire, Fire is strong against Grass, and Grass is strong against Water, forming a balanced triangle.

Electric-type moves are super effective against Water and Flying types but have no effect on Ground types. A Pokémon's type also determines which moves it can learn and resist.`,
        `Pokédex — Legendary Pokémon

Mewtwo is a Psychic-type Legendary Pokémon created through genetic engineering from the DNA of Mew. It is renowned for its immense psychic power and cold intelligence.

Lugia is a dual Psychic and Flying-type Legendary known as the guardian of the seas. It can calm or stir storms, and a single flap of its wings is said to spawn forty-day storms.`,
      ],
    },

    embeddings: {
      label: "🧠 Embeddings & ML — how this demo works",
      questions: [
        "Why is semantic search better than keywords?",
        "What is cosine similarity?",
        "What can embeddings power?",
        "What is an embedding?",
      ],
      docs: [
        `Embeddings — The Big Idea

Embeddings are numerical representations of real-world objects such as words, sentences, or images, expressed as vectors of numbers. A machine learning model turns complex data into these vectors so that items with similar meaning end up close together in the vector space.`,
        `Embeddings — Why They Matter

Because related concepts sit near each other, embeddings let computers measure semantic similarity instead of matching exact keywords. A search for "laptop" can surface "notebook computer" even though the words differ, because their vectors are close.

Embeddings power semantic search, recommendation systems, clustering, and retrieval-augmented generation, where relevant context is fetched for a language model to ground its answers.`,
        `Embeddings — How They Are Made

A model is trained on large datasets and learns to place inputs in a high-dimensional space, often hundreds or thousands of dimensions. Distances and angles between vectors capture relationships: cosine similarity, the cosine of the angle between two vectors, is a common way to score how related two items are.`,
      ],
    },
  };

  const TOPIC_ORDER = ["coffee", "pokedex", "embeddings"];

  // ---- elements ----
  const docsInput = document.getElementById("docs-input");
  const topicSelect = document.getElementById("topic-select");
  const indexBtn = document.getElementById("index-btn");
  const askBtn = document.getElementById("ask-btn");
  const questionInput = document.getElementById("question-input");
  const apiKeyInput = document.getElementById("api-key-input");
  const statsEl = document.getElementById("stats");
  const resultsEl = document.getElementById("results");
  const chunksList = document.getElementById("chunks-list");
  const answerEl = document.getElementById("answer");
  const genModeEl = document.getElementById("gen-mode");
  const retrieveMsEl = document.getElementById("retrieve-ms");
  const suggestionsEl = document.getElementById("suggestions");
  const metricsEl = document.getElementById("metrics");
  const retrievalHelp = document.getElementById("retrieval-help");
  const modeHybridBtn = document.getElementById("mode-hybrid");
  const modeSemanticBtn = document.getElementById("mode-semantic");

  let retrievalMode = "hybrid"; // "hybrid" | "semantic"

  const steps = {
    chunk: document.getElementById("step-chunk"),
    embed: document.getElementById("step-embed"),
    retrieve: document.getElementById("step-retrieve"),
    generate: document.getElementById("step-generate"),
  };

  let rag = new RAG();
  let indexed = false;

  // ---- theme switcher ----
  const auroraBtn = document.getElementById("theme-aurora");
  const clarityBtn = document.getElementById("theme-clarity");

  function applyTheme(theme) {
    const clarity = theme === "clarity";
    document.documentElement.setAttribute("data-theme", clarity ? "clarity" : "");
    if (!clarity) document.documentElement.removeAttribute("data-theme");
    auroraBtn.classList.toggle("active", !clarity);
    clarityBtn.classList.toggle("active", clarity);
    auroraBtn.setAttribute("aria-pressed", String(!clarity));
    clarityBtn.setAttribute("aria-pressed", String(clarity));
    try {
      localStorage.setItem("rag-theme", clarity ? "clarity" : "aurora");
    } catch (e) {}
  }
  auroraBtn.addEventListener("click", () => applyTheme("aurora"));
  clarityBtn.addEventListener("click", () => applyTheme("clarity"));
  applyTheme(document.documentElement.getAttribute("data-theme") === "clarity" ? "clarity" : "aurora");

  // ---- topic dropdown ----
  for (const key of TOPIC_ORDER) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = TOPICS[key].label;
    topicSelect.appendChild(opt);
  }

  function loadTopic(key) {
    const topic = TOPICS[key];
    docsInput.value = topic.docs.join("\n\n---\n\n");
    renderSuggestions(topic.questions);
    // selecting a new topic means the previous index is stale — require re-index
    indexed = false;
    askBtn.disabled = true;
    statsEl.hidden = true;
    resultsEl.hidden = true;
    indexBtn.textContent = "Index documents";
    questionInput.value = "";
    questionInput.placeholder = "Index this topic first, then ask…";
  }

  topicSelect.addEventListener("change", () => loadTopic(topicSelect.value));

  // ---- retrieval mode toggle (andragogy: see a technique's effect) ----
  function setMode(mode) {
    retrievalMode = mode;
    const hybrid = mode === "hybrid";
    modeHybridBtn.classList.toggle("active", hybrid);
    modeSemanticBtn.classList.toggle("active", !hybrid);
    modeHybridBtn.setAttribute("aria-pressed", String(hybrid));
    modeSemanticBtn.setAttribute("aria-pressed", String(!hybrid));
    retrievalHelp.textContent = hybrid ? "semantic + keyword (BM25)" : "vector similarity only";
    if (indexed && questionInput.value.trim()) ask();
  }
  modeHybridBtn.addEventListener("click", () => setMode("hybrid"));
  modeSemanticBtn.addEventListener("click", () => setMode("semantic"));

  function renderSuggestions(list) {
    suggestionsEl.innerHTML = "";
    for (const q of list) {
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.textContent = q;
      chip.addEventListener("click", () => {
        questionInput.value = q;
        if (indexed) ask();
      });
      suggestionsEl.appendChild(chip);
    }
  }

  function pulse(stepKey, ms = 900) {
    const el = steps[stepKey];
    el.classList.add("active");
    setTimeout(() => el.classList.remove("active"), ms);
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---- indexing ----
  async function indexDocuments() {
    indexBtn.disabled = true;
    indexBtn.textContent = "Indexing…";
    pulse("chunk");

    rag = new RAG();
    const rawDocs = docsInput.value
      .split(/\n\s*---\s*\n/)
      .map((t) => t.trim())
      .filter(Boolean);

    const t0 = performance.now();
    let totalChunks = 0;
    for (let i = 0; i < rawDocs.length; i++) {
      const firstLine = rawDocs[i].split("\n")[0].slice(0, 40) || `doc-${i + 1}`;
      const chunks = await rag.add({ id: firstLine, text: rawDocs[i] });
      totalChunks += chunks.length;
    }
    pulse("embed");
    const ms = Math.round(performance.now() - t0);

    document.getElementById("stat-docs").textContent = rawDocs.length;
    document.getElementById("stat-chunks").textContent = totalChunks;
    document.getElementById("stat-dims").textContent = rag.embedder.dimensions;
    document.getElementById("stat-ms").textContent = ms;
    statsEl.hidden = false;

    indexed = true;
    askBtn.disabled = false;
    indexBtn.disabled = false;
    indexBtn.textContent = "Re-index documents";
    questionInput.placeholder = "Ask a question about this topic…";
  }

  // ---- asking ----
  async function ask() {
    const question = questionInput.value.trim();
    if (!question || !indexed) return;

    askBtn.disabled = true;
    resultsEl.hidden = false;
    chunksList.innerHTML = "";
    answerEl.classList.add("thinking");
    answerEl.textContent = "Retrieving…";

    pulse("retrieve");
    const t0 = performance.now();
    const sources = await rag.retrieve(question, 3, { hybrid: retrievalMode === "hybrid" });
    retrieveMsEl.textContent = `· ${Math.round(performance.now() - t0)} ms · ${retrievalMode}`;

    const maxScore = Math.max(...sources.map((s) => s.score), 0.0001);
    const cardsById = {};
    for (const s of sources) {
      const card = document.createElement("div");
      card.className = "chunk-card glass-inner";
      card.innerHTML =
        '<div class="chunk-meta"><span class="chunk-id">' + escapeHtml(s.id) + "</span><span>score " +
        s.score.toFixed(3) + "</span></div>" +
        "<div>" + escapeHtml(s.text.length > 220 ? s.text.slice(0, 220) + "…" : s.text) + "</div>" +
        '<div class="score-bar"><div class="score-fill" style="width:0%"></div></div>';
      chunksList.appendChild(card);
      cardsById[s.id] = card;
      const fill = card.querySelector(".score-fill");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          fill.style.width = Math.max(6, (s.score / maxScore) * 100) + "%";
        }),
      );
    }

    pulse("generate", 1400);
    answerEl.textContent = "Generating…";

    const apiKey = apiKeyInput.value.trim();
    const generator = apiKey
      ? new ClaudeGenerator({ apiKey, dangerouslyAllowBrowser: true })
      : new ExtractiveGenerator();
    genModeEl.textContent = apiKey ? "· Claude (claude-opus-4-8)" : "· local extractive mode";

    try {
      let streamed = "";
      const answer = await generator.generate(question, sources, {
        onToken: (delta) => {
          if (answerEl.classList.contains("thinking")) {
            answerEl.classList.remove("thinking");
            answerEl.textContent = "";
          }
          streamed += delta;
          answerEl.textContent = streamed;
        },
      });
      answerEl.classList.remove("thinking");
      answerEl.textContent = answer;
      renderMetrics(question, answer, sources, cardsById);
    } catch (err) {
      answerEl.classList.remove("thinking");
      answerEl.innerHTML =
        '<span class="error">Generation failed: ' + escapeHtml(String(err && err.message ? err.message : err)) + "</span>";
    }

    askBtn.disabled = false;
  }

  // ---- answer-quality metrics + citations ----
  function setBar(valId, barId, value) {
    document.getElementById(valId).textContent = Math.round(value * 100) + "%";
    const bar = document.getElementById(barId);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        bar.style.width = Math.max(3, value * 100) + "%";
      }),
    );
  }

  function renderMetrics(question, answer, sources, cardsById) {
    const m = evaluate(question, answer, sources);
    setBar("m-context", "m-context-bar", m.contextRelevance);
    setBar("m-grounded", "m-grounded-bar", m.groundedness);
    setBar("m-relevance", "m-relevance-bar", m.answerRelevance);

    // mark which chunks actually grounded the answer
    for (const id of m.citedSourceIds) {
      const card = cardsById[id];
      if (card && !card.querySelector(".chunk-badge")) {
        const badge = document.createElement("span");
        badge.className = "chunk-badge";
        badge.textContent = "✓ cited";
        card.querySelector(".chunk-id").after(badge);
      }
    }
  }

  indexBtn.addEventListener("click", () => indexDocuments());
  askBtn.addEventListener("click", () => ask());
  questionInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") ask();
  });

  // ---- init ----
  topicSelect.value = "coffee";
  loadTopic("coffee");
})();
