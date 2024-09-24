# ApolloLironRecs

ApolloLironRecs is a web application dedicated to music recommendations, designed to assist users in discovering exceptional tracks across various genres. This project utilizes the Spotify API to offer personalized track suggestions tailored to user-selected genres.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology & Architecture](#technology--architecture)
- [Core Algorithms](#core-algorithms)
- [Learnings](#learnings)
- [Team](#team)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

ApolloLironRecs was born from my love for music and the ambition to create a seamless platform for discovering new tracks. I dedicated my time to craft an intuitive application that delivers top-notch music recommendations.

## Features

- Explore tracks across a variety of genres.
- Choose your preferred genres to receive tailored recommendations.
- Access detailed track information and listen via Spotify.

## Technology & Architecture

ApolloLironRecs employs a contemporary tech stack to ensure a smooth and efficient user experience:

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Python, Flask
- **APIs:** Spotify API for music data

## Core Algorithms

The recommendation system of ApolloLironRecs incorporates sophisticated algorithms to analyze user preferences and generate personalized music suggestions. The main algorithm consists of:

1. Retrieving user-selected genres.
2. Requesting recommendations from the Spotify API based on the chosen seed genres.
3. Filtering and ranking tracks to align with user preferences.

## Learnings

Working on ApolloLironRecs enhanced my capabilities in full-stack development, API integration. I gained a deeper insight into music recommendation systems and refined our skills in managing both technical and non-technical challenges.

## Team

- **Yididia Abera**

## Installation

To set up ApolloLironRecs locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yididiabera/ApolloLironRecs.git

   ```

2. Navigate to the project directory:
   ```bash
   cd ApolloLironRecs
   ```
3. Install the Frontend dependencies:
   ```bash
   npm install
   ```
4. Install the backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add your Spotify API credentials and other required environment variables.

6. Start the backend development server:

   ```bash
   cd backend
   python -m api.v1.app
   ```

7. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Sign in using your Spotify account.
3. Select your favorite genres.
4. Explore the recommended tracks and add them to your playlists.

## Contributing

I welcome contributions to ApolloLironRecs! If you have ideas for new features or improvements, please open an issue or submit a pull request. Follow the contributing guidelines for more information.

## License

ApolloLironRecs is licensed under the MIT License. See the LICENSE file for more details.
