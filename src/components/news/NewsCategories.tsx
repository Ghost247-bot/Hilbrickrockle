import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'All News', count: 156 },
  { name: 'Firm News', count: 45 },
  { name: 'Press Releases', count: 38 },
  { name: 'Awards', count: 28 },
  { name: 'Publications', count: 25 },
  { name: 'Events', count: 20 }
];

interface NewsCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const NewsCategories: React.FC<NewsCategoriesProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <section className="mb-6 sm:mb-8 lg:mb-12">
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
        {categories.map((category, index) => {
          const isActive = selectedCategory === category.name || (selectedCategory === '' && category.name === 'All News');
          return (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onCategoryChange(category.name === 'All News' ? '' : category.name)}
              className={`group flex items-center space-x-2 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full border transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              <span className={isActive ? 'text-blue-700 font-medium' : 'text-gray-700 group-hover:text-blue-600'}>
                {category.name}
              </span>
              <span className={`text-xs sm:text-sm ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'}`}>
                ({category.count})
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default NewsCategories; 