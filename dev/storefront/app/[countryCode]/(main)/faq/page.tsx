import * as React from 'react';
import { Heading } from '@/modules/common/ui/Heading';
import { Collapsible } from '@/modules/common/ui/Collapsible';

const FAQPage= () => {
  return (
    <main className="grid grid-cols-12 px-4 py-10 lg:px-24 lg:pb-42 lg:pt-26">
      <span className="col-span-1 hidden lg:block xl:col-span-2" />

      <div className="col-span-12 lg:col-span-8 xl:col-span-6">
        <Heading className="mb-26 !leading-[1.1]" size="xl4">
          Frequently Asked Questions (FAQ)
        </Heading>

        <p className="mb-8">
          Welcome to the Frequently Asked Questions (FAQ) page of Red Fashion
          Brand. We have compiled a list of common questions and provided
          detailed answers to help you navigate through your shopping
          experience. If you have a question that is not addressed here, please
          feel free to reach out to our customer support team for further
          assistance.
        </p>

        <Collapsible title="1. How do I place an order?">
          <p className="ml-3.5 text-xs">
            To place an order, simply browse our products and click on the
            item(s) you wish to purchase. Select the desired options (e.g.,
            size, color), add the item(s) to your cart, and proceed to the
            checkout page. Follow the prompts to enter your shipping and payment
            information, review your order, and confirm the purchase.
          </p>
        </Collapsible>

        <Collapsible title="2. What payment methods do you accept?">
          <p className="ml-3.5 text-xs">
            We accept various payment methods, including major credit cards
            (Visa, Mastercard, American Express), PayPal, and other secure
            online payment options. Select your preferred payment method at the
            checkout.
          </p>
        </Collapsible>

        <Collapsible title="3. What are your shipping options and timeframes?">
          <p className="ml-3.5 text-xs">
            We offer different shipping methods, including standard and express
            delivery options. The estimated delivery timeframes may vary
            depending on your location and the selected shipping method. For
            detailed information, please visit our &quot;Delivery and
            Returns&quot; page.
          </p>
        </Collapsible>

        <Collapsible title="4. How can I track my order?">
          <p className="ml-3.5 text-xs">
            Once your order is dispatched, you will receive a confirmation email
            with a tracking number. You can easily track the progress of your
            delivery by entering the provided tracking number on our
            website&apos;s &quot;Track Order&quot; page.
          </p>
        </Collapsible>

        <Collapsible title="5. What is your return policy?">
          <p className="ml-3.5 text-xs">
            We want you to be completely satisfied with your purchase. If you
            need to return an item, please refer to our &quot;Returns and
            Refunds&quot; policy on our &quot;Delivery and Returns&quot; page
            for detailed instructions and eligibility criteria.
          </p>
        </Collapsible>

        <Collapsible title="6. Do you offer international shipping?">
          <p className="ml-3.5 text-xs">
            To manage your account and profile, follow these steps:Yes, we offer
            international shipping to select countries. During the checkout
            process, you can enter your shipping address to check if your
            country is eligible for delivery.
          </p>
        </Collapsible>

        <Collapsible
          title="7. How can I contact your customer support team?"
          className="border-b-0"
        >
          <p className="ml-3.5 text-xs">
            You can reach our friendly customer support team by [provide contact
            options, such as phone number, email address, or a contact form]. We
            are available [state working hours or response time] to assist you
            with any questions, concerns, or issues you may have.
          </p>
        </Collapsible>
      </div>
    </main>
  );
};


export default FAQPage;
