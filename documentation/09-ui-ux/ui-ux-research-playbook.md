# UI/UX Research And Design-System Playbook

## Purpose

This document defines the UI/UX direction for the AI Learning Platform. It translates factual research, established standards, and benchmark product patterns into concrete design requirements for a world-class AI-powered computing education platform.

The goal is not to copy another product. The goal is to build a consistent, premium, accessible, scalable design system that can support:

- young learners,
- advanced software engineering learners,
- teachers,
- parents,
- school administrators,
- institutions,
- platform administrators,
- web,
- future mobile,
- future desktop,
- offline experiences,
- and WhatsApp learning.

## Design Ambition

The platform should feel:

- polished like Apple,
- simple like Notion,
- fast like Linear,
- engaging like Duolingo,
- usable for complex work like Figma,
- developer-friendly like GitHub and Replit,
- trustworthy for billing and institutional administration like Stripe and Shopify,
- and accessible according to WCAG 2.2 AA.

## Evidence-Based Foundations

### Nielsen Norman Group Usability Heuristics

NN/g's 10 usability heuristics are widely used principles for evaluating interfaces. They include visibility of system status, consistency, error prevention, recognition rather than recall, flexibility, minimalist design, and clear recovery from errors.

Product requirements:

- Every long-running AI, code execution, upload, sync, grading, import, export, and payment flow must show clear status.
- Learners must be able to undo, retry, reset, or ask for hints.
- The platform must keep important actions visible instead of forcing users to remember hidden commands.
- Interfaces must prevent destructive mistakes, especially for teachers and admins managing many learners.
- Error messages must explain what happened, why it matters, and how to fix it.

Source: https://www.nngroup.com/articles/ten-usability-heuristics/

### WCAG 2.2

WCAG 2.2 is the recommended W3C accessibility guideline for modern web content.

Product requirements:

- Target WCAG 2.2 AA by default.
- Support keyboard navigation across dashboards, lessons, Blockly workspace controls, modals, menus, tables, and AI chat.
- Ensure sufficient color contrast.
- Provide visible focus states.
- Do not rely on color alone to communicate meaning.
- Provide captions or transcripts for video/audio learning content.
- Design forms with labels, descriptions, validation, and recovery instructions.
- Support reduced motion preferences.

Source: https://www.w3.org/TR/WCAG22/

### WAI-ARIA Authoring Practices Guide

The W3C APG provides implementation guidance for accessible widgets such as dialogs, tabs, accordions, menus, grids, and tree views.

Product requirements:

- Complex components must follow APG keyboard and semantic patterns.
- Custom components must have accessible names.
- Dialogs must trap and restore focus correctly.
- Tabs, menus, comboboxes, tree views, and grids must support keyboard behavior expected by assistive technology users.

Source: https://www.w3.org/WAI/ARIA/apg/

### Apple Human Interface Guidelines

Apple's HIG emphasizes platform conventions, clarity, depth, consistency, direct manipulation, accessibility, typography, layout, and motion.

Product requirements:

- Use clear hierarchy, generous spacing, purposeful motion, and consistent interaction patterns.
- Mobile and desktop apps should respect platform conventions rather than blindly copying the web UI.
- Offline desktop/mobile experiences should feel native to their platform.

Source: https://developer.apple.com/design/human-interface-guidelines/

### Material Design 3

Material Design 3 uses theming systems based on color, typography, shape, and design tokens.

Product requirements:

- Define semantic tokens instead of hardcoding random colors.
- Use color roles consistently.
- Support light and dark themes.
- Use typography, shape, and motion scales.
- Keep accessibility connected to token decisions.

Source: https://developer.android.com/develop/ui/compose/designsystems/material3

### IBM Carbon Design System

Carbon provides enterprise-grade guidance for data visualization and accessibility. Its data visualization guidance emphasizes charts that do not rely solely on color and recommends accessible supporting structures.

Product requirements:

- Dashboards must provide readable axes, labels, legends, and data summaries.
- Charts must not rely only on color.
- Important charts should provide a table or exportable data view.
- Analytics must be designed for decision-making, not decoration.

Source: https://carbondesignsystem.com/data-visualization/getting-started/

### Shopify Polaris

Polaris is a strong reference for admin UX, information architecture, accessibility, internationalization, and consistent reusable components in a complex SaaS product.

Product requirements:

- Institution dashboards should use consistent admin patterns.
- Components should be reused across products to reduce accessibility and UX defects.
- Internationalization and localization should be planned early.
- Billing, settings, admin, tables, filters, and bulk actions should be calm and predictable.

Source: https://polaris-react.shopify.com/foundations

## UI Inspiration Sources

Use these for research and inspiration, not copying:

- Figma Community for editable UI kits and design systems.
- Mobbin for real product screen patterns.
- Landingfolio for landing pages, pricing, and SaaS marketing sections.
- SaaSFrame for dashboards and SaaS UX patterns.
- Dribbble for visual exploration only.
- Behance for full UX case studies.
- Awwwards for animation and landing page polish.

## Benchmark Product Lessons

### Duolingo

Study for:

- streaks,
- progress loops,
- daily practice,
- rewards,
- short lessons,
- motivational feedback.

Apply carefully. The product should be playful for children but not childish for advanced learners.

### Codecademy

Study for:

- lesson plus editor layout,
- incremental exercises,
- hints,
- guided projects,
- progress paths.

Avoid making the experience too rigid for advanced learners.

### Replit

Study for:

- browser IDE,
- file tree,
- collaboration,
- run output,
- AI coding assistant,
- project workspace.

The platform should learn from Replit but remain education-first, with assessment, teacher oversight, and guided learning.

### GitHub

Study for:

- code review,
- repository navigation,
- organizations,
- permissions,
- issues,
- pull requests,
- audit-friendly workflows.

Apply to advanced learner portfolios, teacher review, team projects, and institution organization.

### Notion

Study for:

- clean information architecture,
- sidebar organization,
- document-like content,
- blocks,
- low visual clutter.

Apply to lesson content, teacher resources, curriculum documents, and knowledge bases.

### Linear

Study for:

- speed,
- keyboard shortcuts,
- command palette,
- dense but readable lists,
- clear issue states.

Apply to teacher/admin workflows and advanced learner productivity.

### Figma

Study for:

- complex canvas interfaces,
- tool panels,
- collaboration,
- inspector panels,
- keyboard shortcuts,
- spatial interfaces.

Apply to Blockly, stage, hybrid coding, and project builders.

### Stripe

Study for:

- billing dashboards,
- developer documentation,
- clean data tables,
- settings,
- trust-building admin UX.

Apply to subscriptions, invoices, M-Pesa/Stripe reconciliation, institution billing, and API documentation.

### Khan Academy

Study for:

- approachable learning pages,
- progress maps,
- simple explanations,
- mastery learning.

Apply to beginner learning paths and teacher-aligned curriculum.

## Design Principles

### 1. Premium But Not Decorative

The UI should look modern and beautiful, but beauty must support learning and productivity. Avoid decorative clutter, excessive gradients, unnecessary animations, and novelty effects.

### 2. Calm For Teachers, Engaging For Learners

Learners need motivation and delight. Teachers and administrators need calm, efficient control. The design system must support both through shared components and role-specific emphasis.

### 3. Accessible By Default

Accessibility is not optional. Components must be designed, implemented, and tested for keyboard, screen reader, focus, contrast, reduced motion, and responsive behavior.

### 4. Fast And Responsive

Perceived speed matters. Use skeleton loading, optimistic UI where safe, progressive loading, and clear status indicators.

### 5. One System, Many Surfaces

The same design language must support marketing pages, dashboards, lessons, Blockly, coding IDE, admin, mobile, desktop, and future WhatsApp summaries.

### 6. AI Should Feel Visible But Controlled

AI should feel integrated into learning workflows, not like a random chat widget. Users must understand when AI is thinking, what context it used, what confidence limitations exist, and how to ask for a hint, explanation, or review.

## Visual Language

### Brand Direction

Recommended brand personality:

- intelligent,
- optimistic,
- trustworthy,
- African-rooted but globally credible,
- modern,
- practical,
- mentor-like,
- future-facing.

### Color Requirements

Create semantic color tokens:

- background,
- surface,
- elevated surface,
- primary,
- primary foreground,
- secondary,
- accent,
- success,
- warning,
- danger,
- info,
- muted,
- border,
- focus ring,
- code background,
- Blockly category colors,
- chart series.

Rules:

- Do not communicate status by color alone.
- Maintain contrast targets.
- Support light and dark mode.
- Reserve strong colors for meaningful actions and feedback.
- Use playful colors in beginner learning areas but calmer tones in admin and advanced IDE areas.

### Typography Requirements

Use a modern, readable type system.

Recommended web fonts:

- Inter for general UI,
- Geist as an alternative,
- IBM Plex Sans as a more enterprise/technical alternative,
- JetBrains Mono or IBM Plex Mono for code.

Define:

- display,
- heading 1,
- heading 2,
- heading 3,
- body,
- small,
- caption,
- code,
- label.

Rules:

- Prioritize readability.
- Avoid tiny text in dashboards.
- Use monospace only for code, tokens, IDs, commands, and technical data.

### Spacing And Layout

Use a consistent spacing scale:

- 4,
- 8,
- 12,
- 16,
- 20,
- 24,
- 32,
- 40,
- 48,
- 64.

Layout requirements:

- responsive grid,
- consistent page gutters,
- card spacing,
- dashboard density modes,
- split panes for coding,
- resizable panels for IDE,
- mobile-first simplification,
- tablet-friendly classroom use.

### Shape And Elevation

Use modern but restrained radius:

- small for inputs and badges,
- medium for cards and dialogs,
- large for learner achievement cards where appropriate.

Avoid excessive shadows. Use borders, background layers, and spacing for structure.

### Motion

Motion should communicate:

- completion,
- progress,
- loading,
- transition,
- celebration,
- correction,
- AI response streaming,
- code execution,
- project preview.

Rules:

- respect `prefers-reduced-motion`,
- avoid distracting animation during reading or coding,
- use short durations,
- make learning achievements feel rewarding.

## Core Page Templates

### Marketing Website

Required pages:

- home,
- schools,
- teachers,
- students,
- parents,
- coding academies,
- pricing,
- curriculum,
- AI safety,
- security,
- about,
- contact,
- blog,
- documentation.

### Authentication

Required screens:

- sign up,
- login,
- forgot password,
- reset password,
- MFA,
- invitation accept,
- child account setup,
- parent/guardian consent where needed.

### Onboarding

Learner onboarding:

- age/level,
- goal,
- preferred path,
- device/internet constraints,
- placement quiz,
- first challenge.

Teacher onboarding:

- institution,
- subjects,
- class setup,
- invite/import students,
- first assignment.

Institution onboarding:

- organization profile,
- billing,
- admins,
- teachers,
- learner seats,
- curriculum/country settings.

### Learner Dashboard

Must show:

- current path,
- next lesson,
- progress,
- streak,
- skill mastery,
- projects,
- AI mentor entry,
- recent feedback,
- certificates,
- recommended practice.

### Teacher Dashboard

Must show:

- classes,
- assignments,
- submissions needing review,
- learner risk indicators,
- weak concepts,
- AI lesson planner,
- quiz generator,
- attendance/activity where available,
- reports.

### Institution Dashboard

Must show:

- active learners,
- active teachers,
- seat usage,
- course completion,
- cohort performance,
- AI usage,
- subscription status,
- billing,
- exports,
- curriculum coverage.

### Block Coding Workspace

Required layout:

- top toolbar,
- left toolbox,
- center Blockly workspace,
- right stage/preview,
- bottom or side generated code panel,
- AI mentor panel,
- project assets panel,
- teacher assignment context.

### Coding IDE Workspace

Required layout:

- file tree,
- editor,
- terminal/output,
- tests,
- AI mentor,
- instructions,
- submission panel,
- feedback panel.

### AI Mentor Interface

Must support:

- chat,
- hint mode,
- explain mode,
- debug mode,
- review mode,
- source references,
- safety messages,
- teacher visibility controls,
- context chips showing what AI knows.

## Component Library Requirements

### Foundation Components

- Button,
- IconButton,
- Link,
- Input,
- Textarea,
- Select,
- Combobox,
- Checkbox,
- Radio,
- Switch,
- Slider,
- Date picker,
- File upload,
- Avatar,
- Badge,
- Pill,
- Tooltip,
- Popover,
- Dropdown menu,
- Dialog,
- Drawer,
- Tabs,
- Accordion,
- Toast,
- Alert,
- Empty state,
- Skeleton,
- Progress,
- Stepper,
- Breadcrumb,
- Pagination.

### Education Components

- lesson card,
- course card,
- path map,
- skill node,
- mastery indicator,
- quiz question,
- code challenge prompt,
- project milestone,
- certificate card,
- streak card,
- badge display,
- hint panel,
- AI feedback card,
- rubric display.

### Coding Components

- code editor shell,
- file explorer,
- terminal output,
- test result panel,
- code review comment,
- diff viewer,
- run button,
- sandbox status,
- GitHub repo card,
- deployment status.

### Block Coding Components

- Blockly shell,
- toolbox category,
- sprite card,
- asset picker,
- stage controls,
- generated code panel,
- block explanation panel,
- project version history.

### Admin Components

- data table,
- filters,
- bulk action bar,
- audit log list,
- billing card,
- subscription usage meter,
- role editor,
- permission matrix,
- import wizard,
- export dialog,
- tenant settings.

### Analytics Components

- metric card,
- trend chart,
- cohort heatmap,
- skill mastery chart,
- learner risk table,
- AI usage chart,
- completion funnel,
- engagement calendar,
- exportable table view.

## Recommended UI Technology Stack

### Core

- React with TypeScript.
- Inertia.js.
- Tailwind CSS.
- Vite.

### Component Foundation

Recommended:

- shadcn/ui as a starting component scaffold.
- Radix UI for accessible primitives.
- React Aria for advanced accessibility-heavy components where needed.

Guidance:

- shadcn/ui is useful because components are copied into the codebase and can become the platform's own design system.
- Radix is strong for dialogs, menus, popovers, tabs, tooltips, dropdowns, and focus behavior.
- React Aria is strong for complex accessibility, internationalization, tables, drag/drop, selection, and adaptive interactions.

### Forms

- React Hook Form.
- Zod.
- Laravel server-side validation.

### Tables

- TanStack Table for institution/admin dashboards.

### Charts

Options:

- Recharts for approachable React charts.
- Nivo for rich visualizations.
- Tremor for dashboard-style blocks if compatible with the final design direction.

Charts must follow accessibility and export requirements.

### Coding And Learning

- Blockly.
- Monaco Editor.
- PixiJS or Phaser.
- React Flow for visual workflows where needed.

### Motion And Feedback

- Motion or Framer Motion.
- Sonner for toast notifications.
- cmdk for command palette.
- Lucide for icons.

## UI Quality Checklist

Every screen should pass:

- clear primary action,
- clear secondary actions,
- visible loading state,
- visible empty state,
- useful error state,
- keyboard navigation,
- focus states,
- responsive behavior,
- accessible names,
- sufficient contrast,
- reduced motion support,
- no color-only status,
- consistent spacing,
- clear copy,
- no unnecessary clutter,
- tested with realistic data.

## Design Deliverables Required Before Full Build

The design team should produce:

- brand identity direction,
- product design principles,
- design tokens,
- typography scale,
- color system,
- icon usage guide,
- component library,
- responsive layout system,
- dashboard templates,
- learner flow,
- teacher flow,
- institution admin flow,
- block coding workspace design,
- IDE workspace design,
- AI mentor interaction design,
- billing and subscription design,
- mobile design direction,
- desktop design direction,
- accessibility checklist,
- Figma component library,
- prototype for first learner journey,
- prototype for first teacher journey,
- prototype for institution onboarding.

## Immediate Recommendation

Start by building a design system called `ACE Design System` or `AI Learning Design System`.

Do not start by designing random pages. Build:

1. design principles,
2. tokens,
3. components,
4. page templates,
5. interaction patterns,
6. accessibility rules,
7. implementation package standards.

Then use those foundations to design the first web release.
