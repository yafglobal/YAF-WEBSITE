// Shared configuration for the watch page hub and continent routes

export interface PlaylistConfig {
  id: string;
  title: string;
}

export interface CountryConfig {
  name: string;
  flag: string;
  playlists: PlaylistConfig[];
}

export interface ContinentConfig {
  name: string;
  slug: string;
  countries: CountryConfig[];
}

// AYAC Global Church playlists (Nigeria HQ)
const AYAC_GLOBAL_PLAYLISTS: PlaylistConfig[] = [
  { id: "PLvndVG-sYL-uTlKxKry4dr9z_6tZRwrlI", title: "AYAC 2025 — Global Church" },
  { id: "PLvndVG-sYL-utpNLcZ_r8R1ZE-vUojYNj", title: "AYAC 2024 — Global Church" },
  { id: "PLvndVG-sYL-s8B4bWNeMcEMMDmozY9uDS", title: "AYAC 2023 — Global Church" },
];

export const CONTINENTS: ContinentConfig[] = [
  {
    name: "Africa",
    slug: "africa",
    countries: [
      {
        name: "Nigeria",
        flag: "🇳🇬",
        playlists: AYAC_GLOBAL_PLAYLISTS,
      },
      {
        name: "Kenya",
        flag: "🇰🇪",
        playlists: [{ id: "PLuvXgLl_YONcNsQDtRMPbs5YdpAmqJsCm", title: "Youth Alive Nairobi" }],
      },
    ],
  },
  {
    name: "North America",
    slug: "north-america",
    countries: [
      {
        name: "Canada",
        flag: "🇨🇦",
        playlists: [
          { id: "PLZOdi9XtMZfiXIs-qOGFhbABQ50OmGUIo", title: "Youth Alive Fellowship Canada" },
        ],
      },
      {
        name: "USA",
        flag: "🇺🇸",
        playlists: [
          { id: "PLuvXgLl_YONfXZdbO9At15vIDT1j2ojex", title: "Youth Alive Fellowship USA" },
        ],
      },
    ],
  },
  {
    name: "Europe",
    slug: "europe",
    countries: [
      {
        name: "United Kingdom",
        flag: "🇬🇧",
        playlists: [
          {
            id: "PLuvXgLl_YONevjsA5j4fIhWGJhKZz9QLC",
            title: "Youth Alive Fellowship United Kingdom",
          },
        ],
      },
    ],
  },
];

// Canada channel ID is used for additional channel-level playlists
export const CANADA_CHANNEL_PLAYLIST_ID = "PLZOdi9XtMZfiXIs-qOGFhbABQ50OmGUIo";

/** Get all playlist IDs across all continents (flat) */
export function getAllPlaylistIds(): string[] {
  return CONTINENTS.flatMap((c) =>
    c.countries.flatMap((country) => country.playlists.map((p) => p.id))
  );
}

/** Find a continent config by slug */
export function getContinentBySlug(slug: string): ContinentConfig | undefined {
  return CONTINENTS.find((c) => c.slug === slug);
}
