export interface Sportsbook {
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
    oddsQuality: number;
    appExperience: number;
  };
  responsibleGambling: {
    text: string;
    helpUrl: string;
  };
  termsAndConditions: string;
}

export const sportsbooks: Sportsbook[] = [
  {
    id: 'fanduel',
    name: 'FanDuel',
    logo: '/images/sportsbooks/fanduel-logo.png',
    bannerImage: '/images/sportsbooks/fanduel-banner.png',
    tagline: 'America\'s #1 Sportsbook',
    url: 'https://fanduel.com', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['AZ', 'CO', 'CT', 'DC', 'IA', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'MI', 'NC', 'NH', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'VT', 'WV', 'WY'],
    ratings: {
      bonusValue: 68,
      payoutSpeed: 85,
      oddsQuality: 88,
      appExperience: 94,
    },
    responsibleGambling: {
      text: '21+ | Gambling Problem? Call 1-800-GAMBLER',
      helpUrl: 'https://www.fanduel.com/rg',
    },
    termsAndConditions: '21+ and present in select states. Gambling Problem? Call 1-800-GAMBLER or visit FanDuel.com/RG. First online real money wager only. $5 first deposit required. Bonus issued as nonwithdrawable bonus bets that expire 7 days after receipt.',
  },
  {
    id: 'betmgm',
    name: 'BetMGM',
    logo: '/images/sportsbooks/betmgm-logo.png',
    bannerImage: '/images/sportsbooks/betmgm-banner.png',
    tagline: 'The King of Sportsbooks',
    url: 'https://betmgm.com', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['AZ', 'CO', 'DC', 'IA', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'MI', 'MS', 'NC', 'NJ', 'NV', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
    ratings: {
      bonusValue: 95,
      payoutSpeed: 90,
      oddsQuality: 80,
      appExperience: 89,
    },
    responsibleGambling: {
      text: '21+ | Gambling Problem? Call 1-800-GAMBLER',
      helpUrl: 'https://www.betmgm.com/en/responsible-gaming',
    },
    termsAndConditions: '21+ only. Please Gamble Responsibly. See BetMGM.com for Terms. First Bet Offer for new customers only. Subject to eligibility requirements. Bonus bets are non-withdrawable and expire 7 days after receipt.',
  },
  {
    id: 'bet365',
    name: 'Bet365',
    logo: '/images/sportsbooks/bet365-logo.png',
    bannerImage: '/images/sportsbooks/bet365-banner.png',
    tagline: 'World\'s Favorite Sportsbook',
    url: 'https://bet365.com', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['AZ', 'CO', 'IN', 'IA', 'KY', 'LA', 'NJ', 'NC', 'OH', 'PA', 'VA'],
    global: true,
    ratings: {
      bonusValue: 70,
      payoutSpeed: 88,
      oddsQuality: 95,
      appExperience: 90,
    },
    responsibleGambling: {
      text: '21+ | Gambling Problem? Call 1-800-GAMBLER',
      helpUrl: 'https://www.bet365.com/responsiblegambling',
    },
    termsAndConditions: '21+ (18+ KY). New customers only. Min $10 deposit. Bonus Bets wager excluded from returns. T&Cs, time limits and exclusions apply.',
  },
  {
    id: 'betrivers',
    name: 'BetRivers',
    logo: '/images/sportsbooks/betrivers-logo.png',
    bannerImage: '/images/sportsbooks/betrivers-banner.png',
    tagline: 'Fast Payouts, Great Odds',
    url: 'https://betrivers.com', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['AZ', 'CO', 'CT', 'IL', 'IN', 'IA', 'KY', 'LA', 'MD', 'MI', 'NC', 'NJ', 'NY', 'OH', 'PA', 'VA', 'WV'],
    ratings: {
      bonusValue: 75,
      payoutSpeed: 95,
      oddsQuality: 82,
      appExperience: 95,
    },
    responsibleGambling: {
      text: '21+ | Gambling Problem? Call 1-800-GAMBLER',
      helpUrl: 'https://www.betrivers.com/responsible-gaming/',
    },
    termsAndConditions: '21+ only. New users only. Must be physically present in a legal state. Bonus Bet equal to stake up to $500 if first bet loses. Bonus Bet issued within 24 hours and expires 30 days after receipt.',
  },
  {
    id: 'borgata',
    name: 'Borgata',
    logo: '/images/sportsbooks/borgata-logo.png',
    bannerImage: '/images/sportsbooks/borgata-banner.png',
    tagline: 'Atlantic City\'s Finest',
    url: 'https://borgataonline.com', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['NJ', 'PA'],
    ratings: {
      bonusValue: 78,
      payoutSpeed: 80,
      oddsQuality: 78,
      appExperience: 86,
    },
    responsibleGambling: {
      text: '21+ | Gambling Problem? Call 1-800-GAMBLER',
      helpUrl: 'https://www.borgataonline.com/responsible-gaming',
    },
    termsAndConditions: '21+ only. NJ/PA only. See BorgataOnline.com for Terms. New Customer Offer. Subject to eligibility requirements. Bonus bets are non-withdrawable.',
  },
  {
    id: 'caesars',
    name: 'Caesars',
    logo: '/images/sportsbooks/caesars-logo.png',
    bannerImage: '/images/sportsbooks/caesars-banner.png',
    tagline: 'Bet Like a Caesar',
    url: 'https://caesars.com/sportsbook', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['AZ', 'CO', 'IA', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'MI', 'NC', 'NJ', 'NV', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV', 'WY'],
    ratings: {
      bonusValue: 75,
      payoutSpeed: 92,
      oddsQuality: 85,
      appExperience: 93,
    },
    responsibleGambling: {
      text: '21+ | Gambling Problem? Call 1-800-GAMBLER',
      helpUrl: 'https://www.caesars.com/responsible-gaming',
    },
    termsAndConditions: '21+ and present in a participating state. Void where prohibited. New users only. Must register using eligible promo code. Bonus Bet expires 14 days after receipt. See Caesars.com/promos for full terms.',
  },
  {
    id: 'fanatics',
    name: 'Fanatics',
    logo: '/images/sportsbooks/fanatics-logo.png',
    bannerImage: '/images/sportsbooks/fanatics-banner.png',
    tagline: 'Earn While You Bet',
    url: 'https://sportsbook.fanatics.com', // Replace with Raketech tracking link
    countries: ['US'],
    usStates: ['AZ', 'CO', 'CT', 'IA', 'IL', 'IN', 'KS', 'KY', 'MA', 'MD', 'MI', 'NC', 'NJ', 'NY', 'OH', 'PA', 'TN', 'VA', 'WV'],
    ratings: {
      bonusValue: 90,
      payoutSpeed: 78,
      oddsQuality: 75,
      appExperience: 95,
    },
    responsibleGambling: {
      text: '21+ | Gambling Problem? Call 1-800-GAMBLER',
      helpUrl: 'https://sportsbook.fanatics.com/responsible-gaming',
    },
    termsAndConditions: '21+ and present in select states. New customers only. Must opt-in and wager $10+ cash on any market with odds -500 or longer. FanCash expires 7 days from issuance. See Fanatics Sportsbook app for full terms.',
  },
];

export const countries = [
  { code: 'US', name: 'United States' }
];

export const usStates = [
  { code: 'AZ', name: 'Arizona' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DC', name: 'Washington DC' },
  { code: 'IA', name: 'Iowa' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NY', name: 'New York' },
  { code: 'OH', name: 'Ohio' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'VA', name: 'Virginia' },
  { code: 'VT', name: 'Vermont' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WY', name: 'Wyoming' },
];

export function filterSportsbooks(
  books: Sportsbook[],
  country: string,
  state?: string
): { results: Sportsbook[]; isFallback: boolean } {
  let results: Sportsbook[];
  
  if (country === 'US' && state) {
    results = books.filter(book => 
      book.countries.includes('US') && book.usStates.includes(state)
    );
  } else {
    results = books.filter(book => book.countries.includes(country));
  }

  // If no local results, fall back to global books
  if (results.length === 0) {
    results = books.filter(book => book.global === true);
    return { results, isFallback: true };
  }

  return { results, isFallback: false };
}
