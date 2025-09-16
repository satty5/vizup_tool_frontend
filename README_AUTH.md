# Supabase Auth Setup

1) Create `.env.local` in project root with:

```
REACT_APP_SUPABASE_URL=your-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_DEMO_MODE=false
```

2) Database: run this in Supabase SQL editor to create profiles table:

```
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger handle_profiles_updated
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- Allow logged-in users to upsert their own row
alter table public.profiles enable row level security;
create policy "Can view own profile" on public.profiles
  for select using ( auth.uid() = id );
create policy "Can upsert own profile" on public.profiles
  for insert with check ( auth.uid() = id );
create policy "Can update own profile" on public.profiles
  for update using ( auth.uid() = id );
```

3) Start the app. Sign up and sign in will use Supabase. The first login upserts a profile row.


