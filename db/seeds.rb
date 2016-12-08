user = User.create(email: Faker::Internet.email, password: 'password')

5.times do
  board = user.boards.create(name: Faker::Beer.name)
  3.times do
    board.lists.create(title: Faker::Beer.style)
  end
end

puts "#{user.email} was seeded with 5 boards and 3 lists in each!"
