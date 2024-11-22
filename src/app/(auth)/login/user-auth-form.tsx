"use client"
import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/shadcn'

import { Button } from '../../../shadcn/custom/button'
import { cn } from '../../../shadcn/lib/utils'
import Link from 'next/link'
import { PasswordInput } from '../../../shadcn/custom/password-input'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> { }

const formSchema = z.object({
  tel: z
    .string()
    .min(1, { message: 'ກະລຸນາໃສ່ເບີໂທຂອງທ່ານ' }).
    regex(/^\d{8,}$/, { message: 'ເບີໂທທີ່ປ້ອນບໍ່ຖືກຕ້ອງ' }),
  password: z
    .string()
    .min(1, {
      message: 'ກະລຸນາໃສ່ລະຫັດຜ່ານຂອງທ່ານ',
    })
    .min(8, {
      message: 'ລະຫັດຜ່ານຕ້ອງຍາວຢ່າງນ້ອຍ 8 ຕົວອັກສອນ',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tel: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
      <div className={cn('grid gap-6', className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='tel'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>ເບິໂທລະສັບ</FormLabel>
                    <FormControl>
                      <Input placeholder='59684710' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <div className='flex items-center justify-between'>
                      <FormLabel>ລະຫັດຜ່ານ</FormLabel>
                      <Link
                        href='/forgot-password'
                        className='text-sm font-medium text-muted-foreground hover:opacity-75'
                      >
                        ລືມລະຫັດຜ່ານ?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='mt-2' loading={isLoading}>
              ເຂົ້າສູ່ລະບົບ
              </Button>
            </div>
          </form>
        </Form>
      </div>
  )
}
