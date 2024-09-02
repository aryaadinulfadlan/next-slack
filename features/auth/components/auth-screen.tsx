"use client";

import { useState } from "react";
import { AuthFlow } from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

export default function AuthScreen() {
  const [authState, setAuthState] = useState<AuthFlow>("signIn");
  return (
    <div className="h-full flex items-center justify-center bg-[#5c3b58]">
      <div className="md:h-auto md:w-[420px]">
        {authState === "signIn" ? (
          <SignInCard setAuthState={setAuthState} />
        ) : (
          <SignUpCard setAuthState={setAuthState} />
        )}
      </div>
    </div>
  );
}
