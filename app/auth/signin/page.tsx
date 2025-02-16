import { auth } from "@/lib/auth/helper";
import type { PageParams } from "@/types/next";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Alert,
  AlertTitle,
} from "@mui/material";
import { redirect } from "next/navigation";
import { getError } from "../error/AuthErrorMapping";
import { SignInProviders } from "./_components/SignInProvider";
import Image from "next/image";

export default async function AuthSignInPage(params: PageParams) {
  const searchParams = await params.searchParams;
  const { errorMessage, error } = getError(searchParams.error);

  const user = await auth();

  if (user) {
    redirect("/account");
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card>
        <CardContent>
          <Typography style={{ marginBottom: "4px" }}>
            Sign in to your account
          </Typography>
          <SignInProviders />
        </CardContent>
      </Card>
    </div>
  );

  /*  return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md lg:max-w-lg lg:p-6">
          <CardHeader className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/logo_atelier_des_taches_orange.svg"
              alt="logo atelier des tâches"
                        width={50}
                        height={40}
                      />
          </CardHeader>
          <CardContent className="mt-'">
          <Typography style={{marginBottom: '4px'}}>Connectez-vous à votre compte</Typography>
            <SignInProviders />
          </CardContent>
          {error ? (
            <Alert severity="warning">
              <AlertTitle>{errorMessage}</AlertTitle>
              {error}
            </Alert>
          ) : null}
        </Card>
    </div>
  ); */
}
