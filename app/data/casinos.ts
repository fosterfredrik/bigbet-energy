export interface Casino {
  id: string;
  name: string;
  logo: string;
  stripImage: string;
  tagline: string;
  url: string;
  countries: string[];
  usStates: string[];
  ratings: {
    bonusValue: number;
    withdrawalSpeed: number;
    gameVariety: number;
    appExperience: number;
  };
}

export const casinos: Casino[] = [
  {
    id: 'betmgm-casino',
    name: 'BetMGM Casino',
    logo: '/images/sponsors/betmgm-casino-badge.jpg',
    stripImage: '/images/sponsors/betmgm-casino-strip.jpg',
    tagline: 'Largest game library in the US',
    url: 'https://casino.betmgm.com',
    countries: ['US'],
    usStates: ['NJ', 'PA', 'MI', 'WV'],
    ratings: {
      bonusValue: 90,
      withdrawalSpeed: 82,
      gameVariety: 95,
      appExperience: 88,
    },
  },
  {
    id: 'draftkings-casino',
    name: 'DraftKings Casino',
    logo: '/images/sponsors/draftkings-casino-badge.jpg',
    stripImage: '/images/sponsors/draftkings-casino-strip.jpg',
    tagline: 'Seamless sportsbook integration',
    url: 'https://casino.draftkings.com',
    countries: ['US'],
    usStates: ['NJ', 'PA', 'MI', 'WV', 'CT'],
    ratings: {
      bonusValue: 88,
      withdrawalSpeed: 80,
      gameVariety: 85,
      appExperience: 92,
    },
  },
  {
    id: 'fanduel-casino',
    name: 'FanDuel Casino',
    logo: '/images/sponsors/fanduel-casino-badge.jpg',
    stripImage: '/images/sponsors/fanduel-casino-strip.jpg',
    tagline: 'Daily promotions and rewards',
    url: 'https://casino.fanduel.com',
    countries: ['US'],
    usStates: ['NJ', 'PA', 'MI', 'WV'],
    ratings: {
      bonusValue: 85,
      withdrawalSpeed: 85,
      gameVariety: 82,
      appExperience: 90,
    },
  },
  {
    id: 'caesars-casino',
    name: 'Caesars Casino',
    logo: '/images/sponsors/caesars-casino-badge.jpg',
    stripImage: '/images/sponsors/caesars-casino-strip.jpg',
    tagline: 'Vegas experience online',
    url: 'https://casino.caesars.com',
    countries: ['US'],
    usStates: ['NJ', 'PA', 'MI', 'WV'],
    ratings: {
      bonusValue: 92,
      withdrawalSpeed: 75,
      gameVariety: 88,
      appExperience: 80,
    },
  },
  {
    id: 'borgata-casino',
    name: 'Borgata Casino',
    logo: '/images/sponsors/borgata-casino-badge.jpg',
    stripImage: '/images/sponsors/borgata-casino-strip.jpg',
    tagline: 'Atlantic City favorite',
    url: 'https://casino.borgataonline.com',
    countries: ['US'],
    usStates: ['NJ', 'PA'],
    ratings: {
      bonusValue: 82,
      withdrawalSpeed: 78,
      gameVariety: 80,
      appExperience: 75,
    },
  },
  {
    id: '888-casino',
    name: '888 Casino',
    logo: '/images/sponsors/888-casino-badge.jpg',
    stripImage: '/images/sponsors/888-casino-strip.jpg',
    tagline: 'Global brand, trusted name',
    url: 'https://888casino.com',
    countries: ['UK', 'CA', 'DE'],
    usStates: [],
    ratings: {
      bonusValue: 85,
      withdrawalSpeed: 80,
      gameVariety: 90,
      appExperience: 82,
    },
  },
];

export function filterCasinos(
  list: Casino[],
  country: string,
  state?: string
): Casino[] {
  return list.filter((item) => {
    if (country === 'US' && state) {
      return item.countries.includes('US') && item.usStates.includes(state);
    }
    return item.countries.includes(country);
  });
}
