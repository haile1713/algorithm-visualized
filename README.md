# Algorithms Visualized

This project is an interactive web application that visualizes various sorting algorithms with adjustable settings like speed and comparisons. It uses p5.js for visual rendering, and it allows users to experience how different algorithms behave in real-time.

## Project Structure

-  **index.html**: The main HTML file that serves as the entry point to the application.
-  **main.ts**: The main TypeScript file where the core logic for the application resides.
-  **style.css**: Styling file that uses Tailwind CSS for easy layout and design customization.
-  **vite.config.js**: Configuration file for Vite, the build tool being used in this project.
-  **postcss.config.js**: Configuration file for PostCSS to handle stylesheets.
-  **tailwind.config.js**: Tailwind CSS configuration file.
-  **tsconfig.json**: TypeScript configuration file for defining compiler options.
-  **algorithms**: Contains the TypeScript files implementing various sorting algorithms like Bubble Sort, Insertion Sort, and Selection Sort.
-  **utils**: Contains utility functions that assist in algorithm implementation and rendering.
-  **tests**: Includes unit tests for the sorting algorithms using TypeScript.

## Features

-  Visualization of popular sorting algorithms (Bubble Sort, Insertion Sort, Selection Sort).
-  Adjustable speed of the visualizations.
-  Sound effects and audio feedback for comparisons and swaps.
-  Interactive user interface with controls to mute sounds, reset, and adjust speed.

## screenshoots

![image](https://github.com/user-attachments/assets/6d6e2904-6a9a-4b85-85f0-f8722df5aa18)
![image](https://github.com/user-attachments/assets/d0da1d76-eab8-4efd-8494-0075685b5ecf)

## Live Demo 

https://algorithm-visualized.vercel.app/


## Setup and Installation

1. **Install dependencies:**
   Make sure you have [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/) installed. If you're using `npm`, first install the dependencies:

   ```bash
   npm install
   ```

   Alternatively, for Bun:

   ```bash
   bun install
   ```

2. **Run the development server:**
   You can run the development server locally:

   ```bash
   bun run dev
   ```

   or

   ```bash
   npm run dev
   ```

3. **Build for production:**
   To create a production-ready build:

   ```bash
   bun run build
   ```

   or

   ```bash
   npm run build
   ```

4. **Preview the build locally:**
   After building, you can preview it locally:
   ```bash
   bun run preview
   ```

## Technologies Used

-  **Vite**: Build tool for fast development and bundling.
-  **Tailwind CSS**: Utility-first CSS framework for styling.
-  **p5.js**: JavaScript library for creating graphic and interactive experiences.
-  **TypeScript**: Typed superset of JavaScript to improve code quality.
-  **Bun**: Alternative JavaScript runtime used in this project.
-  **PostCSS**: CSS post-processor to handle Tailwind styles.

## Deployment

The project can be deployed on any static web hosting platform (e.g., Netlify, Vercel). Make sure to set the correct publish directory (`dist/`) and run the build command as mentioned in the setup.

---



## License

This project is licensed under the MIT License. See the LICENSE file for more information.
