import { newEnforcer } from "casbin";
import { model } from "./model";

export const accessControlProvider = (adapter: any) => {
  return {
    can: async ({ action, params, resource, role }: {
      action: string;
      params?: Record<string, any>;
      resource: string;
      role: string;
    }) => {
      try {
        const enforcer = await newEnforcer(model, adapter);
        
        if (!role) {
          return { can: false };
        }

        if (["delete", "edit", "show"].includes(action)) {
          return {
            can: await enforcer.enforce(
              role,
              `${resource}/${params?.id}`,
              action
            ),
          };
        }

        if (action === "field") {
          return {
            can: await enforcer.enforce(
              role,
              `${resource}/${params?.field}`,
              action
            ),
          };
        }

        return {
          can: await enforcer.enforce(role, resource, action),
        };
      } catch (error) {
        console.error("Access control error:", error);
        return { can: false };
      }
    },
  };
};