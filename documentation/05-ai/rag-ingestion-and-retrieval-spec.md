# RAG Ingestion And Retrieval Spec

## Purpose

This document defines how platform content becomes searchable context for AI.

RAG should ground AI answers in approved curriculum, rubrics, documentation, teacher notes, and institution-specific materials.

## Ingestion Sources

Supported sources:

- lessons,
- labs,
- quizzes,
- rubrics,
- teacher notes,
- PDFs,
- markdown documents,
- code examples,
- institution policies,
- support articles.

## Ingestion Pipeline

```text
Source content created/updated
  |
  v
Extract text
  |
  v
Clean and normalize
  |
  v
Chunk content
  |
  v
Attach metadata
  |
  v
Generate embeddings
  |
  v
Store chunks/vectors
  |
  v
Validate retrieval
```

## Chunk Metadata

Each chunk should include:

```text
chunk_id
document_id
tenant_id
visibility
content_type
curriculum_level
lesson_id
skill_ids
competency_ids
language
country_context
version
published_status
created_at
updated_at
```

## Retrieval Filters

Always filter by:

- tenant,
- visibility,
- published status,
- learner age/role where needed,
- institution policy,
- assessment mode.

## Retrieval Flow

```text
AI task created
  |
  v
Create search query
  |
  v
Apply filters
  |
  v
Run vector/full-text search
  |
  v
Rank chunks
  |
  v
Select context
  |
  v
Attach citations/source IDs
```

## Storage Strategy

Initial:

- PostgreSQL,
- pgvector,
- metadata columns,
- full-text search where useful.

Future:

- dedicated vector database if scale/latency requires.

## Content Versioning

AI should know which version of content was retrieved.

If a lesson is updated:

- old chunks should be superseded,
- new chunks generated,
- retrieval should prefer published current content,
- audit should preserve historical response context where needed.

## Quality Controls

Required:

- retrieval test queries,
- source citation checks,
- stale content checks,
- tenant isolation tests,
- unpublished content exclusion,
- prompt injection scanning for uploaded documents.

## AI Response Requirements

For curriculum-specific answers:

- include source references where user-facing,
- avoid unsupported claims,
- say when no source was found,
- prefer platform content over generic model knowledge.

## Acceptance Criteria

- content can be ingested,
- chunks include metadata,
- retrieval respects tenant and visibility,
- AI answers can cite sources,
- unpublished content is not shown to learners,
- retrieval traces are logged.
