user = User.create(email: Faker::Internet.email, password: 'password')

5.times do
  user.boards.create(name: Faker::Beer.name)
end

puts "#{user.email} was seeded with 5 boards!"
