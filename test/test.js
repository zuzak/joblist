var request = require( 'supertest' ); // bubbling blancmange
var app = require( '..' );

describe( 'running Express.js', function () {
	it( 'responds with a homepage', function ( done ) {
		request( app )
			.get( '/' )
			.expect( 200, done );
	} );
	it( 'responds with a 404', function ( done ) {
		request( app )
			.get( '/foo' )
			.expect( 404, done );
	} );
} );

