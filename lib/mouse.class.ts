import { Button } from "./button.enum";
import { isPoint, Point } from "./point.class";
import { sleepSync } from "./sleep.function";
import {
  calculateMovementTimesteps,
  EasingFunction,
  linear,
} from "./mouse-movement.function";
import { ProviderRegistry } from "./provider/provider-registry.class";

/**
 * {@link MouseClass} class provides methods to emulate mouse input
 */
export class MouseClass {
  /**
   * Config object for {@link MouseClass} class
   */
  public config = {
    /**
     * Configures the delay between single mouse events
     */
    autoDelayMs: 100,

    /**
     * Configures the speed in pixels/second for mouse movement
     */
    mouseSpeed: 1000,
  };

  /**
   * {@link MouseClass} class constructor
   * @param providerRegistry
   */
  constructor(private providerRegistry: ProviderRegistry) {
    this.providerRegistry.getMouse().setMouseDelay(0);
  }

  /**
   * {@link setPosition} instantly moves the mouse cursor to a given {@link Point}
   * @param target {@link Point} to move the cursor to
   */
  public setPosition(target: Point): MouseClass {
    if (!isPoint(target)) {
      throw Error(
        `setPosition requires a Point, but received ${JSON.stringify(target)}`
      );
    }

    this.providerRegistry.getMouse().setMousePosition(target);
    return this;
  }

  /**
   * {@link getPosition} returns a {@link Point} representing the current mouse position
   */
  public getPosition(): Promise<Point> {
    return this.providerRegistry.getMouse().currentMousePosition();
  }

  /**
   * {@link move} moves the mouse cursor along a given path of {@link Point}s, according to a movement type
   * @param path Array of {@link Point}s to follow
   * @param movementType Defines the type of mouse movement. Would allow to configured acceleration etc. (Default: {@link linear}, no acceleration)
   */
  public move(
    path: Point[],
    movementType: EasingFunction = linear
  ): MouseClass {
    const pathSteps = path;
    const timeSteps = calculateMovementTimesteps(
      pathSteps.length,
      this.config.mouseSpeed,
      movementType
    );
    for (let idx = 0; idx < pathSteps.length; ++idx) {
      const node = pathSteps[idx];
      const minTime = timeSteps[idx];
      sleepSync(minTime);
      this.setPosition(node);
    }

    return this;
  }

  /**
   * {@link leftClick} performs a click with the left mouse button
   */
  public leftClick(): MouseClass {
    sleepSync(this.config.autoDelayMs);
    this.providerRegistry.getMouse().leftClick();
    return this;
  }

  /**
   * {@link rightClick} performs a click with the right mouse button
   */
  public rightClick(): MouseClass {
    sleepSync(this.config.autoDelayMs);
    this.providerRegistry.getMouse().rightClick();
    return this;
  }

  /**
   * {@link scrollDown} scrolls down for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public scrollDown(amount: number): MouseClass {
    sleepSync(this.config.autoDelayMs);
    this.providerRegistry.getMouse().scrollDown(amount);
    return this;
  }

  /**
   * {@link scrollUp} scrolls up for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public scrollUp(amount: number): MouseClass {
    sleepSync(this.config.autoDelayMs);
    this.providerRegistry.getMouse().scrollUp(amount);
    return this;
  }

  /**
   * {@link scrollLeft} scrolls left for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public scrollLeft(amount: number): MouseClass {
    sleepSync(this.config.autoDelayMs);
    this.providerRegistry.getMouse().scrollLeft(amount);
    return this;
  }

  /**
   * {@link scrollRight} scrolls right for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public scrollRight(amount: number): MouseClass {
    sleepSync(this.config.autoDelayMs);
    this.providerRegistry.getMouse().scrollRight(amount);
    return this;
  }

  /**
   * {@link drag} drags the mouse along a certain path
   * In summary, {@link drag} presses and holds the left mouse button, moves the mouse and releases the left button
   * @param path The path of {@link Point}s to drag along
   */
  public drag(path: Point[]): MouseClass {
    sleepSync(this.config.autoDelayMs);
    this.providerRegistry.getMouse().pressButton(Button.LEFT);
    this.move(path);
    this.providerRegistry.getMouse().releaseButton(Button.LEFT);
    return this;
  }

  /**
   * {@link pressButton} presses and holds a mouse button
   * @param btn The {@link Button} to press and hold
   */
  public pressButton(btn: Button): MouseClass {
    this.providerRegistry.getMouse().pressButton(btn);
    return this;
  }

  /**
   * {@link releaseButton} releases a mouse button previously pressed via {@link pressButton}
   * @param btn The {@link Button} to release
   */
  public releaseButton(btn: Button): MouseClass {
    this.providerRegistry.getMouse().releaseButton(btn);
    return this;
  }
}
