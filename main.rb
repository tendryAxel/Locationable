require_relative 'core/locationable'
require_relative 'core/date_range'
require 'tty-prompt'
require 'date'

prompt = TTY::Prompt.new

voiture = Locationable.new("Voiture")
maison = Locationable.new("Maison")
assiette = Locationable.new("Assiette")

locationables = [voiture, maison, assiette]

loop do
  choix = prompt.select("Choisis quelque chose à louer :", locationables, filter: true)

  debut_str = prompt.ask("Commencer quand ? (format AAAA-MM-JJ)", convert: :string) do |q|
    q.required true
    q.validate(/\d{4}-\d{2}-\d{2}/, "Format invalide. Utilise AAAA-MM-JJ.")
  end
  date_debut = Date.parse(debut_str)

  fin_str = prompt.ask("Terminer quand ? (format AAAA-MM-JJ)", convert: :string) do |q|
    q.required true
    q.validate(/\d{4}-\d{2}-\d{2}/, "Format invalide. Utilise AAAA-MM-JJ.")
  end
  date_fin = Date.parse(fin_str)

  begin
    choix.louer(DateRange.new(date_debut, date_fin))
    puts "Location enregistrée."
  rescue ArgumentError => e
    puts "Erreur : #{e.message}"
  end

  puts "Locations actuelles de #{choix.name} :"
  choix.location_dates.each { |d| puts " - #{d}" }

  continuer = prompt.select("Continuer ?", ["Oui", "Non"])
  break if continuer == "Non"
end
