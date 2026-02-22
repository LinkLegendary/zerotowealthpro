1. Adding Affiliate Links
In your MDX articles, just use regular markdown links but add rel attributes:
mdx## Tools That Help

Track your progress with [YNAB](https://www.youneedabudget.com/?ref=your-affiliate-id){:rel="nofollow sponsored"} or try [Undebt.it](https://undebt.it/?ref=your-id){:rel="nofollow sponsored"} for debt-specific tracking.

*Disclosure: Some links on this page are affiliate links, which means we may earn a small commission if you make a purchase. This helps keep the site running at no extra cost to you.*
For regular links (not MDX), use this pattern in React components:
typescript<a 
  href="https://example.com/product?ref=your-id"
  target="_blank"
  rel="nofollow sponsored noopener"
  className="text-[#4472C4] hover:underline"
>
  Check out this tool →
</a>
The rel attributes matter for SEO and FTC compliance:

nofollow — tells Google not to pass ranking power to the affiliate link
sponsored — tells Google this is a paid/affiliate link (FTC requirement)
noopener — security best practice for external links


2. Affiliate Disclaimer
Create app/disclaimer/page.tsx:Affiliate disclaimer pageAffiliate disclaimer pagedisclaimer-page.tsxDone
3. Privacy Policy
Create app/privacy/page.tsx:Privacy policy pagePrivacy policy pageprivacy-page.tsxDone
4. Terms of Service
Create app/terms/page.tsx:Terms of service pageTerms of service pageterms-page.tsxDone
5. Add Footer Links
Update your homepage footer to include these pages:
typescript<div className="text-center text-white mt-12 opacity-80 text-sm">
  <div className="flex items-center justify-center gap-4 mb-2">
    <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
    <span>•</span>
    <Link href="/terms" className="hover:underline">Terms of Service</Link>
    <span>•</span>
    <Link href="/disclaimer" className="hover:underline">Affiliate Disclosure</Link>
  </div>
  <p>© 2026 Debt Freedom Guide</p>
</div>

6. In-Article Disclaimer Template
Add this at the top or bottom of articles with affiliate links:
mdx---
*Disclosure: This article contains affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you. We only recommend products we've personally used or thoroughly researched. Read our full [Affiliate Disclosure](/disclaimer).*
---
Presented 3 filesPresented 3 filesDoneSave these as:

app/disclaimer/page.tsx
app/privacy/page.tsx
app/terms/page.tsx

Legal compliance checklist:
✅ Use rel="nofollow sponsored" on all affiliate links (FTC requirement)
✅ Disclose affiliate relationships clearly in articles
✅ Link to full disclosure page in footer
✅ Privacy policy (required if you use analytics/cookies)
✅ Terms of service (protects you legally)
✅ "Not financial advice" disclaimer (critical for finance niche)
These pages protect you legally and build trust with readers.Disclaimer pageCode · TSX DownloadPrivacy pageCode · TSX DownloadTerms pageCode · TSX DownloadDownload all