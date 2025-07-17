'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ROUTES } from '@/app/(constants)';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useLogin } from '@/utils/api/hooks';

const formSchema = z.object({
  email: z.string().email('Неверный формат почты'),
  password: z
    .string()
    .min(6, 'Пароль слишком короткий')
    .max(24, 'Пароль слишком длинный'),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    mutate({ params: values });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-sm flex-col items-center gap-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-y-2">
          <Image
            alt="Логотип Azure"
            className="mb-2"
            height={56}
            src="/logo.png"
            width={56}
          />
          <h1 className="text-4xl font-semibold">Добро пожаловать</h1>
          <p className="text-muted-foreground text-sm">
            Войдите в свой аккаунт для продолжения
          </p>
        </div>
        <div className="border-muted bg-background flex w-full flex-col gap-8 rounded-md border px-6 py-12 shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input
                        required
                        className="bg-background"
                        type="email"
                        placeholder="azure@mc.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="email"
                control={form.control}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        required
                        className="bg-background"
                        type="password"
                        placeholder="Введите пароль"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="password"
                control={form.control}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button className="mt-2 w-full cursor-pointer" type="submit">
                {isPending ? 'Загрузка...' : 'Войти'}
              </Button>
              <Button className="w-full cursor-pointer" variant="outline">
                Продолжить с помощью Google
              </Button>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground flex justify-center gap-1 text-sm">
          <p>Нету аккаунта?</p>
          <Link
            href={ROUTES.REGISTER}
            className="text-primary font-medium hover:underline"
          >
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </Form>
  );
}
