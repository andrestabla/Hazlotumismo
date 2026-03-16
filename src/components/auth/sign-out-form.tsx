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
        className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)] hover:bg-white"
      >
        Salir
      </button>
    </form>
  );
}
