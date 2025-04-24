
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {isSignIn ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignIn
              ? "Enter your credentials to sign in"
              : "Enter your information to create an account"}
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
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
