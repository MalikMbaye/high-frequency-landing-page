/* Section 6: THE CAPTIVATION
   Framework: Authority (#7) + Social Proof (#16) + Credibility (#4).
   Key framing: these people came to HFH. Not the other way around. */

const notables = [
  {
    name: "Will.i.am",
    title: "Black Eyed Peas Founder / Tech Investor",
    story: 'The Black Eyed Peas founder and tech investor followed HFH on Instagram for two years before meeting Jay at CES 2025. He walked out of a private event, saw Jay, and said on camera: "I follow you. You\'re the frequency dude." He tried the headphones, started brainstorming innovation ideas on the spot, and gave Jay his personal phone number. Nobody paid for that. That\'s what happens when the technology is real.',
    featured: true,
  },
  {
    name: "Everett Taylor",
    title: "CEO of Kickstarter",
    story: "The CEO of the world's largest crowdfunding platform tried the headphones on stage. His exact words: he felt like he was transported. He now uses them to calm his mind after back-to-back meetings and says they work better than melatonin. He didn't just endorse the product. He told Jay to launch on his platform.",
    featured: true,
  },
  {
    name: "Kyrie Irving",
    title: "NBA Champion",
    story: 'NBA star and consciousness advocate. Tried the technology during All-Star Weekend, told Jay on camera: "This sounds fire. Talk to my team. Don\'t forget."',
    featured: false,
  },
];

const alsoFollowing = [
  "Conor McGregor (UFC Champion)",
  "Steve Aoki (DJ/Producer)",
  "Jhene Aiko (Grammy-nominated artist, collab post at Coachella)",
  "19 Keys (consciousness influencer, 9-minute on-camera demo)",
  "Mike Rashid (fitness influencer, 1.3M followers)",
];

export const Testimonials = () => {
  return (
    <section className="relative py-24 md:py-36 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="fade-in-up max-w-3xl mb-14">
          <p className="text-brand font-display text-xs font-medium tracking-[0.25em] uppercase mb-5">
            They came to us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.05] mb-6">
            We Didn&apos;t Pay for Any of This. They Came to Us.
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            We didn&apos;t pitch anyone. We didn&apos;t hire a PR firm. We didn&apos;t pay for a single endorsement. Every person below found High Frequency Highway on their own and responded the same way.
          </p>
        </div>

        <div className="fade-in-up max-w-md mx-auto mb-14">
          <img
            src="/images/marketing-they-came-to-us.png"
            alt="They Came To Us — Will.i.am, Kickstarter CEO, Kyrie Irving, Conor McGregor, Steve Aoki, Jhene Aiko, 19 Keys. No PR firm. No paid endorsements. No pitch decks."
            className="w-full h-auto rounded-2xl shadow-2xl shadow-brand/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {notables.map((n, i) => (
            <div
              key={i}
              className={`fade-in-up p-7 md:p-8 rounded-xl border ${
                n.featured
                  ? "bg-brand/[0.04] border-brand/15 lg:col-span-1"
                  : "bg-white border-gray-200 lg:col-span-2"
              }`}
            >
              <div className="mb-4">
                <p className="font-display font-bold text-gray-900 text-lg">{n.name}</p>
                <p className="text-xs text-gray-400">{n.title}</p>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{n.story}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-up p-6 rounded-xl bg-white border border-gray-200">
          <p className="text-xs text-gray-400 font-display font-medium tracking-wider uppercase mb-3">
            Also Following
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {alsoFollowing.join(" · ")}. Featured on Go Fund Yourself TV.
          </p>
        </div>

        <p className="fade-in-up text-base text-gray-500 mt-10 max-w-2xl leading-relaxed">
          This technology captivates the most influential people in culture, tech, and athletics. Not because we paid them. <span className="text-gray-800 font-medium">Because it works.</span>
        </p>
      </div>
    </section>
  );
};
