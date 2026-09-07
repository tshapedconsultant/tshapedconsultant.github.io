import { HYBRID_ARTICLE } from "./content.js";

export default function HybridProfiles() {
  return (
    <article className="paper article-page">
      <p className="paper-nav">
        <a href="#insights">← Back to Insights</a>
      </p>
      <p className="paper-kicker">{HYBRID_ARTICLE.kicker}</p>
      <h1>{HYBRID_ARTICLE.title}</h1>
      <p className="paper-sub">{HYBRID_ARTICLE.standfirst}</p>
      <p className="article-meta">{HYBRID_ARTICLE.meta}</p>

      <section>
        <p>An AI agent does not need to write malicious code to create a serious failure.</p>
        <p>
          A March 2026 incident at Meta makes the point. An engineer asked an internal AI agent to
          analyse a technical question on a company forum. The agent posted its reply to the thread
          without approval. The guidance was inaccurate. An employee followed it, and unauthorised
          internal access to company and user data was open for about two hours. Meta classified
          the event as Sev 1 — its second-highest internal severity — and said no user data was
          mishandled. The agent did not change systems itself. A human did, acting on the agent&apos;s
          output.
        </p>
        <p>
          The failure was not simply a wrong answer. It sat at the intersection of technical
          architecture, human decision-making, access control, security, governance and
          organisational accountability.
        </p>
        <p>
          A pure technical specialist may have asked whether the advice was sound. A security
          professional may have seen the access-control risk. A governance professional may have
          questioned the missing approval gate. A hybrid professional sees the system — and the
          failure path — across all three.
        </p>
        <p>That is why hybrid profiles have an advantage in the age of AI agents.</p>
      </section>

      <section>
        <h2>AI makes application cheaper. Fundamentals become more valuable.</h2>
        <p>
          When a capability becomes widely available, the value of knowing <em>how</em> to use it
          can fall. The value of understanding <em>why</em> it works can rise.
        </p>
        <p>
          An engineer can ask an AI to write a neural network. When the model behaves unexpectedly,
          someone still needs to understand loss functions, gradients, optimisation,
          backpropagation, attention, embeddings, inference, probability and statistics.
        </p>
        <p>
          Without those fundamentals, the engineer can operate the tool. They may not be able to
          interrogate it. That distinction becomes critical as AI systems move from suggestions to
          decisions and actions.
        </p>
        <p className="callout">You cannot govern what you do not fundamentally understand.</p>
      </section>

      <section>
        <h2>The loan decision you cannot explain</h2>
        <p>
          Consider an AI system that rejects a loan. An agent can say: “The applicant was assessed
          as high risk.” That is not necessarily an explanation.
        </p>
        <p>A serious governance question is why the system reached that decision. You may need to know:</p>
        <ul>
          <li>what the model was optimising;</li>
          <li>what loss function shaped its behaviour;</li>
          <li>what representations were learned;</li>
          <li>how the architecture transforms the input;</li>
          <li>where uncertainty enters the system;</li>
          <li>which part of the pipeline actually produced the decision.</li>
        </ul>
        <p>
          Fundamentals matter not because every professional needs to train a transformer from
          scratch, but because you cannot reliably challenge, govern, secure or explain a system
          you cannot reason about.
        </p>
      </section>

      <section>
        <h2>The agent paradox</h2>
        <p>
          The more capable the agent becomes, the harder it is to supervise without enough
          underlying knowledge.
        </p>
        <p>Imagine an AI coding agent generates 20,000 lines of production code.</p>
        <ul>
          <li>
            A person who understands only the business requirement can judge whether the interface
            looks correct.
          </li>
          <li>
            A competent software engineer can inspect architecture, algorithms and failure modes.
          </li>
          <li>A security engineer can identify attack surfaces.</li>
          <li>
            A systems thinker can see how the software interacts with the wider organisation.
          </li>
        </ul>
        <p>
          The agent increases execution capacity. Human understanding determines whether that
          capacity is safely directed.
        </p>
        <blockquote>
          AI reduces the cost of producing an answer. It does not necessarily reduce the cost of
          determining whether the answer is correct.
        </blockquote>
        <p>
          In some environments it increases that cost, because machine-generated output can grow
          faster than human verification capacity.
        </p>
      </section>

      <section>
        <h2>Where hybrid profiles become powerful</h2>
        <p>Imagine three professionals.</p>
        <div className="powers">
          <div>
            <p className="layer-num">Specialist A</p>
            <h3>Technical</h3>
            <p>Extremely strong in machine learning. Understands models deeply.</p>
          </div>
          <div>
            <p className="layer-num">Specialist B</p>
            <h3>Domain</h3>
            <p>Extremely strong in the business or regulatory domain. Understands objectives and constraints.</p>
          </div>
          <div>
            <p className="layer-num">Hybrid C</p>
            <h3>AI systems</h3>
            <p>
              Understands ML fundamentals, software architecture, security, business objectives and
              regulation.
            </p>
          </div>
        </div>
        <p>
          C may not beat A on every ML problem, and may not know the business as deeply as B. When
          the problem is to deploy an agentic system in a regulated enterprise and make it
          technically robust, economically viable, secure and explainable, C connects the pieces.
          That is increasingly where the value sits.
        </p>
        <p>
          Hybrid C also translates between teams: enough engineering to earn technical respect,
          enough business to align with executives, enough governance to satisfy risk and
          compliance. They reduce silos and keep the machine running.
        </p>
      </section>

      <section>
        <h2>Breadth without fundamentals creates fragile generalists</h2>
        <p>
          The future does not simply belong to generalists. A shallow generalist armed with AI can
          produce impressive-looking answers across ten domains while understanding none of them
          well enough to recognise when the answer is wrong. That is dangerous.
        </p>
        <p>
          The strongest hybrid profile is not “know a little about everything.” It is deep
          fundamentals plus functional breadth plus AI leverage. Think of it as a new T-shape:
        </p>
        <ul>
          <li>the vertical bar is first-principles understanding;</li>
          <li>the horizontal bar is cross-domain capability;</li>
          <li>AI sits on top of both.</li>
        </ul>
      </section>

      <section>
        <h2>Fundamentals are the verification layer</h2>
        <p>This may be one of the most important human roles in an AI-native organisation.</p>
        <p>AI generates. Agents execute. Humans verify.</p>
        <p>Verification requires a reference model of how reality works.</p>
        <ul>
          <li>
            A physicist does not need AI to explain Newtonian mechanics before noticing that an
            output violates basic physical constraints.
          </li>
          <li>
            A software engineer does not need an AI security agent to see that certain input
            handling creates an injection risk.
          </li>
          <li>
            A statistician does not need an LLM to know that correlation does not establish
            causation.
          </li>
          <li>
            An ML engineer who understands optimisation can recognise when a training objective is
            misaligned with the real-world objective.
          </li>
        </ul>
        <p>
          Fundamentals give professionals an internal error detector. The strongest AI users are
          not necessarily the people who trust AI the most. They are often the people who know
          enough to recognise when something sounds plausible but is fundamentally wrong.
        </p>
        <p>The deeper your foundations, the harder it is for an AI system to mislead you.</p>
      </section>

      <section>
        <h2>Hybrid professionals become translators between AI and reality</h2>
        <p>AI operates in the language of models, probabilities, code and data. Organisations operate in the language of risk, revenue, customers, regulation, strategy, operations, security and reputation.</p>
        <p>Someone has to translate. The hybrid professional asks:</p>
        <ul>
          <li>What is technically possible?</li>
          <li>What does that mean economically?</li>
          <li>What does regulation permit?</li>
          <li>What could go wrong?</li>
          <li>How should we architect the system?</li>
          <li>How do we prove that it worked as intended?</li>
        </ul>
        <p>That translation is much harder to automate than any individual task in the chain.</p>
      </section>

      <section>
        <h2>The new scarce resource: systems judgment</h2>
        <p>
          As agents proliferate, organisations will have more specialised intelligence than ever —
          coding, research, analysis, security, legal, finance, marketing, testing, documentation,
          monitoring. The problem becomes less “can we perform this task?” and more “should these
          capabilities be connected this way?”
        </p>
        <p>
          That is a systems question. It requires fundamentals, context, trade-off analysis, causal
          reasoning, risk awareness and judgment — the capabilities a strong hybrid profile
          develops.
        </p>
      </section>

      <section>
        <h2>Specialists will still matter</h2>
        <p>
          This is not a prediction that specialisation disappears. Deep specialists remain
          essential, especially where errors are expensive. Their role may shift from being the
          entire production system to becoming a high-value node inside a larger AI-enabled
          system. The hybrid professional then orchestrates: specialist expertise as a capability,
          AI as scalable execution, the hybrid as the connection.
        </p>
      </section>

      <section>
        <h2>The career strategy changes</h2>
        <p>
          The old question was what to specialise in. A better question for the AI era: what
          fundamentals should I master, and which adjacent disciplines should I learn well enough
          to connect?
        </p>
        <ul>
          <li>A software engineer might add AI, security and business.</li>
          <li>A lawyer might add AI architecture, data and governance.</li>
          <li>A data scientist might add product, economics and regulation.</li>
          <li>An engineer might add software, AI and systems thinking.</li>
        </ul>
        <p>
          The objective is not to become the world&apos;s greatest expert in everything. It is to
          become exceptionally strong at an intersection.
        </p>
      </section>

      <section>
        <h2>The winning formula</h2>
        <div className="formula">
          <p>
            <strong>Fundamentals</strong> → understanding
          </p>
          <p>
            <strong>Specialist expertise</strong> → depth
          </p>
          <p>
            <strong>Cross-domain knowledge</strong> → context
          </p>
          <p>
            <strong>AI agents</strong> → leverage
          </p>
          <p>
            <strong>Judgment</strong> → direction
          </p>
        </div>
        <blockquote>Understanding + leverage + judgment = agency</blockquote>
        <p>
          When everyone has access to intelligence, the differentiator is the ability to determine
          which question to ask, which capability to deploy, which answer to trust, which
          trade-off to accept — and when the machine is wrong.
        </p>
        <p>
          The future does not belong to generalists who know a little about everything. Nor does
          it necessarily belong to specialists confined to one domain. It belongs
          disproportionately to the hybrid professional with deep fundamentals: enough
          understanding of the underlying systems to challenge the machine, enough across adjacent
          domains to connect them, and enough judgment to turn that intelligence into a coherent
          outcome.
        </p>
        <p>
          The more powerful the agents become, the more important it becomes to have someone who
          understands what the agents are actually doing.
        </p>
        <p>
          <strong>AI can give you leverage. Fundamentals tell you whether you should pull the
          lever. Hybrid thinking tells you which lever to pull.</strong>
        </p>
        <p>Which fundamentals are you betting on — and which intersection are you building?</p>
      </section>

      <p className="note article-sources">
        Meta incident: first reported by The Information; confirmed by Meta. Independent coverage:{" "}
        <a
          href="https://www.theverge.com/ai-artificial-intelligence/897528/meta-rogue-ai-agent-security-incident"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Verge
        </a>
        ,{" "}
        <a
          href="https://techcrunch.com/2026/03/18/meta-is-having-trouble-with-rogue-ai-agents/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TechCrunch
        </a>
        ,{" "}
        <a
          href="https://www.theguardian.com/technology/2026/mar/20/meta-ai-agents-instruction-causes-large-sensitive-data-leak-to-employees"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Guardian
        </a>
        . Meta said no user data was mishandled; the agent posted guidance, it did not itself
        change access controls.
      </p>

      <p className="paper-also article-related">
        Building a T-shaped practice in AI governance:{" "}
        <a href="#whitepaper">Probabilistic Models Require Deterministic Governance</a>
        {" · "}
        <a href="#diagnostic">Discuss a diagnostic</a>.
      </p>
    </article>
  );
}
