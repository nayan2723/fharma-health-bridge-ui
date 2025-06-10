
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/context/LanguageContext";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SignInFormValues>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const onSubmit = async (data: SignInFormValues) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error(t('auth.errors.invalidCredentials') || 'Invalid email or password');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error(t('auth.errors.emailNotConfirmed') || 'Please confirm your email address');
        } else {
          toast.error(error.message);
        }
        return;
      }

      toast.success(t('auth.signin.success') || 'Successfully signed in!');
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(t('auth.errors.generic') || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    className="pl-10"
                    type="email"
                    disabled={loading}
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
                    placeholder={t('auth.passwordPlaceholder') || 'Enter your password'}
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    disabled={loading}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-10 w-10"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (t('auth.signingIn') || 'Signing in...') : (t('auth.signin.title') || 'Sign In')}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
