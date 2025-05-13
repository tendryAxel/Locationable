var term = require( 'terminal-kit' ).terminal ;
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
  

const voiture = new Locationable("Voiture")
const maison = new Locationable("Maison")
const assiete = new Locationable("Assiete")

var items: Locationable[] = [ voiture, maison, assiete ] ;

var options = {
	y: 1 ,
	style: term.inverse ,
	selectedStyle: term.dim.blue.bgGreen
} ;

var choix: Locationable = items[0];

function question() {
    term.clear() ;

    term.singleLineMenu( items , options , function( error: any , response: Locationable ) {
        if (choix)
            choix = response;
    } ) ;
    term.clear() ;
    console.log(choix);

    choix.louer (new DateRange(
        new Date(term( 'Date debut: ' )),
        new Date(term( 'Date fin: ' ))
    ));
    term.clear() ;
    
	term( 'Continuer? [Y|n]\n' ) ;
	
	term.yesOrNo( { yes: [ 'y' , 'ENTER' ] , no: [ 'n' ] } , function( error: any , result: boolean ) {
	
		if ( result ) {
			term.green( "\nNext\n=>" ) ;
			question() ;
		}
		else {
			term.red( "Ok bye XD\n" ) ;
			process.exit() ;
		}
	} ) ;
}

question() ;