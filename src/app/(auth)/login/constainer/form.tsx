"use client";
import { HTMLAttributes } from "react";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@ui/elements"

import { cn } from "@ui/lib/utils";
import { Button, PasswordInput } from "@ui/containers";

import { useUserAuthForm } from "./hook";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { form, onSubmit, isLoading } = useUserAuthForm();
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
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
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>ລະຫັດຜ່ານ</FormLabel>
                    <Link href="/forgot-password" className="text-sm font-medium text-muted-foreground hover:opacity-75" >
                      ລືມລະຫັດຜ່ານ?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput {...field} />
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
    </div>
  );
}