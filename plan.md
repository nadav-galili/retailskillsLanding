# Retail-Skillz — Company Site with Live WhatsApp Bot Demo

## Project Overview
Build the marketing site for Retail-Skillz (retail-skillz.com), an Israeli B2B platform offering three products to retail companies:

1. **WhatsApp AI Bot** — AI assistant that lives in the company's WhatsApp groups, summarizes conversations, tracks tasks, monitors competitors, generates campaigns, and nudges non-responders
2. **Retail Dashboards** — Business intelligence dashboards connecting to ERP/POS systems (like Comax), showing sales, inventory, employee performance, and store analytics
3. **Learning Portal** — Video tutorial platform for retail employee training (onboarding, product knowledge, sales techniques, compliance)

The site is Hebrew RTL, targeting Israeli retail chains (fashion, sports, electronics, grocery). It includes a landing page, product pages, and a live interactive demo of the WhatsApp bot powered by Claude API.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- @anthropic-ai/sdk for Claude API (WhatsApp bot demo)
- Deploy target: Vercel (free tier)
- No database — seed data for demo in JSON/TS files

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout, Hebrew RTL, fonts, navbar, footer
│   ├── page.tsx                # Main landing page — all 3 products overview
│   ├── whatsapp-bot/
│   │   └── page.tsx            # WhatsApp Bot product page (features, pricing, use cases)
│   ├── dashboards/
│   │   └── page.tsx            # Dashboards product page (screenshots, integrations)
│   ├── learning/
│   │   └── page.tsx            # Learning Portal product page (features, sample content)
│   ├── demo/
│   │   └── page.tsx            # Live WhatsApp bot demo (full-screen chat)
│   ├── contact/
│   │   └── page.tsx            # Contact form / book a demo
│   └── api/
│       └── demo/
│           └── chat/
│               └── route.ts    # API route: Claude-powered demo chat
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Site navigation with logo, product links, CTA
│   │   └── Footer.tsx
│   ├── landing/
│   │   ├── Hero.tsx            # Main hero — Retail-Skillz brand
│   │   ├── Products.tsx        # 3 product cards overview
│   │   ├── Stats.tsx           # Social proof numbers
│   │   ├── Testimonials.tsx    # Fake testimonials (for now)
│   │   └── CTA.tsx             # Bottom CTA section
│   ├── product/
│   │   ├── ProductHero.tsx     # Reusable product page hero
│   │   ├── FeatureGrid.tsx     # Reusable feature cards grid
│   │   └── ProductCTA.tsx      # Product-specific CTA
│   └── demo/
│       ├── ChatWindow.tsx      # WhatsApp-style chat UI
│       ├── MessageBubble.tsx
│       ├── TypingIndicator.tsx
│       ├── ScenarioButtons.tsx
│       └── ChatInput.tsx
├── lib/
│   ├── claude.ts               # Claude API wrapper
│   ├── seed-data.ts            # Fake retail data for demo
│   └── prompts.ts              # System prompts for demo bot
└── types/
    └── index.ts
```

## Brand & Design Direction

**Company:** Retail-Skillz
**Tagline:** "הטכנולוגיה שמנהלת רשתות קמעונאיות"
**Tone:** Professional, modern, trustworthy. Not startup-flashy — this is B2B for retail chains. Think "the platform your operations VP would approve."

**Design:**
- Dark theme with subtle light sections for contrast
- Primary color: Deep blue (#1e3a5f or similar) — trust, professionalism
- Accent: Vibrant teal/cyan (#00b4d8 or similar) — tech, innovation
- Secondary accent: warm orange (#f77f00) for CTAs and highlights
- Typography: Load "Heebo" or "Rubik" from Google Fonts (excellent Hebrew support)
- Clean layouts, generous whitespace, professional illustrations or icons (use Lucide icons)
- Subtle animations on scroll — sections fade/slide in
- Mobile-first responsive design

## Page Content (all Hebrew)

### Main Landing (src/app/page.tsx)

**Navbar:**
- Logo: "Retail-Skillz" (or just text logo for now)
- Links: בית | בוט WhatsApp | דשבורדים | פורטל למידה | דמו חי | צור קשר
- CTA button in navbar: "קבע הדגמה"

**Hero Section:**
- Headline: "הטכנולוגיה שמנהלת רשתות קמעונאיות"
- Subline: "בוט AI לוואטסאפ, דשבורדים חכמים ופורטל הדרכות — הכל במקום אחד. בעברית. לקמעונאות."
- Primary CTA: "נסה את הבוט בחינם →" (links to /demo)
- Secondary CTA: "קבע הדגמה" (links to /contact)
- Optional: animated illustration or abstract retail-themed graphic

**Products Overview (3 cards):**

Card 1 — WhatsApp AI Bot:
- Icon: 💬 or MessageSquare from Lucide
- Title: "בוט AI לוואטסאפ"
- Description: "עוזר חכם שיושב בקבוצות הוואטסאפ של הרשת. מסכם דיונים, עוקב אחרי משימות, מנטר מתחרים ומייצר קמפיינים — אוטומטית."
- Link: "למד עוד →" to /whatsapp-bot
- Badge: "🔥 נסה דמו חי"

Card 2 — Retail Dashboards:
- Icon: 📊 or BarChart3 from Lucide
- Title: "דשבורדים לקמעונאות"
- Description: "התחברות ישירה למערכת ה-ERP שלכם. מכירות, מלאי, ביצועי עובדים וניתוח חנויות — בזמן אמת, בממשק אחד."
- Link: "למד עוד →" to /dashboards

Card 3 — Learning Portal:
- Icon: 🎓 or GraduationCap from Lucide
- Title: "פורטל הדרכות"
- Description: "פלטפורמת וידאו להכשרת עובדים. קליטה, הכרת מוצרים, טכניקות מכירה ורגולציה — עם מעקב התקדמות ומבחנים."
- Link: "למד עוד →" to /learning

**Stats Section (social proof):**
- "50+ חנויות מנוהלות" 
- "15,000+ הודעות מנותחות ביום"
- "3 רשתות קמעונאיות"
- Note: these are aspirational/approximate numbers, fine for a marketing site

**How It Works (3 steps):**
1. "מתחברים למערכות שלכם" — ERP, WhatsApp, CRM
2. "הפלטפורמה עובדת" — ניתוח, סיכומים, התראות, הדרכות
3. "אתם מקבלים שליטה" — תובנות, דוחות, צוות מיומן

**Testimonial Section:**
2-3 fake testimonials from retail managers (use generic Israeli names and titles):
- "מאז שהתחלנו עם הבוט, חסכנו שעתיים ביום על קריאת קבוצות" — יוסי כ., מנהל שיווק, רשת אופנה
- "הדשבורד חיבר לנו את כל הנתונים למקום אחד. סוף סוף רואים את התמונה המלאה" — מיכל ל., סמנכ"לית תפעול
- "פורטל ההדרכות שינה לנו את הקליטה של עובדים חדשים" — אורן ש., מנהל משאבי אנוש

**Bottom CTA:**
- "מוכנים לשדרג את הרשת שלכם?"
- CTA button: "קבע הדגמה חינם"
- Secondary: "או נסה את הבוט עכשיו →"

### WhatsApp Bot Product Page (src/app/whatsapp-bot/page.tsx)

**Hero:**
- Title: "בוט AI שיושב בקבוצות הוואטסאפ שלכם"
- Subtitle: "לא צריך אפליקציה חדשה. לא צריך הדרכה. הבוט פשוט מצטרף לקבוצות ומתחיל לעבוד."
- CTA: "נסה דמו חי →"

**Features Grid (6 features):**
1. 📋 סיכום קבוצות אוטומטי — "קורא את כל ההודעות ב-15+ קבוצות ומפיק סיכום יומי עם משימות ואחראים"
2. 🔍 מודיעין תחרותי — "מעקב אוטומטי אחרי מחירים, מבצעים ושינויים אצל המתחרים — מדווח ישירות לוואטסאפ"
3. 📢 יצירת קמפיינים — "קופי מוכן לוואטסאפ, אינסטגרם ושילוט חנויות. אומרים לבוט מה המבצע — הוא מכין את הכל"
4. 👥 מעקב השתתפות — "יודע מי לא הגיב להודעה חשובה. שולח תזכורות עדינות אוטומטית"
5. 🚨 התראות דחופות — "מזהה הודעות קריטיות (תקלות, תלונות) ומעביר אוטומטית לקבוצת ההנהלה + מייל"
6. 📊 דוחות למייל — "סיכום שבועי מפורט עם גרפים ונתונים — ישירות לתיבת המייל של ההנהלה"

**Use Cases Section:**
- מנהל שיווק — "שואל את הבוט מה עושים המתחרים, מקבל תשובה תוך שניות"
- מנהל תפעול — "מקבל סיכום יומי של כל 15 הקבוצות בלי לקרוא הודעה אחת"
- סמנכ"ל — "מקבל התראה מיידית כשיש בעיה קריטית בחנות"

**Pricing hint (not full pricing table):**
- "מתחיל מ-₪X לחודש. המחיר נקבע לפי מספר קבוצות וחנויות."
- CTA: "קבל הצעת מחיר"

### Dashboards Product Page (src/app/dashboards/page.tsx)

**Hero:**
- Title: "כל הנתונים של הרשת — במסך אחד"
- Subtitle: "מתחבר ישירות ל-Comax, Priority, SAP ומערכות ERP אחרות. מכירות, מלאי, עובדים — בזמן אמת."

**Features:**
1. 📈 מכירות בזמן אמת — "ראה מכירות לפי חנות, מוצר, קטגוריה ועובד — מתעדכן אוטומטית"
2. 📦 ניהול מלאי — "התראות על מוצרים שנגמרים, ניתוח מגמות, המלצות להזמנה"
3. 👤 ביצועי עובדים — "מעקב אחרי יעדים, מכירות פר עובד, נוכחות"
4. 🏪 השוואת חנויות — "השוואה צולבת בין סניפים על כל מדד"
5. 🔗 חיבור ל-ERP — "Comax, Priority, SAP, Hashavshevet — מתחברים בקליק"
6. 📱 מובייל — "נגיש מכל מקום, מכל מכשיר"

**Integration logos section:**
- Show logos/names of: Comax, Priority, SAP, חשבשבת (or just text: "מתחבר למערכות המובילות בישראל")

**No live demo for dashboards — just screenshots/mockups:**
- Show 2-3 placeholder dashboard screenshots (can be styled divs with fake charts for now, or just use placeholder images)

### Learning Portal Product Page (src/app/learning/page.tsx)

**Hero:**
- Title: "הכשרת עובדים שעובדת"
- Subtitle: "פלטפורמת וידאו חכמה לקליטה, הדרכה ופיתוח עובדים. עם מעקב התקדמות, מבחנים ותעודות."

**Features:**
1. 🎥 ספריית וידאו — "העלו סרטוני הדרכה, סדרו בקורסים, הוסיפו כתוביות אוטומטיות"
2. 📝 מבחנים והערכות — "בדקו ידע עם שאלונים אוטומטיים אחרי כל שיעור"
3. 📊 מעקב התקדמות — "ראו מי סיים מה, מי תקוע, ומי מצטיין — ברמת עובד, חנות ורשת"
4. 🏆 תעודות ואישורים — "הפקת תעודות אוטומטית בסיום קורס"
5. 📱 נגיש מהנייד — "עובדים לומדים מהטלפון, בהפסקה או בדרך הביתה"
6. 🤖 ניתוח AI — "הבינה המלאכותית מזהה פערי ידע ומציעה תוכנית למידה מותאמת"

### Demo Page (src/app/demo/page.tsx)

Full-screen WhatsApp-style chat interface. Same design as described in previous version.
Add a thin top bar with "← חזרה לאתר" link and "Retail-Skillz" logo.

**Chat welcome message:**
```
👋 שלום! אני הבוט החכם של Retail-Skillz.

אני עוזר למנהלי רשתות קמעונאיות לנהל את היומיום — ישירות מוואטסאפ.

🔹 שאלו אותי כל שאלה בעברית
🔹 או נסו את הכפתורים למטה

מה תרצו לבדוק? 👇
```

**6 Scenario Buttons:**
1. "📋 סיכום יומי" → "/סיכום"
2. "👥 מי חסר" → "/מי_חסר"
3. "🔍 מתחרים" → "מה המצב עם המתחרים?"
4. "📢 צור קמפיין" → "תכין טיוטה למבצע סוף עונה, 40% הנחה על נעלי ספורט"
5. "✅ משימות" → "/משימות"
6. "📊 ביצועי חנויות" → "איזו חנות הכי חלשה השבוע?"

All go through the real Claude API route — no mock responses.

**Disclaimer at bottom of chat:** "🔬 זהו דמו עם נתונים מדומים | Powered by Claude AI"

### Contact Page (src/app/contact/page.tsx)

Simple contact form:
- שם מלא (text input)
- חברה / רשת (text input)
- טלפון (tel input)
- מייל (email input)
- מה מעניין אתכם? (checkboxes: בוט WhatsApp / דשבורדים / פורטל למידה / הכל)
- הערות (textarea)
- Submit button: "שלח פנייה"

The form doesn't need to actually submit anywhere for now — just show a success message on submit. Add a TODO comment for connecting to a real backend later.

Also show:
- WhatsApp contact link: "או שלחו לנו הודעה בוואטסאפ →" with wa.me link
- Email: info@retail-skillz.com (or whatever)

## Seed Data (src/lib/seed-data.ts)

Same as before — realistic fake data for an Israeli retail sports chain:
- 15 stores across Israel (Tel Aviv, Jerusalem, Haifa, Beer Sheva, Herzliya, Netanya, Eilat, Ashdod, Rishon LeZion, Petah Tikva, Raanana, Kfar Saba, Rehovot, Hadera, Akko)
- ~40 WhatsApp group messages from today
- 3-4 competitors with price/promo data
- 5-6 open tasks
- Store performance data
- All in Hebrew with realistic Israeli names

## Claude Integration

Same system prompt as before but add Retail-Skillz branding:
```
You are the Retail-Skillz WhatsApp AI assistant, demonstrating capabilities for a retail sports chain in Israel with 15 stores.

[... same capabilities and formatting rules as before ...]

When asked about Retail-Skillz as a product, briefly explain it's a platform with three services: WhatsApp Bot, Retail Dashboards, and Learning Portal — all designed for Israeli retail chains.
```

## Environment Variables
```
ANTHROPIC_API_KEY=sk-ant-xxxxx
NEXT_PUBLIC_SITE_URL=https://retail-skillz.com
```

## SEO & Meta
- Page titles: "Retail-Skillz — הטכנולוגיה שמנהלת רשתות קמעונאיות"
- Per-product page titles: "בוט AI לוואטסאפ | Retail-Skillz" etc.
- OG descriptions in Hebrew
- OG image: generate a simple one with the logo and tagline (or placeholder)
- lang="he" dir="rtl" on html element

## Important Notes
- All content is Hebrew, all layouts RTL
- Use Heebo or Rubik font from Google Fonts
- Mobile-first — retail managers live on their phones
- No auth, no login — this is a public marketing site
- The only "live" feature is the demo chat — everything else is static content
- Keep the design consistent across all pages — same navbar, footer, color scheme
- Add smooth scroll-triggered animations on the landing page (CSS only, no heavy libraries)
- Images: use placeholder colored divs or simple SVG illustrations for now. Add TODO comments for real images later.
- The contact form stores nothing for now — just shows a thank you message

## Commands
```bash
npx create-next-app@latest retail-skillz-site --typescript --tailwind --app --src-dir
cd retail-skillz-site
npm install @anthropic-ai/sdk
npx shadcn@latest init
npx shadcn@latest add button card input textarea checkbox badge
# Then create all files per structure above
npm run dev
```
