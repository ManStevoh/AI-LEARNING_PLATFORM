# Accessibility Implementation Checklist

## Purpose

This checklist translates WCAG 2.2 AA, WAI-ARIA APG, and editor-specific guidance into implementation tasks.

References:

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA APG: https://www.w3.org/WAI/ARIA/apg/
- Monaco accessibility: https://github.com/microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide

## Global Requirements

- semantic HTML,
- keyboard navigation,
- visible focus states,
- sufficient contrast,
- responsive text,
- non-color-only indicators,
- reduced motion support,
- labels for form fields,
- error messages associated with inputs.

## Navigation

- skip link,
- landmarks,
- logical tab order,
- keyboard-accessible menus,
- accessible breadcrumbs.

## Forms

- labels,
- help text,
- validation messages,
- required fields indicated accessibly,
- error summary for long forms.

## Dashboards And Tables

- table headings,
- accessible filters,
- chart alternatives,
- export/download where useful,
- clear empty states.

## AI Mentor

- AI panel reachable by keyboard,
- messages announced where appropriate,
- loading states visible,
- sources accessible,
- feedback buttons labeled.

## Blockly

Required review:

- keyboard alternatives,
- text-based fallback practice where needed,
- accessible instructions,
- clear block labels,
- non-color-only block category cues.

## Monaco IDE

Required:

- `ariaLabel` per editor/file,
- deliberate accessibility support setting,
- document keyboard shortcuts,
- accessible run/test/submit buttons,
- output panel announcements.

## Media

- captions for videos,
- transcripts for audio,
- alt text for images,
- avoid essential information in image-only form.

## Testing

Test with:

- keyboard only,
- screen reader,
- zoom,
- reduced motion,
- color contrast tools,
- mobile viewport.

## Acceptance Criteria

- critical flows pass keyboard testing,
- WCAG 2.2 AA checklist reviewed,
- custom components follow APG patterns,
- accessibility issues are tracked like bugs.
