import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InsightCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', count: 156 },
    { name: 'Technology', count: 45 },
    { name: 'Compliance', count: 38 },
    { name: 'International Law', count: 28 },
    { name: 'Corporate Law', count: 25 },
    { name: 'Litigation', count: 20 }
  ];

  return (
    <section className="mb-8 sm:mb-12 lg:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 sm:mb-6 lg:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Browse by Category</h2>
        <p className="text-base sm:text-lg text-gray-600">Explore insights by practice area and topic</p>
      </motion.div>

      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveCategory(category.name)}
            className={`group flex items-center space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-sm sm:text-base ${
              activeCategory === category.name
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700'
            }`}
          >
            <span className="font-medium">
              {category.name}
            </span>
            <span className={`text-xs sm:text-sm ${
              activeCategory === category.name
                ? 'text-blue-500'
                : 'text-gray-500 group-hover:text-blue-500'
            }`}>
              ({category.count})
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default InsightCategories;
