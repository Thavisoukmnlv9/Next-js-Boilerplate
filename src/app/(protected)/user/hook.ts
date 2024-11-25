import { apiClient } from "@app/lib/Axios";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

interface PaginationState {
  page: number;
  limit: number;
}

interface UserResponse {
  result: any[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    pageCount: number;
    totalCount: number;
  };
}

const useUsers = () => {

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 10, });
  const [meta, setMeta] = useState({isFirstPage: true, isLastPage: false, currentPage: 1, pageCount: 1, totalCount: 0, });
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<UserResponse>("/boilerplate/v1/users", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: debouncedSearch,
        },
      });

      setUsers(response.result || []);
      setMeta(response.meta || {});
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination, debouncedSearch]);
  const updatePagination = (newPagination: Partial<PaginationState>) => {
    setPagination((prev) => ({ ...prev, ...newPagination }));
  };
  const updateSearch = (newSearch: string) => {
    setSearch(newSearch);
    setPagination({ page: 1, limit: pagination.limit });
  };
  return {
    users,
    loading,
    error,
    pagination,
    setPagination: updatePagination,
    meta,
    setSearch: updateSearch,
    refetch: fetchUsers,
  };
};

export default useUsers;