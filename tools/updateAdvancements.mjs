import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const targetPack = 'classes';

const targetDir = path.join('.', 'src', 'packs', targetPack);

const itemFiles = await fs.readdir(targetDir);

for (const file of itemFiles) {
  const fullFileName = path.join(targetDir, file);
  const data = await fs.readFile(fullFileName);
  const item = yaml.load(data);
  if (item.type !== 'subclass') continue;
  console.log(item.name);
  item.sort = 500;
  const advancement = item.system.advancement;
  for (const a of advancement) {
    if (a.type === 'ItemGrant') {
      switch (item.system.classIdentifier) {
        case 'artificer':
          a.title = 'Artificer Specialist Feature';
          break;
        case 'barbarian':
          a.title = 'Path Feature';
          break;
        case 'bard':
          a.title = 'Bard College Feature';
          break;
        case 'cleric':
          a.title = 'Divine Domain Feature';
          break;
        case 'druid':
          a.title = 'Druid Circle Feature';
          break;
        case 'empath':
          a.title = 'Empathic Mantle Feature';
          break;
        case 'fighter':
          a.title = 'Martial Archetype Feature';
          break;
        case 'icon':
          a.title = 'Iconic Archetype Feature';
          break;
        case 'invoker':
          a.title = 'Pact Feature';
          break;
        case 'monk':
          a.title = 'Monastic Tradition Feature';
          break;
        case 'paladin':
          a.title = 'Sacred Oath Feature';
          break;
        case 'psion':
          a.title = 'Psionic Discipline Feature';
          break;
        case 'ranger':
          a.title = 'Ranger Archetype Feature';
          break;
        case 'rogue':
          a.title = 'Roguish Archetype Feature';
          break;
        case 'sorcerer':
          a.title = 'Sorcerous Origin Feature';
          break;
        case 'warlock':
          a.title = 'Otherworldly Patron Feature';
          break;
        case 'wizard':
          a.title = 'Arcane Tradition Feature';
          break;
      }
    }
  }
  fs.writeFile(fullFileName, yaml.dump(item));
}
