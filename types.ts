
export type Vibe = 
  | 'Midnight Drive' 
  | 'Ethereal Dreams' 
  | 'Heartbreak Hotel' 
  | 'Study Sanctuary' 
  | 'Nostalgia Ultra';

export interface VideoDrop {
  id: string;
  title: string;
  youtubeId: string;
  vibe: Vibe;
  thumbnail: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
