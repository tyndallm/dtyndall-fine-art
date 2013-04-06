/*
 * Serve JSON to our AngularJS client
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Set up MongoDB connection
//var mongoURI = 'mongodb://tyndallm:11526HHTx105@linus.mongohq.com:10084/appstore';
var mongoURI = 'mongodb://127.0.0.1:27017/artist';
console.log('connecting to database on MongoHQ...');
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("succesfully connected to MongoHQ Painting collection");
});

// Painting Schema
var paintingSchema = mongoose.Schema(
    { title: String,
      description: String,
      createdOn: { type: Date, default: Date.now },
      dimensions: {
      	height: { type: String},
      	width: { type: String}
      },
      medium: String,
      available: {type: Boolean, default: true},
      price : String,
      sold: { type: Boolean, default: false },
      soldOn: { type: Date},
      soldTo: { type: Schema.ObjectId, ref: 'Customer'}, // ref must be the actual model name!!!!!!!
      location: String,
      image: String,
      thumbImage: String
    });

/* Painting json

	"title": "Test Painting",
    "description": "This is a test painting. Lorem ipsum dolor it",
    "price": "$1499.00",
    "medium": "oiloncanvas",
    "available": "true",
    "image": "http://placehold.it/600x800.png",
    "thumbImage": "http://placehold.it/175x175.png"

*/

var customerSchema = mongoose.Schema(
	{ first: String,
	  last: String,
	  email: String,
	  phone: String,
	  street: String,
	  apt: String,
	  city: String,
	  state: String,
	  zipcode: String,
	  country: String,
	  paintings: [String]
	});

var mailingListSchema = mongoose.Schema(
	{ first: String,
	  last: String,
	  email: String,
	  customer: { type: Boolean, default: false },
	  customerId: String,
	  subscribed: { type: Boolean, default: true }
	});

var gallerySchema = mongoose.Schema(
	{ name: 'string',
	  phone: 'string',
	  fax: 'string',
	  owner: {
	  	first: 'string',
	  	last: 'string',
	  	phone: 'string',
	  	email: 'string'
	  },
	  street: 'string',
	  apt: 'string',
	  city: 'string',
	  state: 'string',
	  zipcode: 'string',
	  country: 'string'
	});


var Painting = mongoose.model('Painting', paintingSchema);
var Customer = mongoose.model('Customer', customerSchema);
var MailingList = mongoose.model('MailingList', mailingListSchema);
var Gallery = mongoose.model('Gallery', gallerySchema);

// GET
exports.paintings = function (req, res) {

	Painting.find(function (err, paintings) {
	  if(err) {
      	return res.json({error: "Error fetching paintings" });
	  }
	  else {
	    res.json(paintings);
	  }
	});

};

exports.painting = function (req, res) {
	var paintingId = req.params.id;
	console.log("Server reqId: ", paintingId);
	Painting.find({ _id: paintingId }, function(err, painting) {
		if(err) {
		  return res.json({error: "Error fetching painting" });
		}
		else{
			res.json(painting);
		}
	});

};

exports.mailinglist = function (req, res) {
	MailingList.find(function (err, mailinglist) {
		console.log(req);
		if(err) {
			return res.json({error: "Error fetching mailing list"});
		}
		else {
			res.json(mailinglist);
		}
	})
}

// POST
exports.addPainting = function (req, res) {
	console.log(req.body);

	var newPainting = new Painting(req.body);
	console.log(newPainting);

	newPainting.save(function (err) {
	  if(err) {
		  return res.json({error: "Error saving new painting"});
	  } else {
	  	console.log("Success");
	  	res.json(newPainting);
	  }
	  
	});
};


exports.addSubscriber = function (req, res) {
	var newSubscriber = new MailingList(req.body);
	console.log(newSubscriber);

	newSubscriber.save(function (err) {
	  if(err) {
		  return res.json({error: "Error saving new subscriber"});
	  } else {
	  	console.log("Success");
	  	res.json(newSubscriber);
	  }
	  
	});
}

// PUT

exports.editPainting = function (req, res) {
	var paintingId = req.params.id;
	var query = { _id: paintingId };

	var updatedPainting = req.body();
	console.log(updatedPainting);

	Painting.findOneAndUpdate(query, updatedPainting, options, callback);
	res.json(updatedPainting);
};

// DELETE

exports.removeSubscriber = function (req, res){
	var subscriberId = req.params.id;
	console.log(subscriberId);
	MailingList.find({ _id: subscriberId }).remove();
	return res.json({success: "removed subscriber " + subscriberId});
}



