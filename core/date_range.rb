require 'date'

class DateRange
  attr_reader :start_date, :end_date

  def initialize(start_date, end_date)
    raise ArgumentError, "La date de fin doit être postérieure ou égale à la date de début" if end_date < start_date

    @start_date = start_date
    @end_date = end_date
  end

  def collides?(other)
    (start_date <= other.start_date && other.start_date <= end_date) ||
    (start_date <= other.end_date && other.end_date <= end_date)
  end

  def to_s
    "#{start_date} à #{end_date}"
  end
end
