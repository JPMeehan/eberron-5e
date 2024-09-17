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
      'ExE': 'Exploring Eberron',
      'CoE': 'Chronicles of Eberron',
      'Dread Metrol': 'Dread Metrol',
      'FoEQ': 'Frontiers of Eberron: Quickstone',
      'Archetypes of Eberron': 'Archetypes of Eberron',
      'Warlocks of Eberron': 'Warlocks of Eberron',
      "SoQ": "Scales of Q'barra",
      'Map Perilous': 'Map Perilous',
      'Threat Dispatch': 'Korranberg Chronicle: Threat Dispatch',
      "SGttSF": "Sarhain's Guide to the Silver Flame",
      "HKC": "Hektula's Khyber Codex",
      "Ghaash'kala": "Ghaash'kala - Paladins of the Wastes",
      "TGtA": "Talvakri's Guide to Adar",
      "LGtS": "Linvakri's Guide to Syrkarn",
      "GGtX": "The Giant Guide to Xen'drik",
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
    type: new foundry.data.fields.StringField({
      blank: false,
      initial: 'eberron',
      choices: {
        eberron: 'Eberron',
      }
    }),
  });
  switch (game.settings.get(MODULE_ID, 'language')) {
    case 'eberron':
      applyEberronLanguages();
      break;
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
      gosl: 'Eberron.Languages.GoSL',
    },
    'exotic.children': {
      daelkyr: 'Eberron.Languages.Daelkyr',
      orc: 'DND5E.LanguagesOrc',
      quori: 'Eberron.Languages.Quori',
    },
  });
}
