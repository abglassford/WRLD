function achivementFn (ach) {
  ach.forEach(function(value){
    if(value.requirement() === true){
      if(!achLibrary.includes(value)){
          achModal(value.name)
          achLibrary.push(value)
          appendAch(value)
      }
    }
  })
}
function appendAch (achievement) {
  $('.achievements').append(`<li class='achList col-md-12 col-xs-12'>${achievement.name}</li>`)
}
function achModal(achievement) {
  $('.popUp').text(`Achievment Unlocked: ${achievement}!`)
  $('.mainPop').modal('show')
  setTimeout(function () {
    $('.mainPop').modal('hide');
  }, 3000)
}
var achievements = [
  {
    requirement: function () {return discoveredPlaces.length >= 5},
    name: 'Baby Steps',
    description: 'discover 5 places',
    note: 'How do you eat an elephant? Why would you WANT to eat an elephant...?',
    points: 10
  }

  //  {
  //   name: `Barista's Bane`,
  //   description: `discover 5 cafes`,
  //   note: `The best part of waking up...`,
  //   points: 5
  // }, {
  //   name: `Booze Hound`,
  //   description: `discover 5 bars`,
  //   note: `Sho Iwasfink'n... waiiit.. wawuzai shayhin?`,
  //   points: 5
  // }
]
