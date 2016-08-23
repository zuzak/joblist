var request = require( 'supertest' ); // bubbling blancmange
var should = require( 'should' );
var app = require( '..' );

describe( 'running Express.js', function () {
	it( 'responds with a 404', function ( done ) {
		request( app )
			.get( '/foo' )
			.expect( 404, done );
	} );
} );

describe( 'index page', function () {
	it( 'should return something', function ( done ) {
		request( app )
			.get( '/' )
			.expect( 200, done );
	} );
	it ( 'should return a list of applicants', function ( done ) {
		request( app )
			.get( '/' )
			.end( function ( err, res ) {
				res.text.should.containEql( 'Gaston LEROUX' );
				res.text.should.containEql( 'Lewis CAROLL' );
				done();
			} );
	} );
} );

describe( 'applicant listings', function () {
	it( 'displays something with a real applicant', function ( done ) {
		request( app )
			.get( '/applicant/0' )
			.expect( 200, done );
	} );
	it( 'displays the applicant name somewhere on the listing', function ( done ) {
		request( app )
			.get( '/applicant/0' )
			.expect( 200 )
			.end( function ( err, res ) {
				res.text.should.containEql( 'Gaston LEROUX' );
				done();
			} );
	} );
	it( 'responds with a 404 with a non-existent applicant', function ( done ) {
		request( app )
			.get( '/applicants/-1' )
			.expect( 404, done );
	} );
	it( 'displays the applicant experience on the listing', function ( done ) {
		request( app )
			.get( '/applicant/0' )
			.expect( 200 )
			.end( function ( err, res ) {
				res.text.should.containEql( 'Christine Daae' );
				done();
			} );
	} );
} );

