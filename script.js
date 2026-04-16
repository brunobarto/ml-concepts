const content = document.getElementById("content");

const baseDefs = `
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#00eaff"/>
    </marker>
  </defs>
`;

const sections = {
  calling: () => `
    <h2>📡 Calling Models (LLM APIs)</h2>
    <div class="stepper">
      <div class="step active" data-step="1">1. Prompt</div>
      <div class="step" data-step="2">2. API Call</div>
      <div class="step" data-step="3">3. Response</div>
    </div>
    <p id="calling-text">
      Applications send prompts to a hosted model (OpenAI, Azure, Anthropic...). 
      The model returns text, code, or structured output.
    </p>

    <div class="diagram">
      <svg id="calling-svg">
        ${baseDefs}
        <rect x="60" y="80" width="160" height="60" class="node"/>
        <text x="140" y="115" fill="#00eaff" text-anchor="middle">Your App</text>

        <rect x="340" y="80" width="220" height="60" class="node"/>
        <text x="450" y="115" fill="#00eaff" text-anchor="middle">LLM API</text>

        <line x1="220" y1="110" x2="340" y2="110" class="arrow"/>

        <circle id="calling-packet" class="data-packet" cx="220" cy="110" r="5" />
      </svg>
    </div>

    <div class="controls">
      <div><span class="badge">Mini-sim</span> Simulate a prompt/response cycle.</div>
      <button id="btn-call-once">Send one prompt</button>
      <button id="btn-call-stream">Stream prompts</button>
      <div id="calling-log" class="log"></div>
    </div>
  `,

  rag: () => `
    <h2>📚 Grounding Models (RAG)</h2>
    <div class="stepper">
      <div class="step active" data-step="1">1. Query</div>
      <div class="step" data-step="2">2. Retrieve</div>
      <div class="step" data-step="3">3. Augment</div>
      <div class="step" data-step="4">4. Answer</div>
    </div>
    <p id="rag-text">
      RAG injects your own knowledge into the model using vector search and retrieved documents.
    </p>

    <div class="diagram">
      <svg id="rag-svg">
        ${baseDefs}
        <rect x="20" y="80" width="150" height="60" class="node"/>
        <text x="95" y="115" fill="#00eaff" text-anchor="middle">User Query</text>

        <rect x="230" y="20" width="150" height="60" class="node"/>
        <text x="305" y="55" fill="#00eaff" text-anchor="middle">Vector DB</text>

        <rect x="230" y="140" width="150" height="60" class="node"/>
        <text x="305" y="175" fill="#00eaff" text-anchor="middle">Docs</text>

        <rect x="440" y="80" width="200" height="60" class="node"/>
        <text x="540" y="115" fill="#00eaff" text-anchor="middle">LLM</text>

        <line x1="170" y1="110" x2="230" y2="50" class="arrow"/>
        <line x1="170" y1="110" x2="230" y2="170" class="arrow"/>
        <line x1="380" y1="50" x2="440" y2="110" class="arrow"/>
        <line x1="380" y1="170" x2="440" y2="110" class="arrow"/>

        <circle id="rag-packet-query" class="data-packet" cx="170" cy="110" r="5" />
        <circle id="rag-packet-docs" class="data-packet" cx="380" cy="170" r="5" />
      </svg>
    </div>

    <div class="controls">
      <div><span class="badge">Mini-sim</span> Live RAG: query → retrieval → context → answer.</div>
      <button id="btn-rag-run">Run RAG pipeline</button>
      <div id="rag-log" class="log"></div>
    </div>
  `,

  agents: () => `
    <h2>🤖 Chaining Models (Agents)</h2>
    <div class="stepper">
      <div class="step active" data-step="1">1. Plan</div>
      <div class="step" data-step="2">2. Call Tools</div>
      <div class="step" data-step="3">3. Synthesize</div>
    </div>
    <p id="agents-text">
      Agents break tasks into steps and call tools, APIs, or other models to complete them.
    </p>

    <div class="diagram">
      <svg id="agents-svg">
        ${baseDefs}
        <rect x="60" y="80" width="150" height="60" class="node"/>
        <text x="135" y="115" fill="#00eaff" text-anchor="middle">Agent</text>

        <rect x="320" y="20" width="150" height="60" class="node"/>
        <text x="395" y="55" fill="#00eaff" text-anchor="middle">Tool A</text>

        <rect x="320" y="140" width="150" height="60" class="node"/>
        <text x="395" y="175" fill="#00eaff" text-anchor="middle">Tool B</text>

        <line x1="210" y1="110" x2="320" y2="50" class="arrow"/>
        <line x1="210" y1="110" x2="320" y2="170" class="arrow"/>

        <circle id="agent-packet-a" class="data-packet" cx="210" cy="110" r="5" />
        <circle id="agent-packet-b" class="data-packet" cx="210" cy="110" r="5" />
      </svg>
    </div>

    <div class="controls">
      <div><span class="badge">Mini-sim</span> Agent reasoning: multi-step tool calls.</div>
      <button id="btn-agent-simple">Simple task</button>
      <button id="btn-agent-complex">Complex task</button>
      <div id="agents-log" class="log"></div>
    </div>
  `,

  evals: () => `
    <h2>📏 Measuring Models (Evals)</h2>
    <div class="stepper">
      <div class="step active" data-step="1">1. Test Set</div>
      <div class="step" data-step="2">2. Run Model</div>
      <div class="step" data-step="3">3. Score</div>
      <div class="step" data-step="4">4. Compare</div>
    </div>
    <p id="evals-text">
      Evals measure correctness, safety, latency, cost, and consistency across many test cases.
    </p>

    <div class="diagram">
      <svg id="evals-svg">
        ${baseDefs}
        <rect x="40" y="80" width="150" height="60" class="node"/>
        <text x="115" y="115" fill="#00eaff" text-anchor="middle">Model</text>

        <rect x="260" y="20" width="180" height="60" class="node"/>
        <text x="350" y="55" fill="#00eaff" text-anchor="middle">Test Cases</text>

        <rect x="260" y="140" width="180" height="60" class="node"/>
        <text x="350" y="175" fill="#00eaff" text-anchor="middle">Metrics</text>

        <line x1="190" y1="110" x2="260" y2="50" class="arrow"/>
        <line x1="190" y1="110" x2="260" y2="170" class="arrow"/>

        <circle id="eval-packet" class="data-packet" cx="190" cy="110" r="5" />
      </svg>
    </div>

    <div class="controls">
      <div><span class="badge">Mini-sim</span> Run a small eval suite.</div>
      <button id="btn-eval-run">Run evals</button>

      <div class="eval-bar">
        <div class="eval-metric">
          Accuracy
          <div class="eval-meter"><div id="acc-fill" class="eval-fill"></div></div>
        </div>
        <div class="eval-metric">
          Safety
          <div class="eval-meter"><div id="safety-fill" class="eval-fill"></div></div>
        </div>
        <div class="eval-metric">
          Latency
          <div class="eval-meter"><div id="latency-fill" class="eval-fill"></div></div>
        </div>
      </div>

      <div id="evals-log" class="log"></div>
    </div>
  `
};

function renderSection(key) {
  content.innerHTML = sections[key]();
  content.classList.add("fade-in");
  setTimeout(() => content.classList.remove("fade-in"), 400);
  document.querySelectorAll(".menu button").forEach(b => {
    b.classList.toggle("active", b.dataset.section === key);
  });
  initSectionLogic(key);
}

function initStepper(containerSelector, textId, stepsTexts) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const textEl = document.getElementById(textId);
  container.querySelectorAll(".step").forEach(step => {
    step.addEventListener("click", () => {
      const idx = parseInt(step.dataset.step, 10) - 1;
      container.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
      step.classList.add("active");
      if (stepsTexts[idx]) textEl.textContent = stepsTexts[idx];
    });
  });
}

function logLine(containerId, msg) {
  const log = document.getElementById(containerId);
  if (!log) return;
  const line = document.createElement("div");
  line.className = "log-line";
  line.textContent = `> ${msg}`;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function animatePacket(packet, path) {
  let t = 0;
  const duration = 600;
  const start = performance.now();

  function frame(now) {
    t = (now - start) / duration;
    if (t > 1) t = 1;
    const x = path.x1 + (path.x2 - path.x1) * t;
    const y = path.y1 + (path.y2 - path.y1) * t;
    packet.setAttribute("cx", x);
    packet.setAttribute("cy", y);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* Section-specific logic */

function initSectionLogic(key) {
  if (key === "calling") {
    initStepper(".stepper", "calling-text", [
      "You craft a prompt: instructions + context + examples.",
      "Your app sends the prompt to the LLM API endpoint.",
      "The model returns a response: text, code, or structured JSON."
    ]);

    const packet = document.getElementById("calling-packet");
    const btnOnce = document.getElementById("btn-call-once");
    const btnStream = document.getElementById("btn-call-stream");

    btnOnce.addEventListener("click", () => {
      packet.setAttribute("cx", 220);
      packet.setAttribute("cy", 110);
      animatePacket(packet, { x1: 220, y1: 110, x2: 340, y2: 110 });
      logLine("calling-log", "Sent prompt to LLM API. Received single response.");
    });

    btnStream.addEventListener("click", () => {
      let count = 0;
      function send() {
        if (count >= 3) return;
        packet.setAttribute("cx", 220);
        packet.setAttribute("cy", 110);
        animatePacket(packet, { x1: 220, y1: 110, x2: 340, y2: 110 });
        logLine("calling-log", `Chunk ${count + 1}: streamed token batch.`);
        count++;
        setTimeout(send, 450);
      }
      send();
    });
  }

  if (key === "rag") {
    initStepper(".stepper", "rag-text", [
      "User sends a natural language query.",
      "The system searches a vector database for similar chunks.",
      "Retrieved chunks are concatenated into a context window.",
      "The LLM answers using both the prompt and retrieved context."
    ]);

    const qPacket = document.getElementById("rag-packet-query");
    const dPacket = document.getElementById("rag-packet-docs");
    const btnRun = document.getElementById("btn-rag-run");

    btnRun.addEventListener("click", () => {
      logLine("rag-log", "Query received: \"Explain my internal policy.\"");
      qPacket.setAttribute("cx", 170);
      qPacket.setAttribute("cy", 110);
      animatePacket(qPacket, { x1: 170, y1: 110, x2: 230, y2: 50 });

      setTimeout(() => {
        logLine("rag-log", "Vector DB: retrieved top-3 relevant chunks.");
        dPacket.setAttribute("cx", 380);
        dPacket.setAttribute("cy", 170);
        animatePacket(dPacket, { x1: 380, y1: 170, x2: 440, y2: 110 });
      }, 600);

      setTimeout(() => {
        logLine("rag-log", "LLM: generated grounded answer using retrieved context.");
      }, 1200);
    });
  }

  if (key === "agents") {
    initStepper(".stepper", "agents-text", [
      "Agent plans steps to solve the task.",
      "Agent calls external tools/APIs to gather data.",
      "Agent synthesizes tool outputs into a final answer."
    ]);

    const pA = document.getElementById("agent-packet-a");
    const pB = document.getElementById("agent-packet-b");
    const btnSimple = document.getElementById("btn-agent-simple");
    const btnComplex = document.getElementById("btn-agent-complex");

    btnSimple.addEventListener("click", () => {
      logLine("agents-log", "Task: \"What is the weather in Paris?\"");
      pA.setAttribute("cx", 210);
      pA.setAttribute("cy", 110);
      animatePacket(pA, { x1: 210, y1: 110, x2: 320, y2: 50 });

      setTimeout(() => {
        logLine("agents-log", "Tool A: Weather API called.");
        logLine("agents-log", "Agent: Returned concise weather summary.");
      }, 700);
    });

    btnComplex.addEventListener("click", () => {
      logLine("agents-log", "Task: \"Plan a 3-day trip with budget and weather.\"");
      pA.setAttribute("cx", 210);
      pB.setAttribute("cx", 210);
      pA.setAttribute("cy", 110);
      pB.setAttribute("cy", 110);

      animatePacket(pA, { x1: 210, y1: 110, x2: 320, y2: 50 });
      setTimeout(() => {
        animatePacket(pB, { x1: 210, y1: 110, x2: 320, y2: 170 });
      }, 300);

      setTimeout(() => {
        logLine("agents-log", "Tool A: Weather + seasonality data.");
        logLine("agents-log", "Tool B: Budget + hotel options.");
      }, 800);

      setTimeout(() => {
        logLine("agents-log", "Agent: Combined tools into a structured itinerary.");
      }, 1400);
    });
  }

  if (key === "evals") {
    initStepper(".stepper", "evals-text", [
      "You define a test set of prompts and expected behaviors.",
      "The model is run on all test cases.",
      "Outputs are scored for correctness, safety, and latency.",
      "You compare models or configs and choose the best trade-off."
    ]);

    const packet = document.getElementById("eval-packet");
    const btnRun = document.getElementById("btn-eval-run");
    const accFill = document.getElementById("acc-fill");
    const safetyFill = document.getElementById("safety-fill");
    const latencyFill = document.getElementById("latency-fill");

    btnRun.addEventListener("click", () => {
      packet.setAttribute("cx", 190);
      packet.setAttribute("cy", 110);
      animatePacket(packet, { x1: 190, y1: 110, x2: 260, y2: 50 });
      logLine("evals-log", "Running evals on 100 test prompts...");

      setTimeout(() => {
        animatePacket(packet, { x1: 190, y1: 110, x2: 260, y2: 170 });
        logLine("evals-log", "Collecting metrics: accuracy, safety, latency.");
      }, 700);

      setTimeout(() => {
        const acc = 82 + Math.round(Math.random() * 8);
        const safety = 90 + Math.round(Math.random() * 5);
        const latency = 40 + Math.round(Math.random() * 20); // lower is better

        accFill.style.width = `${acc}%`;
        safetyFill.style.width = `${safety}%`;
        latencyFill.style.width = `${100 - latency}%`;

        logLine("evals-log", `Accuracy: ${acc}%`);
        logLine("evals-log", `Safety: ${safety}%`);
        logLine("evals-log", `Latency: ${latency} ms (normalized)`);
      }, 1400);
    });
  }
}

/* Menu wiring */

document.querySelectorAll(".menu button").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    renderSection(section);
  });
});
