# DT-010 — Timer and Session State Machine

**Status:** DRAFT acceptance contract. Requires reviewer approval and executable tests.  
**Dependencies:** DT-001 secure shell/test harness; domain tests themselves must not import Electron.  
**Scope:** Pure state transitions, durations and emitted persistence intents; real database durability belongs to DT-020.

## Inputs and outputs

Commands: Start(projectId, optionalTaskId, commandId), Pause(reason, commandId), Resume(commandId), Stop(commandId), SwitchTask(taskId, commandId).

Inputs include a controlled monotonic clock and UTC metadata clock. The domain receives repository acknowledgements through an application boundary. State snapshots distinguish pending persistence from acknowledged recording. There is at most one local active session.

## Required cases

| ID | Given / When | Expected result |
|---|---|---|
| TIMER-001 | Start, advance monotonic time 600 seconds, Stop | One stopped session with 600,000 ms recorded. |
| TIMER-002 | Record 600s, pause 300s, resume and record 900s, Stop | 1,500,000 ms = 25 minutes recorded; 5 paused minutes excluded. |
| TIMER-003 | Duplicate Start with same command ID | Same session identity; no duplicate start/segment. |
| TIMER-004 | Different Start while already recording | Explicit conflict unless using the dedicated switch flow; never a second overlap. |
| TIMER-005 | Duplicate Stop | No duplicate duration, session or outbox intent. |
| TIMER-006 | Wall clock jumps backward/forward during a 120s monotonic interval | Recorded duration remains 120,000 ms; anomaly metadata may be recorded. |
| TIMER-007 | Pause while recording; advance time while paused | Duration does not increase. |
| TIMER-008 | Stop while paused | Last active duration retained; no paused time added. |
| TIMER-009 | Switch task | Prior interval closes and new task interval opens at the same boundary without overlap. |
| TIMER-010 | Persistence rejects Start or Stop acknowledgement | Never report a durable saved state; return an explicit recoverable error/pending state. |
| TIMER-011 | Lock/suspend event | Paused reason is explicit; resume requires a command. |
| TIMER-012 | Repeat arbitrary valid/invalid command sequences | Duration never negative; no more than one active interval; idempotency holds. |

Invalid state transitions have typed errors and do not mutate committed duration. Pause/Stop must also produce the capture-generation invalidation intent through the application layer, verified in DT-040 race tests.

## Red evidence

Baseline source revision: NOT SET.  
Approved scaffold revision: NOT SET.  
Contract revision/hash: NOT SET.  
Reviewer approval: NOT OBTAINED.  
Test command: NOT IMPLEMENTED.  
Actual result/artifact: NOT RUN.

Expected new-test failure must be a genuine assertion against missing/incorrect behaviour, not a syntax or import failure. Keep candidate tests out of production until the approved implementation is ready.

## Out of scope

No AI, actual capture, native lifecycle listener, SQL driver, auth, sync server, UI styling or artificial productivity score. Do not introduce them to make these tests pass.

## Completion evidence

Reviewer-approved exact cases and negative controls; real red/green results; property tests for invariants; independent gate result at candidate SHA; memory entry; no unapproved test/policy modifications. Correct mutation of pause handling must be caught by the tests.
