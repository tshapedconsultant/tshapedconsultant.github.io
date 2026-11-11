package dedalo.runtime.authz
import rego.v1

# Default posture: fail-closed
default allow := false

# Mandatory baseline guards enforced across EVERY risk tier
mandatory_runtime_guards if {
    valid_delegation_scope
    within_budget_and_rate_limits
    dlp_scan_clean
}

# Rule 1: Read-only or low/medium-impact tools
allow if {
    mandatory_runtime_guards
    input.action.risk_tier in {"low", "medium"}
}

# Rule 2: High-impact actions require verified human approval
allow if {
    mandatory_runtime_guards
    input.action.risk_tier == "high"
    input.human_oversight.verified == true
    input.human_oversight.approver_role in {"risk_officer", "domain_owner"}
    input.human_oversight.action_hash == input.action.hash
    input.human_oversight.expires_at >= time.now_ns()
}

# Rule 3: Critical infrastructure requires dual control (two distinct approvers & roles)
allow if {
    mandatory_runtime_guards
    input.action.risk_tier == "critical_infrastructure"
    input.change_window.open == true
    input.human_oversight.verified == true
    distinct_dual_approvers
    input.human_oversight.action_hash == input.action.hash
    input.human_oversight.expires_at >= time.now_ns()
}

# Authority Non-Escalation (Section 04): action <= delegated <= parent scope
valid_delegation_scope if {
    input.delegation.token_valid == true
    input.delegation.expires_at >= time.now_ns()
    every req in input.action.required_scopes { req in input.delegation.scope }
    every s in input.delegation.scope { s in input.delegation.parent_scope }
    input.delegation.depth <= input.policy.max_delegation_depth
}

within_budget_and_rate_limits if {
    input.telemetry.session_tokens_used < input.policy.max_session_tokens
    input.telemetry.tool_calls_in_turn < input.policy.max_tool_calls_per_turn
}

# Positive DLP check: missing, incomplete or non-array scans fail closed
dlp_scan_clean if {
    input.dlp_scan.completed == true
    is_array(input.dlp_scan.detected_entities)
    count(input.dlp_scan.detected_entities) == 0
}

# Dual control: >= 2 distinct verified approvers in distinct authorised roles
distinct_dual_approvers if {
    valid := [a |
        some a in input.human_oversight.approvals
        a.verified == true
        a.id != ""
        a.role in {"risk_officer", "domain_owner", "safety_manager", "ciso"}
    ]
    count({a.id | some a in valid}) >= 2
    count({a.role | some a in valid}) >= 2
}
