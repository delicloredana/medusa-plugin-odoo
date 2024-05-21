import { LoadingSpinner } from '@/modules/common/ui/LoadingSpinner';
import classNames from 'classnames';

export default function Loading() {
  return (
    <div className="text-ui-fg-base flex h-full w-full items-center justify-center">
      <LoadingSpinner
        className={classNames('ml-2', 'fill-primary text-white', '!w-4')}
      />
    </div>
  );
}
