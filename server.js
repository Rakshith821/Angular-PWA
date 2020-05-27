process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let webpush = require('web-push');
let app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hellooo');
});

//https://www.freepnglogos.com/uploads/logo-home-png/chimney-home-icon-transparent-1.png

app.post('/subscribe', (req, res) => {
  let sub = req.body;
  console.log('sub');
  console.log(sub);
  res.set('Content-Type', 'application/json');
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    "BM-7g_Rr7f26umJzGlIkhix4rxXyC7ELijJgi_oWUKMb95KSSkuegP-S-QeEiAs8k9FLeD0Om63KpShbnezfRJo",
    "TDYGOcD7tESdoltucAMIqn0ysm-pLIeEhStjvAYWjdw"
  );
  let payload = JSON.stringify( {
    "notification": {
        "title": "Angular News",
        "body": "Newsletter Available!",
        "icon": "assets/main-page-logo-small-hat.png",
        "vibrate": [100, 50, 100],
        "data": {
            "dateOfArrival": Date.now(),
            "primaryKey": 1
        },
        "actions": [{
            "action": "explore",
            "title": "Go to the site"
        }]
    }
});
  Promise.resolve(webpush.sendNotification(sub, payload)).then(res1 => {
    console.log('res1');
    console.log(res1);
    res.status(200).json({
      message: "notification sent"
    })
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})



app.listen(3000, () => {

})