#!/usr/bin/env python3
"""
BBE Transform v1
Transforms NotebookLM SERP analysis output into production JSON for bigbet.energy
Usage: python3 bbe_transform_v1.py <notebooklm-output.txt> <slug>
Example: python3 bbe_transform_v1.py online-casino-output.txt online-casino
"""

import sys
import json
from datetime import datetime
from openai import OpenAI

# ── CONFIG ────────────────────────────────────────────────────────────────────
XAI_API_KEY = "xai-mhf1gCXeZ4glvHmAkMpYV8wb7gaOMV3Optbt6ma9PIwxDsUGwK1wU5iPzYHt57XZQN7ZttMeneiiF0zj"
MODEL = "grok-3"

client = OpenAI(
    api_key=XAI_API_KEY,
    base_url="https://api.x.ai/v1"
)

# ── TRANSFORMATION PROMPT ─────────────────────────────────────────────────────
TRANSFORMATION_PROMPT = """You are transforming a NotebookLM SERP analysis into production JSON for bigbet.energy — an independent editorial gambling guide.

---

## YOUR TASK

You will receive structured plain text output from NotebookLM. Your job is to transform it into a complete, valid JSON object matching the BBE schema exactly.

---

## BBE JSON SCHEMA

Produce this exact structure. Every field is required unless marked optional.

```json
{
  "slug": "{{SLUG}}",
  "template": "operator",
  "type": "{{TYPE}}",
  "country": "{{COUNTRY}}",
  "locale": "{{LOCALE}}",
  "keyword": "{{KEYWORD}}",
  "searchIntent": "{{SEARCH_INTENT}}",
  "h1": "{{H1}}",
  "searchMetadata": {
    "totalAnalyzed": {{TOTAL_URLS}},
    "dateAnalyzed": "{{DATE}}",
    "verificationDate": "{{VERIFICATION_DATE}}"
  },
  "verdict": {
    "summary": "One sentence. Why the winner wins. Max 150 chars."
  },
  "winner": {
    "name": "Operator name",
    "domain": "domain.com",
    "affiliateUrl": "https://domain.com",
    "affiliateLabel": "Spela på [Name] →",
    "logo": "/images/guides/[name-lowercase]-logo.png",
    "googleRank": 0,
    "upsellLine": "Max 12 words. Punchy. Why this is the right choice right now.",
    "whyItWins": "2-3 sentences. Factual. Why this operator wins for this market. 150-300 chars.",
    "badges": ["Badge 1", "Badge 2", "Badge 3", "Badge 4"],
    "sectionBadge": "Redaktionell analys",
    "materialEvidence": [
      { "title": "Evidence title", "description": "One factual verifiable sentence." },
      { "title": "Evidence title", "description": "One factual verifiable sentence." },
      { "title": "Evidence title", "description": "One factual verifiable sentence." }
    ],
    "customerReview": {
      "quote": "1-2 sentence editorial quote from industry expert perspective.",
      "date": "{{VERIFICATION_DATE}}",
      "author": "BigBet.Energy redaktion"
    },
    "termsAndConditions": "18+. Spela ansvarsfullt. Fullständiga villkor på [domain]. Stödlinjen: 020-81 91 00. Självavstängning via Spelpaus.se.",
    "specs": {
      "whatYouGet": [
        { "label": "Licens", "value": "Spelinspektionen (Sverige)" },
        { "label": "Uttag", "value": "..." },
        { "label": "Betalmetoder", "value": "..." },
        { "label": "Spelpaus", "value": "Fullt integrerat" },
        { "label": "Kundtjänst", "value": "..." },
        { "label": "Mobilapp", "value": "..." }
      ],
      "certifications": [
        "Spelinspektionen-licens verifierad",
        "Spelpaus-integration bekräftad",
        "Ansvarsfull spelande-verktyg tillgängliga",
        "BankID-inloggning stöds",
        "Trustly Pay N Play aktiverat"
      ]
    }
  },
  "runnerUps": [
    {
      "name": "Operator name",
      "domain": "domain.com",
      "affiliateUrl": "https://domain.com",
      "affiliateLabel": "Spela på [Name] →",
      "logo": "/images/guides/[name-lowercase]-logo.png",
      "googleRank": 0,
      "keyBenefit": "Max 6 words. Single strongest feature.",
      "whyRunnerUp": "2-3 sentences. Why runner-up not winner."
    }
  ],
  "theBubble": {
    "name": "Operator name",
    "domain": "domain.com",
    "affiliateUrl": "https://domain.com",
    "affiliateLabel": "Kolla in [Name] →",
    "googleRank": 0,
    "explanation": "2-3 sentences. Why Google should rank this but doesn't.",
    "evidence": ["Factual point 1", "Factual point 2", "Factual point 3"]
  },
  "bestsellerWarning": "One sentence. Why the top Google results mislead Swedish players.",
  "failureCards": [
    {
      "badge": "Max 20 chars. 2-3 word failure label.",
      "domain": "domain.com",
      "productName": "Site name",
      "googleRank": 0,
      "whyItFailed": "2-3 sentences. Factual. Specific harm to Swedish players. Max 280 chars."
    }
  ],
  "methodology": {
    "steps": [
      {
        "num": 1,
        "title": "Samlade top {{TOTAL_URLS}} Google-resultat",
        "text": "LEAVE EMPTY — generated dynamically"
      },
      {
        "num": 2,
        "title": "Klassificerade varje URL",
        "text": "LEAVE EMPTY — generated dynamically"
      },
      {
        "num": 3,
        "title": "Step 3 title from NotebookLM",
        "text": "Step 3 text from NotebookLM. 2-3 sentences."
      },
      {
        "num": 4,
        "title": "Step 4 title from NotebookLM",
        "text": "Step 4 text from NotebookLM. 2-3 sentences."
      }
    ]
  },
  "rankingCriteria": ["Criterion 1", "Criterion 2", "Criterion 3", "Criterion 4", "Criterion 5"],
  "serpResults": [
    {
      "googleRank": 1,
      "domain": "domain.com",
      "name": "Site name",
      "verdict": "licensed-operator",
      "verdictLabel": "Licensierad operatör",
      "licensed": true,
      "commentary": "One sentence. Factual. No adjectives."
    }
  ],
  "peopleShouldAlsoAsk": [
    { "question": "Question?", "answer": "Answer. Factual. 2-3 sentences." }
  ],
  "finalCTA": {
    "headline": "Vårt förstaval",
    "text": "1-2 sentences. Why the winner is the right choice."
  }
}
```

---

## FIELD RULES

### slug
Use exactly: {{SLUG}}

### type
- "operator" for casino/spelbolag/sportsbetting keywords
- "game" for roulette/blackjack/slots keywords

### country / locale
Extract from MARKET CONFIG in the NotebookLM output:
- Sverige → country: "sverige", locale: "sv"
- UK → country: "uk", locale: "en"
- Brasil → country: "brasil", locale: "pt"

### keyword
Exact search query from MARKET CONFIG. Lowercase.

### searchIntent
Human-readable version of the keyword for display. Title case. Examples:
- "online casino" → "Online Casino Sverige"
- "casino med swish" → "Casino med Swish Sverige"
- "sports betting" → "Sports Betting Sverige"

### h1
Format exactly: "#1 [Keyword Title Case] i [Country] [Year]"
Examples:
- "#1 Online Casino i Sverige 2026"
- "#1 Casino med Swish i Sverige 2026"

### searchMetadata.totalAnalyzed
Count of all serpResults entries in the NotebookLM output.

### searchMetadata.dateAnalyzed
Today's date in Swedish format: "DD månad YYYY" e.g. "27 mars 2026"

### searchMetadata.verificationDate
Month + year in Swedish: "Mars 2026"

### winner.googleRank
The actual Google rank of the winner from serpResults. Look it up.

### winner.badges
Exactly 4 badges. Specific, verifiable. Examples:
✅ "Spelinspektionen-licens"
✅ "Uttag inom 24h"
✅ "Spelpaus integrerat"
✅ "BankID-inloggning"
❌ "Great casino" (too generic)
❌ "Best choice" (not verifiable)

### winner.logo / runnerUps[].logo
Format: "/images/guides/[name-lowercase-no-spaces]-logo.png"
Examples:
- Casumo → "/images/guides/casumo-logo.png"
- LeoVegas → "/images/guides/leovegas-logo.png"
- Ninja Casino → "/images/guides/ninja-casino-logo.png"

### winner.affiliateUrl / runnerUps[].affiliateUrl
Use "https://[domain]" as placeholder. Editor will replace with real affiliate URL.

### winner.affiliateLabel
Format: "Spela på [Name] →"

### winner.termsAndConditions
Always include: 18+, Spela ansvarsfullt, Stödlinjen: 020-81 91 00, Spelpaus.se
Adapt helpline per locale if not Sverige.

### winner.specs.whatYouGet
Always 6 items. Use what you know about the operator. If unknown, use "Kontakta operatören".

### winner.specs.certifications
Always 5 items. Adapt to what applies to this operator.

### runnerUps
Exactly 2 runner-ups. Use the operators specified in MY TOP PICKS.

### theBubble
An operator NOT in the top 100 that deserves to rank. If NotebookLM output does not include one, set theBubble to null.

### failureCards
Exactly 3. Use the failure sites from FAILURE CARDS section.
badge STRICT max 20 chars — count every character including spaces before writing.
whyItFailed max 280 chars.

badge examples:
✅ "Oklar avsändare" (16 chars)
✅ "Ej licensierad" (15 chars)
✅ "Ingen ägarinfo" (15 chars)
✅ "Kringgår Spelpaus" (18 chars)
❌ "Olicensierad Marknadsföring" (27 chars — too long)
❌ "Olicensierad Operatör" (21 chars — too long)

If your badge exceeds 20 chars, shorten it. Never truncate with "..." — rewrite it shorter.

### methodology.steps
Steps 1 and 2: set title correctly but leave text as empty string "".
Steps 3 and 4: use titles and text from METHODOLOGY STEPS in NotebookLM output.

### rankingCriteria
Extract from RANKING CRITERIA section. Array of strings. 5-7 items.

### serpResults
Include ALL URLs from the NotebookLM SERP RESULTS section sorted by googleRank ascending.
For each entry:
- verdict must be one of: licensed-operator, legit-affiliate, seo-grab, shady-affiliate, unlicensed, irrelevant
- verdictLabel in Swedish:
  - licensed-operator → "Licensierad operatör"
  - legit-affiliate → "Seriös affiliate"
  - seo-grab → "SEO-grab"
  - shady-affiliate → "Tveksam affiliate"
  - unlicensed → "Ej licensierad"
  - irrelevant → "Irrelevant"
- licensed:
  - licensed-operator → true
  - unlicensed → false
  - all others → null

### peopleShouldAlsoAsk
5 questions. These are NOT generic FAQs. They are expert-curated questions that a smart first-time player SHOULD be asking but doesn't know to ask. Focus on:
- License verification
- Consumer protection
- How to spot bad actors in this SERP
- What criteria actually matter for this keyword
- Market-specific regulation

### finalCTA
headline: always "Vårt förstaval"
text: 1-2 sentences referencing the winner by name.

---

## CRITICAL RULES

1. Output ONLY valid JSON. No markdown, no backticks, no explanation text.
2. Never use placeholder text like "TBD", "TODO", "placeholder" or "..."
3. Never invent facts. Use only what is in the NotebookLM output.
4. All text fields in Swedish for locale "sv", English for "en", Portuguese for "pt"
5. serpResults must include every single URL from the input, sorted by googleRank
6. Exactly 3 failureCards, exactly 2 runnerUps, exactly 4 badges, exactly 3 materialEvidence
7. methodology steps 1 and 2 text must be empty string ""
8. googleRank values must be integers, licensed must be true/false/null

---

## INPUT

SLUG: {{SLUG}}

{notebooklm_text}
"""

# ── VALIDATION ────────────────────────────────────────────────────────────────
def validate(data):
    errors = []
    warnings = []

    # Required top-level fields
    required = ['slug', 'template', 'type', 'country', 'locale', 'keyword',
                'searchIntent', 'h1', 'searchMetadata', 'verdict', 'winner',
                'runnerUps', 'failureCards', 'methodology', 'rankingCriteria',
                'serpResults', 'peopleShouldAlsoAsk', 'finalCTA']
    for field in required:
        if field not in data:
            errors.append(f"❌ Missing required field: {field}")

    # winner fields
    winner = data.get('winner', {})
    if len(winner.get('badges', [])) != 4:
        errors.append(f"❌ winner.badges must have exactly 4 items, found {len(winner.get('badges', []))}")
    else:
        print(f"✅ Exactly 4 badges")

    if len(winner.get('materialEvidence', [])) != 3:
        errors.append(f"❌ winner.materialEvidence must have exactly 3 items")
    else:
        print(f"✅ Exactly 3 materialEvidence items")

    upsell = winner.get('upsellLine', '')
    word_count = len(upsell.split())
    if word_count > 12:
        warnings.append(f"⚠️  upsellLine: {word_count} words (max 12)")
    else:
        print(f"✅ upsellLine: {word_count} words")

    why = winner.get('whyItWins', '')
    if len(why) < 150 or len(why) > 300:
        warnings.append(f"⚠️  whyItWins: {len(why)} chars (recommended 150-300)")
    else:
        print(f"✅ whyItWins: {len(why)} chars")

    if len(winner.get('specs', {}).get('whatYouGet', [])) < 6:
        warnings.append(f"⚠️  whatYouGet: less than 6 items")
    else:
        print(f"✅ whatYouGet: {len(winner.get('specs', {}).get('whatYouGet', []))} items")

    # runnerUps
    runners = data.get('runnerUps', [])
    if len(runners) != 2:
        errors.append(f"❌ runnerUps must have exactly 2 items, found {len(runners)}")
    else:
        print(f"✅ Exactly 2 runnerUps")

    # failureCards
    failures = data.get('failureCards', [])
    if len(failures) != 3:
        errors.append(f"❌ failureCards must have exactly 3 items, found {len(failures)}")
    else:
        print(f"✅ Exactly 3 failureCards")

    for idx, card in enumerate(failures):
        badge = card.get('badge', '')
        if len(badge) > 20:
            errors.append(f"❌ failureCards[{idx}].badge: {len(badge)} chars (max 20)")
        why_failed = card.get('whyItFailed', '')
        if len(why_failed) > 280:
            errors.append(f"❌ failureCards[{idx}].whyItFailed: {len(why_failed)} chars (max 280)")

    # methodology steps
    steps = data.get('methodology', {}).get('steps', [])
    if len(steps) < 4:
        errors.append(f"❌ methodology.steps must have at least 4 steps, found {len(steps)}")
    else:
        print(f"✅ {len(steps)} methodology steps")
        for step in steps[:2]:
            if step.get('text', '') != '':
                warnings.append(f"⚠️  methodology step {step.get('num')} text should be empty string (auto-generated)")

    # serpResults
    serp = data.get('serpResults', [])
    if len(serp) == 0:
        errors.append(f"❌ serpResults is empty")
    else:
        print(f"✅ {len(serp)} serpResults entries")

    valid_verdicts = {'licensed-operator', 'legit-affiliate', 'seo-grab', 'shady-affiliate', 'unlicensed', 'irrelevant'}
    for idx, result in enumerate(serp):
        if result.get('verdict') not in valid_verdicts:
            errors.append(f"❌ serpResults[{idx}] invalid verdict: {result.get('verdict')}")
        if 'licensed' not in result:
            errors.append(f"❌ serpResults[{idx}] missing licensed field")

    # peopleShouldAlsoAsk
    psaa = data.get('peopleShouldAlsoAsk', [])
    if len(psaa) < 5:
        warnings.append(f"⚠️  peopleShouldAlsoAsk: {len(psaa)} items (recommended 5)")
    else:
        print(f"✅ {len(psaa)} peopleShouldAlsoAsk entries")

    # h1 format
    h1 = data.get('h1', '')
    if not h1.startswith('#1'):
        errors.append(f"❌ h1 must start with '#1', got: {h1}")
    else:
        print(f"✅ h1: {h1}")

    # verdict summary length
    summary = data.get('verdict', {}).get('summary', '')
    if len(summary) > 150:
        warnings.append(f"⚠️  verdict.summary: {len(summary)} chars (max 150)")
    else:
        print(f"✅ verdict.summary: {len(summary)} chars")

    # rankingCriteria
    criteria = data.get('rankingCriteria', [])
    if len(criteria) < 5:
        warnings.append(f"⚠️  rankingCriteria: {len(criteria)} items (recommended 5-7)")
    else:
        print(f"✅ {len(criteria)} rankingCriteria")

    # Print results
    if errors:
        print("\n❌ VALIDATION ERRORS:")
        for e in errors:
            print(f"   {e}")
    if warnings:
        print("\n⚠️  WARNINGS:")
        for w in warnings:
            print(f"   {w}")
    if not errors and not warnings:
        print("\n✅ All validations passed!")

    return data, errors


# ── TRANSFORM ─────────────────────────────────────────────────────────────────
def transform(notebooklm_text, slug):
    print(f"\n🔄 Sending to Grok ({MODEL})...")

    prompt = TRANSFORMATION_PROMPT.replace("{{SLUG}}", slug).replace("{notebooklm_text}", notebooklm_text)

    response = client.chat.completions.create(
    model=MODEL,
    max_tokens=16000,
    temperature=0.1,
    messages=[
        {
            "role": "system",
            "content": "You are a precise JSON transformation engine. Output only valid JSON. No markdown, no backticks, no explanation."
        },
        {
            "role": "user",
            "content": prompt
        }
    ]
)

    result = response.choices[0].message.content.strip()

    # Strip markdown code fences if present
    if result.startswith("```"):
        lines = result.split('\n')
        result = '\n'.join(lines[1:-1])

    try:
        data = json.loads(result)
        return data
    except json.JSONDecodeError as e:
        print(f"❌ JSON parse error: {e}")
        print(f"\nGrok output (first 500 chars):\n{result[:500]}")
        sys.exit(1)


# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    if len(sys.argv) < 3:
        print("Usage: python3 bbe_transform_v1.py <notebooklm-output.txt> <slug>")
        print("\nExample:")
        print("  python3 bbe_transform_v1.py online-casino-output.txt online-casino")
        sys.exit(1)

    notebooklm_file = sys.argv[1]
    slug = sys.argv[2]

    # Read input
    try:
        with open(notebooklm_file, 'r', encoding='utf-8') as f:
            notebooklm_text = f.read()
    except FileNotFoundError:
        print(f"❌ File not found: {notebooklm_file}")
        sys.exit(1)

    print(f"📄 Input: {notebooklm_file} ({len(notebooklm_text)} chars)")
    print(f"🎯 Slug: {slug}")

    # Transform
    data = transform(notebooklm_text, slug)

    # Validate
    print(f"\n🔍 Validating output...")
    data, errors = validate(data)

    # Save
    output_file = f"{slug}.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Saved: {output_file}")
    print(f"🏆 Winner: {data.get('winner', {}).get('name', 'N/A')}")
    print(f"🥈 Runners-up: {len(data.get('runnerUps', []))}")
    print(f"💥 Failures: {len(data.get('failureCards', []))}")
    print(f"📊 SERP results: {len(data.get('serpResults', []))}")
    print(f"❓ PSAA: {len(data.get('peopleShouldAlsoAsk', []))}")

    if errors:
        print(f"\n⚠️  {len(errors)} validation error(s) — review before deploying")
        sys.exit(1)


if __name__ == "__main__":
    main()
