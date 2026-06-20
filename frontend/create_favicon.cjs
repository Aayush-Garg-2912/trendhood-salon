const { Jimp } = require('jimp');
const fs = require('fs');

async function createFavicon() {
  try {
    const imagePath = 'C:\\Users\\Aayush\\.gemini\\antigravity\\brain\\d2fbe2f7-88a4-4055-9547-cdfc24f2a04a\\trendhood_logo_1781975776710.png';
    const image = await Jimp.read(imagePath);
    
    // Resize to 32x32
    image.resize({ w: 32, h: 32 });
    
    // Save as favicon.png in public directory first to avoid MIME type errors
    image.write('public/favicon.png', () => {
        console.log('Favicon created successfully at 32x32!');
    });
    console.log('Favicon created successfully at 32x32!');
  } catch (err) {
    console.error('Error creating favicon:', err);
  }
}

createFavicon();
