function achivementFn (ach) {
  ach.forEach(function(value){
    if(value.requirement() === true){
      if(!achLibrary.includes(value)){
          achModal(value)
          achLibrary.push(value)
          appendAch(value)
      }
    }
  })
}
function appendAch (achievement) {
  $('.achievements').append(`<li class='achList col-md-8 col-md-offset-2 col-xs-12'><p class="achName">${achievement.name}</p><ul><li class="achPoints">Points: ${achievement.points}</li><li class="achDesc">Description: ${achievement.description}</li></ul></li>`)
  points += achievement.points
  $('.points').text(`Total Points: ${points}`)
}
function achModal(achievement) {
  $('.popUp').text(`Achievment Unlocked: ${achievement.name}!`)
  $('.mainPop').modal('show')
  setTimeout(function () {
    $('.mainPop').modal('hide');
  }, 3000)
}
var achievements = [
  {
    requirement: function () {return discoveredPlaces.length >= 5},
    name: 'Baby Steps',
    description: 'Discover 5 places',
    note: 'How do you eat an elephant? Why would you WANT to eat an elephant...?',
    points: 10
  },{
    requirement: function() {return discoveredPlaces.length >= 1},
    name: 'First Step',
    description: 'Discover 1 place',
    note: 'Welcome to the wrld',
    points: 5
  },  {
    requirement: function () {return Object.size(typesLibrary) >= 10},
    name: 'Dip Your Toes',
    description: 'Discover 10 different types of places',
    note: `...but I've only visited 3 places...`,
    points: 5
  }, {
    requirement: function () {return typesLibrary.cafe >= 5},
    name: `Barista's Bane`,
    description: `Discover 5 cafes`,
    note: `The best part of waking up...`,
    points: 25
  }, {
    requirement: function () {return typesLibrary.bars >= 5},
    name: `Booze Hound`,
    description: `Discover 5 bars`,
    note: `Sho Iwasfink'n... waiiit.. wawuzai shayhin?`,
    points: 25
  }, {
    requirement: function () {return typesLibrary.point_of_interest >=5},
    name: `Interesting...`,
    description: `Discover 5 points of interest`,
    note: `...very interesting...`,
    points: 25
  }
]
