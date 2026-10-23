/**
 * Decides whether an animation may be cancelled when the tab hides.
 *
 * Finite animations on the document timeline are CSS entrances and transitions;
 * cancelling them drops a pending effect without leaving a half-finished state.
 * Scroll-driven animations (ViewTimeline/ScrollTimeline) must survive: the browser
 * recreates their values from the scroll position, while Framer Motion has no path
 * to attach a cancelled accelerated animation again. Cancelling those left the
 * #servico panels stuck on the first repository after a tab switch.
 */
export function shouldCancelWhenHidden(
  animation: Pick<Animation, 'timeline' | 'effect'>,
  documentTimeline: AnimationTimeline | null,
): boolean {
  return animation.timeline === documentTimeline && animation.effect?.getTiming().iterations !== Infinity;
}
