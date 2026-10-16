let audioCtx: AudioContext | null = null;

export function playFeedbackTone(freq = 440, type: OscillatorType = 'sine', duration = 0.06) {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Audio optional/silent fallback
  }
}

export function playSuccessSound() {
  playFeedbackTone(523.25, 'sine', 0.08);
  setTimeout(() => playFeedbackTone(659.25, 'sine', 0.09), 80);
  setTimeout(() => playFeedbackTone(783.99, 'sine', 0.12), 160);
}

export function playPanicSound() {
  playFeedbackTone(880, 'sawtooth', 0.15);
  setTimeout(() => playFeedbackTone(620, 'sawtooth', 0.18), 120);
  setTimeout(() => playFeedbackTone(880, 'sawtooth', 0.2), 240);
}
