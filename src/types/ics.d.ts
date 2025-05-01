declare module 'ics' {
  export interface EventAttributes {
    title: string;
    description?: string;
    location?: string;
    start: [number, number, number, number, number]; // [year, month, day, hour, minute]
    end: [number, number, number, number, number]; // [year, month, day, hour, minute]
    url?: string;
    categories?: string[];
    status?: string;
    busyStatus?: string;
    organizer?: {
      name: string;
      email: string;
    };
    productId?: string;
  }

  export function createEvents(
    events: EventAttributes | EventAttributes[],
    callback: (error: Error | null, value: string | null) => void
  ): void;
} 