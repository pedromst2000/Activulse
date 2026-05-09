# Contributing to Activulse

Your contributions help keep Activulse evolving! Whether you're fixing a bug, improving code quality, enhancing documentation, or adding new features, every contribution matters.

**How to contribute:**

- Found a bug? [Report it](https://github.com/pedromst2000/Activulse/issues/new?labels=bug&template=bug_report.md)
- Have an enhancement idea? [Suggest it](https://github.com/pedromst2000/Activulse/issues/new?labels=enhancement&template=feature_request.md)
- Ready to code? Follow the workflow below to submit your changes

## Design & UI Reference

If you're working on UI components or features, check out the design prototype to maintain visual consistency:

[![Figma Design](https://img.shields.io/badge/Figma-Design_Prototype-F24E1E?style=flat&logo=figma&logoColor=white)](https://www.figma.com/design/avpVZFoqroYaPYGoqzPZxo/Activulse--Beta-Version-?node-id=1-2&t=pH8FuqIb1vnPLtGx-1)

## Naming Conventions

Follow these **conventions** for branches and commit messages to keep the project organized:

| Type       | Use Case               | Branch Example          | Commit Example                      |
| ---------- | ---------------------- | ----------------------- | ----------------------------------- |
| `feat`     | New feature            | `feat/activity-badges`  | `feat: add activity badge system`   |
| `fix`      | Bug fix                | `fix/api-validation`    | `fix: resolve JWT validation error` |
| `docs`     | Documentation          | `docs/update-readme`    | `docs: update installation steps`   |
| `refactor` | Code restructure       | `refactor/auth-flow`    | `refactor: simplify auth logic`     |
| `style`    | Formatting             | `style/format-imports`  | `style: organize imports`           |
| `perf`     | Performance            | `perf/optimize-queries` | `perf: optimize database queries`   |
| `chore`    | Maintenance            | `chore/update-deps`     | `chore: update dependencies`        |

## Contribution Workflow

1. **Get the code:**
   - **External contributors:** Fork the repository, then clone your fork
   - **Collaborators:** Clone the repository directly

2. **Create a branch:** 
   ```bash
   git checkout -b <type>/<description>
   ```

3. **Make changes and commit:**
   ```bash
   git commit -m "<type>: <description>"
   ```

4. **Run checks locally** (before pushing):
   
   Navigate to the package you modified and run:
   ```bash
   npm run prettier    # Format code
   npm run lint        # Run all linters
   ```
   
   All checks must pass before committing.

5. **Push your branch:**
   ```bash
   git push origin <type>/<description>
   ```

6. **Open a Pull Request** with:
   - Clear title following the [naming conventions](#naming-conventions)
   - Description of changes made
   - Screenshots for UI changes
   - Reference to related issues (if any)

## Local Checks Before Committing

Each package (Api, App, Web) has formatting and linting tools. Run these in the package directory you modified:

> **Note:** You can check the `package.json` of each package for available scripts.

```bash
# Format code with Prettier
npm run prettier

# Check code quality with ESLint
npm run eslint-check

# Run all checks
npm run lint
```

**Your PR will be reviewed only if all local checks pass.** This ensures code consistency across the project.

## Pull Request Guidelines

- ✅ Branch name follows [naming conventions](#naming-conventions)
- ✅ Commit messages are clear and descriptive
- ✅ All local checks pass (`npm run lint` in modified packages)
- ✅ No merge conflicts with `master`
- ✅ Changes are focused and not overly broad

## Development Setup

For detailed setup instructions, see the [Getting Started](../README.md#rocket-getting-started) section in the README.

Quick start:
```bash
cd Packages/<Api|App|Web>
npm install
npm run prettier
npm run lint
```

## Questions?

- Check the [README.md](../README.md) for project structure and available commands
- Open an issue with the `question` label if you have questions
- Feel free to ask in your PR for guidance

Thank you for contributing! 🎉
