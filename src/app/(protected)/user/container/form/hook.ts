import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { apiClient } from "@app/lib/Axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@ui/lib/utils";
import { useToast as useUIToast } from "@ui/elements";

import { FormValues, IUser, IUserData } from "../interface";
import { formSchema } from "./schema";

const BASE_URL = "/boilerplate/v1/users/";

export const useUserAuthForm = ({ id }: { id: number }) => {
    const router = useRouter();
    const { user, loading } = useOneUser({ id });
    const [isLoading, setIsLoading] = useState(false);
    const { showSuccessToast, showErrorToast } = useCustomToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { tel: "", fullName: "", email: null, }
    });

    useFormReset({ user, loading, formReset: form.reset, });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const response = await userApi.updateUser(id, data);
            showSuccessToast("ການອັບເດດຂໍ້ມູນສຳເລັດ. 🫶");
            if (response.status === "success") {
                router.back();
            }
        } catch (error) {
            showErrorToast("ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້");
        } finally {
            setIsLoading(false);
        }
    };
    return { form, onSubmit, isLoading, isDataLoading: loading };
};

const userApi = {
    getUser: async (id: number) => {
        const response = await apiClient.get<IUserData>(`${BASE_URL}${id}`);
        return response;
    },
    updateUser: async (id: number, data: any) => {
        const response = await apiClient.put<IUserData>(`${BASE_URL}${id}`, data);
        return response;
    }
};
const useCustomToast = () => {
    const { toast } = useUIToast();

    const showSuccessToast = (message: string) => {
        toast({
            id: Date.now().toString(),
            title: message,
            variant: "default",
            className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
            duration: 3000,
        });
    };

    const showErrorToast = (message: string) => {
        toast({
            id: Date.now().toString(),
            title: message,
            variant: "destructive",
            className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500"),
            duration: 3000,
        });
    };

    return { showSuccessToast, showErrorToast };
};

const useOneUser = ({ id }: { id: number }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        let isSubscribed = true;
        const fetchUser = async () => {
            try {
                const response = await userApi.getUser(id);
                if (isSubscribed) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        };
        setLoading(true);
        fetchUser();
        return () => {
            isSubscribed = false;
        };
    }, [id]);

    return { user, loading };
};

const useFormReset = ({ user, loading, formReset }: any) => {
    useEffect(() => {
        const shouldResetForm = user && !loading;
        if (!shouldResetForm) {
            return;
        }
        const formValues: FormValues = {
            fullName: user.fullName ?? "",
            tel: user.tel ?? "",
            email: user.email ?? null,
        };
        const resetOptions = {
            keepDefaultValues: true,
            keepErrors: false,
        };
        formReset(formValues, resetOptions);
    }, [user, loading, formReset]);
};