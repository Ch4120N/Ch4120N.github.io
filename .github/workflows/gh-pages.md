name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # یا branch دیگری که محتویات `public` را در آن نگه‌داری می‌کنید

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Build project
      run: npm run build  # اگر از ابزار build خاصی استفاده می‌کنید

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        deploy_branch: gh-pages
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
