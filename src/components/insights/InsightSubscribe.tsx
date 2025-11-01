import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiArrowRight } from 'react-icons/fi';

const InsightSubscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6">
              <FiMail className="w-8 h-8 text-blue-200" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Informed
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get the latest legal insights, industry updates, and thought leadership delivered directly to your inbox.
            </p>
          </motion.div>

          {!isSubscribed ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 text-green-200"
            >
              <FiCheck className="w-6 h-6" />
              <span className="text-lg font-medium">Successfully subscribed!</span>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-blue-200 mt-6"
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default InsightSubscribe;
