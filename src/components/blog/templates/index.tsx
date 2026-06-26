import type { BlogTemplateProps } from "./shared";
import { LongformEditorialTemplate } from "./longform-editorial";
import { HowToStepsTemplate } from "./how-to-steps";
import { DeepDiveTemplate } from "./deep-dive";
import { ListicleTemplate } from "./listicle";
import { ComparisonBlogTemplate } from "./comparison-blog";
import { GuideTocTemplate } from "./guide-toc";
import { MagazineTwoColTemplate } from "./magazine-two-col";
import { ChecklistTemplate } from "./checklist";
import { CaseStudyTemplate } from "./case-study";
import { DataReportTemplate } from "./data-report";
import { QaInterviewTemplate } from "./qa-interview";
import { PhotoEssayTemplate } from "./photo-essay";
import { OpinionColumnTemplate } from "./opinion-column";
import { TrendsTemplate } from "./trends";
import { NewsBriefTemplate } from "./news-brief";

const registry: Record<string, React.FC<BlogTemplateProps>> = {
  "longform-editorial": LongformEditorialTemplate,
  "how-to-steps": HowToStepsTemplate,
  "deep-dive": DeepDiveTemplate,
  "listicle": ListicleTemplate,
  "comparison-blog": ComparisonBlogTemplate,
  "guide-toc": GuideTocTemplate,
  "magazine-two-col": MagazineTwoColTemplate,
  "checklist": ChecklistTemplate,
  "case-study": CaseStudyTemplate,
  "data-report": DataReportTemplate,
  "qa-interview": QaInterviewTemplate,
  "photo-essay": PhotoEssayTemplate,
  "opinion-column": OpinionColumnTemplate,
  "trends": TrendsTemplate,
  "news-brief": NewsBriefTemplate,
};

export function getBlogTemplate(design: string): React.FC<BlogTemplateProps> {
  return registry[design] ?? LongformEditorialTemplate;
}
