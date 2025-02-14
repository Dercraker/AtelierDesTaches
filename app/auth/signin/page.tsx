import { auth } from "@/lib/auth/helper";
import type { PageParams } from "@/types/next";
import { Card, CardContent, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { getError } from "../error/AuthErrorMapping";
import { SignInProviders } from "./_components/SignInProvider";

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
          <Typography>Sign in to your account</Typography>
          <SignInProviders />
        </CardContent>
      </Card>
    </div>
  );

  // return (
  //     <div className="flex flex-1 items-center justify-center">
  //       <Card className="w-full max-w-md lg:max-w-lg lg:p-6">
  //         <CardHeader className="flex flex-col items-center justify-center gap-2">
  //           <LogoSvg />
  //           <CardTitle>Sign in to your account</CardTitle>
  //         </CardHeader>
  //         <CardContent className="mt-8">
  //           <SignInProviders />
  //         </CardContent>
  //         {error ? (
  //           <Alert>
  //             <AlertTriangle size={16} />
  //             <AlertDescription>{error}</AlertDescription>
  //             <AlertTitle>{errorMessage}</AlertTitle>
  //           </Alert>
  //         ) : null}
  //       </Card>
  //   </div>
  // );
}
