# Review Standards and Sources

Primary review references:

- GitHub Docs: [About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)
- Google Engineering Practices: [How to do a code review](https://google.github.io/eng-practices/review/reviewer/)
- OWASP: [Code Review Guide](https://owasp.org/www-project-code-review-guide/)

ZapCircle-inspired review prompt references:

- Review prompt (code): [code.txt](https://github.com/jefflinwood/zapcircle/blob/master/zapcircle-cli/src/prompts/review/code.txt)
- Review prompt (PR summary): [pullrequest.txt](https://github.com/jefflinwood/zapcircle/blob/master/zapcircle-cli/src/prompts/review/pullrequest.txt)
- Reviewer renderer: [renderReviewPrompt.ts](https://github.com/jefflinwood/zapcircle/blob/master/zapcircle-cli/src/agent/renderReviewPrompt.ts)

Usage notes:

- Use official specs as the tie-breaker for technical disagreements.
- Keep findings structured and severity-driven.
- Separate objective findings from assumptions.
