const Configuration = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
  ignores: [(commit) => commit === ""],
  defaultIgnores: true,
  prompt: {
    messages: {
      skip: ":skip",
      max: "upper %d chars",
      min: "%d chars at least",
      emptyWarning: "can not be empty",
      upperLimitWarning: "over limit",
      lowerLimitWarning: "below limit",
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            emoji: "✨",
            description: "✨ Introducing new features.",
            title: "feat",
          },
          fix: {
            emoji: "🐛",
            description: "🐛 Fixes a bug.",
            title: "fix",
          },
          docs: {
            emoji: "📝",
            description: "📝 Writing docs.",
            title: "docs",
          },
          style: {
            emoji: "💄",
            description: "💄 Updating the UI and style files.",
            title: "style",
          },
          chore: {
            emoji: "📦",
            description: "📦 Updating compiled files or packages.",
            title: "chore",
          },
          perf: {
            emoji: "⚡️",
            description: "⚡️ Improving performance.",
            title: "perf",
          },
          test: {
            emoji: "🧪",
            description: "🧪 Adding tests.",
            title: "test",
          },
          build: {
            emoji: "🏗",
            description: "🏗 Making architectural changes.",
            title: "build",
          },
          ci: {
            emoji: "🚀",
            description: "🚀 Adding CI build system.",
            title: "ci",
          },
          refactor: {
            emoji: "♻️",
            description: "♻️ Refactoring code.",
            title: "refactor",
          },
          revert: {
            emoji: "⏪️",
            description: "⏪️ Reverting changes.",
            title: "revert",
          },
        },
      },
      scope: {
        description:
          "What is the scope of this change (e.g. component or file name)",
      },
      subject: {
        description:
          "Write a short, imperative tense description of the change",
      },
      body: {
        description: "Provide a longer description of the change",
      },
    },
  },
};

export default Configuration;
