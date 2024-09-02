import { Dispatch, SetStateAction, useState } from "react";
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

interface Props {
  setAuthState: Dispatch<SetStateAction<AuthFlow>>;
}

export default function SignInCard({ setAuthState }: Props) {
  // const { signIn } = useAuthActions();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const handleChangeLoginInput = (key: string, value: string) =>
    setLoginInput((prev) => ({ ...prev, [key]: value }));
  const handleProviderSignIn = (value: "github" | "google") => {
    //   signIn(value);
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={loginInput.email}
            onChange={(e) => handleChangeLoginInput("email", e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={false}
            value={loginInput.password}
            onChange={(e) => handleChangeLoginInput("password", e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-[50%] -translate-y-[50%] left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={false}
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