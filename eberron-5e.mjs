const MODULE_ID = 'eberron-5e';

const EBERRONCONFIG = {
  DND5E: {
    itemProperties: {
      bye: {
        label: 'Eberron.Item.Property.Byeshk',
        isPhysical: true,
      },
    },
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
      'Exploring Eberron': 'Exploring Eberron',
      'Chronicles of Eberron': 'Chronicles of Eberron',
      'Dread Metrol': 'Dread Metrol',
      'Frontiers of Eberron: Quickstone': 'Frontiers of Eberron: Quickstone',
      'Archetypes of Eberron': 'Archetypes of Eberron',
      'Warlocks of Eberron': 'Warlocks of Eberron',
      "Scales of Q'barra": "Scales of Q'barra",
      'Map Perilous': 'Map Perilous',
      'Threat Dispatch': 'Korranberg Chronicle: Threat Dispatch',
      "Sarhain's Guide to the Silver Flame": "Sarhain's Guide to the Silver Flame",
      "Hektula's Khyber Codex": "Hektula's Khyber Codex",
      "Ghaash'kala": "Ghaash'kala - Paladins of the Wastes",
      "Talvakri's Guide to Adar": "Talvakri's Guide to Adar",
      "Linvakri's Guide to Syrkarn": "Linvakri's Guide to Syrkarn",
      "Giant Guide to Xen'drik": "The Giant Guide to Xen'drik",
      "Textiles of Eberron": "Textiles of Eberron"
    },
  },
  EBERRON: {},
};

Hooks.once('init', () => {
  foundry.utils.mergeObject(CONFIG, EBERRONCONFIG);

  CONFIG.DND5E.validProperties.weapon.add('bye');

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
