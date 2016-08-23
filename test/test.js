var request = require( 'supertest' ); // bubbling blancmange
var should = require( 'should' );
var unlink = require( 'fs' ).unlinkSync;
var path = require( 'path' );
var app = require( '..' );

describe( 'running Express.js', function () {
	it( 'responds with a 404', function ( done ) {
		request( app )
			.get( '/foo' )
			.expect( 404, done );
	} );
} );

describe( 'static files', function () {
	before( function () {
		try {
			unlink( path.join ( __dirname, '/public/index.css' ) );
		} catch ( e ) {
			if ( e.code === 'ENOENT' ) { // i.e. file already gone
				return;
			}
			throw e;
		}
	} );
	it( 'serves CSS pages', function ( done ) {
		// this test will break if SASS stops working nicely
		request( app )
			.get( '/public/index.css' )
			.expect( 200, done );
	} );
	it( 'serves images', function ( done ) {
		// this test will break if GDS assets don't work
		request( app )
			.get( '/public/images/icon-search.png' ) // picked at random
			.expect( 'Content-Type', 'image/png' )
			.expect( 200, done );
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

