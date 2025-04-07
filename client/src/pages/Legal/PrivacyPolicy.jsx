import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, getLegalPageSchema } from "../../components/SEO";

const PrivacyPolicy = () => {
  // SEO metadata
  const title = "Privacy Policy | Veloria";
  const description =
    "Learn about how Veloria collects, uses, and protects your personal information. Our privacy policy outlines our commitment to data protection and privacy compliance.";
  const keywords =
    "privacy policy, data protection, GDPR compliance, personal information protection, Veloria privacy";

  // Generate structured data for privacy policy
  const structuredData = getLegalPageSchema("privacy-policy", "2023-04-10");

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/privacy-policy"
        structuredData={structuredData}
      />

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto bg-white dark:bg-dark-300 rounded-xl shadow-md p-6 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Privacy Policy
            </motion.h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                Last Updated: April 10, 2023
              </p>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  1. Introduction
                </h2>
                <p>
                  At Veloria ("we," "us," or "our"), we are committed to
                  protecting your privacy and the security of your personal
                  information. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our
                  website, use our services, or engage with us in any way.
                </p>
                <p>
                  By accessing or using our services, you agree to the terms of
                  this Privacy Policy. If you do not agree with the terms of
                  this Privacy Policy, please do not access the website or use
                  our services.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  2. Information We Collect
                </h2>

                <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">
                  2.1 Personal Information
                </h3>
                <p>
                  We may collect personal information that you voluntarily
                  provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Contact us through our website forms</li>
                  <li>Sign up for our newsletter</li>
                  <li>Request a quote or consultation</li>
                  <li>Purchase our products or services</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p>
                  This information may include your name, email address, phone
                  number, company name, job title, and any other information you
                  choose to provide.
                </p>

                <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">
                  2.2 Automatically Collected Information
                </h3>
                <p>
                  When you visit our website, we may automatically collect
                  certain information about your device and usage patterns. This
                  includes:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website or source</li>
                  <li>Location information</li>
                </ul>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  3. How We Use Your Information
                </h2>
                <p>
                  We use the information we collect for various purposes,
                  including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Providing, maintaining, and improving our services</li>
                  <li>Processing and fulfilling your requests</li>
                  <li>
                    Sending administrative information, such as updates or
                    changes to our terms or policies
                  </li>
                  <li>
                    Sending marketing communications, if you have opted in
                  </li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Analyzing usage patterns to enhance user experience</li>
                  <li>
                    Protecting against unauthorized access and fraudulent
                    activity
                  </li>
                  <li>Complying with legal obligations</li>
                </ul>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  4. Cookies and Tracking Technologies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to track
                  activity on our website and collect certain information.
                  Cookies are small data files that are placed on your device.
                  They help us improve our services and your experience by:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Remembering your preferences</li>
                  <li>Understanding how you interact with our website</li>
                  <li>Personalizing content and advertisements</li>
                  <li>Analyzing website performance</li>
                </ul>
                <p>
                  You can instruct your browser to refuse all cookies or to
                  indicate when a cookie is being sent. However, if you do not
                  accept cookies, you may not be able to use some portions of
                  our website.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  5. Data Sharing and Disclosure
                </h2>
                <p>
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Service Providers:</strong> We may share your
                    information with third-party vendors, service providers, and
                    contractors who perform services on our behalf.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> If we are involved in a
                    merger, acquisition, or sale of assets, your information may
                    be transferred as part of that transaction.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose your
                    information if required to do so by law or in response to
                    valid requests by public authorities.
                  </li>
                  <li>
                    <strong>Protection of Rights:</strong> We may disclose your
                    information to protect and defend our rights, property, or
                    safety, or those of our users or third parties.
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  6. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your personal information from unauthorized access,
                  disclosure, alteration, or destruction. However, please be
                  aware that no method of transmission over the internet or
                  electronic storage is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  7. Your Rights and Choices
                </h2>
                <p>
                  Depending on your location, you may have certain rights
                  regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>The right to access your personal information</li>
                  <li>
                    The right to correct inaccurate or incomplete information
                  </li>
                  <li>
                    The right to request deletion of your personal information
                  </li>
                  <li>
                    The right to restrict or object to our processing of your
                    information
                  </li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the
                  information provided at the end of this Privacy Policy.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  8. International Data Transfers
                </h2>
                <p>
                  Your information may be transferred to, and maintained on,
                  computers located outside of your state, province, country, or
                  other governmental jurisdiction where the data protection laws
                  may differ from those in your jurisdiction. If you are located
                  outside India and choose to provide information to us, please
                  note that we transfer the data to India and process it there.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  9. Children's Privacy
                </h2>
                <p>
                  Our services are not intended for individuals under the age of
                  18. We do not knowingly collect personal information from
                  children under 18. If we become aware that we have collected
                  personal information from a child under 18 without parental
                  consent, we will take steps to remove that information from
                  our servers.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  10. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last Updated" date. You are
                  advised to review this Privacy Policy periodically for any
                  changes.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  11. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> privacy@veloria.in
                  <br />
                  <strong>Address:</strong> Veloria Technologies, 123 Tech Park,
                  Bengaluru, Karnataka, India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
