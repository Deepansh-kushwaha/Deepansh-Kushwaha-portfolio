/**
 * Haptic Feedback Utility
 * Provides subtle physical feedback on supported mobile devices
 * to enhance the "Editorial Fluidity" tactile experience.
 */

export const triggerHaptic = (intensity: 'light' | 'medium' | 'heavy' = 'light') => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    switch (intensity) {
      case 'light':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(15);
        break;
      case 'heavy':
        navigator.vibrate([20, 10, 20]);
        break;
    }
  }
};
