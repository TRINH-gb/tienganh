export function speakEnglish(text: string, accent: 'UK' | 'US' = 'US', rate: number = 0.95): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported on this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Clean term (remove brackets, asterisks, punctuation)
  const cleanText = text.replace(/[*_#]/g, '').trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const langCode = accent === 'UK' ? 'en-GB' : 'en-US';

  // Find suitable voice
  const matchedVoice = voices.find(
    (v) => v.lang === langCode || v.lang.startsWith(accent === 'UK' ? 'en-GB' : 'en-US')
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }
  utterance.lang = langCode;

  window.speechSynthesis.speak(utterance);
}
