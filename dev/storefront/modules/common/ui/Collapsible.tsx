'use client';

import * as React from 'react';
import * as CollapsibleRadix from '@radix-ui/react-collapsible';
import classNames from '@/utils/classNames';
import { Icon } from '@/modules/common/ui/Icon';

export interface CollapsibleProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  title: string;
  triggerClassName?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  title,
  triggerClassName,
  className,
}) => {
  return (
    <CollapsibleRadix.Root
      className={classNames('collapsible-wrapper', className)}
    >
      <CollapsibleRadix.Trigger
        className={classNames('collapsible-trigger', triggerClassName)}
      >
        {title}
        <Icon name="chevron-down" className={classNames('collapsible-icon')} />
      </CollapsibleRadix.Trigger>
      <CollapsibleRadix.Content className="collapsible-content">
        <div className="collapsible-content-inner">{children}</div>
      </CollapsibleRadix.Content>
    </CollapsibleRadix.Root>
  );
};
