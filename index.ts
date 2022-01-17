import { AssertClass } from "./lib/assert.class";
import { ClipboardClass } from "./lib/clipboard.class";
import { KeyboardClass } from "./lib/keyboard.class";
import { MouseClass } from "./lib/mouse.class";
import { createMovementApi } from "./lib/movement.function";
import { ScreenClass } from "./lib/screen.class";
import { LineHelper } from "./lib/util/linehelper.class";
import { createWindowApi } from "./lib/window.function";
import providerRegistry from "./lib/provider/provider-registry.class";
import { loadImageResource } from "./lib/imageResources.function";

export {
  AssertClass,
  ClipboardClass,
  KeyboardClass,
  MouseClass,
  ScreenClass,
  providerRegistry,
};

export { MatchRequest } from "./lib/match-request.class";
export { MatchResult } from "./lib/match-result.class";
export * from "./lib/provider";

export { jestMatchers } from "./lib/expect/jest.matcher.function";
export { sleep } from "./lib/sleep.function";
export { Image } from "./lib/image.class";
export { RGBA } from "./lib/rgba.class";
export { Key } from "./lib/key.enum";
export { Button } from "./lib/button.enum";
export { centerOf, randomPointIn } from "./lib/location.function";
export { OptionalSearchParameters } from "./lib/optionalsearchparameters.class";
export { EasingFunction, linear } from "./lib/mouse-movement.function";
export { Point } from "./lib/point.class";
export { Region } from "./lib/region.class";
export { Window } from "./lib/window.class";
export { FileType } from "./lib/file-type.enum";
export { ColorMode } from "./lib/colormode.enum";

const lineHelper = new LineHelper();

const clipboard = new ClipboardClass(providerRegistry);
const keyboard = new KeyboardClass(providerRegistry);
const mouse = new MouseClass(providerRegistry);
const screen = new ScreenClass(providerRegistry);
const assert = new AssertClass(screen);

const { straightTo, up, down, left, right } = createMovementApi(
  providerRegistry,
  lineHelper
);
const { getWindows, getActiveWindow } = createWindowApi(providerRegistry);

const loadImage = providerRegistry.getImageReader().load;
const saveImage = providerRegistry.getImageWriter().store;

const imageResource = (fileName: string) =>
  loadImageResource(
    providerRegistry,
    screen.config.resourceDirectory,
    fileName
  );

export {
  clipboard,
  keyboard,
  mouse,
  screen,
  assert,
  straightTo,
  up,
  down,
  left,
  right,
  getWindows,
  getActiveWindow,
  loadImage,
  saveImage,
  imageResource,
};
