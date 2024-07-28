# GameHub

A feature-rich online streaming platoform built using modern web technologies. This project replicates the core functionalities of Twitch, including authentication, live streaming, chat, managing the community.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- User authentication (Sign up, Login, Logout)
- Live streaming with real-time chat functionality
- Browse and search streams of other users and join their stream.
- User profile navigation and their streams.
- Follow and unfollow streamers.
- Streamer dashboards for representing their stream in a convenient manner. 


## Tech Stack

- **Authentication:** Clerk
- **Frontend:** Next.js, Tailwind CSS, ShadcnUI.
- **Backend:** Next.js (server actions).
- **Global state management:** Zustand.
- **Streaming:** Livekit.
- **File Upload:** UploadThings.
- **ORM:** Prisma.
- **Database:** Postgresql.
- **Deployment:** Vercel.

## Installation

### Prerequisites

- Node.js (version - v20.13.1 or latest)
- LiveKit
- Postgresql


### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= <get it from clerk after signing up>
CLERK_SECRET_KEY= <get it from clerk after signing up>
NEXT_PUBLIC_CLERK_SIGN_IN_URL= <redirection to route where user can sign in (eg. /sign-in)>
NEXT_PUBLIC_CLERK_SIGN_UP_URL= <redirection to route after user logs out (eg. /sign-out)>
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=  <redirection to root route (eg. /)>
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=  <redirection to root route after (eg. /)>
WEBHOOK_SECRET= <get it from clerk webhook>


DATABASE_URL= <your postgresql db url>


LIVEKIT_API_URL= <get it from livekit after signing up>
LIVEKIT_API_KEY= <get it from livekit after signing up>
LIVEKIT_API_SECRET= <get it from livekit after signing up>
NEXT_PUBLIC_LIVEKIT_WS_URL= <get it from livekit after signing up>


UPLOADTHING_SECRET=sk_live_b4acea5c384fb6067e1a249a565335743bf780f0220cefb1d60cd8ae86d295ff
UPLOADTHING_APP_ID=shbkxqoqek

```

### Run it locally

```bash
# Clone the repository

https://github.com/Akshat-Jaiswal-8/GameHub.git
cd GameHub

# Install Dependencies

npm install

# Accessing the Application

npm run dev

# Port for accessing the application

http://localhost:3000
```
## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## Contact

Akshat Jaiswal - [akshatjaiswal.official@gmail.com](mailto:akshatjaiswal.official@gmail.com)

Project Link: [https://github.com/Akshat-Jaiswal-8/GameHub](https://github.com/Akshat-Jaiswal-8/GameHub)

