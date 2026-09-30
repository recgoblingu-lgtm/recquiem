const root = "/reference-assets/Icons";

export const siteAssets = {
  logo: `${root}/default.png`,
  face: `${root}/face.png`,
  hero: `${root}/Banner.jpg`,
  features: {
    crossPlatform: `${root}/Cross-Platform.png`,
    create: `${root}/Create.jpg`,
    compete: `${root}/Compete.jpg`,
    cooperate: `${root}/Cooperate.jpg`,
  },
  navigation: {
    home: `${root}/buttons/Home.png`,
    rooms: `${root}/buttons/Rooms.png`,
    people: `${root}/buttons/People.png`,
    events: `${root}/buttons/Events.png`,
    settings: `${root}/buttons/Settings.png`,
    credits: `${root}/buttons/Credit.png`,
  },
} as const;
