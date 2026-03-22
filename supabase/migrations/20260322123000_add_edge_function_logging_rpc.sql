create table if not exists public.edge_function_logs (
  id uuid primary key default gen_random_uuid(),
  function_name text not null,
  lead_email text,
  status text not null check (status in ('success', 'error')),
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_edge_function_logs_function_created_at
  on public.edge_function_logs (function_name, created_at desc);

create index if not exists idx_edge_function_logs_status_created_at
  on public.edge_function_logs (status, created_at desc);

create or replace function public.log_edge_function_call(
  p_function_name text,
  p_lead_email text default null,
  p_status text default 'success',
  p_error_message text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.edge_function_logs (
    function_name,
    lead_email,
    status,
    error_message,
    metadata
  ) values (
    coalesce(nullif(trim(p_function_name), ''), 'unknown-function'),
    nullif(trim(coalesce(p_lead_email, '')), ''),
    case when p_status in ('success', 'error') then p_status else 'error' end,
    nullif(trim(coalesce(p_error_message, '')), ''),
    coalesce(p_metadata, '{}'::jsonb)
  );
end;
$$;

grant execute on function public.log_edge_function_call(text, text, text, text, jsonb) to anon, authenticated, service_role;
