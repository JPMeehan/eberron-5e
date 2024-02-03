const MODULE_ID = 'eberron-5e';

const EBERRONCONFIG = {
  DND5E: {
    weaponIds: {
      lightbayonet: 'eberron-5e.equipment.Y9KNEEWMWf6WdlvP',
      heavybayonet: 'eberron-5e.equipment.LJQEDIxFIN2eeOWV',
      handsentiralens: 'eberron-5e.equipment.IaBIyzprECOO69cR',
      lightsentiralens: 'eberron-5e.equipment.bB8AjYgH1NVWIKjl',
      heavysentiralens: 'eberron-5e.equipment.23TyYaYlvyrbOiEy',
    },
    featureTypes: {
      class: {
        subtypes: {
          mutagen: 'DND5E.ClassFeature.Mutagen',
        },
      },
    },
    sourceBooks: {
      'Exploring Eberron': 'by Keith Baker',
      'Chronicles of Eberron': 'by Keith Baker',
      'Dread Metrol': 'by Keith Baker',
      'Archetypes of Eberron':
        'by Will Brolley, Imogen Gingell, Laura Hirsbrunner',
      'Warlocks of Eberron': 'by Imogen Gingell',
      "Scales of Q'barra": 'by Joseph Meehan and Stuart Broz',
      'Map Perilous': 'by Anthony J. Turco',
      'Threat Dispatch': 'by Anthony J. Turco',
      "Sarhain's Guide to the Silver Flame": 'by Luke Robinson',
      "Hektula's Khyber Codex": 'by Jamie Bernstein',
      "Ghaash'khala: Paladins of the Wastes": 'by Jamie Bernstein',
      "Psion's Primer": 'by Anthony J. Turco',
      "Talvakri's Guide to Adar": 'by Megan Caldwell',
      "Linvakri's Guide to Syrkarn": 'by Vani Srinavasan',
      "Giant Guide to Xen'drik":
        'by Jamie Berstein, Anthony Turco, & Nausicaä Enriquez',
    },
  },
  EBERRON: {},
};

Hooks.once('init', () => {
  foundry.utils.mergeObject(CONFIG, EBERRONCONFIG);
  game.settings.register(MODULE_ID, 'language', {
    name: 'Setting Language Group',
    hint: "Choose a setting's languages to use",
    scope: 'world',
    config: true,
    requiresReload: true,
    type: String,
    choices: {
      default: 'Default',
      eberron: 'Eberron',
    },
    default: 'eberron',
  });
  switch (game.settings.get(MODULE_ID, 'language')) {
    case 'eberron':
      applyEberronLanguages();
      break;
    default:
      CONFIG.DND5E.languages.standard.children.csl = 'DND5E.LanguagesCSL';
  }
});

/** Changes the world to use Eberron's languages */
function applyEberronLanguages() {
  delete CONFIG.DND5E.languages.standard.children.orc;
  delete CONFIG.DND5E.languages.exotic.children.aarakocra;
  delete CONFIG.DND5E.languages.exotic.children.abyssal;
  delete CONFIG.DND5E.languages.exotic.children.deep;
  delete CONFIG.DND5E.languages.exotic.children.undercommon;

  foundry.utils.mergeObject(CONFIG.DND5E.languages, {
    'standard.children': {
      riedran: 'Eberron.Languages.Riedran',
      gasl: 'Eberron.Languages.GaSL',
      gosl: 'Eberron.Languages.GoSL',
    },
    'exotic.children': {
      daelkyr: 'Eberron.Languages.Daelkyr',
      orc: 'DND5E.LanguagesOrc',
      quori: 'Eberron.Languages.Quori',
    },
  });
}
