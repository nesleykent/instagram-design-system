import PageContainer from "@/components/docs/PageContainer";
import PageHeader from "@/components/docs/PageHeader";
import Section from "@/components/docs/Section";
import ImplementationNote from "@/components/docs/ImplementationNote";
import DoDontGrid from "@/components/docs/DoDontGrid";
import styles from "./writing.module.css";

export const metadata = { title: "Voice & Writing" };

const PRINCIPLES = [
  {
    name: "Direct",
    description: "Every word earns its place. Instagram copy never pads out to fill space — it states the thing and stops.",
    examples: [
      { correct: "Share", wrong: "Share this post with your followers" },
      { correct: "Follow", wrong: "Start following this account" },
      { correct: "Edit profile", wrong: "Edit your profile information" },
    ],
  },
  {
    name: "Warm",
    description: "The tone is friendly and human — never clinical. Avoid corporate or technical language at all interaction points.",
    examples: [
      { correct: "Something went wrong", wrong: "An error occurred (code 500)" },
      { correct: "No posts yet", wrong: "This user has not published any content" },
      { correct: "You're all caught up!", wrong: "End of feed results" },
    ],
  },
  {
    name: "Playful but purposeful",
    description: "Personality shows up in moments of delight — empty states, onboarding, success states — not in utility labels where clarity is the job.",
    examples: [
      { correct: "Your story's up! ✨", wrong: "Upload successful" },
      { correct: "Post", wrong: "Publish" },
      { correct: "Send", wrong: "Transmit" },
    ],
  },
  {
    name: "Inclusive",
    description: "Language never assumes gender, relationship status, or ability. Default to neutral forms; avoid colloquialisms that exclude.",
    examples: [
      { correct: "Your followers", wrong: "Your fans / your guys" },
      { correct: "People you follow", wrong: "Accounts you follow" },
      { correct: "Add a photo", wrong: "Take or upload a photo" },
    ],
  },
];

const COPY_PATTERNS = [
  {
    surface: "Button labels",
    rule: "Verb only — no articles, no objects. Max 2 words.",
    dos: ["Post", "Follow", "Share", "Save", "Edit", "Decline", "Allow"],
    donts: ["Post now", "Follow this account", "Share to feed", "Save to collection"],
  },
  {
    surface: "Empty states",
    rule: "Explain what's missing, then invite action. One short headline + one supporting sentence max.",
    dos: ["No posts yet\nWhen you share photos and videos, they'll appear here.", "Nothing here yet\nFollow people to see their posts in your feed."],
    donts: ["No content found.", "You have not posted any items.", "This section is empty because you have not created any content."],
  },
  {
    surface: "Error messages",
    rule: "Plain language. Say what happened, then what to do. Never blame the user.",
    dos: ["Something went wrong. Try again.", "This username is already taken.", "Photo couldn't be uploaded — check your connection."],
    donts: ["Error 422: Unprocessable entity", "You entered an invalid password", "Upload failed due to network connectivity issues"],
  },
  {
    surface: "Confirmations & toasts",
    rule: "Past tense, confirming the completed action. No punctuation for toasts. Three words maximum.",
    dos: ["Saved", "Post deleted", "Reported", "Link copied"],
    donts: ["Your post has been successfully deleted!", "The link has been copied to your clipboard.", "Saved successfully."],
  },
  {
    surface: "Onboarding & permission prompts",
    rule: "Explain the benefit first, then the ask. Never mention technical terms like 'access' or 'permission'.",
    dos: ["See friends' stories\nInstagram will use your location to show nearby events.", "Turn on notifications\nGet notified when people comment on your posts."],
    donts: ["Instagram requires access to your location", "Grant camera permissions to continue"],
  },
  {
    surface: "Follow / action CTA",
    rule: "State label matches the current state, not the future action. The transition is the feedback.",
    dos: ["Follow → Following (after tap)", "Like → Liked (filled heart)", "Save → Saved (filled bookmark)"],
    donts: ["Unfollow → showing 'Unfollow' as the resting state label", "Following → 'Click to unfollow'"],
  },
];

const TONE_SCALE = [
  {
    context: "Utility / navigation",
    personality: "None — pure clarity",
    example: "Home · Search · Reels · Messages · Profile",
    avoid: "Do not add tone to navigation labels. They're wayfinding.",
  },
  {
    context: "Form labels & placeholders",
    personality: "Helpful, neutral",
    example: "Name · Bio · Website",
    avoid: "Avoid question-format placeholders: 'What's your name?' is not an Instagram pattern.",
  },
  {
    context: "Action buttons",
    personality: "Direct, action-first",
    example: "Post · Share · Follow · Save",
    avoid: "No adverbs or time-qualifiers: 'Post now', 'Quickly share' are not Instagram's register.",
  },
  {
    context: "Empty states & zero data",
    personality: "Warm, inviting",
    example: "No posts yet. When you share photos and videos, they'll appear here.",
    avoid: "Never leave a surface empty with no copy — always explain the zero state and invite an action.",
  },
  {
    context: "Error states",
    personality: "Calm, solution-oriented",
    example: "Something went wrong. Try again.",
    avoid: "Never expose error codes or blame the user ('You must be online to do this').",
  },
  {
    context: "Celebration / success moments",
    personality: "Warm, brief, can use emoji",
    example: "Your story's up! ✨ · Posted · Sent",
    avoid: "Exclamation marks only in genuine celebration moments — never on utility confirmations.",
  },
  {
    context: "Notifications",
    personality: "Personal, conversational",
    example: "@noa liked your photo. · @joel and 12 others started following you.",
    avoid: "Passive constructions: 'A like was added to your photo' is not Instagram's register.",
  },
];

const FORMATTING_RULES = [
  { rule: "Sentence case everywhere", detail: "Instagram uses sentence case for UI strings — not Title Case. 'Edit profile' not 'Edit Profile'. Exception: proper nouns." },
  { rule: "Minimal punctuation", detail: "Button labels and short toasts: no end punctuation. Sentence-length copy: punctuate normally. Never use semicolons in product copy." },
  { rule: "Numbers as numerals", detail: "Always '3 posts', never 'three posts'. Abbreviate above 999: 1K, 2.4M, 1.1B — no decimal for round thousands (1K not 1.0K)." },
  { rule: "@ mentions are inline", detail: "@username runs directly into the sentence. 'Liked by @juliannekim and 14 others.' — no space before the @ and no parentheses." },
  { rule: "Hashtags use no space", detail: "#reels runs into the sentence without a preceding space if it's mid-sentence. Use as nouns, not verbs." },
  { rule: "Emoji are optional, not required", detail: "Use emoji in celebration, onboarding, and brand moments. Never in error states, permission prompts, or navigation." },
  { rule: "Inclusive number formatting", detail: "'3 likes', not '3 like'. Use plural for all counts except 1 ('1 post', '2 posts'). This includes 0: '0 posts' not '0 post'." },
];

export default function WritingPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Foundations"
        title="Voice & Writing"
        description="Instagram's voice is direct, warm, and playful without being silly. Every string — from button labels to error messages — follows the same register: say the thing, in the fewest words, in a human tone."
      />

      <Section
        kicker="Voice principles"
        title="Four pillars of the Instagram voice"
        description="These principles apply to every surface. They are not a sliding scale — a button label needs to be direct AND warm AND purposeful AND inclusive simultaneously."
      >
        <div className={styles.principleGrid}>
          {PRINCIPLES.map((p) => (
            <div key={p.name} className={styles.principleCard}>
              <p className={styles.principleName}>{p.name}</p>
              <p className={styles.principleDesc}>{p.description}</p>
              <div className={styles.principleExamples}>
                {p.examples.map((ex, i) => (
                  <div key={i} className={styles.principleExample}>
                    <span className={styles.exampleCorrect}>{ex.correct}</span>
                    <span className={styles.exampleNot}>not</span>
                    <span className={styles.exampleWrong}>{ex.wrong}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Tone scale"
        title="Personality by surface"
        description="Tone isn't fixed — it shifts with context. Navigation labels get zero personality; empty states and celebration moments earn the most. Match the weight of the moment."
      >
        <div className={styles.toneTable}>
          <div className={[styles.toneRow, styles.toneHeader].join(" ")}>
            <span>Surface</span>
            <span>Personality level</span>
            <span>Example</span>
            <span>What to avoid</span>
          </div>
          {TONE_SCALE.map((row) => (
            <div key={row.context} className={styles.toneRow}>
              <span className={styles.toneContext}>{row.context}</span>
              <span className={styles.tonePersonality}>{row.personality}</span>
              <span className={styles.toneExample}><em>{row.example}</em></span>
              <span className={styles.toneAvoid}>{row.avoid}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Copy patterns"
        title="Rules by surface type"
        description="Each surface type has a specific word count, sentence pattern, and personality level. The right pattern for the wrong surface sounds off — always match pattern to context."
      >
        <div className={styles.patternList}>
          {COPY_PATTERNS.map((pat) => (
            <div key={pat.surface} className={styles.patternCard}>
              <div className={styles.patternHeader}>
                <p className={styles.patternSurface}>{pat.surface}</p>
                <p className={styles.patternRule}>{pat.rule}</p>
              </div>
              <div className={styles.patternColumns}>
                <div className={styles.patternCol}>
                  <p className={styles.patternColLabel}>Do</p>
                  {pat.dos.map((d, i) => (
                    <p key={i} className={styles.patternDo}>{d}</p>
                  ))}
                </div>
                <div className={styles.patternCol}>
                  <p className={styles.patternColLabel}>Don&apos;t</p>
                  {pat.donts.map((d, i) => (
                    <p key={i} className={styles.patternDont}>{d}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Formatting"
        title="Punctuation, numbers & casing"
        description="Instagram's formatting rules are mostly invisible when followed — they only become visible when violated."
      >
        <div className={styles.formattingList}>
          {FORMATTING_RULES.map((r) => (
            <div key={r.rule} className={styles.formattingRow}>
              <p className={styles.formattingRule}>{r.rule}</p>
              <p className={styles.formattingDetail}>{r.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <DoDontGrid
        items={[
          { type: "do", title: "Use sentence case", body: "'Edit profile', 'Add to story', 'Manage subscriptions' — not title-cased." },
          { type: "do", title: "Let the action be the confirmation", body: "After a like tap, the icon fills and a count increments. No toast needed — the icon change IS the feedback." },
          { type: "do", title: "Name what's missing in empty states", body: "'No posts yet' tells the user what the surface is for. 'Nothing here' doesn't." },
          { type: "do", title: "Abbreviate large numbers", body: "'1.2M followers' — not '1,200,000 followers'. Match the format Instagram uses in production." },
          { type: "dont", title: "Don't show error codes", body: "No code 500, no HTTP status, no technical identifiers in user-facing strings. Plain language only." },
          { type: "dont", title: "Don't use passive voice", body: "'Your post was deleted' reads as system language. 'Post deleted' is the Instagram register." },
          { type: "dont", title: "Don't add filler words to buttons", body: "'Post' not 'Post now'. 'Share' not 'Share this'. Every extra word dilutes the action." },
          { type: "dont", title: "Don't use Title Case for UI labels", body: "Instagram UI strings are in sentence case. 'Edit Profile' and 'Share To Story' look incorrect in this system." },
        ]}
      />

      <ImplementationNote title="Translation and localisation">
        These voice principles apply to English. For localised builds, the core rules — directness, warmth, sentence case, minimal punctuation — translate across languages. However, number formatting, emoji conventions, and sentence patterns vary significantly. Always work with native speakers for localised copy; never rely on direct translation of English strings.
      </ImplementationNote>
    </PageContainer>
  );
}
