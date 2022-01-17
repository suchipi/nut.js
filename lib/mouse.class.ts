import { Button } from "./button.enum";
import { isPoint, Point } from "./point.class";
import { busyWaitForNanoSeconds, sleep } from "./sleep.function";
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
  public async setPosition(target: Point): Promise<MouseClass> {
    if (!isPoint(target)) {
      throw Error(
        `setPosition requires a Point, but received ${JSON.stringify(target)}`
      );
    }
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        await this.providerRegistry.getMouse().setMousePosition(target);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
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
  public async move(
    path: Point[] | Promise<Point[]>,
    movementType: EasingFunction = linear
  ): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        const pathSteps = await path;
        const timeSteps = calculateMovementTimesteps(
          pathSteps.length,
          this.config.mouseSpeed,
          movementType
        );
        for (let idx = 0; idx < pathSteps.length; ++idx) {
          const node = pathSteps[idx];
          const minTime = timeSteps[idx];
          await busyWaitForNanoSeconds(minTime);
          await this.setPosition(node);
        }
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * {@link leftClick} performs a click with the left mouse button
   */
  public async leftClick(): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve) => {
      await sleep(this.config.autoDelayMs);
      await this.providerRegistry.getMouse().leftClick();
      resolve(this);
    });
  }

  /**
   * {@link rightClick} performs a click with the right mouse button
   */
  public async rightClick(): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.providerRegistry.getMouse().rightClick();
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * {@link scrollDown} scrolls down for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public async scrollDown(amount: number): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.providerRegistry.getMouse().scrollDown(amount);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * {@link scrollUp} scrolls up for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public async scrollUp(amount: number): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.providerRegistry.getMouse().scrollUp(amount);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * {@link scrollLeft} scrolls left for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public async scrollLeft(amount: number): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.providerRegistry.getMouse().scrollLeft(amount);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * {@link scrollRight} scrolls right for a given amount of "steps"
   * Please note that the actual scroll distance of a single "step" is OS dependent
   * @param amount The amount of "steps" to scroll
   */
  public async scrollRight(amount: number): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.providerRegistry.getMouse().scrollRight(amount);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * {@link drag} drags the mouse along a certain path
   * In summary, {@link drag} presses and holds the left mouse button, moves the mouse and releases the left button
   * @param path The path of {@link Point}s to drag along
   */
  public async drag(path: Point[] | Promise<Point[]>): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        await sleep(this.config.autoDelayMs);
        await this.providerRegistry.getMouse().pressButton(Button.LEFT);
        await this.move(path);
        await this.providerRegistry.getMouse().releaseButton(Button.LEFT);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * {@link pressButton} presses and holds a mouse button
   * @param btn The {@link Button} to press and hold
   */
  public async pressButton(btn: Button): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        await this.providerRegistry.getMouse().pressButton(btn);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * {@link releaseButton} releases a mouse button previously pressed via {@link pressButton}
   * @param btn The {@link Button} to release
   */
  public async releaseButton(btn: Button): Promise<MouseClass> {
    return new Promise<MouseClass>(async (resolve, reject) => {
      try {
        await this.providerRegistry.getMouse().releaseButton(btn);
        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }
}
