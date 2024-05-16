'use client';
import * as Dialog from '@/modules/common/ui/Dialog';
import { useNotification } from '@/lib/context/notification-context';
import { Icon } from '../ui/Icon';

export interface NotificationProps {
  className?: string;
  close?: string;
}

export const Notification = ({ className, close }: NotificationProps) => {
  const { getNotification, clear } = useNotification();

  return (
    <Dialog.Root
      open={getNotification().notification ? true : false}
      modal={false}
    >
      <Dialog.Content className={className}>
        <Dialog.Close asChild>
          {close && (
            <button
              className="absolute right-4 top-4 text-gray-900"
              onClick={() => clear()}
            >
              <Icon name="x" />
            </button>
          )}
        </Dialog.Close>
        <Dialog.Title className="mb-3 text-center">
          {getNotification().notification}
        </Dialog.Title>
        <div className="text-center text-xs text-gray-500">
          <p>{getNotification().notificationText}</p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
