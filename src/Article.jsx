import { ARTICLE } from "./content.js";

export default function Article() {
  return (
    <article className="paper article-page">
      <p className="paper-nav">
        <a href="/#insights">← Back to Insights</a>
      </p>
      <p className="paper-kicker">{ARTICLE.kicker}</p>
      <h1>{ARTICLE.title}</h1>
      <p className="paper-sub">{ARTICLE.standfirst}</p>
      <p className="article-meta">{ARTICLE.meta}</p>

      <blockquote className="epigraph">
        “So that power cannot be abused, power must check power.”
        <cite>Montesquieu</cite>
      </blockquote>

      <section>
        <p>
          Most critical AI incidents no longer occur in the model. They occur at runtime.
        </p>
        <p>
          Almost all of them share the same design failure: there is no independent power
          capable of stopping the system when it drifts from its purpose.
        </p>
        <p>
          Nearly three hundred years ago, Montesquieu stated a structural truth. Concentrate
          all control in a single entity and abuse is not an anomaly. It is a consequence of
          the design. Agentic AI is being built on that same concentration of power.
        </p>
      </section>

      <section>
        <h2>Algorithmic despotism</h2>
        <p>
          Too many architectures now delegate the entire chain of responsibility to the model
          itself. It reasons. It decides. It executes tools. It validates results. It even
          evaluates its own behaviour.
        </p>
        <p>That is not systems architecture. It is algorithmic despotism.</p>
      </section>

      <section>
        <h2>Separation of powers, mapped to AI governance</h2>
        <p>
          The classical division of powers maps cleanly onto a modern governance architecture
          for autonomous systems:
        </p>
        <div className="powers">
          <div>
            <p className="layer-num">Legislative</p>
            <h3>Alignment</h3>
            <p>Base-model alignment, values and fundamental rules.</p>
          </div>
          <div>
            <p className="layer-num">Executive</p>
            <h3>Execution</h3>
            <p>APIs, tools, execution policies and guardrails.</p>
          </div>
          <div>
            <p className="layer-num">Judicial</p>
            <h3>Independent oversight</h3>
            <p>Observability, audit and supervision at runtime — outside the model.</p>
          </div>
        </div>
        <p>
          The difference between a governable architecture and an ungovernable one sits in
          this third layer.
        </p>
        <p>
          A genuine supervision system does not trust the model&apos;s good conduct. It
          verifies it. It does not assume compliance. It demonstrates it.
        </p>
      </section>

      <section>
        <h2>Runtime Checks &amp; Balances</h2>
        <p>
          That third layer is Runtime Checks &amp; Balances: an independent mechanism that
          applies the principle of separation of powers to autonomous systems. Like any
          judicial power, it operates on two critical responsibilities.
        </p>
        <h3>1. Supervise what enters the system</h3>
        <p>
          Prompt injection, context poisoning, jailbreaks, hidden instructions and
          manipulation of the RAG corpus. This requires an independent Runtime Assurance
          layer outside the model: an architectural veto over the data flow, independent
          technical controls, and real-time traceability.
        </p>
        <h3>2. Supervise behaviour at runtime</h3>
        <p>
          Unexpected tool use, drift, runaway cost, loops and cascading errors. An LLM cannot
          audit itself. An agent cannot govern itself. Corporate security cannot depend on the
          inference vendor alone.
        </p>
        <p className="callout">
          Human oversight and traceability under the EU AI Act (Art. 14) and DORA are
          technically unworkable without a control layer decoupled from the model.
        </p>
      </section>

      <section>
        <h2>Who has the power to stop it</h2>
        <p>
          The next generation of AI architectures will not be distinguished only by larger
          models, but by better mechanisms to limit, supervise and justify decisions.
        </p>
        <p>
          True governance does not consist in trusting the system. It consists in designing
          structures capable of controlling it.
        </p>
        <p>
          Separation of powers transformed modern states. Autonomous systems will end up
          needing exactly the same principle.
        </p>
        <p>
          When an AI system can reason, decide and act, the question is no longer what it can
          do. The question is who has the power to stop it.
        </p>
      </section>

      <p className="paper-also article-related">
        Developed at length in the whitepaper:{" "}
        <a href="/whitepaper">Probabilistic Models Require Deterministic Governance</a>.
      </p>
    </article>
  );
}
