package dualkey.illustrative

import rego.v1

# Illustrative PDP check. Exercised by opa test, not a complete authorization.
# It does not verify signatures, consume nonces, or execute anything.
# Approval timestamps are RFC3339 strings. Evaluation converts them with
# time.parse_rfc3339_ns. TTL and clock_skew_ns are nanoseconds.
# now is captured once.
# now + clock_skew_ns is a conservative margin. Approvals close to
# expiry are denied. It is not a permissive grace period.
# data.role_registry[id] is a set of roles that identity may hold.
# The authenticated gateway sets input.policy.require_dual_key,
# approval.signature_verified, and the canonical payload hash.
# Comparing signature_verified does not perform cryptography.
# The agent cannot construct or override these inputs.

default dual_key_ok := false

dual_key_ok if {
	input.policy.require_dual_key == true
	data.clock_skew_ns >= 0
	data.max_ttl_ns > 0
	count(input.approvals) == 2

	now := time.now_ns()
	deadline := time.parse_rfc3339_ns(input.action.execution_deadline)
	deadline > now + data.clock_skew_ns

	roles := {a.role | some a in input.approvals}
	roles == {"technical_owner", "business_owner"}

	approver_ids := {a.approver_id | some a in input.approvals}
	count(approver_ids) == 2

	every a in input.approvals {
		a.approver_id != ""
		a.role != ""
		a.nonce != ""
		a.payload_hash != ""
		a.model_version != ""
		a.policy_version != ""
		a.signature_verified == true
		a.role in data.role_registry[a.approver_id]
		a.payload_hash == input.action.payload_hash
		a.model_version == input.action.model_version
		a.policy_version == input.policy.version

		issued_at := time.parse_rfc3339_ns(a.issued_at)
		expires_at := time.parse_rfc3339_ns(a.expires_at)

		issued_at <= now + data.clock_skew_ns
		expires_at > issued_at
		expires_at > now + data.clock_skew_ns
		expires_at - issued_at <= data.max_ttl_ns
	}
}
