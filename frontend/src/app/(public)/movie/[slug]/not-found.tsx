import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-5xl font-bold">Произошла ошибка</h1>
      <Button asChild className="cursor-pointer py-5" variant="secondary">
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
}
