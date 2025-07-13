declare module "wowjs" {
  export class WOW {
    constructor(options?: {
      boxClass?: string;
      animateClass?: string;
      offset?: number;
      mobile?: boolean;
      live?: boolean;
      callback?: (box: HTMLElement) => void;
      scrollContainer?: string | null;
    });
    init(): void;
    sync(): void;
    show(box: HTMLElement): void;
  }
}

// Extend the Window interface to include the WOW property
interface Window {
  WOW: typeof WOW;
}
