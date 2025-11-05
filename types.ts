
export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

export interface Section {
  id: string;
  title: string;
  videos: Video[];
}

export interface VideoData {
  sections: Section[];
}
   