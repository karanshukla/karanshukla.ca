export interface VinopilotLink {
  label: string;
  href: string;
}

export interface VinopilotApp {
  name: string;
  tagline: string;
  replaces?: string;
  description: string;
  highlights: string[];
  stack: string;
  links: VinopilotLink[];
}

export interface NpuStat {
  value: string;
  caption: string;
}

export interface LaptopRequirement {
  label: string;
  detail: string;
}

const github = (repo: string) => `https://github.com/karanshukla/${repo}`;

export const vinopilotApps: VinopilotApp[] = [
  {
    name: 'vinowhisper',
    tagline: 'live captions and voice typing',
    replaces: 'live captions and voice typing',
    description:
      'captions for any audio or your mic, in an overlay. hold meta+h and talk to type into any app. english, french, german and spanish, with translation to english.',
    highlights: ['~1.5s behind live audio'],
    stack: 'python · mit',
    links: [
      { label: 'vinowhisper.com', href: 'https://vinowhisper.com/' },
      { label: 'github', href: github('vinoWhisper') },
      { label: 'pypi', href: 'https://pypi.org/project/vinowhisper/' },
    ],
  },
  {
    name: 'vinoauthface',
    tagline: 'unlock with your face',
    replaces: 'windows hello face',
    description:
      'look at your ir camera to unlock the lock screen, sudo and password prompts on gnome, kde, cosmic and sway. a single binary, so it also works on bazzite, bluefin and silverblue.',
    highlights: ['~2s to unlock', 'ir camera only, for security'],
    stack: 'rust · mit',
    links: [
      { label: 'website', href: 'https://vinoauthface.vinopilot.ca/' },
      { label: 'github', href: github('vinoAuthFace') },
      { label: 'security model', href: 'https://vinoauthface.vinopilot.ca/security.html' },
    ],
  },
  {
    name: 'vinoopeneffects',
    tagline: 'look better on video calls',
    replaces: 'windows studio effects',
    description:
      'background blur or replace, studio lighting, auto-framing and gesture reactions. shows up as a camera in zoom, meet, obs or your browser.',
    highlights: ['1.2–4.9ms per frame on the npu'],
    stack: 'rust · gpl-3.0',
    links: [
      { label: 'github', href: github('vinoOpenEffects') },
      {
        label: 'benchmarks',
        href: 'https://github.com/karanshukla/vinoOpenEffects/blob/main/docs/hardware.md',
      },
    ],
  },
  {
    name: 'vinopop',
    tagline: 'ai actions on any text you select',
    replaces: 'click to do and clipboard history',
    description:
      'highlight text anywhere and a toolbar of buttons that fit it pops up: translate, summarise, rewrite or explain it with a local ai, run a command, open a link. plus clipboard history (super+shift+v), snippets and copy-text-from-screen (shift+super+o).',
    highlights: ['gemma 4 running locally', 'kde, gnome, sway and hyprland'],
    stack: 'python · mit',
    links: [
      { label: 'github', href: github('vinoPop') },
      { label: 'plugins', href: 'https://github.com/karanshukla/vinoPop#settings-and-plugins' },
    ],
  },
  {
    name: 'vinospeak',
    tagline: 'natural-sounding text-to-speech',
    replaces: 'windows natural voices',
    description:
      'turn any text into lifelike speech with the kokoro voice model. play it aloud or save a wav, or have it read a markdown file or a document from vinosearch. long text starts speaking in about 1.5 seconds.',
    highlights: ['~160 mb model', 'cli and python api'],
    stack: 'python · mit',
    links: [
      { label: 'github', href: github('vinoSpeak') },
      { label: 'pypi', href: 'https://pypi.org/project/vinospeak/' },
    ],
  },
  {
    name: 'vinosearch',
    tagline: "find files by what they're about",
    replaces: 'windows semantic search',
    description:
      'search by meaning, not filenames. type "dog watching the sunset" and find IMG_2041.jpg. works on notes, code, pdfs, office documents and photos, right from krunner, gnome shell or the terminal.',
    highlights: ['26ms per search', 'indexes at 3% of one cpu core'],
    stack: 'rust · mit',
    links: [
      { label: 'github', href: github('vinoSearch') },
      { label: 'install', href: 'https://github.com/karanshukla/vinoSearch#install' },
    ],
  },
  {
    name: 'vinowatch',
    tagline: 'see what your npu is doing',
    replaces: "task manager's npu view",
    description:
      'a tray icon showing npu load, plus the cpu and memory each ai app is using, with a warning when ram runs low. if the npu driver gets stuck, it can check and reset it without a reboot. works on kde, gnome and waybar.',
    highlights: ['cpu, ram, npu per app', 'stuck-driver check in ~0.3s'],
    stack: 'rust · mit',
    links: [{ label: 'github', href: github('vinoWatch') }],
  },
  {
    name: 'ovfetch',
    tagline: 'the plumbing behind the apps, for developers',
    description:
      'finds the openvino or onnx runtime build that fits your npu and driver, checks its hash against independent sources, and installs it. can compile newer ones from pinned recipes. scriptable with resolve --json.',
    highlights: ['installs openvino in 17s'],
    stack: 'rust · mit',
    links: [
      { label: 'github', href: github('ovfetch') },
      { label: 'crates.io', href: 'https://crates.io/crates/ovfetch' },
    ],
  },
];

export const npuStats: NpuStat[] = [
  {
    value: '10%',
    caption: 'of one battery charge to index 9,763 files with vinosearch',
  },
  {
    value: '3%',
    caption: 'of one cpu core while it indexes. the npu runs the model, the cpu only reads files',
  },
  {
    value: '3.3×',
    caption:
      'faster live captions than the cpu: 12s of speech in 0.70s on the npu, 2.30s on the cpu',
  },
  {
    value: '0 W',
    caption: 'when idle. the npu powers down 100ms after its last job',
  },
];

export const laptopRequirements: LaptopRequirement[] = [
  { label: 'intel core ultra', detail: 'any chip with an intel npu, 2023 or newer' },
  { label: '16 gb ram', detail: 'recommended, so ai models load alongside your apps' },
  { label: 'recent linux distro', detail: 'a current kernel ships the intel npu driver' },
  { label: 'ir camera', detail: 'only for face unlock with vinoauthface' },
];
