
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('layout'); //render index.html
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.admin = function(req, res) {
	res.render('admin');
}

exports.adminPartials = function(req, res) {
	var name = req.params.name;
	res.render('adminPartials/' + name);
}