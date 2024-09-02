import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { AuthFlow } from "../types";

interface Props {
  setAuthState: Dispatch<SetStateAction<AuthFlow>>;
}
export default function SignUpCard({ setAuthState }: Props) {
  const [registerInput, setRegisterInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChangeRegisterInput = (key: string, value: string) =>
    setRegisterInput((prev) => ({ ...prev, [key]: value }));

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Register to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={registerInput.email}
            onChange={(e) => handleChangeRegisterInput("email", e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={false}
            value={registerInput.password}
            onChange={(e) =>
              handleChangeRegisterInput("password", e.target.value)
            }
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={false}
            value={registerInput.confirmPassword}
            onChange={(e) =>
              handleChangeRegisterInput("confirmPassword", e.target.value)
            }
            placeholder="Confirm Password"
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
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-[50%] -translate-y-[50%] left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?
          <span
            className="ml-2 text-sky-700 hover:underline cursor-pointer"
            onClick={() => setAuthState("signIn")}
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
