const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

describe("Email validation - invalid emails", () => {
  const invalidEmails = [
    // Empty / null
    "",
    " ",
    null,
    undefined,

    // Missing parts
    "test",
    "test@",
    "@test.com",
    "test.com",

    // Multiple @
    "test@@example.com",
    "test@exa@mple.com",

    // Spaces
    "test @example.com",
    "test@ example.com",
    "test@example .com",
    " test@example.com",
    "test@example.com ",

    // Accented domain (your main concern)
    "test@exémple.com",
    "test@entreprisè.fr",
    "test@testç.com",
    "test@école.fr",

    // Emoji / unicode
    "test@🔥.com",
    "🔥@example.com",
    "test@exampl🔥.com",

    // Invalid domain structure
    "test@example",
    "test@example.",
    "test@.com",
    "test@.example.com",

    // Invalid characters
    "test()@example.com",
    "test<>@example.com",
    "test[]@example.com",
    "test,@example.com",
    "test;@example.com",

    // Double dots
    "test..email@example.com",
    "test@example..com",

    // Starting / ending dots
    ".test@example.com",
    "test.@example.com",

    // Invalid TLD
    "test@example.c",
    "test@example.123",
  ];

  it.each(invalidEmails)("should reject invalid email: %s", (email) => {
    expect(EMAIL_REGEX.test(email)).toBe(false);
  });
});