const MODULE_ID = 'eberron-5e';

const EBERRONCONFIG = {
  DND5E: {},
  EBERRON: {},
};

EBERRONCONFIG.DND5E.weaponIds = {
  lightbayonet: 'eberron-5e.equipment.Bh03iHj0RFE4mVLG',
  heavybayonet: 'eberron-5e.equipment.Y69JxRP5RlU2zGRE',
  handsentiralens: 'eberron-5e.equipment.6K6KK1Y3mSPWTmQ1',
  lightsentiralens: 'eberron-5e.equipment.c70FIpBxD0Q9sDl9',
  heavysentiralens: 'eberron-5e.equipment.fx30to824cYf2N6E',
};

EBERRONCONFIG.DND5E.featureTypes = {
  class: {
    subtypes: {
      mutagen: 'DND5E.ClassFeature.Mutagen',
    },
  },
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
