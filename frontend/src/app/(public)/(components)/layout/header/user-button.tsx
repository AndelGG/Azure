'use client';

import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export function UserButton() {
  const router = useRouter();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => router.push('/auth/login')}
    >
      <User className="size-4" />
    </Button>
  );
}
