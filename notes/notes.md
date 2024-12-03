Create next.js project with the following

``` bash
npx create-next-app@latest
```

Answer the following options.

``` bash
➜ npx create-next-app@latest
✔ What is your project named? client
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like your code inside a `src/` directory? Yes
✔ Would you like to use App Router? (recommended) Yes
✔ Would you like to use Turbopack for next dev? No
✔ Would you like to customize the import alias (@/* by default)? No
```

Once the initial project is created, let's set up an instance of Strapi.
``` bash
npx create-strapi-app@latest
```
We will select the following options:

``` bash
 Strapi   v5.4.0 🚀 Let's create your new project

? What is the name of your project? server
? Please log in or sign up to Strapi Cloud? Skip
? Please log in or sign up. Skip
? Do you want to use the default database (sqlite) ? Yes
? Start with an example structure & data? No
? Start with Typescript? Yes
? Install dependencies with npm? Yes
? Initialize a git repository? No
```

Nice now that we have both projects created, we can start working on the integration.

Intro to Figma Ask Nik for the videos.
14. What is Figma and how to use it? ( get the figma file from Nik)
   
Ask Nik for the videos regarding the Figma or have him record a new video doing a walkthrough on the Figma file.

## Next.js Base Setup

``` bash
  npx create-next-app@latest
```

Add the sass folder to the project with the attached file.

Finally, add the sass extension via this command:
``` bash
yarn add sass
```

## Creating The Header






## Fetching Data From Strapi

``` ts
type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: any;
  next?: NextFetchRequestConfig;
}

export async function fetchAPI(url: string, options: FetchAPIOptions) {
  const { method, authToken, body, next } = options;

  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, headers);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json") && response.ok) {
      return await response.json();
    } else {
      return { status: response.status, statusText: response.statusText };
    }
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    throw error;
  }
}
```