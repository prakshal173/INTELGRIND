// Morse code audio generator utility
export class MorseCodeGenerator {
  private audioContext: AudioContext;
  private dotDuration: number = 100; // milliseconds
  private frequency: number = 700; // Hz

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  private async playTone(duration: number, startTime: number): Promise<number> {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = this.frequency;
    oscillator.type = 'sine';
    
    // Envelope to prevent clicking
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.005);
    gainNode.gain.setValueAtTime(0.3, startTime + duration / 1000 - 0.005);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration / 1000);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000);
    
    return duration;
  }

  private getMorseCode(char: string): string {
    const morseMap: { [key: string]: string } = {
      'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',
      'E': '.',     'F': '..-.',  'G': '--.',   'H': '....',
      'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
      'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',
      'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
      'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
      'Y': '-.--',  'Z': '--..',
      '0': '-----', '1': '.----', '2': '..---', '3': '...--',
      '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.',
    };
    return morseMap[char.toUpperCase()] || '';
  }

  async playMorseCode(text: string, playbackRate: number = 1): Promise<void> {
    const adjustedDotDuration = this.dotDuration / playbackRate;
    const dashDuration = adjustedDotDuration * 3;
    const symbolGap = adjustedDotDuration;
    const letterGap = adjustedDotDuration * 3;
    const wordGap = adjustedDotDuration * 7;

    let currentTime = this.audioContext.currentTime;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (char === ' ') {
        currentTime += wordGap / 1000;
        continue;
      }

      const morseCode = this.getMorseCode(char);
      
      for (let j = 0; j < morseCode.length; j++) {
        const symbol = morseCode[j];
        
        if (symbol === '.') {
          await this.playTone(adjustedDotDuration, currentTime);
          currentTime += (adjustedDotDuration + symbolGap) / 1000;
        } else if (symbol === '-') {
          await this.playTone(dashDuration, currentTime);
          currentTime += (dashDuration + symbolGap) / 1000;
        }
      }
      
      // Gap between letters
      if (i < text.length - 1 && text[i + 1] !== ' ') {
        currentTime += letterGap / 1000;
      }
    }
  }

  getDuration(text: string, playbackRate: number = 1): number {
    const adjustedDotDuration = this.dotDuration / playbackRate;
    const dashDuration = adjustedDotDuration * 3;
    const symbolGap = adjustedDotDuration;
    const letterGap = adjustedDotDuration * 3;
    const wordGap = adjustedDotDuration * 7;

    let totalDuration = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (char === ' ') {
        totalDuration += wordGap;
        continue;
      }

      const morseCode = this.getMorseCode(char);
      
      for (let j = 0; j < morseCode.length; j++) {
        const symbol = morseCode[j];
        
        if (symbol === '.') {
          totalDuration += adjustedDotDuration + symbolGap;
        } else if (symbol === '-') {
          totalDuration += dashDuration + symbolGap;
        }
      }
      
      if (i < text.length - 1 && text[i + 1] !== ' ') {
        totalDuration += letterGap;
      }
    }
    
    return totalDuration / 1000; // Convert to seconds
  }
}

// Export function for easier use with visual callback
export async function generateMorseAudio(
  audioContext: AudioContext,
  text: string,
  speedMultiplier: number = 1,
  onCharacterPlay?: (morseChar: string) => void
): Promise<void> {
  const dotDuration = 150 / speedMultiplier; // Base duration in ms
  const dashDuration = dotDuration * 3;
  const symbolGap = dotDuration;
  const letterGap = dotDuration * 3;
  const frequency = 800; // Hz

  const morseMap: { [key: string]: string } = {
    'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',
    'E': '.',     'F': '..-.',  'G': '--.',   'H': '....',
    'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
    'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',
    'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
    'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
    'Y': '-.--',  'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.',
  };

  const playTone = (duration: number): Promise<void> => {
    return new Promise((resolve) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.005);
      gainNode.gain.setValueAtTime(0.3, now + duration / 1000 - 0.005);
      gainNode.gain.linearRampToValueAtTime(0, now + duration / 1000);
      
      oscillator.start(now);
      oscillator.stop(now + duration / 1000);
      
      setTimeout(resolve, duration);
    });
  };

  const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toUpperCase();
    
    if (char === ' ') {
      await delay(letterGap * 2);
      continue;
    }

    const morseCode = morseMap[char];
    if (!morseCode) continue;

    // Display the full morse code for the letter
    if (onCharacterPlay) {
      onCharacterPlay(morseCode);
    }

    // Play each symbol in the morse code
    for (let j = 0; j < morseCode.length; j++) {
      const symbol = morseCode[j];
      
      if (symbol === '.') {
        await playTone(dotDuration);
        await delay(symbolGap);
      } else if (symbol === '-') {
        await playTone(dashDuration);
        await delay(symbolGap);
      }
    }
    
    // Gap between letters
    await delay(letterGap);
  }
}
