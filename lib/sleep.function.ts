export const sleep = async (ms: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};

export const sleepSync = (milliseconds: number) => {
  const sab = new SharedArrayBuffer(4);
  const view = new Int32Array(sab);
  Atomics.wait(view, 0, 0, milliseconds);
};

export const busyWaitForNanoSeconds = (duration: number) => {
  return new Promise<void>((res) => {
    const start = process.hrtime.bigint();
    let isWaiting = true;
    while (isWaiting) {
      if (process.hrtime.bigint() - start > duration) {
        isWaiting = false;
      }
    }
    res();
  });
};
