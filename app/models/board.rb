class Board < ApplicationRecord
  # Validations
  validates_presence_of :name
  # Associations
  belongs_to :user
  # Callbacks

  # Instance Methods

  # Class Methods
end
