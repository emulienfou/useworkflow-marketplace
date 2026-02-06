import fs from "node:fs";
import path from "node:path";
import * as pagefind from "pagefind";

const GITHUB_API_REPO_BASE = process.env.GITHUB_API_REPO_BASE;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const DOCS_DIR = path.join(process.cwd(), "src/app/docs");

async function fetchCategories() {
  const response = await fetch(`${GITHUB_API_REPO_BASE}/contents/plugins`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const data = await response.json();
  return data.filter((item) => item.type === "dir").map((item) => item.name);
}

async function fetchPluginsForCategory(category) {
  const response = await fetch(
    `${GITHUB_API_REPO_BASE}/contents/plugins/${category}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!response.ok) return [];

  const data = await response.json();
  if (!Array.isArray(data)) return [];

  const plugins = data.filter((item) => item.type === "dir");

  const results = await Promise.all(
    plugins.map(async (item) => {
      const pluginName = item.name;
      let label = pluginName;
      let description = `An integration for ${pluginName}.`;

      try {
        const indexResponse = await fetch(
          `${GITHUB_API_REPO_BASE}/contents/plugins/${category}/${pluginName}/index.ts`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (indexResponse.ok) {
          const indexData = await indexResponse.json();
          if (indexData.content) {
            const indexContent = Buffer.from(
              indexData.content,
              "base64",
            ).toString("utf8");
            const labelMatch = indexContent.match(/label:\s*"([^"]+)"/);
            const descriptionMatch =
              indexContent.match(/description:\s*"([^"]+)"/);
            if (labelMatch?.[1]) label = labelMatch[1];
            if (descriptionMatch?.[1]) description = descriptionMatch[1];
          }
        }
      } catch (error) {
        console.warn(`  Warning: Could not fetch index.ts for ${pluginName}`);
      }

      return { name: pluginName, label, description, category };
    }),
  );

  return results;
}

async function main() {
  const { index } = await pagefind.createIndex();
  if (!index) {
    console.error("Failed to create Pagefind index");
    process.exit(1);
  }

  // Index docs pages from source markdown files
  let docsCount = 0;
  function indexDocsDir(dir, urlPrefix) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name === "page.md") {
        const content = fs.readFileSync(path.join(dir, entry.name), "utf8");
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : path.basename(dir);
        index.addCustomRecord({
          url: urlPrefix || "/docs",
          content,
          language: "en",
          meta: { title },
        });
        docsCount++;
      } else if (entry.isDirectory()) {
        indexDocsDir(
          path.join(dir, entry.name),
          `${urlPrefix || "/docs"}/${entry.name}`,
        );
      }
    }
  }
  indexDocsDir(DOCS_DIR, "/docs");
  console.log(`Indexed ${docsCount} docs page(s)`);

  // Index plugins from GitHub API
  if (GITHUB_API_REPO_BASE && GITHUB_TOKEN) {
    try {
      console.log("Fetching plugins from GitHub API...");
      const categories = await fetchCategories();
      let pluginCount = 0;

      for (const category of categories) {
        const plugins = await fetchPluginsForCategory(category);
        for (const plugin of plugins) {
          await index.addCustomRecord({
            url: `/${plugin.category}/${plugin.name}`,
            content: `${plugin.label} ${plugin.description}`,
            language: "en",
            meta: {
              title: plugin.label,
            },
          });
          pluginCount++;
        }
      }

      console.log(
        `Indexed ${pluginCount} plugin(s) across ${categories.length} categories`,
      );
    } catch (error) {
      console.error("Error indexing plugins:", error.message);
      console.log("Continuing with docs-only index...");
    }
  } else {
    console.log(
      "Skipping plugin indexing (GITHUB_API_REPO_BASE or GITHUB_TOKEN not set)",
    );
  }

  await index.writeFiles({ outputPath: "public/_pagefind" });
  console.log("Search index written to public/_pagefind");

  await pagefind.close();
}

main().catch((error) => {
  console.error("Build search index failed:", error);
  process.exit(1);
});
