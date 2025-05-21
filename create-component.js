import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function toTitleCase(str) {
    return str.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function createComponent(componentName) {
    // Component name is already in kebab-case
    const kebabName = componentName;
    const displayName = toTitleCase(componentName);
    const componentDir = path.join(__dirname, 'src', 'components', kebabName);

    // Create component directory
    fs.mkdirSync(componentDir, { recursive: true });

    // HTML template based on existing project structure
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./${kebabName}.css">
    <link rel="stylesheet" href="../../shared/main.css">
    <link rel="icon" type="image/svg+xml" href="/plokey-logo-small.svg">
    <title>${displayName}</title>
</head>
<body>
    <section class="flex justify-center items-center h-screen">
        <!-- START: ${displayName} Component -->
        <div class="shadow-default shadow-black/15 rounded-md mx-4 sm:mx-auto sm:min-w-[700px]">
            <div class="px-4 py-6 sm:px-8">
                <!-- Your component content here -->
            </div>
        </div>
        <!-- END: ${displayName} Component -->
    </section>
</body>
</html>`;

    // CSS template with project-specific reference
    const cssContent = `@reference "../../shared/main.css";

/* Component styles for ${displayName} */`;

    // Create files
    fs.writeFileSync(path.join(componentDir, `${kebabName}.html`), htmlContent);
    fs.writeFileSync(path.join(componentDir, `${kebabName}.css`), cssContent);

    // Update index.html with new component link
    updateIndexHtml(displayName, kebabName);

    console.log(`✨ Component ${displayName} created successfully!`);
    console.log(`📁 Location: src/components/${kebabName}/`);
}

function updateIndexHtml(displayName, kebabName) {
    const indexPath = path.join(__dirname, 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Find the last </li> in the list
    const lastListItem = indexContent.lastIndexOf('</li>');
    if (lastListItem === -1) return;

    // Insert new component link
    const newLink = `\n        <li>\n          <a class="underline" href="./src/components/${kebabName}/${kebabName}.html">${displayName}</a>\n        </li>`;
    
    const updatedContent = indexContent.slice(0, lastListItem + 5) + newLink + indexContent.slice(lastListItem + 5);
    
    fs.writeFileSync(indexPath, updatedContent);
}

// Get component name from command line argument
const componentName = process.argv[2];

if (!componentName) {
    console.error('⚠️ Please provide a component name!');
    console.error('Usage: node create-component.js component-name');
    process.exit(1);
}

createComponent(componentName);