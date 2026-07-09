# Design System Specification

## Name

Working name: AI Learning Design System.

Alternative name: ACE Design System.

## Purpose

The design system is the shared product language for the entire platform. It must support marketing, learning, block coding, professional IDE workflows, teachers, institutions, parents, billing, analytics, admin, mobile, desktop, offline states, and future WhatsApp summaries.

## Design System Layers

```text
Brand Foundations
  |
  v
Design Tokens
  |
  v
Primitive Components
  |
  v
Composite Components
  |
  v
Page Templates
  |
  v
Product Workflows
```

## Token Categories

### Color Tokens

Required semantic tokens:

- `color.background.default`
- `color.background.subtle`
- `color.surface.default`
- `color.surface.raised`
- `color.surface.sunken`
- `color.text.primary`
- `color.text.secondary`
- `color.text.muted`
- `color.text.inverse`
- `color.border.subtle`
- `color.border.default`
- `color.border.strong`
- `color.action.primary`
- `color.action.primaryHover`
- `color.action.secondary`
- `color.focus.ring`
- `color.status.success`
- `color.status.warning`
- `color.status.danger`
- `color.status.info`
- `color.ai.default`
- `color.code.background`
- `color.code.text`
- `color.chart.series.*`
- `color.block.motion`
- `color.block.looks`
- `color.block.sound`
- `color.block.events`
- `color.block.control`
- `color.block.sensing`
- `color.block.operators`
- `color.block.variables`
- `color.block.functions`
- `color.block.ai`
- `color.block.robotics`

Rules:

- All color usage must map to semantic tokens.
- Component code must not rely on arbitrary one-off colors.
- Status colors must be paired with labels, icons, shapes, or text.
- Dark mode must be supported from the beginning.

### Typography Tokens

Required tokens:

- `font.family.sans`
- `font.family.mono`
- `font.size.display`
- `font.size.h1`
- `font.size.h2`
- `font.size.h3`
- `font.size.body`
- `font.size.small`
- `font.size.caption`
- `font.size.code`
- `font.weight.regular`
- `font.weight.medium`
- `font.weight.semibold`
- `font.weight.bold`
- `lineHeight.tight`
- `lineHeight.normal`
- `lineHeight.relaxed`

Recommended:

- Sans: Inter or Geist.
- Mono: JetBrains Mono.

### Spacing Tokens

Required scale:

- `space.0`
- `space.1` = 4px
- `space.2` = 8px
- `space.3` = 12px
- `space.4` = 16px
- `space.5` = 20px
- `space.6` = 24px
- `space.8` = 32px
- `space.10` = 40px
- `space.12` = 48px
- `space.16` = 64px

### Radius Tokens

Required tokens:

- `radius.none`
- `radius.sm`
- `radius.md`
- `radius.lg`
- `radius.xl`
- `radius.full`

### Motion Tokens

Required tokens:

- `motion.duration.fast`
- `motion.duration.normal`
- `motion.duration.slow`
- `motion.easing.standard`
- `motion.easing.enter`
- `motion.easing.exit`

Rules:

- Respect `prefers-reduced-motion`.
- Avoid motion that interferes with reading or coding.

### Z-Index Tokens

Required tokens:

- `z.base`
- `z.dropdown`
- `z.sticky`
- `z.overlay`
- `z.modal`
- `z.toast`
- `z.tooltip`

## Primitive Components

Primitive components must be accessible and reusable.

Required primitives:

- Button,
- IconButton,
- Link,
- Input,
- Textarea,
- Select,
- Combobox,
- Checkbox,
- RadioGroup,
- Switch,
- Slider,
- FileInput,
- Label,
- FormField,
- Tooltip,
- Popover,
- DropdownMenu,
- Dialog,
- Drawer,
- Tabs,
- Accordion,
- Toast,
- Alert,
- Badge,
- Avatar,
- Progress,
- Skeleton,
- Spinner,
- Breadcrumb,
- Pagination,
- EmptyState.

## Composite Components

### Learning Composites

- CourseCard,
- LessonCard,
- LearningPathMap,
- SkillNode,
- MasteryMeter,
- PracticeCard,
- StreakWidget,
- AchievementCard,
- CertificatePreview,
- RecommendedNextStep.

### Teacher Composites

- ClassCard,
- AssignmentCard,
- SubmissionQueue,
- LearnerRiskList,
- ConceptWeaknessPanel,
- LessonPlannerPanel,
- QuizGeneratorPanel,
- RubricBuilder.

### Institution Composites

- SeatUsageCard,
- TeacherRoster,
- LearnerRoster,
- CohortProgressTable,
- BillingSummary,
- SubscriptionEntitlementPanel,
- ImportWizard,
- ExportPanel,
- AuditLogViewer.

### Coding Composites

- CodeEditorShell,
- FileTree,
- TerminalPanel,
- TestResultPanel,
- CodeReviewComment,
- DiffPanel,
- SandboxStatus,
- ProjectMilestonePanel.

### Block Coding Composites

- BlocklyWorkspaceShell,
- ToolboxCategoryList,
- StagePreview,
- SpriteManager,
- AssetLibrary,
- GeneratedCodeViewer,
- BlockExplanationPanel,
- AIHintPanel.

### AI Composites

- AIMentorPanel,
- AIContextChips,
- AIResponseCard,
- AIHintCard,
- AIReviewSummary,
- AISafetyNotice,
- AIUsageMeter.

### Analytics Composites

- MetricCard,
- TrendChart,
- MasteryHeatmap,
- CompletionFunnel,
- CohortComparison,
- AIUsageChart,
- ExportableDataTable.

## Page Shells

### Learner Shell

Navigation:

- dashboard,
- learn,
- projects,
- practice,
- AI mentor,
- achievements,
- portfolio,
- settings.

### Teacher Shell

Navigation:

- dashboard,
- classes,
- assignments,
- submissions,
- lesson planner,
- quiz generator,
- analytics,
- resources,
- settings.

### Institution Shell

Navigation:

- overview,
- learners,
- teachers,
- classes,
- curriculum,
- reports,
- billing,
- settings,
- audit logs.

### Admin Shell

Navigation:

- platform overview,
- institutions,
- users,
- content,
- AI operations,
- payments,
- support,
- security,
- system health.

### IDE Shell

Regions:

- top command bar,
- left file tree,
- center editor,
- right AI mentor/instructions,
- bottom terminal/test output,
- submission/status area.

### Blockly Shell

Regions:

- top project toolbar,
- left block toolbox,
- center workspace,
- right stage preview,
- bottom generated code,
- side AI mentor or project assets.

## Responsive Requirements

### Web Desktop

- Full dashboards.
- Split-pane IDE.
- Blockly workspace with stage.
- Advanced tables.

### Tablet

- Teacher classroom use.
- Learner practice.
- Simplified Blockly where possible.
- Responsive dashboards.

### Mobile Web

- Learning, quizzes, AI mentor, progress, notifications.
- Avoid full IDE complexity unless using simplified practice.

### Mobile App

- Offline lessons.
- Practice.
- AI chat when online.
- Downloaded content.
- Progress sync.

### Desktop App

- Offline coding.
- local project storage,
- sync,
- robotics/hardware integrations,
- stronger file/code workflows.

## Accessibility Requirements

Each component must document:

- keyboard behavior,
- focus behavior,
- ARIA roles where needed,
- accessible name requirements,
- screen reader behavior,
- contrast requirements,
- reduced motion behavior,
- error message behavior.

Required tests:

- keyboard-only navigation,
- screen reader smoke test,
- contrast check,
- responsive check,
- reduced motion check,
- form error check.

## Implementation Recommendations

### Recommended Packages

- `tailwindcss`
- `shadcn/ui`
- `radix-ui`
- `react-aria-components`
- `react-hook-form`
- `zod`
- `@tanstack/react-table`
- `@tanstack/react-query` where API-heavy client state is needed
- `recharts` or `nivo`
- `monaco-editor`
- `blockly`
- `pixi.js` or `phaser`
- `lucide-react`
- `sonner`
- `cmdk`
- `motion` or `framer-motion`

### Implementation Rules

- Start with shadcn/ui components, then customize them into the platform's own component library.
- Use Radix primitives where shadcn components are appropriate.
- Use React Aria for complex accessibility-heavy interactions not covered well by Radix or native elements.
- Use TanStack Table for data-heavy institution and admin tables.
- Keep product-specific composites separate from primitive UI components.
- Build Storybook or an equivalent component documentation environment before the component library grows too large.
- Connect Tailwind theme values to design tokens.
- Avoid importing a large UI kit that forces a generic look.

## Figma Requirements

The Figma design file should contain:

- cover page,
- design principles,
- token documentation,
- color styles,
- text styles,
- grid styles,
- effect styles where needed,
- icons,
- primitive components,
- composite components,
- page templates,
- interaction notes,
- responsive variants,
- accessibility annotations.

## Definition Of Done For UI Components

A component is production-ready only when:

- it uses tokens,
- it supports light and dark themes,
- it has accessible names and keyboard behavior,
- it handles loading, empty, error, disabled, hover, focus, active, and selected states where applicable,
- it is responsive,
- it has realistic examples,
- it is documented,
- it has tests where appropriate,
- and it has been reviewed in the actual product context.
