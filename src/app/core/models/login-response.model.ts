export interface LoginResponse {
  accessToken: string;
  role: 'ORGANIZER' | 'PARTICIPANT';
  profileId: number | null;
}
