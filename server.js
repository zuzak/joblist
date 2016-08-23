var express = require( 'express' );
var path = require( 'path' );
var sass = require( 'node-sass-middleware' );

var app = module.exports = express();
var logger = require( 'morgan' ); /*******/
app.use(logger('dev'));

// the data isn't changing and isn't complex so
// let's cheat and use a JSON file instead of a real database
var applicants = require( path.join( __dirname, 'data/applicants.json' ) );

// template engine
app.set( 'view engine', 'pug' );

// SASS middleware
app.use( sass ({
  src: path.join(__dirname),
  includePaths: [
	  // import required GDS toolkit SASS:
	  path.join( __dirname, 'node_modules/govuk_frontend_toolkit/stylesheets' ),
	  // and because I found it lying around:
	  path.join( __dirname, 'node_modules/govuk-elements-sass/public/sass' )
  ],
  dest: path.join(__dirname),
  debug: true,
  indentedSyntax: false,
  sourceMap: true
} ) );
// serve my CSS
app.use( '/public', express.static( path.join( __dirname, 'public' ) ) );
// serve GDS assets under /public (seems hardcoded?)
app.use('/public', express.static( path.join(
				__dirname,
				'node_modules/govuk_frontend_toolkit'
			) ) );

// routes
app.get( '/', function ( req, res ) {
	res.render( 'index.pug', { applicants: applicants } );
} );

app.use(express.static(path.join(__dirname, 'public')));

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
