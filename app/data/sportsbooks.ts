export interface Sportsbook {
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
    oddsQuality: number;
    appExperience: number;
  };
}

export const sportsbooks: Sportsbook[] = [
  {
    id: 'bet365',
    name: 'Bet365',
    logo: '/images/sponsors/bet365-badge.jpg',
    stripImage: '/images/sponsors/bet365-strip.jpg',
    tagline: 'Best all-around sportsbook',
    url: 'https://bet365.com',
    countries: ['US', 'UK', 'CA', 'AU', 'DE'],
    usStates: ['NJ', 'CO', 'OH', 'VA', 'KY', 'IA', 'LA'],
    ratings: {
      bonusValue: 85,
      withdrawalSpeed: 95,
      oddsQuality: 90,
      appExperience: 88,
    },
  },
  {
    id: 'draftkings',
    name: 'DraftKings',
    logo: '/images/sponsors/draftkings-badge.jpg',
    stripImage: '/images/sponsors/draftkings-strip.jpg',
    tagline: 'Great for daily fantasy crossover',
    url: 'https://draftkings.com',
    countries: ['US'],
    usStates: ['NJ', 'PA', 'MI', 'IL', 'CO', 'AZ', 'NY', 'MA', 'OH', 'MD', 'KS', 'KY', 'LA', 'IA', 'WV', 'WY', 'IN', 'TN', 'VA', 'CT'],
    ratings: {
      bonusValue: 92,
      withdrawalSpeed: 80,
      oddsQuality: 85,
      appExperience: 95,
    },
  },
  {
    id: 'fanduel',
    name: 'FanDuel',
    logo: '/images/sponsors/fanduel-badge.jpg',
    stripImage: '/images/sponsors/fanduel-strip.jpg',
    tagline: 'Slick app, same-game parlays',
    url: 'https://fanduel.com',
    countries: ['US', 'CA'],
    usStates: ['NJ', 'PA', 'MI', 'IL', 'CO', 'AZ', 'NY', 'MA', 'OH', 'MD', 'KS', 'KY', 'LA', 'IA', 'WV', 'WY', 'IN', 'TN', 'VA', 'CT'],
    ratings: {
      bonusValue: 88,
      withdrawalSpeed: 85,
      oddsQuality: 82,
      appExperience: 92,
    },
  },
  {
    id: 'caesars',
    name: 'Caesars',
    logo: '/images/sponsors/caesars-badge.jpg',
    stripImage: '/images/sponsors/caesars-strip.jpg',
    tagline: 'Vegas legacy, rewards program',
    url: 'https://caesars.com',
    countries: ['US'],
    usStates: ['NJ', 'PA', 'MI', 'IL', 'CO', 'AZ', 'NY', 'VA', 'TN', 'LA', 'MD', 'IN', 'IA', 'WV'],
    ratings: {
      bonusValue: 90,
      withdrawalSpeed: 75,
      oddsQuality: 80,
      appExperience: 78,
    },
  },
  {
    id: 'betmgm',
    name: 'BetMGM',
    logo: '/images/sponsors/betmgm-badge.jpg',
    stripImage: '/images/sponsors/betmgm-strip.jpg',
    tagline: 'Strong promos, MGM rewards',
    url: 'https://betmgm.com',
    countries: ['US'],
    usStates: ['NJ', 'PA', 'MI', 'IL', 'CO', 'AZ', 'NY', 'VA', 'TN', 'LA', 'MD', 'IN', 'IA', 'WV', 'MA', 'OH', 'KS', 'KY'],
    ratings: {
      bonusValue: 87,
      withdrawalSpeed: 78,
      oddsQuality: 83,
      appExperience: 85,
    },
  },
  {
    id: 'pointsbet',
    name: 'PointsBet',
    logo: '/images/sponsors/pointsbet-badge.jpg',
    stripImage: '/images/sponsors/pointsbet-strip.jpg',
    tagline: 'Unique PointsBetting feature',
    url: 'https://pointsbet.com',
    countries: ['US', 'AU'],
    usStates: ['NJ', 'PA', 'MI', 'IL', 'CO', 'NY', 'VA', 'IA', 'IN', 'KS', 'LA', 'MD', 'OH', 'WV'],
    ratings: {
      bonusValue: 80,
      withdrawalSpeed: 82,
      oddsQuality: 88,
      appExperience: 80,
    },
  },
];

export const usStates = [
  { code: 'AZ', name: 'Arizona' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'IA', name: 'Iowa' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MI', name: 'Michigan' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NY', name: 'New York' },
  { code: 'OH', name: 'Ohio' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WY', name: 'Wyoming' },
];

export const countries = [
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
];

export function filterSportsbooks(
  books: Sportsbook[],
  country: string,
  state?: string
): Sportsbook[] {
  return books.filter((book) => {
    if (country === 'US' && state) {
      return book.countries.includes('US') && book.usStates.includes(state);
    }
    return book.countries.includes(country);
  });
}
