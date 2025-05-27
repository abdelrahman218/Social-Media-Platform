# SocialConnect Frontend

## Overview
SocialConnect is a web-based social media platform designed for seamless digital communication, images sharing, and social engagement.

## Features
Based on the SocialConnect platform requirements, the frontend supports the following functionalities:
- **User Registration and Authentication**: Users can register with email and password.
- **Profile Management**: Users can create, edit, and delete profiles, including uploading profile pictures.
- **Content Creation and Interaction**: Users can create, edit, and delete posts (supporting images), comment on posts, and like posts.
- **Messaging System**: messaging interface for sending and receiving direct messages.
- **Friend Management**: Users can send, accept, and reject friend requests, and view friends.
- **Privacy Settings**: Customizable settings to control posts and profile privacy.
- **Search Functionality**: Interface to search for other users.
- **Responsive Design**: Cross-browser compatibility (Edge, Firefox, Safari, Chrome) with a maximum page load time of 2 seconds under normal conditions.

## Tech Stack
- **Framework**: Angular (19.1.3)
- **Styling**: SCSS with responsive design frameworks (e.g., Angular Material)
- **API Integration**: RESTful API calls to the backend
- **Version Control**: Git & GitHub

## Prerequisites
- Node.js (v16 or higher)
- Angular CLI (19.1.3)
- npm
  
## Installation
1. Clone the repository:
   ```powershell
   git clone https://github.com/abdelrahman218/Social-Media-Platform.git
   ```
2. Navigate to the project directory:
   ```powershell
   cd social-media-platform
   ```

3. Install dependencies:
   ```powershell
   npm install
   ```

4. Run the development server
   ```powershell
   ng serve
   ```
5. Access the application on http://localhost:4200/

## Development

-**Code Structure**: Follow Angular's modular architecture with components, services, and modules for each feature.
-**Maintainability**: Use TypeScript best practices and modular code.
-**Performance**: Ensure page load times are under 2 seconds, as per non-functional requirements.

## Deployment

Build the production version:

```powershell
    ng build --prod
```
Deploy the output to a web server (e.g., Nginx, Apache) or a hosting platform.
