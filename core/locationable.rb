require_relative 'date_range'

class Locationable
  attr_reader :name, :location_dates

  def initialize(name)
    @name = name
    @location_dates = []
  end

  def louer(date_range)
    location_dates.each do |existing_range|
      if date_range.collides?(existing_range)
        raise ArgumentError, "Locationable #{name} déjà loué pour la période #{existing_range}"
      end
    end

    location_dates << date_range
  end

  def to_s
    "Locationable: #{name}, Nombre de location: #{location_dates.size}"
  end
end
