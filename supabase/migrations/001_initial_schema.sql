-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  package_name TEXT NOT NULL,
  package_price TEXT NOT NULL,
  template_name TEXT,
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invitations table
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id),
  slug TEXT UNIQUE NOT NULL,
  template TEXT NOT NULL,
  couple_data JSONB NOT NULL,
  event_data JSONB NOT NULL,
  story_data JSONB,
  program_data JSONB,
  venue_data JSONB,
  dress_code_data JSONB,
  faq_data JSONB,
  settings JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RSVPs table
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id),
  invitation_id TEXT,
  guest_name TEXT NOT NULL,
  guest_phone TEXT,
  attending BOOLEAN,
  companions_count INTEGER DEFAULT 0,
  companions TEXT[],
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storage buckets for images
-- Note: Create buckets in Supabase dashboard: 'templates', 'uploads'

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON public.orders FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view RSVPs by invitation_id" ON public.rsvps FOR SELECT USING (invitation_id IS NOT NULL);
CREATE POLICY "Anyone can create RSVPs" ON public.rsvps FOR INSERT WITH CHECK (invitation_id IS NOT NULL);
CREATE POLICY "Users can view RSVPs for their orders" ON public.rsvps FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = rsvps.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can update RSVPs for their orders" ON public.rsvps FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = rsvps.order_id AND orders.user_id = auth.uid())
);

CREATE POLICY "Anyone can view active invitations by slug" ON public.invitations FOR SELECT USING (is_active = true);
CREATE POLICY "Users can view own invitations" ON public.invitations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = invitations.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can create own invitations" ON public.invitations FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = invitations.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can update own invitations" ON public.invitations FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = invitations.order_id AND orders.user_id = auth.uid())
);

-- Function to handle new user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER rsvps_updated_at
  BEFORE UPDATE ON public.rsvps
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER invitations_updated_at
  BEFORE UPDATE ON public.invitations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
