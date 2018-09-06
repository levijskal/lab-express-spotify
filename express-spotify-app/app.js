var SpotifyWebApi = require('spotify-web-api-node');



const express = require('express');
const app = express();
const hbs = require('hbs');
const path =require('path');

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, 'public')));

// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));




var clientId = 'ebcdec71811540b29493ea4fa98a40c4',
    clientSecret = 'd92e700771ae40f78f204d255851025c';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});


app.get("/", (request, response, next) => {
    response.render("home-page.hbs");
    // __dirname = "DIRECTORY NAME"
});







// app.get("/artist", (request, response, next) => {
//   // response.render("artist.hbs");
//   response.send('<h1>'+req.query +'</h1>');
  
//   // __dirname = "DIRECTORY NAME"
// });

app.get('/artist', (req, res) => {
  spotifyApi.searchArtists(req.query.artist)
    .then(data => {



      let html = ''
      data.body.artists.items.map(i => {
        let img_url = ''
        i.images.length ? img_url = i.images[0].url : img_url = ''
        html +=  
          `<div>
            <img src=${img_url} alt="" height='100px' width='100px'>
            <p>${i.name}</p>
            <button>
              <a href='./albums/${i.id}'>View Album</a>
            </button>
          </div>`
      })
      res.send(html)
      // res.send(data.body.artists.items)
    })



    .catch(err => {
      // ----> 'HERE WE CAPTURE THE ERROR'
      console.error(err)
    })
})




















app.listen(3000, () => console.log('Example app listening on port 3000!'))