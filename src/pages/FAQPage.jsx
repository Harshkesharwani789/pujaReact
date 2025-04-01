import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function FAQPage() {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, UPI, net banking, and cash on delivery for orders within India. For international orders, we accept credit cards and PayPal.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "For domestic orders within India, standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery. International shipping typically takes 7-14 business days depending on the destination country.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes, we offer free standard shipping on all domestic orders above ₹1000. For international orders, free shipping is available on orders above ₹5000.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 10-day return policy for most items. Products must be unused, in their original packaging, and in the same condition as received. Some items like incense sticks, dhoop, and customized products are not eligible for return due to their nature.",
    },
    {
      question: "Are the idols consecrated?",
      answer:
        "No, our idols are not consecrated when shipped. You would need to perform the appropriate rituals as per your traditions to consecrate them after receiving.",
    },
    {
      question: "How do I care for brass and copper items?",
      answer:
        "For brass and copper items, clean with a soft dry cloth regularly. To maintain shine, you can use specific brass or copper cleaners available in the market. Avoid using harsh chemicals or abrasive materials that might damage the finish.",
    },
    {
      question: "Do you offer customization for puja items?",
      answer:
        "Yes, we offer customization for select puja items including thalis, idols, and gift hampers. Please contact our customer service team with your specific requirements for a quote and timeline.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email and SMS. You can use this tracking number on our website under 'Track Order' to check the status of your delivery.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary based on the destination. Please note that any import duties or taxes levied by the destination country will be the responsibility of the customer.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@pujastore.com, by phone at +91 1234567890 (10 AM to 6 PM IST, Monday to Saturday), or through the live chat feature on our website.",
    },
  ];

  const categories = [
    "Shipping & Delivery",
    "Returns & Refunds",
    "Product Information",
    "Payment & Pricing",
    "Account & Orders",
  ];

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">
          Find answers to commonly asked questions about our products and
          services
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-4">
              <h2 className="font-semibold mb-2">Categories</h2>
              <ul className="space-y-1">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-3 py-2 rounded-md hover:bg-muted text-sm"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t pt-4 mt-6">
                <h2 className="font-semibold mb-2">Need more help?</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Can't find the answer you're looking for? Please contact our
                  customer support team.
                </p>
                <Link
                  to="/contact"
                  className="text-sm text-primary hover:underline"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg px-6 py-4">
                  <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
