# Building Products for Agents to Use

In the "Assistant-First" world, your UI is just one of many clients. To be defensible, your product must move from being a **Destination App** to a **Domain Execution Engine**.

Follow these six core pillars to ensure your product is a "Backbone" that humans love and agents can operate.

## Pillar 1: Model the "Verbs and Nouns," Not the Screens

Agents don't navigate sidebars; they manipulate domain models.

- **Define Canonical Entities:** Stop building "pages." Build "Entities" (Invoices, Shipments, Transactions) with rigid schemas.
- **Invariants Over UI Validation:** Do not rely on front-end form validation. The "Truth Layer" (database/API) must enforce all business logic. If an agent tries to "Reconcile" a transaction without a receipt, the *system* should reject it, not the *button*.
- **Versioned State Machines:** Every entity should have a clearly defined lifecycle (e.g., `Draft` -> `Pending_Review` -> `Executed`). Agents need to know exactly what state an object is in to decide the next action.

## Pillar 2: Build "Machine Contracts," Not Features

An "intent-based" workflow requires deterministic execution.

- **Idempotency is Mandatory:** If an agent loses connection and retries an action, it must not create a duplicate. Every "Action" API must support an `idempotency_key`.
- **Atomic Rollbacks:** If a multi-step workflow fails at step 3, the system must automatically revert steps 1 and 2 or provide a "compensating transaction" (Undo).
- **Predictable Side Effects:** An agent must know exactly what *else* will happen when it triggers an action (e.g., "If I approve this, it will also notify the CFO and deduct from the budget").

## Pillar 3: Separate Confidence from Authority

This is the "Human-in-the-Loop" (HITL) architecture.

- **The Policy Layer:** Define explicit "Guardrails" in the backend.
    - *Example:* An agent can approve expenses up to $50. Anything higher requires a `human_gate_id`.
- **Confidence Scores:** When an agent performs an action (like matching an invoice), store the *confidence* and the *evidence*.
- **Scoped Permissions:** Move away from "Admin vs. User." Use granular, resource-based permissions that an agent can query: `can_agent_perform(action, resource_id)`.

## Pillar 4: Decisions with Receipts (Explainability)

Every automated action must be auditable and "reason-able."

- **Provenance Logs:** Don't just log *that* something changed; log *why*.
    - *Bad:* `Status changed to Approved.`
    - *Good:* `Status changed to Approved by Agent-01. Reason: Matched against Purchase Order #99. Confidence: 0.98.`
- **Traceability:** If an agent makes a mistake, the "Event History" should be a product feature, not a developer log. It must be readable by the assistant so it can explain its own actions to a human.

## Pillar 5: Error Taxonomies Over Generic Messages

Agents need to know *why* they failed so they can self-correct.

- **Actionable Errors:** Do not return `400 Bad Request`. Return specific error codes: `INSUFFICIENT_PERMISSIONS`, `MISSING_EVIDENCE_DOCUMENT`, `THRESHOLD_EXCEEDED`.
- **Correction Hints:** If a request fails, include what is needed to fix it in the response body.

## Pillar 6: Surface Area Synchronicity (UI as a Shortcut)

The UI should be a visual representation of the API, not a wrapper around it.

- **Deep-Linkable Intent:** Every "Task" in your UI should have a direct URI that an agent can hand back to a human. (e.g., `app.com/verify/txn_123`). This allows the agent to do 90% of the work and "shortcut" the human directly to the final 10%.
- **Headless-First Design:** If a human can do it in the UI, an agent must be able to do it via API. Never gate a "Confirm" action behind a UI-only websocket or local state.
- **Transparent Automation:** When an agent shortcuts a human workflow, the UI should visually indicate "Automated by [Agent Name]" to maintain the human's mental model of the system state.

---

## The 4-Layer Audit for Your Product

Before shipping a new capability, ask:

1. **Truth:** Is the data structured and historically indexed?
2. **Policy:** Are the permissions and guardrails enforced at the API level?
3. **Execution:** Can this be triggered via a single, idempotent API call?
4. **Interface:** Does the UI simply reflect the state of the first three layers? If the human hits "Approve," are they calling the *exact same* endpoint the agent would?

**The Goal:** If you deleted your entire React/Web codebase tomorrow, your business should still be able to function entirely through an LLM interacting with your API. The UI exists only to provide humans with a high-bandwidth view of the "Truth" and "Policy" layers.
