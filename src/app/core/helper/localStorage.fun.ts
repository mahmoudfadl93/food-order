import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";

export const localStorages: any | undefined = () => {
  const id = inject(PLATFORM_ID);
  return isPlatformBrowser(id) ? window['localStorage'] : undefined;
};
