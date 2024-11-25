import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@ui/elements";
import { cn } from "@ui/lib/utils";
import { formSchema } from "./schema";
import { IUser, IUserData } from "../interface";
import { apiClient } from "@app/lib/Axios";
import next from "next";

const useCustomToast = () => {
    const { toast } = useToast();
    const showToast = (title: string, className?: string) => {
        toast({ title, className } as any);
    };
    return { showToast };
};

const baseUrl = "/boilerplate/v1/users/";

export const useUserAuthForm = ({ id }: { id: number }) => {
    const router = useRouter()
    const { user, loading } = useOneUser({ id });
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useCustomToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tel: "",
            fullName: "",
            email: null,
        }
    });
    useEffect(() => {
        if (user && !loading) {
            form.reset({
                fullName: user.fullName || "",
                tel: user.tel || "",
                email: user.email || null,
            }, {
                keepDefaultValues: true,
                keepErrors: false,
            });
        }
    }, [user, loading, form.reset]);
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const response = await apiClient.put<IUserData>(`${baseUrl}${id}`, data);
            console.log("response", response);
            showToast(
                "ການອັບເດດຂໍ້ມູນສຳເລັດ. 🫶 Fuck you man",
                cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
            );
            if(response.status === "success") {
                router.back()
            }
        } catch (error) {
             showToast(
                "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້",
                cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500"),
            );
        } finally {
            setIsLoading(false);
        }
    };
    return { form, onSubmit, isLoading, isDataLoading: loading };
};

export const useOneUser = ({ id }: { id: number }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        let isSubscribed = true;
        const fetchUser = async () => {
            try {
                const response = await apiClient.get<IUserData>(`${baseUrl}${id}`);
                if (isSubscribed) {
                    setUser(response.data);
                }
            } catch (err: any) {
                console.error(err);
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