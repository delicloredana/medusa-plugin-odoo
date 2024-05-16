'use client';
import { Icon } from '@/modules/common/ui/Icon';
import { QuantityInput } from '@/modules/common/ui/QuantityInput';
import { LineItem } from '@medusajs/medusa';
import { deleteLineItem, updateLineItem } from '../../actions';

const ChartItem = ({ item }: { item: LineItem }) => {
  return (
    <ul className="relative ml-4 inline-flex h-full w-full flex-col">
      <li className="text-xs font-black italic lg:text-md">{item.title}</li>
      <li className="text-xs2 text-gray-400 lg:text-sm">{item.description}</li>
      <li className="right-0 top-0 sm:absolute">
        <ul className="relative mt-1 flex items-center gap-2 sm:mt-0 sm:block sm:self-start">
          <li className="text-xs font-medium lg:text-md">
            {item.total ? (item.total / 100).toFixed(2) : 0}
          </li>
        </ul>
      </li>
      <li className="mt-10 flex items-center justify-between gap-2 gap-y-4 lg:gap-x-8">
        <QuantityInput
          defaultValue={item.quantity}
          maxValue={item.variant.inventory_quantity}
          onChange={async (value) => {
            await updateLineItem({ lineId: item.id, quantity: value });
          }}
        />

        <button onClick={async () => await deleteLineItem(item.id)}>
          <Icon name="trash" className="transition-all hover:text-primary" />
        </button>
      </li>
    </ul>
  );
};
export default ChartItem;
