'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Image from 'next/image';
import { useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Dialog, DialogContent, DialogTitle } from '../ui';

interface FrameProps {
  screenshots: string[];
}

export function Frame({ screenshots }: FrameProps) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  return (
    <>
      <p className="text-xl font-semibold">Кадры</p>
      <ScrollContainer
        className="cursor-grab rounded-md border-2 active:cursor-grabbing"
        vertical={false}
        horizontal={true}
        nativeMobileScroll={true}
      >
        <div className="flex flex-nowrap gap-10 p-3">
          {screenshots.length &&
            screenshots.map((screnshot, index) => (
              <Image
                key={index}
                alt={`Кадр ${index}`}
                className="size-full cursor-pointer select-none"
                height={350}
                src={screnshot || ''}
                width={350}
                onClick={() => {
                  setSelectedScreenshot(screnshot);
                  setOpen(true);
                }}
                priority
              />
            ))}
        </div>
      </ScrollContainer>
      <Dialog onOpenChange={setOpen} open={open}>
        <VisuallyHidden>
          <DialogTitle>Просмотр кадра {selectedScreenshot}</DialogTitle>
        </VisuallyHidden>
        <DialogContent
          showCloseButton={false}
          className="flex items-center justify-center border-none bg-transparent p-0 shadow-none outline-none"
        >
          {selectedScreenshot && (
            <Image
              alt={`Просмотр кадра ${selectedScreenshot}`}
              className="w-auto rounded-lg object-contain"
              height={900}
              src={selectedScreenshot}
              width={900}
              priority
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
