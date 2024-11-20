import { NextApiRequest, NextApiResponse } from "next";
import { CasbinPolicyHelper } from "@/app/lib/auth/casbinPolicyHelper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user } = req.body;
  if (!user) {
    return res.status(400).json({ error: "Missing user information" });
  }

  try {
    const policyHelper = await CasbinPolicyHelper.getInstance();
    const resources = await policyHelper.getAccessibleResources(user);
    console.log("resources", resources)
    return res.status(200).json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
