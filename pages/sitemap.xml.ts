import { GetServerSideProps } from 'next';


const createSitemap = (routes: string[], baseUrl: string) => {
  const sitemapEntries = routes.map((route) => {
    const url = `${baseUrl}${route}`;
    const lastModified = new Date().toISOString(); // You can set the actual last modified date here

    return `
        <url>
          <loc>${url}</loc>
          <lastmod>${lastModified}</lastmod>
        </url>
      `;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapEntries.join('')}
      </urlset>
    `;

  return sitemapXml;
};

const Sitemap: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const baseUrl = `https://zigment.ai`;
  const allRoutes = [
    '/'
  ]
  const sitemapXml = createSitemap(allRoutes, baseUrl);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemapXml);
  res.end();

  return { props: {} };
};

export default Sitemap;
