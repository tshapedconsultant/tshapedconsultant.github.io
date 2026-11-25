package dualkey.illustrative_test

import rego.v1

import data.dualkey.illustrative

# Clock is frozen with `with time.now_ns`. These tests execute the policy.

now := time.parse_rfc3339_ns("2026-06-01T12:00:00Z")

skew_ns := 1000000000

day_ns := 86400000000000

registry := {
	"tech-1": {"technical_owner"},
	"biz-1": {"business_owner"},
}

issued := "2026-06-01T11:00:00Z"

expires := "2026-06-01T12:00:02Z"

deadline := "2026-06-01T13:00:00Z"

approval(id, role, issued_at, expires_at) := {
	"approver_id": id,
	"role": role,
	"nonce": sprintf("n-%s", [id]),
	"payload_hash": "hash-1",
	"model_version": "model-1",
	"policy_version": "pol-1",
	"signature_verified": true,
	"issued_at": issued_at,
	"expires_at": expires_at,
}

technical := approval("tech-1", "technical_owner", issued, expires)

business := approval("biz-1", "business_owner", issued, expires)

base_input(approvals, execution_deadline) := {
	"policy": {"require_dual_key": true, "version": "pol-1"},
	"action": {
		"payload_hash": "hash-1",
		"model_version": "model-1",
		"execution_deadline": execution_deadline,
	},
	"approvals": approvals,
}

allows(approvals, execution_deadline) if {
	illustrative.dual_key_ok with input as base_input(approvals, execution_deadline)
		with data.clock_skew_ns as skew_ns
		with data.max_ttl_ns as day_ns
		with data.role_registry as registry
		with time.now_ns as now
}

denies(approvals, execution_deadline) if {
	not allows(approvals, execution_deadline)
}

test_technical_then_business_allows if {
	allows([technical, business], deadline)
}

test_business_then_technical_allows if {
	allows([business, technical], deadline)
}

test_same_identity_denies if {
	same := approval("tech-1", "business_owner", issued, expires)
	denies([technical, same], deadline)
}

test_unauthorized_role_denies if {
	auditor := approval("tech-1", "auditor", issued, expires)
	denies([auditor, business], deadline)
}

test_role_not_in_registry_denies if {
	swapped := approval("tech-1", "business_owner", issued, expires)
	denies([swapped, business], deadline)
}

test_one_approval_denies if {
	denies([technical], deadline)
}

test_extra_approval_denies if {
	extra := approval("biz-1", "technical_owner", issued, expires)
	denies([technical, business, extra], deadline)
}

test_future_issued_at_denies if {
	future := approval("tech-1", "technical_owner", "2026-06-01T12:00:02Z", "2026-06-01T12:00:03Z")
	denies([future, business], deadline)
}

test_expiry_before_issued_at_denies if {
	backwards := approval("tech-1", "technical_owner", "2026-06-01T11:00:00Z", "2026-06-01T10:00:00Z")
	denies([backwards, business], deadline)
}

test_expiry_equal_issued_at_denies if {
	flat := approval("tech-1", "technical_owner", "2026-06-01T11:00:00Z", "2026-06-01T11:00:00Z")
	denies([flat, business], deadline)
}

test_expiry_exactly_at_skew_boundary_denies if {
	# now + skew is 2026-06-01T12:00:01Z. Equal is inside the conservative margin.
	edge := approval("tech-1", "technical_owner", issued, "2026-06-01T12:00:01Z")
	denies([edge, business], deadline)
}

test_excessive_ttl_denies if {
	long := approval("tech-1", "technical_owner", "2026-05-30T12:00:00Z", expires)
	not illustrative.dual_key_ok with input as base_input([long, business], deadline)
		with data.clock_skew_ns as skew_ns
		with data.max_ttl_ns as 86400000000000
		with data.role_registry as registry
		with time.now_ns as now
}

test_ttl_exactly_at_max_allows if {
	exact := approval("tech-1", "technical_owner", "2026-06-01T12:00:00Z", "2026-06-01T12:00:02Z")
	illustrative.dual_key_ok with input as base_input([exact, approval("biz-1", "business_owner", "2026-06-01T12:00:00Z", "2026-06-01T12:00:02Z")], "2026-06-01T12:00:03Z")
		with data.clock_skew_ns as skew_ns
		with data.max_ttl_ns as 2000000000
		with data.role_registry as registry
		with time.now_ns as now
}

test_ttl_one_nanosecond_over_denies if {
	exact := approval("tech-1", "technical_owner", "2026-06-01T12:00:00Z", "2026-06-01T12:00:02Z")
	not illustrative.dual_key_ok with input as base_input([exact, approval("biz-1", "business_owner", "2026-06-01T12:00:00Z", "2026-06-01T12:00:02Z")], "2026-06-01T12:00:03Z")
		with data.clock_skew_ns as skew_ns
		with data.max_ttl_ns as 1999999999
		with data.role_registry as registry
		with time.now_ns as now
}

test_negative_clock_skew_denies if {
	not illustrative.dual_key_ok with input as base_input([technical, business], deadline)
		with data.clock_skew_ns as -1
		with data.max_ttl_ns as day_ns
		with data.role_registry as registry
		with time.now_ns as now
}

test_zero_max_ttl_denies if {
	not illustrative.dual_key_ok with input as base_input([technical, business], deadline)
		with data.clock_skew_ns as skew_ns
		with data.max_ttl_ns as 0
		with data.role_registry as registry
		with time.now_ns as now
}

test_negative_max_ttl_denies if {
	not illustrative.dual_key_ok with input as base_input([technical, business], deadline)
		with data.clock_skew_ns as skew_ns
		with data.max_ttl_ns as -1
		with data.role_registry as registry
		with time.now_ns as now
}

test_deadline_exactly_at_skew_boundary_denies if {
	denies([technical, business], "2026-06-01T12:00:01Z")
}

test_deadline_one_second_after_boundary_allows if {
	pair := [
		approval("tech-1", "technical_owner", "2026-06-01T12:00:00Z", "2026-06-01T12:00:02Z"),
		approval("biz-1", "business_owner", "2026-06-01T12:00:00Z", "2026-06-01T12:00:02Z"),
	]
	allows(pair, "2026-06-01T12:00:02Z")
}

test_mismatched_hash_denies if {
	bad := object.union(technical, {"payload_hash": "other"})
	denies([bad, business], deadline)
}

test_mismatched_model_denies if {
	bad := object.union(technical, {"model_version": "other"})
	denies([bad, business], deadline)
}

test_mismatched_policy_denies if {
	bad := object.union(technical, {"policy_version": "other"})
	denies([bad, business], deadline)
}

test_missing_nonce_denies if {
	bad := object.remove(technical, ["nonce"])
	denies([bad, business], deadline)
}

test_missing_deadline_denies if {
	inp := {
		"policy": {"require_dual_key": true, "version": "pol-1"},
		"action": {"payload_hash": "hash-1", "model_version": "model-1"},
		"approvals": [technical, business],
	}
	not illustrative.dual_key_ok with input as inp
		with data.clock_skew_ns as skew_ns
		with data.max_ttl_ns as day_ns
		with data.role_registry as registry
		with time.now_ns as now
}

test_numeric_expiry_denies if {
	bad := object.union(technical, {"expires_at": 5})
	denies([bad, business], deadline)
}

test_numeric_deadline_denies if {
	inp := object.union(base_input([technical, business], deadline), {"action": object.union(base_input([technical, business], deadline).action, {"execution_deadline": 5})})
	not illustrative.dual_key_ok with input as inp
		with data.clock_skew_ns as skew_ns
		with data.max_ttl_ns as day_ns
		with data.role_registry as registry
		with time.now_ns as now
}

test_false_signature_flag_denies if {
	bad := object.union(technical, {"signature_verified": false})
	denies([bad, business], deadline)
}

test_empty_approver_id_denies if {
	bad := object.union(technical, {"approver_id": ""})
	denies([bad, business], deadline)
}

test_missing_clock_skew_denies if {
	not illustrative.dual_key_ok with input as base_input([technical, business], deadline)
		with data.max_ttl_ns as day_ns
		with data.role_registry as registry
		with time.now_ns as now
}

test_missing_registry_denies if {
	not illustrative.dual_key_ok with input as base_input([technical, business], deadline)
		with data.clock_skew_ns as skew_ns
		with data.max_ttl_ns as day_ns
		with time.now_ns as now
}
