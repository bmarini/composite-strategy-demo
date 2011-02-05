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
	};
	
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
	_( _.range( 10 ) ).each( function( )
	{
		modules.push( new Module( 'green', [ ] ) );
	} );
	
	// display the modules
	_( modules ).each( function( module )
	{
		$( '#modules' ).append( module.toElement( ) );
	} );
} );