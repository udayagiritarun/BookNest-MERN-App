import { AuthForm, AuthFormData } from "@/components/Auth/AuthForm";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();

  const handleLogin = async (data: AuthFormData) => {
    try {
      // Here you would integrate with Supabase auth
      console.log('Login attempt:', data);
      toast({
        title: "Login Successful",
        description: "Welcome back to BookNest!",
      });
      // Redirect to home or dashboard
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;