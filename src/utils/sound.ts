class SoundManager {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Initialize on first user interaction to comply with browser policies
  }

  private init() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
    }
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : 1;
    }
    return this.isMuted;
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.context || !this.masterGain) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.context.currentTime + 0.05);

    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.context.currentTime + 0.05);
  }

  playHover() {
    if (this.isMuted) return;
    this.init();
    if (!this.context || !this.masterGain) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, this.context.currentTime);
    
    gain.gain.setValueAtTime(0.05, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.context.currentTime + 0.05);
  }

  playScan() {
    if (this.isMuted) return;
    this.init();
    if (!this.context || !this.masterGain) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.context.currentTime);
    osc.frequency.linearRampToValueAtTime(800, this.context.currentTime + 0.3);

    gain.gain.setValueAtTime(0.05, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.context.currentTime + 0.3);
  }

  playImpact() {
    if (this.isMuted) return;
    this.init();
    if (!this.context || !this.masterGain) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.context.currentTime + 0.5);

    gain.gain.setValueAtTime(0.5, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.context.currentTime + 0.5);
  }

  playGlitch() {
    if (this.isMuted) return;
    this.init();
    if (!this.context || !this.masterGain) return;

    const count = 5;
    for (let i = 0; i < count; i++) {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      
      const time = this.context.currentTime + (Math.random() * 0.2);
      
      osc.type = Math.random() > 0.5 ? 'sawtooth' : 'square';
      osc.frequency.value = 200 + Math.random() * 1000;
      
      gain.gain.setValueAtTime(0.1, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(time);
      osc.stop(time + 0.05);
    }
  }
}

export const soundManager = new SoundManager();
