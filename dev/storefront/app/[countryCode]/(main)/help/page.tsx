import * as React from 'react';
import { Heading } from '@/modules/common/ui/Heading';
import { Collapsible } from '@/modules/common/ui/Collapsible';

const HelpPage = () => {
  return (
    <main className="grid grid-cols-12 px-4 py-10 lg:px-24 lg:pb-50 lg:pt-26">
      <span className="col-span-1 hidden lg:block xl:col-span-2" />

      <div className="col-span-12 lg:col-span-8 xl:col-span-6">
        <Heading className="mb-26 !leading-[1.1]" size="xl4">
          Help
        </Heading>

        <p className="mb-8">
          Welcome to the Help page of Red Fashion Brand. We are here to assist
          you with any inquiries or issues you may encounter while using our
          webshop. Below are some common topics to help you find the information
          you need:
        </p>

        <Collapsible title="1. Placing an Order">
          <p className="mb-5">To place an order, follow these simple steps:</p>

          <ul className="ml-6 list-disc [&>li:last-child]:mb-0 [&>li]:mb-4">
            <li>
              <span className="font-semibold">Browsing Products:</span> Navigate
              through our webshop by using the menu categories or search bar to
              find the products you&apos;re interested in.
            </li>
            <li>
              <span className="font-semibold">Product Details:</span> Click on a
              product to view its detailed information, including descriptions,
              specifications, available sizes, colors, and images.
            </li>
            <li>
              <span className="font-semibold">Adding to Cart:</span> Select the
              desired options (e.g., size, color) and click the &quot;Add to
              Cart&quot; button to add the item to your shopping cart.
            </li>
            <li>
              <span className="font-semibold">Checkout Process:</span> Once you
              have finished shopping, proceed to the checkout page. Enter your
              shipping information, select a shipping method, and choose your
              preferred payment option.
            </li>
            <li>
              <span className="font-semibold">Review and Confirm:</span> Review
              your order summary, including the items, quantities, and total
              cost. Make any necessary changes and ensure that all the
              information is accurate before proceeding with the purchase.
            </li>
            <li>
              <span className="font-semibold">Order Confirmation:</span> After
              completing the checkout process, you will receive an order
              confirmation email with details of your purchase.
            </li>
          </ul>
        </Collapsible>

        <Collapsible title="2. Payments and Billing">
          <p className="mb-5">
            We offer various secure payment options to make your shopping
            experience convenient:
          </p>

          <ul className="ml-6 list-disc [&>li:last-child]:mb-0 [&>li]:mb-4">
            <li>
              <span className="font-semibold">Accepted Payment Methods:</span>{' '}
              We accept major credit cards (Visa, Mastercard, American Express),
              PayPal, and other secure online payment options. Select your
              preferred payment method during the checkout process.
            </li>
            <li>
              <span className="font-semibold">Transaction Security:</span> We
              prioritize the security of your personal and financial
              information. Our website utilizes industry-standard encryption and
              security measures to protect your data.
            </li>
            <li>
              <span className="font-semibold">Billing Inquiries:</span> If you
              have any questions or concerns regarding billing, charges, or
              payment-related issues, please reach out to our customer support
              team. Provide relevant details, such as your order number or
              transaction information, to help us assist you promptly.
            </li>
            <li>
              <span className="font-semibold">Refunds:</span> In case of
              eligible returns, we initiate the refund process. The refund will
              be issued to the original payment method used during the purchase.
              The time it takes for the refund to reflect in your account may
              vary depending on your payment provider.
            </li>
          </ul>
        </Collapsible>

        <Collapsible title="3. Shipping and Delivery">
          <p className="mb-5">
            We offer reliable shipping services to ensure your orders reach you
            in a timely manner:
          </p>

          <ul className="ml-6 list-disc [&>li:last-child]:mb-0 [&>li]:mb-4">
            <li>
              <span className="font-semibold">Shipping Options:</span> We
              provide different shipping methods, including standard and express
              delivery options. The available shipping methods will be displayed
              at the checkout, and you can select the one that best suits your
              needs.
            </li>
            <li>
              <span className="font-semibold">Delivery Timeframes:</span> The
              estimated delivery timeframes may vary depending on your location
              and the selected shipping method. Please note that unforeseen
              circumstances, such as extreme weather conditions or customs
              delays, may occasionally impact delivery times.
            </li>
            <li>
              <span className="font-semibold">Tracking Orders:</span> Once your
              order is dispatched, you will receive a confirmation email with a
              tracking number. Use the provided tracking number on our
              website&apos;s &quot;Track Order&quot; page to monitor the
              progress of your delivery.
            </li>
            <li>
              <span className="font-semibold">International Shipping:</span> We
              offer international shipping to select countries. During the
              checkout process, you can enter your shipping address to check if
              your country is eligible for delivery.
            </li>
            <li>
              <span className="font-semibold">Delivery Issues:</span> If you
              encounter any issues or delays with your delivery, please contact
              our customer support team. We will work closely with our shipping
              partners to resolve the matter and provide you with updated
              information.
            </li>
          </ul>
        </Collapsible>

        <Collapsible title="4. Returns and Refunds">
          <p className="mb-5">
            We want you to be completely satisfied with your purchase. If you
            need to initiate a return, please follow these steps:
          </p>

          <ul className="ml-6 list-disc [&>li:last-child]:mb-0 [&>li]:mb-4">
            <li>
              <span className="font-semibold">Eligibility:</span> Ensure that
              the item(s) you wish to return are unused, in the same condition
              as received, and accompanied by the original packaging.
            </li>
            <li>
              <span className="font-semibold">Return Period:</span> You have [X]
              days from the date of delivery to initiate a return request.
              Please contact our customer support team or access the
              &quot;Returns&quot; section in your account to initiate the
              process.
            </li>
            <li>
              <span className="font-semibold">Return Process:</span> Our
              customer support team will guide you through the return process,
              providing you with the necessary instructions and a return
              shipping label, if applicable. Please ensure that the item is
              securely packaged to prevent damage during transit.
            </li>
            <li>
              <span className="font-semibold">Refunds:</span> Once we receive
              and inspect the returned item(s), we will initiate the refund
              process. The refund will be issued to the original payment method
              used during the purchase. The time it takes for the refund to
              reflect in your account may vary depending on your payment
              provider.
            </li>
            <li>
              <span className="font-semibold">Non-Returnable Items:</span>{' '}
              Certain items, such as perishable goods, personalized products,
              and items marked as final sale, may not be eligible for return.
              Please refer to the product description or contact our customer
              support team for further clarification.
            </li>
          </ul>
        </Collapsible>

        <Collapsible title="5. Product Information">
          <p className="mb-5">
            To find detailed product information, follow these steps:
          </p>

          <ul className="ml-6 list-disc [&>li:last-child]:mb-0 [&>li]:mb-4">
            <li>
              <span className="font-semibold">Product Pages:</span> Click on a
              product to access its dedicated page, where you will find
              descriptions, specifications, available sizes, colors, care
              instructions, and additional details.
            </li>
            <li>
              <span className="font-semibold">Images:</span> Browse through the
              product images to get a closer look at the item from different
              angles. Note that colors may appear slightly different due to
              variations in lighting and screen settings.
            </li>
            <li>
              <span className="font-semibold">Size Guides:</span> For clothing
              or footwear, we provide size guides to help you choose the right
              fit. Refer to the specific measurements and instructions on the
              product page.
            </li>
            <li>
              <span className="font-semibold">Material Information:</span>{' '}
              Product pages may include information about the materials used,
              such as fabric composition or material origin. If you require
              further details, please contact our customer support team.
            </li>
          </ul>
        </Collapsible>

        <Collapsible title="6. Account and Profile">
          <p className="mb-5">
            To manage your account and profile, follow these steps:
          </p>

          <ul className="ml-6 list-disc [&>li:last-child]:mb-0 [&>li]:mb-4">
            <li>
              <span className="font-semibold">Creating an Account:</span> Click
              on the &quot;Sign Up&quot; or &quot;Create an Account&quot; button
              on our website. Fill in the required information, including your
              name, email address, and password. You can also sign up using your
              social media accounts.
            </li>
            <li>
              <span className="font-semibold">Logging In:</span> Once you have
              created an account, click on the &quot;Log In&quot; button and
              enter your email address and password. This will grant you access
              to your account dashboard.
            </li>
            <li>
              <span className="font-semibold">Account Dashboard:</span> Your
              account dashboard allows you to view and update your profile
              information, track orders, view your order history, and manage
              your preferences, such as email subscriptions.
            </li>
            <li>
              <span className="font-semibold">Password Reset:</span> If you
              forget your password, click on the &quot;Forgot Password&quot;
              link on the login page. Follow the instructions to reset your
              password and regain access to your account.
            </li>
          </ul>
        </Collapsible>

        <Collapsible
          title="7. Privacy and Security"
          className="mb-17.5 border-b-0"
        >
          <p className="mb-5">
            We take your privacy and security seriously. Here are some key
            points:
          </p>

          <ul className="ml-6 list-disc [&>li:last-child]:mb-0 [&>li]:mb-4">
            <li>
              <span className="font-semibold">Data Protection:</span> We adhere
              to applicable data protection laws and regulations. Your personal
              information is handled securely and used solely for order
              processing, communication, and improving our services.
            </li>
            <li>
              <span className="font-semibold">Secure Transactions:</span> Our
              website employs industry-standard encryption technology to ensure
              the secure transmission of your personal and payment information.
            </li>
            <li>
              <span className="font-semibold">Third-Party Services:</span> We
              may use third-party services for specific functionalities, such as
              payment processing or shipping. These services are carefully
              selected and trusted to maintain the highest level of security and
              privacy.
            </li>
          </ul>
        </Collapsible>

        <p>
          If you cannot find the information you need or require further
          assistance, please don&apos;t hesitate to contact our customer support
          team. We are dedicated to providing excellent customer service and
          will be glad to assist you.
        </p>
      </div>
    </main>
  );
};

export default HelpPage;
