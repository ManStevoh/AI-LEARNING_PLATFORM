# Coding Workspace UX Specification

## Purpose

This document defines the UX for block coding and browser IDE workspaces.

## Shared Principles

- keep instructions visible,
- make run/test/submit actions obvious,
- show errors clearly,
- preserve learner work automatically,
- make AI help contextual,
- support teacher review.

## Block Workspace Layout

Areas:

- project brief,
- Blockly toolbox,
- Blockly workspace,
- stage preview,
- generated code panel,
- AI mentor,
- run/stop/submit actions.

Required states:

- autosaving,
- project saved,
- runtime error,
- disconnected blocks,
- submission pending,
- feedback available.

## Browser IDE Layout

Areas:

- file explorer,
- editor,
- lesson/project instructions,
- AI mentor,
- console/tests/problems,
- submit/review actions.

Required states:

- file unsaved,
- sandbox queued,
- execution timeout,
- tests failed,
- tests passed,
- AI review pending,
- assessment mode active.

## Mobile Strategy

Mobile should prioritize:

- lesson reading,
- quizzes,
- progress,
- AI Q&A,
- simple edits.

Full IDE work is better on tablet/desktop, with mobile support where practical.

## Acceptance Criteria

- learner can run project/code easily,
- output/errors are understandable,
- AI has contextual entry point,
- workspace handles loading/error states,
- teacher submission review data is captured.
