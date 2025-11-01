import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TermsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - HilbrickRockle</title>
        <meta name="description" content="Read our terms of service and understand the legal conditions for using our website." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-indigo-100">Last Updated: March 2024</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6">1. Agreement to Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing or using the website and services of HilbrickRockle (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), 
              you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do 
              not agree with any of these terms, you are prohibited from using or accessing this website.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">2. Use License</h2>
            <p className="text-gray-700 mb-6">
              Permission is granted to temporarily access the materials on our website for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a transfer of title, and under this 
              license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or mirror the materials on any other server</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">3. Legal Disclaimer</h2>
            <p className="text-gray-700 mb-4">The information on this website is provided for general information purposes only:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>We make no warranties, expressed or implied, about the accuracy, completeness, or suitability of the information</li>
              <li>The content on this website does not constitute legal advice</li>
              <li>You should consult with qualified legal counsel for advice regarding your specific circumstances</li>
              <li>Past results do not guarantee future outcomes</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">4. Attorney-Client Relationship</h2>
            <p className="text-gray-700 mb-6">
              Use of this website or communication through this website does not create an attorney-client relationship. 
              An attorney-client relationship is established only through a written agreement signed by both parties.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">5. User Accounts</h2>
            <p className="text-gray-700 mb-4">If you create an account on our website, you are responsible for:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring the accuracy of information you provide</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">6. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">You agree not to use our website:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>In any way that violates applicable laws or regulations</li>
              <li>To transmit any harmful, offensive, or illegal content</li>
              <li>To impersonate any person or entity</li>
              <li>To interfere with the security or operation of the website</li>
              <li>To collect information about other users without their consent</li>
              <li>To send unsolicited communications or spam</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">7. Intellectual Property Rights</h2>
            <p className="text-gray-700 mb-6">
              All content on this website, including but not limited to text, graphics, logos, images, and software, 
              is the property of HilbrickRockle or its content suppliers and is protected by copyright, trademark, and other 
              intellectual property laws. You may not reproduce, distribute, or create derivative works without our 
              express written permission.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">8. Third-Party Links</h2>
            <p className="text-gray-700 mb-6">
              Our website may contain links to third-party websites. We are not responsible for the content, privacy 
              policies, or practices of third-party websites. Your use of third-party websites is at your own risk.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              To the fullest extent permitted by law, HilbrickRockle shall not be liable for any direct, indirect, incidental, 
              special, consequential, or punitive damages arising out of or related to your use of this website or the 
              services provided, regardless of the theory of liability.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">10. Indemnification</h2>
            <p className="text-gray-700 mb-6">
              You agree to indemnify, defend, and hold harmless HilbrickRockle and its affiliates from any claims, damages, 
              losses, liabilities, and expenses (including attorneys&apos; fees) arising out of or related to your use 
              of the website or violation of these Terms of Service.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">11. Termination</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to terminate or suspend your access to the website at any time, with or without 
              cause or notice, for any reason, including breach of these Terms of Service.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">12. Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 mb-6">
              These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
              without regard to its conflict of law principles. Any legal action or proceeding arising under these terms 
              shall be brought exclusively in the courts of [Your Jurisdiction].
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">13. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these Terms of Service at any time. We will notify users of any material 
              changes by posting the revised terms on our website and updating the &quot;Last Updated&quot; date. Your 
              continued use of the website after such modifications constitutes acceptance of the revised terms.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">14. Severability</h2>
            <p className="text-gray-700 mb-6">
              If any provision of these Terms of Service is found to be unenforceable or invalid, that provision 
              shall be limited or eliminated to the minimum extent necessary, and the remaining terms shall remain 
              in full force and effect.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">15. Entire Agreement</h2>
            <p className="text-gray-700 mb-6">
              These Terms of Service constitute the entire agreement between you and HilbrickRockle regarding your use of 
              this website and supersede all prior or contemporaneous agreements, understandings, or communications.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">16. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-2">
                <strong>HilbrickRockle</strong><br />
                Email: legal@hrlaw.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Legal Avenue, Suite 100, City, State 12345
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-indigo-600 hover:text-indigo-700">
              Contact Us
            </Link>
            <Link href="/" className="text-indigo-600 hover:text-indigo-700">
              Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsPage;

