
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useLanguage } from "@/context/LanguageContext";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {isSignIn ? t("auth.signin.title") : t("auth.signup.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignIn
              ? t("auth.signin.description")
              : t("auth.signup.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSignIn ? <SignInForm /> : <SignUpForm />}
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-sm"
            >
              {isSignIn
                ? t("auth.switchToSignup")
                : t("auth.switchToSignin")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
