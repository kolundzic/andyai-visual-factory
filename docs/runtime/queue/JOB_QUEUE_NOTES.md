# Job Queue Notes

Future runtime should support a queue.

## Queue concerns

- priority
- retries
- provider availability
- cost limits
- human review delays
- export status
- failure recovery

## Queue rule

```text
No job should disappear.
Every job needs a status, result, or failure record.
```
