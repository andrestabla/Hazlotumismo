import { signOut } from "@/auth";

export function SignOutForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button
        type="submit"
        className="premium-button premium-button-secondary px-4 py-2.5"
      >
        Salir
      </button>
    </form>
  );
}
