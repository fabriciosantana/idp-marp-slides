const ONECOMPILER_API_KEY = 'oc_44pg5vds2_44pg5vdsh_77ec94cc0e6230424ca06bc026f4a479d8c316d768d7247a';

function buildOneCompilerChallengeUrl(challengeId, challengeSlug, options = {}) {
  const base = `https://onecompiler.com/embed/challenges/${challengeId}/${challengeSlug}`;
  const params = new URLSearchParams({
    theme: options.theme || 'light',
    hideLanguageSelection: options.hideLanguageSelection || 'true',
    hideNew: options.hideNew || 'true'
  });

  if (options.apiKey) params.set('apiKey', options.apiKey);
  if (options.userApiToken) params.set('userApiToken', options.userApiToken);

  return `${base}?${params.toString()}`;
}

function loadOneCompilerChallenge(challengeElement) {
  const challengeId = challengeElement.dataset.challengeId;
  const challengeSlug = challengeElement.dataset.challengeSlug;
  const theme = challengeElement.dataset.theme;
  const input = challengeElement.querySelector('[data-onecompiler-user-token]');
  const frame = challengeElement.querySelector('[data-onecompiler-frame]');
  const userApiToken = input?.value.trim();

  if (!challengeId || !challengeSlug || !frame) return;

  frame.src = buildOneCompilerChallengeUrl(challengeId, challengeSlug, {
    apiKey: ONECOMPILER_API_KEY,
    theme,
    userApiToken
  });
}

function setupOneCompilerChallenge(challengeElement) {
  const challengeId = challengeElement.dataset.challengeId;
  const challengeSlug = challengeElement.dataset.challengeSlug;
  const source = challengeElement.querySelector('[data-onecompiler-source]');

  if (challengeId && challengeSlug && source) {
    const href = `https://onecompiler.com/challenges/${challengeId}/${challengeSlug}`;

    source.href = href;
    source.textContent = href;
  }

  loadOneCompilerChallenge(challengeElement);
}

document.querySelectorAll('[data-onecompiler-challenge]').forEach((challengeElement) => {
  const button = challengeElement.querySelector('[data-onecompiler-load]');

  setupOneCompilerChallenge(challengeElement);

  button?.addEventListener('click', () => {
    loadOneCompilerChallenge(challengeElement);
  });
});
