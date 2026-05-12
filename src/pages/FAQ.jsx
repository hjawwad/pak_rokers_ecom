import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 7–14 business days. Express shipping takes 3–7 business days. You\'ll receive a tracking number via email once your order ships.' },
      { q: 'Do you ship internationally?', a: 'Yes! We ship to select countries worldwide. International orders may be subject to customs duties and taxes, which are the buyer\'s responsibility.' },
      { q: 'How can I track my order?', a: 'Once your order ships, you\'ll receive an email with a tracking number. Use this number on the carrier\'s website to track your package.' },
      { q: 'Can I change or cancel my order?', a: 'You can change or cancel your order within 2 hours of placing it. After that, orders enter processing and cannot be modified. Please contact us immediately if you need changes.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unused, in original packaging, and in the same condition received. Some items marked "Final Sale" are non-returnable.' },
      { q: 'How long do refunds take?', a: 'After we receive and inspect your return, refunds are processed within 5–7 business days to your original payment method.' },
      { q: 'Do you offer exchanges?', a: 'Yes! Contact our support team within 30 days of delivery to arrange an exchange. Price differences will be charged or refunded accordingly.' },
    ],
  },
  {
    category: 'Products & Account',
    questions: [
      { q: 'Are your products covered by a warranty?', a: 'Many of our products come with a manufacturer\'s warranty. Check the product description for warranty details, or contact us for more information.' },
      { q: 'How do I know which size/variant to choose?', a: 'Each product page includes detailed specifications and sizing information. If you\'re still unsure, our support team is happy to help you choose.' },
      { q: 'Do you offer gift wrapping?', a: 'We don\'t currently offer gift wrapping, but we\'re working on it! Stay tuned for updates.' },
    ],
  },
  {
    category: 'Payment & Security',
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as digital wallets like Apple Pay and Google Pay.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. We use industry-standard SSL encryption and never store your full payment details on our servers.' },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-sm text-gray-800 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600">Find answers to common questions about our products and services.</p>
      </div>

      <div className="space-y-8">
        {faqs.map((section) => (
          <section key={section.category}>
            <h2 className="text-lg font-semibold mb-3">{section.category}</h2>
            <div className="space-y-2">
              {section.questions.map((item) => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
        <p className="text-gray-700 font-medium mb-1">Still have questions?</p>
        <p className="text-gray-600 text-sm mb-4">We're here to help. Reach out to our support team anytime.</p>
        <Link to="/contact" className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium text-sm no-underline">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
