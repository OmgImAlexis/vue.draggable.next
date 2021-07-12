function getConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  }
  return global.console;
}

export const console = getConsole();
