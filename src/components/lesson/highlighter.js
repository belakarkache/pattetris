import { createCssVariablesTheme, createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const theme = createCssVariablesTheme({
  name: "pattetris",
  variablePrefix: "--code-",
  fontStyle: true,
});

let highlighter = null;

const getHighlighter = () =>
  (highlighter ??= createHighlighterCore({
    themes: [theme],
    langs: [import("shiki/langs/javascript.mjs")],
    engine: createJavaScriptRegexEngine(),
  }).catch((error) => {
    highlighter = null;
    throw error;
  }));

export const preloadHighlighter = () => getHighlighter().catch(() => {});

export async function highlight(code) {
  return (await getHighlighter()).codeToHtml(code, { lang: "javascript", theme: "pattetris" });
}
