
alter table public.profiles
    enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.profiles
  for select
                 using (true);

create policy "Users can insert their own profile."
  on public.profiles
  for insert
  with check ((select auth.uid()) = id);

create policy "Users can update own profile."
  on public.profiles
  for update
                        using ((select auth.uid()) = id);

alter table public.user_stats
    enable row level security;

create policy "Users can view their own stats"
  on public.user_stats
  for select
                 using (auth.uid() = user_id);

create policy "Users can update their own stats"
  on public.user_stats
  for update
                 using (auth.uid() = user_id);

create policy "Service role can insert stats"
  on public.user_stats
  for insert
  to authenticated
  with check (true);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
insert into public.user (user_id, user_name, email)
values (new.id, new.raw_user_meta_data->>'user_name', new.email);

insert into public.user_stats (user_id, current_streak, max_streak, last_active_date)
values (new.id, 0, 0, null);

return new;
exception
  when others then
    raise log 'Error in handle_new_user: %', sqlerrm;
return new;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
