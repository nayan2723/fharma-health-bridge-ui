import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/context/LanguageContext";

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const form = useForm<SignUpFormValues>();
  const { t } = useLanguage();

  const onSubmit = async (data: SignUpFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error(t('auth.errors.passwordMismatch') || 'Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: data.fullName,
          }
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error(t('auth.errors.userExists') || 'An account with this email already exists');
        } else if (error.message.includes('Password should be at least')) {
          toast.error(t('auth.errors.passwordWeak') || 'Password is too weak');
        } else {
          toast.error(error.message);
        }
        return;
      }

      toast.success(
        t('auth.signup.success') || 
        'Account created successfully! Please check your email to verify your account.'
      );
      form.reset();
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error(t('auth.errors.generic') || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast.error(error.message);
        console.error('Google sign up error:', error);
      }
    } catch (error) {
      console.error('Google sign up error:', error);
      toast.error('An error occurred during Google sign up');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignUp}
        disabled={googleLoading || loading}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {googleLoading ? 'Signing up with Google...' : 'Continue with Google'}
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            rules={{ 
              required: t('auth.validation.nameRequired') || 'Full name is required',
              minLength: {
                value: 2,
                message: t('auth.validation.nameMinLength') || 'Name must be at least 2 characters'
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.fullName') || 'Full Name'}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('auth.fullNamePlaceholder') || 'Enter your full name'}
                      className="pl-10"
                      disabled={loading || googleLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            rules={{ 
              required: t('auth.validation.emailRequired') || 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('auth.validation.emailInvalid') || 'Invalid email address'
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.email') || 'Email'}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('auth.emailPlaceholder') || 'Enter your email'}
                      type="email"
                      className="pl-10"
                      disabled={loading || googleLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{ 
              required: t('auth.validation.passwordRequired') || 'Password is required',
              minLength: {
                value: 6,
                message: t('auth.validation.passwordMinLength') || 'Password must be at least 6 characters'
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.password') || 'Password'}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('auth.passwordPlaceholder') || 'Create a password'}
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      disabled={loading || googleLoading}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading || googleLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            rules={{ 
              required: t('auth.validation.confirmPasswordRequired') || 'Please confirm your password',
              validate: (value) => {
                const password = form.getValues('password');
                return value === password || (t('auth.validation.passwordMismatch') || 'Passwords do not match');
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.confirmPassword') || 'Confirm Password'}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('auth.confirmPasswordPlaceholder') || 'Confirm your password'}
                      type={showConfirmPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      disabled={loading || googleLoading}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading || googleLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading || googleLoading}>
            {loading ? (t('auth.creatingAccount') || 'Creating account...') : (t('auth.signup.title') || 'Create Account')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
