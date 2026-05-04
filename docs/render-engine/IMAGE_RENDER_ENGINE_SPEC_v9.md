# Image Render Engine Spec v9

## Goal

Turn a visual job into a visible visual file.

## MVP render path

visual_job
→ compiled visual prompt
→ local SVG render
→ Supabase Storage upload
→ assets table row
→ /outputs preview

## Why local SVG first?

A local SVG render proves the full production line without depending on external image-provider credentials.

Provider adapter can later be swapped for OpenAI GPT Image, Fal, Higgsfield, Nano Banana, or other render providers.

## Definition of Done

- Create Visual Job creates a job
- Generate creates a stored visual file
- Asset row exists
- /outputs shows image preview
- public_url opens the file
