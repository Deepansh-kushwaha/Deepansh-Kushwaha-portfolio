/**
 * Haptic Feedback Utility
 * Provides subtle physical feedback on supported mobile devices
 * to enhance the "Editorial Fluidity" tactile experience.
 */

export const triggerHaptic = (intensity: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') => {
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
      case 'success':
        navigator.vibrate([10, 30, 15]);
        break;
      case 'error':
        navigator.vibrate([50, 100, 50, 100, 50]);
        break;
    }
  }
};
