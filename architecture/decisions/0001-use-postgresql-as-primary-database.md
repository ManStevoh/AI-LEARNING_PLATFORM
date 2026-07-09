# ADR 0001: Use PostgreSQL As The Primary Database

Status: Accepted

Date: 2026-07-09

## Context

The AI Learning Platform is expected to support:

- millions of learners over time,
- schools, bootcamps, universities, NGOs, governments, and enterprise customers,
- AI tutoring and Retrieval-Augmented Generation,
- curriculum-aware learning,
- learner progress analytics,
- institution dashboards,
- block coding project storage,
- code submissions and assessment data,
- offline synchronization,
- audit logging,
- subscriptions and payments,
- future mobile, desktop, and WhatsApp channels.

The founder asked whether the platform should use MySQL or PostgreSQL. Both are mature relational databases and both can support a serious Laravel application. The decision must be based on the long-term product shape, not only initial familiarity.

## Decision

Use PostgreSQL as the strategic primary database for the platform.

Laravel should be configured for PostgreSQL from the beginning unless a short-term hosting or team constraint makes MySQL unavoidable. If MySQL is used temporarily for an early prototype, the data model must avoid MySQL-specific assumptions so migration to PostgreSQL remains practical.

## Rationale

PostgreSQL is the better default for this product because:

- It supports advanced relational modeling and constraints suitable for institutional SaaS.
- It has strong JSON and JSONB capabilities for flexible project metadata, Blockly project state, assessment metadata, AI trace metadata, and integration payloads.
- It supports powerful indexing strategies for analytics-heavy dashboards.
- It supports full-text search, which is useful for lessons, help content, curriculum resources, and internal knowledge bases.
- It supports extensions, especially pgvector, allowing the team to store and query embeddings in the same database during early and mid-stage RAG development.
- It is widely used in data-heavy SaaS products and has strong ecosystem support.

pgvector provides vector similarity search inside PostgreSQL and supports exact and approximate nearest-neighbor search. This allows the platform to begin with a simpler architecture while still supporting AI retrieval workflows.

## Consequences

### Positive

- Simpler initial AI/RAG architecture than using a separate vector database immediately.
- Strong foundation for analytics, reporting, JSON-heavy education data, and institutional workflows.
- Better long-term fit for complex product data and query patterns.
- Easier evolution toward hybrid search, semantic search, and curriculum-aware retrieval.

### Negative

- Some developers familiar with MySQL may need PostgreSQL training.
- Some shared hosting environments may not support PostgreSQL as easily as MySQL.
- PostgreSQL tuning, indexing, and query planning expertise will become important as the platform scales.

## Alternatives Considered

### MySQL

MySQL is mature, widely hosted, well-supported by Laravel, and familiar to many PHP teams. It is acceptable for a smaller Laravel SaaS platform.

It is not the preferred strategic choice here because the product is expected to depend heavily on AI retrieval, JSON-rich project data, analytics, and complex institutional reporting.

### PostgreSQL Plus Separate Vector Database

This is a strong future option. Tools such as Pinecone, Weaviate, Qdrant, or OpenSearch can be introduced later if retrieval scale, hybrid search requirements, multi-tenant isolation, latency, or ranking quality justify the additional operational complexity.

### MySQL Plus Separate Vector Database

This can work technically, but it increases system complexity earlier while still giving up PostgreSQL's advantages for JSON, analytics, constraints, extensions, and full-text search.

## Implementation Guidance

- Use PostgreSQL for production, staging, CI, and local Docker environments.
- Use UUID or ULID identifiers for externally exposed resources where appropriate.
- Use strong foreign keys and constraints for institutional data integrity.
- Use JSONB only where flexible metadata is truly needed; do not use JSONB to avoid proper relational modeling.
- Create explicit indexes for tenant boundaries, learner progress queries, classroom dashboards, subscriptions, and audit logs.
- Use pgvector initially for course content embeddings, curriculum mappings, lesson chunks, help articles, code examples, rubrics, and AI knowledge retrieval.
- Reassess vector infrastructure when retrieval volume, embedding count, latency, or ranking requirements exceed PostgreSQL plus pgvector's operational comfort zone.

## References

- PostgreSQL: https://www.postgresql.org/
- pgvector: https://github.com/pgvector/pgvector
- pgvector PGXN: https://pgxn.org/dist/vector
- Laravel database documentation: https://laravel.com/docs/database
