
var map = new Datamap({
  element: document.getElementById('container'),
   fills: {
            defaultFill: 'rgba(232,23,0,0.9)' //any hex, color name or rgb/rgba value
        },
    geographyConfig: {
      borderColor: 'black',
    }
});

var bombs = [{
        name: 'Joe 4',
        radius: 25,
        yeild: 400,
        country: 'USSR',
        fillKey: 'RUS',
        significance: 'First fusion weapon test by the USSR (not "staged")',
        date: '1953-08-12',
        latitude: 50.07,
        longitude: 78.43
      },{
        name: 'RDS-37',
        radius: 40,
        yeild: 1600,
        country: 'USSR',
        fillKey: 'RUS',
        significance: 'First "staged" thermonuclear weapon test by the USSR (deployable)',
        date: '1955-11-22',
        latitude: 50.07,
        longitude: 78.43

      },{
        name: 'Tsar Bomba',
        radius: 75,
        yeild: 50000,
        country: 'USSR',
        fillKey: 'RUS',
        significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
        date: '1961-10-31',
        latitude: 73.482,
        longitude: 54.5854
      }
    ];

var cyclones;
d3.csv('cyclones10-14.csv', function(csv){
  cyclones = d3.nest()
    .key(function(d){ return moment(d.ISO_time).format('YYYY , DDD')})
    .sortKeys(d3.ascending)
    .entries(csv);
  var index = 0
  setInterval(function(){
    for(var i = 0; i< cyclones[index].values.length; i++){
      // console.log(cyclones[index].values[i])
      cyclones[index].values[i].longitude = parseFloat(cyclones[index].values[i].Longitude);
      cyclones[index].values[i].latitude = parseFloat(cyclones[index].values[i].Latitude);
      cyclones[index].values[i].radius = 4
    }
    console.log(cyclones[index].values)
    //console.log(cyclones[index].values);
    map.bubbles(cyclones[index].values, {
      popupTemplate: function (geo, data) {
        console.log(data)
              return ['<div class="hoverinfo">' +  data.name,
              '<br/>Date: ' +  data.date + '',
              '</div>'].join('');
      }
    });
    index++
  }, 100);

})



// .row(function(d){cyclones.push({name: d.Name, radius: 1, latitude: d.Latitude, longitude: d.Longitude, date: d.ISO_time})})
// .get(function(error, rows) {
//   console.log(cyclones);

//   map.bubbles(cyclones, {
//     popupTemplate: function (geo, data) {
//             return ['<div class="hoverinfo">' +  data.name,
//             '<br/>Date: ' +  data.date + '',
//             '</div>'].join('');
//     }
//     .transition
// });});



//var stuff = cyclones.get()

// map.bubbles(bombs, {
//     popupTemplate: function (geo, data) {
//             return ['<div class="hoverinfo">' +  data.name,
//             '<br/>Payload: ' +  data.yeild + ' kilotons',
//             '<br/>Country: ' +  data.country + '',
//             '<br/>Date: ' +  data.date + '',
//             '</div>'].join('');
//     }
// });


