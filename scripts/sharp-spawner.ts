import sharp from "sharp";

// Function to process the SVG grid with sharp (e.g., convert to PNG)
async function makeImage(outputPath) {
  const svgContent = `<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="128" height="128" fill="#222222" />
    
    <!-- Industrial base frame -->
    <rect x="30" y="78" width="68" height="20" fill="#222222" rx="1" />
    
    <!-- Platform -->
    <rect x="32" y="80" width="64" height="16" fill="#444444" rx="1" />
    
    <!-- Support beams -->
    <rect x="36" y="84" width="4" height="12" fill="#555555" />
    <rect x="88" y="84" width="4" height="12" fill="#555555" />
    <rect x="60" y="84" width="4" height="12" fill="#555555" />
    
    <!-- Detailed conveyor -->
    <rect x="36" y="76" width="56" height="4" fill="#777777" rx="0.5" />
    
    <!-- Conveyor segments -->
    <rect x="36" y="76" width="56" height="1" fill="#999999" />
    <rect x="36" y="78" width="56" height="1" fill="#999999" />
    <rect x="36" y="80" width="56" height="1" fill="#999999" />
    
    <!-- Conveyor rollers -->
    <circle cx="64" cy="82" r="3" fill="#888888" />
    <circle cx="64" cy="90" r="3" fill="#888888" />
    
    <!-- Robotic Arms -->
    <line x1="48" y1="40" x2="64" y2="76" stroke="#aaaaaa" stroke-width="3" />
    <line x1="80" y1="40" x2="64" y2="76" stroke="#aaaaaa" stroke-width="3" />
    
    <!-- Arm joints -->
    <circle cx="48" cy="40" r="4" fill="#cccccc" />
    <circle cx="80" cy="40" r="4" fill="#cccccc" />
    
    <!-- Robot being assembled -->
    <rect x="60" y="56" width="8" height="16" fill="#00aaff" rx="1" />
    <circle cx="64" cy="52" r="4" fill="#00aaff" />
    
    <!-- Control panel -->
    <rect x="84" y="84" width="8" height="4" fill="#111111" rx="0.5" />
    <rect x="85" y="85" width="6" height="2" fill="#00aaff" opacity="0.3" />
    
    <!-- Conveyor details -->
    <rect x="40" y="78" width="48" height="4" fill="#888888" />
    <line x1="40" y1="78" x2="88" y2="78" stroke="#aaaaaa" stroke-width="0.5" stroke-dasharray="2,2" />
    <line x1="40" y1="82" x2="88" y2="82" stroke="#aaaaaa" stroke-width="0.5" stroke-dasharray="2,2" />
  </svg>`;

  const svgBuffer = Buffer.from(svgContent);

  try {
    await sharp(svgBuffer)
      .png() // Convert to PNG format
      .toFile(outputPath);

    console.log(`SVG saved as ${outputPath}`);
  } catch (error) {
    console.error("Error processing SVG grid:", error);
  }
}

makeImage("./src/spacetrash/Assets/spawner.png");
