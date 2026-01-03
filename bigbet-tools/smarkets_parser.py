#!/usr/bin/env python3
"""
Smarkets Market Analyzer
========================
Parses JSON exports from Smarkets (via Ultimate Web Scraper) and ranks markets by volume.

Usage:
    python smarkets_parser.py <json_file>
    python smarkets_parser.py <json_file> --top 5
    python smarkets_parser.py <json_file> --sport soccer
    python smarkets_parser.py <json_file> --json  # Output as JSON for further processing
"""

import json
import argparse
import sys
from datetime import datetime


def parse_sek(val):
    """Parse SEK currency string to float, handling non-breaking spaces."""
    if not val:
        return 0
    try:
        clean = str(val).replace('SEK', '').replace('\xa0', '').replace(' ', '').replace(',', '')
        return float(clean)
    except:
        return 0


def decimal_to_probability(decimal_odds):
    """Convert decimal odds to implied probability percentage."""
    try:
        odds = float(decimal_odds)
        if odds > 0:
            return round((1 / odds) * 100, 1)
    except:
        pass
    return None


def extract_odds(item):
    """Extract all outcomes with their odds and probabilities."""
    odds = []
    
    # Get team names if available (for match-specific filtering)
    team1 = (item.get('team_name') or '').lower()
    team2 = (item.get('team_name_1') or '').lower()
    is_match = bool(team1 and team2)  # This is a head-to-head match
    
    # First outcome (no suffix)
    if item.get('contract_label') and item.get('price'):
        prob = decimal_to_probability(item['price'])
        if prob:
            odds.append({
                'label': item['contract_label'],
                'decimal': float(item['price']),
                'probability': prob
            })
    
    # For matches (soccer, tennis, etc.), only take first 2-3 outcomes
    # (Home/Draw/Away or Player1/Player2)
    max_outcomes = 3 if is_match else 15
    
    # Numbered outcomes (1, 2, 3, etc.)
    for i in range(1, max_outcomes):
        label_key = f'contract_label_{i}'
        price_key = f'price_{i}'
        
        label = item.get(label_key)
        price = item.get(price_key)
        
        if label and price:
            prob = decimal_to_probability(price)
            if prob:
                odds.append({
                    'label': label,
                    'decimal': float(price),
                    'probability': prob
                })
    
    # Sort by probability descending (favorite first)
    odds.sort(key=lambda x: x['probability'], reverse=True)
    
    return odds


def parse_smarkets_json(filepath):
    """Load and parse Smarkets JSON export."""
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    events = []
    
    for item in data:
        # Sum all volume fields (volume_value, volume_value_1, volume_value_2, etc.)
        total_vol = parse_sek(item.get('volume_value'))
        for i in range(1, 15):
            total_vol += parse_sek(item.get(f'volume_value_{i}'))
        
        # Build matchup string
        t1 = item.get('team_name', '')
        t2 = item.get('team_name_1', '')
        matchup = f"{t1} vs {t2}" if t1 and t2 else ''
        
        # Extract all odds
        odds = extract_odds(item)
        
        # Get favorite (highest probability)
        favorite = odds[0] if odds else None
        
        events.append({
            'title': item.get('title', ''),
            'matchup': matchup,
            'sport': item.get('formatted_content', ''),
            'url': item.get('url', ''),
            'volume_sek': total_vol,
            'volume_usd': int(total_vol * 0.09),  # Approximate SEK to USD
            'markets': item.get('market_count', ''),
            'time': item.get('time') or item.get('time_1') or '',
            'status': item.get('event_badge', ''),
            'odds': odds,  # Full odds breakdown
            'favorite': favorite['label'] if favorite else '',
            'favorite_odds': favorite['decimal'] if favorite else '',
            'favorite_prob': favorite['probability'] if favorite else '',
        })
    
    return events


def filter_events(events, sport=None, active_only=True, min_volume=0):
    """Filter events by criteria."""
    filtered = events
    
    if active_only:
        filtered = [e for e in filtered if 'Ended' not in str(e.get('status', ''))]
    
    if sport:
        sport_lower = sport.lower()
        filtered = [e for e in filtered if sport_lower in e.get('sport', '').lower()]
    
    if min_volume > 0:
        filtered = [e for e in filtered if e['volume_sek'] >= min_volume]
    
    return filtered


def rank_by_volume(events):
    """Sort events by volume descending."""
    return sorted(events, key=lambda x: x['volume_sek'], reverse=True)


def get_sport_breakdown(events):
    """Aggregate volume by sport."""
    sports = {}
    for e in events:
        s = e['sport'] or 'Unknown'
        sports[s] = sports.get(s, 0) + e['volume_sek']
    return dict(sorted(sports.items(), key=lambda x: x[1], reverse=True))


def print_report(events, top_n=12):
    """Print formatted report to console."""
    ranked = rank_by_volume(events)
    active = filter_events(ranked, active_only=True)
    
    print()
    print("=" * 70)
    print("SMARKETS MARKETS — RANKED BY VOLUME")
    print("=" * 70)
    print()
    
    for i, e in enumerate(active[:top_n], 1):
        name = e['matchup'] if e['matchup'] else e['title']
        league = e['title'] if e['matchup'] else ''
        
        print(f"{i:2}. {name}")
        if league:
            print(f"    {league} | {e['sport']}")
        else:
            print(f"    {e['sport']}")
        print(f"    Volume: SEK {e['volume_sek']:,.0f} (~${e['volume_usd']:,} USD)")
        
        # Show full odds breakdown
        if e['odds']:
            odds_str = " | ".join([f"{o['label']} {o['probability']}%" for o in e['odds'][:4]])
            print(f"    Odds: {odds_str}")
        
        if e['time']:
            print(f"    Starts: {e['time']}")
        print()
    
    # Sport breakdown
    print("=" * 70)
    print("VOLUME BY SPORT")
    print("=" * 70)
    breakdown = get_sport_breakdown(events)
    for sport, vol in breakdown.items():
        if vol > 0:
            print(f"  {sport}: SEK {vol:,.0f} (~${int(vol*0.09):,})")
    
    # Content recommendations
    print()
    print("=" * 70)
    print("🎯 CONTENT RECOMMENDATIONS")
    print("=" * 70)
    
    # Top soccer
    soccer = [e for e in active if e['sport'] == 'Soccer']
    if soccer:
        best = max(soccer, key=lambda x: x['volume_sek'])
        print(f"\n⚽ TOP SOCCER: {best['matchup'] or best['title']}")
        if best['matchup']:
            print(f"   {best['title']}")
        print(f"   ${best['volume_usd']:,} volume")
        if best['odds']:
            print(f"   OddsBar: {' | '.join([f'{o['label']} {o['probability']}%' for o in best['odds'][:3]])}")
    
    # Top non-racing
    other = [e for e in active if e['sport'] not in ['Soccer', 'Horse Racing'] and e['volume_sek'] > 10000]
    if other:
        best = max(other, key=lambda x: x['volume_sek'])
        print(f"\n🎯 TOP OTHER: {best['matchup'] or best['title']} ({best['sport']})")
        print(f"   ${best['volume_usd']:,} volume")
        if best['odds']:
            print(f"   OddsBar: {' | '.join([f'{o['label']} {o['probability']}%' for o in best['odds'][:3]])}")
    
    # Special matchups detection
    for e in active:
        m = str(e.get('matchup', '')).lower()
        # Old Firm
        if 'celtic' in m and 'rangers' in m:
            print(f"\n🔥 OLD FIRM DERBY DETECTED")
        # El Clasico
        if 'barcelona' in m and ('real madrid' in m or 'madrid' in m):
            print(f"\n🔥 EL CLASICO DETECTED")
        # Derby
        if 'manchester' in m and ('united' in m and 'city' in m):
            print(f"\n🔥 MANCHESTER DERBY DETECTED")
    
    print()


def output_json(events, top_n=20):
    """Output filtered events as JSON."""
    ranked = rank_by_volume(events)
    active = filter_events(ranked, active_only=True)[:top_n]
    print(json.dumps(active, indent=2))


def output_oddsbar(events, top_n=10):
    """Output events in OddsBar component format for posts."""
    ranked = rank_by_volume(events)
    active = filter_events(ranked, active_only=True)[:top_n]
    
    today = datetime.now().strftime("%b %Y")
    
    oddsbar_items = []
    for e in active:
        if not e['odds']:
            continue
            
        market_name = e['matchup'] if e['matchup'] else e['title']
        if e['matchup'] and e['title']:
            market_name = f"{e['title']}: {e['matchup']}"
        
        oddsbar = {
            "type": "OddsBar",
            "props": {
                "market": market_name,
                "date": today,
                "source": "Smarkets",
                "variant": "light",
                "odds": [
                    {"label": o['label'], "value": int(o['probability'])}
                    for o in e['odds'][:4]
                ]
            },
            "_meta": {
                "sport": e['sport'],
                "volume_usd": e['volume_usd'],
                "url": e['url'],
                "time": e['time']
            }
        }
        oddsbar_items.append(oddsbar)
    
    print(json.dumps(oddsbar_items, indent=2))


def main():
    parser = argparse.ArgumentParser(
        description='Parse Smarkets JSON export and rank markets by volume',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 smarkets_parser.py export.json
  python3 smarkets_parser.py export.json --top 5
  python3 smarkets_parser.py export.json --sport soccer
  python3 smarkets_parser.py export.json --json > today.json
  python3 smarkets_parser.py export.json --oddsbar > oddsbar.json
        """
    )
    parser.add_argument('file', help='Path to Smarkets JSON export')
    parser.add_argument('--top', type=int, default=12, help='Number of top events to show (default: 12)')
    parser.add_argument('--sport', type=str, help='Filter by sport (e.g., soccer, tennis, darts)')
    parser.add_argument('--min-volume', type=int, default=0, help='Minimum volume in SEK')
    parser.add_argument('--json', action='store_true', help='Output as JSON instead of report')
    parser.add_argument('--oddsbar', action='store_true', help='Output as OddsBar component format for posts')
    parser.add_argument('--all', action='store_true', help='Include ended events')
    
    args = parser.parse_args()
    
    try:
        events = parse_smarkets_json(args.file)
    except FileNotFoundError:
        print(f"Error: File not found: {args.file}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON file: {args.file}", file=sys.stderr)
        sys.exit(1)
    
    # Apply filters
    events = filter_events(
        events, 
        sport=args.sport, 
        active_only=not args.all,
        min_volume=args.min_volume
    )
    
    if args.oddsbar:
        output_oddsbar(events, args.top)
    elif args.json:
        output_json(events, args.top)
    else:
        print_report(events, args.top)


if __name__ == '__main__':
    main()
