import { Button } from "../button.enum";
import { Point } from "../point.class";

/**
 * A MouseActionProvider should provide access to a systems mouse input
 */
export interface MouseProviderInterface {
  /**
   * setMouseDelay should allow to configure mouse movement speed
   *
   * @param delay The delay in milliseconds
   */
  setMouseDelay(delay: number): void;

  /**
   * setMousePosition should allow to set the mouse cursor position
   *
   * @param p The {@link Point} to which the mouse pointer should be set
   */
  setMousePosition(p: Point): void;

  /**
   * currentMousePosition should return the current mouse pointer position
   *
   * @returns The current mouse pointer position
   */
  currentMousePosition(): Point;

  /**
   * leftClick should allow to perform a left click via OS event
   */
  leftClick(): void;

  /**
   * rightClick should allow to perform a right click via OS event
   */
  rightClick(): void;

  /**
   * middleClick should allow to perform a middle click via OS event
   */
  middleClick(): void;

  /**
   * scrollUp should allow to perform an upward mouse scroll
   *
   * @param amount The scroll amount
   */
  scrollUp(amount: number): void;

  /**
   * scrollDown should allow to perform an downward mouse scroll
   *
   * @param amount The scroll amount
   */
  scrollDown(amount: number): void;

  /**
   * scrollLeft should allow to perform a left mouse scroll
   *
   * @param amount The scroll amount
   */
  scrollLeft(amount: number): void;

  /**
   * scrollRight should perform a right mouse scroll
   *
   * @param amount The scroll amount
   */
  scrollRight(amount: number): void;

  /**
   * pressButton should allow to press and hold a mouse button
   *
   * @param btn The {@link Button} to press and hold
   */
  pressButton(btn: Button): void;

  /**
   * releaseButton should allow to release a pressed button
   *
   * @param btn The {@link Button} to release
   */
  releaseButton(btn: Button): void;
}
