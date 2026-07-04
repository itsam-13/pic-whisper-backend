# Pic Whisper Backend

A simple backend for an image captioning app that combines user authentication, image uploads, ImageKit storage, and AI-powered caption generation.

## What it does

- Registers and logs in users with username/password
- Stores auth tokens in secure cookies
- Accepts image uploads via a multipart form
- Uploads images to ImageKit
- Generates a caption for each image using Google Gemini
- Saves the generated post metadata to MongoDB

## Technologies

- Node.js
- Express 5
- MongoDB + Mongoose
- ImageKit (`@imagekit/nodejs`)
- Google GenAI (`@google/genai`)
- Multer
- JSON Web Tokens
- bcryptjs
- dotenv

## Project structure

- `server.js` — application entry point
- `src/app.js` — Express app setup
- `src/db/db.js` — MongoDB connection
- `src/routes/auth.routes.js` — auth routes
- `src/routes/post.routes.js` — post upload route
- `src/controller/auth.controller.js` — register/login logic
- `src/controller/post.controller.js` — image upload and caption creation
- `src/services/storage.service.js` — ImageKit upload helper
- `src/services/ai.service.js` — Gemini caption generation
- `src/model/user.model.js` — user schema
- `src/model/post.model.js` — post schema
- `src/middleware/auth.middleware.js` — cookie auth middleware

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root with these values:
   ```env
   MONGODB_URL=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   GEMINI_API_KEY=<your-google-gemini-api-key>
   IMAGEKIT_PUBLIC_KEY=<your-imagekit-public-key>
   IMAGEKIT_PRIVATE_KEY=<your-imagekit-private-key>
   IMAGEKIT_URL_ENDPOINT=<your-imagekit-url-endpoint>
   ```
4. Start the server:
   ```bash
   node server.js
   ```

The server listens on port `3000` by default.

## API Endpoints

### Register

- URL: `POST /api/auth/register`
- Body (JSON):
  ```json
  {
    "username": "yourusername",
    "password": "yourpassword"
  }
  ```
- Response:
  - `201 Created` with user data and a cookie named `token`

### Login

- URL: `POST /api/auth/login`
- Body (JSON):
  ```json
  {
    "username": "yourusername",
    "password": "yourpassword"
  }
  ```
- Response:
  - `203 Non-Authoritative Information` with user info and a cookie named `token`

### Create Post (Upload Image)

- URL: `POST /api/posts`
- Headers:
  - `Content-Type: multipart/form-data`
- Body:
  - `image` — file field containing the image to upload
- Authentication:
  - Requires the `token` cookie set by login/register
- Response:
  - `201 Created` with generated caption and ImageKit upload result

## Postman testing

1. Register or login first
2. Capture the returned cookie or use Postman cookie jar
3. Send a `POST /api/posts` request
4. Use `form-data` and set the key to `image`
5. Upload a valid image file

## Notes

- The upload route uses `multer` in memory storage and sends raw file bytes to ImageKit.
- The caption is generated from the image via the Gemini model.
- Saved post documents include the image URL and caption.

## Troubleshooting

- `401 Unauthorized`: your request is missing the auth cookie, or the token is invalid
- `ImageKit upload failed`: verify your `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, and `IMAGEKIT_URL_ENDPOINT`
- `MongoDB connection error`: verify `MONGODB_URL`

