export interface Casino {
  id: string;
  name: string;
  logo: string;
  bannerImage: string;
  tagline: string;
  url: string;
  countries: string[];
  usStates: string[];
  global?: boolean;
  ratings: {
    bonusValue: number;
    payoutSpeed: number;
    gameVariety: number;
    appExperience: number;
  };
  responsibleGambling: {
    text: string;
    helpUrl: string;
  };
  termsAndConditions: string;
}

export const casinos: Casino[] = [
  {
    id: 'betmgm-casino',
    name: 'BetMGM Casino',
    logo: '/images/casinos/betmgm-logo.png',
    bannerImage: '/images/casinos/betmgm-banner.png',
    tagline: 'Largest game library in the US',
    url: 'https://casino.betmgm.com', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['MI', 'NJ', 'PA', 'WV'],
    global: true,
    ratings: {
      bonusValue: 92,
      payoutSpeed: 88,
      gameVariety: 95,
      appExperience: 90,
    },
    responsibleGambling: {
      text: '21+ | Gamble responsibly',
      helpUrl: 'https://www.betmgm.com/en/responsible-gaming',
    },
    termsAndConditions: '21+ only. Please Gamble Responsibly. See BetMGM.com for Terms. New customers only. Subject to eligibility requirements.',
  },
  {
    id: 'draftkings-casino',
    name: 'DraftKings Casino',
    logo: '/images/casinos/draftkings-logo.png',
    bannerImage: '/images/casinos/draftkings-banner.png',
    tagline: 'Seamless sportsbook integration',
    url: 'https://casino.draftkings.com', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['CT', 'MI', 'NJ', 'PA', 'WV'],
    ratings: {
      bonusValue: 88,
      payoutSpeed: 90,
      gameVariety: 88,
      appExperience: 92,
    },
    responsibleGambling: {
      text: '21+ | Gamble responsibly',
      helpUrl: 'https://www.draftkings.com/about/responsible-gaming',
    },
    termsAndConditions: '21+ only. Gaming license varies by state. See DraftKings.com for Terms. New customers only.',
  },
  {
    id: 'fanduel-casino',
    name: 'FanDuel Casino',
    logo: '/images/casinos/fanduel-logo.png',
    bannerImage: '/images/casinos/fanduel-banner.png',
    tagline: 'Daily promotions and rewards',
    url: 'https://casino.fanduel.com', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['CT', 'MI', 'NJ', 'PA', 'WV'],
    ratings: {
      bonusValue: 85,
      payoutSpeed: 85,
      gameVariety: 82,
      appExperience: 94,
    },
    responsibleGambling: {
      text: '21+ | Gamble responsibly',
      helpUrl: 'https://www.fanduel.com/rg',
    },
    termsAndConditions: '21+ and present in select states. Gambling Problem? Call 1-800-GAMBLER or visit FanDuel.com/RG.',
  },
  {
    id: 'caesars-casino',
    name: 'Caesars Casino',
    logo: '/images/casinos/caesars-logo.png',
    bannerImage: '/images/casinos/caesars-banner.png',
    tagline: 'Vegas experience online',
    url: 'https://www.caesars.com/casino', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['MI', 'NJ', 'PA', 'WV'],
    ratings: {
      bonusValue: 80,
      payoutSpeed: 85,
      gameVariety: 85,
      appExperience: 88,
    },
    responsibleGambling: {
      text: '21+ | Gamble responsibly',
      helpUrl: 'https://www.caesars.com/responsible-gaming',
    },
    termsAndConditions: '21+ and present in a participating state. Void where prohibited. New users only. See Caesars.com for full terms.',
  },
  {
    id: 'borgata-casino',
    name: 'Borgata Casino',
    logo: '/images/casinos/borgata-logo.png',
    bannerImage: '/images/casinos/borgata-banner.png',
    tagline: 'Atlantic City luxury online',
    url: 'https://www.borgataonline.com/casino', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['NJ', 'PA'],
    ratings: {
      bonusValue: 78,
      payoutSpeed: 82,
      gameVariety: 80,
      appExperience: 85,
    },
    responsibleGambling: {
      text: '21+ | Gamble responsibly',
      helpUrl: 'https://www.borgataonline.com/responsible-gaming',
    },
    termsAndConditions: '21+ only. NJ/PA only. See BorgataOnline.com for Terms. New Customer Offer.',
  },
];

export function filterCasinos(
  casinoList: Casino[],
  country: string,
  state?: string
): { results: Casino[]; isFallback: boolean } {
  let results: Casino[];
  
  if (country === 'US' && state) {
    results = casinoList.filter(casino => 
      casino.countries.includes('US') && casino.usStates.includes(state)
    );
  } else {
    results = casinoList.filter(casino => casino.countries.includes(country));
  }

  // If no local results, fall back to global casinos
  if (results.length === 0) {
    results = casinoList.filter(casino => casino.global === true);
    return { results, isFallback: true };
  }

  return { results, isFallback: false };
}
