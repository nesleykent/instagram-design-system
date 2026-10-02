// Lightweight, dependency-free tokenizer for the CSS/JS snippets used across
// this manual's CodeBlock instances. Not a general-purpose language parser —
// just enough categories (comment, string, CSS custom property, keyword,
// number+unit) to make --code-* tokens visually useful without pulling in a
// full syntax-highlighting library for a documentation site this size.

const TOKEN_PATTERN = new RegExp(
  [
    /\/\*[\s\S]*?\*\//.source, // block comment
    /\/\/[^\n]*/.source, // line comment
    /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/.source, // strings
    /--[a-zA-Z][\w-]*/.source, // CSS custom properties, e.g. --ig-primary-background
    /@(?:media|keyframes|supports|import|font-face)\b/.source, // at-rules
    /\b(?:const|let|var|function|return|import|export|from|default|if|else|new|class|extends|async|await|typeof|true|false|null|undefined)\b/.source, // JS keywords
    /(?<![\w-])-?\d+\.?\d*(?:px|em|rem|vw|vh|vmin|vmax|deg|ms|s|fr|%)?(?![\w-])/.source, // numbers + units
  ].join("|"),
  "g"
);

function classify(text) {
  if (text.startsWith("/*") || text.startsWith("//")) return "comment";
  if (/^["'`]/.test(text)) return "string";
  if (text.startsWith("--")) return "type";
  if (text.startsWith("@")) return "keyword";
  if (/^-?\d/.test(text)) return "number";
  return "keyword";
}

// Returns an array of { text, type } segments. type is null for plain text.
export function tokenizeCode(code) {
  const tokens = [];
  let lastIndex = 0;
  let match;
  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), type: null });
    }
    tokens.push({ text: match[0], type: classify(match[0]) });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), type: null });
  }
  return tokens;
}
