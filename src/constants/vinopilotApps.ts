export interface VinopilotLink {
  label: string;
  href: string;
}

export interface Workaround {
  problem: string;
  detail: string;
}

export interface DeepDive {
  name: string;
  summary: string;
  stack: string;
  numbers: string[];
  workarounds: Workaround[];
  links: VinopilotLink[];
}

export interface SuiteApp {
  name: string;
  summary: string;
  stack: string;
  links: VinopilotLink[];
}

export interface ModelFix {
  model: string;
  usedBy: string;
  fix: string;
  href: string;
}

const github = (repo: string) => `https://github.com/karanshukla/${repo}`;
const huggingFace = (model: string) => `https://huggingface.co/arankays/${model}`;

export const deepDives: DeepDive[] = [
  {
    name: 'vinosearch',
    summary: "find files by what's in them, not their names",
    stack: 'rust · openvino',
    numbers: ['26ms per search', 'indexes at 3% of one cpu core'],
    workarounds: [
      {
        problem: 'openvino breaks the embedding model',
        detail:
          'it converts one type of layer wrong, so results were poor. i rewrote those layers with simpler operations, and search quality went from 0.58 to 0.85 on a standard benchmark.',
      },
      {
        problem: 'the npu only runs fixed sizes',
        detail:
          'every search would pay for the longest possible query, so short queries get their own small model shape.',
      },
      {
        problem: 'a model can compile and still be wrong',
        detail:
          "on startup each model checks its npu output against known-good cpu results, and switches to the cpu if they don't match.",
      },
      {
        problem: 'fast search without a vector database',
        detail:
          'vectors are stored as 8-bit numbers and scanned in a loop the compiler can speed up. that took searches from 85ms to 26ms.',
      },
      {
        problem: 'sharing the npu',
        detail:
          'indexing sends one document at a time, so face unlock or dictation never waits long.',
      },
    ],
    links: [
      { label: 'github', href: github('vinoSearch') },
      {
        label: 'how it works',
        href: 'https://github.com/karanshukla/vinoSearch/blob/main/docs/how-it-works.md',
      },
    ],
  },
  {
    name: 'vinoauthface',
    summary: 'face unlock with an ir camera, forked from authface',
    stack: 'rust · openvino',
    numbers: ['0 strangers let in across 7.7m tries', '~2s to unlock'],
    workarounds: [
      {
        problem: 'glasses broke matching',
        detail:
          'lining the face up by eyes, nose and mouth before comparing raised same-person scores with glasses from 0.29 to 0.71.',
      },
      {
        problem: 'telling a face from a photo',
        detail:
          'it looks for real movement between frames, like a blink, after cancelling out camera shake and brightness changes.',
      },
      {
        problem: 'dodging the lockout',
        detail:
          "a failed attempt counts as soon as a face is seen, so killing the program mid-scan doesn't reset it.",
      },
      {
        problem: 'a security hole in the npu cache',
        detail:
          "under sudo, the npu driver loaded files from the user's home folder. the cache now lives somewhere only root can write.",
      },
      {
        problem: 'a bug in the inference library',
        detail:
          'it misread one layer of the face detector and returned random boxes, so that layer is rewritten when the model loads.',
      },
    ],
    links: [
      { label: 'github', href: github('vinoAuthFace') },
      { label: 'upstream', href: 'https://github.com/pfalkingham/authFace' },
      { label: 'security model', href: 'https://vinoauthface.vinopilot.ca/security.html' },
    ],
  },
  {
    name: 'vinowhisper',
    summary: 'live captions and voice typing',
    stack: 'python · rust · openvino',
    numbers: ['~1.5s behind live audio', '3.3× faster than the cpu'],
    workarounds: [
      {
        problem: "captions that don't rewrite themselves",
        detail:
          'audio is transcribed in overlapping 12-second chunks, and a word only shows up once two passes agree on it.',
      },
      {
        problem: 'the model repeating itself',
        detail:
          'repeated text compresses unusually well, so any pass that compresses too well is thrown away.',
      },
      {
        problem: "openvino's whisper can't take hints on the npu",
        detail:
          'so i wrote my own decoding loop, which lets custom words like names and jargon reach the npu.',
      },
      {
        problem: 'copying memory for every word',
        detail:
          "writing straight into the npu's buffers instead of copying cut each step from 28.6ms to 11.7ms.",
      },
      {
        problem: 'the npu resetting mid-sentence',
        detail:
          'if another app crashes the npu, vinowhisper reloads the model and carries on instead of giving up on it.',
      },
    ],
    links: [
      { label: 'vinowhisper.com', href: 'https://vinowhisper.com/' },
      { label: 'github', href: github('vinoWhisper') },
    ],
  },
];

export const modelFixes: ModelFix[] = [
  {
    model: 'gemma-4-E2B-it-int4-cw-ov',
    usedBy: 'vinopop',
    fix: 'the official version never finishes compiling on the npu. a different compression layout compiles in about 2.5 minutes.',
  },
  {
    model: 'embeddinggemma-2-text-int8-cw-onnx',
    usedBy: 'vinosearch',
    fix: 'fixed the layers openvino converts wrong, then shrank it from 1 gb to 274 mb.',
  },
  {
    model: 'embeddinggemma-2-vision-static-onnx',
    usedBy: 'vinosearch',
    fix: "removed a step whose output size changes with the image, which the npu can't handle.",
  },
  {
    model: 'canary-1b-v2-int8-ov',
    usedBy: 'vinowhisper',
    fix: 'split into fixed-size pieces the npu can compile, with the same output as the original.',
  },
].map((entry) => ({ ...entry, href: huggingFace(entry.model) }));

export const suiteApps: SuiteApp[] = [
  {
    name: 'vinouserinterface',
    summary: 'the shared look, widgets and tray icons every app is built on.',
    stack: 'rust',
    links: [{ label: 'github', href: github('vinoUserInterface') }],
  },
  {
    name: 'ovfetch',
    summary:
      'installs the openvino version that matches your npu driver, after checking it against several sources.',
    stack: 'rust',
    links: [
      { label: 'github', href: github('ovfetch') },
      { label: 'crates.io', href: 'https://crates.io/crates/ovfetch' },
    ],
  },
  {
    name: 'vinoopeneffects',
    summary: 'a fork of openeffects that runs background blur, lighting and framing on the npu.',
    stack: 'rust',
    links: [
      { label: 'github', href: github('vinoOpenEffects') },
      { label: 'upstream', href: 'https://github.com/funinkina/openeffects' },
    ],
  },
  {
    name: 'vinopop',
    summary: 'a fork of linuxpop that runs its ai text actions offline on the npu.',
    stack: 'python',
    links: [
      { label: 'github', href: github('vinoPop') },
      { label: 'upstream', href: 'https://github.com/GaimsDevSoftware/linuxpop' },
    ],
  },
  {
    name: 'vinospeak',
    summary: 'text-to-speech that runs fully on the npu and starts talking in about 1.5s.',
    stack: 'python',
    links: [
      { label: 'github', href: github('vinoSpeak') },
      { label: 'pypi', href: 'https://pypi.org/project/vinospeak/' },
    ],
  },
  {
    name: 'vinowatch',
    summary: 'a tray icon showing how much npu, cpu and memory each ai app is using.',
    stack: 'rust',
    links: [{ label: 'github', href: github('vinoWatch') }],
  },
];

export const testHardware =
  'all numbers measured on one dell xps 13 (core 5 320) running fedora 45.';
