revoke delete on table "public"."user_profiles" from "anon";

revoke insert on table "public"."user_profiles" from "anon";

revoke references on table "public"."user_profiles" from "anon";

revoke select on table "public"."user_profiles" from "anon";

revoke trigger on table "public"."user_profiles" from "anon";

revoke truncate on table "public"."user_profiles" from "anon";

revoke update on table "public"."user_profiles" from "anon";

revoke delete on table "public"."user_profiles" from "authenticated";

revoke insert on table "public"."user_profiles" from "authenticated";

revoke references on table "public"."user_profiles" from "authenticated";

revoke select on table "public"."user_profiles" from "authenticated";

revoke trigger on table "public"."user_profiles" from "authenticated";

revoke truncate on table "public"."user_profiles" from "authenticated";

revoke update on table "public"."user_profiles" from "authenticated";

revoke delete on table "public"."user_profiles" from "service_role";

revoke insert on table "public"."user_profiles" from "service_role";

revoke references on table "public"."user_profiles" from "service_role";

revoke select on table "public"."user_profiles" from "service_role";

revoke trigger on table "public"."user_profiles" from "service_role";

revoke truncate on table "public"."user_profiles" from "service_role";

revoke update on table "public"."user_profiles" from "service_role";

revoke delete on table "public"."user_stats" from "anon";

revoke insert on table "public"."user_stats" from "anon";

revoke references on table "public"."user_stats" from "anon";

revoke select on table "public"."user_stats" from "anon";

revoke trigger on table "public"."user_stats" from "anon";

revoke truncate on table "public"."user_stats" from "anon";

revoke update on table "public"."user_stats" from "anon";

revoke delete on table "public"."user_stats" from "authenticated";

revoke insert on table "public"."user_stats" from "authenticated";

revoke references on table "public"."user_stats" from "authenticated";

revoke select on table "public"."user_stats" from "authenticated";

revoke trigger on table "public"."user_stats" from "authenticated";

revoke truncate on table "public"."user_stats" from "authenticated";

revoke update on table "public"."user_stats" from "authenticated";

revoke delete on table "public"."user_stats" from "service_role";

revoke insert on table "public"."user_stats" from "service_role";

revoke references on table "public"."user_stats" from "service_role";

revoke select on table "public"."user_stats" from "service_role";

revoke trigger on table "public"."user_stats" from "service_role";

revoke truncate on table "public"."user_stats" from "service_role";

revoke update on table "public"."user_stats" from "service_role";

alter table "public"."user_profiles" drop constraint "user_profiles_userId_users_id_fk";

alter table "public"."user_stats" drop constraint "user_stats_user_id_users_id_fk";

alter table "public"."user_profiles" drop constraint "user_profiles_pkey";

alter table "public"."user_stats" drop constraint "user_stats_pkey";

drop index if exists "public"."user_profiles_pkey";

drop index if exists "public"."user_stats_pkey";

drop table "public"."user_profiles";

drop table "public"."user_stats";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$begin
  insert into public.user_profiles (user_id)
  values (new.id);

  insert into public.user_stats (user_id, current_streak, max_streak, last_active_date)
  values (new.id, 0, 0, null);
  
  return new;
end;$function$
;


