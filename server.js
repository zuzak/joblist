var express = require( 'express' );
var path = require( 'path' );

var app = module.exports = express();

// the data isn't changing and isn't complex so
// let's cheat and use a JSON file instead of a real database
var applicants = require( path.join( __dirname, 'data/applicants.json' ) );

app.set( 'view engine', 'pug' );

app.get( '/', function ( req, res ) {
	res.render( 'index.pug', { applicants: applicants } );
} );

app.get( '/applicant/:key', function ( req, res ) {
	if ( applicants[req.params.key] ) {
		res.render( 'applicant.pug', { applicant: applicants[req.params.key] } );
	} else {
		res.status( 404 ).end();
	}
} );

app.listen( 3000, function () {
	console.log( 'listening on 3000' );
} );
