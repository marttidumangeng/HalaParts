'use strict';
// to monitoring server communication
//require('@risingstack/trace');
// your application's code
// Imports
const express = require('express');
const bodyParser = require('body-parser');
const Smooch = require('smooch-core');
var http = require('http');

// Config
const PORT = 3000;
const KEY_ID = 'app_5912d6ae10fb117000a1dd32';//development
//const KEY_ID = 'app_591d258245af4a6400de2751';//staging
const SECRET = 'j80aMJE7EmxatNpEzYHnr1w5';
//const SECRET = 'n6IZnNI1ksy893Juxy6G4mkW';

const smooch = new Smooch({
    keyId: KEY_ID,
    secret: SECRET,
    scope: 'app'
});

// Server https://expressjs.com/en/guide/routing.html
const app = express();

const request = require('request')

app.use(bodyParser.json());

//to set get started button
function setupGetStartedButton(res) {
    var messageData = {
        "get_started": 
            {
                "payload": "USER_DEFINED_PAYLOAD"
            }
        
    };
    
    // Start the request
    request({
         url: 'https://graph.facebook.com/v2.7/me/messenger_profile?access_token=EAAaG8Ex0ZCh0BACcNdsyKS5hXZB3uzcIKtkRVE4AxAZC9BpOHtV5ZCILykJeizAcssQnnKknrOiGqdXHh67jFTF7hnJNvdZB9yZCWJHDGK4hZBcO5soGK4kGYryuQTMvBlXFUmYyz28f36WwYkVWlvyfylv7P2kPnQ9mBMGfvcT1AZDZD',
       // url: 'https://graph.facebook.com/v2.7/me/messenger_profile?access_token=EAAaG8Ex0ZCh0BACaf9tvxAZCqqUqfv3F9CVCEo3LLXvCQNdi57cXCZCAyMRKZBxBs2Cm3ySbZBQO4VZAaofHqWVPvYJlgTDLclZAejU0l9wMZCcdL5LvZAwL2dFxIbZCEzGmYwVVaJsP61ZAuROgayWxBtdLHEWI7CGAPVyPnTSYlZAMZCgZDZD',
        //EAAFD2Og5gdkBAHZB2gU8xGB1wEGV09PIQrHZAdZA9S7jROV5bCJ8O0XJXg3nn3FPn0mykAR1lmAZACxZAf4Rj8iLBN7cnfHENuXf26DfhkMq4VqdUmO5of3YCrJ9GjKa4FCUe287vYDOw4MnqIDAZAzQS4CVQ5AAFm16Q8Aup8ugZDZD
       
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        form: messageData
    },
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            res.send(body);

        } else {
            // TODO: Handle errors
            res.send(body);
        }
    });
}

function removePersistentMenu()
{
    smooch.menu.remove()
.then(() => {
    // async code
    });

}
function setupPersistentMenu(res){
//    smooch.menu.remove()
//.then(() => {
//    // async code
//    });
    smooch.menu.configure({
        items: [{
                type: 'link',
                text: 'Find Part',
                uri: 'http://magento.lsipl.com:8080/Magento/scripts/requestParts.php'
               },
              {
                type: 'postback',
                text: 'Trending Parts',
                payload: 'TrendingParts'
              },
              {
                type: 'postback',
                text: 'Profile & Settings',
                payload: 'Profile'
             }
            
        ]
    }).then((response) => {
        console.log('MENU RESPONSE:\n', response);
           res.status(200).send('Menu created');
           res.end();
             
          }).catch((err) => {
              console.log('MENU ERROR:\n', err);
              res.end();
          });
    
}

app.get('/setup', function (req, res) {
    
    setupGetStartedButton(res);
    //removePersistentMenu();
    
    
    setupPersistentMenu(res);

});

app.get('/PartPriceRequest', function (req, res) {
    
   
        //var prodId = req.query('prodId');
        var tempId = req.param('prodId');
       // res.send(prodId);
         

});

// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#webhooks-payload
//app.post('/messages1', function(req, res) {
//  console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));

//  const appUserId = req.body.appUser._id;
//  // Call REST API to send message https://docs.smooch.io/rest/#post-message
//    if (req.body.trigger === 'message:appUser') {
       
//      smooch.appUsers.sendMessage(appUserId, {
        
//            text: "Just put some vinegar", 
//            role: "appMaker", 
//            type: "text",
//            actions: [{
//                    "type": "link", 
//                    "text": "Put vinegar", 
//                    "uri": "https://www.google.com", 
//                    "extraChannelOptions": { "webview_height_ratio": "compact","messenger_extensions": "true" }
//                }]
        

//      }).then((response) => {
//              console.log('API RESPONSE:\n', response);
//              res.end();
//          }).catch((err) => {
//              console.log('API ERROR:\n', err);
//              res.end();
//          });
//}

//}

//);

app.get('/testget', function (req, res) {
    
    var result = [];
    var items;
    // Start the request
    request({
        url: 'http://magento.lsipl.com:8080/Magento/scripts/productData.php?requestId=GetStartedProducts',
        //EAAFD2Og5gdkBAHZB2gU8xGB1wEGV09PIQrHZAdZA9S7jROV5bCJ8O0XJXg3nn3FPn0mykAR1lmAZACxZAf4Rj8iLBN7cnfHENuXf26DfhkMq4VqdUmO5of3YCrJ9GjKa4FCUe287vYDOw4MnqIDAZAzQS4CVQ5AAFm16Q8Aup8ugZDZD
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    },
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            items = JSON.parse(body);
          
        } else {
          
        }
    });

    res.status(200).send('some text');
    res.end();

});

// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#webhooks-payload
app.post('/postback', function(req, res) {
    console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));
    
    const appUserId = req.body.appUser._id;
    const smoochPayload = req.body.postbacks[0].action.payload;
    // Call REST API to send message https://docs.smooch.io/rest/#post-message
    if (req.body.trigger === 'postback') {
        if (smoochPayload === 'TrendingParts') {
            smooch.appUsers.sendMessage(appUserId, {
                role: 'appMaker',
                type: 'image',
                text: 'Click below to find your part!',
                mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVUO4Vl3esJPRHJSWkfmqhFF4Gzlm5yb6w2OEM668I9fg2heHMg',
                actions: [{
                        text: 'Request Part',
                        type: 'link',
                        uri: 'http://magento.lsipl.com:8080/Magento/scripts/requestParts.php'
                    }]
            }).then(() => {
    // async code
            });
        }
//        if (smoochPayload === 'TrendingParts') {
//            var result = [];
//            var items;
//            var crousael;
//            request({
//                url: 'http://magento.lsipl.com:8080/Magento/scripts/productData.php?requestId=GetStartedProducts',
//                //EAAFD2Og5gdkBAHZB2gU8xGB1wEGV09PIQrHZAdZA9S7jROV5bCJ8O0XJXg3nn3FPn0mykAR1lmAZACxZAf4Rj8iLBN7cnfHENuXf26DfhkMq4VqdUmO5of3YCrJ9GjKa4FCUe287vYDOw4MnqIDAZAzQS4CVQ5AAFm16Q8Aup8ugZDZD
//                method: 'POST',
//                headers: { 'Content-Type': 'application/json' }
//            },
//        function (error, response, body) {
//                if (!error && response.statusCode == 200) {
//                    items = JSON.parse(body);
//                    for (var i = 0; i < 3; i++) {
                       
//                        result.push({ product_price: items[i].product_price, product_image: items[i].product_image, product_name: items[i].title });
//                    }
//                    if (result.length > 0) {
                        
                        
//                        var jsonarray = [];
//                        var actionAry = [];
                        
//                        var jsonObj = {
//                        }
                        
//                        var actionObj = {                            
//                        };
                        
//                        for (var i = 0; i < 3; i++) {
                            
//                             jsonObj = {
//                                'title' : undefined,
//                                'description' : undefined,
//                                'mediaUrl' : undefined, 
//                                'actions': []
//                            }
                            
//                             actionObj = {
//                                'text' : undefined,
//                                'type': undefined,
//                                'payload': undefined
//                            };

//                                jsonObj.title = result[i].product_name;
//                                jsonObj.description = result[i].product_name;
//                                jsonObj.mediaUrl = result[i].product_image;

//                                actionObj.text = 'Select';
//                                actionObj.type = 'postback';
//                                actionObj.payload = result[i].product_name;

//                                jsonObj.actions.push(actionObj);
                           

//                            jsonarray.push(jsonObj);
                           
                           
//                        }

                        
//                        //jsonarray = JSON.parse(JSON.stringify(crousael));
//                        smooch.appUsers.sendMessage(appUserId, {
//                        role: 'appMaker',
//                        type: 'carousel',
//                            items: jsonarray
// //[{ title: 'maruti', description: 'maruti', mediaUrl: 'http://magento.lsipl.com:8080/Magento/pub/media/catalog/product/cache/fd4c882ce4b945a790b629f572e4ef93/a/u/automobile.png' }]
//                    }).then((response) => {
//              console.log('API RESPONSE:\n', response);
//              res.end();
//          }).catch((err) => {
//              console.log('API ERROR:\n', err);
//              res.end();
//          });
//                    }
          
//                } else {
          
//                }
//            });



           
//}

}

    res.status(200).send('some text');
    res.end();

});



// Listen on port
app.listen(PORT, () => {
  console.log('App listening on port ${PORT}');
});



//            var options = {
//                host: 'magento.lsipl.com',
//                port: 8080,
//                path: '/magento/scripts/productData.php?requestId=GetStartedProducts',
//                method: 'GET',
//            'Content-Type' : 'application/json; charset=utf-8' 
//            };
//            var result = [];
//            var items;
//            http.request(options, function (res) {
//                console.log('STATUS: ' + res.statusCode);
//                console.log('HEADERS: ' + JSON.stringify(res.headers));

//                //res.setEncoding('utf8');
//                res.on('data', function (data) {
//                    console.log('BODY: ' + data);
//                    //data = JSON.parse(data); 
//                    items = JSON.parse(JSON.stringify(data)); 
//                    for (var i = 0; i < data.length; i++) {

//                        result.push({ product_price: data[i].product_price, product_image: data[i].product_image });
//                    }

//                    for (var i = 0; i < result.length; i++) {

//                        items += ' title: ' + result[i].product_price;
//                    }
//                    smooch.appUsers.sendMessage(appUserId, {
//                        role: 'appMaker',
//                        type: 'carousel',
//                        items: [{
//                                title: 'Tacos',
//                                description: 'Description',
//                                mediaUrl: 'http://www.autoreleased.com/wp-content/uploads/2014/04/Cheap-Car-Parts.jpg',
//                                actions: [{
//                                        text: 'Select',
//                                        type: 'postback',
//                                        payload: 'TACOS'
//                                    }, {
//                                        text: 'More info',
//                                        type: 'link',
//                                        uri: 'http://example.org'
//                                    }]
//                            }, {
//                                title: 'Ramen',
//                                description: 'Description',
//                                mediaUrl: 'http://www.vrsautosalvage.co.uk/images/img-car-parts.png',
//                                actions: [{
//                                        text: 'Select',
//                                        type: 'postback',
//                                        payload: 'RAMEN'
//                                    }, {
//                                        text: 'More info',
//                                        type: 'link',
//                                        uri: 'http://example.org'
//                                    }]
//                            }]
//                    });


//                });
//                //res.send(200);
//               // res.end();
//            }).end();

