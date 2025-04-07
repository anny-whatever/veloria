import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, getLegalPageSchema } from "../../components/SEO";

const TermsOfService = () => {
  // SEO metadata
  const title = "Terms of Service | Veloria";
  const description =
    "Read the Terms of Service for Veloria. These terms outline the rules, guidelines, and agreements for using our services and website.";
  const keywords =
    "terms of service, terms and conditions, user agreement, legal terms, website terms, Veloria terms";
    
  // Generate structured data for terms of service
  const structuredData = getLegalPageSchema("terms-of-service", "2023-04-10");

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/terms-of-service"
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
              Terms of Service
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
                  Welcome to Veloria ("Company," "we," "our," "us"). These Terms
                  of Service ("Terms") govern your use of our website located at{" "}
                  <a
                    href="https://veloria.in"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    https://veloria.in
                  </a>{" "}
                  (the "Site") and all related services, features, content, and
                  applications offered by Veloria (collectively with the Site,
                  the "Services").
                </p>
                <p>
                  By accessing or using our Services, you agree to be bound by
                  these Terms. If you disagree with any part of the Terms, you
                  may not access the Services.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  2. Use of Services
                </h2>

                <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">
                  2.1 Eligibility
                </h3>
                <p>
                  You must be at least 18 years of age or the age of legal
                  majority in your jurisdiction to use our Services. By using
                  our Services, you represent and warrant that you meet these
                  requirements and that you have the legal authority to accept
                  these Terms.
                </p>

                <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">
                  2.2 Account Responsibilities
                </h3>
                <p>
                  If you create an account with us, you are responsible for
                  maintaining the security of your account and for all
                  activities that occur under your account. You must immediately
                  notify us of any unauthorized use of your account or any other
                  breach of security.
                </p>

                <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">
                  2.3 Acceptable Use
                </h3>
                <p>When using our Services, you agree not to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    Violate any applicable laws, regulations, or third-party
                    rights
                  </li>
                  <li>
                    Use the Services for any illegal or unauthorized purpose
                  </li>
                  <li>
                    Attempt to interfere with or disrupt the integrity or
                    performance of the Services
                  </li>
                  <li>
                    Collect or harvest any personally identifiable information
                    from the Services
                  </li>
                  <li>Impersonate another person or entity</li>
                  <li>Upload or transmit any malicious code or content</li>
                  <li>
                    Engage in any activity that could damage, disable, or
                    overburden our servers or networks
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  3. Intellectual Property
                </h2>

                <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">
                  3.1 Our Content
                </h3>
                <p>
                  The Services and their original content, features, and
                  functionality are owned by Veloria and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property or proprietary rights laws.
                </p>

                <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">
                  3.2 Limited License
                </h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable, and
                  revocable license to use the Services for their intended
                  purposes in accordance with these Terms. You may not copy,
                  modify, distribute, sell, or lease any part of the Services
                  without our prior written consent.
                </p>

                <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">
                  3.3 Your Content
                </h3>
                <p>
                  By submitting, posting, or displaying content on or through
                  the Services, you grant us a worldwide, non-exclusive,
                  royalty-free license to use, reproduce, modify, adapt,
                  publish, translate, and distribute such content in connection
                  with providing the Services.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  4. Third-Party Links and Services
                </h2>
                <p>
                  Our Services may contain links to third-party websites or
                  services that are not owned or controlled by Veloria. We have
                  no control over, and assume no responsibility for, the
                  content, privacy policies, or practices of any third-party
                  websites or services. You further acknowledge and agree that
                  Veloria shall not be responsible or liable, directly or
                  indirectly, for any damage or loss caused or alleged to be
                  caused by or in connection with the use of or reliance on any
                  such content, goods, or services available on or through any
                  such websites or services.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  5. Service Fees and Payment
                </h2>
                <p>
                  Certain aspects of the Services may be provided for a fee. If
                  you elect to use paid aspects of the Services, you agree to
                  pay all applicable fees. We may modify the fees for any of our
                  Services at any time. We will provide you with reasonable
                  notice of any price changes and, if the changes are not
                  acceptable to you, you may cancel your account or
                  subscription.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  6. Termination
                </h2>
                <p>
                  We may terminate or suspend your access to the Services
                  immediately, without prior notice or liability, for any reason
                  whatsoever, including without limitation if you breach these
                  Terms.
                </p>
                <p>
                  All provisions of the Terms which by their nature should
                  survive termination shall survive termination, including,
                  without limitation, ownership provisions, warranty
                  disclaimers, indemnity, and limitations of liability.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  7. Limitation of Liability
                </h2>
                <p>
                  In no event shall Veloria, its directors, employees, partners,
                  agents, suppliers, or affiliates, be liable for any indirect,
                  incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use,
                  goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    Your access to or use of or inability to access or use the
                    Services
                  </li>
                  <li>
                    Any conduct or content of any third party on the Services
                  </li>
                  <li>Any content obtained from the Services</li>
                  <li>
                    Unauthorized access, use, or alteration of your
                    transmissions or content
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  8. Disclaimer
                </h2>
                <p>
                  Your use of the Services is at your sole risk. The Services
                  are provided on an "AS IS" and "AS AVAILABLE" basis. The
                  Services are provided without warranties of any kind, whether
                  express or implied, including, but not limited to, implied
                  warranties of merchantability, fitness for a particular
                  purpose, non-infringement, or course of performance.
                </p>
                <p>
                  Veloria does not warrant that the Services will function
                  uninterrupted, secure, or available at any particular time or
                  location, or that any errors or defects will be corrected.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  9. Indemnification
                </h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Veloria and
                  its licensees and licensors, and their employees, contractors,
                  agents, officers, and directors, from and against any and all
                  claims, damages, obligations, losses, liabilities, costs or
                  debt, and expenses (including but not limited to attorney's
                  fees), resulting from or arising out of your use of and access
                  to the Services, or your violation of these Terms.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  10. Governing Law
                </h2>
                <p>
                  These Terms shall be governed and construed in accordance with
                  the laws of India, without regard to its conflict of law
                  provisions. Our failure to enforce any right or provision of
                  these Terms will not be considered a waiver of those rights.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  11. Changes to Terms
                </h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will provide at least 30 days' notice prior to any new terms
                  taking effect. What constitutes a material change will be
                  determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Services after any
                  revisions become effective, you agree to be bound by the
                  revised terms. If you do not agree to the new terms, you are
                  no longer authorized to use the Services.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  12. Contact Us
                </h2>
                <p>
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> legal@veloria.in
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

export default TermsOfService;
