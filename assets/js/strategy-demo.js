$( document ).ready( function( )
{
	// module definition
	var Module = function( type, tags )
	{
		this.type = type;
		this.tags = tags;
		
		this.toElement = function( )
		{
			return '<div class="module ' + this.type + '">Module: ' + this.type + '</div>';
		};
		
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
		
		return modules;
	};
	
	strategies.push( featuredModuleStrategy );
	
	//--------------------------------------------------------
	// MODULE DISPLAY
	//--------------------------------------------------------
	
	// randomize the modules, just for kicks
	modules = _( modules ).sortBy( Math.random );
	
	// compose the display strategies
	var composition = _.compose.apply( this, strategies );
	
	// display the modules
	_( composition( modules ) ).each( function( module )
	{
		$( '#modules' ).append( module.toElement( ) );
	} );
} );