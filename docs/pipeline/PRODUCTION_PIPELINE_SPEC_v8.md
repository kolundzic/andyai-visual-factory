# Production Pipeline Spec v8

## Core flow

production_request
→ visual_job
→ output candidates
→ review action
→ selection ledger
→ export pack

## MVP behavior

When a request is created:

1. create production_request
2. create linked visual_job
3. create runtime event entries
4. show real data in /outputs
5. expose review action shells
