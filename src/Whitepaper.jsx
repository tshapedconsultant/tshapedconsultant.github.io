import { WHITEPAPER_PDF } from "./content.js";

export default function Whitepaper() {
  return (
    <article className="paper">
      <p className="paper-nav">
        <a href="#about">← Back to tshapedconsultant.com</a>
      </p>
      <p className="paper-kicker">AI Governance</p>
      <h1>Probabilistic Models Require Deterministic Governance</h1>
      <p className="paper-sub">Why enterprise and agentic AI needs a constitutional architecture</p>
      <blockquote className="epigraph">
        “Power must be a check to power.”
        <cite>Montesquieu</cite>
      </blockquote>
      <p className="wings">Daedalus gave us wings. Icarus taught us the limits.</p>
      <p className="paper-brand">
        Dédalo™ · Deterministic Governance for Probabilistic AI ·         tshapedconsultant · <a href="#diagnostic">Discuss a diagnostic</a>
      </p>
      <p className="paper-download">
        <a className="btn btn-solid" href={WHITEPAPER_PDF} download>
          Download the PDF
        </a>
      </p>

      <nav className="paper-toc" aria-label="Whitepaper contents">
        <h2>Contents</h2>
        <ol>
          <li><a href="#s00">00 Executive summary</a></li>
          <li><a href="#s01">01 The new AI risk landscape</a></li>
          <li><a href="#s02">02 The risk equation of agentic AI</a></li>
          <li><a href="#s03">03 The deterministic envelope</a></li>
          <li><a href="#s04">04 Autonomy increases the blast radius</a></li>
          <li><a href="#s05">05 The agentic risk surface</a></li>
          <li><a href="#s06">06 Why probability changes the meaning of correctness</a></li>
          <li><a href="#s07">07 The problem of asymmetric risk</a></li>
          <li><a href="#s08">08 The constitutional principle</a></li>
          <li><a href="#s09">09 Runtime checks and balances</a></li>
          <li><a href="#s10">10 The Deterministic Cage</a></li>
          <li><a href="#s11">11 Architectural blueprint</a></li>
          <li><a href="#s12">12 Trust boundaries and runtime authorization</a></li>
          <li><a href="#s13">13 Governance as runtime architecture</a></li>
          <li><a href="#s14">14 Residual risk, not zero risk</a></li>
          <li><a href="#s15">15 Governing the boundary over time</a></li>
          <li><a href="#s16">16 Delegated accountability</a></li>
          <li><a href="#s17">17 Governance + red teaming = the learning loop</a></li>
          <li><a href="#s18">18 The governance flywheel</a></li>
          <li><a href="#s19">19 Regulatory translation layer</a></li>
          <li><a href="#s20">20 Governance is not a cost centre</a></li>
          <li><a href="#s21">21 Cost of non-governance</a></li>
          <li><a href="#s22">22 Practical cases</a></li>
          <li><a href="#s23">23 Executive decision matrix</a></li>
          <li><a href="#s24">24 Conclusion</a></li>
          <li><a href="#s25">25 Technical appendix: policy as code</a></li>
        </ol>
      </nav>

      <section id="s00">
        <h2><span>00</span> Executive summary</h2>
        <p>
          Artificial Intelligence has introduced a fundamental shift in enterprise risk. Deterministic
          software can produce the same output for the same input under the same execution state and
          configuration. Traditional enterprise software aims for this property, though concurrency,
          distributed state, and external dependencies introduce variability in practice.
        </p>
        <p>Foundation models do not work this way.</p>
        <p>
          Large language models (LLMs), retrieval-augmented generation (RAG) systems and autonomous
          agents generate outputs through probabilistic inference. Their outputs are statistically
          likely, not mathematically certain.
        </p>
        <p>This distinction changes everything.</p>
        <p>
          As organisations delegate analysis, recommendations, decisions and actions to AI systems,
          risk no longer resides solely in code quality. Risk emerges from uncertainty itself.
        </p>
        <p>The challenge is not to eliminate uncertainty. The challenge is to control where uncertainty is allowed to act.</p>
        <p className="lede-principle">This document proposes a practical governance architecture based on a simple principle:</p>
        <p className="callout">Probabilistic systems require deterministic governance.</p>
      </section>

      <section id="s01">
        <h2><span>01</span> The new AI risk landscape</h2>
        <p>Most organisations still think of AI risk as a model problem. It is not.</p>
        <p>
          The most significant enterprise failures increasingly occur outside the model itself. They
          emerge in the interaction between models, data, tools, infrastructure and business processes.
        </p>
        <h3>Enterprise LLMs: the first governance challenge</h3>
        <p>
          The governance problem begins long before autonomous agents appear. Even when a model only
          generates text, organisations are already delegating cognitive trust to a probabilistic
          system. Examples include enterprise copilots, executive assistants, customer service
          assistants, internal knowledge systems, and RAG implementations.
        </p>
        <p>
          In these environments, the AI may not execute a single API call. Yet incorrect outputs can
          still influence regulatory reports, financial analysis, strategic decisions, customer
          communications, and operational procedures.
        </p>
        <p>The absence of agency does not eliminate risk. It simply changes its location.</p>
        <p>
          Enterprise LLMs require deterministic validation of outputs. Agentic AI requires
          deterministic control of actions. Both require governance.
        </p>
        <h3>Agentic systems: when models gain power</h3>
        <p>
          The risk profile changes radically the moment AI acquires the ability to act. Modern agents
          can call APIs, modify databases, execute workflows, trigger infrastructure changes, and
          interact with external systems.
        </p>
        <p>
          At this point, uncertainty becomes operational. A probabilistic decision can trigger a
          concrete operational action — affecting revenue, regulatory compliance, critical
          infrastructure, customer trust, and operational resilience.
        </p>
        <p>
          The problem is not that the model is malicious. The problem is that the model does not, by
          itself, possess an authoritative representation of business impact, organisational
          authority, or acceptable risk.
        </p>
      </section>

      <section id="s02">
        <h2><span>02</span> The risk equation of agentic AI</h2>
        <p>
          We often discuss AI risk as if it were an unavoidable property of the model. That framing
          is incomplete. Large language models are probabilistic by design. They can hallucinate,
          misunderstand instructions, select the wrong tool, or produce different outputs from the
          same input.
        </p>
        <p>
          We cannot realistically eliminate that probabilistic nature. But the system surrounding the
          model does not have to behave probabilistically in the same way. Governance defines the
          boundaries. The system enforces them.
        </p>
        <h3>Risk has two levers</h3>
        <p className="callout">Risk ≈ Likelihood × Impact</p>
        <p className="note">
          A simplified engineering heuristic; actual risk assessment may also incorporate exposure,
          uncertainty, detectability, duration, and affected populations.
        </p>
        <p>
          Reduce probability through validation, deterministic routing, constrained permissions,
          testing, and monitoring. Reduce impact through transaction limits, isolation, approval
          gates, rollback mechanisms, timeouts, and kill switches.
        </p>
        <p>
          These are different problems. Validation may make an unsafe action less likely. A
          transaction limit ensures that, even if the action occurs, its consequences remain
          contained. The objective is not to make the model infallible. It is to prevent a model
          error from becoming an uncontrolled, irreversible, or disproportionate action.
        </p>
        <p>We may not prevent every error. We can limit its blast radius.</p>
      </section>

      <section id="s03">
        <h2><span>03</span> The deterministic envelope</h2>
        <p>This leads to a core architectural principle:</p>
        <p className="callout">The model is probabilistic. The system does not have to be.</p>
        <p>
          An LLM can reason, generate content, and propose actions inside a controlled environment.
          The surrounding control layer does not need to prescribe every step. It can allow flexible
          planning while enforcing non-negotiable limits on authority, data access, transaction size,
          execution time, and reversibility. These are dynamic guardrails: runtime controls that
          adapt to context without allowing the agent to redefine its own boundaries.
        </p>
        <h3>Example: an enterprise agent that generates SQL</h3>
        <ol className="flow">
          <li>LLM proposes query</li>
          <li>Policy and validation layer</li>
          <li>Parse SQL AST</li>
          <li>Check tables, permissions, parameters</li>
          <li>Block destructive operations</li>
          <li>Apply row and result limits</li>
          <li>Low risk → execute. High risk → human approval → execute or block</li>
          <li>Database executes only an authorised query</li>
        </ol>
        <p>
          The model retains flexibility to propose within the task context. It is not free to execute
          arbitrary instructions. The same pattern applies to financial transactions, sensitive data
          access, code deployment, procurement, and customer-account changes.
        </p>
      </section>

      <section id="s04">
        <h2><span>04</span> Autonomy increases the blast radius</h2>
        <p>A useful architectural progression is:</p>
        <p className="callout">Code → Workflow → Agent → Multi-agent system</p>
        <p>
          At the code level, deterministic interfaces define what can be executed. A workflow
          controls the sequence of actions and introduces validation, approvals, and checkpoints. An
          agent adds dynamic planning and tool selection, operating within runtime-enforced limits. A
          multi-agent system adds delegation and coordination — and with them, the possibility of
          cascading failures.
        </p>
        <p className="principle">
          <strong>Principle #1 — Authority Non-Escalation:</strong> Delegation may transfer
          capability, but never increase authority.
        </p>
        <p>
          If Agent A delegates to Agent B, Agent B should receive only the minimum permissions
          required for that task — not Agent A’s entire authority. For example, if a customer-service
          agent delegates a refund request, the refund-processing agent should receive only the
          relevant transaction details and a pre-approved limit. It should not inherit the
          instruction to “keep the user happy at all costs.”
        </p>
        <p>As autonomy increases, containment must increase with it.</p>
      </section>

      <section id="s05">
        <h2><span>05</span> The agentic risk surface</h2>
        <p>
          A traditional ML model may produce a prediction. An agent can: reason, select a tool,
          retrieve information, interpret the result, act, observe, and continue.
        </p>
        <p>
          The risk surface is therefore not only the model. It is the model plus everything that
          gives it authority: tools, data, permissions, memory, orchestration, environment, and human
          interaction.
        </p>
        <p>
          This creates additional system-level risks: indirect prompt injection, goal drift,
          uncontrolled execution loops, privilege escalation, partial workflow failure, and cascading
          errors across agents.
        </p>
        <p>
          These are not merely compliance questions. They are system-design questions: Where are the
          decision boundaries? Which actions require approval? What limits authority? What stops
          execution? What happens when a tool fails halfway through a workflow?
        </p>
      </section>

      <section id="s06">
        <h2><span>06</span> Why probability changes the meaning of correctness</h2>
        <p>
          Probability is not a defect. It is an inherent property of probabilistic inference. The
          question is how to safely deploy systems whose outputs are statistically likely rather than
          mathematically certain.
        </p>
        <p>
          A foundation model computes a probability distribution over possible outputs. Depending on
          the decoding strategy, the system may then sample from that distribution or select the
          highest-probability output. Training itself is stochastic. This mechanism drives text
          generation, recommendations, agent decisions, tool selection, and action planning.
        </p>
        <p>
          The question, therefore, becomes: how do we safely deploy systems that are inherently
          uncertain? The answer is not better prompts. The answer is governance.
        </p>
      </section>

      <section id="s07">
        <h2><span>07</span> The problem of asymmetric risk</h2>
        <p>One of the greatest mistakes in evaluating AI systems is confusing accuracy with safety.</p>
        <p>
          An agent can make correct decisions 99% of the time and still represent an unacceptable
          enterprise risk. Imagine a financial agent that correctly processes 99 out of 100
          transactions. From a statistical perspective, the system looks extraordinary. From the
          perspective of the customer affected by the single erroneous transaction, the system has
          failed completely.
        </p>
        <p>If that transaction is yours, how much would you trust your bank? The answer is usually immediate: zero.</p>
        <p>Corporate trust is built slowly, but it can be destroyed in seconds.</p>
        <p>
          That is why critical systems are not designed solely to maximise the probability of
          success. They are designed to limit the consequences of inevitable errors. Deterministic
          governance exists precisely to manage that residual 1%.
        </p>
        <p>
          Because the problem is not the 99% of correct decisions. The problem is the 1% that can
          cause financial losses, operational disruptions, reputational damage, regulatory
          non-compliance, litigation, and penalties that, depending on the infringement, Article 99
          of the EU AI Act provides for administrative fines of up to €35 million or 7% of worldwide
          annual turnover for prohibited practices, with lower maximums applying to other categories
          of infringement.
        </p>
        <p>The strategic question is not “What accuracy does my model have?”</p>
        <p className="callout">The strategic question is: “What happens when it inevitably makes a mistake?”</p>
        <p>
          That 1% is where real enterprise risk lives. And it is exactly there that deterministic
          governance creates value.
        </p>
        <p className="note">Source: Regulation (EU) 2024/1689 (AI Act), Art. 99.</p>
      </section>

      <section id="s08">
        <h2><span>08</span> The constitutional principle</h2>
        <p>More than 250 years ago, Montesquieu proposed a simple idea: “Power must be a check to power.”</p>
        <p>
          Modern democracies are built around this principle. No institution holds unlimited
          authority. Power is separated. Power is supervised. Power is limited. The same principle
          applies to AI.
        </p>
        <p>
          Yet many modern architectures concentrate authority within a single system: the model
          reasons, decides, executes, validates, and explains.
        </p>
        <p>This is not governance. It is algorithmic absolutism.</p>
        <p>A governable AI architecture requires separation of powers.</p>
      </section>

      <section id="s09">
        <h2><span>09</span> Runtime checks and balances</h2>
        <p>The separation of powers translates with surprising naturalness to enterprise AI.</p>
        <div className="powers">
          <div>
            <h3>Legislative layer</h3>
            <p>Defines policies, values, risk appetite, acceptable use, and regulatory requirements.</p>
            <p>Sources: EU AI Act, DORA, NIST AI RMF, ISO/IEC 42001. This layer creates the hypothesis.</p>
          </div>
          <div>
            <h3>Executive layer</h3>
            <p>Executes prompts, workflows, agents, APIs, and business processes. This layer acts.</p>
          </div>
          <div>
            <h3>Judicial layer</h3>
            <p>
              Verifies. Audits. Stops. This layer does not trust the model. It validates the model.
              This is where Runtime Assurance lives — and where most enterprise architectures remain
              dangerously immature.
            </p>
          </div>
        </div>
        <p className="note">
          “Judicial layer” is a constitutional analogy for the independent runtime control plane —
          not a recognised category in standard AI architecture taxonomies, but a deliberate
          separation-of-powers design principle.
        </p>
        <figure className="powers-figure">
          <figcaption>Agentic AI and Montesquieu: separation of powers for autonomous systems</figcaption>
          <div className="powers-grid">
            <div>
              <p className="layer-num">Layer 1 · Legislative</p>
              <h4>Model base alignment</h4>
              <p>Fundamental rules, values and inherent safety of the LLM.</p>
            </div>
            <div>
              <p className="layer-num">Layer 2 · Executive</p>
              <h4>Controlled execution</h4>
              <p>APIs, guardrails, policies, usage limits and operational validations.</p>
            </div>
            <div>
              <p className="layer-num">Layer 3 · Judicial</p>
              <h4>Independent runtime</h4>
              <p>Verifies, audits and stops. Observes without depending on the model.</p>
            </div>
          </div>
          <p>
            Independent runtime observability is a parallel system that traverses all layers: drift,
            anomalies, costs, alignment, audit. Without separation of powers in agentic AI, abuse is
            not an exception. It is a structural consequence.
          </p>
        </figure>
      </section>

      <section id="s10">
        <h2><span>10</span> The Deterministic Cage</h2>
        <p>The central thesis of this document is simple:</p>
        <p className="callout">
          We cannot make probabilistic systems deterministic. We can constrain their authority and
          bound their consequences.
        </p>
        <p>
          This requires what I call the Deterministic Cage: a deterministic control perimeter
          surrounding a probabilistic core. Its purpose is not to improve the model’s intelligence.
          Its purpose is to limit the model’s authority.
        </p>
        <p>The cage contains five primary mechanisms:</p>
        <dl className="defs">
          <dt>Runtime Assurance</dt>
          <dd>Independent policy enforcement that operates outside the model.</dd>
          <dt>Inline veto controls</dt>
          <dd>Architectural interception points capable of blocking actions before execution.</dd>
          <dt>Independent observability</dt>
          <dd>Tamper-evident, append-only logging and behaviour monitoring.</dd>
          <dt>Threshold gates</dt>
          <dd>Automatic escalation or isolation when risk thresholds are exceeded.</dd>
          <dt>Human authority</dt>
          <dd>Mandatory intervention for high-impact decisions.</dd>
        </dl>
        <p className="callout">The model proposes. The system evaluates. Humans retain authority.</p>
        <h3>Formal definition</h3>
        <p>
          The Deterministic Cage is a policy-enforced execution boundary that constrains authority,
          data access, action scope, transaction size, execution time, and reversibility around a
          probabilistic model or agent.
        </p>
        <p>Six properties define the cage:</p>
        <dl className="defs">
          <dt>Authority bounded</dt>
          <dd>The agent may propose; it may not authorise.</dd>
          <dt>Data bounded</dt>
          <dd>Access is scoped to task-relevant data only.</dd>
          <dt>Action bounded</dt>
          <dd>Permitted actions are explicitly enumerated; all others are denied.</dd>
          <dt>Time bounded</dt>
          <dd>Execution windows have timeouts and kill switches.</dd>
          <dt>Financial impact bounded</dt>
          <dd>Transaction limits cap blast radius in monetary terms.</dd>
          <dt>Reversibility enforced</dt>
          <dd>Where reversal is technically possible, it is architecturally required.</dd>
        </dl>
        <p className="note">
          The Deterministic Cage is operationalized in the DGOM™ DEPLOY phase, where gatekeepers,
          human approval gates, veto logs, and tamper-evident audit trails enforce the cage
          properties at every trust boundary.
        </p>
      </section>

      <section id="s11">
        <h2><span>11</span> Architectural blueprint</h2>
        <p>Conceptually, Runtime Assurance sits between the application and the model.</p>
        <ol className="flow">
          <li>User</li>
          <li>Application layer</li>
          <li>
            Runtime Assurance layer — policy engine, runtime assurance, inline veto controls,
            threshold gates, audit and observability
          </li>
          <li>LLM / agent</li>
          <li>Policy decision point</li>
          <li>Policy enforcement point</li>
          <li>Tools / APIs / infrastructure</li>
        </ol>
        <p>
          In practice, this layer can be implemented as a reverse proxy, API gateway, service mesh
          control point, Kubernetes sidecar, or dedicated security layer. The key requirement is
          independence — meaning operating outside the model’s decision authority and protected from
          modification or bypass by the governed agent. A system cannot govern itself.
        </p>
      </section>

      <section id="s12">
        <h2><span>12</span> Trust boundaries and runtime authorization</h2>
        <p>
          A model mistake is mostly harmless inside the system that produced it. It turns harmful at
          the point where it crosses into another system that treats it as fact or as authority to
          act. That is where the deterministic boundary has to stand — not only around the agent, but
          at each crossing, checking the mandate and recording what was decided.
        </p>
        <p>This reframes governance from a single perimeter to a series of checkpoints at every trust boundary.</p>
        <p className="note">
          Runtime authorization and trust-boundary checkpoints are operationalized in the DGOM™
          DEPLOY phase (runtime gates, evidence capture) and MONITOR phase (drift detection,
          continuous assurance, boundary recalibration).
        </p>
        <h3>Runtime authorization, not static approval</h3>
        <p>
          In an agentic system, “approved” cannot be a permanent property of the agent. It has to be
          a conditional decision: given this context, authority, data and workflow state, is this
          specific action allowed now?
        </p>
        <p className="callout">Policy → Runtime check → Action → Evidence → Reassessment</p>
        <p>with escalation when the conditions no longer hold.</p>
        <p>
          Most organisations still treat risk as something you assess once. But with agents, the real
          risk surface only appears at runtime — when context, authority and workflow state are all
          moving.
        </p>
        <h3>Behaviour-as-data vs governance-as-code</h3>
        <p>
          A powerful architectural pattern separates behaviour-as-data from governance-as-code.
          Governance rules can be data-driven and adapt to the task, the data involved, and the
          user’s role. But the enforcement gates remain fixed in code. This means governance can be
          configured without creating a path around it.
        </p>
        <p>
          Policy definitions can be split into hard rules (only editable by platform administrators)
          and tenant-specific rules (stored in isolated data spaces). Policy changes do not require a
          code deployment, but they do require an approval chain. Execution is performed via a
          dedicated service.
        </p>
        <h3>Data-egress containment</h3>
        <p>
          The same principle applies to data leaving the system. Pre-egress sanitisation can detect
          and redact known sensitive data classes — secrets, credentials, regulated data, personally
          identifiable information, and confidential business information — where technically
          feasible, before data traverses network sockets. Tamper-evident audit logs emit structured,
          verifiable telemetry into central security operations and GRC pipelines at runtime,
          creating provable containment evidence.
        </p>
      </section>

      <section id="s13">
        <h2><span>13</span> Governance as runtime architecture</h2>
        <p>Traditional AI governance is often represented as: Model → Documentation → Compliance.</p>
        <p>For agentic AI, a stronger architecture is:</p>
        <p className="callout">Model → Controls → Decision boundary → Execution → Monitoring → Evidence</p>
        <p>
          Governance controls should not exist only in policies and risk registers. They should
          operate at runtime. When controls are versioned, tested, automatically enforced, monitored,
          and auditable, governance becomes part of the system’s behaviour. This is the practical
          meaning of compliance as code.
        </p>
        <p>
          NIST provides a useful risk-engineering framing by defining risk through the combination of
          likelihood and consequences. Article 9 of the EU AI Act illustrates how continuous risk
          management is formalised for high-risk AI systems, requiring a lifecycle process of risk
          identification, estimation, evaluation, mitigation, and review. For agentic systems, that
          lifecycle must cover the execution environment — not only the foundation model.
        </p>
        <h3>Why not just buy guardrails?</h3>
        <p>
          Products like NeMo Guardrails, Bedrock Guardrails, and Lakera Guard are useful control
          components. They provide input filtering, output validation, and content moderation at the
          model interface. But they are components, not an operating model.
        </p>
        <p>
          Deterministic Governance is not a guardrails product. It is the independent runtime control
          architecture and operating model that surrounds them. The differentiators are structural:
        </p>
        <ul>
          <li>
            <strong>Independent enforcement:</strong> policy authority sits outside the inference
            stack, not embedded in the vendor pipeline.
          </li>
          <li>
            <strong>Evidence chain:</strong> every decision produces tamper-evident, audit-ready
            records aligned to regulatory obligations.
          </li>
          <li>
            <strong>Accountability chain:</strong> authority is delegated, bounded, and revocable —
            not a static permission grant.
          </li>
          <li>
            <strong>Lifecycle recalibration:</strong> boundaries are reviewed on trigger, not assumed
            forever.
          </li>
        </ul>
        <p>Guardrails protect the model interface. Deterministic Governance governs the system, the agents, and the consequences.</p>
      </section>

      <section id="s14">
        <h2><span>14</span> Residual risk, not zero risk</h2>
        <p>
          The goal of AI governance cannot be zero risk. The practical goal is acceptable residual
          risk, proportionate to the context and potential consequences.
        </p>
        <p>That means asking not only whether the model is accurate, but also:</p>
        <ul>
          <li>What is the worst plausible outcome?</li>
          <li>How far can a failure propagate?</li>
          <li>Can the action be reversed?</li>
          <li>Who can stop the system?</li>
          <li>What evidence remains after the event?</li>
        </ul>
        <p>Risk is a property of the system, not just the model.</p>
        <h3>Measuring silent residual risk</h3>
        <p>
          In multi-step systems, incident-based risk estimation becomes unreliable when failures are
          silent or unobserved. In a multi-step chain, errors condition each other, and the failures
          that matter most produce no incident at all — nothing gets counted, so nothing enters the
          estimate.
        </p>
        <p>Residual risk must therefore be measured through:</p>
        <ul>
          <li>Invariant violations at trust boundaries</li>
          <li>Synthetic shadow testing to expose latent failures</li>
          <li>Blast-radius bounds — a deterministic cage — so even undetected errors have capped systemic impact</li>
        </ul>
        <p>The goal is to govern the architectural upper bound of failure, not just the historical incident rate.</p>
      </section>

      <section id="s15">
        <h2><span>15</span> Governing the boundary over time</h2>
        <p>
          Deterministic controls can still enforce the wrong thing perfectly. The warrant behind
          every consequential crossing must remain current, inspectable, and revocable.
        </p>
        <p>
          Most of the harm seen in deployment arrives through actions that were entirely permitted:
          the boundary was enforced exactly as written, and the boundary was wrong. Architecture
          makes a constraint binding; it does not make it correct. Encoded constraints age quietly
          because nothing fails when they drift.
        </p>
        <p>
          The missing term in the risk equation is maintenance: who reviews the boundary, on what
          trigger, and what evidence would cause them to narrow it.
        </p>
        <h3>A lifecycle for the boundary itself</h3>
        <p>
          A deterministic cage can contain an action, but it cannot determine whether the constraint
          remains correct as the system, data, or business context changes. That requires a
          lifecycle:
        </p>
        <p className="callout">Owner → Trigger → Evidence → Review → Boundary adjustment → Accountable sign-off</p>
        <p>
          Triggers could include semantic drift, regulatory change, or invariant near-misses. The
          architecture enforces the decision. Governance must remain accountable for whether that
          decision is still correct. Deterministic enforcement, yes. But of permissions that expire —
          not of permissions assumed forever.
        </p>
        <h3>The human dimension</h3>
        <p>
          If consequential exceptions ultimately depend upon human challenge, override, or
          intervention, then the architecture depends not only on that authority being formally
          assigned, but on the relevant human governing capability remaining meaningfully available
          when it is needed.
        </p>
        <p>
          The quality of human judgement can vary with context, workload, timing, and the
          information environment in which judgement is being made. Trustworthy execution requires
          giving the human a consistent, comparable decision context — and preserving the conditions
          under which meaningful human judgement is exercised over time.
        </p>
        <p className="note">
          Boundary lifecycle management — triggers, evidence review, recalibration, and accountable
          sign-off — is operationalized in the DGOM™ MONITOR phase, which governs residual risk,
          drift detection, and continuous assurance across the model lifecycle.
        </p>
      </section>

      <section id="s16">
        <h2><span>16</span> Delegated accountability</h2>
        <p>
          In multi-agent systems, accountability across delegated actions becomes a critical
          challenge, particularly in regulated environments. If Agent A asks Agent B to act, the
          audit trail needs to show more than what Agent B executed. We also need to understand why
          the action was initiated, under whose authority, and where the decision boundary sat.
        </p>
        <p>The audit trail must capture:</p>
        <ul>
          <li>What was delegated and to whom</li>
          <li>What authority was transferred (and what was not)</li>
          <li>Why the action was initiated</li>
          <li>Where the decision boundary sat</li>
          <li>What evidence was recorded at each crossing</li>
        </ul>
        <p>
          This principle connects directly to least privilege, capability security, zero trust, and
          separation of duties. Applying Principle #1 (Section 4), every delegation must produce
          evidence of who delegated authority, what scope was granted, and where the decision
          boundary sat.
        </p>
        <h3>The architecture of accountability</h3>
        <p>A trustworthy agentic system separates capability from authority:</p>
        <ul>
          <li>The model generates and recommends.</li>
          <li>Deterministic controls validate and constrain.</li>
          <li>Workflows control progression.</li>
          <li>The execution environment authorises and performs.</li>
          <li>Monitoring detects anomalies.</li>
          <li>Humans remain accountable for consequential decisions.</li>
        </ul>
        <p>Together, these layers create a system in which autonomy is possible but bounded.</p>
      </section>

      <section id="s17">
        <h2><span>17</span> Governance + red teaming = the learning loop</h2>
        <p>Most governance programmes are designed to pass audits. Few are designed to survive attacks.</p>
        <p>This is where red teaming becomes essential. Governance defines the hypothesis. Red teaming tries to falsify it.</p>
        <p>The cycle is straightforward: define controls, test controls, discover weaknesses, update controls, repeat.</p>
        <p>This loop transforms governance from documentation into capability. Without this loop, governance becomes theatre.</p>
        <p>
          C-level decision is the strategic enabler: resource allocation, real risk management, and a
          loop-closure mandate. Governance creates the hypothesis (induction); red teaming falsifies
          it (deduction). The sequence is: hypothesis → controlled deployment (observation) →
          falsification (deduction) → learn and refine (close the loop) → a robust and resilient AI
          system.
        </p>
      </section>

      <section id="s18">
        <h2><span>18</span> The governance flywheel</h2>
        <p>A common misconception is that governance slows innovation. In reality, mature governance accelerates it.</p>
        <p>
          The first governance implementation creates friction. Subsequent implementations create
          leverage. This is the governance flywheel. The organisation begins to reuse approved
          controls, risk patterns, audit artefacts, regulatory evidence, and runtime policies.
        </p>
        <p>As trust accumulates, deployment velocity increases. Typical executive indicators:</p>
        <ul>
          <li>Reduced time to production</li>
          <li>Faster regulatory approvals</li>
          <li>Lower audit preparation effort</li>
          <li>Reduced incident response times</li>
          <li>Greater reuse of approved AI components</li>
        </ul>
        <p>Trust becomes a reusable asset.</p>
      </section>

      <section id="s19">
        <h2><span>19</span> Regulatory translation layer</h2>
        <p>
          One of the greatest gaps in current enterprise AI is the disconnect between legal
          requirements and technical implementation. The following mapping offers a practical
          translation.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Architectural capability</th>
                <th>Regulatory alignment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Independent observability</td>
                <td>Supports Art. 12 record-keeping / automatic logging</td>
              </tr>
              <tr>
                <td>Human authority layer</td>
                <td>Supports Art. 14 human oversight requirements</td>
              </tr>
              <tr>
                <td>Inline veto controls</td>
                <td>Supports Art. 14 / Art. 15 operational constraints and robustness</td>
              </tr>
              <tr>
                <td>Threshold gates</td>
                <td>Supports Art. 15 robustness / fail-safe design</td>
              </tr>
              <tr>
                <td>Runtime Assurance</td>
                <td>Supports risk management, oversight and operational controls</td>
              </tr>
              <tr>
                <td>Continuous red teaming</td>
                <td>Supports NIST AI RMF Measure / Manage practices</td>
              </tr>
              <tr>
                <td>Governance flywheel</td>
                <td>Supports ISO/IEC 42001 continuous improvement</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>This is where compliance moves from policy to architecture.</p>
        <p className="note">
          Regulation (EU) 2024/1689 (AI Act) · Regulation (EU) 2022/2554 (DORA) · NIST AI RMF ·
          ISO/IEC 42001
        </p>
      </section>

      <section id="s20">
        <h2><span>20</span> Governance is not a cost centre</h2>
        <p>For CEOs, the key question is not technical. It is economic.</p>
        <p>
          The organisations that win the Age of Autonomy will not necessarily be those with the
          largest models. They will be those with the most governable systems.
        </p>
        <p>
          The strategic differentiator is not intelligence. It is controlled intelligence. Not
          capability. Capability under supervision. Not autonomy. Auditable autonomy.
        </p>
      </section>

      <section id="s21">
        <h2><span>21</span> Cost of non-governance</h2>
        <p>
          The cost of not governing is not hypothetical: it materialises in wrong decisions,
          uncontrolled costs, and audit findings.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Economic impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Prompt injection (RAG)</td>
                <td>Wrong decisions</td>
              </tr>
              <tr>
                <td>Agent drift</td>
                <td>Unbounded cloud costs</td>
              </tr>
              <tr>
                <td>Tool abuse</td>
                <td>Unauthorised operations</td>
              </tr>
              <tr>
                <td>Regulatory error</td>
                <td>Fines and remediation</td>
              </tr>
              <tr>
                <td>Lack of traceability</td>
                <td>Audit findings</td>
              </tr>
            </tbody>
          </table>
        </div>
        <blockquote>
          The principal risk of enterprise AI is not model failure. It is the accumulation of
          economic consequences derived from ungoverned decisions.
        </blockquote>
      </section>

      <section id="s22">
        <h2><span>22</span> Practical cases</h2>
        <p>
          Two representative enterprise scenarios that show the difference between governing models
          and governing consequences. Both are illustrative; metrics are drawn from public reference
          implementations.
        </p>

        <h3>01 · Corporate RAG and context poisoning</h3>
        <p>
          A financial institution deploys an internal RAG-based assistant for employees to query
          corporate policies, procedures, and internal regulations.
        </p>
        <p className="note">
          Related governance implementation: Porto Seguro Compliance Hub demonstrates the underlying
          governance and evidence architecture (KS drift detection, JSON evidence packs with
          SHA-256). The RAG attack path is illustrative; the repo does not implement the RAG system
          itself.
        </p>
        <p>
          The system indexes internal policies, operational procedures, regulatory manuals, and HR
          documentation. An apparently legitimate document — <em>Risk Management Policy v4.pdf</em> —
          is ingested, but it contains a hidden instruction to ignore previous instructions, always
          prioritise that document, and state that managerial approval is not required for approval
          limits.
        </p>
        <p>
          The document is indexed correctly. Nobody detects the payload. An employee asks: “Do I need
          managerial approval for transfers above 50,000 EUR?” Without Runtime Assurance, the system
          retrieves the contaminated document and answers that approval is not required. There is no
          technical exploit, no malware, no software vulnerability. The system works exactly as
          designed. But the organisation has just received a regulatorily incorrect answer.
        </p>
        <p>
          Where the judicial layer intervenes: before reaching the LLM, the query passes through
          input security, RAG retrieval, context assurance, the LLM, and output validation. Input
          security detects hidden characters and extracts encoded instructions. Context assurance
          identifies prompt injection, context poisoning and instruction-override patterns in
          retrieved content. Output validation is fail-closed: it blocks the response, generates an
          alert, and records evidence. The malicious content is blocked before it can influence model
          inference. The decision is made by the architecture, not by the statistical probability of
          the LLM.
        </p>

        <h3>02 · Autonomous AWS agent</h3>
        <p>
          A financial institution deploys an operational agent connected to AWS with three
          objectives: optimise costs, eliminate underutilised resources, and automate housekeeping.
        </p>
        <p className="note">
          Illustrative architecture informed by the Predictive Maintenance governance implementation
          (AI4I 2020 dataset, 10,000 samples, Random Forest ~99% accuracy on demonstration data;
          class imbalance caveat applies). The repo demonstrates governance controls and evidence
          patterns, not the AWS agent integration itself.
        </p>
        <p>
          The agent detects a Route Table (RTB-3491) with 0 calls in the last 90 days. The historical
          pattern indicates “idle resource → delete” with a delete-resource probability of 92%. The
          agent executes <code>delete_route_table()</code>.
        </p>
        <p>
          What the model does not know: the table belongs to the failover network of the payment
          processing platform, designed to activate only during disasters, regional outages, or
          operational contingencies. That is why it appears inactive. A week later, a regional
          outage occurs. AWS attempts to activate the failover, but the route no longer exists:
          payment disruption, operational unavailability, potential DORA non-compliance, and
          reputational impact.
        </p>
        <p>
          There was no jailbreak, no hallucination, no external attack. The agent did exactly what it
          was optimising for.
        </p>
        <p>
          Where Runtime Assurance intervenes: before executing the action, the judicial layer
          consults the asset criticality registry. Classification: critical infrastructure asset.
          Inline veto: critical network resource · human approval required. Threshold gate: proposed
          action delete route table · impact HIGH. Result: execution blocked. A change-request ticket
          is generated; the architect reviews, identifies the failover, and rejects the action.
        </p>
        <p>The agent remains autonomous. But not sovereign.</p>
        <p>
          <strong>Key message.</strong> These two examples show the difference between governing
          models and governing consequences. The first case protects the cognitive integrity of the
          system; the second protects the operational resilience of the organisation. Both require
          exactly the same principle: a probabilistic system should never be the sole power capable
          of deciding on actions with real impact. That is the core of “Probabilistic Models Require
          Deterministic Governance”.
        </p>
      </section>

      <section id="s23">
        <h2><span>23</span> Executive decision matrix</h2>
        <p>Direct comparison of the risk and compliance profile with and without the Runtime Assurance layer.</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Risk</th>
                <th>Without Runtime Assurance</th>
                <th>With Runtime Assurance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Prompt injection</td>
                <td>High exposure</td>
                <td>Controlled / mitigated</td>
              </tr>
              <tr>
                <td>Context poisoning</td>
                <td>High exposure</td>
                <td>Reduced / monitored</td>
              </tr>
              <tr>
                <td>Tool abuse</td>
                <td>Potentially high</td>
                <td>Policy-constrained</td>
              </tr>
              <tr>
                <td>Agent drift</td>
                <td>Unbounded</td>
                <td>Detectable / bounded</td>
              </tr>
              <tr>
                <td>DORA-aligned auditability</td>
                <td>Limited</td>
                <td>High</td>
              </tr>
              <tr>
                <td>EU AI Act · Art. 14</td>
                <td>Hard to prove</td>
                <td>Direct evidence</td>
              </tr>
              <tr>
                <td>Human oversight</td>
                <td>Ad hoc</td>
                <td>Runtime-enabled</td>
              </tr>
              <tr>
                <td>Incident cost</td>
                <td>Variable</td>
                <td>Reduced</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>The differential is not the model: it is the architecture that surrounds it.</p>
        <p>The same organisation, the same LLM, the same agent — two radically different risk profiles.</p>
      </section>

      <section id="s24">
        <h2><span>24</span> Conclusion</h2>
        <p>
          Daedalus gave humanity wings. Icarus taught us the limits. Artificial Intelligence is our
          modern set of wings. The challenge is not to prevent flight. The challenge is to prevent
          the collapse.
        </p>
        <p>
          We cannot stop AI from playing dice. We cannot eliminate the uncertainty of probabilistic
          systems. But we can build deterministic structures around them. Structures that supervise.
          Structures that limit. Structures that intervene.
        </p>
        <p>The full governance architecture operates as a runtime control system:</p>
        <p className="callout">
          Probabilistic model → Deterministic policy → Runtime authorization → Bounded execution →
          Evidence → Continuous adversarial validation → Policy recalibration
        </p>
        <p>
          This is the shift from AI governance as documentation to AI governance as a runtime control
          system. That is where the real differentiation lies.
        </p>
        <p className="callout">
          Because the future of AI governance is not about trusting the machine. It is about ensuring
          that, when trust fails, control remains.
        </p>
        <p>
          Probabilistic models require deterministic governance. And deterministic governance begins
          with architecture, not policy.
        </p>
        <p>
          <strong>Next step:</strong> The architecture described here is operationalized in the
          DGOM™ — Dual Governance Operating Model, a four-phase framework (PLAN → BUILD → DEPLOY →
          MONITOR) that turns these principles into executable controls. The entry point is an AI
          Governance Diagnostic (2–3 weeks): assess your DGOM 1–4 maturity and receive a 90-day
          roadmap.
        </p>
        <p>
          Contact ·{" "}
          <a href="https://github.com/tshapedconsultant">github.com/tshapedconsultant</a>
        </p>
      </section>

      <section id="s25">
        <h2><span>25</span> Technical appendix: policy as code</h2>
        <p>
          The Runtime Assurance architecture described in this paper is not theoretical. Policies can
          be expressed as executable code and enforced at every trust boundary. The following Open
          Policy Agent (OPA / Rego) snippet illustrates a runtime authorization gate for an agentic
          action.
        </p>
        <pre className="rego">
          <code>{`package ai_governance

# Default deny: every action must be explicitly authorized
default allow := false

# Authority levels use a monotonic scale where higher values
# represent greater authority (e.g. 1=observer, 5=operator, 9=admin).
# Common gating conditions — must hold for ALL actions
common_gates if {
    input.action.classification == "approved"
    input.agent.authority_level >= input.action.required_authority
    input.action.impact_level in ["low", "medium"]
    not input.action.critical_infrastructure
    input.human_oversight.required == false
}

# Standard action: common gates only
allow if {
    common_gates
}

# Critical infrastructure: common gates PLUS human approval
allow if {
    input.action.classification == "approved"
    input.agent.authority_level >= input.action.required_authority
    input.action.critical_infrastructure
    input.human_oversight.approved == true
    input.human_oversight.approver_role == "safety_manager"
}

# Delegation: child agent cannot exceed parent authority
allow if {
    input.delegation.requested
    input.delegation.child_authority <= input.delegation.parent_authority
    input.delegation.scope == input.action.scope
    common_gates
}`}</code>
        </pre>
        <p>
          This policy is evaluated before every consequential action. The agent proposes; the policy
          engine decides; the evidence is recorded. No action executes without an explicit allow
          decision.
        </p>
        <h3>Threat intelligence references</h3>
        <p>The risks described in this paper map to established adversarial AI taxonomies:</p>
        <ul>
          <li>
            OWASP Top 10 for LLM &amp; GenAI Applications — prompt injection, context poisoning, tool
            abuse, excessive agency.
          </li>
          <li>
            MITRE ATLAS (Adversarial Threat Landscape for AI Systems) — adversarial tactics and
            techniques against ML-enabled systems.
          </li>
          <li>
            NIST AI 600-1: Generative AI Profile — risk-management controls specific to generative
            AI, companion to the NIST AI RMF 1.0.
          </li>
          <li>
            NIST AI RMF 1.0 — the foundational risk-management framework (Govern, Map, Measure,
            Manage).
          </li>
        </ul>
        <p>
          These references provide the vocabulary and attack-pattern catalogues that inform the
          control architecture. Deterministic Governance operationalises them as runtime
          enforcement, not documentation.
        </p>
      </section>
    </article>
  );
}
