import { Link } from 'react-router-dom';

export default function ReturnsExchanges() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Returns & Exchanges</h1>
        <p className="text-gray-600">We want you to be completely satisfied with your purchase.</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Return Policy</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-2 text-gray-700 text-sm leading-relaxed">
            <p>We accept returns within <strong>30 days</strong> of delivery. Items must be unused, in their original packaging, and in the same condition you received them.</p>
            <p>To initiate a return, please contact our support team with your order number and reason for return.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How to Return an Item</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Contact Us', desc: 'Reach out to our support team with your order number and reason for return.' },
              { step: '2', title: 'Ship It Back', desc: 'We\'ll provide a return shipping label. Pack the item securely and drop it off.' },
              { step: '3', title: 'Get Refunded', desc: 'Once we receive and inspect the item, your refund will be processed within 5–7 business days.' },
            ].map((item) => (
              <div key={item.step} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Exchanges</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-2 text-gray-700 text-sm leading-relaxed">
            <p>Want a different size, color, or product? We're happy to help with exchanges. Simply <Link to="/contact" className="text-primary hover:underline font-medium">contact us</Link> within <strong>30 days</strong> of delivery.</p>
            <p>If the replacement item has a price difference, we'll charge or refund the difference accordingly.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Refund Details</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-2 text-gray-700 text-sm leading-relaxed">
            <p>Refunds are issued to the original payment method. Please allow <strong>5–7 business days</strong> for the refund to appear on your statement after we process the return.</p>
            <p>Original shipping costs are non-refundable unless the return is due to a defective or incorrect item.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Non-Returnable Items</h2>
          <div className="bg-gray-50 rounded-xl p-6 text-gray-700 text-sm leading-relaxed">
            <ul className="list-disc list-inside space-y-1.5">
              <li>Items marked as "Final Sale" or "Non-Returnable"</li>
              <li>Used or damaged items (not caused by shipping)</li>
              <li>Items without original packaging or tags</li>
              <li>Gift cards</li>
            </ul>
          </div>
        </section>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <p className="text-gray-700 text-sm mb-3">Need to start a return or exchange?</p>
          <Link to="/contact" className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium text-sm no-underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
