
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

  return (
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
                    placeholder={t('auth.passwordPlaceholder') || 'Create a password'}
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
                    disabled={loading}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-10 w-10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (t('auth.creatingAccount') || 'Creating account...') : (t('auth.signup.title') || 'Create Account')}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
