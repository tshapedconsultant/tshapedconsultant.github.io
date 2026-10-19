# AI Runtime Risk Check — Transparent Scoring Methodology

This document describes the deterministic scoring model implemented in `src/lib/riskCheckScoring.ts` for `/es/ai-runtime-risk-check/` and `/ai-runtime-risk-check/`.

## 1. Design Principles
- **No magic percentages**: The assessment does not display arbitrary compliance scores (e.g., "78% compliant").
- **Three auditable dimensions**:
  1. **Dimension A — Exposure (`0..7`)**: Derived from `Q1` (system architecture) and `Q2` (data sensitivity).
  2. **Dimension B — Autonomy (`0..4`)**: Derived from `Q3` (operational capability: respond vs. query vs. mutate/act).
  3. **Dimension C — Control & Evidence Deficit (`0..11`)**: Derived from `Q4` (authorization enforcement), `Q5` (uncertainty / fail-safe handling), and `Q6` (audit trail reconstruction).
- **Local browser execution**: All calculations run deterministically in the user's browser prior to any optional submission.

## 2. Question Weights

| Question | Option | Dim A (Exposure) | Dim B (Autonomy) | Dim C (Control Deficit) |
|---|---|---|---|---|
| **Q1. System type** | `chatbot` | 1 | 0 | 0 |
| | `rag` | 2 | 0 | 0 |
| | `copilot` | 2 | 0 | 0 |
| | `agent` | 3 | 0 | 0 |
| **Q2. Data touched** | `public` | 0 | 0 | 0 |
| | `internal` | 1 | 0 | 0 |
| | `pii_hr_finance_legal` | 3 | 0 | 0 |
| | `regulated_critical` | 4 | 0 | 0 |
| **Q3. Capability** | `respond_only` | 0 | 0 | 0 |
| | `draft_recommend` | 0 | 1 | 0 |
| | `query_systems` | 0 | 2 | 0 |
| | `modify_or_execute` | 0 | 4 | 0 |
| **Q4. Access control** | `enforced_contextual` | 0 | 0 | 0 |
| | `partial` | 0 | 0 | 2 |
| | `prompt_only` | 0 | 0 | 3 |
| | `unknown` | 0 | 0 | 4 |
| **Q5. Fail-safe** | `escalate_or_block` | 0 | 0 | 0 |
| | `warn_and_continue` | 0 | 0 | 2 |
| | `respond_anyway` | 0 | 0 | 3 |
| | `undefined` | 0 | 0 | 3 |
| **Q6. Evidence** | `full_trace` | 0 | 0 | 0 |
| | `partial_logs` | 0 | 0 | 2 |
| | `text_only` | 0 | 0 | 3 |
| | `no` | 0 | 0 | 4 |

## 3. Exposure Tier Classification
1. **Exposición agéntica crítica (`critical_agentic`)**:
   - Triggered when `Q1 = agent` or `Q3 = modify_or_execute` combined with sensitive/regulated data (`A >= 5`), high autonomy (`B >= 4`), or insufficient runtime controls (`C >= 4`), OR when `totalScore >= 14`.
2. **Exposición sensible (`sensitive`)**:
   - Triggered when touching personal/HR/financial/legal/regulated data (`Q2` in `pii_hr_finance_legal`, `regulated_critical`), OR when `A >= 4` and `C >= 4`, OR when `totalScore >= 9`.
3. **Exposición operativa (`operational`)**:
   - Triggered when `totalScore >= 4` or `B >= 2` or `C >= 3`.
4. **Exposición informativa (`informational`)**:
   - Triggered for low-exposure systems with bounded autonomy and strong controls (`totalScore < 4`).

## 4. Personalized Findings Priority (Results A, B, C, D)
- **Result B — Autonomía de herramientas sin control suficiente (`result_b`)**:
  - Triggered when `Q1` is `copilot`/`agent` or `Q3` is `query_systems`/`modify_or_execute` and `Q4` is not `enforced_contextual` or `Q5` is not `escalate_or_block`.
- **Result A — Riesgo de acceso excesivo en retrieval o datos (`result_a`)**:
  - Triggered when touching internal/sensitive/regulated data (`Q2 != public`) without enforced contextual authorization (`Q4 != enforced_contextual`).
- **Result C — Brecha de evidencia para auditoría o incidente (`result_c`)**:
  - Triggered when `Q6 != full_trace`.
- **Result D — Sin mecanismo claro de parada o escalado (`result_d`)**:
  - Triggered when `Q5 != escalate_or_block`.
