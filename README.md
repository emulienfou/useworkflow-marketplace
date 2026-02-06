# WorkflowBuilder Marketplace

This repository serves as the official registry for integrations designed for the [**AI Workflow Builder Template
**](https://github.com/vercel-labs/workflow-builder-template).   
It is a community-driven hub where developers contribute React-based plugins to extend the capabilities of the
AI-powered workflow ecosystem.

## Overview

The WorkflowBuilder Marketplace provides a collection of modular integration plugins compatible with the AI Workflow
Builder Template. Each plugin provides the UI components and execution logic required to connect AI agents and workflows
to external services. By leveraging a GitHub-as-a-database approach, we ensure that every integration is
version-controlled and vetted by the community.

## Core Principles

* **React-Centric Design**: All integrations are built using React and TailwindCSS to maintain a consistent look and
  feel within the AI Workflow Builder Template UI.
* **Isolated Dependencies**: While native fetch is preferred, plugins may include their own package.json to utilize
  official SDKs when necessary for complex AI or data integrations.
* **Standardized Communication**: Every plugin action must adhere to a strict success/error output format for
  predictable workflow execution and AI response handling.
* **Security First**: All dependencies are audited using pnpm audit to reduce the supply chain attack surface for
  production AI workflows.
* **Type Safety**: Every integration must be fully typed and pass TypeScript compiler checks to ensure stability within
  the template.

## Plugin Format

To be accepted into the marketplace, a plugin must be situated in the appropriate category folder and include the
following elements:

* **Metadata**: A README.md file containing YAML frontmatter that defines the label, category, and author.
* **Configuration**: An index.ts file that exports an IntegrationPlugin object containing form fields and actions.
* **Execution Logic**: A step function file that performs the actual integration tasks using standardized inputs and
  outputs.
* **Iconography**: A React component rendering the service logo as an SVG.
* **Testing**: A test.ts file providing a validation function for user credentials.

## How to Contribute

We welcome contributions to expand the AI Workflow Builder Template ecosystem. To add a new integration, follow these
steps:

1. Create a new directory under the relevant category in the plugins directory.
2. Develop your plugin following the standardized format mentioned above.
3. If your plugin requires external packages, include a local package.json and ensure it is compatible with pnpm
   workspaces.
4. Run `pnpm type-check` to ensure there are no TypeScript errors.
5. Run `pnpm fix` to format and lint your code according to the project style.
6. Submit a Pull Request for review.

## License

This project is licensed under the [MIT License](LICENSE).
