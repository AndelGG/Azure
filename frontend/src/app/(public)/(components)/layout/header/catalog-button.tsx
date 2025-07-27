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
      <NavigationMenuTrigger className="cursor-pointer">
        <Library size="20" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-(--background)">
        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild className="shadow-md">
              <Link
                href="/"
                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
              >
                <div className="mt-4 mb-2 text-lg font-medium">Каталог</div>
                <p className="text-muted-foreground text-sm leading-tight">
                  Каталог всех фильмов, сериалов и аниме
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <ListItem href="/" title="Жанры">
            Выбрать любой жанр и определиться с просмотром
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
