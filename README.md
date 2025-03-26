# InterSystems FHIR Frontend built with Lovable

## What it is about?

This is a generated prompt-to-code UI providing a frontend UI for InterSystems FHIR Server R4

To make it work:
1. Launch your InterSystems FHIR server e.g. using [this repository]([url](https://github.com/intersystems-community/iris-fhir-template))
2. Open the [published UI here]([url](https://patientverse-ui.lovable.app/))

You can fork this project and alter the UI to a proper server [here](https://github.com/evshvarov/fhir-frontend-react-lovable/blob/6de12f125edb47c09a31519136e165a0e16462f3/src/config/fhir.ts#L2) (by default it looks to http://localhost:32783/fhir/r4/)

Or build a new one with Lovable - here is the [video podcast](https://www.youtube.com/watch?v=NmQipSlYaeg) on how it was built.

<img width="1217" alt="Image" src="https://github.com/user-attachments/assets/38d9736b-2830-4045-b2bd-0f887dab29de" />

## Project info

**URL**: https://lovable.dev/projects/889fbdf6-31de-407e-9cee-a68d88011043

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/889fbdf6-31de-407e-9cee-a68d88011043) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/889fbdf6-31de-407e-9cee-a68d88011043) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
