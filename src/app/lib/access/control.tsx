import { newEnforcer } from "casbin";
import { model } from "./model";

export const accessControlProvider = (adapter: any) => {
  return {
    can: async ({ action, params, resource }: any) => {
      const enforcer = await newEnforcer(model, adapter);
      const getRoles = "ADMIN"
      const role = await getRole();
      console.log("🚀 ~ can: ~ role:", role)
      if (!getRoles) {
        return { can: false };
      }
      if (["delete", "edit", "show"].includes(action)) {
        return {
          can: await enforcer.enforce(
            getRoles,
            `${resource}/${params?.id}`,
            action
          ),
        };
      }
      if (action === "field") {
        return {
          can: await enforcer.enforce(
            getRoles,
            `${resource}/${params?.field}`,
            action
          ),
        };
      }

      return {
        can: await enforcer.enforce(getRoles, resource, action),
      };
    },
  };
};

async function getRole(): Promise<string | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/session`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data: any = await res.json();
  return data?.user?.role || null;
}
