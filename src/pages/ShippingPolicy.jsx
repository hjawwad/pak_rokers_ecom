import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Shipping Policy</h1>
        <p className="text-gray-600">Everything you need to know about how we deliver your orders.</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Processing Time</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-2 text-gray-700 text-sm leading-relaxed">
            <p>All orders are processed within <strong>1–3 business days</strong> after payment confirmation. Orders placed on weekends or holidays will be processed the next business day.</p>
            <p>You will receive a confirmation email with tracking details once your order has shipped.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Shipping Rates & Delivery Times</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Shipping Method</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Estimated Delivery</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-3 text-gray-700">Standard Shipping</td>
                  <td className="px-6 py-3 text-gray-700">7–14 business days</td>
                  <td className="px-6 py-3 text-gray-700">Calculated at checkout</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-700">Express Shipping</td>
                  <td className="px-6 py-3 text-gray-700">3–7 business days</td>
                  <td className="px-6 py-3 text-gray-700">Calculated at checkout</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-700">Free Shipping</td>
                  <td className="px-6 py-3 text-gray-700">7–14 business days</td>
                  <td className="px-6 py-3 text-green-600 font-medium">Free on orders $50+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Domestic & International Shipping</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-2 text-gray-700 text-sm leading-relaxed">
            <p>We ship to all 50 US states and internationally to select countries. International customers may be subject to customs duties and taxes, which are the responsibility of the buyer.</p>
            <p>Delivery times for international orders may vary depending on customs processing in your country.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Order Tracking</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-2 text-gray-700 text-sm leading-relaxed">
            <p>Once your order ships, you'll receive an email with a tracking number. You can use this number to track your package on the carrier's website.</p>
            <p>If you haven't received tracking information within 3 business days of your order, please <Link to="/contact" className="text-primary hover:underline font-medium">contact us</Link>.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Lost or Damaged Packages</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-2 text-gray-700 text-sm leading-relaxed">
            <p>If your package arrives damaged or is lost in transit, please contact us within <strong>7 days</strong> of the expected delivery date. We will work with the carrier to resolve the issue and ensure you receive your order.</p>
          </div>
        </section>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <p className="text-gray-700 text-sm mb-3">Have questions about your shipment?</p>
          <Link to="/contact" className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium text-sm no-underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
