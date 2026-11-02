// ─────────────────────────────────────────────────────────────────────────
//  Builds content.json (what the app shows) from the master FAQ document.
//  Source:  c:/dev/MSP/_Inventory/Knowledge Base/MSP Student FAQ - MASTER.md
//  Run:     node tools/convert.mjs   (then node tools/build-offline.mjs)
//  Edit the OFFICES / topic maps below only when adding a new office or topic.
//  To change an ANSWER, edit the master document, not this file.
//
//  HOW IT READS THE MASTER
//    ## heading   an office section. Matched against the `m` strings in OFFICES
//                 by substring, so the heading may say more than the key phrase.
//    ### heading  a category, used to group questions inside a topic and
//                 sometimes to override which topic a question lands in.
//    **line**     a question. Everything after it, up to the next question or
//                 heading, is its answer.
//  Anything before the first recognised office heading is ignored, which is how
//  the table of contents stays out of the output.
// ─────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the output next to the repo root (tools/..), not an absolute path.
// The project moved into Operations\Projects\ and a hardcoded OUT broke silently.
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SRC = 'c:/dev/MSP/_Inventory/Knowledge Base/MSP Student FAQ - MASTER.md';
const OUT = path.join(REPO, 'content.json');
const OUT_STAFF = path.join(REPO, 'content.staff.json');

const raw = fs.readFileSync(SRC, 'utf8');
const lines = raw.split(/\r?\n/);

// Office (## header substring) -> {key, name, mailbox}
// ADDING AN OFFICE: add a row here. `m` is the text to look for in the ## line
// of the master, `key` is the short id stored in content.json, `name` is what
// students see on the pill, and `mailbox` is the address the "email this
// office" button opens. Leave the mailbox empty and the button is not shown.
// Then give the new key a default topic in OFFICE_TOPIC below.
const OFFICES = [
  { m: 'Admissions',                        key: 'admissions', name: 'Admissions',                    mailbox: 'msp-admissions@maastrichtuniversity.nl' },
  { m: 'Introduction Days and Life',        key: 'intro',      name: 'MSP (Introduction)',            mailbox: 'msp-educationsupport@maastrichtuniversity.nl' },
  { m: 'Education Support Department',       key: 'esd',        name: 'Education Support Department',   mailbox: 'msp-educationsupport@maastrichtuniversity.nl' },
  { m: 'Student Service Centre',            key: 'ssc',        name: 'Student Service Centre',        mailbox: 'study@maastrichtuniversity.nl' },
  { m: 'Board of Examiners',               key: 'boe',        name: 'Board of Examiners',            mailbox: 'msp-boe@maastrichtuniversity.nl' },
  { m: 'Bachelor Thesis Research',         key: 'btr',        name: 'BTR Office',                    mailbox: 'msp-btr@maastrichtuniversity.nl' },
  { m: 'Study Advising and Student Counsellor', key: 'counsellor', name: 'Student Counsellor',        mailbox: 'msp-counsellors@maastrichtuniversity.nl' },
  { m: 'Exams Office',                      key: 'exams',      name: 'Exams Office',                  mailbox: 'msp-exams@maastrichtuniversity.nl' },
  { m: 'International Relations Office',    key: 'iro',        name: 'International Relations Office', mailbox: 'fse-iro@maastrichtuniversity.nl' },
  { m: 'Academic Advising',                key: 'aa',         name: 'Academic Advising',             mailbox: 'msp-academicadvising@maastrichtuniversity.nl' },
  { m: 'ICTS',                             key: 'icts',       name: 'ICTS Servicedesk',              mailbox: '' },
  { m: 'Other MSP topics',                 key: 'msp',        name: 'MSP',                           mailbox: 'msp-educationsupport@maastrichtuniversity.nl' },
  { m: 'Forms and useful links',           key: 'forms',      name: 'Forms & Links',                 mailbox: '' },
];

// Topic assignment. Default per office, with category + keyword overrides.
const OFFICE_TOPIC = {
  admissions: 'Getting In', intro: 'Getting Started', esd: 'Courses & Registration',
  ssc: 'Money & Practical', boe: 'Exams & Grades', btr: 'Thesis (BTR)',
  counsellor: 'Wellbeing & Support', exams: 'Exams & Grades', iro: 'Going Abroad',
  aa: 'Courses & Registration', icts: 'IT & Accounts',
  msp: 'Getting Started', forms: 'Forms & Links',
};
const CAT_TOPIC = {
  'Documentation & Certificates': 'Graduation & Diploma',
  'Documentation and Certificates': 'Graduation & Diploma',
  'Student Services & Support': 'Wellbeing & Support',
  'Graduation Requirements': 'Graduation & Diploma',
  'Financial Matters': 'Money & Practical',
  'Registration and Re-registration': 'Money & Practical',
  'Academic Performance and Support': 'Exams & Grades',
};
function topicFor(officeKey, category, q) {
  const t = q.toLowerCase();
  if (category === 'Questions Redirected to Other Offices') {
    if (/exam|grade|resit/.test(t)) return 'Exams & Grades';
    if (/wifi|ict|password|login|authentication|mfa|print/.test(t)) return 'IT & Accounts';
    return 'Courses & Registration';
  }
  if (CAT_TOPIC[category]) return CAT_TOPIC[category];
  return OFFICE_TOPIC[officeKey] || 'General';
}

const TAG_WORDS = ['waiver','resit','grade','transcript','diploma','graduation','abroad','exchange','btr','thesis','housing','visa','tuition','bsa','exam','timetable','registration','attendance','canvas','wifi','password','insurance','cum laude','fraud','appeal','deadline','ects','scholarship','municipality'];

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,60);

const isHeading = l => /^##\s+/.test(l);
const isSub = l => /^###\s+/.test(l);
const qMatch = l => { const m = l.trim().match(/^\*\*(.+?)\*\*$/); return m ? m[1].trim() : null; };

let office = null, category = null, entries = [], cur = null;
const seenIds = new Set();

function flush() {
  if (!cur) return;
  let ans = cur.aLines.join('\n').trim();
  const notes = [];
  ans = ans.replace(/\[NEEDS MARTIJN:([^\]]*)\]/g, (_, g) => { notes.push(g.trim()); return ''; })
           .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
           // The `---` rule the master puts before each ## office heading falls
           // inside the preceding answer, so the last answer of every section
           // used to ship with a stray horizontal rule at the bottom.
           .replace(/(\n*-{3,})+$/, '').trim();
  if (ans) {
    let id = slug(cur.q); let n = 2; while (seenIds.has(id)) id = slug(cur.q) + '-' + n++;
    seenIds.add(id);
    const hay = (cur.q + ' ' + ans).toLowerCase();
    const tags = TAG_WORDS.filter(w => hay.includes(w));
    entries.push({ id, q: cur.q, a: ans, topic: cur.topic, office: cur.office, category: cur.category, tags, note: notes.join(' | ') || undefined });
  }
  cur = null;
}

for (const line of lines) {
  if (isHeading(line)) {
    flush();
    const title = line.replace(/^##\s+/, '').trim();
    if (/^contents$/i.test(title)) { office = null; continue; }
    const o = OFFICES.find(o => title.includes(o.m));
    office = o || null; category = null; continue;
  }
  if (isSub(line)) { flush(); category = line.replace(/^###\s+/, '').trim(); continue; }
  if (!office) continue;
  const q = qMatch(line);
  if (q) { flush(); cur = { q, aLines: [], office: office.key, category: category || '', topic: topicFor(office.key, category || '', q) }; continue; }
  if (cur) cur.aLines.push(line);
}
flush();

const officesOut = {};
for (const o of OFFICES) officesOut[o.key] = { name: o.name, mailbox: o.mailbox };

// Topic ordering + emoji. This list is the order the cards appear in on the
// home page; a topic with no questions is dropped automatically.
// ADDING A TOPIC: add it here, then add the same name to the C, CT and P maps
// in index.html so it gets a colour pair and an icon. The emoji is not used by
// index.html today (the cards use the SVG icons from the P map), but it does
// ship in content.json, so leave it in place for anything else reading that.
const TOPICS = [
  ['Getting In','🎓'],['Getting Started','🧭'],['Courses & Registration','📚'],
  ['Exams & Grades','📝'],['Thesis (BTR)','🔬'],['Going Abroad','✈️'],
  ['Graduation & Diploma','🎉'],['Wellbeing & Support','💬'],['Money & Practical','💶'],
  ['IT & Accounts','💻'],['Forms & Links','🔗'],['General','❓'],
];
const present = new Set(entries.map(e => e.topic));
const topics = TOPICS.filter(([t]) => present.has(t)).map(([name, emoji]) => ({
  name, emoji, count: entries.filter(e => e.topic === name).length,
}));

// `ay` is metadata only, it is not rendered anywhere in the app. Update it when
// the master's student-facing dates move to a new academic year. Note the EER
// and R&R article citations in the answers refer to the regulations in force for
// the year they describe, so those do not automatically move with this.
const meta = { title: 'MSP Student FAQ', ay: '2026-2027', generated: new Date().toISOString().slice(0,10), count: entries.length };

// content.json is PUBLIC. [NEEDS MARTIJN] notes are internal working text and can
// name colleagues or describe unresolved process, so they must never ship. They go
// to content.staff.json, which is gitignored and only exists on this machine.
const publicFaqs = entries.map(({ note, ...rest }) => rest);
const out = { meta, topics, offices: officesOut, faqs: publicFaqs };
fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');

const staffNotes = entries.filter(e => e.note).map(({ id, q, topic, office, note }) => ({ id, q, topic, office, note }));
fs.writeFileSync(OUT_STAFF, JSON.stringify({ meta, notes: staffNotes }, null, 2), 'utf8');

console.log('Entries:', entries.length);
console.log('With internal notes (NEEDS MARTIJN):', entries.filter(e => e.note).length);
console.log('\nBy topic:');
for (const t of topics) console.log('  ' + t.count.toString().padStart(3) + '  ' + t.name);
console.log('\nBy office:');
for (const o of OFFICES) { const c = entries.filter(e => e.office === o.key).length; if (c) console.log('  ' + c.toString().padStart(3) + '  ' + o.name); }
