import { newEnforcer, StringAdapter, newModel } from "casbin";
import { resources, ResourceConfig } from "./resources";
import { CustomUser } from "./interface";

export type Action = "list" | "create" | "edit" | "view" | "delete";

export class CasbinPolicyHelper {
  static instance: CasbinPolicyHelper;
  enforcer: any;

  private constructor() { }

  static async getInstance() {
    if (!this.instance) {
      const instance = new CasbinPolicyHelper();
      await instance.initEnforcer();
      this.instance = instance;
    }
    return this.instance;
  }

  async initEnforcer() {
    const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
    `);

    const adapter = new StringAdapter(`
p, user, dashboard, list
p, user, user, view
p, admin, dashboard, list
p, admin, order, list
p, admin, order, create
p, admin, order, edit
p, admin, order, delete
p, ADMIN, user, list
p, admin, user, create
p, admin, user, edit
p, admin, user, delete
p, admin, product, list
p, admin, product, create
p, admin, product, edit
p, admin, product, delete
p, admin, settings, list
    `);

    this.enforcer = await newEnforcer(model, adapter);
  }
  async can(user: CustomUser, resource: string, action: Action) {
    return this.enforcer.enforce(user.role, resource, action);
  }
  async getAccessibleResources(user: CustomUser): Promise<ResourceConfig[]> {
    const results = await Promise.all(
      resources.map(async (resource) => ({
        resource,
        accessible: await this.can(user, resource.name, "list"),
      }))
    );
    console.log("results resources", results);
    return results.filter(({ accessible }) => accessible).map(({ resource }) => resource);
  }
}
