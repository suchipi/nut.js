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

  public setMousePosition(p: Point): void {
    libnut.moveMouse(p.x, p.y);
  }

  public currentMousePosition(): Point {
    const position = libnut.getMousePos();
    return new Point(position.x, position.y);
  }

  public leftClick(): void {
    libnut.mouseClick(MouseAction.buttonLookup(Button.LEFT));
  }

  public rightClick(): void {
    libnut.mouseClick(MouseAction.buttonLookup(Button.RIGHT));
  }

  public middleClick(): void {
    libnut.mouseClick(MouseAction.buttonLookup(Button.MIDDLE));
  }

  public pressButton(btn: Button): void {
    libnut.mouseToggle("down", MouseAction.buttonLookup(btn));
  }

  public releaseButton(btn: Button): void {
    libnut.mouseToggle("up", MouseAction.buttonLookup(btn));
  }

  public scrollUp(amount: number): void {
    libnut.scrollMouse(0, amount);
  }

  public scrollDown(amount: number): void {
    libnut.scrollMouse(0, -amount);
  }

  public scrollLeft(amount: number): void {
    libnut.scrollMouse(-amount, 0);
  }

  public scrollRight(amount: number): void {
    libnut.scrollMouse(amount, 0);
  }
}
