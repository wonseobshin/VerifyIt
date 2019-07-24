# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

article1 = Article.create({
  url: 'https://www.theonion.com/real-buzz-aldrin-spends-50th-straight-year-on-moon-tryi-1836538506',
  title: 'Real Buzz Aldrin Spends 50th Straight Year On Moon Trying To Signal Earth To Warn Of Imposter',
  content: 'VALLIS ALPES, THE MOON—Yelling and waving his arms frantically in the hope that someone out there was paying attention, the real Buzz Aldrin was reportedly spending his 50th year in a row on the moon Friday trying to warn Earth of the imposter who had taken his place. “Come on, I’m right here, dammit,” shouted the actual 89-year-old astronaut who had been stranded on the lunar surface during the Apollo 11 mission after being replaced by a shape-shifting extraterrestrial who had usurped his life on Earth. “The man you know as Buzz Aldrin isn’t me, it’s some goddamn alien scum. Hasn’t anyone noticed, after all this time? You fools, you’re in danger! Please! Someone! Anyone! I’m right up here!” At press time, Aldrin was reportedly cursing himself once again for having slept through the entirety of the Apollo 12 and Apollo 14 moon missions.', 
  rating: 60,
})

article2 = Article.create({
  url: 'https://politics.theonion.com/trump-claims-he-tried-to-warn-public-about-epstein-by-p-1836393756',
  title: 'Trump Claims He Tried To Warn Public About Epstein By Praising Him As A Terrific Guy',
  content: 'WASHINGTON—Noting multiple occasions when he had applauded the disgraced hedge fund manager’s affable personality, President Donald Trump claimed Monday that he tried to warn the public about Jeffrey Epstein’s behavior by praising him as a terrific guy. “From day one, I was clearly trying to send a message to you people by revealing that I enjoyed spending time with Jeffrey,” said Trump, arguing that he tried to inform the American people about the convicted sex offender by stating that he looked back positively on their 15-year-long relationship and considered him a close personal friend. “Can’t you people read between the lines? I appeared in multiple photos with him and we attended dozens of functions together, so you should’ve known Epstein was really bad news. By partying with him and publicly admiring his lifestyle, I all but told you directly that Jeffery’s a total scumbag.” At press time, Trump claimed that he also attempted to tip off the public by repeatedly expressing his admiration for Mohammad bin Salman and Bill O’Reilly.', 
  rating: 85,
})

article3 = Article.create({
  url: 'https://www.reuters.com/article/us-southkorea-japan-laborers/south-korea-asks-japan-to-cancel-plan-to-remove-the-country-from-white-list-idUSKCN1UJ04F?il=0',
  title: 'South Korea asks Japan to cancel plan to remove the country from white list',
  content: 'SEOUL (Reuters) - South Korea said on Wednesday a Japanese plan to remove South Korea from a Japanese list of countries that face minimum trade restrictions would impose tougher conditions without legitimate grounds and consultation. Japan’s plan to remove South Korea from the so-called white list was a very grave matter that undermined the economic and security partnership between the two countries, South Korea’s industry ministry said in a statement. It asked Japan to scrap its plan. Japan threatened last week to drop South Korea from the white list of countries that face minimum trade restrictions under a trade control law. That would require Japanese exporters to seek a license for items that could be used in some weapons-related applications. On Japan’s white list are 27 countries, from Germany to South Korea, Britain and the United States.',
  rating: 98,
})
