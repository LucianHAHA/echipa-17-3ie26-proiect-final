import { useQuery } from "@tanstack/react-query";
import { strapiGet, ListResponse, SingleResponse, Article, Category, AboutAttributes } from "@/lib/strapi";

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => strapiGet<ListResponse<Article>>("/articles"),
  });
}

export function useArticle(idOrSlug: string) {
  return useQuery({
    queryKey: ["article", idOrSlug],
    queryFn: async () => {
      // If it's a number, fetch by ID, else by slug
      if (/^\d+$/.test(idOrSlug)) {
        return strapiGet<SingleResponse<Article>>(`/articles/${idOrSlug}`);
      }
      
      const res = await strapiGet<ListResponse<Article>>("/articles", {
        "filters[slug][$eq]": idOrSlug,
      });
      
      if (!res.data.length) throw new Error("Article not found");
      return { data: res.data[0] };
    },
    enabled: !!idOrSlug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => strapiGet<ListResponse<Category>>("/categories"),
  });
}

export function useCategory(idOrSlug: string) {
  return useQuery({
    queryKey: ["category", idOrSlug],
    queryFn: async () => {
      let categoryId = idOrSlug;
      
      if (!/^\d+$/.test(idOrSlug)) {
        const res = await strapiGet<ListResponse<Category>>("/categories", {
          "filters[slug][$eq]": idOrSlug,
        });
        if (!res.data.length) throw new Error("Category not found");
        categoryId = res.data[0].id.toString();
      }
      
      return strapiGet<SingleResponse<Category>>(`/categories/${categoryId}`, {
        "populate[articles][populate]": "*",
      });
    },
    enabled: !!idOrSlug,
  });
}

export function useAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => strapiGet<SingleResponse<AboutAttributes>>("/about"),
  });
}
