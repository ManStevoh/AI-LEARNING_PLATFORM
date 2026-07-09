# Code Execution Sandbox

## Purpose

The platform must eventually let learners run code, tests, labs, and projects safely. This is one of the highest-risk technical areas because learner code is untrusted.

## Core Rule

Never execute learner code on Laravel application servers.

Code execution must happen in isolated sandbox infrastructure.

## Supported Use Cases

- run beginner code snippets,
- run coding exercises,
- run tests,
- grade assignments,
- execute project previews,
- generate output logs,
- support teacher review,
- support AI code feedback.

## Initial Language Targets

Phase 1:

- JavaScript,
- Python.

Phase 2:

- PHP,
- SQL exercises,
- HTML/CSS/JS web previews.

Phase 3:

- Laravel project labs,
- Flutter analysis/build support where feasible,
- Dockerized advanced labs.

## Execution Lifecycle

```text
Learner submits code
  |
  v
Laravel creates execution request
  |
  v
Queue dispatches sandbox job
  |
  v
Sandbox service runs code
  |
  v
Results/logs/artifacts saved
  |
  v
Learner receives output and feedback
```

## Security Requirements

Sandbox must enforce:

- CPU limit,
- memory limit,
- wall-clock timeout,
- process limit,
- filesystem isolation,
- network disabled by default,
- read-only base image,
- dropped Linux capabilities,
- no privileged containers,
- no host filesystem mounts,
- output size limits,
- artifact size limits,
- abuse detection.

## Isolation Options

### Managed Sandbox

Examples:

- Judge0,
- E2B,
- Modal,
- Sphere Engine,
- Fly Machines.

Pros:

- faster launch,
- less infrastructure burden.

Cons:

- cost,
- vendor dependency,
- customization limits,
- data residency questions.

### Containers

Acceptable for lower-risk or controlled workloads if hardened.

Required:

- rootless containers,
- seccomp,
- AppArmor/SELinux,
- no network,
- resource limits,
- disposable containers.

Warning:

- Kubernetes alone is not a sandbox.

### MicroVMs

Future high-security direction:

- Firecracker-style isolation.

Pros:

- stronger isolation,
- better for untrusted code at scale.

Cons:

- harder to build and operate.

## Recommendation

Start with managed sandboxing or Judge0 for early product validation.

Move toward Firecracker-style sandboxing only if code execution becomes core intellectual property and volume justifies it.

## Test Execution

Each coding exercise should define:

- starter files,
- hidden tests,
- visible tests,
- time limit,
- memory limit,
- expected output,
- rubric,
- language/runtime version.

## Result Model

Execution result should include:

- status,
- stdout,
- stderr,
- exit code,
- test results,
- runtime,
- memory usage,
- artifact URLs,
- error category,
- feedback summary.

## Abuse Controls

Detect:

- infinite loops,
- fork bombs,
- large output spam,
- network attempts,
- filesystem abuse,
- repeated failed executions,
- suspicious payloads.

Controls:

- rate limits,
- tenant quotas,
- learner quotas,
- execution cost tracking,
- teacher/admin visibility.

## AI Integration

AI may use:

- code,
- error output,
- test result summary,
- lesson context,
- learner skill state.

AI should:

- explain errors,
- suggest debugging steps,
- avoid giving full graded solutions,
- map feedback to skills.

## Data Retention

Define retention for:

- raw code,
- execution logs,
- artifacts,
- failed runs,
- abuse events,
- teacher-reviewed submissions.

## Definition Of Done

Code execution is production-ready only when:

- untrusted code is isolated,
- resource limits are enforced,
- logs/results are stored,
- abuse controls exist,
- queue orchestration works,
- tests cover timeouts and malicious code,
- monitoring exists,
- teacher/learner feedback UI exists.
