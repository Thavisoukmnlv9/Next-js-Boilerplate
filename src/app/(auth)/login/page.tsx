// import { UserAuthForm } from './components/user-auth-form'
"use client";
import { BadgeCheck } from "lucide-react";
import { UserAuthForm } from "./constainer/form";
import { Card } from "@/shadcn/elements";
import Image from "next/image";
import { LoginFormContainer } from "./constainer/login";

export default function SignIn() {
  return (
    <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <LeftSection />
      <RightSection />
    </div>
  );
}
function LeftSection() {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="relative z-20 flex items-center text-lg font-medium">
        <BadgeCheck className="mr-2 h-6 w-6" />
        Boilerplate Shadcn admin
      </div>
      <Image
        src={"/pern.webp"}
        className="relative z-20 m-auto rounded-full"
        width={400}
        height={400}
        alt="logo"
      />
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <footer className="text-sm">Thavisouk Minalavong</footer>
        </blockquote>
      </div>
    </div>
  );
}
function RightSection() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
        <Card className="p-6">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight font-noto-lao">
              ເຂົ້າລະບົບ
            </h1>
            <p className="text-sm text-muted-foreground font-noto-lao">
              ປ້ອນອີເມວແລະລະຫັດຜ່ານຂອງທ່ານຂ້າງລຸ່ມນີ້ <br />
              ເພື່ອເຂົ້າສູ່ບັນຊີຂອງທ່ານ
            </p>
          </div>
          {/* <LoginFormContainer /> */}
          <UserAuthForm />
        </Card>
      </div>
    </div>
  );
}
