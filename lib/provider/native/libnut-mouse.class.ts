import libnut = require("@nut-tree/libnut");
import { Button } from "../../button.enum";
import { Point } from "../../point.class";
import { MouseProviderInterface } from "../mouse-provider.interface";

export default class MouseAction implements MouseProviderInterface {
  public static buttonLookup(btn: Button): any {
    return this.ButtonLookupMap.get(btn);
  }

  private static ButtonLookupMap: Map<Button, string> = new Map<Button, string>(
    [
      [Button.LEFT, "left"],
      [Button.MIDDLE, "middle"],
      [Button.RIGHT, "right"],
    ]
  );

  constructor() {}

  public setMouseDelay(delay: number): void {
    libnut.setMouseDelay(delay);
  }

  public setMousePosition(p: Point): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.moveMouse(p.x, p.y);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public currentMousePosition(): Promise<Point> {
    return new Promise<Point>((resolve, reject) => {
      try {
        const position = libnut.getMousePos();
        resolve(new Point(position.x, position.y));
      } catch (e) {
        reject(e);
      }
    });
  }

  public leftClick(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.mouseClick(MouseAction.buttonLookup(Button.LEFT));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public rightClick(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.mouseClick(MouseAction.buttonLookup(Button.RIGHT));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public middleClick(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.mouseClick(MouseAction.buttonLookup(Button.MIDDLE));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public pressButton(btn: Button): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.mouseToggle("down", MouseAction.buttonLookup(btn));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public releaseButton(btn: Button): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.mouseToggle("up", MouseAction.buttonLookup(btn));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public scrollUp(amount: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.scrollMouse(0, amount);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public scrollDown(amount: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.scrollMouse(0, -amount);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public scrollLeft(amount: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.scrollMouse(-amount, 0);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public scrollRight(amount: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        libnut.scrollMouse(amount, 0);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
