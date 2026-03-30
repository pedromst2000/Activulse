<div align="center" id="top">
  <img src="./images/Logo.png" width="600" alt="activulse-logo">
  <br/>
    <br/>
  <p>
    "
    Empowering Heart Health and Wellness in Every Step with Activulse
  "
  </p>
    
  <span>Final College Project | [ESMAD](https://www.esmad.ipp.pt/?set_language=en) </span>
</div>

## Table of Contents

- [:bulb: About](#bulb-about)
- [:video_camera: Demo Video](#video_camera-demo-video)
- [:art: UI Preview](#art-ui-preview)
  - [Poster](#poster)
- [:computer: Tech Stack](#computer-tech-stack)
- [:construction_worker_man: Architecture and Data Model](#construction_worker_man-architecture-and-data-model)
  - [Application Architecture](#application-architecture)
  - [Database Model](#database-model)
- [:rocket: Getting Started](#rocket-getting-started)
- [:writing_hand: Documentation and Deploy](#writing_hand-documentation-and-deploy)
  - [Report](#report)
  - [Live API](#live-api)
- [:writing_hand: Final Reflections](#writing_hand-final-reflections)

## :bulb: About

Activulse was my bachelor’s degree final project at **[ESMAD](https://www.esmad.ipp.pt/?set_language=en)** for the **[TSIW](https://www.esmad.ipp.pt/courses/degree/663)** program. It is a cross-platform [React Native](https://reactnative.dev/) app focused on heart health and daily activity tracking, supported by a RESTful backend, database integration, and a layered architecture.

The project combines product design, mobile development, backend engineering, and data modeling. It was also developed alongside **[thesis](https://app.luminpdf.com/viewer/69c331e265663ae8f32d2968)** and academic research work with a professor from [ESS](https://www.ess.ipp.pt/) to define the problem, validate the goals, and keep the implementation aligned with the academic requirements.

Beyond the technical scope, Activulse was built to turn a public-health topic into a practical and engaging experience: step tracking, activity goals, wellness guidance, and challenge-based motivation in a single app.

## :video_camera: Demo Video

<div align="center">
  <p>
    <a href="https://www.youtube.com/watch?v=8yQINRjBj68" target="_blank" rel="noopener noreferrer">
      <img src="https://img.youtube.com/vi/8yQINRjBj68/0.jpg" alt="Activulse Demo Video" width="800" />
    </a>
  </p>
  <p>
    <a href="https://www.youtube.com/watch?v=8yQINRjBj68" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/Watch_on-YouTube-red?logo=youtube&logoColor=white&style=for-the-badge" alt="Watch on YouTube" />
    </a>
  </p>
</div>

## :art: UI Preview

<div align="center">
  <p>
 <br>
    <a href="https://www.behance.net/gallery/234041863/Activulse-App" target="_blank" rel="noopener noreferrer">
      <img src="./images/UI_preview.png" alt="Activulse UI Preview" width="800" />
    </a>
  </p>
  <p>
    <a href="https://www.behance.net/gallery/234041863/Activulse-App" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/View_Full_Gallery-Behance-1769FF?style=for-the-badge&logo=behance&logoColor=white" alt="View on Behance" />
    </a>
  </p>
</div>

### Poster

The poster was designed to present the app's identity and goals at a glance, highlighting the main features, the core tools used, and the UI mockups that define the visual direction of Activulse. It is available for download on Google Drive.

[![Download the poster on Google Drive](https://img.shields.io/badge/Poster-Google_Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white)](https://drive.google.com/file/d/1b5V4QSS77OdXd-iGIB4Y6VQ3tA1iDuYQ/view?usp=sharing)

## :computer: Tech Stack

The stack was chosen to support a clean cross-platform UI, a typed codebase, and a secure backend with structured persistence.

### Frontend

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=tanstackquery&logoColor=white)](https://tanstack.com/query/latest)
[![NativeWind](https://img.shields.io/badge/NativeWind-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://www.nativewind.dev/)
[![Lottie](https://img.shields.io/badge/Lottie-1C1C1C?style=for-the-badge&logo=lottiefiles&logoColor=E74C3C)](https://lottiefiles.com/)

- **Expo** and **React Native** power the mobile experience.
- **React** and **TypeScript** keep the UI predictable and maintainable.
- **React Query** handles server state and data synchronization.
- **NativeWind** provides utility-first styling across the app.
- **Lottie** is used for the splash screen animation and motion details.

### Web Client

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

- **Vite** keeps the web client fast and lightweight.
- **React Router** organizes the navigation flow.

### Quality & Tooling

[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)

- **ESLint** enforces code quality and consistency.
- **Prettier** keeps formatting aligned across the repository.

### Backend, Auth & Data

[![Express](https://img.shields.io/badge/Express-111827?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![bcrypt](https://img.shields.io/badge/bcrypt-0F172A?style=for-the-badge&logo=owasp&logoColor=white)](https://github.com/kelektiv/node.bcrypt.js)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![MySQL2](https://img.shields.io/badge/mysql2-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.npmjs.com/package/mysql2)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

- **Express** powers the REST API.
- **JWT** and **bcrypt** handle secure authentication.
- **Swagger** exposes the API documentation.
- **MySQL2** and **Sequelize** manage persistence and data access.
- **Cloudinary** stores and serves media assets.

## :construction_worker_man: Architecture and Data Model

The project is organized around a layered backend and a separate data model that documents the database relationships.

### Application Architecture

The application follows a simple flow:

- Models handle persistence logic through Sequelize.
- Controllers expose the business logic through Express.
- Views render the React Native interface.

[![Application Architecture](https://img.shields.io/badge/Application_Architecture-111827?style=for-the-badge&logo=visualstudiocode&logoColor=007ACC)](./images/Architecture.png)

![Application Architecture](./images/Architecture.png)

### Database Model

The database model is shown as a DER preview so the main entities and relationships stay readable at a glance.

<div align="center">
  <p>
  <br>
    <a href="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000FF&edit=_blank&layers=1&nav=1&title=ActivulseDB.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1C0cQEVIfZPICy71SqsGCnoju2ym_0VQ-%26export%3Ddownload" target="_blank" rel="noopener noreferrer">
      <img src="./images/DB_Preview.png" alt="Activulse Database Model Preview" width="800" />
    </a>
  </p>
  <p>
    <a href="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000FF&edit=_blank&layers=1&nav=1&title=ActivulseDB.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1C0cQEVIfZPICy71SqsGCnoju2ym_0VQ-%26export%3Ddownload" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/View_Full_Model-Draw.io-FF6F00?style=for-the-badge&logo=diagramsdotnet&logoColor=white" alt="View on Draw.io" />
    </a>
  </p>
</div>

## :rocket: Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)\* (at least 18.18.0)
- [NPM](https://www.npmjs.com/)\* (at least 10.8.2)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)\*

* To run locally, you will need a MySQL database running on your machine or remotely on port 3306. Update the credentials in each `.env` file before starting the project.

* You need **Expo CLI** installed on your machine. You can install it by running the following command:

```sh
npm install -g expo-cli
```

- To run the app on your phone, you will need to have the `Expo Go` app installed on your phone. You can download it from the [App Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US). Scan the QR code generated by the `npm start` command to run the app on your phone.

- To run the app on an emulator, you will need to have the Android Studio installed on your machine. You can download it from the [Android Studio website](https://developer.android.com/studio). Check out [React Native Setup](https://reactnative.dev/docs/set-up-your-environment) for more information on how to set up your environment to run the app on an emulator.

### Installation

#### Automated (experimental)

1. Clone the repo

2. Run the setup script (use the correct script for your OS)

##### Linux or MacOS

```sh
chmod +x ./scripts/setup-project.sh && ./scripts/setup-project.sh
```

##### Windows

```sh
./scripts/setup-project.bat
```

3. Create a `.env` file in the following directories:

- `/Packages/Api`
- `/Packages/App`
- `/Packages/Web`

Follow the `.env.example` file in each directory to fill in the required environment variables.

4. Run the project (use the correct script for your OS)

##### Linux

```sh
chmod +x ./scripts/start-project.sh && ./scripts/start-project.sh
```

If you get an error saying that a command was not found, edit the `start-project.sh` file and add your current terminal to the list of terminals (line 3).

###### Example

```sh
local terminals=("x-terminal-emulator" "gnome-terminal" "konsole" "YourTerminal")
```

To find out the name of your terminal, run the following command:

```sh
ps -p $(ps -p $$ -o ppid=) -o comm=
```

##### MacOS

```sh
chmod +x ./scripts/macos-start-project.sh && ./scripts/macos-start-project.sh
```

##### Windows

```sh
./scripts/start-project.bat
```

#### Manual

1. Clone the repo

2. Install NPM packages

```sh
cd Packages/Api
npm install

cd ../App
npm install

cd ../Web
npm install


```

3. Create a `.env` file in the following directories:

- `/Packages/Api`
- `/Packages/App`
- `/Packages/Web`

Follow the `.env.example` file in each directory to fill in the required environment variables.

4. Reset the database

```sh
cd Packages/Api
npm run reset-db
```

5. Start the API

```sh
cd Packages/Api
npm run dev
```

6. Start the app

```sh
cd Packages/App
npm start
```

7. Start the Web Client

```sh
cd Packages/Web
npm run dev
```

## :writing_hand: Documentation and Deploy

### Report

[![Academic Report](https://img.shields.io/badge/Report-LuminPDF-6B7280?style=for-the-badge&logo=readthedocs&logoColor=white)](https://app.luminpdf.com/viewer/69c331e265663ae8f32d2968)

### Live API

| Resource | Link | Status |
|---|---|---|
| Base URL | [![Base URL](https://img.shields.io/badge/Base_URL-Render-030373?style=flat-square&logo=render&logoColor=white)](https://activulse.onrender.com/api-activulse/v1) | [![needs review](https://img.shields.io/badge/needs_review-DC2626?style=flat-square)](https://activulse.onrender.com/api-activulse/v1) |
| API Docs (Swagger) | [![API Docs](https://img.shields.io/badge/Swagger_Docs-Render-030373?style=flat-square&logo=swagger&logoColor=white)](https://activulse.onrender.com/api-activulse/v1/docs) | [![needs review](https://img.shields.io/badge/needs_review-DC2626?style=flat-square)](https://activulse.onrender.com/api-activulse/v1/docs) |

## :writing_hand: Final Reflections

Activulse is the kind of project that only works when design, backend structure, and academic rigor move together. It started as a degree requirement and ended up as a complete product story, which is the part I value most.

The main challenge was researching a complex health domain and turning that knowledge into an app that met the project requirements without introducing implementation mistakes. That process demanded constant validation to ensure the features aligned with the research and with the intended scope.

More than delivering a final project, this work became a practical exercise in growth. It pushed me to learn a new area, strengthen my technical judgment, and understand how much careful research matters when building software for health.

<p align="center">
 <a href="#top">Back to top</a>
</p>
