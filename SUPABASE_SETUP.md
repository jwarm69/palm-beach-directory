# Supabase Setup Instructions

This guide will help you set up Supabase as the backend for the Palm Beach Directory project.

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a free account or sign in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: palm-beach-directory
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your location
6. Click "Create new project"
7. Wait for the project to initialize (2-3 minutes)

## 2. Get API Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

## 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
   ```

## 4. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute the schema
5. Wait for completion (should see "Success" message)

## 5. Load Seed Data

1. In SQL Editor, click "New query"
2. Copy and paste the contents of `supabase-seed-data.sql`
3. Click "Run" to execute the seed data
4. You should see sample stores, offers, and events created

## 6. Configure Storage (Optional)

The schema creates storage buckets for images. To enable file uploads:

1. Go to **Storage** in Supabase dashboard
2. You should see buckets: `store-images`, `offer-images`, `event-images`, `area-images`
3. The buckets are configured for public read access
4. You can upload images directly or via the application

## 7. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Try creating an account (should work with real email)
4. Browse stores and offers (should load from database)

## 8. Authentication Setup (Optional Enhancements)

To enable social authentication:

1. Go to **Authentication** → **Providers**
2. Enable desired providers (Google, GitHub, etc.)
3. Configure OAuth apps and add credentials
4. Update your authentication components as needed

## Troubleshooting

### Common Issues:

**"Invalid API key" error:**
- Check that your environment variables are correct
- Ensure `.env.local` is in the project root
- Restart your development server after changing env vars

**"relation does not exist" error:**
- Make sure you ran the schema SQL successfully
- Check the SQL Editor for any error messages
- Verify all tables were created in the public schema

**"Row Level Security" errors:**
- RLS policies are configured in the schema
- Make sure you're authenticated when accessing user data
- Check the policies match your use case

**No data showing:**
- Ensure seed data was loaded successfully
- Check the tables in **Table Editor** to verify data exists
- Look for JavaScript console errors

### Useful SQL Queries:

Check if tables exist:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

Count records in each table:
```sql
SELECT 
  'areas' as table_name, COUNT(*) as count FROM areas
UNION ALL
SELECT 'stores', COUNT(*) FROM stores
UNION ALL  
SELECT 'offers', COUNT(*) FROM offers
UNION ALL
SELECT 'events', COUNT(*) FROM events;
```

## Production Deployment

When deploying to production:

1. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Consider upgrading to Supabase Pro for better performance
3. Set up database backups
4. Monitor usage and performance
5. Configure custom domain if needed

## Security Notes

- Never commit `.env.local` to version control
- Keep your service role key secret
- Review and customize RLS policies for your needs
- Enable 2FA on your Supabase account
- Regularly rotate API keys if needed