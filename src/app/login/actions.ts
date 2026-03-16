"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

type LoginState = {
  error: string | null;
};

export async function authenticate(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = typeof formData.get("email") === "string" ? String(formData.get("email")) : "";
  const password =
    typeof formData.get("password") === "string" ? String(formData.get("password")) : "";
  const callbackUrl =
    typeof formData.get("callbackUrl") === "string" ? String(formData.get("callbackUrl")) : "";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/dashboard",
    });

    return { error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Credenciales invalidas. Revisa email y password." };
      }

      return { error: "No fue posible iniciar sesion." };
    }

    throw error;
  }
}
