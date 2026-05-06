import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "תנאי שימוש — בונה הירדן המערבי",
  description: "תנאי השימוש של אתר בונה הירדן המערבי.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="תנאי שימוש"
      subtitle="Terms of Use"
      lastUpdated="מאי 2026"
    >
      <Section title="כללי">
        <p>
          ברוכים הבאים לאתר בונה הירדן המערבי (bone-h.co.il). השימוש באתר
          מהווה הסכמה מלאה לתנאי שימוש אלה. אם אינכם מסכימים לתנאים, אנא
          הימנעו משימוש באתר.
        </p>
        <p>
          בונה הירדן המערבי (להלן: "החברה") שומרת לעצמה את הזכות לשנות תנאים
          אלה בכל עת. שינויים מהותיים יפורסמו בדף זה עם תאריך עדכון חדש.
        </p>
      </Section>

      <Section title="מטרת האתר">
        <p>
          האתר משמש כאתר תדמית ופורטפוליו להצגת פרויקטי נדל"ן של החברה. המידע
          המוצג באתר הוא למטרות מידע כללי בלבד ואינו מהווה הצעה לעסקה, ייעוץ
          השקעות, ייעוץ משפטי או כל ייעוץ מקצועי אחר.
        </p>
      </Section>

      <Section title={'הגבלת אחריות בנושא נדל"ן'}>
        <p>
          <strong>חשוב לשים לב:</strong>
        </p>
        <ul>
          <li>
            המידע לגבי פרויקטים, מחירים, זמינות ומאפיינים נכון למועד פרסומו
            ועשוי להשתנות ללא הודעה מוקדמת.
          </li>
          <li>
            תמונות ועיצובים המוצגים הם לצורכי המחשה בלבד ועשויים להיות שונים
            ממוצר הסופי.
          </li>
          <li>
            החברה אינה אחראית להחלטות פיננסיות שיתקבלו על סמך המידע באתר.
            יש להתייעץ עם אנשי מקצוע מוסמכים (עורך דין, שמאי, יועץ משכנתאות)
            לפני קבלת החלטת רכישה.
          </li>
          <li>
            אין באמור באתר משום הבטחה לתשואה, ערך עתידי או זמינות של יחידות
            לרכישה.
          </li>
        </ul>
      </Section>

      <Section title="קניין רוחני">
        <p>
          כל התכנים באתר, לרבות טקסטים, תמונות, עיצוב, לוגו, גרפיקה וקוד
          התוכנה, הם רכוש החברה או של בעלי זכויות אחרים שנתנו לה רישיון שימוש,
          ומוגנים על פי חוק זכויות יוצרים, התשס"ח-2007.
        </p>
        <p>
          חל איסור מוחלט על העתקה, שכפול, הפצה, שידור, פרסום, מכירה או שינוי
          של כל חלק מתכני האתר ללא אישור מפורש בכתב מהחברה.
        </p>
        <p>
          שימוש מותר: ניתן לשתף קישורים לדפי האתר לצרכים אישיים ולא מסחריים.
        </p>
      </Section>

      <Section title="תמונות ואייקונים">
        <p>
          חלק מהתמונות באתר מקורן ב-Unsplash ומשמשות לצורכי המחשה. תמונות אלה
          כפופות לרישיון Unsplash. לפרטים:{" "}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone-deep underline-offset-4 hover:underline"
          >
            unsplash.com/license
          </a>
          .
        </p>
      </Section>

      <Section title="איסורי שימוש">
        <p>חל איסור להשתמש באתר לצרכים הבאים:</p>
        <ul>
          <li>כל שימוש בלתי חוקי או המפר זכויות צד שלישי</li>
          <li>הפצת ספאם, וירוסים או קוד זדוני</li>
          <li>ניסיון לפרוץ, לגרד (scrape) או להציף את שרתי האתר</li>
          <li>התחזות לחברה, לעובדיה או לגורמים אחרים</li>
          <li>איסוף מידע אישי על משתמשים אחרים</li>
        </ul>
      </Section>

      <Section title="הגבלת אחריות כללית">
        <p>
          האתר מסופק "כפי שהוא" (AS IS) ללא אחריות מכל סוג. החברה אינה אחראית
          לנזקים ישירים, עקיפים, מקריים, תוצאתיים או עונשיים הנובעים מ:
        </p>
        <ul>
          <li>שימוש או אי-יכולת שימוש באתר</li>
          <li>שגיאות, השמטות או אי-דיוקים בתוכן</li>
          <li>פריצות אבטחה שמחוץ לשליטתנו הסבירה</li>
          <li>אי-זמינות זמנית של האתר</li>
        </ul>
        <p>
          על אף האמור לעיל, אחריות החברה, אם תקבע, לא תעלה על הסכום ששילמתם
          לחברה בשנה שקדמה לאירוע הנזק.
        </p>
      </Section>

      <Section title="פרטיות">
        <p>
          השימוש שאנו עושים במידע האישי שלכם מפורט במלואו ב
          <a href="/privacy" className="text-bone-deep underline-offset-4 hover:underline mx-1">
            מדיניות הפרטיות
          </a>
          שלנו, המהווה חלק בלתי נפרד מתנאי שימוש אלה.
        </p>
      </Section>

      <Section title="נגישות">
        <p>
          החברה מחויבת לנגישות דיגיטלית. פרטים נוספים מופיעים ב
          <a href="/accessibility" className="text-bone-deep underline-offset-4 hover:underline mx-1">
            הצהרת הנגישות
          </a>
          שלנו.
        </p>
      </Section>

      <Section title="דין וסמכות שיפוט">
        <p>
          תנאי שימוש אלה כפופים לחוקי מדינת ישראל. כל מחלוקת הנובעת מהם תידון
          בבתי המשפט המוסמכים במחוז הצפון, ישראל, בלבד.
        </p>
      </Section>

      <Section title="יצירת קשר">
        <p>לכל שאלה הנוגעת לתנאי שימוש אלה:</p>
        <ul>
          <li>
            <strong>דוא"ל:</strong>{" "}
            <a
              href="mailto:hello@bone-h.co.il"
              className="text-bone-deep underline-offset-4 hover:underline"
            >
              hello@bone-h.co.il
            </a>
          </li>
          <li>
            <strong>טלפון:</strong>{" "}
            <a
              href="tel:+97240000000"
              dir="ltr"
              className="text-bone-deep underline-offset-4 hover:underline"
            >
              +972 4 000 0000
            </a>
          </li>
        </ul>
      </Section>
    </LegalPage>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-heb text-[1.2rem] font-normal text-bone-ink">{title}</h2>
      <div className="space-y-3 text-[14px] leading-[1.85] text-bone-ink/80">{children}</div>
    </section>
  );
}
