'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import classNames from '@/utils/classNames';

export const Root = DialogPrimitive.Root;
export const Trigger = DialogPrimitive.Trigger;
export const Portal = DialogPrimitive.Portal;
export const Overlay = React.forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogOverlayProps
>(({ className, ...rest }, ref) => (
  <DialogPrimitive.Overlay
    {...rest}
    className={classNames(
      'fixed left-0 top-0 z-dialog-overlay h-full w-full bg-black-opacity',
      className
    )}
    ref={ref}
  />
));
Overlay.displayName = 'Dialog.Overlay';

export interface ContentProps extends DialogPrimitive.DialogContentProps {
  containerSize?: 'md' | 'lg';
}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ containerSize = 'md', children, className, ...rest }, ref) => (
    <DialogPrimitive.Content
      {...rest}
      className={classNames(
        'fixed left-1/2  top-1/2 z-dialog-content mx-auto max-h-[90vh] w-full max-w-154 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-sm border border-primary bg-white p-6 shadow-xl data-[state=closed]:animate-contentHide data-[state=open]:animate-contentShow',
        containerSize === 'lg' && 'max-w-181',
        className
      )}
      ref={ref}
    >
      {children}
    </DialogPrimitive.Content>
  )
);
Content.displayName = 'Dialog.Content';

export const Title = React.forwardRef<
  HTMLHeadingElement,
  DialogPrimitive.DialogTitleProps
>(({ children, className, ...rest }, ref) => (
  <DialogPrimitive.Title
    {...rest}
    className={classNames(
      'mb-10 text-md font-black italic text-primary',
      className
    )}
    ref={ref}
  >
    {children}
  </DialogPrimitive.Title>
));
Title.displayName = 'Dialog.Title';

export const Description = DialogPrimitive.Description;

export const Close = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitive.DialogCloseProps
>(({ children, ...rest }, ref) => (
  <DialogPrimitive.Close {...rest} ref={ref}>
    {children}
  </DialogPrimitive.Close>
));
Close.displayName = 'Dialog.Close';
