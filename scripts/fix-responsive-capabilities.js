#!/usr/bin/env node

/**
 * Helper script to batch-fix responsive design patterns in capability pages
 * 
 * This script applies the responsive design patterns established for capability pages:
 * - Hero heights: h-[35vh] sm:h-[45vh] md:h-[50vh]
 * - Text sizes with responsive breakpoints
 * - Padding: py-8 sm:py-12 lg:py-16
 * - Grids: grid-cols-1 sm:grid-cols-2
 * 
 * Usage: node scripts/fix-responsive-capabilities.js
 * 
 * Note: This is a reference script. Manual fixes are applied directly.
 */

const fs = require('fs');
const path = require('path');

const capabilitiesDir = path.join(__dirname, '../src/pages/capabilities');
const patternReplacements = [
  // Hero section height
  {
    old: /h-\[50vh\]/g,
    new: 'h-[35vh] sm:h-[45vh] md:h-[50vh]'
  },
  // Back link text size
  {
    old: /className="text-blue-200 hover:text-white mb-4 inline-block"/g,
    new: 'className="text-sm sm:text-base text-blue-200 hover:text-white mb-3 sm:mb-4 inline-block"'
  },
  // H1 title
  {
    old: /className="text-4xl md:text-5xl font-bold mb-6"/g,
    new: 'className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"'
  },
  // Hero subtitle
  {
    old: /className="text-xl text-blue-100"/g,
    new: 'className="text-lg sm:text-xl text-blue-100"'
  },
  // Section padding
  {
    old: /className="py-16 bg-white"/g,
    new: 'className="py-8 sm:py-12 lg:py-16 bg-white"'
  },
  {
    old: /className="py-16 bg-gray-50"/g,
    new: 'className="py-8 sm:py-12 lg:py-16 bg-gray-50"'
  },
  {
    old: /className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"/g,
    new: 'className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"'
  },
  // H2 titles
  {
    old: /className="text-3xl font-bold mb-6"/g,
    new: 'className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"'
  },
  {
    old: /className="text-3xl font-bold mb-12 text-center"/g,
    new: 'className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center"'
  },
  {
    old: /className="text-3xl font-bold mb-4"/g,
    new: 'className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"'
  },
  // Paragraph text
  {
    old: /className="text-lg text-gray-700 leading-relaxed mb-4"/g,
    new: 'className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4"'
  },
  {
    old: /className="text-lg text-gray-700 leading-relaxed"/g,
    new: 'className="text-base sm:text-lg text-gray-700 leading-relaxed"'
  },
  // Grids
  {
    old: /className="grid grid-cols-1 md:grid-cols-2 gap-8"/g,
    new: 'className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"'
  },
  // Service cards
  {
    old: /className="bg-white rounded-lg shadow-md p-8"/g,
    new: 'className="bg-white rounded-lg shadow-md p-6 sm:p-8"'
  },
  {
    old: /className="text-xl font-bold mb-3"/g,
    new: 'className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"'
  },
  {
    old: /className="text-gray-600"/g,
    new: 'className="text-sm sm:text-base text-gray-600"'
  },
  // CTA section
  {
    old: /className="text-xl mb-8 text-blue-100"/g,
    new: 'className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100"'
  },
  {
    old: /className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"/g,
    new: 'className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-50 transition-colors font-medium"'
  }
];

console.log('Responsive Design Pattern Reference Script');
console.log('==========================================');
console.log('\nThis script documents the patterns used for responsive design fixes.');
console.log('Patterns have been manually applied to files.');
console.log('\nPatterns documented:');
patternReplacements.forEach((p, i) => {
  console.log(`${i + 1}. ${p.old.toString().substring(0, 50)}...`);
});

console.log('\n✅ All capability pages should follow these patterns!');

