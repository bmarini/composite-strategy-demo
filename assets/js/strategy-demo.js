$( document ).ready( function( )
{
	// group mixin to underscore, specialized to groups of 3 for this demo
	_.mixin( { group : function( array ){ var result = [ ]; while( array.length ){ result.push( array.splice( 0, 3 ) ); } return result; } } );
	
	// module definition
	var Module = function( type, tags )
	{
		this.type = type;
		this.tags = tags;
		
		this.toElement = function( )
		{
			return '<div class="module ' + this.type + '">Module: ' + this.type + '</div>';
		};
		
		// this method tries to find the first tag by name
		// if there is one, it returns it, else it returns undefined
		// this is handy as js undefined is falsy so i can use it
		// in selects and other ops
		this.tag = function( tagName )
		{
			return _( this.tags ).detect( function( tag ){ return tag[ tagName ]; } );
		};
	};
	
	//--------------------------------------------------------
	// MODULE COLLECTION
	//--------------------------------------------------------
	
	// make a collection of strategies
	var strategies = [ ];
	
	// make a collection of modules
	var modules = [ ];
	
	// push three featured modules to the modules array
	// they have a qualifying field to sort them on, like date
	modules.push( new Module( 'red', [ { featured : 1 } ] ) );
	modules.push( new Module( 'red', [ { featured : 2 } ] ) );
	modules.push( new Module( 'red', [ { featured : 3 } ] ) );
	
	// push two brand modules to the modules array
	// they have a tag that denotes special attention from a strategy
	modules.push( new Module( 'blue', [ { brand : true } ] ) );
	modules.push( new Module( 'blue', [ { brand : true } ] ) );
	
	// push ten other modules to the array
	// these will be of other random colors to set them apart
	// they have no tags and will not be affected by placement strategies
	_( 10 ).times( function( )
	{
		modules.push( new Module( 'green', [ ] ) );
	} );
	
	//--------------------------------------------------------
	// STRATEGIES
	//--------------------------------------------------------
	
	// strategy to put the most recent module tagged 'featured' first in the list
	var featuredModuleStrategy = function( modules )
	{
		// select all modules with a featured tag
		var featured = _( modules ).select( function( module ){ return module.tag( 'featured' ); } );
		
		// find the highest values featured item
		var feature = _( featured ).chain( ).sortBy( function( module )
		{
			return module.tag( 'featured' ).featured;
		}
		).first( ).value( );

		// remove the featured module from the modules list
		modules.splice( $.inArray( feature, modules ), 1 );
		
		// add the features module to the front of the list
		modules.unshift( feature );
		
		// pass on the altered list
		return modules;
	};
	
	// strategy to put the brand modules in the right column
	var rightColumnStrategy = function( modules )
	{
		// select all modules with a brand tag
		var branded = _( modules ).select( function( module ){ return module.tag( 'brand' ); } );
		
		// get all other modules (goddamn _.without.apply wasn't working, maybe its the whisky)
		var others = _( modules ).reject( function( module ){ return _( branded ).include( module ); } );
		
		// zip up the branded modules after each group of 3
		var zipped = _( others ).chain( ).group( ).zip( branded ).flatten( ).compact( ).value( );

		// pass on the altered list
		return zipped;
	};
	
	//--------------------------------------------------------
	// MODULE DISPLAY
	//--------------------------------------------------------
	
	/*
		INTERESTING!
	*/
	// comment this out to see what the strategies look like without this composited
	strategies.push( rightColumnStrategy );
	
	/*
		INTERESTING!
	*/
	// comment this out to see what the strategies look like without this composited
	strategies.push( featuredModuleStrategy );
	
	/*
		INTERESTING!
	*/
	// randomize the modules, just for kicks. you can take this out if you want.
	modules = _( modules ).sortBy( Math.random );
	
	// compose the display strategies
	var composition = _.compose.apply( this, strategies );
	
	// display the modules
	_( composition( modules ) ).each( function( module )
	{
		$( '#modules' ).append( module.toElement( ) );
	} );
} );