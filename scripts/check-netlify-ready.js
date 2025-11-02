#!/usr/bin/env node

/**
 * Pre-deployment check script for Netlify
 * Verifies configuration files and setup before deployment
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

let hasErrors = false;
let hasWarnings = false;

function checkFile(filePath, description, required = true) {
  const fullPath = path.join(process.cwd(), filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    console.log(`${colors.green}✓${colors.reset} ${description}: ${filePath}`);
    return true;
  } else {
    if (required) {
      console.log(`${colors.red}✗${colors.reset} ${description}: ${filePath} (REQUIRED)`);
      hasErrors = true;
    } else {
      console.log(`${colors.yellow}⚠${colors.reset} ${description}: ${filePath} (OPTIONAL)`);
      hasWarnings = true;
    }
    return false;
  }
}

function checkFileContent(filePath, searchString, description) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`${colors.red}✗${colors.reset} Cannot check ${description}: ${filePath} not found`);
    hasErrors = true;
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes(searchString)) {
    console.log(`${colors.green}✓${colors.reset} ${description}`);
    return true;
  } else {
    console.log(`${colors.yellow}⚠${colors.reset} ${description}: Not found in ${filePath}`);
    hasWarnings = true;
    return false;
  }
}

function checkGitStatus() {
  try {
    const { execSync } = require('child_process');
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.log(`${colors.yellow}⚠${colors.reset} You have uncommitted changes:`);
      console.log(status.split('\n').filter(l => l).map(l => `   ${l}`).join('\n'));
      hasWarnings = true;
      return false;
    } else {
      console.log(`${colors.green}✓${colors.reset} Git: No uncommitted changes`);
      return true;
    }
  } catch (error) {
    console.log(`${colors.yellow}⚠${colors.reset} Could not check git status (not a git repo?)`);
    hasWarnings = true;
    return false;
  }
}

console.log('\n' + colors.blue + '🔍 Netlify Deployment Readiness Check' + colors.reset + '\n');

// Check required files
console.log(colors.blue + 'Required Files:' + colors.reset);
checkFile('netlify.toml', 'Netlify configuration');
checkFile('next.config.js', 'Next.js configuration');
checkFile('package.json', 'Package configuration');
checkFile('.npmrc', 'npm configuration');
checkFile('.gitignore', 'Git ignore file');

// Check file contents
console.log('\n' + colors.blue + 'Configuration Checks:' + colors.reset);
checkFileContent('netlify.toml', '@netlify/plugin-nextjs', 'Netlify Next.js plugin configured');
checkFileContent('netlify.toml', 'npm run build', 'Build command configured');
checkFileContent('netlify.toml', 'NODE_VERSION', 'Node version specified');
checkFileContent('.npmrc', 'legacy-peer-deps', 'Legacy peer deps enabled');
checkFileContent('package.json', '@netlify/plugin-nextjs', 'Netlify plugin in dependencies');
checkFileContent('package.json', '"build"', 'Build script exists');

// Check .gitignore
console.log('\n' + colors.blue + 'Security Checks:' + colors.reset);
checkFileContent('.gitignore', '.env', '.env files excluded');
checkFileContent('.gitignore', 'node_modules', 'node_modules excluded');
checkFileContent('.gitignore', '.next', '.next excluded');

// Check git status
console.log('\n' + colors.blue + 'Git Status:' + colors.reset);
checkGitStatus();

// Summary
console.log('\n' + '─'.repeat(50));
if (hasErrors) {
  console.log(colors.red + '\n❌ ERRORS FOUND: Please fix the issues above before deploying.' + colors.reset);
  process.exit(1);
} else if (hasWarnings) {
  console.log(colors.yellow + '\n⚠️  WARNINGS: Review the warnings above. Deployment may proceed but review recommended.' + colors.reset);
  process.exit(0);
} else {
  console.log(colors.green + '\n✅ All checks passed! Ready for Netlify deployment.' + colors.reset);
  console.log('\nNext steps:');
  console.log('1. Ensure environment variables are set in Netlify dashboard');
  console.log('2. Commit and push your changes: git add . && git commit -m "Deploy" && git push');
  console.log('3. Or trigger deploy from Netlify dashboard');
  console.log('4. Monitor deployment logs in Netlify dashboard\n');
  process.exit(0);
}

