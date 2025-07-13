
/**
 * Implements OCC emotion model (Ortony, Clore & Collins) for AI system
 */
type IEmotion = 'joy' | 'fear' | 'anger' | 'sadness' | 'surprise' | 'disgust';

export class EmotionSystem {
  private emotions: Record<IEmotion, number>;
  
  private decayRate = 0.999; // 5% decay per update
  private maxIntensity = 100;

  constructor(initialState?: Partial<Record<IEmotion, number>>) {
    console.log('[EmotionSystem] Constructor called - creating new instance with initial state:', initialState);
    const defaultEmotions = {
      joy: -1,
      fear: -1,
      anger: -1,
      sadness: -1,
      surprise: -1,
      disgust: -1
    };

    this.emotions = {
      ...defaultEmotions,
      ...(initialState || {})
    };
    console.log('[EmotionSystem] Final initialized state:', JSON.stringify(this.emotions));
    console.log('[EmotionSystem] Decay rate:', this.decayRate);
    console.log('[EmotionSystem] Max intensity:', this.maxIntensity);
    console.log('[EmotionSystem] Instance ID:', Math.random().toString(36).substring(2, 9));
  }

  /**
   * Appraises an event and updates emotions accordingly
   */
  appraise(event: unknown): void {

    console.log('[EmotionSystem] Appraise called with event:', event);
    if (typeof event !== 'string') {
      console.log('[EmotionSystem] Appraise skipped - event is not a string');
      return;
    }

    const lowerEvent = event.toLowerCase();
    console.log('[EmotionSystem] Processing message:', lowerEvent);
    
    // Enhanced trigger matching with partial matches and intensity scaling
    const matchStrength = (text: string, triggers: string[]) => {
      return triggers.reduce((max, trigger) => {
        const strength = text.includes(trigger) ? 
          (trigger.length / text.length) * 100 : 0;
        return Math.max(max, strength);
      }, 0);
    };

    // Joy appraisal with intensity scaling
    const joyTriggers = [
      'success', 'happy', 'joy', 'celebrate', 
      'win', 'achievement', 'good', 'satisfied',
      'high_knowledge', 'high_safety', 'high_money'
    ];
    const joyStrength = matchStrength(lowerEvent, joyTriggers);
    if (joyStrength > 30) {
      const intensity = Math.min(joyStrength, 30);
      console.log(`[EmotionSystem] Joy trigger matched (strength: ${joyStrength.toFixed(1)}%)`);
      this.emotions.joy = Math.min(this.maxIntensity, this.emotions.joy + intensity);
    }

    // Fear appraisal with intensity scaling  
    const fearTriggers = ['danger', 'threat', 'scary', 'fear', 'emergency', 'alert', 'warn'];
    const fearStrength = matchStrength(lowerEvent, fearTriggers);
    if (fearStrength > 30) {
      const intensity = Math.min(fearStrength, 40);
      console.log(`[EmotionSystem] Fear trigger matched (strength: ${fearStrength.toFixed(1)}%)`);
      this.emotions.fear = Math.min(this.maxIntensity, this.emotions.fear + intensity);
    }

    // Anger appraisal with intensity scaling
    const angerTriggers = [
      'blocked', 'frustrat', 'angry', 'mad', 
      'annoy', 'hate', 'upset', 'low_integrity',
      'low_safety', 'failed_satisfaction'
    ];
    const angerStrength = matchStrength(lowerEvent, angerTriggers);
    if (angerStrength > 30) {
      const intensity = Math.min(angerStrength, 25);
      console.log(`[EmotionSystem] Anger trigger matched (strength: ${angerStrength.toFixed(1)}%)`);
      this.emotions.anger = Math.min(this.maxIntensity, this.emotions.anger + intensity);
    }

    // Sadness appraisal with intensity scaling
    const sadnessTriggers = ['fail', 'loss', 'sad', 'depress', 'grief', 'mourn', 'sorry'];
    const sadnessStrength = matchStrength(lowerEvent, sadnessTriggers);
    if (sadnessStrength > 30) {
      const intensity = Math.min(sadnessStrength, 35);
      console.log(`[EmotionSystem] Sadness trigger matched (strength: ${sadnessStrength.toFixed(1)}%)`);
      this.emotions.sadness = Math.min(this.maxIntensity, this.emotions.sadness + intensity);
    }

    // Surprise appraisal with intensity scaling
    const surpriseTriggers = ['unexpected', 'surprise', 'shock', 'sudden', 'unanticipated', 'wow'];
    const surpriseStrength = matchStrength(lowerEvent, surpriseTriggers);
    if (surpriseStrength > 30) {
      const intensity = Math.min(surpriseStrength, 50);
      console.log(`[EmotionSystem] Surprise trigger matched (strength: ${surpriseStrength.toFixed(1)}%)`);
      this.emotions.surprise = Math.min(this.maxIntensity, this.emotions.surprise + intensity);
    }

    // Disgust appraisal with intensity scaling
    const disgustTriggers = ['disgust', 'revolting', 'gross', 'nasty', 'vomit', 'repulsive', 'yuck'];
    const disgustStrength = matchStrength(lowerEvent, disgustTriggers);
    if (disgustStrength > 30) {
      const intensity = Math.min(disgustStrength, 45);
      console.log(`[EmotionSystem] Disgust trigger matched (strength: ${disgustStrength.toFixed(1)}%)`);
      this.emotions.disgust = Math.min(this.maxIntensity, this.emotions.disgust + intensity);
    }

    // Debug output if no triggers matched
    if (Object.values(this.emotions).every(e => e === 0)) {
      console.log('[EmotionSystem] No emotion triggers matched in message:', lowerEvent);
      console.log('Potential triggers considered:', {
        joy: joyTriggers,
        fear: fearTriggers,
        anger: angerTriggers,
        sadness: sadnessTriggers,
        surprise: surpriseTriggers,
        disgust: disgustTriggers
      });
    }
  }

  /**
   * Updates emotion intensities with decay
   */ 
  update(): Record<IEmotion, number> {
    console.groupCollapsed(`[EMOTION] Update at ${new Date().toISOString()}`);
    console.log('Pre-decay emotions:', JSON.parse(JSON.stringify(this.emotions)));
    console.log(`Applying decay rate: ${this.decayRate} (${(1-this.decayRate)*100}% reduction)`);
    
    const previousState = JSON.parse(JSON.stringify(this.emotions));
    
    for (const emotion in this.emotions) {
      const current = this.emotions[emotion as IEmotion];
      if (current <= 0) continue; // Skip if already at 0
      
      const decayed = current * this.decayRate;
      const newValue = Math.max(0, parseFloat(decayed.toFixed(2)));
      
      console.log(`Decaying ${emotion}: ${current} -> ${newValue}`);
      
      this.emotions[emotion] = newValue;
    }
    
    console.log('Post-decay emotions:', this.emotions);
    
    // Calculate precise changes
    const changes: Partial<Record<IEmotion, number>> = {};
    for (const emotion in this.emotions) {
      const delta = this.emotions[emotion] - previousState[emotion];
      if (Math.abs(delta) > 0.0001) {
        changes[emotion] = parseFloat(delta.toFixed(4));
        console.log(`${emotion} changed by ${delta.toFixed(4)}`);
      }
    }
    
    console.groupEnd();
    
    return changes;
  }

  /**
   * Gets current emotion state
   */
  getState(): Record<IEmotion, number> {
    return {...this.emotions};
  }

  /**
   * Gets dominant emotion (highest intensity)
   */
  getDominantEmotion(): {emotion: IEmotion | 'neutral', intensity: number} {
    let dominant = {emotion: 'neutral', intensity: 0};
    
    for (const [emotion, intensity] of Object.entries(this.emotions)) {
      if (intensity > dominant.intensity) {
        dominant = {emotion, intensity};
      } else if (intensity === dominant.intensity && intensity > 0) {
        // For ties, prefer safety-related emotions
        if (emotion === 'fear' || emotion === 'anger') {
          dominant = {emotion, intensity};
        }
      }
    }

    return dominant;
  }
}
