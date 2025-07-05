import { User } from 'lucide-react';
import { Button } from '@/components/ui';

export function UserButton() {
  return (
    <Button size="icon" variant="ghost">
      <User className="size-4" />
    </Button>
  );
}
