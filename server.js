var express = require( 'express' ); // web framework
var path = require( 'path' );
var sass = require( 'node-sass-middleware' ); // SASS -> CSS on-the-fly

var app = module.exports = express();

// the data isn't changing and isn't complex so
// let's cheat and use a JSON file instead of a real database
// it's a global variable though :(
var applicants = require( path.join( __dirname, 'data/applicants.json' ) );

// template engine
app.set( 'view engine', 'pug' );

// SASS middleware
app.use( sass ( {
	src: __dirname,
	includePaths: [
		// import required GDS toolkit SASS:
		path.join( __dirname, 'node_modules/govuk_frontend_toolkit/stylesheets' ),
		// and because I found it lying around:
		path.join( __dirname, 'node_modules/govuk-elements-sass/public/sass' )
	],
	dest: __dirname,
	indentedSyntax: false,
	sourceMap: true
} ) );

// serve my CSS
app.use( '/public', express.static( path.join( __dirname, 'public' ) ) );
// serve GDS assets under /public (seems hardcoded?)
app.use( '/public', express.static( path.join(
				__dirname,
				'node_modules/govuk_frontend_toolkit'
			) ) );

// routes
app.get( '/', function ( req, res ) { // homepage
	res.render( 'index.pug', { applicants: applicants } );
} );

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.get( '/applicant/:key', function ( req, res ) {
	// it's a little suspect just using a sequential number as the path
	// in my URL, but for my purposes, where I know the data doesn't change
	// and I'm not too worried about security, it's probably fine
	if ( applicants[req.params.key] ) {
		res.render( 'applicant.pug', { applicant: applicants[req.params.key] } );
	} else {
		res.status( 404 ).end();
	}
} );

app.listen( 3000, function () {
	console.log( 'listening on 3000' );
} );
