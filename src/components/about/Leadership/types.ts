export interface VideoConfig {
  type: "local" | "mux";
  src?: string;
  playbackId?: string;
}

export interface Leader {
  name: string;
  role: string;
  subtitle: string;
  image: string;
  bio: string;
  video: VideoConfig;
}
