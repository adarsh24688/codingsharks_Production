import { readFile } from "node:fs/promises";
import path from "node:path";

import { InstaPromptSourcePage } from "@/components/pages/insta/insta-prompt-source-page";

export const metadata = {
  title: "Prompt + Source Code",
  description:
    "Get the CodingSharks master prompt instantly and unlock source code by submitting a quick form.",
};

async function getPromptContent() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "insta",
      "CodingSharks_MasterPrompt.md",
    );
    return await readFile(filePath, "utf8");
  } catch {
    return "Prompt file not found. Please add public/insta/CodingSharks_MasterPrompt.md";
  }
}

export default async function InstaProjectPage() {
  const promptContent = await getPromptContent();
  return <InstaPromptSourcePage promptContent={promptContent} />;
}
