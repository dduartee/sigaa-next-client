import { SlugParams } from "@types";

export default function parseSlugPattern( slug: string[] ): SlugParams {
  const registration = slug[0] ? slug[0] : null
  const actionPrimary = ( slug[1] == "course" || slug[1] == "news" || slug[1] == "homeworks" || slug[1] == "grades" ) ? slug[1] : null
  const code = slug[2] ? slug[2] : null;
  const actionSecondary = ( slug[3] == "grades" || slug[3] == "homeworks" || slug[3] == "news" ) ? slug[3] : null
  return { registration, actionPrimary, code, actionSecondary }
}