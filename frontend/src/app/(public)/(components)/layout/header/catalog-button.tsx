'use client';

import { Library } from 'lucide-react';
import Link from 'next/link';
import {
  ListItem,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui';

export function CatalogButton() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Library size="icon" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-(--background)">
        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild className="shadow-md">
              <Link
                href="/"
                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
              >
                <div className="mt-4 mb-2 text-lg font-medium">Azure</div>
                <p className="text-muted-foreground text-sm leading-tight">
                  Cовременный сервис для просмотра фильмов и сериалов в высоком
                  качестве и без рекламы
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <ListItem href="/" title="Каталог">
            Каталог всех фильмов и сериалов
          </ListItem>
          <ListItem href="/" title="Жанры">
            Выбрать любой жанр и определиться с фильмом либо сериалом
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
