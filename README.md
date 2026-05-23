# YouTube Videos Listing UI (React + Vite)

A React + Vite application that fetches and displays a grid of YouTube videos using the FreeAPI YouTube videos endpoint.

## Features
- Fetch and display YouTube videos in a responsive grid
- Shows loading state while videos are being fetched
- Displays thumbnail, title, channel name, and basic statistics
- (Planned/Requested improvements) Pagination / Load more
- (Planned/Requested improvements) Click a video card to redirect/open the video on YouTube

## Tech Stack
- React
- Vite
- TailwindCSS

## Setup
1. Install dependencies
   - Using npm: `npm install`
   - Or using pnpm: `pnpm install`
2. Start the development server
   - `npm run dev`
   - or `pnpm dev`
3. Open the shown local URL in your browser.

## Project Scripts
- `dev` - start dev server
- `build` - build for production
- `lint` - run ESLint
- `preview` - preview production build

## API
This app fetches videos from:
- `https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10`

## Notes
- If the API response structure changes, you may need to adjust how the component reads data (currently uses `data?.data?.data`).




