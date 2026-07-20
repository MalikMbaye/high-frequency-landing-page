import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ShippingPolicy = () => {
  useEffect(() => {
    document.title = "Shipping & Return Policy | High Frequency Headphones";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section
        className="section section-light"
        data-theme="light"
        style={{ paddingTop: 120, paddingBottom: 80 }}
      >
        <div className="hfh-container policy-page" style={{ maxWidth: 820 }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              marginBottom: 24,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> Back home
          </a>

          <h1 className="section-header" style={{ marginBottom: 8 }}>
            Shipping & Return Policy
          </h1>
          <p className="section-sub" style={{ marginBottom: 40, fontStyle: "italic" }}>
            Last updated: May 2026
          </p>

          <h2>Shipping Policy</h2>

          <h3>Processing & Delivery Times</h3>
          <p>
            All orders are processed and shipped from our fulfillment center in the United States.
            Once your order ships, you will receive a confirmation email with a tracking number.
          </p>
          <div className="policy-table-wrap">
            <table className="policy-table">
              <thead>
                <tr>
                  <th>Order Type</th>
                  <th>Processing Time</th>
                  <th>Estimated Delivery</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>In-Stock Orders</td>
                  <td>1-3 business days</td>
                  <td>5-10 business days from order date</td>
                </tr>
                <tr>
                  <td>High-Demand Orders</td>
                  <td>1-3 business days</td>
                  <td>5-10 business days from order date</td>
                </tr>
                <tr>
                  <td>International Orders</td>
                  <td>3-5 business days processing</td>
                  <td>14-28 business days depending on destination</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Please note:</strong> High Frequency headphones are a precision-engineered product.
            Each unit is hand-assembled, individually tested, and quality-inspected before shipping.
            During periods of high demand, production timelines may extend beyond standard estimates.
            If your order is affected by an extended timeline, we will notify you by email within 48 hours
            of your purchase with an updated delivery estimate.
          </p>

          <h3>What Happens After You Order</h3>
          <ol>
            <li><strong>Order confirmed.</strong> You receive an order confirmation email immediately after purchase.</li>
            <li><strong>Production update.</strong> If your order is in a high-demand window, you will receive an email within 48 hours with your estimated ship date.</li>
            <li><strong>Shipped.</strong> When your order leaves our fulfillment center, you receive a shipping confirmation with tracking information.</li>
            <li><strong>Delivered.</strong> Your tracking number will show delivery status. Most domestic orders arrive within 5-7 business days of shipping.</li>
          </ol>

          <h3>Shipping Rates</h3>
          <div className="policy-table-wrap">
            <table className="policy-table">
              <thead>
                <tr><th>Destination</th><th>Rate</th></tr>
              </thead>
              <tbody>
                <tr><td>United States (standard)</td><td>Calculated at checkout</td></tr>
                <tr><td>International</td><td>Calculated at checkout</td></tr>
              </tbody>
            </table>
          </div>
          <p>Shipping costs are non-refundable in the event of a return.</p>

          <h3>Order Tracking</h3>
          <p>
            Every order receives a tracking number via email once shipped. If you have not received a
            tracking number within the estimated processing window, please contact us at{" "}
            <a href="mailto:support@highfrequencyhighway.com">support@highfrequencyhighway.com</a> and
            we will provide an update within 24 hours.
          </p>

          <h3>Delays and Communication</h3>
          <p>We ship as fast as we can. Sometimes demand exceeds supply. If that happens, here is what we commit to:</p>
          <ul>
            <li>You will be notified within 48 hours of purchase if your order is subject to an extended timeline.</li>
            <li>You will receive production updates by email at least once per week until your order ships.</li>
            <li>You can request a full refund at any point before your order ships. No questions asked.</li>
            <li>If your order has not shipped within 30 days of purchase and you have not received a shipping notification, you are entitled to a full refund upon request.</li>
          </ul>
          <p>
            We believe in transparency. If there is a delay, we will tell you why, give you an updated
            timeline, and give you the choice to wait or receive a refund.
          </p>

          <h2>Return & Refund Policy</h2>

          <h3>30-Day Money-Back Guarantee</h3>
          <p>
            We stand behind our product. If you are not satisfied with your High Frequency headphones
            for any reason, you may return them within 30 days of delivery for a full refund of the
            product purchase price.
          </p>
          <p>
            <strong>The 30-day window begins on the date your order is delivered</strong>, as confirmed
            by the shipping carrier's tracking information. Not the date you ordered. Not the date it
            shipped. The date it arrived at your door.
          </p>

          <h3>How Returns Work</h3>
          <ol>
            <li><strong>Initiate your return.</strong> Email <a href="mailto:support@highfrequencyhighway.com">support@highfrequencyhighway.com</a> with your order number and the reason for your return. We will respond within 24 hours with return instructions and a return shipping label.</li>
            <li><strong>Ship it back.</strong> Pack the headphones in the original packaging (or equivalent protective packaging) with all included accessories. Ship using the provided return label.</li>
            <li><strong>Refund processed.</strong> Once we receive and inspect your return, your refund will be issued within 5-10 business days to the original payment method.</li>
          </ol>

          <h3>Return Conditions</h3>
          <ul>
            <li>Returns are accepted within 30 days of the confirmed delivery date.</li>
            <li>The product must be returned with all included accessories (headphones, charging cable, carrying case, and any other items that came in the box).</li>
            <li>Products may be opened and used. We want you to try the headphones. That is the only way to know if they work for you. If you try them and they are not for you, send them back.</li>
            <li>Products must not be physically damaged through misuse (broken housing, severed cables, water damage beyond normal use). Normal wear from trying the product is accepted.</li>
            <li>Return shipping is provided at no cost to you for domestic orders. International return shipping is the responsibility of the customer.</li>
          </ul>

          <h3>What Is Refunded</h3>
          <ul>
            <li>Full product purchase price.</li>
            <li>Original shipping costs are not refunded.</li>
            <li>If you received a discount or promotional pricing, your refund reflects the amount you actually paid.</li>
          </ul>

          <h3>What Is NOT Eligible for Return</h3>
          <ul>
            <li>Orders where a return is initiated more than 30 days after the confirmed delivery date.</li>
            <li>Products that have been physically damaged through misuse, neglect, or modification.</li>
            <li>Products returned without contacting support first (we need your order number to process the return).</li>
          </ul>

          <h3>Refund Timeline</h3>
          <div className="policy-table-wrap">
            <table className="policy-table">
              <thead><tr><th>Step</th><th>Timeline</th></tr></thead>
              <tbody>
                <tr><td>Return initiated</td><td>We respond within 24 hours</td></tr>
                <tr><td>Return received at our facility</td><td>1-5 business days after you ship</td></tr>
                <tr><td>Inspection and processing</td><td>1-3 business days after receipt</td></tr>
                <tr><td>Refund issued to payment method</td><td>5-10 business days after processing</td></tr>
                <tr><td>Total from return initiation to refund</td><td>Approximately 10-20 business days</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Cancellations</h3>
          <p>
            If your order has not shipped, you may cancel for a full refund at any time. Email{" "}
            <a href="mailto:support@highfrequencyhighway.com">support@highfrequencyhighway.com</a> with
            your order number and write "Cancel" in the subject line. We will confirm cancellation and
            issue your refund within 48 hours.
          </p>
          <p>
            If your order has already shipped, you will need to follow the standard return process above
            once you receive the product.
          </p>

          <h2>Exchanges</h2>
          <p>
            We do not currently offer direct exchanges. If you would like a different product or variant,
            please return your original order using the process above and place a new order.
          </p>

          <h2>Damaged or Defective Products</h2>
          <p>
            If your headphones arrive damaged or defective, contact us immediately at{" "}
            <a href="mailto:support@highfrequencyhighway.com">support@highfrequencyhighway.com</a> with:
          </p>
          <ul>
            <li>Your order number</li>
            <li>Photos of the damage or defect</li>
            <li>A brief description of the issue</li>
          </ul>
          <p>
            We will send a replacement at no cost to you. If a replacement is not available, we will
            issue a full refund including original shipping costs. You do not need to return the damaged
            product unless we specifically request it.
          </p>
          <p>Defective product claims must be made within 60 days of delivery.</p>

          <h2>Chargebacks and Disputes</h2>
          <p>
            We want to resolve every issue directly. If you are unhappy with your order for any reason,
            please contact us at{" "}
            <a href="mailto:support@highfrequencyhighway.com">support@highfrequencyhighway.com</a>{" "}
            before filing a dispute with your bank or credit card company. We respond to every email
            within 24 hours and we offer full refunds within our 30-day window.
          </p>
          <p>
            Filing a chargeback without first contacting us delays resolution for everyone involved. In
            most cases, we can resolve your concern faster than the dispute process.
          </p>

          <h2>Contact</h2>
          <p>For any shipping, return, or order questions:</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@highfrequencyhighway.com">support@highfrequencyhighway.com</a>
            <br />
            <strong>Response time:</strong> Within 24 hours, Monday through Friday
            <br />
            <strong>Subject line:</strong> Include your order number for fastest response
          </p>

          <p style={{ fontStyle: "italic", marginTop: 40, opacity: 0.75 }}>
            High Frequency Highway reserves the right to update this policy at any time. Changes take
            effect immediately upon posting to our website. The policy in effect at the time of your
            purchase applies to your order.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
