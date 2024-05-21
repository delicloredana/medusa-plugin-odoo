import { Cart } from '@medusajs/medusa';

export function getCheckoutStep(
  cart: Omit<Cart, 'beforeInsert' | 'beforeUpdate' | 'afterUpdateOrLoad'>
) {
  if (!cart.email) {
    return 'email';
  } else if (!cart?.shipping_address?.address_1) {
    return 'address';
  } else if (cart?.shipping_methods.length === 0) {
    return 'delivery';
  } else {
    return 'payment';
  }
}
