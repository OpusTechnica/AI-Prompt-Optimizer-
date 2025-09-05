# Prompt Perfect AI

Prompt Perfect AI is a modern and elegant web application designed to help users optimize and refine prompts for better results from large language models like Google's Gemini. Users can input a prompt, select a desired optimization style, and receive an enhanced version crafted by AI.

The application features a sleek, themeable interface with both light and dark modes, persistent history, undo/redo functionality, and built-in examples to inspire users.

## Features

- **AI-Powered Prompt Optimization**: Leverages the Google Gemini API to rewrite and improve user prompts.
- **Multiple Optimization Styles**: Choose from various styles like 'More Detailed', 'More Concise', 'Professional Tone', 'More Creative', and 'Format as JSON Request'.
- **Light & Dark Modes**: A beautiful and responsive UI with theme support that respects system preferences.
- **Undo/Redo Support**: Easily undo or redo changes in the prompt input field.
- **Prompt History**: Automatically saves a history of your optimized prompts to local storage for later review and reuse.
- **Inspiration Section**: Includes a set of example prompts to help new users get started quickly.
- **Copy to Clipboard**: Easily copy the final optimized prompt.
- **Modern UI/UX**: Features an animated gradient background, glassmorphism effects, and subtle animations for a premium user experience.
- **Specific Error Handling**: Provides clear feedback for common API errors, such as a missing or invalid API key.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`@google/genai`)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Because this project is configured to run in a web-based IDE using import maps, you don't need to install Node.js or `npm` to run it. You only need a modern web browser and a code editor.

To run it on your local machine outside of a specialized IDE, you will need a simple way to serve the static files. The easiest method is using `npx serve`.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/prompt-perfect-ai.git
    cd prompt-perfect-ai
    ```

2.  **Configure your API Key:**
    The application requires a Google Gemini API key to function. You must provide this key as an environment variable.

    - Create a new file named `.env` in the root of your project directory.
    - Add your API key to the `.env` file like this:
      ```
      API_KEY=YOUR_GEMINI_API_KEY_HERE
      ```
    - **Important**: The application code is designed to read this key from `process.env.API_KEY`. You must ensure your development or deployment environment makes this variable available. Do not hardcode your key in the source code.

## Running the Application

This project is a static web application and does not require a complex build process. You just need to serve the `index.html` file.

1.  **Open with Live Server:**
    If you are using a code editor like VS Code, you can install the "Live Server" extension, right-click on `index.html`, and choose "Open with Live Server".

2.  **Use a Simple HTTP Server:**
    If you have Node.js installed, you can use the `serve` package to start a local server.
    ```bash
    # If you don't have 'serve' installed globally, you can run it with npx
    npx serve
    ```
    This will start a server and give you a local URL (like `http://localhost:3000`) that you can open in your browser.

## Testing

There are no automated tests in this project. You can perform manual testing by following this checklist:

- [ ] **API Connection**: Enter a prompt and click "Optimize Prompt". Verify that you get a result.
- [ ] **Error Handling**:
    - [ ] Temporarily remove the API key from your `.env` file and try to optimize. Verify the "API Key Not Configured" error appears.
    - [ ] Use an invalid API key and verify the "API key is invalid" error appears.
- [ ] **Functionality**:
    - [ ] Test each of the five "Optimization Styles".
    - [ ] Type in the prompt box and test the "Undo" and "Redo" buttons.
    - [ ] Click the "Copy" icon on the result card and verify the prompt is copied to your clipboard.
- [ ] **Inspiration & History**:
    - [ ] In the "Inspiration" tab, click "Use this Example" on a card. Verify the prompt and style are loaded into the input fields.
    - [ ] After optimizing a few prompts, go to the "History" tab. Verify the history items are listed.
    - [ ] Click "Reuse" on a history item. Verify it loads into the input fields.
    - [ ] Click "Clear All" to ensure the history is wiped.
- [ ] **UI & Theme**:
    - [ ] Click the sun/moon icon in the header to toggle between light and dark modes.
    - [ ] Verify all components are styled correctly in both themes.
    - [ ] Resize your browser window to ensure the layout is responsive.

## Deployment

This is a static application, so you can deploy it to any static hosting service.

### General Steps

1.  **Build Your Project**: Since there's no build step, your project folder containing `index.html` and other assets is ready for deployment.
2.  **Choose a Host**: Popular free options include Netlify, Vercel, and GitHub Pages.
3.  **Deploy**:
    - **Netlify**: Drag and drop your project folder into the Netlify dashboard.
    - **Vercel/GitHub Pages**: Follow their documentation for deploying a static site.
4.  **Add Environment Variable**:
    - This is the most important step. In your hosting provider's dashboard (e.g., Netlify, Vercel), find the settings for "Environment Variables".
    - Add a new variable with the key `API_KEY` and paste your Google Gemini API key as the value.
    - Re-deploy your site if necessary for the variable to take effect. This ensures your API key remains secure and is not exposed in the frontend code.
