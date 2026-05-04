# Visual Job Model

A Visual Job is the core runtime object of AndyAI Visual Factory.

It represents one production task, such as:

```text
Create a 5x5 variation grid for a landing page hero visual.
Use the AndyAI Visual Factory brand pack.
Export final winner as website hero, README visual, and LinkedIn post.
```

## Job responsibilities

A visual job must track:

- request source
- brand pack
- output type
- prompt plan
- generation status
- human review status
- selected variant
- export targets
- final asset records
