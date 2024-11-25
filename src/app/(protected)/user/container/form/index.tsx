"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@ui/elements"

import { cn } from "@ui/lib/utils";
import { Button } from "@ui/containers";
import { useUserAuthForm } from "./hook";

export function UserEditForm({ id }: { id: number }) {
    const { form, onSubmit, isLoading } = useUserAuthForm({ id });
    console.log("form", form.watch());
    return (
        <div className={cn("grid gap-6")}>
            <Card className="w-full sm:w-1/2 ">
                <CardHeader>
                    <CardTitle className="text-2xl">ລົງທະບຽນ</CardTitle>
                    <CardDescription>
                        ກະລຸນາປ້ອນຂໍ້ມູນຂອງທະບຽນນີ້
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>ຊື່ຜູ້ໃຊ້ງານ</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Thavisouk Minalavong" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tel"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>ເບິໂທລະສັບ</FormLabel>
                                            <FormControl>
                                                <Input placeholder="59684710" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>ອີເມວ</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Thavisouk@l-itlaos.com"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    required={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="mt-2" loading={isLoading}>
                                    ເຂົ້າສູ່ລະບົບ
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}