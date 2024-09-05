import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";

type RequestType = { name: string };
type ResponseType = Id<"workspaces"> | null;
type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateWorkspace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending"
  >("settled");
  const isPending = status === "pending";
  const isSuccess = status === "success";
  const isSettled = status === "settled";
  const isError = status === "error";

  const mutation = useMutation(api.workspaces.create);
  const mutate = async (values: RequestType, options?: Options) => {
    try {
      setData(null);
      setError(null);
      setStatus("pending");
      const response = await mutation(values);
      options?.onSuccess?.(response);
      return response;
    } catch (err) {
      options?.onError?.(err as Error);
      if (options?.throwError) {
        throw err;
      }
    } finally {
      setStatus("settled");
      options?.onSettled?.();
    }
  };
  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
