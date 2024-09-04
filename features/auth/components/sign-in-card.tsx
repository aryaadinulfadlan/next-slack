import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { AuthFlow } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface Props {
  setAuthState: Dispatch<SetStateAction<AuthFlow>>;
}

// 430791876198-5eltt5nuh795983mddt294ckv8e0skqa.apps.googleusercontent.com
// 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
export default function SignInCard({ setAuthState }: Props) {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const { signIn } = useAuthActions();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleChangeLoginInput = (key: string, value: string) =>
    setLoginInput((prev) => ({ ...prev, [key]: value }));
  const handleProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };
  const onCredentialSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password", {
      email: loginInput.email,
      password: loginInput.password,
      flow: "signIn",
    })
      .catch(() => setError("Invalid email or password"))
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialSignIn} className="space-y-2.5">
          <Input
            disabled={pending}
            value={loginInput.email}
            onChange={(e) => handleChangeLoginInput("email", e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={loginInput.password}
            onChange={(e) => handleChangeLoginInput("password", e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => handleProviderSignIn("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-[50%] -translate-y-[50%] left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignIn("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-[50%] -translate-y-[50%] left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don't have an account?
          <span
            className="ml-2 text-sky-700 hover:underline cursor-pointer"
            onClick={() => setAuthState("signUp")}
          >
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
