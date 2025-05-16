set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, user_name, email)
  values (new.id, new.raw_user_meta_data->>'user_name', new.email);

  insert into public.user_stats (user_id, current_streak, max_streak, last_active_date)
  values (new.id, 0, 0, null);

  return new;
exception
  when others then
    raise log 'Error in handle_new_user: %', sqlerrm;
    return new;
end;
$function$
;


