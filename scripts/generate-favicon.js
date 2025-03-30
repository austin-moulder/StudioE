const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if convert (ImageMagick) is installed
try {
  console.log('Checking for ImageMagick...');
  execSync('convert -version', { stdio: 'ignore' });
} catch (error) {
  console.error('ImageMagick is not installed. Please install it to generate favicons.');
  console.log('You can install it with:');
  console.log('  - On macOS: brew install imagemagick');
  console.log('  - On Ubuntu/Debian: sudo apt-get install imagemagick');
  console.log('  - On Windows: https://imagemagick.org/script/download.php');
  process.exit(1);
}

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'icon.svg');
const pngPath = path.join(publicDir, 'apple-icon.png');
const icoPath = path.join(publicDir, 'favicon.ico');

// First convert SVG to PNG (for the Apple icon)
console.log('Generating PNG favicon...');
try {
  execSync(`convert -background none -size 180x180 ${svgPath} ${pngPath}`);
  console.log(`Created: ${pngPath}`);
} catch (error) {
  console.error('Error generating PNG:', error.message);
}

// Then convert SVG to ICO (multiple sizes)
console.log('Generating ICO favicon...');
try {
  execSync(`convert -background none -define icon:auto-resize=16,32,48,64 ${svgPath} ${icoPath}`);
  console.log(`Created: ${icoPath}`);
} catch (error) {
  console.error('Error generating ICO:', error.message);
}

console.log('Favicon generation complete!'); 