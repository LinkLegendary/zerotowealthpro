export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Zero to Wealth Pro for questions, partnerships, or media inquiries.',
};

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <p className="mb-6">
        Have a question about our financial tools, resources, or content? We'd
        love to hear from you.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <p className="text-lg">
          📩 Email:{' '}
          <a
            href="mailto:contact@zerotowealthpro.com"
            className="text-blue-600 underline"
          >
            contact@zerotowealthpro.com
          </a>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {/* We typically respond within 24–48 hours. */}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Financial Disclaimer</h2>
      <p className="text-sm text-gray-600">
        The information provided on Zero to Wealth Pro is for educational
        purposes only and should not be considered financial or investment
        advice.
      </p>
    </main>
  );
}
