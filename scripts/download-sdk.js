const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filePath, () => {});
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        file.close();
        fs.unlink(filePath, () => {});
        reject(err);
      });
      
    }).on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function updatePackageJson(versions) {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Create exports object
  const exports = {};
  let mainExport = '';
  
  // Add exports for each version
  versions.forEach(version => {
    exports[`./${version}`] = {
      default: `./lib/${version}/index.js`,
      types: './index.d.ts'
    };
  });
  
  // Set the last version as default export
  if (versions.length > 0) {
    const lastVersion = versions[versions.length - 1];
    exports["."] = {
      default: `./lib/${lastVersion}/index.js`,
      types: './index.d.ts'
    };
    mainExport = `./lib/${lastVersion}/index.js`;
  }
  
  packageJson.exports = exports;
  packageJson.main = mainExport; // Update main entry point
  
  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('Updated package.json with exports');
}

async function downloadVersions() {
  const versionrcPath = path.join(__dirname, '..', '.versionrc');
  const libDir = path.join(__dirname, '..', 'lib');

  if (!fs.existsSync(versionrcPath)) {
    console.error('.versionrc file not found');
    process.exit(1);
  }

  const versions = fs.readFileSync(versionrcPath, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  for (const version of versions) {
    console.log(`Processing version: ${version}`);
    
    const versionDir = path.join(libDir, version);
    if (!fs.existsSync(versionDir)) {
      fs.mkdirSync(versionDir, { recursive: true });
    }

    const url = `https://res.wx.qq.com/open/js/jweixin-${version}.js`;
    const filePath = path.join(versionDir, 'index.js');

    try {
      console.log(`Downloading from: ${url}`);
      await downloadFile(url, filePath);
      console.log(`Successfully downloaded version ${version}`);
    } catch (error) {
      console.error(`Failed to download version ${version}:`, error.message);
    }
  }

  // Update package.json with exports
  await updatePackageJson(versions);
  
  console.log('Download process completed');
}

downloadVersions().catch(console.error);
