import AuthGuard from "@app/lib/auth/guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard requireAuth={false}>{children}</AuthGuard>;
}