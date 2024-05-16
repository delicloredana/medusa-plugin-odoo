import * as React from 'react';
import { Heading } from '@/modules/common/ui/Heading';

export interface PaymentMethod {
  last4: number;
  first_name: string;
  exp: string;
  brand: string;
}
const MyAccountPaymentMethodsPage= async() => {
  

    return (
      <div>
        <Heading className="mb-8 text-primary lg:mb-15" size="xl">
          Payment methods
        </Heading>

        <p className="text-md">Credit and debit cards</p>
      </div>
    );
  }



export default MyAccountPaymentMethodsPage;
