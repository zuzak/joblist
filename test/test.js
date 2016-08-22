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

describe( 'applicant listings', function () {
	it( 'displays something with a real applicant', function ( done ) {
		request( app )
			.get( '/applicant/0' )
			.expect( 200, done );
	} );
	it( 'responds with a 404 with a non-existent applicant', function ( done ) {
		request( app )
			.get( '/applicants/-1' )
			.expect( 404, done );
	} );
} );

