const fs = require('fs');

const files = [
  'src/app/dashboard/layout.js',
  'src/app/dashboard/page.js',
  'src/components/Sidebar.js'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Remove DashboardHeader from layout
  if (f.includes('layout.js')) {
    content = content.replace(/import DashboardHeader.*?\n/g, '');
    content = content.replace(/<DashboardHeader \/>/g, '');
  }
  
  // Remove all dark: classes
  content = content.replace(/dark:[^\s"']+/g, '');
  
  // Clean up extra spaces
  content = content.replace(/  +/g, ' ');
  
  fs.writeFileSync(f, content);
  console.log(`Cleaned up ${f}`);
});
