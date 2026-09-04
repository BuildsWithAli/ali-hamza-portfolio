-- Run this once in your Supabase project: Dashboard -> SQL Editor -> New query
-- -> paste this whole file -> Run.
--
-- These tables are only ever read/written by your Next.js API routes using
-- the service_role key (server-side), so Row Level Security stays OFF and
-- locked down by default (no anon access) -- the API routes are the only
-- door in.

create extension if not exists "pgcrypto";

-- Contact-form submissions
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Single-row visitor/page-view counter (id is always 'global')
create table if not exists stats (
  id text primary key,
  views bigint not null default 0,
  updated_at timestamptz not null default now()
);
insert into stats (id, views) values ('global', 0)
  on conflict (id) do nothing;

-- Atomic increment so concurrent visitors never race/lose a count.
create or replace function increment_views() returns bigint as $$
  update stats set views = views + 1, updated_at = now()
  where id = 'global'
  returning views;
$$ language sql;

-- Editable portfolio content (id is always 'main'); the whole content
-- object is stored as one JSON blob and edited from /admin.
create table if not exists content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
