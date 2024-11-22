import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useToast, ToastProps } from "@/shadcn";
import { cn } from "../../../../shadcn/lib/utils";
import { formSchema } from "./schema";

const authenticateUser = async (tel: string, password: string) => {
    return signIn("credentials", {
        tel,
        password,
        redirect: false,
    });
};

const useCustomToast = () => {
    const { toast } = useToast();
    const showToast = (title: string, className?: string) => {
        toast({ title, className } as any);
    };
    return { showToast };
};

export const useUserAuthForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useCustomToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tel: "59684711",
            password: "Welcome@12",
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            await authenticateUser(data.tel, data.password);
            showToast(
                "Authentication successful.",
                cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
            );
        } catch (error) {
            showToast("Authentication failed.");
        } finally {
            setIsLoading(false);
        }
    };
    return { form, onSubmit, isLoading };
};
