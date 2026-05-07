import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zerotowealthpro.com';
  
  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    
    // Main Pages
    {
      url: `${baseUrl}/debt-payoff`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/financial-utilities`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    
    // Static Pages
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/about/editorial-team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    
    // Blog Posts (add all your existing posts)
    {
      url: `${baseUrl}/blog/debt-snowball-vs-debt-avalanche`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/minimum-payment-trap-explained`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/best-budgeting-apps-for-debt-payoff`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-long-to-pay-off-50k-credit-card-debt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-pay-off-debt-fast`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/credit-card-interest-explained`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/invest-or-pay-off-debt-first`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-much-does-extra-100-save`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/psychology-of-paying-off-debt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-stop-using-credit-cards`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-use-debt-payoff-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-stop-living-paycheck-to-paycheck`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/zero-paycheck-budget-method`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-build-emergency-fund-on-low-income`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-reset-your-finances-in-30-days`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-get-out-of-debt-on-low-income`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/credit-card-debt-forgiveness`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-get-lower-interest-rate-credit-card`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-budget-with-irregular-income`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-save-1000-fast`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-rebuild-credit-after-debt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/balance-transfer-cards-when-they-help`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/what-order-to-pay-off-debts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-get-out-of-payday-loan-debt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/5-mistakes-keeping-you-stuck-broke`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/budgeting-when-youre-broke`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/the-complete-debt-payoff-system`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    
    // Financial Utilities (add as you create them)
    {
      url: `${baseUrl}/financial-utilities/compound-interest`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/financial-utilities/mortgage-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/financial-utilities/loan-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Add more calculator pages as you create them
  ];
}



























// import { MetadataRoute } from "next";
// import { getAllPosts } from "@/lib/blog";

// export default function sitemap(): MetadataRoute.Sitemap {
//   const posts = getAllPosts();

//   // 🔷 Static pages
//   const staticPages: MetadataRoute.Sitemap = [
//     {
//       url: "https://zerotowealthpro.com",
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 1.0,
//     },
//     {
//       url: "https://zerotowealthpro.com/about",
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.8,
//     },
//     {
//       url: "https://zerotowealthpro.com/blog",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.9,
//     },
//     {
//       url: "https://zerotowealthpro.com/contact",
//       lastModified: new Date(),
//       changeFrequency: "yearly",
//       priority: 0.5,
//     },
//     {
//       url: "https://zerotowealthpro.com/debt-payoff",
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.9,
//     },
//     {
//       url: "https://zerotowealthpro.com/calculator",
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.8,
//     },
//   ];

//   // 🔷 Dynamic blog posts — auto-generated from getAllPosts()
//   const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
//     url: `https://zerotowealthpro.com/blog/${post.slug}`,
//     lastModified: post.date ? new Date(post.date) : new Date(),
//     changeFrequency: "monthly",
//     priority: 0.7,
//   }));

//   return [...staticPages, ...blogPages];
// }