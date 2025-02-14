"use client";

import { useQuery } from "@tanstack/react-query";
import { ProviderButton } from "./ProviderButton";

export const SignInProviders = () => {
  const { data: providers, isPending } = useQuery({
    queryFn: async () =>
      fetch(`/api/auth/providers`).then(async (res) => res.json()),
    queryKey: ["providers"],
  });
  console.log("🚀 ~ SignInProviders ~ providers:", providers);

  if (isPending) return <>Loading....</>;

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {providers.github ? <ProviderButton providerId="github" /> : null}
    </div>
  );
};
