const fs = require('fs');
const html = fs.readFileSync('scratch.html', 'utf8');
const configMatch = html.match(/tailwind\.config\s*=\s*({[\s\S]*?})\s*<\/script>/);
if (configMatch) {
  const configStr = configMatch[1];
  // naive parse
  const config = eval('(' + configStr + ')');
  let css = '@theme {\n';
  
  const colors = config.theme.extend.colors;
  for (const [key, value] of Object.entries(colors)) {
    css += `  --color-${key}: ${value};\n`;
  }
  
  const spacing = config.theme.extend.spacing;
  for (const [key, value] of Object.entries(spacing)) {
    css += `  --spacing-${key}: ${value};\n`;
  }
  
  const fonts = config.theme.extend.fontFamily;
  for (const [key, value] of Object.entries(fonts)) {
    css += `  --font-${key}: '${value[0]}', sans-serif;\n`;
  }

  css += '}\n\n';
  
  css += '@layer utilities {\n';
  const fontSizes = config.theme.extend.fontSize;
  for (const [key, value] of Object.entries(fontSizes)) {
    css += `  .text-${key} { font-size: ${value[0]}; line-height: ${value[1].lineHeight}; font-weight: ${value[1].fontWeight}; ${value[1].letterSpacing ? 'letter-spacing: ' + value[1].letterSpacing + ';' : ''} }\n`;
    css += `  .font-${key} { font-family: var(--font-${key}); }\n`;
  }
  css += '}\n';

  let globals = fs.readFileSync('src/app/globals.css', 'utf8');
  globals += '\n' + css;
  fs.writeFileSync('src/app/globals.css', globals);
  console.log('Successfully updated globals.css');
} else {
  console.log('No config found');
}
