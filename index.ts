import term from 'terminal-kit';
import { DateRange } from "./dateUtils";

export class Locationable {
    public readonly name: string;
    public locationDates: DateRange[];

    constructor(name: string) {
        this.name = name;
        this.locationDates = [];
    }

    public louer(dateRange: DateRange): void {
        for (const dateDeLocation of this.locationDates) {
            if (dateRange.collides(dateDeLocation)) {
            throw new Error(
                `Locationable ${this.name} déjà loué pour la période ${dateDeLocation.start.toISOString()} à ${dateDeLocation.end.toISOString()}`
            );
            }
        }
        this.locationDates.push(dateRange);
    }

    public toString(): string {
    return `Locationable: ${this.name}, Nombre de location: ${this.locationDates.length}`;
    }
}
  

const terminal = term.terminal;

const items: Locationable[] = [
  new Locationable('Voiture'),
  new Locationable('Maison'),
  new Locationable('Assiette'),
];

async function askDate(prompt: string): Promise<Date> {
  terminal (prompt);
  const response = await terminal.inputField({ echo: true }).promise;
  return response ? new Date(response.trim()) : new Date();
}

async function askYesNo(prompt: string): Promise<boolean> {
  terminal(prompt);
  const result = await terminal.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }).promise;
  return result ? result : false;
}

async function question(): Promise<void> {
  terminal.clear();

  const menuItems = items.map((item) => item.name);
  const { selectedIndex } = await terminal.singleLineMenu(menuItems, {}).promise;
  const choix = items[selectedIndex];

  terminal.clear();
  terminal.green(`Locationable choisi : ${choix.name}\n`);

  try {
    const dateDebut = await askDate('Date début (AAAA-MM-JJ): ');
    terminal ("\n")
    const dateFin = await askDate('Date fin   (AAAA-MM-JJ): ');

    choix.louer(new DateRange(dateDebut, dateFin));
    terminal.green(`Réservation réussie : ${choix.locationDates.map(String).join(', ')}\n`);
  } catch (error: any) {
    terminal.red(`Erreur: ${error.message}\n`);
  }

  const continuer = await askYesNo('Continuer? [Y|n]\n');

  if (continuer) {
    terminal.green('\nNext\n=>\n');
    await question();
  } else {
    terminal.red('Ok bye XD\n');
    process.exit();
  }
}

question();
