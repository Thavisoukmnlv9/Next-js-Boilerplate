import { User } from "@/app/lib/auth/interface";
import { apiClient } from "@/app/lib/Axios";
import { useState, useEffect } from "react";

const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiClient.get("/boilerplate/v1/users");
        console.log("data", data)
        setUsers(data as User[]);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return { users, loading, error };
};

export default useUsers;
