# GSheet Waitlist

A simple waitlist page connected to Google Sheets - Add link, add script to gsheet and go.

## Setup Instructions

### Step 1: Google Sheets Setup

a. Create a new Google Sheet. name the column on the first row as "email" and second column on the first row as "date" [No Caps].

b. Click extensions and click APP Scripts

c. Copy this code and paste it into the script window (Delete whatever ctrl A + Delete)

```javascript
function doPost(e) {
  // Set CORS headers
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight requests
  if (e.parameter.method === 'OPTIONS') {
    return ContentService.createTextOutput()
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }

  // Your existing code here
  var email = JSON.parse(e.postData.contents).email;
  
  // Add the email to your spreadsheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([email, new Date()]);
  
  // Return success response with CORS headers
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}
```

d. Click deploy -> New Deployment

e. Click the little settings icon next to select type -> Web App

f. Configuration -> Add a Description, Execute as "Your Account", Who has Accesss "Anyone"

g. Hit Deploy 

h. Grab the Web App Url for Step 2

> **Note:** If stuck on unable to login on "f", for access set "yourself" -> login -> change access to "Anyone"

### Step 2: Local Development Setup

Clone this repo into wherever you need to / For local dev testing 

a. Create `.env.local` file

b. Add this in the file:
```bash
GOOGLE_SCRIPT_URL="Your Web App URL here"
```

c. Save and run your dev server and start testing

### Step 3: Production Deployment

a. To run this on the server of vercel. Deploy your app. 

b. Navigate to settings of your project / deployment, Environment Variables -> Add your GOOGLE_SCRIPT_URL and "Your Web App URL" in the relevant columns. 

c. Hit Save

# Done. Go go go!

---

## Quick Start

The point of this codebase is to get you running with a waitlist in 5 mins. Clone this repo to your directory.

### Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
