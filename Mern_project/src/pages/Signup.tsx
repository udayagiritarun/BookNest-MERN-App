import { AuthForm, AuthFormData } from "@/components/Auth/AuthForm";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const { toast } = useToast();

  const handleSignup = async (data: AuthFormData) => {
    try {
      console.log('Signup attempt:', data);
      toast({
        title: "Account Created",
        description: "Welcome to BookNest! Please check your email to verify your account.",
      });
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
};

export default Signup;