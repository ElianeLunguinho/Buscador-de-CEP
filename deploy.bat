@echo off
cd "c:\Users\Remakker\Desktop\BuscadorDeCep"
git reset HEAD node_modules
git add .gitignore index.html package.json package-lock.json README.md SPEC.md vite.config.js src .github
git commit -m "feat: Add CEP search app with deploy workflow"
git push origin main

