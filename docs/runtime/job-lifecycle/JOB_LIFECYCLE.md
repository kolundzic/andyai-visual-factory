# Job Lifecycle

## States

```text
draft
planned
queued
generating
review_required
selected
regenerating
exporting
completed
archived
failed
```

## Lifecycle

```text
Production Request
→ draft
→ planned
→ queued
→ generating
→ review_required
→ selected
→ regenerating
→ exporting
→ completed
→ archived
```

## Failure handling

Failed jobs must record:

- failure stage
- error message
- retry recommendation
- operator action required
