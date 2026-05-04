# Production Request Specification

A Production Request is the human/operator-facing input that creates a Visual Job.

## Required fields

- request_id
- requester
- project
- brand_pack_id
- output_type
- goal
- target_platforms
- quality_level
- human_review_required

## Example

```yaml
request_id: req_001
requester: Andy
project: AndyAI Visual Factory
brand_pack_id: andyai_default
output_type: hero_visual
goal: create a premium landing page hero visual
target_platforms:
  - website
  - README
  - LinkedIn
quality_level: high
human_review_required: true
```
