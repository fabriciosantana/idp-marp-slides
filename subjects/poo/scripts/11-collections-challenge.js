function loadOneCompilerChallenge() {
  const apiKey = 'oc_44pg5vds2_44pg5vdsh_76371a8954165f68cbadb9d6309590ce9eec5eb1195eac75';
  const userToken = document.getElementById('onecompiler-user-token').value.trim();
  const frame = document.getElementById('onecompiler-challenge');
  const base = 'https://onecompiler.com/embed/challenges/44png67sv/arraylist';

  const params = new URLSearchParams({
    theme: 'light',
    hideLanguageSelection: 'true',
    hideNew: 'true'
  });

  if (apiKey) params.set('apiKey', apiKey);
  if (userToken) params.set('userApiToken', userToken);

  frame.src = `${base}?${params.toString()}`;
}
