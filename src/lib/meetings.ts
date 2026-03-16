export const meetingProviders = ["google_meet", "zoom", "other"] as const;

export type MeetingProvider = (typeof meetingProviders)[number];

export const meetingProviderLabels: Record<MeetingProvider, string> = {
  google_meet: "Google Meet",
  zoom: "Zoom",
  other: "Otro enlace",
};

export function isMeetingProvider(value: string): value is MeetingProvider {
  return meetingProviders.includes(value as MeetingProvider);
}
