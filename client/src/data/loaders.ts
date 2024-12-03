import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";

const BLOG_PAGE_SIZE = 6;
const BASE_URL = process.env.PUBLIC_API_URL || "http://localhost:1337";

const blogPopulate = {
  blocks: {
    on: {
      "blocks.hero-section": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          cta: true,
        },
      },
      "blocks.info-block": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          cta: true,
        },
      },
      "blocks.featured-article": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: true,
        },
      },
      "blocks.subscribe": {
        populate: true,
      },
      "blocks.heading": {
        populate: true,
      },
      "blocks.paragraph-with-image": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      "blocks.paragraph": {
        populate: true,
      },
      "blocks.full-image": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  },
};

export async function getGlobalSettings() {
  const path = "/api/global";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    populate: {
      header: {
        populate: {
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          navigation: true,
          cta: true,
        },
      },
      footer: {
        populate: {
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          navigation: true,
          policies: true,
        },
      },
    },
  });

  return fetchAPI(url.href, { method: "GET" });
}

export async function getHomePage() {
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    populate: blogPopulate,
  });

  return fetchAPI(url.href, { method: "GET" });
}

export async function getPageBySlug(slug: string) {
  const path = "/api/pages";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: blogPopulate,
  });

  return fetchAPI(url.href, { method: "GET" });
}

export async function getContent(path: string, query?: string, page?: string, featured?: boolean) {
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    sort: ["createdAt:desc"],
    filters: {
      $or: [
        { title: { $containsi: query } },
        { description: { $containsi: query } },
      ],
      ...(featured && { featured: { $eq: featured } }),
    },
    pagination: {
      pageSize: BLOG_PAGE_SIZE,
      page: parseInt(page || "1"),
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });

  return fetchAPI(url.href, { method: "GET" });
}

export async function getArticleBySlug(slug: string) {
  const path = "/api/articles";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
      ...blogPopulate,
    },
  });

  return fetchAPI(url.href, { method: "GET" });
}