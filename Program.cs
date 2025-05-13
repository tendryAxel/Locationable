using Spectre.Console;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class DateRange
{
    public DateOnly Start { get; }
    public DateOnly End { get; }

    public DateRange(DateOnly start, DateOnly end)
    {
        if (end < start)
            throw new ArgumentException("La date de fin doit être postérieure ou égale à la date de début");

        Start = start;
        End = end;
    }

    public bool Colide(DateRange range)
    {
        return (Start <= range.Start && range.Start <= End) || (Start <= range.End && range.End <= End);
    }
}

public class Locationable
{
    public string Name { get; }
    public List<DateRange> Location_dates;
    public Locationable(string name) {
        Name = name;
        Location_dates = new List<DateRange>();
    }
    public void Louer(DateRange dateRange) {
        foreach (var date_de_location in Location_dates) {
            if (dateRange.Colide (date_de_location)) 
                throw new ArgumentException($"Locationable {Name} deja louer pour le {date_de_location}");
        }
        Location_dates.Add (dateRange);
    }
    public override string ToString()
    {
        return "Locationable: " + Name + ", Nombre de location: " + Location_dates.Count;
    }
}

class Project
{
  static void Main(string[] args)
  {
    Locationable voiture = new Locationable("Voiture");
    Locationable maison = new Locationable("Maison");
    Locationable assiete = new Locationable("Assiete");

    do {

        var choix_location = AnsiConsole.Prompt(
            new SelectionPrompt<Locationable>()
                .Title("Choisi quelque chose [green]a louer[/]")
                .PageSize(10)
                .MoreChoicesText("[grey](Move up and down to reveal more locationable)[/]")
                .AddChoices(new[] { voiture, maison, assiete }));

        AnsiConsole.WriteLine($"locationable {choix_location.Name}");

        var date_debut = AnsiConsole.Prompt(
            new TextPrompt<DateOnly>("Commencer quand?"));

        var date_fin = AnsiConsole.Prompt(
            new TextPrompt<DateOnly>("Terminer quand?"));
        
        choix_location.Louer (new DateRange(date_debut, date_fin));

        AnsiConsole.WriteLine($"locationable {choix_location.Location_dates}");

    } while (AnsiConsole.Prompt(
            new SelectionPrompt<bool>()
                .Title("Continuer ?")
                .AddChoices(new[] { true, false })));
  }
}
