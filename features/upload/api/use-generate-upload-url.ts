import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";

type ResponseType = string | null;
type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useGenerateUploadUrl = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending"
  >("settled");
  const isPending = status === "pending";
  const isSuccess = status === "success";
  const isSettled = status === "settled";
  const isError = status === "error";

  const mutation = useMutation(api.upload.generateUploadUrl);
  const mutate = async (_values: {}, options?: Options) => {
    try {
      setData(null);
      setError(null);
      setStatus("pending");
      const response = await mutation();
      options?.onSuccess?.(response);
      return response;
    } catch (err) {
      setStatus("error");
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