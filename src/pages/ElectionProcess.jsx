import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../hooks/useVoice';
import { Volume2, VolumeX, Megaphone, FileText, Search, RotateCcw, Mic, BarChart2, Users, CheckCircle, Flag, Handshake } from 'lucide-react';

const STEP_ICONS = [
  Megaphone, FileText, Search, FileText, Search, RotateCcw,
  Mic, BarChart2, BarChart2, Flag, Handshake
];

const TIMELINE_STEPS = [
  { n: 1,  title: 'Election Announcement',      desc: 'The President of India (for Lok Sabha) or Governor (for State) dissolves the legislature and announces elections. The Election Commission of India (ECI) sets the election schedule.' },
  { n: 2,  title: 'Model Code of Conduct',       desc: 'As soon as the election schedule is announced, the Model Code of Conduct (MCC) comes into effect. It restricts the ruling party from making policy announcements or using government resources for campaigning.' },
  { n: 3,  title: 'Voter List Publication',      desc: 'ECI publishes the final Electoral Roll. Voters can check their names at voters.eci.gov.in. Last-minute corrections can be made through Form 8.' },
  { n: 4,  title: 'Filing of Nominations',       desc: 'Candidates file their nomination papers with the Returning Officer. They must pay a security deposit (Rs 25,000 for Lok Sabha). Nomination papers include criminal record disclosure (Form 26).' },
  { n: 5,  title: 'Scrutiny of Nominations',     desc: 'The Returning Officer examines all nomination papers and can reject defective ones. Candidates must meet eligibility criteria set under the Representation of People Act, 1951.' },
  { n: 6,  title: 'Withdrawal of Nominations',   desc: 'Candidates can withdraw their nominations by the last date of withdrawal. The final list of contesting candidates is published after this date.' },
  { n: 7,  title: 'Campaign Period',              desc: 'Political parties and candidates campaign for votes. Rallies, meetings, door-to-door visits, and digital campaigns are conducted. Campaign must stop 48 hours before polling (silent period).' },
  { n: 8,  title: 'Polling Day',                  desc: 'Polling is conducted at designated polling stations. Voting hours: 7 AM to 6 PM (may vary). Voters show ID, get their finger inked, and press the EVM button for their candidate.' },
  { n: 9,  title: 'Vote Counting',               desc: 'On counting day, postal ballots are counted first. EVM results are then tallied round by round. VVPAT slips may be verified. Results are declared constituency by constituency.' },
  { n: 10, title: 'Declaration of Results',      desc: 'The candidate with the most votes (First Past The Post system) wins. Winning candidates are issued certificates by the Returning Officer. The winning party/coalition forms the government.' },
  { n: 11, title: 'Government Formation',         desc: 'The President invites the leader of the single largest party or coalition to form the government. The Prime Minister is sworn in, followed by the Cabinet. The new government begins its 5-year term.' },
];

export default function ElectionProcess() {
  const { t } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useVoice();

  return (
    <div className="page-enter">
      <div style={{ background: 'linear-gradient(135deg, #1A304D, #243d5e)', padding: '28px 20px 24px', color: 'white' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>ELECTION PROCESS</span>
        <h1 className="heading-lg" style={{ color: 'white', marginTop: 10 }}>How India Votes</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: '0.9rem' }}>
          11 steps from announcement to government formation
        </p>
      </div>

      <div style={{ padding: '20px' }}>
        {TIMELINE_STEPS.map((step, i) => {
          const StepIcon = STEP_ICONS[i] || FileText;
          const isPollingDay = i === 7;
          return (
            <div key={step.n} style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
              {/* Dot + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: isPollingDay ? 'var(--red)' : 'var(--navy)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(26,48,77,0.25)', zIndex: 1, flexShrink: 0,
                }}>
                  <StepIcon size={18} color="white" strokeWidth={1.75} />
                </div>
                {i < TIMELINE_STEPS.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: 'linear-gradient(to bottom, var(--navy), var(--border))', margin: '4px 0' }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: 16 }}>
                <div style={{ background: 'white', borderRadius: 16, border: `2px solid ${isPollingDay ? 'var(--red)' : 'var(--border)'}`, padding: '14px 16px', marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>STEP {step.n}</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: isPollingDay ? 'var(--red)' : 'var(--navy)', letterSpacing: '0.02em' }}>{step.title}</h3>
                    </div>
                    <button
                      onClick={() => isSpeaking ? stopSpeaking() : speak(`${step.title}. ${step.desc}`)}
                      style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--cream)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                      aria-label="Read aloud"
                    >
                      {isSpeaking ? <VolumeX size={14} color="var(--red)" /> : <Volume2 size={14} color="var(--navy)" />}
                    </button>
                  </div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FPTP explanation */}
      <div style={{ margin: '0 20px 32px', background: 'var(--cream)', borderRadius: 16, padding: '20px', border: '1px solid var(--border)' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--navy)', marginBottom: 10, fontSize: '1.2rem', letterSpacing: '0.02em' }}>First Past The Post (FPTP)</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          India uses the FPTP electoral system. The candidate who gets the MOST votes in a constituency wins — even if it is not a majority. For example, if Candidate A gets 35,000 votes and Candidates B, C, D get 25,000 each, Candidate A wins with just 35% of the vote.
        </p>
      </div>
    </div>
  );
}
