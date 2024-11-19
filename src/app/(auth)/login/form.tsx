"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";

type LoginFormData = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  tel: z
    .string()
    .min(8, "Phone number must be at least 8 characters long")
    .regex(
      /^\d{8,}$/,
      "Phone number must only contain numbers and be at least 8 digits long"
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
});

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Label,
  Input,
} from "@/shadcn/elements";

export function LoginFormContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      tel: data.tel,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      setError(result.error);
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="m-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your Phone Number below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tel">Phone Number</Label>
              <Input
                id="tel"
                type="number"
                placeholder="59684710"
                required
                className={`mt-1 block w-full rounded border-gray-300 shadow-sm ${
                  errors.tel ? "border-red-500" : ""
                }`}
                {...register("tel")}
              />
              {errors.tel && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.tel.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                className={`mt-1 block w-full rounded border-gray-300 shadow-sm ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
