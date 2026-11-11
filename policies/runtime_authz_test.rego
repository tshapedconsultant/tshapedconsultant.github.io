package dedalo.runtime.authz_test
import rego.v1
import data.dedalo.runtime.authz

future_ns := time.now_ns() + 3600000000000
past_ns := time.now_ns() - 3600000000000

base_input := {
    "action": {
        "risk_tier": "low",
        "hash": "sha256:abc123",
        "required_scopes": ["crm:read"],
    },
    "delegation": {
        "token_valid": true,
        "expires_at": future_ns,
        "scope": ["crm:read", "crm:draft"],
        "parent_scope": ["crm:read", "crm:draft", "crm:write"],
        "depth": 1,
    },
    "policy": {
        "max_delegation_depth": 2,
        "max_session_tokens": 8000,
        "max_tool_calls_per_turn": 5,
    },
    "telemetry": {
        "session_tokens_used": 1200,
        "tool_calls_in_turn": 1,
    },
    "dlp_scan": {
        "completed": true,
        "detected_entities": [],
    },
    "change_window": {
        "open": false,
    },
    "human_oversight": {
        "verified": false,
    },
}

test_empty_input_denies if {
    not authz.allow with input as {}
}

test_low_risk_allows if {
    authz.allow with input as base_input
}

test_missing_dlp_fails_closed if {
    inp := object.union(base_input, {"dlp_scan": {"completed": false, "detected_entities": []}})
    not authz.allow with input as inp
}

test_non_array_dlp_fails_closed if {
    inp := object.union(base_input, {"dlp_scan": {"completed": true, "detected_entities": null}})
    not authz.allow with input as inp
}

test_dlp_detected_entities_denies if {
    inp := object.union(base_input, {"dlp_scan": {"completed": true, "detected_entities": ["IBAN"]}})
    not authz.allow with input as inp
}

test_scope_escalation_denies if {
    inp := object.union(base_input, {"action": {"risk_tier": "low", "hash": "sha256:abc123", "required_scopes": ["iam:admin"]}})
    not authz.allow with input as inp
}

test_delegation_depth_exceeded_denies if {
    inp := object.union(base_input, {"delegation": object.union(base_input.delegation, {"depth": 3})})
    not authz.allow with input as inp
}

test_budget_exceeded_denies if {
    inp := object.union(base_input, {"telemetry": {"session_tokens_used": 9000, "tool_calls_in_turn": 1}})
    not authz.allow with input as inp
}

test_high_risk_valid_approval_allows if {
    inp := object.union(base_input, {
        "action": {"risk_tier": "high", "hash": "sha256:act99", "required_scopes": ["crm:read"]},
        "human_oversight": {
            "verified": true,
            "approver_role": "risk_officer",
            "action_hash": "sha256:act99",
            "expires_at": future_ns,
        },
    })
    authz.allow with input as inp
}

test_high_risk_hash_mismatch_denies if {
    inp := object.union(base_input, {
        "action": {"risk_tier": "high", "hash": "sha256:tampered", "required_scopes": ["crm:read"]},
        "human_oversight": {
            "verified": true,
            "approver_role": "risk_officer",
            "action_hash": "sha256:act99",
            "expires_at": future_ns,
        },
    })
    not authz.allow with input as inp
}

test_high_risk_expired_ttl_denies if {
    inp := object.union(base_input, {
        "action": {"risk_tier": "high", "hash": "sha256:act99", "required_scopes": ["crm:read"]},
        "human_oversight": {
            "verified": true,
            "approver_role": "domain_owner",
            "action_hash": "sha256:act99",
            "expires_at": past_ns,
        },
    })
    not authz.allow with input as inp
}

test_critical_dual_distinct_ids_and_roles_allows if {
    inp := object.union(base_input, {
        "action": {"risk_tier": "critical_infrastructure", "hash": "sha256:rtb3491", "required_scopes": ["crm:read"]},
        "change_window": {"open": true},
        "human_oversight": {
            "verified": true,
            "action_hash": "sha256:rtb3491",
            "expires_at": future_ns,
            "approvals": [
                {"id": "usr_alice", "role": "risk_officer", "verified": true},
                {"id": "usr_bob", "role": "safety_manager", "verified": true},
            ],
        },
    })
    authz.allow with input as inp
}

test_critical_same_id_twice_denies if {
    inp := object.union(base_input, {
        "action": {"risk_tier": "critical_infrastructure", "hash": "sha256:rtb3491", "required_scopes": ["crm:read"]},
        "change_window": {"open": true},
        "human_oversight": {
            "verified": true,
            "action_hash": "sha256:rtb3491",
            "expires_at": future_ns,
            "approvals": [
                {"id": "usr_alice", "role": "risk_officer", "verified": true},
                {"id": "usr_alice", "role": "ciso", "verified": true},
            ],
        },
    })
    not authz.allow with input as inp
}

test_critical_same_role_twice_denies if {
    inp := object.union(base_input, {
        "action": {"risk_tier": "critical_infrastructure", "hash": "sha256:rtb3491", "required_scopes": ["crm:read"]},
        "change_window": {"open": true},
        "human_oversight": {
            "verified": true,
            "action_hash": "sha256:rtb3491",
            "expires_at": future_ns,
            "approvals": [
                {"id": "usr_alice", "role": "risk_officer", "verified": true},
                {"id": "usr_bob", "role": "risk_officer", "verified": true},
            ],
        },
    })
    not authz.allow with input as inp
}

test_critical_unverified_claim_denies if {
    inp := object.union(base_input, {
        "action": {"risk_tier": "critical_infrastructure", "hash": "sha256:rtb3491", "required_scopes": ["crm:read"]},
        "change_window": {"open": true},
        "human_oversight": {
            "verified": true,
            "action_hash": "sha256:rtb3491",
            "expires_at": future_ns,
            "approvals": [
                {"id": "usr_alice", "role": "risk_officer", "verified": true},
                {"id": "usr_bob", "role": "safety_manager", "verified": false},
            ],
        },
    })
    not authz.allow with input as inp
}
