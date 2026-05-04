# Release Notes — v8.0.1 Visual Job output_type Insert Fix

## Fixed

- `visual_jobs.output_type` is now explicitly inserted from the production request output type.
- The production pipeline no longer depends on the database default for `output_type`.

## Why

The database schema requires `visual_jobs.output_type` to be non-null. v8.0.0 created the pipeline bridge but did not include this field in the job insert payload.

## Expected behavior

`POST /api/factory/request` returns:

- `ok: true`
- `request`
- `visualJob`

and `/outputs` shows the created pipeline job.
