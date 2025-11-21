# How to Deploy "Must watch" to the Internet

The easiest and best way to deploy a Next.js application is using **Vercel** (the creators of Next.js).

## Prerequisites
I have already initialized a local Git repository for you. You now need to push this to **GitHub**.

1.  **Create a GitHub Repository**:
    -   Go to [GitHub.com](https://github.com) and sign in.
    -   Click the **+** icon and select **New repository**.
    -   Name it `must-watch` (or similar).
    -   Make it **Public** or **Private**.
    -   **Do not** initialize with README, .gitignore, or License (we already have these).
    -   Click **Create repository**.

2.  **Push Your Code**:
    -   Copy the commands under "…or push an existing repository from the command line".
    -   Run them in your terminal (VS Code terminal). They will look like this:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/must-watch.git
        git branch -M main
        git push -u origin main
        ```

## Deploying on Vercel

1.  **Sign Up / Login**:
    -   Go to [vercel.com](https://vercel.com).
    -   Sign up using your **GitHub** account.

2.  **Import Project**:
    -   On your Vercel dashboard, click **Add New...** > **Project**.
    -   Select your `must-watch` repository from the list.
    -   Click **Import**.

3.  **Configure Project**:
    -   **Framework Preset**: Next.js (should be auto-detected).
    -   **Root Directory**: `./` (default).
    -   **Environment Variables** (IMPORTANT):
        -   Expand the "Environment Variables" section.
        -   Add the following variable:
            -   **Key**: `NEXT_PUBLIC_TMDB_API_KEY`
            -   **Value**: `5527de32d13fa3654f030f7818f98fb2`
        -   Click **Add**.

4.  **Deploy**:
    -   Click **Deploy**.
    -   Wait for the build to complete (about 1-2 minutes).

## Success!
Once finished, you will get a live URL (e.g., `must-watch.vercel.app`) that you can share with anyone.

## Updating the Site
Whenever you make changes:
1.  Run `git add .`
2.  Run `git commit -m "Description of changes"`
3.  Run `git push`
Vercel will automatically detect the push and redeploy your site!
