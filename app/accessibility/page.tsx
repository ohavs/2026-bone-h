import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "הצהרת נגישות — בונה הירדן המערבי",
  description: "הצהרת הנגישות של אתר בונה הירדן המערבי בהתאם לתקן ישראלי 5568 ו-WCAG 2.1 AA.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="הצהרת נגישות"
      subtitle="Accessibility Statement"
      lastUpdated="מאי 2026"
    >
      <Section title="מחויבות לנגישות">
        <p>
          בונה הירדן המערבי מחויב להנגשת שירותיו הדיגיטליים לכלל הציבור, לרבות
          אנשים עם מוגבלויות. אנו פועלים לעמוד בדרישות תקן נגישות האינטרנט הישראלי
          לפי <strong>תקן ישראלי 5568</strong>, המבוסס על{" "}
          <strong>WCAG 2.1 ברמה AA</strong> של ארגון W3C.
        </p>
        <p>
          הצהרה זו עודכנה לאחרונה במאי 2026 ומתארת את מצב הנגישות הנוכחי של
          האתר בכתובת bone-h.co.il.
        </p>
      </Section>

      <Section title="רמת עמידה בתקן">
        <p>
          האתר עומד ברמת עמידה <strong>AA</strong> בתקן WCAG 2.1 בתחומים עיקריים,
          כמפורט להלן. אנו ממשיכים לשפר את הנגישות על בסיס מתמיד.
        </p>

        <SubSection title="תחומים בהם האתר נגיש">
          <ul>
            <li>ניווט מלא באמצעות מקלדת בלבד (Tab, Enter, Escape)</li>
            <li>קישור דילוג לתוכן הראשי בראש כל עמוד</li>
            <li>כל התמונות מכילות תיאורי alt מלאים</li>
            <li>שדות הטופס מכילים תוויות (labels) קריאות</li>
            <li>יחס ניגודיות צבע עומד בדרישות AA (4.5:1 לפחות לטקסט רגיל)</li>
            <li>הגדרת כיוון קריאה RTL תקני לכל דפי האתר</li>
            <li>מבנה כותרות היררכי ונכון (H1 → H2 → H3)</li>
            <li>אין תוכן מהבהב בתדירות העלולה לגרום להתקפים</li>
            <li>האתר מכבד את הגדרת prefers-reduced-motion ומנטרל אנימציות בהתאם</li>
            <li>מבנה סמנטי תקין (header, main, nav, footer, article, section)</li>
          </ul>
        </SubSection>

        <SubSection title="מגבלות נגישות ידועות">
          <ul>
            <li>
              <strong>תמונות Unsplash:</strong> התמונות נטענות משירות חיצוני; ייתכן
              שלחלקן אין alt text מלא ומתאים לכל הקשר. אנו משפרים זאת באופן שוטף.
            </li>
            <li>
              <strong>אנימציות מורכבות:</strong> חלק מהאנימציות מסתמכות על JavaScript.
              במצב reduced-motion הן מנוטרלות אוטומטית.
            </li>
            <li>
              <strong>סרגל גלילה מותאם (Lenis):</strong> במכשירים ישנים עלולה הגלילה
              החלקה לגרום לחוויה שונה מהצפוי.
            </li>
          </ul>
        </SubSection>
      </Section>

      <Section title="טכנולוגיות נגישות נתמכות">
        <p>האתר נבדק ונמצא עובד עם הכלים הבאים:</p>
        <ul>
          <li>NVDA עם Google Chrome (Windows)</li>
          <li>VoiceOver עם Safari (macOS / iOS)</li>
          <li>TalkBack עם Chrome (Android)</li>
          <li>ניווט מקלדת בלבד — כל דפדפן מודרני</li>
        </ul>
      </Section>

      <Section title="כלי נגישות">
        <p>
          האתר כולל כפתור נגישות בפינת המסך, המאפשר:
        </p>
        <ul>
          <li>הגדלת גופן</li>
          <li>ניגודיות גבוהה</li>
          <li>הדגשת קישורים</li>
          <li>ביטול אנימציות</li>
        </ul>
      </Section>

      <Section title="בדיקות ושיטת הערכה">
        <p>
          הנגישות נבדקה בשיטות הבאות:
        </p>
        <ul>
          <li>בדיקה ידנית עם קורא מסך ומקלדת</li>
          <li>שימוש בכלי axe DevTools לבדיקה אוטומטית</li>
          <li>בדיקת ניגודיות צבע עם WCAG Color Contrast Checker</li>
          <li>בדיקת מבנה HTML עם W3C Markup Validator</li>
        </ul>
      </Section>

      <Section title="יצירת קשר בנושאי נגישות">
        <p>
          נתקלתם בבעיית נגישות? אנו מזמינים אתכם לפנות אלינו ונפעל לתקן בהקדם:
        </p>
        <ul>
          <li>
            <strong>דוא"ל:</strong>{" "}
            <a href="mailto:hello@bone-h.co.il" className="text-bone-deep underline-offset-4 hover:underline">
              hello@bone-h.co.il
            </a>
          </li>
          <li>
            <strong>טלפון:</strong>{" "}
            <a href="tel:+97240000000" dir="ltr" className="text-bone-deep underline-offset-4 hover:underline">
              +972 4 000 0000
            </a>
          </li>
          <li>
            <strong>זמן מענה מצופה:</strong> עד 5 ימי עבודה
          </li>
        </ul>
        <p>
          אם לא קיבלתם מענה מספק תוך 45 ימים, ניתן לפנות לנציב שוויון זכויות
          לאנשים עם מוגבלויות במשרד המשפטים.
        </p>
      </Section>

      <Section title="מידע נוסף">
        <p>
          הצהרת נגישות זו הוכנה בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלויות
          (התאמות נגישות לשירות), התשע"ג-2013, ועל פי המלצות הנחיות{" "}
          <a
            href="https://www.w3.org/WAI/WCAG21/quickref/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone-deep underline-offset-4 hover:underline"
          >
            WCAG 2.1
          </a>{" "}
          של ארגון W3C.
        </p>
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

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="mb-2 font-heb text-[1rem] font-normal text-bone-ink/90">{title}</h3>
      <div className="text-[14px] leading-[1.85] text-bone-ink/75">{children}</div>
    </div>
  );
}
