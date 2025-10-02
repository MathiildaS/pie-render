# Contribution guide
Thank you for your shown interest in **pie-render**.
Any contributions are highly appreciated!

Below you will find a guide on how to continue working with this project.

## How to Contribute

### Installation
1. Fork the repository on GitHub.

2. Clone your fork locally.

3. Install dependencies:
```bash
npm install
```

### Guidelines
Make sure to work in branches and keep the Main branch clean and stable.

1. Create a new branch for your feature:
```bash
git checkout -b feature/my-feature
```

2. Make your changes.

3. Test your changes before commiting them.

4. Commit your changes:
```bash
git add .
git commit -m 'Commit of changes'
```

5. Push your changes
```bash
git push origin feature/my-feature
```

6. Create a pull request to main.
From the original repository, click "Pull Request" and describe your changes.

7. Wait for your changes to be reviewed.

### Code Style
It is recommended to use ESLint to detect and fix issues.
Run ESLint for a consistent code style.

1. Install ESLint:
```bash
npm install eslint --save-dev
```

2. Add lint under "scripts" to package.json:
```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
}
```

3. Run ESLint
```bash
npm run lint
```

4. Fix issues automatically if possible:
```bash
npm run lint:fix
```

This project also follows the **Clean Code** principles.
* Use clear and descriptive names for variables, functions/methods and classes.
* Keep functions/methods small and focused on a single responsibility.
* Avoid unnecessary complexity and duplicated code.

### Issues
If you'd like to contribute, please open an issue in the GitHub repository with an descriptive title and describe the encountered bug or suggested improvement.

### Code of Conduct
All contributors are expected to be respectful and considerate of others when contributing to this project.
Please make sure to use a welcoming and inclusive language and provide constructive feedback.

## Contact
For further questions or complaints, please send an email to:
ms228qs@student.lnu.se