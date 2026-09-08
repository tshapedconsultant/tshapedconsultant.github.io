import { HYBRID_ARTICLE } from "./content.js";
import Picture from "./components/Picture.jsx";

export default function HybridProfiles() {
  return (
    <article className="paper article-page">
      <p className="paper-nav">
        <a href="/#insights">← Back to Insights</a>
      </p>
      <p className="paper-kicker">{HYBRID_ARTICLE.kicker}</p>
      <h1>{HYBRID_ARTICLE.title}</h1>
      <p className="paper-sub">{HYBRID_ARTICLE.standfirst}</p>
      <p className="article-meta">{HYBRID_ARTICLE.meta}</p>

      <figure className="article-figure">
        <Picture
          src={HYBRID_ARTICLE.figure}
          avif={HYBRID_ARTICLE.figureAvif}
          webp={HYBRID_ARTICLE.figureWebp}
          alt={HYBRID_ARTICLE.figureAlt}
          width="1024"
          height="682"
          lazy={false}
        />
        <figcaption>{HYBRID_ARTICLE.figureCaption}</figcaption>
      </figure>

      <section>
        <p>For decades, specialisation was one of the clearest paths to professional value.</p>
        <p>Become very good at one thing.</p>
        <p>
          A strong software engineer could differentiate through technical depth. A lawyer through
          legal expertise. A data scientist through statistical and modelling expertise.
        </p>
        <p>That still matters.</p>
        <p>But AI agents may be changing where some of the advantage lies.</p>
        <p>
          As AI becomes better at coding, analysing, researching, testing and executing workflows,
          the ability to perform a narrowly defined task may become less of a differentiator in
          some areas.
        </p>
        <p>This does not make specialists obsolete.</p>
        <p>
          It may simply increase the relative value of people who can connect specialist
          capabilities, understand the underlying systems and exercise judgment across domains.
        </p>
        <p>That is where hybrid profiles may have an advantage.</p>
      </section>

      <section>
        <h2>AI makes application cheaper. Fundamentals may become more valuable.</h2>
        <p>One of the interesting effects of AI is that it can make applying existing knowledge much easier.</p>
        <p>An engineer can ask an AI to generate a neural network.</p>
        <p>But when the model behaves unexpectedly, generating another answer may not be enough.</p>
        <p>Understanding the fundamentals can help:</p>
        <ul>
          <li>loss functions;</li>
          <li>gradients;</li>
          <li>optimisation;</li>
          <li>backpropagation;</li>
          <li>attention and transformer architecture;</li>
          <li>embeddings and inference;</li>
          <li>probability and statistics.</li>
        </ul>
        <p>The point is not that everyone needs to become an ML researcher.</p>
        <p>
          It is that knowing why a system works can make it easier to question what the system is
          doing.
        </p>
        <p>
          That becomes particularly relevant when AI is used in decisions, automated workflows or
          regulated environments.
        </p>
        <p className="callout">
          You cannot reliably challenge a system that you do not understand well enough to
          interrogate.
        </p>
      </section>

      <section>
        <h2>An AI explanation is not necessarily an explanation</h2>
        <p>Consider an AI system that rejects a loan application.</p>
        <p>An agent might produce: “The applicant was assessed as high risk.”</p>
        <p>That sounds explanatory.</p>
        <p>But a more useful question is: why did the system reach that decision?</p>
        <p>
          Answering that question may require understanding the model, the data, the objective being
          optimised, the decision process and the surrounding system.
        </p>
        <p>You may need to ask:</p>
        <ul>
          <li>What was the model optimising?</li>
          <li>What loss function shaped its behaviour?</li>
          <li>How was the model trained?</li>
          <li>What representations were learned?</li>
          <li>How does the architecture transform the input?</li>
          <li>Where does uncertainty enter the system?</li>
          <li>What happens during inference?</li>
          <li>Which part of the pipeline actually produced the decision?</li>
        </ul>
        <p>
          Again, the argument is not that every governance professional needs to train a transformer
          from scratch.
        </p>
        <p>
          It is that fundamentals can provide the conceptual tools needed to interrogate AI rather
          than simply accept its explanation.
        </p>
      </section>

      <section>
        <h2>The agent paradox</h2>
        <p>AI agents also introduce an interesting supervision problem.</p>
        <p>An increasingly capable agent can produce a large amount of work very quickly.</p>
        <p>Imagine an AI coding agent generating thousands of lines of production code.</p>
        <p>Different people may evaluate different dimensions:</p>
        <ul>
          <li>A business professional may assess whether it solves the intended problem.</li>
          <li>A software engineer may examine architecture and failure modes.</li>
          <li>A security professional may investigate attack surfaces.</li>
          <li>A governance professional may look for missing controls and accountability.</li>
        </ul>
        <p>Each perspective is valuable.</p>
        <p>But someone also needs to understand how the pieces interact.</p>
        <p>This is where hybrid profiles can become useful.</p>
        <p>The hybrid does not necessarily know more than every specialist.</p>
        <p>Instead, they may be better positioned to ask whether the overall system makes sense.</p>
      </section>

      <section>
        <h2>A supervision failure in practice</h2>
        <p>
          A March 2026 incident at Meta illustrates the same integration and supervision problem. An
          engineer asked an internal AI agent to analyse a technical question on a company forum.
          The agent posted its reply without approval; the guidance was inaccurate; an employee
          followed it; and unauthorised internal access to company and user data was open for about
          two hours.
        </p>
        <p>
          Meta classified the event as Sev 1 — its second-highest internal severity — and said no
          user data was mishandled. The agent did not change systems itself. A human did, acting on
          the agent&apos;s output.
        </p>
        <p>
          The failure sat at the intersection of architecture, access control, security, governance
          and organisational accountability — the kind of path a hybrid profile is positioned to
          see.
        </p>
      </section>

      <section>
        <h2>Specialists, hybrids and the integration problem</h2>
        <p>Consider three profiles.</p>
        <div className="powers">
          <div>
            <p className="layer-num">Specialist A</p>
            <h3>Technical</h3>
            <p>Deep machine-learning expertise.</p>
          </div>
          <div>
            <p className="layer-num">Specialist B</p>
            <h3>Domain</h3>
            <p>Deep business or regulatory expertise.</p>
          </div>
          <div>
            <p className="layer-num">Hybrid C</p>
            <h3>AI systems</h3>
            <p>
              Working knowledge across machine learning, software architecture, security, business
              and regulation, combined with meaningful depth in one or two areas.
            </p>
          </div>
        </div>
        <p>C may not outperform A on a difficult ML research problem.</p>
        <p>C may not outperform B on a highly specialised regulatory question.</p>
        <p>
          But consider: “How should an enterprise deploy an agentic AI system that is technically
          robust, economically sensible, secure and compliant?”
        </p>
        <p>Now the ability to connect the different domains becomes important.</p>
        <p>The advantage is not necessarily deeper expertise in any single component.</p>
        <p>It is the ability to see the dependencies between them.</p>
      </section>

      <section>
        <h2>Breadth without fundamentals creates fragile generalists</h2>
        <p>Hybrid does not mean shallow.</p>
        <p>
          Someone who knows a little about ten technologies but cannot evaluate any of them
          critically is not necessarily well positioned for an AI-native environment.
        </p>
        <p>A stronger profile might look like: deep fundamentals + meaningful breadth + AI leverage + judgment.</p>
        <p>Think of it as a T-shape:</p>
        <ul>
          <li>the vertical bar is depth and first principles;</li>
          <li>the horizontal bar is adjacent domains;</li>
          <li>AI provides leverage across both.</li>
        </ul>
      </section>

      <section>
        <h2>Fundamentals as a verification layer</h2>
        <p>
          AI can generate an answer. An agent can execute a workflow. Someone still needs to
          determine whether the result is credible. Fundamentals help provide a reference model.
        </p>
        <ul>
          <li>A statistician can question an invalid inference.</li>
          <li>A software engineer can recognise a flawed architecture.</li>
          <li>A security professional can identify a dangerous recommendation.</li>
          <li>
            An ML engineer can question whether the model&apos;s optimisation objective actually
            corresponds to the real-world objective.
          </li>
        </ul>
        <p>
          The deeper the underlying understanding, the easier it can be to recognise when something
          sounds plausible but does not make sense.
        </p>
      </section>

      <section>
        <h2>Hybrid professionals as translators</h2>
        <p>
          AI systems speak in models, probabilities, code, data and tools. Organisations speak in
          risk, revenue, customers, regulation, strategy, operations and security. Hybrids
          translate.
        </p>
        <p>The work moves from:</p>
        <ul>
          <li>What is technically possible?</li>
          <li>What does that mean for the business?</li>
          <li>What are the risks?</li>
          <li>What constraints apply?</li>
          <li>How should the system be designed?</li>
        </ul>
      </section>

      <section>
        <h2>The problem is moving upward in the stack</h2>
        <p>Scarce skill may move from execution toward integration and judgment.</p>
        <p>The old question was: “Can we perform this task?”</p>
        <p>
          With agents: “Which capability should perform it, how should the capabilities interact,
          and how do we know the result is reliable?”
        </p>
        <p>Those are systems questions: fundamentals → context → trade-offs → risk → judgment.</p>
      </section>

      <section>
        <h2>Specialists are not going away</h2>
        <p>
          Deep expertise remains important. Specialists may become high-value nodes; hybrids
          connect them; AI provides scalable execution.
        </p>
      </section>

      <section>
        <h2>A different career question</h2>
        <p>
          “Which fundamentals should I understand deeply, and which adjacent disciplines should I
          learn well enough to connect?”
        </p>
        <ul>
          <li>A software engineer might add AI, security and business.</li>
          <li>A lawyer might add regulation, AI architecture and data.</li>
          <li>A data scientist might add modelling, product and economics.</li>
          <li>An engineer might add physical systems, software and AI.</li>
        </ul>
      </section>

      <section>
        <h2>The emerging formula</h2>
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
        <p>
          Hybrids will not always outperform specialists. As AI makes specialised capabilities
          accessible, connecting, evaluating and directing them may become relatively more
          valuable.
        </p>
        <p>
          <strong>
            AI gives you leverage. Fundamentals help you understand the machine. And hybrid thinking
            helps you connect that understanding to the real world.
          </strong>
        </p>
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
        <a href="/whitepaper">Probabilistic Models Require Deterministic Governance</a>
        {" · "}
        <a href="/#diagnostic">Discuss a diagnostic</a>.
      </p>
    </article>
  );
}
