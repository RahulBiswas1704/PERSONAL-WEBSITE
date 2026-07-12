/**
 * Utility for triggering haptic feedback on supported mobile devices.
 * Uses navigator.vibrate. Fails silently on unsupported devices (e.g. iOS or desktop).
 */

export const triggerHaptic = (pattern: number | number[] = 50) => {
  if (typeof window !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignore errors on unsupported platforms
    }
  }
};

export const hapticTick = () => triggerHaptic(20); // Very light tap
export const hapticPop = () => triggerHaptic(50); // Standard tap
export const hapticError = () => triggerHaptic([50, 100, 50]); // Double buzz
export const hapticHeavy = () => triggerHaptic(500); // Long aggressive buzz
