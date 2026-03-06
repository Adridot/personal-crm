const DEFAULT_DEVELOPMENT_ALLOWED_ORIGINS = [
  "http://localhost:*",
  "http://127.0.0.1:*",
] as const;

const TRAILING_SLASH_REGEX = /\/+$/;
const REGEX_SPECIAL_CHARACTER_REGEX = /[|\\{}()[\]^$+?.]/g;

export const normalizeOrigin = (origin: string): string =>
  origin.trim().replace(TRAILING_SLASH_REGEX, "");

export const parseOriginList = (value: string | undefined): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter((origin) => origin.length > 0);
};

export const resolveAllowedOrigins = (
  value: string | undefined,
  nodeEnv: string | undefined
): string[] => {
  const explicitAllowedOrigins = parseOriginList(value);
  const resolvedOrigins = new Set(explicitAllowedOrigins);

  if (nodeEnv === "development" || nodeEnv === "test") {
    for (const origin of DEFAULT_DEVELOPMENT_ALLOWED_ORIGINS) {
      resolvedOrigins.add(origin);
    }
  }

  return [...resolvedOrigins];
};

const escapeRegex = (value: string): string =>
  value.replace(REGEX_SPECIAL_CHARACTER_REGEX, "\\$&");

const toOriginPatternRegex = (pattern: string): RegExp => {
  let expression = "^";

  for (let index = 0; index < pattern.length; index += 1) {
    const character = pattern[index];
    const nextCharacter = pattern[index + 1];

    if (character === "*" && nextCharacter === "*") {
      expression += ".*";
      index += 1;
      continue;
    }

    if (character === "*") {
      expression += "[^/]*";
      continue;
    }

    if (character === "?") {
      expression += "[^/]";
      continue;
    }

    expression += escapeRegex(character);
  }

  expression += "$";

  return new RegExp(expression);
};

export const isOriginAllowed = (
  requestOrigin: string,
  allowedOrigins: string[]
): boolean => {
  const normalizedOrigin = normalizeOrigin(requestOrigin);

  return allowedOrigins.some((allowedOrigin) => {
    const normalizedAllowedOrigin = normalizeOrigin(allowedOrigin);

    if (
      !(
        normalizedAllowedOrigin.includes("*") ||
        normalizedAllowedOrigin.includes("?")
      )
    ) {
      return normalizedAllowedOrigin === normalizedOrigin;
    }

    return toOriginPatternRegex(normalizedAllowedOrigin).test(normalizedOrigin);
  });
};
