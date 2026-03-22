alter table public.edge_function_logs enable row level security;

revoke all on public.edge_function_logs from anon, authenticated;
