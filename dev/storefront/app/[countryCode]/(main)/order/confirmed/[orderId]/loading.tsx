import { LoadingSpinner } from "@/modules/common/ui/LoadingSpinner";
import classNames from "classnames";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full text-ui-fg-base">
      <LoadingSpinner className={classNames(
              'ml-2',
             'fill-primary text-white',
            //   variant === 'secondary' && 'fill-white text-primary',
            //   variant === 'tertiary' && 'fill-gray-400 text-white',
           
             '!w-4'
            )} />
    </div>
  )
}
