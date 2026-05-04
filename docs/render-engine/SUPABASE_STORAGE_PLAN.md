# Supabase Storage Plan

## Bucket

visual-assets

## Path convention

visual-assets/
  workspaces/
    <workspace_id>/
      jobs/
        <job_key>/
          output_001.svg

## MVP security

Public read bucket for MVP.

## Later hardening

- signed URLs
- authenticated workspace access
- private bucket
- export approval gates
