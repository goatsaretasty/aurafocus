create table if not exists entries (
  id bigserial primary key,
  clerk_user_id text not null,
  song text not null,
  musings text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists entries_user_created_idx
  on entries (clerk_user_id, created_at desc);
