// Minimal type declarations for browser-transpiled JSX
// React and ReactDOM are loaded via CDN in the HTML

declare const React: typeof import("react");
declare const ReactDOM: typeof import("react-dom/client");

declare interface Window {
  RentInAlvinAPI?: {
    submitTour: (data: any) => Promise<{ success: boolean; error?: string; data?: any }>;
    submitApplication: (data: any) => Promise<{ success: boolean; error?: string; data?: any }>;
    submitSellProperty: (data: any) => Promise<{ success: boolean; error?: string; data?: any }>;
    submitContact: (data: any) => Promise<{ success: boolean; error?: string; data?: any }>;
    submitInquiry: (data: any) => Promise<{ success: boolean; error?: string; data?: any }>;
  };
  __openBooking?: (propId?: string) => void;
  __openInquiry?: (propertyName?: string) => void;
  Availability?: any;
  Apply?: any;
  FAQ?: any;
  SellProperty?: any;
  TourBooking?: any;
  useTweaks?: any;
  TweaksPanel?: any;
  TweakSection?: any;
  TweakRadio?: any;
  TweakSelect?: any;
  TweakToggle?: any;
  Shared?: any;
  useAvailability?: any;
  AlvinMap?: any;
  DesignCanvas?: any;
  DCSection?: any;
  DCArtboard?: any;
  TourBookingFlow?: any;
}
