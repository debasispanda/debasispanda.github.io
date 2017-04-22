/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

(function(){var d;window.AmCharts?d=window.AmCharts:(d={},window.AmCharts=d,d.themes={},d.maps={},d.inheriting={},d.charts=[],d.onReadyArray=[],d.useUTC=!1,d.updateRate=30,d.uid=0,d.lang={},d.translations={},d.mapTranslations={},d.windows={},d.initHandlers=[]);d.Class=function(a){var b=function(){arguments[0]!==d.inheriting&&(this.events={},this.construct.apply(this,arguments))};a.inherits?(b.prototype=new a.inherits(d.inheriting),b.base=a.inherits.prototype,delete a.inherits):(b.prototype.createEvents=
function(){for(var a=0,b=arguments.length;a<b;a++)this.events[arguments[a]]=[]},b.prototype.listenTo=function(a,b,c){this.removeListener(a,b,c);a.events[b].push({handler:c,scope:this})},b.prototype.addListener=function(a,b,c){this.removeListener(this,a,b);this.events[a].push({handler:b,scope:c})},b.prototype.removeListener=function(a,b,c){if(a&&a.events)for(a=a.events[b],b=a.length-1;0<=b;b--)a[b].handler===c&&a.splice(b,1)},b.prototype.fire=function(a,b){for(var c=this.events[a],d=0,k=c.length;d<
k;d++){var l=c[d];l.handler.call(l.scope,b)}});for(var c in a)b.prototype[c]=a[c];return b};d.addChart=function(a){d.updateInt||(d.updateInt=setInterval(function(){d.update()},Math.round(1E3/d.updateRate)));d.charts.push(a)};d.removeChart=function(a){for(var b=d.charts,c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);0===b.length&&d.updateInt&&(clearInterval(d.updateInt),d.updateInt=NaN)};d.isModern=!0;d.getIEVersion=function(){var a=0,b,c;"Microsoft Internet Explorer"==navigator.appName&&(b=navigator.userAgent,
c=/MSIE ([0-9]{1,}[.0-9]{0,})/,null!==c.exec(b)&&(a=parseFloat(RegExp.$1)));return a};d.applyLang=function(a,b){var c=d.translations;b.dayNames=d.extend({},d.dayNames);b.shortDayNames=d.extend({},d.shortDayNames);b.monthNames=d.extend({},d.monthNames);b.shortMonthNames=d.extend({},d.shortMonthNames);c&&(c=c[a])&&(d.lang=c,c.monthNames&&(b.dayNames=d.extend({},c.dayNames),b.shortDayNames=d.extend({},c.shortDayNames),b.monthNames=d.extend({},c.monthNames),b.shortMonthNames=d.extend({},c.shortMonthNames)))};
d.IEversion=d.getIEVersion();9>d.IEversion&&0<d.IEversion&&(d.isModern=!1,d.isIE=!0);d.dx=0;d.dy=0;if(document.addEventListener||window.opera)d.isNN=!0,d.isIE=!1,d.dx=.5,d.dy=.5;document.attachEvent&&(d.isNN=!1,d.isIE=!0,d.isModern||(d.dx=0,d.dy=0));window.chrome&&(d.chrome=!0);d.handleMouseUp=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];e&&e.handleReleaseOutside&&e.handleReleaseOutside(a)}};d.handleMouseMove=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];e&&e.handleMouseMove&&
e.handleMouseMove(a)}};d.handleWheel=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];if(e&&e.mouseIsOver){e.mouseWheelScrollEnabled||e.mouseWheelZoomEnabled?e.handleWheel&&e.handleWheel(a):a.stopPropagation&&a.stopPropagation();break}}};d.resetMouseOver=function(){for(var a=d.charts,b=0;b<a.length;b++){var c=a[b];c&&(c.mouseIsOver=!1)}};d.ready=function(a){d.onReadyArray.push(a)};d.handleLoad=function(){d.isReady=!0;for(var a=d.onReadyArray,b=0;b<a.length;b++){var c=a[b];isNaN(d.processDelay)?
c():setTimeout(c,d.processDelay*b)}};d.addInitHandler=function(a,b){d.initHandlers.push({method:a,types:b})};d.callInitHandler=function(a){var b=d.initHandlers;if(d.initHandlers)for(var c=0;c<b.length;c++){var e=b[c];e.types?d.isInArray(e.types,a.type)&&e.method(a):e.method(a)}};d.getUniqueId=function(){d.uid++;return"AmChartsEl-"+d.uid};d.isNN&&(document.addEventListener("mousemove",d.handleMouseMove,!0),document.addEventListener("mouseup",d.handleMouseUp,!0),window.addEventListener("load",d.handleLoad,
!0),window.addEventListener("DOMMouseScroll",d.handleWheel,!0),document.addEventListener("mousewheel",d.handleWheel,!0));d.isIE&&(document.attachEvent("onmousemove",d.handleMouseMove),document.attachEvent("onmouseup",d.handleMouseUp),window.attachEvent("onload",d.handleLoad));d.clear=function(){var a=d.charts;if(a)for(var b=a.length-1;0<=b;b--)a[b].clear();d.updateInt&&clearInterval(d.updateInt);d.charts=[];d.isNN&&(document.removeEventListener("mousemove",d.handleMouseMove,!0),document.removeEventListener("mouseup",
d.handleMouseUp,!0),window.removeEventListener("load",d.handleLoad,!0),window.removeEventListener("DOMMouseScroll",d.handleWheel,!0),document.removeEventListener("mousewheel",d.handleWheel,!0));d.isIE&&(document.detachEvent("onmousemove",d.handleMouseMove),document.detachEvent("onmouseup",d.handleMouseUp),window.detachEvent("onload",d.handleLoad))};d.makeChart=function(a,b,c){var e=b.type,h=b.theme;d.isString(h)&&(h=d.themes[h],b.theme=h);var f;switch(e){case "serial":f=new d.AmSerialChart(h);break;
case "xy":f=new d.AmXYChart(h);break;case "pie":f=new d.AmPieChart(h);break;case "radar":f=new d.AmRadarChart(h);break;case "gauge":f=new d.AmAngularGauge(h);break;case "funnel":f=new d.AmFunnelChart(h);break;case "map":f=new d.AmMap(h);break;case "stock":f=new d.AmStockChart(h);break;case "gantt":f=new d.AmGanttChart(h)}d.extend(f,b);d.isReady?isNaN(c)?f.write(a):setTimeout(function(){d.realWrite(f,a)},c):d.ready(function(){isNaN(c)?f.write(a):setTimeout(function(){d.realWrite(f,a)},c)});return f};
d.realWrite=function(a,b){a.write(b)};d.updateCount=0;d.validateAt=Math.round(d.updateRate/5);d.update=function(){var a=d.charts;d.updateCount++;var b=!1;d.updateCount==d.validateAt&&(b=!0,d.updateCount=0);if(a)for(var c=0;c<a.length;c++)a[c].update&&a[c].update(),b&&a[c].autoResize&&a[c].validateSize&&a[c].validateSize()};d.bezierX=3;d.bezierY=6})();(function(){var d=window.AmCharts;d.toBoolean=function(a,b){if(void 0===a)return b;switch(String(a).toLowerCase()){case "true":case "yes":case "1":return!0;case "false":case "no":case "0":case null:return!1;default:return Boolean(a)}};d.removeFromArray=function(a,b){var c;if(void 0!==b&&void 0!==a)for(c=a.length-1;0<=c;c--)a[c]==b&&a.splice(c,1)};d.getPath=function(){var a=document.getElementsByTagName("script");if(a)for(var b=0;b<a.length;b++){var c=a[b].src;if(-1!==c.search(/\/(amcharts|ammap)\.js/))return c.replace(/\/(amcharts|ammap)\.js.*/,
"/")}};d.normalizeUrl=function(a){return""!==a&&-1===a.search(/\/$/)?a+"/":a};d.isAbsolute=function(a){return 0===a.search(/^http[s]?:|^\//)};d.isInArray=function(a,b){for(var c=0;c<a.length;c++)if(a[c]==b)return!0;return!1};d.getDecimals=function(a){var b=0;isNaN(a)||(a=String(a),-1!=a.indexOf("e-")?b=Number(a.split("-")[1]):-1!=a.indexOf(".")&&(b=a.split(".")[1].length));return b};d.wrappedText=function(a,b,c,e,h,f,g,k,l){var m=d.text(a,b,c,e,h,f,g),n="\n";d.isModern||(n="<br>");if(10<l)return m;
if(m){var q=m.getBBox();if(q.width>k){q=Math.ceil(q.width/k);m.remove();for(var m=[],p=0;-1<(p=b.indexOf(" ",p));)m.push(p),p+=1;for(var r,p=0;p<m.length;p+=Math.ceil(m.length/q))r=m[p],b=b.substr(0,r)+n+b.substr(r+1);if(isNaN(r)){if(0===l)for(p=1;p<q;p++)r=Math.round(b.length/q*p),b=b.substr(0,r)+n+b.substr(r);return d.text(a,b,c,e,h,f,g)}return d.wrappedText(a,b,c,e,h,f,g,k,l+1)}return m}};d.getStyle=function(a,b){var c="";document.defaultView&&document.defaultView.getComputedStyle?c=document.defaultView.getComputedStyle(a,
"").getPropertyValue(b):a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),c=a.currentStyle[b]);return c};d.removePx=function(a){if(void 0!==a)return Number(a.substring(0,a.length-2))};d.getURL=function(a,b){if(a)if("_self"!=b&&b)if("_top"==b&&window.top)window.top.location.href=a;else if("_parent"==b&&window.parent)window.parent.location.href=a;else if("_blank"==b)window.open(a);else{var c=document.getElementsByName(b)[0];c?c.src=a:(c=d.windows[b])?c.opener&&!c.opener.closed?
c.location.href=a:d.windows[b]=window.open(a):d.windows[b]=window.open(a)}else window.location.href=a};d.ifArray=function(a){return a&&0<a.length?!0:!1};d.callMethod=function(a,b){var c;for(c=0;c<b.length;c++){var e=b[c];if(e){if(e[a])e[a]();var h=e.length;if(0<h){var d;for(d=0;d<h;d++){var g=e[d];if(g&&g[a])g[a]()}}}}};d.toNumber=function(a){return"number"==typeof a?a:Number(String(a).replace(/[^0-9\-.]+/g,""))};d.toColor=function(a){if(""!==a&&void 0!==a)if(-1!=a.indexOf(",")){a=a.split(",");var b;
for(b=0;b<a.length;b++){var c=a[b].substring(a[b].length-6,a[b].length);a[b]="#"+c}}else a=a.substring(a.length-6,a.length),a="#"+a;return a};d.toCoordinate=function(a,b,c){var e;void 0!==a&&(a=String(a),c&&c<b&&(b=c),e=Number(a),-1!=a.indexOf("!")&&(e=b-Number(a.substr(1))),-1!=a.indexOf("%")&&(e=b*Number(a.substr(0,a.length-1))/100));return e};d.fitToBounds=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};d.isDefined=function(a){return void 0===a?!1:!0};d.stripNumbers=function(a){return a.replace(/[0-9]+/g,
"")};d.roundTo=function(a,b){if(0>b)return a;var c=Math.pow(10,b);return Math.round(a*c)/c};d.toFixed=function(a,b){var c=String(Math.round(a*Math.pow(10,b)));if(0<b){var e=c.length;if(e<b){var h;for(h=0;h<b-e;h++)c="0"+c}e=c.substring(0,c.length-b);""===e&&(e=0);return e+"."+c.substring(c.length-b,c.length)}return String(c)};d.formatDuration=function(a,b,c,e,h,f){var g=d.intervals,k=f.decimalSeparator;if(a>=g[b].contains){var l=a-Math.floor(a/g[b].contains)*g[b].contains;"ss"==b&&(l=d.formatNumber(l,
f),1==l.split(k)[0].length&&(l="0"+l));("mm"==b||"hh"==b)&&10>l&&(l="0"+l);c=l+""+e[b]+""+c;a=Math.floor(a/g[b].contains);b=g[b].nextInterval;return d.formatDuration(a,b,c,e,h,f)}"ss"==b&&(a=d.formatNumber(a,f),1==a.split(k)[0].length&&(a="0"+a));("mm"==b||"hh"==b)&&10>a&&(a="0"+a);c=a+""+e[b]+""+c;if(g[h].count>g[b].count)for(a=g[b].count;a<g[h].count;a++)b=g[b].nextInterval,"ss"==b||"mm"==b||"hh"==b?c="00"+e[b]+""+c:"DD"==b&&(c="0"+e[b]+""+c);":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-
1));return c};d.formatNumber=function(a,b,c,e,h){a=d.roundTo(a,b.precision);isNaN(c)&&(c=b.precision);var f=b.decimalSeparator;b=b.thousandsSeparator;var g;g=0>a?"-":"";a=Math.abs(a);var k=String(a),l=!1;-1!=k.indexOf("e")&&(l=!0);0<=c&&!l&&(k=d.toFixed(a,c));var m="";if(l)m=k;else{var k=k.split("."),l=String(k[0]),n;for(n=l.length;0<=n;n-=3)m=n!=l.length?0!==n?l.substring(n-3,n)+b+m:l.substring(n-3,n)+m:l.substring(n-3,n);void 0!==k[1]&&(m=m+f+k[1]);void 0!==c&&0<c&&"0"!=m&&(m=d.addZeroes(m,f,c))}m=
g+m;""===g&&!0===e&&0!==a&&(m="+"+m);!0===h&&(m+="%");return m};d.addZeroes=function(a,b,c){a=a.split(b);void 0===a[1]&&0<c&&(a[1]="0");return a[1].length<c?(a[1]+="0",d.addZeroes(a[0]+b+a[1],b,c)):void 0!==a[1]?a[0]+b+a[1]:a[0]};d.scientificToNormal=function(a){var b;a=String(a).split("e");var c;if("-"==a[1].substr(0,1)){b="0.";for(c=0;c<Math.abs(Number(a[1]))-1;c++)b+="0";b+=a[0].split(".").join("")}else{var e=0;b=a[0].split(".");b[1]&&(e=b[1].length);b=a[0].split(".").join("");for(c=0;c<Math.abs(Number(a[1]))-
e;c++)b+="0"}return b};d.toScientific=function(a,b){if(0===a)return"0";var c=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),e=String(e).split(".").join(b);return String(e)+"e"+c};d.randomColor=function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6)};d.hitTest=function(a,b,c){var e=!1,h=a.x,f=a.x+a.width,g=a.y,k=a.y+a.height,l=d.isInRectangle;e||(e=l(h,g,b));e||(e=l(h,k,b));e||(e=l(f,g,b));e||(e=l(f,k,b));e||!0===c||(e=d.hitTest(b,a,!0));return e};d.isInRectangle=function(a,
b,c){return a>=c.x-5&&a<=c.x+c.width+5&&b>=c.y-5&&b<=c.y+c.height+5?!0:!1};d.isPercents=function(a){if(-1!=String(a).indexOf("%"))return!0};d.findPosX=function(a){var b=a,c=a.offsetLeft;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetLeft;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollLeft||0}return c};d.findPosY=function(a){var b=a,c=a.offsetTop;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetTop;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollTop||0}return c};d.findIfFixed=function(a){if(a.offsetParent)for(;a=
a.offsetParent;)if("fixed"==d.getStyle(a,"position"))return!0;return!1};d.findIfAuto=function(a){return a.style&&"auto"==d.getStyle(a,"overflow")?!0:a.parentNode?d.findIfAuto(a.parentNode):!1};d.findScrollLeft=function(a,b){a.scrollLeft&&(b+=a.scrollLeft);return a.parentNode?d.findScrollLeft(a.parentNode,b):b};d.findScrollTop=function(a,b){a.scrollTop&&(b+=a.scrollTop);return a.parentNode?d.findScrollTop(a.parentNode,b):b};d.formatValue=function(a,b,c,e,h,f,g,k){if(b){void 0===h&&(h="");var l;for(l=
0;l<c.length;l++){var m=c[l],n=b[m];void 0!==n&&(n=f?d.addPrefix(n,k,g,e):d.formatNumber(n,e),a=a.replace(new RegExp("\\[\\["+h+""+m+"\\]\\]","g"),n))}}return a};d.formatDataContextValue=function(a,b){if(a){var c=a.match(/\[\[.*?\]\]/g),e;for(e=0;e<c.length;e++){var h=c[e],h=h.substr(2,h.length-4);void 0!==b[h]&&(a=a.replace(new RegExp("\\[\\["+h+"\\]\\]","g"),b[h]))}}return a};d.massReplace=function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var e=b[c];void 0===e&&(e="");a=a.replace(c,e)}return a};
d.cleanFromEmpty=function(a){return a.replace(/\[\[[^\]]*\]\]/g,"")};d.addPrefix=function(a,b,c,e,h){var f=d.formatNumber(a,e),g="",k,l,m;if(0===a)return"0";0>a&&(g="-");a=Math.abs(a);if(1<a)for(k=b.length-1;-1<k;k--){if(a>=b[k].number&&(l=a/b[k].number,m=Number(e.precision),1>m&&(m=1),c=d.roundTo(l,m),m=d.formatNumber(c,{precision:-1,decimalSeparator:e.decimalSeparator,thousandsSeparator:e.thousandsSeparator}),!h||l==c)){f=g+""+m+""+b[k].prefix;break}}else for(k=0;k<c.length;k++)if(a<=c[k].number){l=
a/c[k].number;m=Math.abs(Math.round(Math.log(l)*Math.LOG10E));l=d.roundTo(l,m);f=g+""+l+""+c[k].prefix;break}return f};d.remove=function(a){a&&a.remove()};d.getEffect=function(a){">"==a&&(a="easeOutSine");"<"==a&&(a="easeInSine");"elastic"==a&&(a="easeOutElastic");return a};d.getObjById=function(a,b){var c,e;for(e=0;e<a.length;e++){var h=a[e];h.id==b&&(c=h)}return c};d.applyTheme=function(a,b,c){b||(b=d.theme);b&&b[c]&&d.extend(a,b[c])};d.isString=function(a){return"string"==typeof a?!0:!1};d.extend=
function(a,b,c){var e;a||(a={});for(e in b)c?a.hasOwnProperty(e)||(a[e]=b[e]):a[e]=b[e];return a};d.copyProperties=function(a,b){for(var c in a)a.hasOwnProperty(c)&&"events"!=c&&void 0!==a[c]&&"function"!=typeof a[c]&&"cname"!=c&&(b[c]=a[c])};d.processObject=function(a,b,c,e){!1===a instanceof b&&(a=e?d.extend(new b(c),a):d.extend(a,new b(c),!0));return a};d.fixNewLines=function(a){var b=RegExp("\\n","g");a&&(a=a.replace(b,"<br />"));return a};d.fixBrakes=function(a){if(d.isModern){var b=RegExp("<br>",
"g");a&&(a=a.replace(b,"\n"))}else a=d.fixNewLines(a);return a};d.deleteObject=function(a,b){if(a){if(void 0===b||null===b)b=20;if(0!==b)if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)d.deleteObject(a[c],b-1),a[c]=null;else if(a&&!a.tagName)try{for(c in a)a[c]&&("object"==typeof a[c]&&d.deleteObject(a[c],b-1),"function"!=typeof a[c]&&(a[c]=null))}catch(e){}}};d.bounce=function(a,b,c,e,h){return(b/=h)<1/2.75?7.5625*e*b*b+c:b<2/2.75?e*(7.5625*(b-=1.5/2.75)*b+.75)+
c:b<2.5/2.75?e*(7.5625*(b-=2.25/2.75)*b+.9375)+c:e*(7.5625*(b-=2.625/2.75)*b+.984375)+c};d.easeInSine=function(a,b,c,e,h){return-e*Math.cos(b/h*(Math.PI/2))+e+c};d.easeOutSine=function(a,b,c,e,h){return e*Math.sin(b/h*(Math.PI/2))+c};d.easeOutElastic=function(a,b,c,e,h){a=1.70158;var d=0,g=e;if(0===b)return c;if(1==(b/=h))return c+e;d||(d=.3*h);g<Math.abs(e)?(g=e,a=d/4):a=d/(2*Math.PI)*Math.asin(e/g);return g*Math.pow(2,-10*b)*Math.sin(2*(b*h-a)*Math.PI/d)+e+c};d.fixStepE=function(a){a=a.toExponential(0).split("e");
var b=Number(a[1]);9==Number(a[0])&&b++;return d.generateNumber(1,b)};d.generateNumber=function(a,b){var c="",e;e=0>b?Math.abs(b)-1:Math.abs(b);var h;for(h=0;h<e;h++)c+="0";return 0>b?Number("0."+c+String(a)):Number(String(a)+c)};d.setCN=function(a,b,c,e){if(a.addClassNames&&b&&(b=b.node)&&c){var h=b.getAttribute("class");a=a.classNamePrefix+"-";e&&(a="");h?b.setAttribute("class",h+" "+a+c):b.setAttribute("class",a+c)}};d.parseDefs=function(a,b){for(var c in a){var e=typeof a[c];if(0<a[c].length&&
"object"==e)for(var h=0;h<a[c].length;h++)e=document.createElementNS(d.SVG_NS,c),b.appendChild(e),d.parseDefs(a[c][h],e);else"object"==e?(e=document.createElementNS(d.SVG_NS,c),b.appendChild(e),d.parseDefs(a[c],e)):b.setAttribute(c,a[c])}}})();(function(){var d=window.AmCharts;d.AxisBase=d.Class({construct:function(a){this.createEvents("clickItem","rollOverItem","rollOutItem");this.viY=this.viX=this.y=this.x=this.dy=this.dx=0;this.axisThickness=1;this.axisColor="#000000";this.axisAlpha=1;this.gridCount=this.tickLength=5;this.gridAlpha=.15;this.gridThickness=1;this.gridColor="#000000";this.dashLength=0;this.labelFrequency=1;this.showLastLabel=this.showFirstLabel=!0;this.fillColor="#FFFFFF";this.fillAlpha=0;this.labelsEnabled=!0;this.labelRotation=
0;this.autoGridCount=!0;this.offset=0;this.guides=[];this.visible=!0;this.counter=0;this.guides=[];this.ignoreAxisWidth=this.inside=!1;this.minHorizontalGap=75;this.minVerticalGap=35;this.titleBold=!0;this.minorGridEnabled=!1;this.minorGridAlpha=.07;this.autoWrap=!1;this.titleAlign="middle";this.labelOffset=0;this.bcn="axis-";this.periods=[{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",
count:30},{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"DD",count:2},{period:"DD",count:3},{period:"DD",count:4},{period:"DD",count:5},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},{period:"YYYY",count:50},{period:"YYYY",count:100}];this.dateFormats=[{period:"fff",format:"JJ:NN:SS"},
{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}];this.nextPeriod={fff:"ss",ss:"mm",mm:"hh",hh:"DD",DD:"MM",MM:"YYYY"};d.applyTheme(this,a,"AxisBase")},zoom:function(a,b){this.start=a;this.end=b;this.dataChanged=!0;this.draw()},fixAxisPosition:function(){var a=this.position;"H"==this.orientation?("left"==a&&(a="bottom"),"right"==a&&(a="top")):
("bottom"==a&&(a="left"),"top"==a&&(a="right"));this.position=a},draw:function(){var a=this.chart;this.allLabels=[];this.counter=0;this.destroy();this.fixAxisPosition();this.labels=[];var b=a.container,c=b.set();a.gridSet.push(c);this.set=c;b=b.set();a.axesLabelsSet.push(b);this.labelsSet=b;this.axisLine=new this.axisRenderer(this);this.autoGridCount?("V"==this.orientation?(a=this.height/this.minVerticalGap,3>a&&(a=3)):a=this.width/this.minHorizontalGap,this.gridCountR=Math.max(a,1)):this.gridCountR=
this.gridCount;this.axisWidth=this.axisLine.axisWidth;this.addTitle()},setOrientation:function(a){this.orientation=a?"H":"V"},addTitle:function(){var a=this.title;this.titleLabel=null;if(a){var b=this.chart,c=this.titleColor;void 0===c&&(c=b.color);var e=this.titleFontSize;isNaN(e)&&(e=b.fontSize+1);a=d.text(b.container,a,c,b.fontFamily,e,this.titleAlign,this.titleBold);d.setCN(b,a,this.bcn+"title");this.titleLabel=a}},positionTitle:function(){var a=this.titleLabel;if(a){var b,c,e=this.labelsSet,
h={};0<e.length()?h=e.getBBox():(h.x=0,h.y=0,h.width=this.viW,h.height=this.viH,d.VML&&(h.y+=this.y,h.x+=this.x));e.push(a);var e=h.x,f=h.y;d.VML&&(this.rotate?e-=this.x:f-=this.y);var g=h.width,h=h.height,k=this.viW,l=this.viH,m=0,n=a.getBBox().height/2,q=this.inside,p=this.titleAlign;switch(this.position){case "top":b="left"==p?-1:"right"==p?k:k/2;c=f-10-n;break;case "bottom":b="left"==p?-1:"right"==p?k:k/2;c=f+h+10+n;break;case "left":b=e-10-n;q&&(b-=5);c="left"==p?l+1:"right"==p?-1:l/2;m=-90;
break;case "right":b=e+g+10+n-3,q&&(b+=7),c="left"==p?l+2:"right"==p?-2:l/2,m=-90}this.marginsChanged?(a.translate(b,c),this.tx=b,this.ty=c):a.translate(this.tx,this.ty);this.marginsChanged=!1;0!==m&&a.rotate(m)}},pushAxisItem:function(a,b){var c=this,e=a.graphics();0<e.length()&&(b?c.labelsSet.push(e):c.set.push(e));if(e=a.getLabel())this.labelsSet.push(e),e.click(function(b){c.handleMouse(b,a,"clickItem")}).mouseover(function(b){c.handleMouse(b,a,"rollOverItem")}).mouseout(function(b){c.handleMouse(b,
a,"rollOutItem")})},handleMouse:function(a,b,c){this.fire(c,{type:c,value:b.value,serialDataItem:b.serialDataItem,axis:this,target:b.label,chart:this.chart,event:a})},addGuide:function(a){for(var b=this.guides,c=!1,e=b.length,h=0;h<b.length;h++)b[h]==a&&(c=!0,e=h);a=d.processObject(a,d.Guide,this.theme);a.id||(a.id="guideAuto"+e+"_"+(new Date).getTime());c||b.push(a)},removeGuide:function(a){var b=this.guides,c;for(c=0;c<b.length;c++)b[c]==a&&b.splice(c,1)},handleGuideOver:function(a){clearTimeout(this.chart.hoverInt);
var b=a.graphics.getBBox(),c=b.x+b.width/2,b=b.y+b.height/2,e=a.fillColor;void 0===e&&(e=a.lineColor);this.chart.showBalloon(a.balloonText,e,!0,c,b)},handleGuideOut:function(){this.chart.hideBalloon()},addEventListeners:function(a,b){var c=this;a.mouseover(function(){c.handleGuideOver(b)});a.touchstart(function(){c.handleGuideOver(b)});a.mouseout(function(){c.handleGuideOut(b)})},getBBox:function(){var a=this.labelsSet.getBBox();d.VML||(a={x:a.x+this.x,y:a.y+this.y,width:a.width,height:a.height});
return a},destroy:function(){d.remove(this.set);d.remove(this.labelsSet);var a=this.axisLine;a&&d.remove(a.set);d.remove(this.grid0)},chooseMinorFrequency:function(a){for(var b=10;0<b;b--)if(a/b==Math.round(a/b))return a/b},parseDatesDraw:function(){var a,b=this.chart,c=this.showFirstLabel,e=this.showLastLabel,h,f="",g=d.extractPeriod(this.minPeriod),k=d.getPeriodDuration(g.period,g.count),l,m,n,q,p,r=this.firstDayOfWeek,t=this.boldPeriodBeginning;a=this.minorGridEnabled;var u,z=this.gridAlpha,v,
w=this.choosePeriod(0),x=w.period,w=w.count,A=d.getPeriodDuration(x,w);A<k&&(x=g.period,w=g.count,A=k);g=x;"WW"==g&&(g="DD");this.stepWidth=this.getStepWidth(this.timeDifference);var B=Math.ceil(this.timeDifference/A)+5,D=l=d.resetDateToMin(new Date(this.startTime-A),x,w,r).getTime();g==x&&1==w&&this.centerLabelOnFullPeriod&&(n=A*this.stepWidth);this.cellWidth=k*this.stepWidth;q=Math.round(l/A);k=-1;q/2==Math.round(q/2)&&(k=-2,l-=A);q=this.firstTime;var C=0;a&&1<w&&(u=this.chooseMinorFrequency(w),
v=d.getPeriodDuration(x,u));if(0<this.gridCountR)for(a=k;a<=B;a++){p=q+A*(a+Math.floor((D-q)/A))-C;"DD"==x&&(p+=36E5);p=d.resetDateToMin(new Date(p),x,w,r).getTime();"MM"==x&&(h=(p-l)/A,1.5<=(p-l)/A&&(p=p-(h-1)*A+d.getPeriodDuration("DD",3),p=d.resetDateToMin(new Date(p),x,1).getTime(),C+=A));h=(p-this.startTime)*this.stepWidth;h=this.rotate?h+(this.x-this.viX):"date"==this.type?this.axisWidth-h+(this.y-this.viY):h+(this.y-this.viY);f=!1;this.nextPeriod[g]&&(f=this.checkPeriodChange(this.nextPeriod[g],
1,p,l,g));l=!1;f&&this.markPeriodChange?(f=this.dateFormatsObject[this.nextPeriod[g]],this.twoLineMode&&(f=this.dateFormatsObject[g]+"\n"+f,f=d.fixBrakes(f)),l=!0):f=this.dateFormatsObject[g];t||(l=!1);this.currentDateFormat=f;f=d.formatDate(new Date(p),f,b);if(a==k&&!c||a==B&&!e)f=" ";this.labelFunction&&(f=this.labelFunction(f,new Date(p),this,x,w,m).toString());this.boldLabels&&(l=!0);m=new this.axisItemRenderer(this,h,f,!1,n,0,!1,l);this.pushAxisItem(m);m=l=p;if(!isNaN(u))for(h=1;h<w;h+=u)this.gridAlpha=
this.minorGridAlpha,f=p+v*h,f=d.resetDateToMin(new Date(f),x,u,r).getTime(),f=new this.axisItemRenderer(this,(f-this.startTime)*this.stepWidth,void 0,void 0,void 0,void 0,void 0,void 0,void 0,!0),this.pushAxisItem(f);this.gridAlpha=z}},choosePeriod:function(a){var b=d.getPeriodDuration(this.periods[a].period,this.periods[a].count),c=Math.ceil(this.timeDifference/b),e=this.periods;return this.timeDifference<b&&0<a?e[a-1]:c<=this.gridCountR?e[a]:a+1<e.length?this.choosePeriod(a+1):e[a]},getStepWidth:function(a){var b;
this.startOnAxis?(b=this.axisWidth/(a-1),1==a&&(b=this.axisWidth)):b=this.axisWidth/a;return b},timeZoom:function(a,b){this.startTime=a;this.endTime=b},minDuration:function(){var a=d.extractPeriod(this.minPeriod);return d.getPeriodDuration(a.period,a.count)},checkPeriodChange:function(a,b,c,e,h){c=new Date(c);var f=new Date(e),g=this.firstDayOfWeek;e=b;"DD"==a&&(b=1);c=d.resetDateToMin(c,a,b,g).getTime();b=d.resetDateToMin(f,a,b,g).getTime();return"DD"==a&&"hh"!=h&&c-b<=d.getPeriodDuration(a,e)?!1:
c!=b?!0:!1},generateDFObject:function(){this.dateFormatsObject={};var a;for(a=0;a<this.dateFormats.length;a++){var b=this.dateFormats[a];this.dateFormatsObject[b.period]=b.format}}})})();(function(){var d=window.AmCharts;d.ValueAxis=d.Class({inherits:d.AxisBase,construct:function(a){this.cname="ValueAxis";this.createEvents("axisChanged","logarithmicAxisFailed","axisSelfZoomed","axisZoomed");d.ValueAxis.base.construct.call(this,a);this.dataChanged=!0;this.stackType="none";this.position="left";this.unitPosition="right";this.recalculateToPercents=this.includeHidden=this.includeGuidesInMinMax=this.integersOnly=!1;this.durationUnits={DD:"d. ",hh:":",mm:":",ss:""};this.scrollbar=!1;this.baseValue=
0;this.radarCategoriesEnabled=!0;this.gridType="polygons";this.useScientificNotation=!1;this.axisTitleOffset=10;this.minMaxMultiplier=1;this.logGridLimit=2;this.totalTextOffset=this.treatZeroAs=0;this.minPeriod="ss";d.applyTheme(this,a,this.cname)},updateData:function(){0>=this.gridCountR&&(this.gridCountR=1);this.totals=[];this.data=this.chart.chartData;var a=this.chart;"xy"!=a.type&&(this.stackGraphs("smoothedLine"),this.stackGraphs("line"),this.stackGraphs("column"),this.stackGraphs("step"));this.recalculateToPercents&&
this.recalculate();this.synchronizationMultiplier&&this.synchronizeWith?(d.isString(this.synchronizeWith)&&(this.synchronizeWith=a.getValueAxisById(this.synchronizeWith)),this.synchronizeWith&&(this.synchronizeWithAxis(this.synchronizeWith),this.foundGraphs=!0)):(this.foundGraphs=!1,this.getMinMax())},draw:function(){d.ValueAxis.base.draw.call(this);var a=this.chart,b=this.set;d.setCN(a,this.set,"value-axis value-axis-"+this.id);d.setCN(a,this.labelsSet,"value-axis value-axis-"+this.id);d.setCN(a,
this.axisLine.axisSet,"value-axis value-axis-"+this.id);var c=this.type;"duration"==c&&(this.duration="ss");!0===this.dataChanged&&(this.updateData(),this.dataChanged=!1);"date"==c&&(this.logarithmic=!1,this.min=this.minRR,this.max=this.maxRR,this.minimumDate&&(this.min=this.minimumDate.getTime()),this.maximumDate&&(this.max=this.maximumDate.getTime()));if(this.logarithmic){var e=this.treatZeroAs,h=this.getMin(0,this.data.length-1);this.minReal<h&&(this.minReal=h);isNaN(this.minReal)&&(this.minReal=
h);0<e&&0===h&&(this.minReal=h=e);if(0>=h||0>=this.minimum){this.fire("logarithmicAxisFailed",{type:"logarithmicAxisFailed",chart:a});return}}this.grid0=null;var f,g,k=a.dx,l=a.dy,e=!1,h=this.logarithmic;if(isNaN(this.min)||isNaN(this.max)||!this.foundGraphs||Infinity==this.min||-Infinity==this.max)e=!0;else{var m=this.labelFrequency,n=this.showFirstLabel,q=this.showLastLabel,p=1;f=0;this.minCalc=this.min;this.maxCalc=this.max;this.strictMinMax&&(isNaN(this.minimum)||(this.min=this.minimum),isNaN(this.maximum)||
(this.max=this.maximum));isNaN(this.minZoom)||(this.min=this.minZoom);isNaN(this.maxZoom)||(this.max=this.maxZoom);var r=Math.round((this.maxCalc-this.minCalc)/this.step)+1,t;!0===h?(t=Math.log(this.max)*Math.LOG10E-Math.log(this.minReal)*Math.LOG10E,this.stepWidth=this.axisWidth/t,t>this.logGridLimit&&(r=Math.ceil(Math.log(this.max)*Math.LOG10E)+1,f=Math.round(Math.log(this.minReal)*Math.LOG10E),r>this.gridCountR&&(p=Math.ceil(r/this.gridCountR)))):this.stepWidth=this.axisWidth/(this.max-this.min);
var u=0;1>this.step&&-1<this.step&&(u=d.getDecimals(this.step));this.integersOnly&&(u=0);u>this.maxDecCount&&(u=this.maxDecCount);var z=this.precision;isNaN(z)||(u=z);this.max=d.roundTo(this.max,this.maxDecCount);this.min=d.roundTo(this.min,this.maxDecCount);g={};g.precision=u;g.decimalSeparator=a.nf.decimalSeparator;g.thousandsSeparator=a.nf.thousandsSeparator;this.numberFormatter=g;var v,w=this.guides,x=w.length;if(0<x){var A=this.fillAlpha;for(g=this.fillAlpha=0;g<x;g++){var B=w[g],D=NaN,C=B.above;
isNaN(B.toValue)||(D=this.getCoordinate(B.toValue),v=new this.axisItemRenderer(this,D,"",!0,NaN,NaN,B),this.pushAxisItem(v,C));var I=NaN;isNaN(B.value)||(I=this.getCoordinate(B.value),v=new this.axisItemRenderer(this,I,B.label,!0,NaN,(D-I)/2,B),this.pushAxisItem(v,C));isNaN(D-I)||(v=new this.guideFillRenderer(this,I,D,B),this.pushAxisItem(v,C),v=v.graphics(),B.graphics=v,B.balloonText&&this.addEventListeners(v,B))}this.fillAlpha=A}this.exponential=!1;for(g=f;g<r;g+=p)w=d.roundTo(this.step*g+this.min,
u),-1!=String(w).indexOf("e")&&(this.exponential=!0);this.duration&&(this.maxInterval=d.getMaxInterval(this.max,this.duration));var u=this.step,H,w=this.minorGridAlpha;this.minorGridEnabled&&(H=this.getMinorGridStep(u,this.stepWidth*u));if("date"==c)this.generateDFObject(),this.timeDifference=this.max-this.min,this.maxTime=this.lastTime=this.max,this.startTime=this.firstTime=this.min,this.parseDatesDraw();else for(g=f;g<r;g+=p)if(c=u*g+this.minCalc,h&&this.max-this.min>10*this.min&&(c-=this.min),
c=d.roundTo(c,this.maxDecCount+1),!this.integersOnly||Math.round(c)==c)if(isNaN(z)||Number(d.toFixed(c,z))==c){!0===h&&(0===c&&(c=this.minReal),t>this.logGridLimit&&(c=Math.pow(10,g)));v=this.formatValue(c,!1,g);Math.round(g/m)!=g/m&&(v=void 0);if(0===g&&!n||g==r-1&&!q)v=" ";f=this.getCoordinate(c);v=new this.axisItemRenderer(this,f,v,void 0,void 0,void 0,void 0,this.boldLabels);this.pushAxisItem(v);if(c==this.baseValue&&"radar"!=a.type){var O,J,A=this.viW,B=this.viH;v=this.viX;x=this.viY;"H"==this.orientation?
0<=f&&f<=A+1&&(O=[f,f,f+k],J=[B,0,l]):0<=f&&f<=B+1&&(O=[0,A,A+k],J=[f,f,f+l]);O&&(f=d.fitToBounds(2*this.gridAlpha,0,1),f=d.line(a.container,O,J,this.gridColor,f,1,this.dashLength),f.translate(v,x),this.grid0=f,a.axesSet.push(f),f.toBack(),d.setCN(a,f,this.bcn+"zero-grid-"+this.id),d.setCN(a,f,this.bcn+"zero-grid"))}if(!isNaN(H)&&0<w&&g<r-1){f=this.gridAlpha;this.gridAlpha=this.minorGridAlpha;for(v=1;v<u/H;v++)x=this.getCoordinate(c+H*v),x=new this.axisItemRenderer(this,x,"",!1,0,0,!1,!1,0,!0),this.pushAxisItem(x);
this.gridAlpha=f}}t=this.baseValue;this.min>this.baseValue&&this.max>this.baseValue&&(t=this.min);this.min<this.baseValue&&this.max<this.baseValue&&(t=this.max);h&&t<this.minReal&&(t=this.minReal);this.baseCoord=this.getCoordinate(t);t={type:"axisChanged",target:this,chart:a};t.min=h?this.minReal:this.min;t.max=this.max;this.fire("axisChanged",t);this.axisCreated=!0}h=this.axisLine.set;t=this.labelsSet;this.positionTitle();"radar"!=a.type?(a=this.viX,H=this.viY,b.translate(a,H),t.translate(a,H)):
h.toFront();!this.visible||e?(b.hide(),h.hide(),t.hide()):(b.show(),h.show(),t.show());this.axisY=this.y-this.viY;this.axisX=this.x-this.viX},formatValue:function(a,b,c){var e=this.exponential,h=this.logarithmic,f=this.numberFormatter,g=this.chart;!0===this.logarithmic&&(e=-1!=String(a).indexOf("e")?!0:!1);this.useScientificNotation&&(e=!0);this.usePrefixes&&(e=!1);e?(b=-1==String(a).indexOf("e")?a.toExponential(15):String(a),c=b.split("e"),b=Number(c[0]),c=Number(c[1]),b=d.roundTo(b,14),10==b&&(b=
1,c+=1),b=b+"e"+c,0===a&&(b="0"),1==a&&(b="1")):(h&&(e=String(a).split("."),e[1]?(f.precision=e[1].length,0>c&&(f.precision=Math.abs(c)),b&&1<a&&(f.precision=0)):f.precision=-1),b=this.usePrefixes?d.addPrefix(a,g.prefixesOfBigNumbers,g.prefixesOfSmallNumbers,f,!b):d.formatNumber(a,f,f.precision));this.duration&&(b=d.formatDuration(a,this.duration,"",this.durationUnits,this.maxInterval,f));"date"==this.type&&(b=d.formatDate(new Date(a),this.currentDateFormat,g));this.recalculateToPercents?b+="%":(f=
this.unit)&&(b="left"==this.unitPosition?f+b:b+f);this.labelFunction&&(b=this.labelFunction(a,b,this).toString());return b},getMinorGridStep:function(a,b){var c=[5,4,2];60>b&&c.shift();for(var e=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),h=0;h<c.length;h++){var d=a/c[h],g=Math.floor(Math.log(Math.abs(d))*Math.LOG10E);if(!(0<Math.abs(e-g)))if(1>a){if(g=Math.pow(10,-g)*d,g==Math.round(g))return d}else if(d==Math.round(d))return d}},stackGraphs:function(a){var b=this.stackType;"stacked"==b&&(b="regular");
"line"==b&&(b="none");"100% stacked"==b&&(b="100%");this.stackType=b;var c=[],e=[],h=[],f=[],g,k=this.chart.graphs,l,m,n,q,p=this.baseValue,r=!1;if("line"==a||"step"==a||"smoothedLine"==a)r=!0;if(r&&("regular"==b||"100%"==b))for(q=0;q<k.length;q++)n=k[q],n.hidden||(m=n.type,n.chart==this.chart&&n.valueAxis==this&&a==m&&n.stackable&&(l&&(n.stackGraph=l),l=n));for(l=this.start;l<=this.end;l++){var t=0;for(q=0;q<k.length;q++)if(n=k[q],n.hidden)n.newStack&&(h[l]=NaN,e[l]=NaN);else if(m=n.type,n.chart==
this.chart&&n.valueAxis==this&&a==m&&n.stackable)if(m=this.data[l].axes[this.id].graphs[n.id],g=m.values.value,isNaN(g))n.newStack&&(h[l]=NaN,e[l]=NaN);else{var u=d.getDecimals(g);t<u&&(t=u);isNaN(f[l])?f[l]=Math.abs(g):f[l]+=Math.abs(g);f[l]=d.roundTo(f[l],t);u=n.fillToGraph;r&&u&&(u=this.data[l].axes[this.id].graphs[u.id])&&(m.values.open=u.values.value);"regular"==b&&(r&&(isNaN(c[l])?(c[l]=g,m.values.close=g,m.values.open=this.baseValue):(isNaN(g)?m.values.close=c[l]:m.values.close=g+c[l],m.values.open=
c[l],c[l]=m.values.close)),"column"==a&&(n.newStack&&(h[l]=NaN,e[l]=NaN),m.values.close=g,0>g?(m.values.close=g,isNaN(e[l])?m.values.open=p:(m.values.close+=e[l],m.values.open=e[l]),e[l]=m.values.close):(m.values.close=g,isNaN(h[l])?m.values.open=p:(m.values.close+=h[l],m.values.open=h[l]),h[l]=m.values.close)))}}for(l=this.start;l<=this.end;l++)for(q=0;q<k.length;q++)(n=k[q],n.hidden)?n.newStack&&(h[l]=NaN,e[l]=NaN):(m=n.type,n.chart==this.chart&&n.valueAxis==this&&a==m&&n.stackable&&(m=this.data[l].axes[this.id].graphs[n.id],
g=m.values.value,isNaN(g)||(c=g/f[l]*100,m.values.percents=c,m.values.total=f[l],n.newStack&&(h[l]=NaN,e[l]=NaN),"100%"==b&&(isNaN(e[l])&&(e[l]=0),isNaN(h[l])&&(h[l]=0),0>c?(m.values.close=d.fitToBounds(c+e[l],-100,100),m.values.open=e[l],e[l]=m.values.close):(m.values.close=d.fitToBounds(c+h[l],-100,100),m.values.open=h[l],h[l]=m.values.close)))))},recalculate:function(){var a=this.chart,b=a.graphs,c;for(c=0;c<b.length;c++){var e=b[c];if(e.valueAxis==this){var h="value";if("candlestick"==e.type||
"ohlc"==e.type)h="open";var f,g,k=this.end+2,k=d.fitToBounds(this.end+1,0,this.data.length-1),l=this.start;0<l&&l--;var m;g=this.start;e.compareFromStart&&(g=0);if(!isNaN(a.startTime)&&(m=a.categoryAxis)){var n=m.minDuration(),n=new Date(a.startTime+n/2),q=d.resetDateToMin(new Date(a.startTime),m.minPeriod).getTime();d.resetDateToMin(new Date(n),m.minPeriod).getTime()>q&&g++}if(m=a.recalculateFromDate)m=d.getDate(m,a.dataDateFormat,"fff"),g=a.getClosestIndex(a.chartData,"time",m.getTime(),!0,0,a.chartData.length),
k=a.chartData.length-1;for(m=g;m<=k&&(g=this.data[m].axes[this.id].graphs[e.id],f=g.values[h],isNaN(f));m++);this.recBaseValue=f;for(h=l;h<=k;h++){g=this.data[h].axes[this.id].graphs[e.id];g.percents={};var l=g.values,p;for(p in l)g.percents[p]="percents"!=p?l[p]/f*100-100:l[p]}}}},getMinMax:function(){var a=!1,b=this.chart,c=b.graphs,e;for(e=0;e<c.length;e++){var h=c[e].type;("line"==h||"step"==h||"smoothedLine"==h)&&this.expandMinMax&&(a=!0)}a&&(0<this.start&&this.start--,this.end<this.data.length-
1&&this.end++);"serial"==b.type&&(!0!==b.categoryAxis.parseDates||a||this.end<this.data.length-1&&this.end++);a=this.minMaxMultiplier;this.min=this.getMin(this.start,this.end);this.max=this.getMax();this.minRR=this.min;this.maxRR=this.max;a=(this.max-this.min)*(a-1);this.min-=a;this.max+=a;a=this.guides.length;if(this.includeGuidesInMinMax&&0<a)for(b=0;b<a;b++)c=this.guides[b],c.toValue<this.min&&(this.min=c.toValue),c.value<this.min&&(this.min=c.value),c.toValue>this.max&&(this.max=c.toValue),c.value>
this.max&&(this.max=c.value);isNaN(this.minimum)||(this.min=this.minimum);isNaN(this.maximum)||(this.max=this.maximum);this.minimumDate&&(this.min=this.minimumDate.getTime());this.maximumDate&&(this.max=this.maximumDate.getTime());this.min>this.max&&(a=this.max,this.max=this.min,this.min=a);isNaN(this.minTemp)||(this.min=this.minTemp);isNaN(this.maxTemp)||(this.max=this.maxTemp);this.minReal=this.min;this.maxReal=this.max;0===this.min&&0===this.max&&(this.max=9);this.min>this.max&&(this.min=this.max-
1);a=this.min;b=this.max;c=this.max-this.min;e=0===c?Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10:Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;isNaN(this.maximum)&&isNaN(this.maxTemp)&&(this.max=Math.ceil(this.max/e)*e+e);isNaN(this.minimum)&&isNaN(this.minTemp)&&(this.min=Math.floor(this.min/e)*e-e);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);"100%"==this.stackType&&(this.min=0>this.min?-100:0,this.max=0>this.max?0:100);c=this.max-this.min;
e=Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;this.step=Math.ceil(c/this.gridCountR/e)*e;c=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));c=d.fixStepE(c);e=Math.ceil(this.step/c);5<e&&(e=10);5>=e&&2<e&&(e=5);this.step=Math.ceil(this.step/(c*e))*c*e;1>c?(this.maxDecCount=Math.abs(Math.log(Math.abs(c))*Math.LOG10E),this.maxDecCount=Math.round(this.maxDecCount),this.step=d.roundTo(this.step,this.maxDecCount+1)):this.maxDecCount=0;this.min=this.step*Math.floor(this.min/
this.step);this.max=this.step*Math.ceil(this.max/this.step);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);1<this.minReal&&1<this.max-this.minReal&&(this.minReal=Math.floor(this.minReal));c=Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E));0===this.min&&(this.minReal=c);0===this.min&&1<this.minReal&&(this.minReal=1);0<this.min&&0<this.minReal-this.step&&(this.minReal=this.min+this.step<this.minReal?this.min+this.step:this.min);this.logarithmic&&(2<Math.log(b)*Math.LOG10E-
Math.log(a)*Math.LOG10E?(this.minReal=this.min=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E)),this.max=Math.pow(10,Math.ceil(Math.log(Math.abs(b))*Math.LOG10E))):(b=Math.pow(10,Math.floor(Math.log(Math.abs(this.min))*Math.LOG10E))/10,a=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E))/10,b<a&&(this.minReal=this.min=10*a)))},getMin:function(a,b){var c,e;for(e=a;e<=b;e++){var h=this.data[e].axes[this.id].graphs,d;for(d in h)if(h.hasOwnProperty(d)){var g=this.chart.getGraphById(d);
if(g.includeInMinMax&&(!g.hidden||this.includeHidden)){isNaN(c)&&(c=Infinity);this.foundGraphs=!0;g=h[d].values;this.recalculateToPercents&&(g=h[d].percents);var k;if(this.minMaxField)k=g[this.minMaxField],k<c&&(c=k);else for(var l in g)g.hasOwnProperty(l)&&"percents"!=l&&"total"!=l&&(k=g[l],k<c&&(c=k))}}}return c},getMax:function(){var a,b;for(b=this.start;b<=this.end;b++){var c=this.data[b].axes[this.id].graphs,e;for(e in c)if(c.hasOwnProperty(e)){var d=this.chart.getGraphById(e);if(d.includeInMinMax&&
(!d.hidden||this.includeHidden)){isNaN(a)&&(a=-Infinity);this.foundGraphs=!0;d=c[e].values;this.recalculateToPercents&&(d=c[e].percents);var f;if(this.minMaxField)f=d[this.minMaxField],f>a&&(a=f);else for(var g in d)d.hasOwnProperty(g)&&"percents"!=g&&"total"!=g&&(f=d[g],f>a&&(a=f))}}}return a},dispatchZoomEvent:function(a,b){var c={type:"axisZoomed",startValue:a,endValue:b,target:this,chart:this.chart};this.fire(c.type,c)},zoomOut:function(){var a=this.chart;"xy"!=a.type&&(this.maxZoom=this.minZoom=
void 0,a.updateAfterValueZoom())},zoomToValues:function(a,b){var c=this.chart;"xy"==c.type?(b<a&&(c=b,b=a,a=c),a<this.min&&(a=this.min),b>this.max&&(b=this.max),c={type:"axisSelfZoomed"},c.chart=this.chart,c.valueAxis=this,c.multiplier=this.axisWidth/Math.abs(this.getCoordinate(b)-this.getCoordinate(a)),c.startValue=a,c.endValue=b,c.position="V"==this.orientation?this.reversed?this.getCoordinate(a):this.getCoordinate(b):this.reversed?this.getCoordinate(b):this.getCoordinate(a),this.fire(c.type,c)):
(this.minZoom=a,this.maxZoom=b,c.updateAfterValueZoom())},coordinateToValue:function(a){if(isNaN(a))return NaN;var b=this.axisWidth,c=this.stepWidth,e=this.reversed,d=this.rotate,f=this.min,g=this.minReal;return!0===this.logarithmic?Math.pow(10,(d?!0===e?(b-a)/c:a/c:!0===e?a/c:(b-a)/c)+Math.log(g)*Math.LOG10E):!0===e?d?f-(a-b)/c:a/c+f:d?a/c+f:f-(a-b)/c},getCoordinate:function(a){if(isNaN(a))return NaN;var b=this.rotate,c=this.reversed,e=this.axisWidth,d=this.stepWidth,f=this.min,g=this.minReal;!0===
this.logarithmic?(0===a&&(a=this.treatZeroAs),a=Math.log(a)*Math.LOG10E-Math.log(g)*Math.LOG10E,b=b?!0===c?e-d*a:d*a:!0===c?d*a:e-d*a):b=!0===c?b?e-d*(a-f):d*(a-f):b?d*(a-f):e-d*(a-f);b=this.rotate?b+(this.x-this.viX):b+(this.y-this.viY);1E7<Math.abs(b)&&(b=1E7*(b/Math.abs(b)));return Math.round(b)},synchronizeWithAxis:function(a){this.synchronizeWith=a;this.listenTo(this.synchronizeWith,"axisChanged",this.handleSynchronization)},handleSynchronization:function(){if(this.synchronizeWith){d.isString(this.synchronizeWith)&&
(this.synchronizeWith=this.chart.getValueAxisById(this.synchronizeWith));var a=this.synchronizeWith,b=a.min,c=a.max,a=a.step,e=this.synchronizationMultiplier;e&&(this.min=b*e,this.max=c*e,this.step=a*e,b=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E)),b=Math.abs(Math.log(Math.abs(b))*Math.LOG10E),this.maxDecCount=b=Math.round(b),this.draw())}}})})();(function(){var d=window.AmCharts;d.RecAxis=d.Class({construct:function(a){var b=a.chart,c=a.axisThickness,e=a.axisColor,h=a.axisAlpha,f=a.offset,g=a.dx,k=a.dy,l=a.viX,m=a.viY,n=a.viH,q=a.viW,p=b.container;"H"==a.orientation?(e=d.line(p,[0,q],[0,0],e,h,c),this.axisWidth=a.width,"bottom"==a.position?(k=c/2+f+n+m-1,c=l):(k=-c/2-f+m+k,c=g+l)):(this.axisWidth=a.height,"right"==a.position?(e=d.line(p,[0,0,-g],[0,n,n-k],e,h,c),k=m+k,c=c/2+f+g+q+l-1):(e=d.line(p,[0,0],[0,n],e,h,c),k=m,c=-c/2-f+l));e.translate(c,
k);c=b.container.set();c.push(e);b.axesSet.push(c);d.setCN(b,e,a.bcn+"line");this.axisSet=c;this.set=e}})})();(function(){var d=window.AmCharts;d.RecItem=d.Class({construct:function(a,b,c,e,h,f,g,k,l,m,n,q){b=Math.round(b);var p=a.chart;this.value=c;void 0==c&&(c="");l||(l=0);void 0==e&&(e=!0);var r=p.fontFamily,t=a.fontSize;void 0==t&&(t=p.fontSize);var u=a.color;void 0==u&&(u=p.color);void 0!==n&&(u=n);var z=a.chart.container,v=z.set();this.set=v;var w=a.axisThickness,x=a.axisColor,A=a.axisAlpha,B=a.tickLength,D=a.gridAlpha,C=a.gridThickness,I=a.gridColor,H=a.dashLength,O=a.fillColor,J=a.fillAlpha,da=a.labelsEnabled;
n=a.labelRotation;var pa=a.counter,U=a.inside,na=a.labelOffset,qa=a.dx,ja=a.dy,Pa=a.orientation,aa=a.position,Z=a.previousCoord,V=a.viH,sa=a.viW,ba=a.offset,ca,ta;g?(void 0!==g.id&&(q=p.classNamePrefix+"-guide-"+g.id),da=!0,isNaN(g.tickLength)||(B=g.tickLength),void 0!=g.lineColor&&(I=g.lineColor),void 0!=g.color&&(u=g.color),isNaN(g.lineAlpha)||(D=g.lineAlpha),isNaN(g.dashLength)||(H=g.dashLength),isNaN(g.lineThickness)||(C=g.lineThickness),!0===g.inside&&(U=!0),isNaN(g.labelRotation)||(n=g.labelRotation),
isNaN(g.fontSize)||(t=g.fontSize),g.position&&(aa=g.position),void 0!==g.boldLabel&&(k=g.boldLabel),isNaN(g.labelOffset)||(na=g.labelOffset)):""===c&&(B=0);m&&!isNaN(a.minorTickLength)&&(B=a.minorTickLength);var ia="start";h&&(ia="middle");var Q=n*Math.PI/180,W,wa,G=0,y=0,ka=0,ea=W=0,Qa=0;"V"==Pa&&(n=0);var Y;da&&""!==c&&(Y=a.autoWrap&&0===n?d.wrappedText(z,c,u,r,t,ia,k,h,0):d.text(z,c,u,r,t,ia,k),ia=Y.getBBox(),ea=ia.width,Qa=ia.height);if("H"==Pa){if(0<=b&&b<=sa+1&&(0<B&&0<A&&b+l<=sa+1&&(ca=d.line(z,
[b+l,b+l],[0,B],x,A,C),v.push(ca)),0<D&&(ta=d.line(z,[b,b+qa,b+qa],[V,V+ja,ja],I,D,C,H),v.push(ta))),y=0,G=b,g&&90==n&&U&&(G-=t),!1===e?(ia="start",y="bottom"==aa?U?y+B:y-B:U?y-B:y+B,G+=3,h&&(G+=h/2-3,ia="middle"),0<n&&(ia="middle")):ia="middle",1==pa&&0<J&&!g&&!m&&Z<sa&&(e=d.fitToBounds(b,0,sa),Z=d.fitToBounds(Z,0,sa),W=e-Z,0<W&&(wa=d.rect(z,W,a.height,O,J),wa.translate(e-W+qa,ja),v.push(wa))),"bottom"==aa?(y+=V+t/2+ba,U?(0<n?(y=V-ea/2*Math.sin(Q)-B-3,G+=ea/2*Math.cos(Q)-4+2):0>n?(y=V+ea*Math.sin(Q)-
B-3+2,G+=-ea*Math.cos(Q)-Qa*Math.sin(Q)-4):y-=B+t+3+3,y-=na):(0<n?(y=V+ea/2*Math.sin(Q)+B+3,G-=ea/2*Math.cos(Q)):0>n?(y=V+B+3-ea/2*Math.sin(Q)+2,G+=ea/2*Math.cos(Q)):y+=B+w+3+3,y+=na)):(y+=ja+t/2-ba,G+=qa,U?(0<n?(y=ea/2*Math.sin(Q)+B+3,G-=ea/2*Math.cos(Q)):y+=B+3,y+=na):(0<n?(y=-(ea/2)*Math.sin(Q)-B-6,G+=ea/2*Math.cos(Q)):y-=B+t+3+w+3,y-=na)),"bottom"==aa?W=(U?V-B-1:V+w-1)+ba:(ka=qa,W=(U?ja:ja-B-w+1)-ba),f&&(G+=f),f=G,0<n&&(f+=ea/2*Math.cos(Q)),Y&&(t=0,U&&(t=ea/2*Math.cos(Q)),f+t>sa+2||0>f))Y.remove(),
Y=null}else{0<=b&&b<=V+1&&(0<B&&0<A&&b+l<=V+1&&(ca=d.line(z,[0,B],[b+l,b+l],x,A,C),v.push(ca)),0<D&&(ta=d.line(z,[0,qa,sa+qa],[b,b+ja,b+ja],I,D,C,H),v.push(ta)));ia="end";if(!0===U&&"left"==aa||!1===U&&"right"==aa)ia="start";y=b-t/2;1==pa&&0<J&&!g&&!m&&(e=d.fitToBounds(b,0,V),Z=d.fitToBounds(Z,0,V),Q=e-Z,wa=d.polygon(z,[0,a.width,a.width,0],[0,0,Q,Q],O,J),wa.translate(qa,e-Q+ja),v.push(wa));y+=t/2;"right"==aa?(G+=qa+sa+ba,y+=ja,U?(f||(y-=t/2+3),G=G-(B+4)-na):(G+=B+4+w,y-=2,G+=na)):U?(G+=B+4-ba,f||
(y-=t/2+3),g&&(G+=qa,y+=ja),G+=na):(G+=-B-w-4-2-ba,y-=2,G-=na);ca&&("right"==aa?(ka+=qa+ba+sa,W+=ja,ka=U?ka-w:ka+w):(ka-=ba,U||(ka-=B+w)));f&&(y+=f);U=-3;"right"==aa&&(U+=ja);Y&&(y>V+1||y<U)&&(Y.remove(),Y=null)}ca&&(ca.translate(ka,W),d.setCN(p,ca,a.bcn+"tick"),d.setCN(p,ca,q,!0),g&&d.setCN(p,ca,"guide"));!1===a.visible&&(ca&&ca.remove(),Y&&(Y.remove(),Y=null));Y&&(Y.attr({"text-anchor":ia}),Y.translate(G,y),0!==n&&Y.rotate(-n,a.chart.backgroundColor),a.allLabels.push(Y),this.label=Y,d.setCN(p,Y,
a.bcn+"label"),d.setCN(p,Y,q,!0),g&&d.setCN(p,Y,"guide"));ta&&(d.setCN(p,ta,a.bcn+"grid"),d.setCN(p,ta,q,!0),g&&d.setCN(p,ta,"guide"));wa&&(d.setCN(p,wa,a.bcn+"fill"),d.setCN(p,wa,q,!0));m?ta&&d.setCN(p,ta,a.bcn+"grid-minor"):(a.counter=0===pa?1:0,a.previousCoord=b);0===this.set.node.childNodes.length&&this.set.remove()},graphics:function(){return this.set},getLabel:function(){return this.label}})})();(function(){var d=window.AmCharts;d.RecFill=d.Class({construct:function(a,b,c,e){var h=a.dx,f=a.dy,g=a.orientation,k=0;if(c<b){var l=b;b=c;c=l}var m=e.fillAlpha;isNaN(m)&&(m=0);var l=a.chart.container,n=e.fillColor;"V"==g?(b=d.fitToBounds(b,0,a.viH),c=d.fitToBounds(c,0,a.viH)):(b=d.fitToBounds(b,0,a.viW),c=d.fitToBounds(c,0,a.viW));c-=b;isNaN(c)&&(c=4,k=2,m=0);0>c&&"object"==typeof n&&(n=n.join(",").split(",").reverse());"V"==g?(g=d.rect(l,a.viW,c,n,m),g.translate(h,b-k+f)):(g=d.rect(l,c,a.viH,n,
m),g.translate(b-k+h,f));d.setCN(a.chart,g,"guide-fill");e.id&&d.setCN(a.chart,g,"guide-fill-"+e.id);this.set=l.set([g])},graphics:function(){return this.set},getLabel:function(){}})})();(function(){var d=window.AmCharts;d.AmChart=d.Class({construct:function(a){this.theme=a;this.classNamePrefix="amcharts";this.addClassNames=!1;this.version="3.14.5";d.addChart(this);this.createEvents("dataUpdated","init","rendered","drawn","failed","resized");this.height=this.width="100%";this.dataChanged=!0;this.chartCreated=!1;this.previousWidth=this.previousHeight=0;this.backgroundColor="#FFFFFF";this.borderAlpha=this.backgroundAlpha=0;this.color=this.borderColor="#000000";this.fontFamily="Verdana";
this.fontSize=11;this.usePrefixes=!1;this.addCodeCredits=this.autoResize=!0;this.precision=-1;this.percentPrecision=2;this.decimalSeparator=".";this.thousandsSeparator=",";this.labels=[];this.allLabels=[];this.titles=[];this.marginRight=this.marginLeft=this.autoMarginOffset=0;this.timeOuts=[];this.creditsPosition="top-left";var b=document.createElement("div"),c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.chartDiv=b;b=document.createElement("div");c=b.style;c.overflow=
"hidden";c.position="relative";c.textAlign="left";this.legendDiv=b;this.titleHeight=0;this.hideBalloonTime=150;this.handDrawScatter=2;this.handDrawThickness=1;this.prefixesOfBigNumbers=[{number:1E3,prefix:"k"},{number:1E6,prefix:"M"},{number:1E9,prefix:"G"},{number:1E12,prefix:"T"},{number:1E15,prefix:"P"},{number:1E18,prefix:"E"},{number:1E21,prefix:"Z"},{number:1E24,prefix:"Y"}];this.prefixesOfSmallNumbers=[{number:1E-24,prefix:"y"},{number:1E-21,prefix:"z"},{number:1E-18,prefix:"a"},{number:1E-15,
prefix:"f"},{number:1E-12,prefix:"p"},{number:1E-9,prefix:"n"},{number:1E-6,prefix:"\u03bc"},{number:.001,prefix:"m"}];this.panEventsEnabled=!0;this.product="amcharts";this.animations=[];this.balloon=new d.AmBalloon(this.theme);this.balloon.chart=this;d.applyTheme(this,a,"AmChart")},drawChart:function(){this.drawBackground();this.redrawLabels();this.drawTitles();this.brr()},drawBackground:function(){d.remove(this.background);var a=this.container,b=this.backgroundColor,c=this.backgroundAlpha,e=this.set;
d.isModern||0!==c||(c=.001);var h=this.updateWidth();this.realWidth=h;var f=this.updateHeight();this.realHeight=f;b=d.polygon(a,[0,h-1,h-1,0],[0,0,f-1,f-1],b,c,1,this.borderColor,this.borderAlpha);d.setCN(this,b,"bg");this.background=b;e.push(b);if(b=this.backgroundImage)a=a.image(b,0,0,h,f),d.setCN(this,b,"bg-image"),this.bgImg=a,e.push(a)},drawTitles:function(){var a=this.titles;if(d.ifArray(a)){var b=20,c;for(c=0;c<a.length;c++){var e=a[c],e=d.processObject(e,d.Title,this.theme);if(!1!==e.enabled){var h=
e.color;void 0===h&&(h=this.color);var f=e.size;isNaN(f)&&(f=this.fontSize+2);isNaN(e.alpha);var g=this.marginLeft,h=d.text(this.container,e.text,h,this.fontFamily,f);h.translate(g+(this.realWidth-this.marginRight-g)/2,b);h.node.style.pointerEvents="none";d.setCN(this,h,"title");e.id&&d.setCN(this,h,"title-"+e.id);g=!0;void 0!==e.bold&&(g=e.bold);g&&h.attr({"font-weight":"bold"});h.attr({opacity:e.alpha});b+=f+6;this.freeLabelsSet.push(h)}}}},write:function(a){if(a="object"!=typeof a?document.getElementById(a):
a){for(;a.firstChild;)a.removeChild(a.firstChild);this.div=a;a.style.overflow="hidden";a.style.textAlign="left";var b=this.chartDiv,c=this.legendDiv,e=this.legend,h=c.style,f=b.style;this.measure();this.previousHeight=this.divRealHeight;this.previousWidth=this.divRealWidth;var g,k=document.createElement("div");g=k.style;g.position="relative";this.containerDiv=k;k.className=this.classNamePrefix+"-main-div";b.className=this.classNamePrefix+"-chart-div";a.appendChild(k);var l=this.exportConfig;l&&d.AmExport&&
!this.AmExport&&(this.AmExport=new d.AmExport(this,l));this.amExport&&d.AmExport&&(this.AmExport=d.extend(this.amExport,new d.AmExport(this),!0));this.AmExport&&this.AmExport.init&&this.AmExport.init();if(e)if(e=this.addLegend(e,e.divId),e.enabled)switch(e.position){case "bottom":k.appendChild(b);k.appendChild(c);break;case "top":k.appendChild(c);k.appendChild(b);break;case "absolute":g.width=a.style.width;g.height=a.style.height;h.position="absolute";f.position="absolute";void 0!==e.left&&(h.left=
e.left+"px");void 0!==e.right&&(h.right=e.right+"px");void 0!==e.top&&(h.top=e.top+"px");void 0!==e.bottom&&(h.bottom=e.bottom+"px");e.marginLeft=0;e.marginRight=0;k.appendChild(b);k.appendChild(c);break;case "right":g.width=a.style.width;g.height=a.style.height;h.position="relative";f.position="absolute";k.appendChild(b);k.appendChild(c);break;case "left":g.width=a.style.width;g.height=a.style.height;h.position="absolute";f.position="relative";k.appendChild(b);k.appendChild(c);break;case "outside":k.appendChild(b)}else k.appendChild(b);
else k.appendChild(b);this.listenersAdded||(this.addListeners(),this.listenersAdded=!0);this.initChart()}},createLabelsSet:function(){d.remove(this.labelsSet);this.labelsSet=this.container.set();this.freeLabelsSet.push(this.labelsSet)},initChart:function(){window.AmCharts_path&&(this.path=window.AmCharts_path);void 0===this.path&&(this.path=d.getPath());void 0===this.path&&(this.path="amcharts/");this.path=d.normalizeUrl(this.path);void 0===this.pathToImages&&(this.pathToImages=this.path+"images/");
this.initHC||(d.callInitHandler(this),this.initHC=!0);this.renderFix();d.applyLang(this.language,this);var a=this.numberFormatter;a&&(isNaN(a.precision)||(this.precision=a.precision),void 0!==a.thousandsSeparator&&(this.thousandsSeparator=a.thousandsSeparator),void 0!==a.decimalSeparator&&(this.decimalSeparator=a.decimalSeparator));(a=this.percentFormatter)&&!isNaN(a.precision)&&(this.percentPrecision=a.precision);this.nf={precision:this.precision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};
this.pf={precision:this.percentPrecision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.divIsFixed=d.findIfFixed(this.chartDiv);this.destroy();a=0;document.attachEvent&&!window.opera&&(a=1);this.dmouseX=this.dmouseY=0;var b=document.getElementsByTagName("html")[0];b&&window.getComputedStyle&&(b=window.getComputedStyle(b,null))&&(this.dmouseY=d.removePx(b.getPropertyValue("margin-top")),this.dmouseX=d.removePx(b.getPropertyValue("margin-left")));this.mouseMode=
a;(a=this.container)?(a.container.innerHTML="",a.width=this.realWidth,a.height=this.realHeight,a.addDefs(this),this.chartDiv.appendChild(a.container)):a=new d.AmDraw(this.chartDiv,this.realWidth,this.realHeight,this);a.chart=this;d.VML||d.SVG?(a.handDrawn=this.handDrawn,a.handDrawScatter=this.handDrawScatter,a.handDrawThickness=this.handDrawThickness,this.container=a,this.set&&this.set.remove(),this.set=a.set(),this.gridSet&&this.gridSet.remove(),this.gridSet=a.set(),this.cursorLineSet&&this.cursorLineSet.remove(),
this.cursorLineSet=a.set(),this.graphsBehindSet&&this.graphsBehindSet.remove(),this.graphsBehindSet=a.set(),this.bulletBehindSet&&this.bulletBehindSet.remove(),this.bulletBehindSet=a.set(),this.columnSet&&this.columnSet.remove(),this.columnSet=a.set(),this.graphsSet&&this.graphsSet.remove(),this.graphsSet=a.set(),this.trendLinesSet&&this.trendLinesSet.remove(),this.trendLinesSet=a.set(),this.axesSet&&this.axesSet.remove(),this.axesSet=a.set(),this.cursorSet&&this.cursorSet.remove(),this.cursorSet=
a.set(),this.scrollbarsSet&&this.scrollbarsSet.remove(),this.scrollbarsSet=a.set(),this.bulletSet&&this.bulletSet.remove(),this.bulletSet=a.set(),this.freeLabelsSet&&this.freeLabelsSet.remove(),this.axesLabelsSet&&this.axesLabelsSet.remove(),this.axesLabelsSet=a.set(),this.freeLabelsSet=a.set(),this.balloonsSet&&this.balloonsSet.remove(),this.balloonsSet=a.set(),this.zoomButtonSet&&this.zoomButtonSet.remove(),this.zbSet&&(this.zbSet.remove(),this.zbSet=null),this.zoomButtonSet=a.set(),this.linkSet&&
this.linkSet.remove(),this.linkSet=a.set()):this.fire("failed",{type:"failed",chart:this})},premeasure:function(){var a=this.div;if(a){var b=a.offsetWidth,c=a.offsetHeight;a.clientHeight&&(b=a.clientWidth,c=a.clientHeight);if(b!=this.mw||c!=this.mh)this.mw=b,this.mh=c,this.measure()}},measure:function(){var a=this.div;if(a){var b=this.chartDiv,c=a.offsetWidth,e=a.offsetHeight,h=this.container;a.clientHeight&&(c=a.clientWidth,e=a.clientHeight);var f=d.removePx(d.getStyle(a,"padding-left")),g=d.removePx(d.getStyle(a,
"padding-right")),k=d.removePx(d.getStyle(a,"padding-top")),l=d.removePx(d.getStyle(a,"padding-bottom"));isNaN(f)||(c-=f);isNaN(g)||(c-=g);isNaN(k)||(e-=k);isNaN(l)||(e-=l);f=a.style;a=f.width;f=f.height;-1!=a.indexOf("px")&&(c=d.removePx(a));-1!=f.indexOf("px")&&(e=d.removePx(f));e=Math.round(e);c=Math.round(c);a=Math.round(d.toCoordinate(this.width,c));f=Math.round(d.toCoordinate(this.height,e));(c!=this.previousWidth||e!=this.previousHeight)&&0<a&&0<f&&(b.style.width=a+"px",b.style.height=f+"px",
h&&h.setSize(a,f),this.balloon=d.processObject(this.balloon,d.AmBalloon,this.theme),this.balloon.setBounds(2,2,a-2,f));this.balloon.chart=this;this.realWidth=a;this.realHeight=f;this.divRealWidth=c;this.divRealHeight=e}},destroy:function(){this.chartDiv.innerHTML="";this.clearTimeOuts();this.legend&&this.legend.destroy()},clearTimeOuts:function(){var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},clear:function(a){d.callMethod("clear",[this.chartScrollbar,
this.scrollbarV,this.scrollbarH,this.chartCursor]);this.chartCursor=this.scrollbarH=this.scrollbarV=this.chartScrollbar=null;this.clearTimeOuts();this.container&&(this.container.remove(this.chartDiv),this.container.remove(this.legendDiv));a||d.removeChart(this);if(a=this.div)for(;a.firstChild;)a.removeChild(a.firstChild);this.legend&&this.legend.destroy()},setMouseCursor:function(a){"auto"==a&&d.isNN&&(a="default");this.chartDiv.style.cursor=a;this.legendDiv.style.cursor=a},redrawLabels:function(){this.labels=
[];var a=this.allLabels;this.createLabelsSet();var b;for(b=0;b<a.length;b++)this.drawLabel(a[b])},drawLabel:function(a){if(this.container&&!1!==a.enabled){a=d.processObject(a,d.Label,this.theme);var b=a.y,c=a.text,e=a.align,h=a.size,f=a.color,g=a.rotation,k=a.alpha,l=a.bold,m=d.toCoordinate(a.x,this.realWidth),b=d.toCoordinate(b,this.realHeight);m||(m=0);b||(b=0);void 0===f&&(f=this.color);isNaN(h)&&(h=this.fontSize);e||(e="start");"left"==e&&(e="start");"right"==e&&(e="end");"center"==e&&(e="middle",
g?b=this.realHeight-b+b/2:m=this.realWidth/2-m);void 0===k&&(k=1);void 0===g&&(g=0);b+=h/2;c=d.text(this.container,c,f,this.fontFamily,h,e,l,k);c.translate(m,b);d.setCN(this,c,"label");a.id&&d.setCN(this,c,"label-"+a.id);0!==g&&c.rotate(g);a.url?(c.setAttr("cursor","pointer"),c.click(function(){d.getURL(a.url)})):c.node.style.pointerEvents="none";this.labelsSet.push(c);this.labels.push(c)}},addLabel:function(a,b,c,e,d,f,g,k,l,m){a={x:a,y:b,text:c,align:e,size:d,color:f,alpha:k,rotation:g,bold:l,url:m,
enabled:!0};this.container&&this.drawLabel(a);this.allLabels.push(a)},clearLabels:function(){var a=this.labels,b;for(b=a.length-1;0<=b;b--)a[b].remove();this.labels=[];this.allLabels=[]},updateHeight:function(){var a=this.divRealHeight,b=this.legend;if(b){var c=this.legendDiv.offsetHeight,b=b.position;if("top"==b||"bottom"==b){a-=c;if(0>a||isNaN(a))a=0;this.chartDiv.style.height=a+"px"}}return a},updateWidth:function(){var a=this.divRealWidth,b=this.divRealHeight,c=this.legend;if(c){var e=this.legendDiv,
d=e.offsetWidth;isNaN(c.width)||(d=c.width);c.ieW&&(d=c.ieW);var f=e.offsetHeight,e=e.style,g=this.chartDiv.style,c=c.position;if("right"==c||"left"==c){a-=d;if(0>a||isNaN(a))a=0;g.width=a+"px";"left"==c?(g.left=d+"px",e.left="0px"):(g.left="0px",e.left=a+"px");b>f&&(e.top=(b-f)/2+"px")}}return a},getTitleHeight:function(){var a=0,b=this.titles,c=!0;if(0<b.length){var a=20,e;for(e=0;e<b.length;e++){var d=b[e];!1!==d.enabled&&(c=!1,d=d.size,isNaN(d)&&(d=this.fontSize+2),a+=d+6)}c&&(a=0)}return a},
addTitle:function(a,b,c,e,d){isNaN(b)&&(b=this.fontSize+2);a={text:a,size:b,color:c,alpha:e,bold:d,enabled:!0};this.titles.push(a);return a},handleWheel:function(a){var b=0;a||(a=window.event);a.wheelDelta?b=a.wheelDelta/120:a.detail&&(b=-a.detail/3);b&&this.handleWheelReal(b,a.shiftKey);a.preventDefault&&a.preventDefault()},handleWheelReal:function(){},addListeners:function(){var a=this,b=a.chartDiv;document.addEventListener?(a.panEventsEnabled&&(b.style.msTouchAction="none"),"ontouchstart"in document.documentElement&&
(b.addEventListener("touchstart",function(b){a.handleTouchMove.call(a,b);a.handleTouchStart.call(a,b)},!0),b.addEventListener("touchmove",function(b){a.handleTouchMove.call(a,b)},!0),b.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)},!0)),b.addEventListener("mousedown",function(b){a.mouseIsOver=!0;a.handleMouseMove.call(a,b);a.handleMouseDown.call(a,b)},!0),b.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,b)},!0),b.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,
b)},!0)):(b.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)}),b.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)}),b.attachEvent("onmouseout",function(b){a.handleMouseOut.call(a,b)}))},dispDUpd:function(){if(!this.skipEvents){var a;this.dispatchDataUpdated&&(this.dispatchDataUpdated=!1,a="dataUpdated",this.fire(a,{type:a,chart:this}));this.chartCreated||(a="init",this.fire(a,{type:a,chart:this}));this.chartRendered||(a="rendered",this.fire(a,{type:a,chart:this}),
this.chartRendered=!0);a="drawn";this.fire(a,{type:a,chart:this})}this.skipEvents=!1},validateSize:function(){var a=this;a.premeasure();if(a.divRealWidth!=a.previousWidth||a.divRealHeight!=a.previousHeight){var b=a.legend;if(0<a.realWidth&&0<a.realHeight){a.sizeChanged=!0;if(b){a.legendInitTO&&clearTimeout(a.legendInitTO);var c=setTimeout(function(){b.invalidateSize()},10);a.timeOuts.push(c);a.legendInitTO=c}"xy"!=a.type?a.marginsUpdated=!1:(a.marginsUpdated=!0,a.selfZoom=!0);clearTimeout(a.initTO);
c=setTimeout(function(){a.initChart()},10);a.timeOuts.push(c);a.initTO=c}a.fire("resized",{type:"resized",chart:a});a.renderFix();b&&b.renderFix&&b.renderFix();a.previousHeight=a.divRealHeight;a.previousWidth=a.divRealWidth}},invalidateSize:function(){this.previousHeight=this.previousWidth=NaN;this.invalidateSizeReal()},invalidateSizeReal:function(){var a=this;a.marginsUpdated=!1;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateSize()},5);a.timeOuts.push(b);a.validateTO=b},validateData:function(a){this.chartCreated&&
(this.dataChanged=!0,this.marginsUpdated=!1,this.initChart(a))},validateNow:function(a,b){this.initTO&&clearTimeout(this.initTO);a&&(this.dataChanged=!0);this.skipEvents=b;this.chartRendered=!1;this.write(this.div)},showItem:function(a){a.hidden=!1;this.initChart()},hideItem:function(a){a.hidden=!0;this.initChart()},hideBalloon:function(){var a=this;clearTimeout(a.hoverInt);clearTimeout(a.balloonTO);a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},a.hideBalloonTime)},cleanChart:function(){},
hideBalloonReal:function(){var a=this.balloon;a&&a.hide()},showBalloon:function(a,b,c,e,d){var f=this;clearTimeout(f.balloonTO);clearTimeout(f.hoverInt);f.balloonTO=setTimeout(function(){f.showBalloonReal.call(f,a,b,c,e,d)},1)},showBalloonReal:function(a,b,c,e,d){this.handleMouseMove();var f=this.balloon;f.enabled&&(f.followCursor(!1),f.changeColor(b),!c||f.fixedPosition?(f.setPosition(e,d),f.followCursor(!1)):f.followCursor(!0),a&&f.showBalloon(a))},handleTouchMove:function(a){this.hideBalloon();
var b=this.chartDiv;a.touches&&(a=a.touches.item(0),this.mouseX=a.pageX-d.findPosX(b),this.mouseY=a.pageY-d.findPosY(b))},handleMouseOver:function(){this.outTO&&clearTimeout(this.outTO);d.resetMouseOver();this.mouseIsOver=!0},handleMouseOut:function(){var a=this;a.outTO&&clearTimeout(a.outTO);a.outTO=setTimeout(function(){a.handleMouseOutReal()},10)},handleMouseOutReal:function(){d.resetMouseOver();this.mouseIsOver=!1},handleMouseMove:function(a){if(this.mouseIsOver){var b=this.chartDiv;a||(a=window.event);
var c,e;if(a){this.posX=d.findPosX(b);this.posY=d.findPosY(b);switch(this.mouseMode){case 1:c=a.clientX-this.posX;e=a.clientY-this.posY;if(!this.divIsFixed){var b=document.body,h,f,g,k;b&&(h=b.scrollLeft,g=b.scrollTop);if(b=document.documentElement)f=b.scrollLeft,k=b.scrollTop;h=Math.max(h,f);g=Math.max(g,k);c+=h;e+=g}break;case 0:this.divIsFixed?(c=a.clientX-this.posX,e=a.clientY-this.posY):(c=a.pageX-this.posX,e=a.pageY-this.posY)}a.touches&&(a=a.touches.item(0),c=a.pageX-this.posX,e=a.pageY-this.posY);
this.mouseX=c-this.dmouseX;this.mouseY=e-this.dmouseY}}},handleTouchStart:function(a){this.handleMouseDown(a)},handleTouchEnd:function(a){d.resetMouseOver();this.handleReleaseOutside(a)},handleReleaseOutside:function(){},handleMouseDown:function(a){d.resetMouseOver();this.mouseIsOver=!0;a&&a.preventDefault&&(this.panEventsEnabled?a.preventDefault():a.touches||a.preventDefault())},addLegend:function(a,b){a=d.processObject(a,d.AmLegend,this.theme);a.divId=b;a.ieW=0;var c;c="object"!=typeof b&&b?document.getElementById(b):
b;this.legend=a;a.chart=this;c?(a.div=c,a.position="outside",a.autoMargins=!1):a.div=this.legendDiv;c=this.handleLegendEvent;this.listenTo(a,"showItem",c);this.listenTo(a,"hideItem",c);this.listenTo(a,"clickMarker",c);this.listenTo(a,"rollOverItem",c);this.listenTo(a,"rollOutItem",c);this.listenTo(a,"rollOverMarker",c);this.listenTo(a,"rollOutMarker",c);this.listenTo(a,"clickLabel",c);return a},removeLegend:function(){this.legend=void 0;this.legendDiv.innerHTML=""},handleResize:function(){(d.isPercents(this.width)||
d.isPercents(this.height))&&this.invalidateSizeReal();this.renderFix()},renderFix:function(){if(!d.VML){var a=this.container;a&&a.renderFix()}},getSVG:function(){if(d.hasSVG)return this.container},animate:function(a,b,c,e,h,f,g){a["an_"+b]&&d.removeFromArray(this.animations,a["an_"+b]);c={obj:a,frame:0,attribute:b,from:c,to:e,time:h,effect:f,suffix:g};a["an_"+b]=c;this.animations.push(c);return c},setLegendData:function(a){var b=this.legend;b&&b.setData(a)},stopAnim:function(a){d.removeFromArray(this.animations,
a)},updateAnimations:function(){var a;this.container&&this.container.update();if(this.animations)for(a=this.animations.length-1;0<=a;a--){var b=this.animations[a],c=1E3*b.time/d.updateRate,e=b.frame+1,h=b.obj,f=b.attribute;if(e<=c){b.frame++;var g=Number(b.from),k=Number(b.to)-g,c=d[b.effect](0,e,g,k,c);0===k?(this.animations.splice(a,1),h.node.style[f]=Number(b.to)+b.suffix):h.node.style[f]=c+b.suffix}else h.node.style[f]=Number(b.to)+b.suffix,this.animations.splice(a,1)}},update:function(){this.updateAnimations()},
inIframe:function(){try{return window.self!==window.top}catch(a){return!0}},brr:function(){var a=window.location.hostname.split("."),b;2<=a.length&&(b=a[a.length-2]+"."+a[a.length-1]);this.amLink&&(a=this.amLink.parentNode)&&a.removeChild(this.amLink);a=this.creditsPosition;if("amcharts.com"!=b||!0===this.inIframe()){var c=b=0,e=this.realWidth,d=this.realHeight,f=this.type;if("serial"==f||"xy"==f||"gantt"==f)b=this.marginLeftReal,c=this.marginTopReal,e=b+this.plotAreaWidth,d=c+this.plotAreaHeight;
var g="http://www.amcharts.com/javascript-charts/",k="JavaScript charts",l="JS chart by amCharts";"ammap"==this.product&&(g="http://www.ammap.com/javascript-maps/",k="Interactive JavaScript maps",l="JS map by amCharts");f=document.createElement("a");l=document.createTextNode(l);f.setAttribute("href",g);f.setAttribute("title",k);f.appendChild(l);this.chartDiv.appendChild(f);this.amLink=f;g=f.style;g.position="absolute";g.textDecoration="none";g.color=this.color;g.fontFamily=this.fontFamily;g.fontSize=
this.fontSize+"px";g.opacity=.7;g.display="block";var k=f.offsetWidth,f=f.offsetHeight,l=5+b,m=c+5;"bottom-left"==a&&(l=5+b,m=d-f-3);"bottom-right"==a&&(l=e-k-5,m=d-f-3);"top-right"==a&&(l=e-k-5,m=c+5);g.left=l+"px";g.top=m+"px"}}});d.Slice=d.Class({construct:function(){}});d.SerialDataItem=d.Class({construct:function(){}});d.GraphDataItem=d.Class({construct:function(){}});d.Guide=d.Class({construct:function(a){this.cname="Guide";d.applyTheme(this,a,this.cname)}});d.Title=d.Class({construct:function(a){this.cname=
"Title";d.applyTheme(this,a,this.cname)}});d.Label=d.Class({construct:function(a){this.cname="Label";d.applyTheme(this,a,this.cname)}})})();(function(){var d=window.AmCharts;d.AmGraph=d.Class({construct:function(a){this.cname="AmGraph";this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.type="line";this.stackable=!0;this.columnCount=1;this.columnIndex=0;this.centerCustomBullets=this.showBalloon=!0;this.maxBulletSize=50;this.minBulletSize=4;this.balloonText="[[value]]";this.hidden=this.scrollbar=this.animationPlayed=!1;
this.pointPosition="middle";this.depthCount=1;this.includeInMinMax=!0;this.negativeBase=0;this.visibleInLegend=!0;this.showAllValueLabels=!1;this.showBulletsAt=this.showBalloonAt="close";this.lineThickness=1;this.dashLength=0;this.connect=!0;this.lineAlpha=1;this.bullet="none";this.bulletBorderThickness=2;this.bulletBorderAlpha=0;this.bulletAlpha=1;this.bulletSize=8;this.cornerRadiusTop=this.hideBulletsCount=this.bulletOffset=0;this.cursorBulletAlpha=1;this.gradientOrientation="vertical";this.dy=
this.dx=0;this.periodValue="";this.clustered=!0;this.periodSpan=1;this.y=this.x=0;this.switchable=!0;this.tcc=this.minDistance=1;this.labelRotation=0;this.labelAnchor="auto";this.labelOffset=3;this.bcn="graph-";this.dateFormat="MMM DD, YYYY";d.applyTheme(this,a,this.cname)},draw:function(){var a=this.chart,b=a.type;isNaN(this.precision)||(this.numberFormatter?this.numberFormatter.precision=this.precision:this.numberFormatter={precision:this.precision,decimalSeparator:a.decimalSeparator,thousandsSeparator:a.thousandsSeparator});
var c=a.container;this.container=c;this.destroy();var e=c.set(),h=c.set();this.behindColumns?(a.graphsBehindSet.push(e),a.bulletBehindSet.push(h)):(a.graphsSet.push(e),a.bulletSet.push(h));var f=this.bulletAxis;d.isString(f)&&(this.bulletAxis=a.getValueAxisById(f));this.bulletSet=h;if(!this.scrollbar){var f=a.marginLeftReal,g=a.marginTopReal;e.translate(f,g);h.translate(f,g)}c=c.set();d.remove(this.columnsSet);e.push(c);this.set=e;d.setCN(a,e,"graph-"+this.type);d.setCN(a,e,"graph-"+this.id);d.setCN(a,
h,"graph-"+this.type);d.setCN(a,h,"graph-"+this.id);this.columnsSet=c;this.columnsArray=[];this.ownColumns=[];this.allBullets=[];this.animationArray=[];e=this.labelPosition;e||(h=this.valueAxis.stackType,e="top","column"==this.type&&(a.rotate&&(e="right"),"100%"==h||"regular"==h)&&(e="middle"),this.labelPosition=e);d.ifArray(this.data)&&(a=!1,"xy"==b?this.xAxis.axisCreated&&this.yAxis.axisCreated&&(a=!0):this.valueAxis.axisCreated&&(a=!0),!this.hidden&&a&&this.createGraph())},createGraph:function(){var a=
this,b=a.chart;a.startAlpha=b.startAlpha;a.seqAn=b.sequencedAnimation;a.baseCoord=a.valueAxis.baseCoord;void 0===a.fillAlphas&&(a.fillAlphas=0);a.bulletColorR=a.bulletColor;void 0===a.bulletColorR&&(a.bulletColorR=a.lineColorR,a.bulletColorNegative=a.negativeLineColor);void 0===a.bulletAlpha&&(a.bulletAlpha=a.lineAlpha);b=b.type;"gantt"==b&&(b="serial");clearTimeout(a.playedTO);if(!isNaN(a.valueAxis.min)&&!isNaN(a.valueAxis.max)){switch(b){case "serial":a.categoryAxis&&(a.createSerialGraph(),"candlestick"==
a.type&&1>a.valueAxis.minMaxMultiplier&&a.positiveClip(a.set));break;case "radar":a.createRadarGraph();break;case "xy":a.createXYGraph(),a.positiveClip(a.set)}a.playedTO=setTimeout(function(){a.setAnimationPlayed.call(a)},500*a.chart.startDuration)}},setAnimationPlayed:function(){this.animationPlayed=!0},createXYGraph:function(){var a=[],b=[],c=this.xAxis,e=this.yAxis;this.pmh=e.viH+1;this.pmw=c.viW+1;this.pmy=this.pmx=0;var d;for(d=this.start;d<=this.end;d++){var f=this.data[d].axes[c.id].graphs[this.id],
g=f.values,k=g.x,l=g.y,g=c.getCoordinate(k),m=e.getCoordinate(l);!isNaN(k)&&!isNaN(l)&&(a.push(g),b.push(m),f.x=g,f.y=m,k=this.createBullet(f,g,m,d),l=this.labelText)&&(f=this.createLabel(f,g,m,l),this.positionLabel(g,m,f,k),this.allBullets.push(f))}this.drawLineGraph(a,b);this.launchAnimation()},createRadarGraph:function(){var a=this.valueAxis.stackType,b=[],c=[],e,d,f;for(f=this.start;f<=this.end;f++){var g=this.data[f].axes[this.valueAxis.id].graphs[this.id],k;k="none"==a||"3d"==a?g.values.value:
g.values.close;if(isNaN(k))this.drawLineGraph(b,c),b=[],c=[];else{var l=this.y-(this.valueAxis.getCoordinate(k)-this.height),m=180-360/(this.end-this.start+1)*f;k=l*Math.sin(m/180*Math.PI);l*=Math.cos(m/180*Math.PI);b.push(k);c.push(l);var m=this.createBullet(g,k,l,f),n=this.labelText;n&&(g=this.createLabel(g,k,l,n),this.positionLabel(k,l,g,m),this.allBullets.push(g));isNaN(e)&&(e=k);isNaN(d)&&(d=l)}}b.push(e);c.push(d);this.drawLineGraph(b,c);this.launchAnimation()},positionLabel:function(a,b,c,
e){var d="middle",f=!1,g=this.labelPosition,k=c.getBBox();if(e){var l=e.graphDataItem,m=this.chart.rotate,n=l.isNegative,q=this.chart;b-=k.height/4/2;switch(g){case "top":g=m?"top":n?"bottom":"top";break;case "right":g=m?n?"left":"right":"right";break;case "bottom":g=m?"bottom":n?"top":"bottom";break;case "left":g=m?n?"right":"left":"left"}var p=l.columnGraphics,r=0,t=0;p&&(r=p.x,t=p.y);var u=this.labelOffset;switch(g){case "top":b-=e.size/2+k.height/2+u;break;case "right":d="start";a+=e.size/2+u;
break;case "bottom":b+=e.size/2+k.height/2+u;break;case "left":d="end";a-=e.size/2+u;break;case "inside":"column"==this.type&&(f=!0,m?n?(d="end",a=r-3-u):(d="start",a=r+3+u):b=n?t+7+u:t-10-u);break;case "middle":"column"==this.type&&(f=!0,m?a-=(a-r)/2+u-3:b-=(b-t)/2+u-3)}"auto"!=this.labelAnchor&&(d=this.labelAnchor);c.attr({"text-anchor":d});this.labelRotation&&c.rotate(this.labelRotation);c.translate(a,b);k=c.getBBox();!this.showAllValueLabels&&p&&f&&(k.height>l.columnHeight||k.width>l.columnWidth)&&
(c.remove(),c=!1);if(c&&("serial"==q.type||"gantt"==q.type))if(m){if(0>b||b>this.height)c.remove(),c=!1}else if(0>a||a>this.width)c.remove(),c=!1;return c}},getGradRotation:function(){var a=270;"horizontal"==this.gradientOrientation&&(a=0);return this.gradientRotation=a},createSerialGraph:function(){this.dashLengthSwitched=this.fillColorsSwitched=this.lineColorSwitched=void 0;var a=this.chart,b=this.id,c=this.index,e=this.data,h=this.chart.container,f=this.valueAxis,g=this.type,k=this.columnWidthReal,
l=this.showBulletsAt;isNaN(this.columnWidth)||(k=this.columnWidth);isNaN(k)&&(k=.8);var m=this.useNegativeColorIfDown,n=this.width,q=this.height,p=this.y,r=this.rotate,t=this.columnCount,u=d.toCoordinate(this.cornerRadiusTop,k/2),z=this.connect,v=[],w=[],x,A,B,D,C=this.chart.graphs.length,I,H=this.dx/this.tcc,O=this.dy/this.tcc,J=f.stackType,da=this.start,pa=this.end,U=this.scrollbar,na="graph-column-";U&&(na="scrollbar-graph-column-");var qa=this.categoryAxis,ja=this.baseCoord,Pa=this.negativeBase,
aa=this.columnIndex,Z=this.lineThickness,V=this.lineAlpha,sa=this.lineColorR,ba=this.dashLength,ca=this.set,ta,ia=this.getGradRotation(),Q=this.chart.columnSpacing,W=qa.cellWidth,wa=(W*k-t)/t;Q>wa&&(Q=wa);var G,y,ka,ea=q+1,Qa=n+1,Y=0,qb=0,rb,sb,eb,fb,tb=this.fillColorsR,Ja=this.negativeFillColors,Da=this.negativeLineColor,Wa=this.fillAlphas,Xa=this.negativeFillAlphas;"object"==typeof Wa&&(Wa=Wa[0]);"object"==typeof Xa&&(Xa=Xa[0]);var gb=f.getCoordinate(f.min);f.logarithmic&&(gb=f.getCoordinate(f.minReal));
this.minCoord=gb;this.resetBullet&&(this.bullet="none");if(!(U||"line"!=g&&"smoothedLine"!=g&&"step"!=g||(1==e.length&&"step"!=g&&"none"==this.bullet&&(this.bullet="round",this.resetBullet=!0),!Ja&&void 0==Da||m))){var Ra=Pa;Ra>f.max&&(Ra=f.max);Ra<f.min&&(Ra=f.min);f.logarithmic&&(Ra=f.minReal);var Ga=f.getCoordinate(Ra),Ib=f.getCoordinate(f.max);r?(ea=q,Qa=Math.abs(Ib-Ga)+1,rb=q,sb=Math.abs(gb-Ga)+1,fb=qb=0,f.reversed?(Y=0,eb=Ga):(Y=Ga,eb=0)):(Qa=n,ea=Math.abs(Ib-Ga)+1,sb=n,rb=Math.abs(gb-Ga)+1,
eb=Y=0,f.reversed?(fb=p,qb=Ga):fb=Ga+1)}var Ha=Math.round;this.pmx=Ha(Y);this.pmy=Ha(qb);this.pmh=Ha(ea);this.pmw=Ha(Qa);this.nmx=Ha(eb);this.nmy=Ha(fb);this.nmh=Ha(rb);this.nmw=Ha(sb);d.isModern||(this.nmy=this.nmx=0,this.nmh=this.height);this.clustered||(t=1);k="column"==g?(W*k-Q*(t-1))/t:W*k;1>k&&(k=1);var Jb=this.fixedColumnWidth;isNaN(Jb)||(k=Jb);var K;if("line"==g||"step"==g||"smoothedLine"==g){if(0<da){for(K=da-1;-1<K;K--)if(G=e[K],y=G.axes[f.id].graphs[b],ka=y.values.value,!isNaN(ka)){da=
K;break}if(this.lineColorField)for(K=da;-1<K;K--)if(G=e[K],y=G.axes[f.id].graphs[b],y.lineColor){this.bulletColorSwitched=this.lineColorSwitched=y.lineColor;break}if(this.fillColorsField)for(K=da;-1<K;K--)if(G=e[K],y=G.axes[f.id].graphs[b],y.fillColors){this.fillColorsSwitched=y.fillColors;break}if(this.dashLengthField)for(K=da;-1<K;K--)if(G=e[K],y=G.axes[f.id].graphs[b],!isNaN(y.dashLength)){this.dashLengthSwitched=y.dashLength;break}}if(pa<e.length-1)for(K=pa+1;K<e.length;K++)if(G=e[K],y=G.axes[f.id].graphs[b],
ka=y.values.value,!isNaN(ka)){pa=K;break}}pa<e.length-1&&pa++;var R=[],S=[],Ka=!1;if("line"==g||"step"==g||"smoothedLine"==g)if(this.stackable&&"regular"==J||"100%"==J||this.fillToGraph)Ka=!0;var Kb=this.noStepRisers,hb=-1E3,ib=-1E3,jb=this.minDistance,La=!0,Ya=!1;for(K=da;K<=pa;K++){G=e[K];y=G.axes[f.id].graphs[b];y.index=K;var Za,Ma=NaN;if(m&&void 0==this.openField)for(var ub=K+1;ub<e.length&&(!e[ub]||!(Za=e[K+1].axes[f.id].graphs[b])||!Za.values||(Ma=Za.values.value,isNaN(Ma)));ub++);var T,P,M,
fa,la=NaN,F=NaN,E=NaN,N=NaN,L=NaN,Na=NaN,Ea=NaN,Oa=NaN,Fa=NaN,ya=NaN,za=NaN,ga=NaN,ha=NaN,X=NaN,vb=NaN,wb=NaN,ma=NaN,oa=void 0,Ia=tb,Sa=Wa,Ba=sa,ua,xa,xb=this.proCandlesticks,kb=this.topRadius,$a=this.pattern;void 0!=y.pattern&&($a=y.pattern);isNaN(y.alpha)||(Sa=y.alpha);isNaN(y.dashLength)||(ba=y.dashLength);var Ca=y.values;f.recalculateToPercents&&(Ca=y.percents);if(Ca){X=this.stackable&&"none"!=J&&"3d"!=J?Ca.close:Ca.value;if("candlestick"==g||"ohlc"==g)X=Ca.close,wb=Ca.low,Ea=f.getCoordinate(wb),
vb=Ca.high,Fa=f.getCoordinate(vb);ma=Ca.open;E=f.getCoordinate(X);isNaN(ma)||(L=f.getCoordinate(ma),m&&(Ma=ma,ma=L=NaN));m&&(void 0==this.openField?Za&&(Za.isNegative=Ma<X?!0:!1,isNaN(Ma)&&(y.isNegative=!La)):y.isNegative=Ma>X?!0:!1);if(!U)switch(this.showBalloonAt){case "close":y.y=E;break;case "open":y.y=L;break;case "high":y.y=Fa;break;case "low":y.y=Ea}var la=G.x[qa.id],Ta=this.periodSpan-1,ra=Math.floor(W/2)+Math.floor(Ta*W/2),Aa=ra,lb=0;"left"==this.stepDirection&&(lb=(2*W+Ta*W)/2,la-=lb);"center"==
this.stepDirection&&(lb=W/2,la-=lb);"start"==this.pointPosition&&(la-=W/2+Math.floor(Ta*W/2),ra=0,Aa=Math.floor(W)+Math.floor(Ta*W));"end"==this.pointPosition&&(la+=W/2+Math.floor(Ta*W/2),ra=Math.floor(W)+Math.floor(Ta*W),Aa=0);if(Kb){var yb=this.columnWidth;isNaN(yb)||(ra*=yb,Aa*=yb)}U||(y.x=la);-1E5>la&&(la=-1E5);la>n+1E5&&(la=n+1E5);r?(F=E,N=L,L=E=la,isNaN(ma)&&!this.fillToGraph&&(N=ja),Na=Ea,Oa=Fa):(N=F=la,isNaN(ma)&&!this.fillToGraph&&(L=ja));if(!xb&&X<ma||xb&&X<ta)y.isNegative=!0,Ja&&(Ia=Ja),
Xa&&(Sa=Xa),void 0!=Da&&(Ba=Da);Ya=!1;isNaN(X)||(m?X>Ma?(La&&(Ya=!0),La=!1):(La||(Ya=!0),La=!0):y.isNegative=X<Pa?!0:!1,ta=X);var Lb=!1;U&&a.chartScrollbar.ignoreCustomColors&&(Lb=!0);Lb||(void 0!=y.color&&(Ia=y.color),y.fillColors&&(Ia=y.fillColors));switch(g){case "line":if(isNaN(X))z||(this.drawLineGraph(v,w,R,S),v=[],w=[],R=[],S=[]);else{if(Math.abs(F-hb)>=jb||Math.abs(E-ib)>=jb)v.push(F),w.push(E),hb=F,ib=E;ya=F;za=E;ga=F;ha=E;!Ka||isNaN(L)||isNaN(N)||(R.push(N),S.push(L));if(Ya||void 0!=y.lineColor||
void 0!=y.fillColors||!isNaN(y.dashLength))this.drawLineGraph(v,w,R,S),v=[F],w=[E],R=[],S=[],!Ka||isNaN(L)||isNaN(N)||(R.push(N),S.push(L)),m?La?(this.lineColorSwitched=sa,this.fillColorsSwitched=tb):(this.lineColorSwitched=Da,this.fillColorsSwitched=Ja):(this.lineColorSwitched=y.lineColor,this.fillColorsSwitched=y.fillColors),this.dashLengthSwitched=y.dashLength;y.gap&&(this.drawLineGraph(v,w,R,S),v=[],w=[],R=[],S=[])}break;case "smoothedLine":if(isNaN(X))z||(this.drawSmoothedGraph(v,w,R,S),v=[],
w=[],R=[],S=[]);else{if(Math.abs(F-hb)>=jb||Math.abs(E-ib)>=jb)v.push(F),w.push(E),hb=F,ib=E;ya=F;za=E;ga=F;ha=E;!Ka||isNaN(L)||isNaN(N)||(R.push(N),S.push(L));void 0==y.lineColor&&void 0==y.fillColors&&isNaN(y.dashLength)||(this.drawSmoothedGraph(v,w,R,S),v=[F],w=[E],R=[],S=[],!Ka||isNaN(L)||isNaN(N)||(R.push(N),S.push(L)),this.lineColorSwitched=y.lineColor,this.fillColorsSwitched=y.fillColors,this.dashLengthSwitched=y.dashLength);y.gap&&(this.drawSmoothedGraph(v,w,R,S),v=[],w=[],R=[],S=[])}break;
case "step":if(!isNaN(X)){r?(isNaN(x)||(v.push(x),w.push(E-ra)),w.push(E-ra),v.push(F),w.push(E+Aa),v.push(F),!Ka||isNaN(L)||isNaN(N)||(isNaN(B)||(R.push(B),S.push(L-ra)),R.push(N),S.push(L-ra),R.push(N),S.push(L+Aa))):(isNaN(A)||(w.push(A),v.push(F-ra)),v.push(F-ra),w.push(E),v.push(F+Aa),w.push(E),!Ka||isNaN(L)||isNaN(N)||(isNaN(D)||(R.push(N-ra),S.push(D)),R.push(N-ra),S.push(L),R.push(N+Aa),S.push(L)));x=F;A=E;B=N;D=L;ya=F;za=E;ga=F;ha=E;if(Ya||void 0!=y.lineColor||void 0!=y.fillColors||!isNaN(y.dashLength)){var Zb=
v[v.length-2],$b=w[w.length-2];v.pop();w.pop();this.drawLineGraph(v,w,R,S);v=[Zb];w=[$b];r?(w.push(E+Aa),v.push(F)):(v.push(F+Aa),w.push(E));R=[];S=[];this.lineColorSwitched=y.lineColor;this.fillColorsSwitched=y.fillColors;this.dashLengthSwitched=y.dashLength;m&&(La?(this.lineColorSwitched=sa,this.fillColorsSwitched=tb):(this.lineColorSwitched=Da,this.fillColorsSwitched=Ja))}if(Kb||y.gap)x=A=NaN,this.drawLineGraph(v,w,R,S),v=[],w=[],R=[],S=[]}else if(!z){if(1>=this.periodSpan||1<this.periodSpan&&
F-x>ra+Aa)x=A=NaN;this.drawLineGraph(v,w,R,S);v=[];w=[];R=[];S=[]}break;case "column":ua=Ba;void 0!=y.lineColor&&(ua=y.lineColor);if(!isNaN(X)){m||(y.isNegative=X<Pa?!0:!1);y.isNegative&&(Ja&&(Ia=Ja),void 0!=Da&&(ua=Da));var Mb=f.min,Nb=f.max;if(!(X<Mb&&ma<Mb||X>Nb&&ma>Nb)){var va;if(r){"3d"==J?(P=E-(t/2-this.depthCount+1)*(k+Q)+Q/2+O*aa,T=N+H*aa,va=aa):(P=Math.floor(E-(t/2-aa)*(k+Q)+Q/2),T=N,va=0);M=k;ya=F;za=P+k/2;isNaN(N)||N>F&&!y.isNegative&&(ya=N);ga=F;ha=P+k/2;P+M>q+va*O&&(M=q-P+va*O);P<va*
O&&(M+=P,P=va*O);fa=F-N;var ac=T;T=d.fitToBounds(T,0,n);fa+=ac-T;fa=d.fitToBounds(fa,-T,n-T+H*aa);P<q&&0<M&&(oa=new d.Cuboid(h,fa,M,H-a.d3x,O-a.d3y,Ia,Sa,Z,ua,V,ia,u,r,ba,$a,kb,na),y.columnWidth=Math.abs(fa),y.columnHeight=Math.abs(M))}else{"3d"==J?(T=F-(t/2-this.depthCount+1)*(k+Q)+Q/2+H*aa,P=L+O*aa,va=aa):(T=F-(t/2-aa)*(k+Q)+Q/2,P=L,va=0);M=k;ya=T+k/2;za=E;isNaN(L)||L<E&&!y.isNegative&&(za=L);ga=T+k/2;ha=E;T+M>n+va*H&&(M=n-T+va*H);T<va*H&&(M+=T-va*H,T=va*H);fa=E-L;var bc=P;P=d.fitToBounds(P,this.dy,
q);fa+=bc-P;fa=d.fitToBounds(fa,-P+O*aa,q-P);T<n+aa*H&&0<M&&(this.showOnAxis&&(P-=O/2),oa=new d.Cuboid(h,M,fa,H-a.d3x,O-a.d3y,Ia,Sa,Z,ua,this.lineAlpha,ia,u,r,ba,$a,kb,na),y.columnHeight=Math.abs(fa),y.columnWidth=Math.abs(M))}}if(oa&&(xa=oa.set,d.setCN(a,oa.set,"graph-"+this.type),d.setCN(a,oa.set,"graph-"+this.id),y.className&&d.setCN(a,oa.set,y.className,!0),y.columnGraphics=xa,xa.translate(T,P),this.columnsSet.push(xa),(y.url||this.showHandOnHover)&&xa.setAttr("cursor","pointer"),!U)){"none"==
J&&(I=r?(this.end+1-K)*C-c:C*K+c);"3d"==J&&(r?(I=(this.end+1-K)*C-c-1E3*this.depthCount,ya+=H*this.columnIndex,ga+=H*this.columnIndex,y.y+=H*this.columnIndex):(I=(C-c)*(K+1)+1E3*this.depthCount,za+=O*this.columnIndex,ha+=O*this.columnIndex,y.y+=O*this.columnIndex));if("regular"==J||"100%"==J)I=r?0<Ca.value?(this.end+1-K)*C+c:(this.end+1-K)*C-c:0<Ca.value?C*K+c:C*K-c;this.columnsArray.push({column:oa,depth:I});y.x=r?P+M/2:T+M/2;this.ownColumns.push(oa);this.animateColumns(oa,K,F,N,E,L);this.addListeners(xa,
y)}}break;case "candlestick":if(!isNaN(ma)&&!isNaN(X)){var Ua,ab;ua=Ba;void 0!=y.lineColor&&(ua=y.lineColor);if(r){if(P=E-k/2,T=N,M=k,P+M>q&&(M=q-P),0>P&&(M+=P,P=0),P<q&&0<M){var zb,Ab;X>ma?(zb=[F,Oa],Ab=[N,Na]):(zb=[N,Oa],Ab=[F,Na]);!isNaN(Oa)&&!isNaN(Na)&&E<q&&0<E&&(Ua=d.line(h,zb,[E,E],ua,V,Z),ab=d.line(h,Ab,[E,E],ua,V,Z));fa=F-N;oa=new d.Cuboid(h,fa,M,H,O,Ia,Wa,Z,ua,V,ia,u,r,ba,$a,kb,na)}}else if(T=F-k/2,P=L+Z/2,M=k,T+M>n&&(M=n-T),0>T&&(M+=T,T=0),fa=E-L,T<n&&0<M){xb&&X>=ma&&(Sa=0);var oa=new d.Cuboid(h,
M,fa,H,O,Ia,Sa,Z,ua,V,ia,u,r,ba,$a,kb,na),Bb,Cb;X>ma?(Bb=[E,Fa],Cb=[L,Ea]):(Bb=[L,Fa],Cb=[E,Ea]);!isNaN(Fa)&&!isNaN(Ea)&&F<n&&0<F&&(Ua=d.line(h,[F,F],Bb,ua,V,Z),ab=d.line(h,[F,F],Cb,ua,V,Z),d.setCN(a,Ua,this.bcn+"line-high"),y.className&&d.setCN(a,Ua,y.className,!0),d.setCN(a,ab,this.bcn+"line-low"),y.className&&d.setCN(a,ab,y.className,!0))}oa&&(xa=oa.set,y.columnGraphics=xa,ca.push(xa),xa.translate(T,P-Z/2),(y.url||this.showHandOnHover)&&xa.setAttr("cursor","pointer"),Ua&&(ca.push(Ua),ca.push(ab)),
ya=F,za=E,r?(ha=E,ga=F,"open"==l&&(ga=N),"high"==l&&(ga=Oa),"low"==l&&(ga=Na)):(ha=E,"open"==l&&(ha=L),"high"==l&&(ha=Fa),"low"==l&&(ha=Ea),ga=F),U||(y.x=r?P+M/2:T+M/2,this.animateColumns(oa,K,F,N,E,L),this.addListeners(xa,y)))}break;case "ohlc":if(!(isNaN(ma)||isNaN(vb)||isNaN(wb)||isNaN(X))){var Ob=h.set();ca.push(Ob);X<ma&&(y.isNegative=!0,void 0!=Da&&(Ba=Da));var mb,nb,ob;if(r){var Db=E-k/2,Db=d.fitToBounds(Db,0,q),Pb=d.fitToBounds(E,0,q),Eb=E+k/2,Eb=d.fitToBounds(Eb,0,q);nb=d.line(h,[N,N],[Db,
Pb],Ba,V,Z,ba);0<E&&E<q&&(mb=d.line(h,[Na,Oa],[E,E],Ba,V,Z,ba));ob=d.line(h,[F,F],[Pb,Eb],Ba,V,Z,ba);ha=E;ga=F;"open"==l&&(ga=N);"high"==l&&(ga=Oa);"low"==l&&(ga=Na)}else{var Fb=F-k/2,Fb=d.fitToBounds(Fb,0,n),Qb=d.fitToBounds(F,0,n),Gb=F+k/2,Gb=d.fitToBounds(Gb,0,n);nb=d.line(h,[Fb,Qb],[L,L],Ba,V,Z,ba);0<F&&F<n&&(mb=d.line(h,[F,F],[Ea,Fa],Ba,V,Z,ba));ob=d.line(h,[Qb,Gb],[E,E],Ba,V,Z,ba);ha=E;"open"==l&&(ha=L);"high"==l&&(ha=Fa);"low"==l&&(ha=Ea);ga=F}ca.push(nb);ca.push(mb);ca.push(ob);d.setCN(a,
nb,this.bcn+"stroke-open");d.setCN(a,ob,this.bcn+"stroke-close");d.setCN(a,mb,this.bcn+"stroke");y.className&&d.setCN(a,Ob,y.className,!0);ya=F;za=E}}if(!U&&!isNaN(X)){var Rb=this.hideBulletsCount;if(this.end-this.start<=Rb||0===Rb){var Sb=this.createBullet(y,ga,ha,K),Tb=this.labelText;if(Tb&&Sb){var Hb=this.createLabel(y,ga,ha,Tb);(Hb=this.positionLabel(ya,za,Hb,Sb,M,fa))&&this.allBullets.push(Hb)}if("regular"==J||"100%"==J){var Ub=f.totalText;if(Ub){var Va=this.createLabel(y,0,0,Ub,f.totalTextColor);
this.allBullets.push(Va);var Vb=Va.getBBox(),Wb=Vb.width,Xb=Vb.height,bb,cb,pb=f.totalTextOffset,Yb=f.totals[K];Yb&&Yb.remove();var db=0;"column"!=g&&(db=this.bulletSize);r?(cb=E,bb=0>X?F-Wb/2-2-db-pb:F+Wb/2+3+db+pb):(bb=F,cb=0>X?E+Xb/2+db+pb:E-Xb/2-3-db-pb);Va.translate(bb,cb);f.totals[K]=Va;r?(0>cb||cb>q)&&Va.remove():(0>bb||bb>n)&&Va.remove()}}}}}}if("line"==g||"step"==g||"smoothedLine"==g)"smoothedLine"==g?this.drawSmoothedGraph(v,w,R,S):this.drawLineGraph(v,w,R,S),U||this.launchAnimation();this.bulletsHidden&&
this.hideBullets();this.customBulletsHidden&&this.hideCustomBullets()},animateColumns:function(a,b){var c=this,e=c.chart.startDuration;0<e&&!c.animationPlayed&&(c.seqAn?(a.set.hide(),c.animationArray.push(a),e=setTimeout(function(){c.animate.call(c)},e/(c.end-c.start+1)*(b-c.start)*1E3),c.timeOuts.push(e)):c.animate(a))},createLabel:function(a,b,c,e,h){var f=this.chart,g=a.labelColor;g||(g=this.color);g||(g=f.color);h&&(g=h);h=this.fontSize;void 0===h&&(this.fontSize=h=f.fontSize);var k=this.labelFunction;
e=f.formatString(e,a);e=d.cleanFromEmpty(e);k&&(e=k(a,e));a=d.text(this.container,e,g,f.fontFamily,h);a.node.style.pointerEvents="none";a.translate(b,c);this.bulletSet.push(a);return a},positiveClip:function(a){a.clipRect(this.pmx,this.pmy,this.pmw,this.pmh)},negativeClip:function(a){a.clipRect(this.nmx,this.nmy,this.nmw,this.nmh)},drawLineGraph:function(a,b,c,e){var h=this;if(1<a.length){var f=h.set,g=h.chart,k=h.container,l=k.set(),m=k.set();f.push(m);f.push(l);var n=h.lineAlpha,q=h.lineThickness,
f=h.fillAlphas,p=h.lineColorR,r=h.negativeLineAlpha;isNaN(r)&&(r=n);var t=h.lineColorSwitched;t&&(p=t);var t=h.fillColorsR,u=h.fillColorsSwitched;u&&(t=u);var z=h.dashLength;(u=h.dashLengthSwitched)&&(z=u);var u=h.negativeLineColor,v=h.negativeFillColors,w=h.negativeFillAlphas,x=h.baseCoord;0!==h.negativeBase&&(x=h.valueAxis.getCoordinate(h.negativeBase),x>h.height&&(x=h.height),0>x&&(x=0));n=d.line(k,a,b,p,n,q,z,!1,!0);d.setCN(g,n,h.bcn+"stroke");l.push(n);l.click(function(a){h.handleGraphEvent(a,
"clickGraph")}).mouseover(function(a){h.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){h.handleGraphEvent(a,"rollOutGraph")});void 0===u||h.useNegativeColorIfDown||(q=d.line(k,a,b,u,r,q,z,!1,!0),d.setCN(g,q,h.bcn+"stroke"),d.setCN(g,q,h.bcn+"stroke-negative"),m.push(q));if(0<f||0<w)if(q=a.join(";").split(";"),r=b.join(";").split(";"),n=g.type,"serial"==n?0<c.length?(c.reverse(),e.reverse(),q=a.concat(c),r=b.concat(e)):h.rotate?(r.push(r[r.length-1]),q.push(x),r.push(r[0]),q.push(x),r.push(r[0]),
q.push(q[0])):(q.push(q[q.length-1]),r.push(x),q.push(q[0]),r.push(x),q.push(a[0]),r.push(r[0])):"xy"==n&&(b=h.fillToAxis)&&(d.isString(b)&&(b=g.getValueAxisById(b)),"H"==b.orientation?(x="top"==b.position?0:b.viH,q.push(q[q.length-1]),r.push(x),q.push(q[0]),r.push(x),q.push(a[0]),r.push(r[0])):(x="left"==b.position?0:b.viW,r.push(r[r.length-1]),q.push(x),r.push(r[0]),q.push(x),r.push(r[0]),q.push(q[0]))),a=h.gradientRotation,0<f&&(b=d.polygon(k,q,r,t,f,1,"#000",0,a),b.pattern(h.pattern,NaN,g.path),
d.setCN(g,b,h.bcn+"fill"),l.push(b)),v||void 0!==u)isNaN(w)&&(w=f),v||(v=u),k=d.polygon(k,q,r,v,w,1,"#000",0,a),d.setCN(g,k,h.bcn+"fill"),d.setCN(g,k,h.bcn+"fill-negative"),k.pattern(h.pattern,NaN,g.path),m.push(k),m.click(function(a){h.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){h.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){h.handleGraphEvent(a,"rollOutGraph")});h.applyMask(m,l)}},applyMask:function(a,b){var c=a.length();"serial"!=this.chart.type||this.scrollbar||(this.positiveClip(b),
0<c&&this.negativeClip(a))},drawSmoothedGraph:function(a,b,c,e){if(1<a.length){var h=this.set,f=this.chart,g=this.container,k=g.set(),l=g.set();h.push(l);h.push(k);var m=this.lineAlpha,n=this.lineThickness,h=this.dashLength,q=this.fillAlphas,p=this.lineColorR,r=this.fillColorsR,t=this.negativeLineColor,u=this.negativeFillColors,z=this.negativeFillAlphas,v=this.baseCoord,w=this.lineColorSwitched;w&&(p=w);(w=this.fillColorsSwitched)&&(r=w);w=this.negativeLineAlpha;isNaN(w)&&(w=m);m=new d.Bezier(g,a,
b,p,m,n,r,0,h);d.setCN(f,m,this.bcn+"stroke");k.push(m.path);void 0!==t&&(n=new d.Bezier(g,a,b,t,w,n,r,0,h),d.setCN(f,n,this.bcn+"stroke"),d.setCN(f,n,this.bcn+"stroke-negative"),l.push(n.path));0<q&&(m=a.join(";").split(";"),p=b.join(";").split(";"),n="",0<c.length?(c.push("M"),e.push("M"),c.reverse(),e.reverse(),m=a.concat(c),p=b.concat(e)):(this.rotate?(n+=" L"+v+","+b[b.length-1],n+=" L"+v+","+b[0]):(n+=" L"+a[a.length-1]+","+v,n+=" L"+a[0]+","+v),n+=" L"+a[0]+","+b[0]),c=new d.Bezier(g,m,p,NaN,
0,0,r,q,h,n),d.setCN(f,c,this.bcn+"fill"),c.path.pattern(this.pattern,NaN,f.path),k.push(c.path),u||void 0!==t)&&(z||(z=q),u||(u=t),a=new d.Bezier(g,a,b,NaN,0,0,u,z,h,n),a.path.pattern(this.pattern,NaN,f.path),d.setCN(f,a,this.bcn+"fill"),d.setCN(f,a,this.bcn+"fill-negative"),l.push(a.path));this.applyMask(l,k)}},launchAnimation:function(){var a=this,b=a.chart.startDuration;if(0<b&&!a.animationPlayed){var c=a.set,e=a.bulletSet;d.VML||(c.attr({opacity:a.startAlpha}),e.attr({opacity:a.startAlpha}));
c.hide();e.hide();a.seqAn?(b=setTimeout(function(){a.animateGraphs.call(a)},a.index*b*1E3),a.timeOuts.push(b)):a.animateGraphs()}},animateGraphs:function(){var a=this.chart,b=this.set,c=this.bulletSet,e=this.x,d=this.y;b.show();c.show();var f=a.startDuration,a=a.startEffect;b&&(this.rotate?(b.translate(-1E3,d),c.translate(-1E3,d)):(b.translate(e,-1E3),c.translate(e,-1E3)),b.animate({opacity:1,translate:e+","+d},f,a),c.animate({opacity:1,translate:e+","+d},f,a))},animate:function(a){var b=this.chart,
c=this.animationArray;!a&&0<c.length&&(a=c[0],c.shift());c=d[d.getEffect(b.startEffect)];b=b.startDuration;a&&(this.rotate?a.animateWidth(b,c):a.animateHeight(b,c),a.set.show())},legendKeyColor:function(){var a=this.legendColor,b=this.lineAlpha;void 0===a&&(a=this.lineColorR,0===b&&(b=this.fillColorsR)&&(a="object"==typeof b?b[0]:b));return a},legendKeyAlpha:function(){var a=this.legendAlpha;void 0===a&&(a=this.lineAlpha,this.fillAlphas>a&&(a=this.fillAlphas),0===a&&(a=this.bulletAlpha),0===a&&(a=
1));return a},createBullet:function(a,b,c){if(!isNaN(b)&&!isNaN(c)){var e=this.chart,h=this.container,f=this.bulletOffset,g=this.bulletSize;isNaN(a.bulletSize)||(g=a.bulletSize);var k=a.values.value,l=this.maxValue,m=this.minValue,n=this.maxBulletSize,q=this.minBulletSize;isNaN(l)||(isNaN(k)||(g=(k-m)/(l-m)*(n-q)+q),m==l&&(g=n));l=g;this.bulletAxis&&(g=a.values.error,isNaN(g)||(k=g),g=this.bulletAxis.stepWidth*k);g<this.minBulletSize&&(g=this.minBulletSize);this.rotate?b=a.isNegative?b-f:b+f:c=a.isNegative?
c+f:c-f;var p,q=this.bulletColorR;a.lineColor&&(this.bulletColorSwitched=a.lineColor);this.bulletColorSwitched&&(q=this.bulletColorSwitched);a.isNegative&&void 0!==this.bulletColorNegative&&(q=this.bulletColorNegative);void 0!==a.color&&(q=a.color);var r;"xy"==e.type&&this.valueField&&(r=this.pattern,a.pattern&&(r=a.pattern));f=this.bullet;a.bullet&&(f=a.bullet);var k=this.bulletBorderThickness,m=this.bulletBorderColorR,n=this.bulletBorderAlpha,t=this.bulletAlpha;m||(m=q);this.useLineColorForBulletBorder&&
(m=this.lineColorR);var u=a.alpha;isNaN(u)||(t=u);if("none"!=this.bullet||a.bullet)p=d.bullet(h,f,g,q,t,k,m,n,l,0,r,e.path);if(this.customBullet||a.customBullet)r=this.customBullet,a.customBullet&&(r=a.customBullet),r&&(p&&p.remove(),"function"==typeof r?(p=new r,p.chart=e,a.bulletConfig&&(p.availableSpace=c,p.graph=this,p.graphDataItem=a,p.bulletY=c,a.bulletConfig.minCoord=this.minCoord-c,p.bulletConfig=a.bulletConfig),p.write(h),p=p.set):(p=h.set(),h=h.image(r,0,0,g,g),p.push(h),this.centerCustomBullets&&
h.translate(-g/2,-g/2)));if(p){(a.url||this.showHandOnHover)&&p.setAttr("cursor","pointer");if("serial"==e.type||"gantt"==e.type)if(-.5>b-0||b-0>this.width||c<-g/2||c-0>this.height)p.remove(),p=null;p&&(this.bulletSet.push(p),p.translate(b,c),this.addListeners(p,a),this.allBullets.push(p));a.bx=b;a.by=c;d.setCN(e,p,this.bcn+"bullet");a.className&&d.setCN(e,p,a.className,!0)}p?(p.size=g||0,a.bulletGraphics=p):p={size:0};p.graphDataItem=a;return p}},showBullets:function(){var a=this.allBullets,b;this.bulletsHidden=
!1;for(b=0;b<a.length;b++)a[b].show()},hideBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!0;for(b=0;b<a.length;b++)a[b].hide()},showCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!1;for(b=0;b<a.length;b++)a[b].graphDataItem.customBullet&&a[b].show()},hideCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!0;for(b=0;b<a.length;b++)a[b].graphDataItem.customBullet&&a[b].hide()},addListeners:function(a,b){var c=this;a.mouseover(function(a){c.handleRollOver(b,
a)}).mouseout(function(a){c.handleRollOut(b,a)}).touchend(function(a){c.handleRollOver(b,a);c.chart.panEventsEnabled&&c.handleClick(b,a)}).touchstart(function(a){c.handleRollOver(b,a)}).click(function(a){c.handleClick(b,a)}).dblclick(function(a){c.handleDoubleClick(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},handleRollOver:function(a,b){if(a){var c=this.chart,e={type:"rollOverGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOverGraphItem",
e);c.fire("rollOverGraphItem",e);clearTimeout(c.hoverInt);e=this.showBalloon;!c.chartCursor||"serial"!=c.type&&"gantt"!=c.type||(e=!1,!c.chartCursor.valueBalloonsEnabled&&this.showBalloon&&(e=!0));if(e){var e=c.formatString(this.balloonText,a,!0),h=this.balloonFunction;h&&(e=h(a,a.graph));e=d.cleanFromEmpty(e);h=c.getBalloonColor(this,a);c.balloon.showBullet=!1;c.balloon.pointerOrientation="V";var f=a.x,g=a.y;c.rotate&&(f=a.y,g=a.x);""!==e?c.showBalloon(e,h,!0,f+c.marginLeftReal,g+c.marginTopReal):
this.chart.hideBalloonReal()}else this.chart.hideBalloonReal()}this.handleGraphEvent(b,"rollOverGraph")},handleRollOut:function(a,b){this.chart.hideBalloon();if(a){var c={type:"rollOutGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOutGraphItem",c);this.chart.fire("rollOutGraphItem",c)}this.handleGraphEvent(b,"rollOutGraph")},handleClick:function(a,b){if(a){var c={type:"clickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};
this.fire("clickGraphItem",c);this.chart.fire("clickGraphItem",c);d.getURL(a.url,this.urlTarget)}this.handleGraphEvent(b,"clickGraph")},handleGraphEvent:function(a,b){var c={type:b,graph:this,target:this,chart:this.chart,event:a};this.fire(b,c);this.chart.fire(b,c)},handleRightClick:function(a,b){if(a){var c={type:"rightClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rightClickGraphItem",c);this.chart.fire("rightClickGraphItem",c)}},handleDoubleClick:function(a,
b){if(a){var c={type:"doubleClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("doubleClickGraphItem",c);this.chart.fire("doubleClickGraphItem",c)}},zoom:function(a,b){this.start=a;this.end=b;this.draw()},changeOpacity:function(a){var b=this.set;b&&b.setAttr("opacity",a);if(b=this.ownColumns){var c;for(c=0;c<b.length;c++){var e=b[c].set;e&&e.setAttr("opacity",a)}}(b=this.bulletSet)&&b.setAttr("opacity",a)},destroy:function(){d.remove(this.set);d.remove(this.bulletSet);
var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]}})})();(function(){var d=window.AmCharts;d.ChartCursor=d.Class({construct:function(a){this.cname="ChartCursor";this.createEvents("changed","zoomed","onHideCursor","draw","selected","moved");this.enabled=!0;this.cursorAlpha=1;this.selectionAlpha=.2;this.cursorColor="#CC0000";this.categoryBalloonAlpha=1;this.color="#FFFFFF";this.type="cursor";this.zoomed=!1;this.zoomable=!0;this.pan=!1;this.categoryBalloonDateFormat="MMM DD, YYYY";this.categoryBalloonEnabled=this.valueBalloonsEnabled=!0;this.rolledOver=!1;
this.cursorPosition="middle";this.bulletsEnabled=this.skipZoomDispatch=!1;this.bulletSize=8;this.selectWithoutZooming=this.oneBalloonOnly=!1;this.graphBulletSize=1.7;this.animationDuration=.3;this.zooming=!1;this.adjustment=0;this.avoidBalloonOverlapping=!0;this.leaveCursor=!1;d.applyTheme(this,a,this.cname)},draw:function(){this.destroy();var a=this.chart,b=a.container;this.rotate=a.rotate;this.container=b;b=b.set();b.translate(this.x,this.y);this.set=b;a.cursorSet.push(b);b=new d.AmBalloon;b.className=
"category";b.chart=a;this.categoryBalloon=b;d.copyProperties(a.balloon,b);b.cornerRadius=0;b.shadowAlpha=0;b.borderThickness=1;b.borderAlpha=1;b.showBullet=!1;var c=this.categoryBalloonColor;void 0===c&&(c=this.cursorColor);b.fillColor=c;b.balloonColor=c;b.fillAlpha=this.categoryBalloonAlpha;b.borderColor=c;b.color=this.color;c=this.valueLineAxis;d.isString(c)&&(c=a.getValueAxisById(c));c||(c=a.valueAxes[0]);this.valueLineAxis=c;this.valueLineBalloonEnabled&&(this.vaBalloon=c=new d.AmBalloon,d.copyProperties(b,
c),c.animationDuration=0,this.rotate||(c.pointerOrientation="H"));this.rotate&&(b.pointerOrientation="H");this.extraWidth=0;this.prevX=[];this.prevY=[];this.prevTX=[];this.prevTY=[];if(this.valueBalloonsEnabled)for(b=0;b<a.graphs.length;b++)c=new d.AmBalloon,c.className=a.graphs[b].id,c.chart=a,d.copyProperties(a.balloon,c),a.graphs[b].valueBalloon=c;"cursor"==this.type?this.createCursor():this.createCrosshair()},updateData:function(){var a=this.chart;this.data=a.chartData;this.firstTime=a.firstTime;
this.lastTime=a.lastTime},createCursor:function(){var a=this.chart,b=this.cursorAlpha,c=a.categoryAxis,e=this.categoryBalloon,h,f,g,k;g=a.dx;k=a.dy;var l=this.width,m=this.height,n=a.rotate;e.pointerWidth=c.tickLength;n?(h=[0,l,l+g],f=[0,0,k],g=[g,0,0],k=[k,0,m]):(h=[g,0,0],f=[k,0,m],g=[0,l,l+g],k=[0,0,k]);h=d.line(this.container,h,f,this.cursorColor,b,1);d.setCN(a,h,"cursor-line");this.line=h;h.node.style.pointerEvents="none";(f=this.fullRectSet)?(f.push(h),f.translate(this.x,this.y)):this.set.push(h);
this.valueLineEnabled&&(h=this.valueLineAlpha,isNaN(h)||(b=h),b=d.line(this.container,g,k,this.cursorColor,b,1),b.node.style.pointerEvents="none",d.setCN(a,b,"cursor-value-line"),this.vLine=b,this.set.push(b));this.setBalloonBounds(e,c,n);(a=this.vaBalloon)&&this.setBalloonBounds(a,this.valueLineAxis,!n);this.hideCursor()},createCrosshair:function(){var a=this.cursorAlpha,b=this.container,c=d.line(b,[0,0],[0,this.height],this.cursorColor,a,1),a=d.line(b,[0,this.width],[0,0],this.cursorColor,a,1);
d.setCN(this.chart,c,"cursor-line");d.setCN(this.chart,a,"cursor-line");this.set.push(c);this.set.push(a);this.vLine=c;this.hLine=a;this.hideCursor()},update:function(){var a=this.chart;if(a.mouseIsOver){var b=a.mouseX-this.x,c=a.mouseY-this.y;-.5<b&&b<this.width+1&&0<c&&c<this.height?(this.drawing?this.rolledOver||a.setMouseCursor("crosshair"):this.pan&&(this.rolledOver||a.setMouseCursor("move")),this.rolledOver=!0,(this.valueLineEnabled||this.valueLineBalloonEnabled)&&this.updateVLine(b,c),this.setPosition()):
this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)}else this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)},updateVLine:function(a,b){var c=this.vLine,e=this.vaBalloon;if((c||e)&&!this.panning&&!this.drawing){c&&c.show();var d=this.valueLineAxis,f,g=this.rotate;g?(c&&c.translate(a,0),d&&(f=d.coordinateToValue(a)),c=a):(c&&c.translate(0,b),d&&(f=d.coordinateToValue(b)),c=b-1);if(e&&!isNaN(f)&&this.prevLineValue!=f){var k=d.formatValue(f,!0);this.setBalloonPosition(e,d,c,!g);e.showBalloon(k)}this.prevLineValue=
f}},getMousePosition:function(){var a,b=this.width,c=this.height;a=this.chart;this.rotate?(a=a.mouseY-this.y,0>a&&(a=0),a>c&&(a=c)):(a=a.mouseX-this.x-1,0>a&&(a=0),a>b&&(a=b));return a},updateCrosshair:function(){var a=this.chart,b=a.mouseX-this.x,c=a.mouseY-this.y,e=this.vLine,h=this.hLine,b=d.fitToBounds(b,0,this.width),c=d.fitToBounds(c,0,this.height);e&&0<this.cursorAlpha&&(e.show(),h.show(),e.translate(b,0),h.translate(0,c));this.zooming&&(a.hideXScrollbar&&(b=NaN),a.hideYScrollbar&&(c=NaN),
this.updateSelectionSize(b,c));this.fireMoved();a.mouseIsOver||this.zooming||this.hideCursor()},fireMoved:function(){var a=this.chart,b={type:"moved",target:this};b.chart=a;b.zooming=this.zooming;b.x=a.mouseX-this.x;b.y=a.mouseY-this.y;this.fire("moved",b)},updateSelectionSize:function(a,b){d.remove(this.selection);var c=this.selectionPosX,e=this.selectionPosY,h=0,f=0,g=this.width,k=this.height;isNaN(a)||(c>a&&(h=a,g=c-a),c<a&&(h=c,g=a-c),c==a&&(h=a,g=0),g+=this.extraWidth,h-=this.extraWidth/2);isNaN(b)||
(e>b&&(f=b,k=e-b),e<b&&(f=e,k=b-e),e==b&&(f=b,k=0),k+=this.extraWidth,f-=this.extraWidth/2);0<g&&0<k&&(c=d.rect(this.container,g,k,this.cursorColor,this.selectionAlpha),d.setCN(this.chart,c,"cursor-selection"),c.translate(h+this.x,f+this.y),this.selection=c)},arrangeBalloons:function(){var a=this.valueBalloons,b=this.x,c=this.y,e=this.height+c;a.sort(this.compareY);var d;for(d=0;d<a.length;d++){var f=a[d].balloon;f.setBounds(b,c,b+this.width,e);f.prevX=this.prevX[d];f.prevY=this.prevY[d];f.prevTX=
this.prevTX[d];f.prevTY=this.prevTY[d];f.draw();e=f.yPos-3}this.arrangeBalloons2()},compareY:function(a,b){return a.yy<b.yy?1:-1},arrangeBalloons2:function(){var a=this.valueBalloons;a.reverse();var b,c=this.x,e,d,f=a.length;for(d=0;d<f;d++){var g=a[d].balloon;b=g.bottom;var k=g.bottom-g.yPos,l=f-d-1;0<d&&b-k<e+3&&(g.setBounds(c,e+3,c+this.width,e+k+3),g.prevX=this.prevX[l],g.prevY=this.prevY[l],g.prevTX=this.prevTX[l],g.prevTY=this.prevTY[l],g.draw());g.set&&g.set.show();this.prevX[l]=g.prevX;this.prevY[l]=
g.prevY;this.prevTX[l]=g.prevTX;this.prevTY[l]=g.prevTY;e=g.bottom}},showBullets:function(){d.remove(this.allBullets);var a=this.container,b=a.set();this.set.push(b);this.set.show();this.allBullets=b;var b=this.chart.graphs,c;for(c=0;c<b.length;c++){var e=b[c];if(!e.hidden&&e.balloonText){var h=this.data[this.index].axes[e.valueAxis.id].graphs[e.id],f=h.y;if(!isNaN(f)){var g,k;g=h.x;this.rotate?(k=f,f=g):k=g;e=d.circle(a,this.bulletSize/2,this.chart.getBalloonColor(e,h,!0),e.cursorBulletAlpha);e.translate(k,
f);this.allBullets.push(e)}}}},destroy:function(){this.clear();d.remove(this.selection);this.selection=null;var a=this.categoryBalloon;a&&a.destroy();(a=this.vaBalloon)&&a.destroy();this.destroyValueBalloons();d.remove(this.set)},clear:function(){},destroyValueBalloons:function(){var a=this.valueBalloons;if(a){var b;for(b=0;b<a.length;b++)a[b].balloon.hide()}},zoom:function(a,b,c,e){var h=this.chart;this.destroyValueBalloons();this.zooming=!1;var f;this.rotate?this.selectionPosY=f=h.mouseY:this.selectionPosX=
f=h.mouseX;this.start=a;this.end=b;this.startTime=c;this.endTime=e;this.zoomed=!0;e=h.categoryAxis;f=this.rotate;b=this.width;c=this.height;a=e.stepWidth;if(this.fullWidth){var g=1;e.parseDates&&!e.equalSpacing&&(g=e.minDuration());f?this.extraWidth=c=a*g:(this.extraWidth=b=a*g,this.categoryBalloon.minWidth=b);this.line&&this.line.remove();this.line=d.rect(this.container,b,c,this.cursorColor,this.cursorAlpha,0);this.line.node.style.pointerEvents="none";d.setCN(h,this.line,"cursor-fill");this.fullRectSet&&
this.fullRectSet.push(this.line)}this.stepWidth=a;this.tempVal=this.valueBalloonsEnabled;this.valueBalloonsEnabled=!1;this.setPosition();this.valueBalloonsEnabled=this.tempVal;this.hideCursor()},hideObj:function(a){a&&a.hide()},hideCursor:function(a){void 0===a&&(a=!0);this.leaveCursor||(this.hideObj(this.set),this.hideObj(this.categoryBalloon),this.hideObj(this.line),this.hideObj(this.vLine),this.hideObj(this.hLine),this.hideObj(this.vaBalloon),this.hideObj(this.allBullets),this.destroyValueBalloons(),
this.selectWithoutZooming||d.remove(this.selection),this.previousIndex=NaN,a&&this.fire("onHideCursor",{type:"onHideCursor",chart:this.chart,target:this}),this.drawing||this.chart.setMouseCursor("auto"),this.normalizeBulletSize())},setPosition:function(a,b,c){void 0===b&&(b=!0);if("cursor"==this.type){if(this.tempPosition=NaN,d.ifArray(this.data))isNaN(a)&&(a=this.getMousePosition()),(a!=this.previousMousePosition||!0===this.zoomed||this.oneBalloonOnly)&&!isNaN(a)&&("mouse"==this.cursorPosition&&
(this.tempPosition=a),isNaN(c)&&(c=this.chart.categoryAxis.xToIndex(a)),c!=this.previousIndex||this.zoomed||"mouse"==this.cursorPosition||this.oneBalloonOnly)&&(this.updateCursor(c,b),this.zoomed=!1),this.previousMousePosition=a}else this.updateCrosshair()},normalizeBulletSize:function(){var a=this.resizedBullets;if(a)for(var b=0;b<a.length;b++){var c=a[b],e=c.bulletGraphics;e&&(e.translate(c.bx,c.by,1),c=c.graph,isNaN(this.graphBulletAlpha)||(e.setAttr("fill-opacity",c.bulletAlpha),e.setAttr("stroke-opacity",
c.bulletBorderAlpha)))}},updateCursor:function(a,b){var c=this.chart,e=this.fullWidth,h=c.mouseX-this.x,f=c.mouseY-this.y;this.drawingNow&&(d.remove(this.drawingLine),this.drawingLine=d.line(this.container,[this.x+this.drawStartX,this.x+h],[this.y+this.drawStartY,this.y+f],this.cursorColor,1,1));if(this.enabled){void 0===b&&(b=!0);this.index=a+=this.adjustment;var g=c.categoryAxis,k=c.dx,l=c.dy,m=this.x+1,n=this.y+1,q=this.width,p=this.height,r=this.data[a];this.fireMoved();if(r){var t=r.x[g.id],
u=c.rotate,z=this.stepWidth,v=this.categoryBalloon,w=this.firstTime,x=this.lastTime,A=this.cursorPosition,B=this.zooming,D=this.panning,C=c.graphs;if(c.mouseIsOver||B||D||this.forceShow)if(this.forceShow=!1,D){var k=this.panClickPos,c=this.panClickEndTime,B=this.panClickStartTime,I=this.panClickEnd,m=this.panClickStart,h=(u?k-f:k-h)/z;if(!g.parseDates||g.equalSpacing)h=Math.round(h);0!==h&&(k={type:"zoomed",target:this},k.chart=this.chart,g.parseDates&&!g.equalSpacing?(c+h>x&&(h=x-c),B+h<w&&(h=w-
B),k.start=Math.round(B+h),k.end=Math.round(c+h),this.fire(k.type,k)):I+h>=this.data.length||0>m+h||(k.start=m+h,k.end=I+h,this.fire(k.type,k)))}else{"start"==A?t-=g.cellWidth/2:"mouse"==A&&(c.mouseIsOver?t=u?f-2:h-2:isNaN(this.tempPosition)||(t=this.tempPosition-2));if(u){if(0>t)if(B)t=0;else{this.hideCursor();return}if(t>p+1)if(B)t=p+1;else{this.hideCursor();return}}else{if(0>t)if(B)t=0;else{this.hideCursor();return}if(t>q)if(B)t=q;else{this.hideCursor();return}}w=this.line;0<this.cursorAlpha&&
(u?(x=0,z=t+l,e&&(z-=g.cellWidth/2)):(x=t,z=0,e&&(x-=g.cellWidth/2)),A=this.animationDuration,0<A&&!this.zooming?isNaN(this.previousX)?w.translate(x,z):(w.translate(this.previousX,this.previousY),w.animate({translate:x+","+z},A,"easeOutSine")):w.translate(x,z),this.previousX=x,this.previousY=z,w.show());this.linePos=u?t+l:t;B&&(e&&w.hide(),u?this.updateSelectionSize(NaN,t):this.updateSelectionSize(t,NaN));z=!0;B&&(z=!1);this.categoryBalloonEnabled&&z?(this.setBalloonPosition(v,g,t,u),(w=this.categoryBalloonFunction)?
v.showBalloon(w(r.category)):g.parseDates?(g=d.formatDate(r.category,this.categoryBalloonDateFormat,c),-1!=g.indexOf("fff")&&(g=d.formatMilliseconds(g,r.category)),v.showBalloon(g)):v.showBalloon(d.fixNewLines(r.category))):v.hide();C&&this.bulletsEnabled&&this.showBullets();if(this.oneBalloonOnly){t=Infinity;for(g=0;g<C.length;g++)v=C[g],v.showBalloon&&!v.hidden&&v.balloonText&&(w=r.axes[v.valueAxis.id].graphs[v.id],x=w.y,isNaN(x)||(u?Math.abs(h-x)<t&&(t=Math.abs(h-x),I=v):Math.abs(f-x)<t&&(t=Math.abs(f-
x),I=v)));this.mostCloseGraph&&(I=this.mostCloseGraph)}if(a!=this.previousIndex||I!=this.previousMostCloseGraph)if(this.normalizeBulletSize(),this.destroyValueBalloons(),this.resizedBullets=[],C&&this.valueBalloonsEnabled&&z&&c.balloon.enabled){this.valueBalloons=t=[];for(g=0;g<C.length;g++)if(v=C[g],x=NaN,(!this.oneBalloonOnly||v==I)&&v.showBalloon&&!v.hidden&&v.balloonText&&("step"==v.type&&"left"==v.stepDirection&&(r=this.data[a+1]),r)){if(w=r.axes[v.valueAxis.id].graphs[v.id])x=w.y;if(this.showNextAvailable&&
isNaN(x)&&a+1<this.data.length)for(z=a+1;z<this.data.length;z++)if(e=this.data[z])if(w=e.axes[v.valueAxis.id].graphs[v.id],x=w.y,!isNaN(x))break;if(!isNaN(x)){e=w.x;l=!0;if(u){if(z=x,0>e||e>p)l=!1}else if(z=e,e=x,0>z||z>q+k+1)l=!1;l&&(l=this.graphBulletSize,A=this.graphBulletAlpha,1==l&&isNaN(A)||!d.isModern||!(D=w.bulletGraphics)||(D.translate(w.bx,w.by,l),this.resizedBullets.push(w),isNaN(A)||(D.setAttr("fill-opacity",A),D.setAttr("stroke-opacity",A))),l=v.valueBalloon,A=c.getBalloonColor(v,w),
l.setBounds(m,n,m+q,n+p),l.pointerOrientation="H",D=this.balloonPointerOrientation,"vertical"==D&&(l.pointerOrientation="V"),"horizontal"==D&&(l.pointerOrientation="H"),l.changeColor(A),void 0!==v.balloonAlpha&&(l.fillAlpha=v.balloonAlpha),void 0!==v.balloonTextColor&&(l.color=v.balloonTextColor),l.setPosition(z+m,e+n),z=c.formatString(v.balloonText,w,!0),(e=v.balloonFunction)&&(z=e(w,v).toString()),""!==z&&(u?l.showBalloon(z):(l.text=z,l.show=!0),t.push({yy:x,balloon:l})),!u&&l.set&&(l.set.hide(),
v=l.textDiv)&&(v.style.visibility="hidden"))}}this.avoidBalloonOverlapping&&this.arrangeBalloons()}b?(k={type:"changed"},k.index=a,k.chart=this.chart,k.zooming=B,k.mostCloseGraph=I,k.position=u?f:h,k.target=this,c.fire("changed",k),this.fire("changed",k),this.skipZoomDispatch=!1):(this.skipZoomDispatch=!0,c.updateLegendValues(a));this.previousIndex=a;this.previousMostCloseGraph=I}}}else this.hideCursor()},setBalloonPosition:function(a,b,c,e){var d=b.position,f=b.inside;b=b.axisThickness;var g=this.chart,
k=g.dx,g=g.dy,l=this.x,m=this.y,n=this.width,q=this.height;e?(f&&("right"==d?a.setBounds(l,m+g,l+n+k,m+c+g):a.setBounds(l,m+g,l+n+k,m+c)),"right"==d?f?a.setPosition(l+n+k,m+c+g):a.setPosition(l+n+k+b,m+c+g):f?a.setPosition(l,m+c):a.setPosition(l-b,m+c)):"top"==d?f?a.setPosition(l+c+k,m+g):a.setPosition(l+c+k,m+g-b+1):f?a.setPosition(l+c,m+q):a.setPosition(l+c,m+q+b-1)},setBalloonBounds:function(a,b,c){var e=b.position,d=b.inside,f=b.axisThickness,g=b.tickLength,k=this.chart,l=k.dx,k=k.dy,m=this.x,
n=this.y,q=this.width,p=this.height;c?(d&&(a.pointerWidth=0),"right"==e?d?a.setBounds(m,n+k,m+q+l,n+p+k):a.setBounds(m+q+l+f,n+k,m+q+1E3,n+p+k):d?a.setBounds(m,n,q+m,p+n):a.setBounds(-1E3,-1E3,m-g-f,n+p+15)):(a.maxWidth=q,b.parseDates&&(g=0,a.pointerWidth=0),"top"==e?d?a.setBounds(m+l,n+k,q+l+m,p+n):a.setBounds(m+l,-1E3,q+l+m,n+k-g-f):d?a.setBounds(m,n,q+m,p+n-g):a.setBounds(m,n+p+g+f-1,m+q,n+p+g+f))},enableDrawing:function(a){this.enabled=!a;this.hideCursor();this.rolledOver=!1;this.drawing=a},isZooming:function(a){a&&
a!=this.zooming&&this.handleMouseDown("fake");a||a==this.zooming||this.handleMouseUp()},handleMouseOut:function(){if(this.enabled)if(this.zooming)this.setPosition();else{this.index=void 0;var a={type:"changed",index:void 0,target:this};a.chart=this.chart;this.fire("changed",a);this.hideCursor()}},handleReleaseOutside:function(){this.handleMouseUp()},handleMouseUp:function(){var a=this.chart,b=this.data,c;if(a){var e=a.mouseX-this.x,h=a.mouseY-this.y;if(this.drawingNow){this.drawingNow=!1;d.remove(this.drawingLine);
c=this.drawStartX;var f=this.drawStartY;if(2<Math.abs(c-e)||2<Math.abs(f-h))c={type:"draw",target:this,chart:a,initialX:c,initialY:f,finalX:e,finalY:h},this.fire(c.type,c)}if(this.enabled&&0<b.length){if(this.pan)this.rolledOver=!1;else if(this.zoomable&&this.zooming){c=this.selectWithoutZooming?{type:"selected"}:{type:"zoomed"};c.target=this;c.chart=a;if("cursor"==this.type)this.rotate?this.selectionPosY=h:this.selectionPosX=h=e,4>Math.abs(h-this.initialMouse)&&this.fromIndex==this.index||(this.index<
this.fromIndex?(c.end=this.fromIndex,c.start=this.index):(c.end=this.index,c.start=this.fromIndex),h=a.categoryAxis,h.parseDates&&!h.equalSpacing&&(b[c.start]&&(c.start=b[c.start].time),b[c.end]&&(c.end=a.getEndTime(b[c.end].time))),this.skipZoomDispatch||this.fire(c.type,c));else{var g=this.initialMouseX,k=this.initialMouseY;3>Math.abs(e-g)&&3>Math.abs(h-k)||(b=Math.min(g,e),f=Math.min(k,h),e=Math.abs(g-e),h=Math.abs(k-h),a.hideXScrollbar&&(b=0,e=this.width),a.hideYScrollbar&&(f=0,h=this.height),
c.selectionHeight=h,c.selectionWidth=e,c.selectionY=f,c.selectionX=b,this.skipZoomDispatch||this.fire(c.type,c))}this.selectWithoutZooming||d.remove(this.selection)}this.skipZoomDispatch=!1}}this.panning=this.zooming=!1},showCursorAt:function(a){var b=this.chart.categoryAxis;a=b.parseDates?b.dateToCoordinate(a):b.categoryToCoordinate(a);this.previousMousePosition=NaN;this.forceShow=!0;this.setPosition(a,!1)},clearSelection:function(){d.remove(this.selection)},handleMouseDown:function(a){if(this.zoomable||
this.pan||this.drawing){var b=this.rotate,c=this.chart,e=c.mouseX-this.x,h=c.mouseY-this.y;if(0<e&&e<this.width&&0<h&&h<this.height||"fake"==a)this.setPosition(),this.selectWithoutZooming&&d.remove(this.selection),this.drawing?(this.drawStartY=h,this.drawStartX=e,this.drawingNow=!0):this.pan?(this.zoomable=!1,c.setMouseCursor("move"),this.panning=!0,this.panClickPos=b?h:e,this.panClickStart=this.start,this.panClickEnd=this.end,this.panClickStartTime=this.startTime,this.panClickEndTime=this.endTime):
this.zoomable&&("cursor"==this.type?(this.fromIndex=this.index,b?(this.initialMouse=h,this.selectionPosY=this.linePos):(this.initialMouse=e,this.selectionPosX=this.linePos)):(this.initialMouseX=e,this.initialMouseY=h,this.selectionPosX=e,this.selectionPosY=h),this.zooming=!0)}}})})();(function(){var d=window.AmCharts;d.SimpleChartScrollbar=d.Class({construct:function(a){this.createEvents("zoomed");this.backgroundColor="#D4D4D4";this.backgroundAlpha=1;this.selectedBackgroundColor="#EFEFEF";this.scrollDuration=this.selectedBackgroundAlpha=1;this.resizeEnabled=!0;this.hideResizeGrips=!1;this.scrollbarHeight=20;this.updateOnReleaseOnly=!1;9>document.documentMode&&(this.updateOnReleaseOnly=!0);this.dragIconHeight=this.dragIconWidth=35;this.dragIcon="dragIconRoundBig";d.applyTheme(this,
a,"SimpleChartScrollbar")},draw:function(){var a=this;a.destroy();if(a.enabled){var b=a.chart.container,c=a.rotate,e=a.chart,h=b.set();a.set=h;e.scrollbarsSet.push(h);var f,g;c?(f=a.scrollbarHeight,g=e.plotAreaHeight):(g=a.scrollbarHeight,f=e.plotAreaWidth);a.width=f;if((a.height=g)&&f){var k=d.rect(b,f,g,a.backgroundColor,a.backgroundAlpha,1,a.backgroundColor,a.backgroundAlpha);d.setCN(e,k,"scrollbar-bg");a.bg=k;h.push(k);k=d.rect(b,f,g,"#000",.005);h.push(k);a.invisibleBg=k;k.click(function(){a.handleBgClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()}).touchend(function(){a.handleBgClick()});
k=d.rect(b,f,g,a.selectedBackgroundColor,a.selectedBackgroundAlpha);d.setCN(e,k,"scrollbar-bg-selected");a.selectedBG=k;h.push(k);f=d.rect(b,f,g,"#000",.005);a.dragger=f;h.push(f);f.mousedown(function(b){a.handleDragStart(b)}).mouseup(function(){a.handleDragStop()}).mouseover(function(){a.handleDraggerOver()}).mouseout(function(){a.handleMouseOut()}).touchstart(function(b){a.handleDragStart(b)}).touchend(function(){a.handleDragStop()});f=e.pathToImages;c?(k=f+a.dragIcon+"H.png",f=a.dragIconWidth,
c=a.dragIconHeight):(k=f+a.dragIcon+".png",c=a.dragIconWidth,f=a.dragIconHeight);g=b.image(k,0,0,c,f);d.setCN(e,g,"scrollbar-grip-left");k=b.image(k,0,0,c,f);d.setCN(e,k,"scrollbar-grip-right");var l=10,m=20;e.panEventsEnabled&&(l=25,m=a.scrollbarHeight);var n=d.rect(b,l,m,"#000",.005),q=d.rect(b,l,m,"#000",.005);q.translate(-(l-c)/2,-(m-f)/2);n.translate(-(l-c)/2,-(m-f)/2);c=b.set([g,q]);b=b.set([k,n]);a.iconLeft=c;h.push(a.iconLeft);a.iconRight=b;h.push(b);c.mousedown(function(){a.leftDragStart()}).mouseup(function(){a.leftDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.leftDragStart()}).touchend(function(){a.leftDragStop()});
b.mousedown(function(){a.rightDragStart()}).mouseup(function(){a.rightDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.rightDragStart()}).touchend(function(){a.rightDragStop()});d.ifArray(e.chartData)?h.show():h.hide();a.hideDragIcons();a.clipDragger(!1)}h.translate(a.x,a.y);h.node.style.msTouchAction="none"}},updateScrollbarSize:function(a,b){a=Math.round(a);b=Math.round(b);var c=this.dragger,e,d,f,g;this.rotate?(e=0,d=a,f=this.width+
1,g=b-a,c.setAttr("height",b-a),c.setAttr("y",d)):(e=a,d=0,f=b-a,g=this.height+1,c.setAttr("width",b-a),c.setAttr("x",e));this.clipAndUpdate(e,d,f,g)},update:function(){var a,b=!1,c,e,d=this.x,f=this.y,g=this.dragger,k=this.getDBox();if(k){c=k.x+d;e=k.y+f;var l=k.width,k=k.height,m=this.rotate,n=this.chart,q=this.width,p=this.height,r=n.mouseX,t=n.mouseY;a=this.initialMouse;this.forceClip&&this.clipDragger(!0);n.mouseIsOver&&(this.dragging&&(n=this.initialCoord,m?(a=n+(t-a),0>a&&(a=0),n=p-k,a>n&&
(a=n),g.setAttr("y",a)):(a=n+(r-a),0>a&&(a=0),n=q-l,a>n&&(a=n),g.setAttr("x",a)),this.clipDragger(!0)),this.resizingRight&&(m?(a=t-e,a+e>p+f&&(a=p-e+f),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=.1),g.setAttr("height",a))):(a=r-c,a+c>q+d&&(a=q-c+d),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=.1),g.setAttr("width",a))),this.clipDragger(!0)),this.resizingLeft&&(m?(c=e,e=t,e<f&&(e=f),e>p+f&&(e=p+f),a=!0===b?c-e:k+c-e,0>a?(this.resizingRight=!0,this.resizingLeft=!1,
g.setAttr("y",c+k-f)):(0===a&&(a=.1),g.setAttr("y",e-f),g.setAttr("height",a))):(e=r,e<d&&(e=d),e>q+d&&(e=q+d),a=!0===b?c-e:l+c-e,0>a?(this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("x",c+l-d)):(0===a&&(a=.1),g.setAttr("x",e-d),g.setAttr("width",a))),this.clipDragger(!0)))}},stopForceClip:function(){this.forceClip=!1},clipDragger:function(a){var b=this.getDBox();if(b){var c=b.x,e=b.y,d=b.width,b=b.height,f=!1;if(this.rotate){if(c=0,d=this.width+1,this.clipY!=e||this.clipH!=b)f=!0}else if(e=
0,b=this.height+1,this.clipX!=c||this.clipW!=d)f=!0;f&&(this.clipAndUpdate(c,e,d,b),a&&(this.updateOnReleaseOnly||this.dispatchScrollbarEvent()))}},maskGraphs:function(){},clipAndUpdate:function(a,b,c,e){this.clipX=a;this.clipY=b;this.clipW=c;this.clipH=e;this.selectedBG.clipRect(a,b,c,e);this.updateDragIconPositions();this.maskGraphs(a,b,c,e)},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart;a.hideBalloon();var b=this.getDBox(),c=b.x,e=b.y,d=b.width,b=b.height;
this.rotate?(c=e,d=this.height/b):d=this.width/d;a={type:"zoomed",position:c,chart:a,target:this,multiplier:d};this.fire(a.type,a)}},updateDragIconPositions:function(){var a=this.getDBox(),b=a.x,c=a.y,e=this.iconLeft,d=this.iconRight,f,g,k=this.scrollbarHeight;this.rotate?(f=this.dragIconWidth,g=this.dragIconHeight,e.translate((k-g)/2,c-f/2),d.translate((k-g)/2,c+a.height-f/2)):(f=this.dragIconHeight,g=this.dragIconWidth,e.translate(b-g/2,(k-f)/2),d.translate(b-g/2+a.width,(k-f)/2))},showDragIcons:function(){this.resizeEnabled&&
(this.iconLeft.show(),this.iconRight.show())},hideDragIcons:function(){if(!this.resizingLeft&&!this.resizingRight&&!this.dragging){if(this.hideResizeGrips||!this.resizeEnabled)this.iconLeft.hide(),this.iconRight.hide();this.removeCursors()}},removeCursors:function(){this.chart.setMouseCursor("auto")},relativeZoom:function(a,b){this.enabled&&(this.dragger.stop(),this.multiplier=a,this.position=b,this.updateScrollbarSize(b,this.rotate?b+this.height/a:b+this.width/a),this.clipDragger())},destroy:function(){this.clear();
d.remove(this.set);d.remove(this.iconRight);d.remove(this.iconLeft)},clear:function(){},handleDragStart:function(){if(this.enabled){var a=this.chart;this.dragger.stop();this.removeCursors();this.dragging=!0;var b=this.getDBox();this.rotate?(this.initialCoord=b.y,this.initialMouse=a.mouseY):(this.initialCoord=b.x,this.initialMouse=a.mouseX)}},handleDragStop:function(){this.updateOnReleaseOnly&&(this.update(),this.skipEvent=!1,this.dispatchScrollbarEvent());this.dragging=!1;this.mouseIsOver&&this.removeCursors();
this.update()},handleDraggerOver:function(){this.handleMouseOver()},leftDragStart:function(){this.dragger.stop();this.resizingLeft=!0},leftDragStop:function(){this.resizingLeft=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},rightDragStart:function(){this.dragger.stop();this.resizingRight=!0},rightDragStop:function(){this.resizingRight=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},iconRollOut:function(){this.removeCursors()},iconRollOver:function(){this.rotate?
this.chart.setMouseCursor("n-resize"):this.chart.setMouseCursor("e-resize");this.handleMouseOver()},getDBox:function(){if(this.dragger)return this.dragger.getBBox()},handleBgClick:function(){var a=this;if(!a.resizingRight&&!a.resizingLeft){a.zooming=!0;var b,c,e=a.scrollDuration,h=a.dragger;b=a.getDBox();var f=b.height,g=b.width;c=a.chart;var k=a.y,l=a.x,m=a.rotate;m?(b="y",c=c.mouseY-f/2-k,c=d.fitToBounds(c,0,a.height-f)):(b="x",c=c.mouseX-g/2-l,c=d.fitToBounds(c,0,a.width-g));a.updateOnReleaseOnly?
(a.skipEvent=!1,h.setAttr(b,c),a.dispatchScrollbarEvent(),a.clipDragger()):(c=Math.round(c),m?h.animate({y:c},e,">"):h.animate({x:c},e,">"),a.forceClip=!0,clearTimeout(a.forceTO),a.forceTO=setTimeout(function(){a.stopForceClip.call(a)},5E3*e))}},updateOnRelease:function(){this.updateOnReleaseOnly&&(this.update(),this.skipEvent=!1,this.dispatchScrollbarEvent())},handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||this.resizingRight||this.dragging)this.updateOnRelease(),this.removeCursors();
this.mouseIsOver=this.dragging=this.resizingRight=this.resizingLeft=!1;this.hideDragIcons();this.update()}},handleMouseOver:function(){this.mouseIsOver=!0;this.showDragIcons()},handleMouseOut:function(){this.mouseIsOver=!1;this.hideDragIcons()}})})();(function(){var d=window.AmCharts;d.ChartScrollbar=d.Class({inherits:d.SimpleChartScrollbar,construct:function(a){this.cname="ChartScrollbar";d.ChartScrollbar.base.construct.call(this,a);this.enabled=!0;this.graphLineColor="#BBBBBB";this.graphLineAlpha=0;this.graphFillColor="#BBBBBB";this.graphFillAlpha=1;this.selectedGraphLineColor="#888888";this.selectedGraphLineAlpha=0;this.selectedGraphFillColor="#888888";this.selectedGraphFillAlpha=1;this.gridCount=0;this.gridColor="#FFFFFF";this.gridAlpha=.7;
this.skipEvent=this.autoGridCount=!1;this.color="#FFFFFF";this.scrollbarCreated=!1;this.offset=0;this.oppositeAxis=!0;d.applyTheme(this,a,this.cname)},init:function(){var a=this.categoryAxis,b=this.chart;a||(this.categoryAxis=a=new d.CategoryAxis);a.chart=b;a.id="scrollbar";a.dateFormats=b.categoryAxis.dateFormats;a.markPeriodChange=b.categoryAxis.markPeriodChange;a.boldPeriodBeginning=b.categoryAxis.boldPeriodBeginning;a.axisItemRenderer=d.RecItem;a.axisRenderer=d.RecAxis;a.guideFillRenderer=d.RecFill;
a.inside=!0;a.fontSize=this.fontSize;a.tickLength=0;a.axisAlpha=0;d.isString(this.graph)&&(this.graph=d.getObjById(b.graphs,this.graph));if(a=this.graph){var c=this.valueAxis;c||(this.valueAxis=c=new d.ValueAxis,c.visible=!1,c.scrollbar=!0,c.axisItemRenderer=d.RecItem,c.axisRenderer=d.RecAxis,c.guideFillRenderer=d.RecFill,c.labelsEnabled=!1,c.chart=b);b=this.unselectedGraph;b||(b=new d.AmGraph,b.scrollbar=!0,this.unselectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers);b=this.selectedGraph;
b||(b=new d.AmGraph,b.scrollbar=!0,this.selectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers)}this.scrollbarCreated=!0},draw:function(){var a=this;d.ChartScrollbar.base.draw.call(a);if(a.enabled){a.scrollbarCreated||a.init();var b=a.chart,c=b.chartData,e=a.categoryAxis,h=a.rotate,f=a.x,g=a.y,k=a.width,l=a.height,m=b.categoryAxis,n=a.set;e.setOrientation(!h);e.parseDates=m.parseDates;e.rotate=h;e.equalSpacing=m.equalSpacing;e.minPeriod=m.minPeriod;e.startOnAxis=m.startOnAxis;
e.viW=k;e.viH=l;e.width=k;e.height=l;e.gridCount=a.gridCount;e.gridColor=a.gridColor;e.gridAlpha=a.gridAlpha;e.color=a.color;e.tickLength=0;e.axisAlpha=0;e.autoGridCount=a.autoGridCount;e.parseDates&&!e.equalSpacing&&e.timeZoom(b.firstTime,b.lastTime);e.zoom(0,c.length-1);if(m=a.graph){var q=a.valueAxis,p=m.valueAxis;q.id=p.id;q.rotate=h;q.setOrientation(h);q.width=k;q.height=l;q.viW=k;q.viH=l;q.dataProvider=c;q.reversed=p.reversed;q.logarithmic=p.logarithmic;q.gridAlpha=0;q.axisAlpha=0;n.push(q.set);
h?(q.y=g,q.x=0):(q.x=f,q.y=0);var f=Infinity,g=-Infinity,r;for(r=0;r<c.length;r++){var t=c[r].axes[p.id].graphs[m.id].values,u;for(u in t)if(t.hasOwnProperty(u)&&"percents"!=u&&"total"!=u){var z=t[u];z<f&&(f=z);z>g&&(g=z)}}Infinity!=f&&(q.minimum=f);-Infinity!=g&&(q.maximum=g+.1*(g-f));f==g&&(--q.minimum,q.maximum+=1);void 0!==a.minimum&&(q.minimum=a.minimum);void 0!==a.maximum&&(q.maximum=a.maximum);q.zoom(0,c.length-1);u=a.unselectedGraph;u.id=m.id;u.bcn="scrollbar-graph-";u.rotate=h;u.chart=b;
u.data=c;u.valueAxis=q;u.chart=m.chart;u.categoryAxis=a.categoryAxis;u.periodSpan=m.periodSpan;u.valueField=m.valueField;u.openField=m.openField;u.closeField=m.closeField;u.highField=m.highField;u.lowField=m.lowField;u.lineAlpha=a.graphLineAlpha;u.lineColorR=a.graphLineColor;u.fillAlphas=a.graphFillAlpha;u.fillColorsR=a.graphFillColor;u.connect=m.connect;u.hidden=m.hidden;u.width=k;u.height=l;u.pointPosition=m.pointPosition;u.stepDirection=m.stepDirection;u.periodSpan=m.periodSpan;p=a.selectedGraph;
p.id=m.id;p.bcn=u.bcn+"selected-";p.rotate=h;p.chart=b;p.data=c;p.valueAxis=q;p.chart=m.chart;p.categoryAxis=e;p.periodSpan=m.periodSpan;p.valueField=m.valueField;p.openField=m.openField;p.closeField=m.closeField;p.highField=m.highField;p.lowField=m.lowField;p.lineAlpha=a.selectedGraphLineAlpha;p.lineColorR=a.selectedGraphLineColor;p.fillAlphas=a.selectedGraphFillAlpha;p.fillColorsR=a.selectedGraphFillColor;p.connect=m.connect;p.hidden=m.hidden;p.width=k;p.height=l;p.pointPosition=m.pointPosition;
p.stepDirection=m.stepDirection;p.periodSpan=m.periodSpan;b=a.graphType;b||(b=m.type);u.type=b;p.type=b;c=c.length-1;u.zoom(0,c);p.zoom(0,c);p.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});u.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});n.push(u.set);n.push(p.set)}n.push(e.set);n.push(e.labelsSet);a.bg.toBack();a.invisibleBg.toFront();
a.dragger.toFront();a.iconLeft.toFront();a.iconRight.toFront()}},timeZoom:function(a,b,c){this.startTime=a;this.endTime=b;this.timeDifference=b-a;this.skipEvent=!d.toBoolean(c);this.zoomScrollbar();this.skipEvent||this.dispatchScrollbarEvent()},zoom:function(a,b){this.start=a;this.end=b;this.skipEvent=!0;this.zoomScrollbar()},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart.chartData,b,c,e=this.dragger.getBBox();b=e.x;var d=e.y,f=e.width,e=e.height,g=this.chart;
this.rotate?(b=d,c=e):c=f;f={type:"zoomed",target:this};f.chart=g;var k=this.categoryAxis,l=this.stepWidth,d=g.minSelectedTime,e=!1;if(k.parseDates&&!k.equalSpacing){if(a=g.lastTime,g=g.firstTime,k=Math.round(b/l)+g,b=this.dragging?k+this.timeDifference:Math.round((b+c)/l)+g,k>b&&(k=b),0<d&&b-k<d&&(b=Math.round(k+(b-k)/2),e=Math.round(d/2),k=b-e,b+=e,e=!0),b>a&&(b=a),b-d<k&&(k=b-d),k<g&&(k=g),k+d>b&&(b=k+d),k!=this.startTime||b!=this.endTime)this.startTime=k,this.endTime=b,f.start=k,f.end=b,f.startDate=
new Date(k),f.endDate=new Date(b),this.fire(f.type,f)}else if(k.startOnAxis||(b+=l/2),c-=this.stepWidth/2,d=k.xToIndex(b),b=k.xToIndex(b+c),d!=this.start||this.end!=b)k.startOnAxis&&(this.resizingRight&&d==b&&b++,this.resizingLeft&&d==b&&(0<d?d--:b=1)),this.start=d,this.end=this.dragging?this.start+this.difference:b,f.start=this.start,f.end=this.end,k.parseDates&&(a[this.start]&&(f.startDate=new Date(a[this.start].time)),a[this.end]&&(f.endDate=new Date(a[this.end].time))),this.fire(f.type,f);e&&
this.zoomScrollbar()}},zoomScrollbar:function(){var a,b;a=this.chart;var c=a.chartData,e=this.categoryAxis;e.parseDates&&!e.equalSpacing?(c=e.stepWidth,e=a.firstTime,a=c*(this.startTime-e),b=c*(this.endTime-e)):(a=c[this.start].x[e.id],b=c[this.end].x[e.id],c=e.stepWidth,e.startOnAxis||(e=c/2,a-=e,b+=e));this.stepWidth=c;this.updateScrollbarSize(a,b)},maskGraphs:function(a,b,c,e){var d=this.selectedGraph;d&&d.set.clipRect(a,b,c,e)},handleDragStart:function(){d.ChartScrollbar.base.handleDragStart.call(this);
this.difference=this.end-this.start;this.timeDifference=this.endTime-this.startTime;0>this.timeDifference&&(this.timeDifference=0)},handleBackgroundClick:function(){d.ChartScrollbar.base.handleBackgroundClick.call(this);this.dragging||(this.difference=this.end-this.start,this.timeDifference=this.endTime-this.startTime,0>this.timeDifference&&(this.timeDifference=0))}})})();(function(){var d=window.AmCharts;d.AmBalloon=d.Class({construct:function(a){this.cname="AmBalloon";this.enabled=!0;this.fillColor="#FFFFFF";this.fillAlpha=.8;this.borderThickness=2;this.borderColor="#FFFFFF";this.borderAlpha=1;this.cornerRadius=0;this.maxWidth=220;this.horizontalPadding=8;this.verticalPadding=4;this.pointerWidth=6;this.pointerOrientation="V";this.color="#000000";this.adjustBorderColor=!0;this.show=this.follow=this.showBullet=!1;this.bulletSize=3;this.shadowAlpha=.4;this.shadowColor=
"#000000";this.fadeOutDuration=this.animationDuration=.3;this.fixedPosition=!1;this.offsetY=6;this.offsetX=1;this.textAlign="center";this.disableMouseEvents=!0;this.deltaSignX=this.deltaSignY=1;d.isModern||(this.offsetY*=1.5);d.applyTheme(this,a,this.cname)},draw:function(){var a=this.pointToX,b=this.pointToY,c=this.chart;d.VML&&(this.fadeOutDuration=0);this.xAnim&&c.stopAnim(this.xAnim);this.yAnim&&c.stopAnim(this.yAnim);if(!isNaN(a)){var e=this.follow,h=c.container,f=this.set;d.remove(f);this.removeDiv();
f=h.set();f.node.style.pointerEvents="none";this.set=f;c.balloonsSet.push(f);if(this.show){var g=this.l,k=this.t,l=this.r,m=this.b,n=this.balloonColor,q=this.fillColor,p=this.borderColor,r=q;void 0!=n&&(this.adjustBorderColor?r=p=n:q=n);var t=this.horizontalPadding,u=this.verticalPadding,z=this.pointerWidth,v=this.pointerOrientation,w=this.cornerRadius,x=c.fontFamily,A=this.fontSize;void 0==A&&(A=c.fontSize);var n=document.createElement("div"),B=c.classNamePrefix;n.className=B+"-balloon-div";this.className&&
(n.className=n.className+" "+B+"-balloon-div-"+this.className);B=n.style;this.disableMouseEvents&&(B.pointerEvents="none");B.position="absolute";var D=this.minWidth,C="";isNaN(D)||(C="min-width:"+(D-2*t)+"px; ");n.innerHTML="<div style='text-align:"+this.textAlign+"; "+C+"max-width:"+this.maxWidth+"px; font-size:"+A+"px; color:"+this.color+"; font-family:"+x+"'>"+this.text+"</div>";c.chartDiv.appendChild(n);this.textDiv=n;A=n.offsetWidth;x=n.offsetHeight;n.clientHeight&&(A=n.clientWidth,x=n.clientHeight);
x+=2*u;C=A+2*t;!isNaN(D)&&C<D&&(C=D);window.opera&&(x+=2);var I=!1,A=this.offsetY;c.handDrawn&&(A+=c.handDrawScatter+2);"H"!=v?(D=a-C/2,b<k+x+10&&"down"!=v?(I=!0,e&&(b+=A),A=b+z,this.deltaSignY=-1):(e&&(b-=A),A=b-x-z,this.deltaSignY=1)):(2*z>x&&(z=x/2),A=b-x/2,a<g+(l-g)/2?(D=a+z,this.deltaSignX=-1):(D=a-C-z,this.deltaSignX=1));A+x>=m&&(A=m-x);A<k&&(A=k);D<g&&(D=g);D+C>l&&(D=l-C);var k=A+u,m=D+t,u=this.shadowAlpha,H=this.shadowColor,t=this.borderThickness,O=this.bulletSize,J;0<w||0===z?(0<u&&(a=d.rect(h,
C,x,q,0,t+1,H,u,this.cornerRadius),d.isModern?a.translate(1,1):a.translate(4,4),f.push(a)),q=d.rect(h,C,x,q,this.fillAlpha,t,p,this.borderAlpha,this.cornerRadius),this.showBullet&&(J=d.circle(h,O,r,this.fillAlpha),f.push(J))):(r=[],w=[],"H"!=v?(g=a-D,g>C-z&&(g=C-z),g<z&&(g=z),r=[0,g-z,a-D,g+z,C,C,0,0],w=I?[0,0,b-A,0,0,x,x,0]:[x,x,b-A,x,x,0,0,x]):(r=b-A,r>x-z&&(r=x-z),r<z&&(r=z),w=[0,r-z,b-A,r+z,x,x,0,0],r=a<g+(l-g)/2?[0,0,D<a?0:a-D,0,0,C,C,0]:[C,C,D+C>a?C:a-D,C,C,0,0,C]),0<u&&(a=d.polygon(h,r,w,q,
0,t,H,u),a.translate(1,1),f.push(a)),q=d.polygon(h,r,w,q,this.fillAlpha,t,p,this.borderAlpha));this.bg=q;f.push(q);q.toFront();d.setCN(c,q,"balloon-bg");this.className&&d.setCN(c,q,"balloon-bg-"+this.className);h=1*this.deltaSignX;B.left=m+"px";B.top=k+"px";f.translate(D-h,A);q=q.getBBox();this.bottom=A+x+1;this.yPos=q.y+A;J&&J.translate(this.pointToX-D+h,b-A);b=this.animationDuration;0<this.animationDuration&&!e&&!isNaN(this.prevX)&&(f.translate(this.prevX,this.prevY),f.animate({translate:D-h+","+
A},b,"easeOutSine"),n&&(B.left=this.prevTX+"px",B.top=this.prevTY+"px",this.xAnim=c.animate({node:n},"left",this.prevTX,m,b,"easeOutSine","px"),this.yAnim=c.animate({node:n},"top",this.prevTY,k,b,"easeOutSine","px")));this.prevX=D-h;this.prevY=A;this.prevTX=m;this.prevTY=k}}},followMouse:function(){if(this.follow&&this.show){var a=this.chart.mouseX-this.offsetX*this.deltaSignX,b=this.chart.mouseY;this.pointToX=a;this.pointToY=b;if(a!=this.previousX||b!=this.previousY)if(this.previousX=a,this.previousY=
b,0===this.cornerRadius)this.draw();else{var c=this.set;if(c){var e=c.getBBox(),a=a-e.width/2,d=b-e.height-10;a<this.l&&(a=this.l);a>this.r-e.width&&(a=this.r-e.width);d<this.t&&(d=b+10);c.translate(a,d);b=this.textDiv.style;b.left=a+this.horizontalPadding+"px";b.top=d+this.verticalPadding+"px"}}}},changeColor:function(a){this.balloonColor=a},setBounds:function(a,b,c,e){this.l=a;this.t=b;this.r=c;this.b=e;this.destroyTO&&clearTimeout(this.destroyTO)},showBalloon:function(a){this.text=a;this.show=
!0;this.destroyTO&&clearTimeout(this.destroyTO);a=this.chart;this.fadeAnim1&&a.stopAnim(this.fadeAnim1);this.fadeAnim2&&a.stopAnim(this.fadeAnim2);this.draw()},hide:function(a){var b=this;isNaN(a)&&(a=b.fadeOutDuration);var c=b.chart;if(0<a){b.destroyTO&&clearTimeout(b.destroyTO);b.destroyTO=setTimeout(function(){b.destroy.call(b)},1E3*a);b.follow=!1;b.show=!1;var e=b.set;e&&(e.setAttr("opacity",b.fillAlpha),b.fadeAnim1=e.animate({opacity:0},a,"easeInSine"));b.textDiv&&(b.fadeAnim2=c.animate({node:b.textDiv},
"opacity",1,0,a,"easeInSine",""))}else b.show=!1,b.follow=!1,b.destroy()},setPosition:function(a,b,c){this.pointToX=a;this.pointToY=b;c&&(a==this.previousX&&b==this.previousY||this.draw());this.previousX=a;this.previousY=b},followCursor:function(a){var b=this;(b.follow=a)?(b.pShowBullet=b.showBullet,b.showBullet=!1):void 0!==b.pShowBullet&&(b.showBullet=b.pShowBullet);clearInterval(b.interval);var c=b.chart.mouseX,e=b.chart.mouseY;!isNaN(c)&&a&&(b.pointToX=c-b.offsetX*b.deltaSignX,b.pointToY=e,b.followMouse(),
b.interval=setInterval(function(){b.followMouse.call(b)},40))},removeDiv:function(){if(this.textDiv){var a=this.textDiv.parentNode;a&&a.removeChild(this.textDiv)}},destroy:function(){clearInterval(this.interval);d.remove(this.set);this.removeDiv();this.set=null}})})();(function(){var d=window.AmCharts;d.AmCoordinateChart=d.Class({inherits:d.AmChart,construct:function(a){d.AmCoordinateChart.base.construct.call(this,a);this.theme=a;this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.startAlpha=1;this.startDuration=0;this.startEffect="elastic";this.sequencedAnimation=!0;this.colors="#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
this.balloonDateFormat="MMM DD, YYYY";this.valueAxes=[];this.graphs=[];this.guides=[];this.gridAboveGraphs=!1;d.applyTheme(this,a,"AmCoordinateChart")},initChart:function(){d.AmCoordinateChart.base.initChart.call(this);var a=this.categoryAxis;a&&(this.categoryAxis=d.processObject(a,d.CategoryAxis,this.theme));this.processValueAxes();this.createValueAxes();this.processGraphs();this.processGuides();d.VML&&(this.startAlpha=1);this.setLegendData(this.graphs);this.gridAboveGraphs&&this.gridSet.toFront()},
createValueAxes:function(){if(0===this.valueAxes.length){var a=new d.ValueAxis;this.addValueAxis(a)}},parseData:function(){this.processValueAxes();this.processGraphs()},parseSerialData:function(a){var b=this.graphs,c,e={},h=this.seriesIdField;h||(h=this.categoryField);this.chartData=[];if(a){var f=!1,g,k=this.categoryAxis,l,m,n;k&&(f=k.parseDates,l=k.forceShowField,n=k.classNameField,m=k.labelColorField,g=k.categoryFunction);var q,p,r={},t;f&&(c=d.extractPeriod(k.minPeriod),q=c.period,p=c.count,t=
d.getPeriodDuration(q,p));var u={};this.lookupTable=u;var z,v=this.dataDateFormat,w={};for(z=0;z<a.length;z++){var x={},A=a[z];c=A[this.categoryField];x.dataContext=A;x.category=g?g(c,A,k):String(c);l&&(x.forceShow=A[l]);n&&(x.className=A[n]);m&&(x.labelColor=A[m]);u[A[h]]=x;if(f&&(k.categoryFunction?c=k.categoryFunction(c,A,k):(!v||c instanceof Date||(c=c.toString()+" |"),c=d.getDate(c,v,k.minPeriod)),c=d.resetDateToMin(c,q,p,k.firstDayOfWeek),x.category=c,x.time=c.getTime(),isNaN(x.time)))continue;
var B=this.valueAxes;x.axes={};x.x={};var D;for(D=0;D<B.length;D++){var C=B[D].id;x.axes[C]={};x.axes[C].graphs={};var I;for(I=0;I<b.length;I++){c=b[I];var H=c.id,O=1.1;isNaN(c.gapPeriod)||(O=c.gapPeriod);var J=c.periodValue;if(c.valueAxis.id==C){x.axes[C].graphs[H]={};var da={};da.index=z;var pa=A;c.dataProvider&&(pa=e);da.values=this.processValues(pa,c,J);!c.connect&&w&&w[H]&&x.time-r[H]>=t*O&&(w[H].gap=!0);this.processFields(c,da,pa);da.category=x.category;da.serialDataItem=x;da.graph=c;x.axes[C].graphs[H]=
da;r[H]=x.time;w[H]=da}}}this.chartData[z]=x}}for(a=0;a<b.length;a++)c=b[a],c.dataProvider&&this.parseGraphData(c)},processValues:function(a,b,c){var e={},h,f=!1;"candlestick"!=b.type&&"ohlc"!=b.type||""===c||(f=!0);for(var g="value error open close low high".split(" "),k=0;k<g.length;k++){var l=g[k];"value"!=l&&"error"!=l&&f&&(c=l.charAt(0).toUpperCase()+l.slice(1));var m=a[b[l+"Field"]+c];h=Number(m);isNaN(h)||(e[l]=h);"date"==b.valueAxis.type&&void 0!==m&&(h=d.getDate(m,b.chart.dataDateFormat),
e[l]=h.getTime())}return e},parseGraphData:function(a){var b=a.dataProvider,c=a.seriesIdField;c||(c=this.seriesIdField);c||(c=this.categoryField);var e;for(e=0;e<b.length;e++){var d=b[e],f=this.lookupTable[String(d[c])],g=a.valueAxis.id;f&&(g=f.axes[g].graphs[a.id],g.serialDataItem=f,g.values=this.processValues(d,a,a.periodValue),this.processFields(a,g,d))}},addValueAxis:function(a){a.chart=this;this.valueAxes.push(a);this.validateData()},removeValueAxesAndGraphs:function(){var a=this.valueAxes,b;
for(b=a.length-1;-1<b;b--)this.removeValueAxis(a[b])},removeValueAxis:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--){var e=b[c];e&&e.valueAxis==a&&this.removeGraph(e)}b=this.valueAxes;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);this.validateData()},addGraph:function(a){this.graphs.push(a);this.chooseGraphColor(a,this.graphs.length-1);this.validateData()},removeGraph:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--)b[c]==a&&(b.splice(c,1),a.destroy());this.validateData()},
processValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],c=d.processObject(c,d.ValueAxis,this.theme);a[b]=c;c.chart=this;c.id||(c.id="valueAxisAuto"+b+"_"+(new Date).getTime());void 0===c.usePrefixes&&(c.usePrefixes=this.usePrefixes)}},processGuides:function(){var a=this.guides,b=this.categoryAxis;if(a)for(var c=0;c<a.length;c++){var e=a[c];(void 0!==e.category||void 0!==e.date)&&b&&b.addGuide(e);e.id||(e.id="guideAuto"+c+"_"+(new Date).getTime());var h=e.valueAxis;h?
(d.isString(h)&&(h=this.getValueAxisById(h)),h?h.addGuide(e):this.valueAxes[0].addGuide(e)):isNaN(e.value)||this.valueAxes[0].addGuide(e)}},processGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b],c=d.processObject(c,d.AmGraph,this.theme);a[b]=c;this.chooseGraphColor(c,b);c.chart=this;d.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.id||(c.id="graphAuto"+b+"_"+(new Date).getTime())}},formatString:function(a,
b,c){var e=b.graph,h=e.valueAxis;h.duration&&b.values.value&&(h=d.formatDuration(b.values.value,h.duration,"",h.durationUnits,h.maxInterval,h.numberFormatter),a=a.split("[[value]]").join(h));a=d.massReplace(a,{"[[title]]":e.title,"[[description]]":b.description});a=c?d.fixNewLines(a):d.fixBrakes(a);return a=d.cleanFromEmpty(a)},getBalloonColor:function(a,b,c){var e=a.lineColor,d=a.balloonColor;c&&(d=e);c=a.fillColorsR;"object"==typeof c?e=c[0]:void 0!==c&&(e=c);b.isNegative&&(c=a.negativeLineColor,
a=a.negativeFillColors,"object"==typeof a?c=a[0]:void 0!==a&&(c=a),void 0!==c&&(e=c));void 0!==b.color&&(e=b.color);void 0===d&&(d=e);return d},getGraphById:function(a){return d.getObjById(this.graphs,a)},getValueAxisById:function(a){return d.getObjById(this.valueAxes,a)},processFields:function(a,b,c){if(a.itemColors){var e=a.itemColors,h=b.index;b.color=h<e.length?e[h]:d.randomColor()}e="lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className".split(" ");
for(h=0;h<e.length;h++){var f=e[h],g=a[f+"Field"];g&&(g=c[g],d.isDefined(g)&&(b[f]=g))}b.dataContext=c},chooseGraphColor:function(a,b){if(a.lineColor)a.lineColorR=a.lineColor;else{var c;c=this.colors.length>b?this.colors[b]:d.randomColor();a.lineColorR=c}a.fillColorsR=a.fillColors?a.fillColors:a.lineColorR;a.bulletBorderColorR=a.bulletBorderColor?a.bulletBorderColor:a.useLineColorForBulletBorder?a.lineColorR:a.bulletColor;a.bulletColorR=a.bulletColor?a.bulletColor:a.lineColorR;if(c=this.patterns)a.pattern=
c[b]},handleLegendEvent:function(a){var b=a.type;a=a.dataItem;if(!this.legend.data&&a){var c=a.hidden,e=a.showBalloon;switch(b){case "clickMarker":this.textClickEnabled&&(e?this.hideGraphsBalloon(a):this.showGraphsBalloon(a));break;case "clickLabel":e?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case "rollOverItem":c||this.highlightGraph(a);break;case "rollOutItem":c||this.unhighlightGraph();break;case "hideItem":this.hideGraph(a);break;case "showItem":this.showGraph(a)}}},highlightGraph:function(a){var b=
this.graphs,c,e=.2;this.legend&&(e=this.legend.rollOverGraphAlpha);if(1!=e)for(c=0;c<b.length;c++){var d=b[c];d!=a&&d.changeOpacity(e)}},unhighlightGraph:function(){var a;this.legend&&(a=this.legend.rollOverGraphAlpha);if(1!=a){a=this.graphs;var b;for(b=0;b<a.length;b++)a[b].changeOpacity(1)}},showGraph:function(a){a.switchable&&(a.hidden=!1,this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),this.chartCreated&&this.initChart())},hideGraph:function(a){a.switchable&&(this.dataChanged=!0,
"xy"!=this.type&&(this.marginsUpdated=!1),a.hidden=!0,this.chartCreated&&this.initChart())},hideGraphsBalloon:function(a){a.showBalloon=!1;this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=!0;this.updateLegend()},updateLegend:function(){this.legend&&this.legend.invalidateSize()},resetAnimation:function(){var a=this.graphs;if(a){var b;for(b=0;b<a.length;b++)a[b].animationPlayed=!1}},animateAgain:function(){this.resetAnimation();this.validateNow()}})})();(function(){var d=window.AmCharts;d.AmSlicedChart=d.Class({inherits:d.AmChart,construct:function(a){this.createEvents("rollOverSlice","rollOutSlice","clickSlice","pullOutSlice","pullInSlice","rightClickSlice");d.AmSlicedChart.base.construct.call(this,a);this.colors="#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");this.alpha=1;this.groupPercent=0;this.groupedTitle="Other";
this.groupedPulled=!1;this.groupedAlpha=1;this.marginLeft=0;this.marginBottom=this.marginTop=10;this.marginRight=0;this.hoverAlpha=1;this.outlineColor="#FFFFFF";this.outlineAlpha=0;this.outlineThickness=1;this.startAlpha=0;this.startDuration=1;this.startEffect="bounce";this.sequencedAnimation=!0;this.pullOutDuration=1;this.pullOutEffect="bounce";this.pullOnHover=this.pullOutOnlyOne=!1;this.labelsEnabled=!0;this.labelTickColor="#000000";this.labelTickAlpha=.2;this.hideLabelsPercent=0;this.urlTarget=
"_self";this.autoMarginOffset=10;this.gradientRatio=[];this.maxLabelWidth=200;d.applyTheme(this,a,"AmSlicedChart")},initChart:function(){d.AmSlicedChart.base.initChart.call(this);this.dataChanged&&(this.parseData(),this.dispatchDataUpdated=!0,this.dataChanged=!1,this.setLegendData(this.chartData));this.drawChart()},handleLegendEvent:function(a){var b=a.type,c=a.dataItem,e=this.legend;if(!e.data&&c){var d=c.hidden;a=a.event;switch(b){case "clickMarker":d||e.switchable||this.clickSlice(c,a);break;case "clickLabel":d||
this.clickSlice(c,a,!1);break;case "rollOverItem":d||this.rollOverSlice(c,!1,a);break;case "rollOutItem":d||this.rollOutSlice(c,a);break;case "hideItem":this.hideSlice(c,a);break;case "showItem":this.showSlice(c,a)}}},invalidateVisibility:function(){this.recalculatePercents();this.initChart();var a=this.legend;a&&a.invalidateSize()},addEventListeners:function(a,b){var c=this;a.mouseover(function(a){c.rollOverSlice(b,!0,a)}).mouseout(function(a){c.rollOutSlice(b,a)}).touchend(function(a){c.rollOverSlice(b,
a);c.panEventsEnabled&&c.clickSlice(b,a)}).touchstart(function(a){c.rollOverSlice(b,a)}).click(function(a){c.clickSlice(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},formatString:function(a,b,c){a=d.formatValue(a,b,["value"],this.nf,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);var e=this.pf.precision;isNaN(this.tempPrec)||(this.pf.precision=this.tempPrec);a=d.formatValue(a,b,["percents"],this.pf);a=d.massReplace(a,{"[[title]]":b.title,"[[description]]":b.description});
this.pf.precision=e;-1!=a.indexOf("[[")&&(a=d.formatDataContextValue(a,b.dataContext));a=c?d.fixNewLines(a):d.fixBrakes(a);return a=d.cleanFromEmpty(a)},startSlices:function(){var a;for(a=0;a<this.chartData.length;a++)0<this.startDuration&&this.sequencedAnimation?this.setStartTO(a):this.startSlice(this.chartData[a])},setStartTO:function(a){var b=this;a=setTimeout(function(){b.startSequenced.call(b)},b.startDuration/b.chartData.length*500*a);b.timeOuts.push(a)},pullSlices:function(a){var b=this.chartData,
c;for(c=0;c<b.length;c++){var e=b[c];e.pulled&&this.pullSlice(e,1,a)}},startSequenced:function(){var a=this.chartData,b;for(b=0;b<a.length;b++)if(!a[b].started){this.startSlice(this.chartData[b]);break}},startSlice:function(a){a.started=!0;var b=a.wedge,c=this.startDuration;b&&0<c&&(0<a.alpha&&b.show(),b.translate(a.startX,a.startY),b.animate({opacity:1,translate:"0,0"},c,this.startEffect))},showLabels:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(0<c.alpha){var e=c.label;
e&&e.show();(c=c.tick)&&c.show()}}},showSlice:function(a){isNaN(a)?a.hidden=!1:this.chartData[a].hidden=!1;this.invalidateVisibility()},hideSlice:function(a){isNaN(a)?a.hidden=!0:this.chartData[a].hidden=!0;this.hideBalloon();this.invalidateVisibility()},rollOverSlice:function(a,b,c){isNaN(a)||(a=this.chartData[a]);clearTimeout(this.hoverInt);if(!a.hidden){this.pullOnHover&&this.pullSlice(a,1);1>this.hoverAlpha&&a.wedge&&a.wedge.attr({opacity:this.hoverAlpha});var e=a.balloonX,h=a.balloonY;a.pulled&&
(e+=a.pullX,h+=a.pullY);var f=this.formatString(this.balloonText,a,!0),g=this.balloonFunction;g&&(f=g(a,f));g=d.adjustLuminosity(a.color,-.15);f?this.showBalloon(f,g,b,e,h):this.hideBalloon();0===a.value&&this.hideBalloon();a={type:"rollOverSlice",dataItem:a,chart:this,event:c};this.fire(a.type,a)}},rollOutSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);a.wedge&&a.wedge.attr({opacity:1});this.hideBalloon();var c={type:"rollOutSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},clickSlice:function(a,
b,c){isNaN(a)||(a=this.chartData[a]);a.pulled?this.pullSlice(a,0):this.pullSlice(a,1);d.getURL(a.url,this.urlTarget);c||(a={type:"clickSlice",dataItem:a,chart:this,event:b},this.fire(a.type,a))},handleRightClick:function(a,b){isNaN(a)||(a=this.chartData[a]);var c={type:"rightClickSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},drawTicks:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(c.label){var e=c.ty,e=d.line(this.container,[c.tx0,c.tx,c.tx2],[c.ty0,e,e],this.labelTickColor,
this.labelTickAlpha);d.setCN(this,e,this.type+"-tick");d.setCN(this,e,c.className,!0);c.tick=e;c.wedge.push(e)}}},initialStart:function(){var a=this,b=a.startDuration,c=setTimeout(function(){a.showLabels.call(a)},1E3*b);a.timeOuts.push(c);a.chartCreated?a.pullSlices(!0):(a.startSlices(),0<b?(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b)):a.pullSlices(!0))},pullSlice:function(a,b,c){var e=this.pullOutDuration;!0===c&&(e=0);(c=a.wedge)&&(0<e?c.animate({translate:b*a.pullX+
","+b*a.pullY},e,this.pullOutEffect):c.translate(b*a.pullX,b*a.pullY));1==b?(a.pulled=!0,this.pullOutOnlyOne&&this.pullInAll(a.index),a={type:"pullOutSlice",dataItem:a,chart:this}):(a.pulled=!1,a={type:"pullInSlice",dataItem:a,chart:this});this.fire(a.type,a)},pullInAll:function(a){var b=this.chartData,c;for(c=0;c<this.chartData.length;c++)c!=a&&b[c].pulled&&this.pullSlice(b[c],0)},pullOutAll:function(){var a=this.chartData,b;for(b=0;b<a.length;b++)a[b].pulled||this.pullSlice(a[b],1)},parseData:function(){var a=
[];this.chartData=a;var b=this.dataProvider;isNaN(this.pieAlpha)||(this.alpha=this.pieAlpha);if(void 0!==b){var c=b.length,e=0,h,f,g;for(h=0;h<c;h++){f={};var k=b[h];f.dataContext=k;f.value=Number(k[this.valueField]);(g=k[this.titleField])||(g="");f.title=g;f.pulled=d.toBoolean(k[this.pulledField],!1);(g=k[this.descriptionField])||(g="");f.description=g;f.labelRadius=Number(k[this.labelRadiusField]);f.switchable=!0;f.className=k[this.classNameField];f.url=k[this.urlField];g=k[this.patternField];!g&&
this.patterns&&(g=this.patterns[h]);f.pattern=g;f.visibleInLegend=d.toBoolean(k[this.visibleInLegendField],!0);g=k[this.alphaField];f.alpha=void 0!==g?Number(g):this.alpha;g=k[this.colorField];void 0!==g&&(f.color=g);f.labelColor=d.toColor(k[this.labelColorField]);e+=f.value;f.hidden=!1;a[h]=f}for(h=b=0;h<c;h++)f=a[h],f.percents=f.value/e*100,f.percents<this.groupPercent&&b++;1<b&&(this.groupValue=0,this.removeSmallSlices(),a.push({title:this.groupedTitle,value:this.groupValue,percents:this.groupValue/
e*100,pulled:this.groupedPulled,color:this.groupedColor,url:this.groupedUrl,description:this.groupedDescription,alpha:this.groupedAlpha,pattern:this.groupedPattern,className:this.groupedClassName,dataContext:{}}));c=this.baseColor;c||(c=this.pieBaseColor);e=this.brightnessStep;e||(e=this.pieBrightnessStep);for(h=0;h<a.length;h++)c?g=d.adjustLuminosity(c,h*e/100):(g=this.colors[h],void 0===g&&(g=d.randomColor())),void 0===a[h].color&&(a[h].color=g);this.recalculatePercents()}},recalculatePercents:function(){var a=
this.chartData,b=0,c,e;for(c=0;c<a.length;c++)e=a[c],!e.hidden&&0<e.value&&(b+=e.value);for(c=0;c<a.length;c++)e=this.chartData[c],e.percents=!e.hidden&&0<e.value?100*e.value/b:0},removeSmallSlices:function(){var a=this.chartData,b;for(b=a.length-1;0<=b;b--)a[b].percents<this.groupPercent&&(this.groupValue+=a[b].value,a.splice(b,1))},animateAgain:function(){var a=this;a.startSlices();for(var b=0;b<a.chartData.length;b++){var c=a.chartData[b];c.started=!1;var e=c.wedge;e&&e.translate(c.startX,c.startY)}b=
a.startDuration;0<b?(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b)):a.pullSlices()},measureMaxLabel:function(){var a=this.chartData,b=0,c;for(c=0;c<a.length;c++){var e=a[c],h=this.formatString(this.labelText,e),f=this.labelFunction;f&&(h=f(e,h));e=d.text(this.container,h,this.color,this.fontFamily,this.fontSize);h=e.getBBox().width;h>b&&(b=h);e.remove()}return b}})})();(function(){var d=window.AmCharts;d.AmRectangularChart=d.Class({inherits:d.AmCoordinateChart,construct:function(a){d.AmRectangularChart.base.construct.call(this,a);this.theme=a;this.createEvents("zoomed");this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=20;this.verticalPosition=this.horizontalPosition=this.depth3D=this.angle=0;this.heightMultiplier=this.widthMultiplier=1;this.plotAreaFillColors="#FFFFFF";this.plotAreaFillAlphas=0;this.plotAreaBorderColor="#000000";this.plotAreaBorderAlpha=
0;this.zoomOutButtonImageSize=19;this.zoomOutButtonImage="lens.png";this.zoomOutText="Show all";this.zoomOutButtonColor="#e5e5e5";this.zoomOutButtonAlpha=0;this.zoomOutButtonRollOverAlpha=1;this.zoomOutButtonPadding=8;this.trendLines=[];this.autoMargins=!0;this.marginsUpdated=!1;this.autoMarginOffset=10;d.applyTheme(this,a,"AmRectangularChart")},initChart:function(){d.AmRectangularChart.base.initChart.call(this);this.updateDxy();var a=!0;!this.marginsUpdated&&this.autoMargins&&(this.resetMargins(),
a=!1);this.processScrollbars();this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();a&&(this.scrollbarOnly||this.updateGraphs())},drawChart:function(){d.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();if(d.ifArray(this.chartData)){var a=this.chartCursor;a&&a.draw()}},resetMargins:function(){var a={},b;if("xy"==this.type){var c=this.xAxes,e=this.yAxes;for(b=0;b<c.length;b++){var d=c[b];d.ignoreAxisWidth||
(d.setOrientation(!0),d.fixAxisPosition(),a[d.position]=!0)}for(b=0;b<e.length;b++)c=e[b],c.ignoreAxisWidth||(c.setOrientation(!1),c.fixAxisPosition(),a[c.position]=!0)}else{e=this.valueAxes;for(b=0;b<e.length;b++)c=e[b],c.ignoreAxisWidth||(c.setOrientation(this.rotate),c.fixAxisPosition(),a[c.position]=!0);(b=this.categoryAxis)&&!b.ignoreAxisWidth&&(b.setOrientation(!this.rotate),b.fixAxisPosition(),b.fixAxisPosition(),a[b.position]=!0)}a.left&&(this.marginLeft=0);a.right&&(this.marginRight=0);a.top&&
(this.marginTop=0);a.bottom&&(this.marginBottom=0);this.fixMargins=a},measureMargins:function(){var a=this.valueAxes,b,c=this.autoMarginOffset,e=this.fixMargins,d=this.realWidth,f=this.realHeight,g=c,k=c,l=d;b=f;var m;for(m=0;m<a.length;m++)a[m].handleSynchronization(),b=this.getAxisBounds(a[m],g,l,k,b),g=Math.round(b.l),l=Math.round(b.r),k=Math.round(b.t),b=Math.round(b.b);if(a=this.categoryAxis)b=this.getAxisBounds(a,g,l,k,b),g=Math.round(b.l),l=Math.round(b.r),k=Math.round(b.t),b=Math.round(b.b);
e.left&&g<c&&(this.marginLeft=Math.round(-g+c));e.right&&l>=d-c&&(this.marginRight=Math.round(l-d+c));e.top&&k<c+this.titleHeight&&(this.marginTop=Math.round(this.marginTop-k+c+this.titleHeight));e.bottom&&b>f-c&&(this.marginBottom=Math.round(this.marginBottom+b-f+c));this.initChart()},getAxisBounds:function(a,b,c,e,d){if(!a.ignoreAxisWidth){var f=a.labelsSet,g=a.tickLength;a.inside&&(g=0);if(f)switch(f=a.getBBox(),a.position){case "top":a=f.y;e>a&&(e=a);break;case "bottom":a=f.y+f.height;d<a&&(d=
a);break;case "right":a=f.x+f.width+g+3;c<a&&(c=a);break;case "left":a=f.x-g,b>a&&(b=a)}}return{l:b,t:e,r:c,b:d}},drawZoomOutButton:function(){var a=this;if(!a.zbSet){var b=a.container.set();a.zoomButtonSet.push(b);var c=a.color,e=a.fontSize,h=a.zoomOutButtonImageSize,f=a.zoomOutButtonImage,g=d.lang.zoomOutText||a.zoomOutText,k=a.zoomOutButtonColor,l=a.zoomOutButtonAlpha,m=a.zoomOutButtonFontSize,n=a.zoomOutButtonPadding;isNaN(m)||(e=m);(m=a.zoomOutButtonFontColor)&&(c=m);var m=a.zoomOutButton,q;
m&&(m.fontSize&&(e=m.fontSize),m.color&&(c=m.color),m.backgroundColor&&(k=m.backgroundColor),isNaN(m.backgroundAlpha)||(a.zoomOutButtonRollOverAlpha=m.backgroundAlpha));var p=m=0;void 0!==a.pathToImages&&f&&(q=a.container.image(a.pathToImages+f,0,0,h,h),d.setCN(a,q,"zoom-out-image"),b.push(q),q=q.getBBox(),m=q.width+5);void 0!==g&&(c=d.text(a.container,g,c,a.fontFamily,e,"start"),d.setCN(a,c,"zoom-out-label"),e=c.getBBox(),p=q?q.height/2-3:e.height/2,c.translate(m,p),b.push(c));q=b.getBBox();c=1;
d.isModern||(c=0);k=d.rect(a.container,q.width+2*n+5,q.height+2*n-2,k,1,1,k,c);k.setAttr("opacity",l);k.translate(-n,-n);d.setCN(a,k,"zoom-out-bg");b.push(k);k.toBack();a.zbBG=k;q=k.getBBox();b.translate(a.marginLeftReal+a.plotAreaWidth-q.width+n,a.marginTopReal+n);b.hide();b.mouseover(function(){a.rollOverZB()}).mouseout(function(){a.rollOutZB()}).click(function(){a.clickZB()}).touchstart(function(){a.rollOverZB()}).touchend(function(){a.rollOutZB();a.clickZB()});for(l=0;l<b.length;l++)b[l].attr({cursor:"pointer"});
a.zbSet=b}},rollOverZB:function(){this.zbBG.setAttr("opacity",this.zoomOutButtonRollOverAlpha)},rollOutZB:function(){this.zbBG.setAttr("opacity",this.zoomOutButtonAlpha)},clickZB:function(){this.zoomOut()},zoomOut:function(){this.updateScrollbar=!0;this.zoom()},drawPlotArea:function(){var a=this.dx,b=this.dy,c=this.marginLeftReal,e=this.marginTopReal,h=this.plotAreaWidth-1,f=this.plotAreaHeight-1,g=this.plotAreaFillColors,k=this.plotAreaFillAlphas,l=this.plotAreaBorderColor,m=this.plotAreaBorderAlpha;
"object"==typeof k&&(k=k[0]);g=d.polygon(this.container,[0,h,h,0,0],[0,0,f,f,0],g,k,1,l,m,this.plotAreaGradientAngle);d.setCN(this,g,"plot-area");g.translate(c+a,e+b);this.set.push(g);0!==a&&0!==b&&(g=this.plotAreaFillColors,"object"==typeof g&&(g=g[0]),g=d.adjustLuminosity(g,-.15),h=d.polygon(this.container,[0,a,h+a,h,0],[0,b,b,0,0],g,k,1,l,m),d.setCN(this,h,"plot-area-bottom"),h.translate(c,e+f),this.set.push(h),a=d.polygon(this.container,[0,0,a,a,0],[0,f,f+b,b,0],g,k,1,l,m),d.setCN(this,a,"plot-area-left"),
a.translate(c,e),this.set.push(a));(c=this.bbset)&&this.scrollbarOnly&&c.remove()},updatePlotArea:function(){var a=this.updateWidth(),b=this.updateHeight(),c=this.container;this.realWidth=a;this.realWidth=b;c&&this.container.setSize(a,b);a=a-this.marginLeftReal-this.marginRightReal-this.dx;b=b-this.marginTopReal-this.marginBottomReal;1>a&&(a=1);1>b&&(b=1);this.plotAreaWidth=Math.round(a);this.plotAreaHeight=Math.round(b)},updateDxy:function(){this.dx=Math.round(this.depth3D*Math.cos(this.angle*Math.PI/
180));this.dy=Math.round(-this.depth3D*Math.sin(this.angle*Math.PI/180));this.d3x=Math.round(this.columnSpacing3D*Math.cos(this.angle*Math.PI/180));this.d3y=Math.round(-this.columnSpacing3D*Math.sin(this.angle*Math.PI/180))},updateMargins:function(){var a=this.getTitleHeight();this.titleHeight=a;this.marginTopReal=this.marginTop-this.dy;this.fixMargins&&!this.fixMargins.top&&(this.marginTopReal+=a);this.marginBottomReal=this.marginBottom;this.marginLeftReal=this.marginLeft;this.marginRightReal=this.marginRight},
updateValueAxes:function(){var a=this.valueAxes,b=this.marginLeftReal,c=this.marginTopReal,e=this.plotAreaHeight,h=this.plotAreaWidth,f;for(f=0;f<a.length;f++){var g=a[f];g.axisRenderer=d.RecAxis;g.guideFillRenderer=d.RecFill;g.axisItemRenderer=d.RecItem;g.dx=this.dx;g.dy=this.dy;g.viW=h-1;g.viH=e-1;g.marginsChanged=!0;g.viX=b;g.viY=c;this.updateObjectSize(g)}},updateObjectSize:function(a){a.width=(this.plotAreaWidth-1)*this.widthMultiplier;a.height=(this.plotAreaHeight-1)*this.heightMultiplier;a.x=
this.marginLeftReal+this.horizontalPosition;a.y=this.marginTopReal+this.verticalPosition},updateGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.x=this.marginLeftReal+this.horizontalPosition;c.y=this.marginTopReal+this.verticalPosition;c.width=this.plotAreaWidth*this.widthMultiplier;c.height=this.plotAreaHeight*this.heightMultiplier;c.index=b;c.dx=this.dx;c.dy=this.dy;c.rotate=this.rotate}},updateChartCursor:function(){var a=this.chartCursor;a&&(a=d.processObject(a,d.ChartCursor,
this.theme),this.addChartCursor(a),a.x=this.marginLeftReal,a.y=this.marginTopReal,a.width=this.plotAreaWidth-1,a.height=this.plotAreaHeight-1,a.chart=this)},processScrollbars:function(){var a=this.chartScrollbar;a&&(a=d.processObject(a,d.ChartScrollbar,this.theme),this.addChartScrollbar(a))},updateScrollbars:function(){},addChartCursor:function(a){d.callMethod("destroy",[this.chartCursor]);a&&(this.listenTo(a,"changed",this.handleCursorChange),this.listenTo(a,"zoomed",this.handleCursorZoom));this.chartCursor=
a},removeChartCursor:function(){d.callMethod("destroy",[this.chartCursor]);this.chartCursor=null},zoomTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b];c.valueAxis.recalculateToPercents?c.set&&c.set.hide():(c.x=this.marginLeftReal+this.horizontalPosition,c.y=this.marginTopReal+this.verticalPosition,c.draw())}},addTrendLine:function(a){this.trendLines.push(a)},removeTrendLine:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},adjustMargins:function(a,
b){var c=a.position,e=a.scrollbarHeight+a.offset;a.enabled&&("top"==c?b?this.marginLeftReal+=e:this.marginTopReal+=e:b?this.marginRightReal+=e:this.marginBottomReal+=e)},getScrollbarPosition:function(a,b,c){var e="bottom",d="top";a.oppositeAxis||(d=e,e="top");a.position=b?"bottom"==c||"left"==c?e:d:"top"==c||"right"==c?e:d},updateChartScrollbar:function(a,b){if(a){a.rotate=b;var c=this.marginTopReal,e=this.marginLeftReal,d=a.scrollbarHeight,f=this.dx,g=this.dy,k=a.offset;"top"==a.position?b?(a.y=
c,a.x=e-d-k):(a.y=c-d+g-k,a.x=e+f):b?(a.y=c+g,a.x=e+this.plotAreaWidth+f+k):(a.y=c+this.plotAreaHeight+k,a.x=this.marginLeftReal)}},showZB:function(a){var b=this.zbSet;a&&(b=this.zoomOutText,""!==b&&b&&this.drawZoomOutButton());if(b=this.zbSet)this.zoomButtonSet.push(b),a?b.show():b.hide(),this.rollOutZB()},handleReleaseOutside:function(a){d.AmRectangularChart.base.handleReleaseOutside.call(this,a);(a=this.chartCursor)&&a.handleReleaseOutside&&a.handleReleaseOutside()},handleMouseDown:function(a){d.AmRectangularChart.base.handleMouseDown.call(this,
a);var b=this.chartCursor;b&&b.handleMouseDown(a)},handleCursorChange:function(){},update:function(){d.AmRectangularChart.base.update.call(this);this.chartCursor&&this.chartCursor.update&&this.chartCursor.update()}})})();(function(){var d=window.AmCharts;d.TrendLine=d.Class({construct:function(a){this.cname="TrendLine";this.createEvents("click");this.isProtected=!1;this.dashLength=0;this.lineColor="#00CC00";this.lineThickness=this.lineAlpha=1;d.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container,e,h,f,g,k=a.categoryAxis,l=a.initialDate,m=a.initialCategory,n=a.finalDate,q=a.finalCategory,p=a.valueAxis,r=a.valueAxisX,t=a.initialXValue,u=a.finalXValue,z=a.initialValue,v=
a.finalValue,w=p.recalculateToPercents,x=b.dataDateFormat;k&&(l&&(l=d.getDate(l,x,"fff"),a.initialDate=l,e=k.dateToCoordinate(l)),m&&(e=k.categoryToCoordinate(m)),n&&(n=d.getDate(n,x,"fff"),a.finalDate=n,h=k.dateToCoordinate(n)),q&&(h=k.categoryToCoordinate(q)));r&&!w&&(isNaN(t)||(e=r.getCoordinate(t)),isNaN(u)||(h=r.getCoordinate(u)));p&&!w&&(isNaN(z)||(f=p.getCoordinate(z)),isNaN(v)||(g=p.getCoordinate(v)));isNaN(e)||isNaN(h)||isNaN(f)||isNaN(f)||(b.rotate?(k=[f,g],h=[e,h]):(k=[e,h],h=[f,g]),f=
a.lineColor,e=d.line(c,k,h,f,a.lineAlpha,a.lineThickness,a.dashLength),g=k,l=h,q=k[1]-k[0],p=h[1]-h[0],0===q&&(q=.01),0===p&&(p=.01),m=q/Math.abs(q),n=p/Math.abs(p),p=q*p/Math.abs(q*p)*Math.sqrt(Math.pow(q,2)+Math.pow(p,2)),q=Math.asin(q/p),p=90*Math.PI/180-q,q=Math.abs(5*Math.cos(p)),p=Math.abs(5*Math.sin(p)),g.push(k[1]-m*p,k[0]-m*p),l.push(h[1]+n*q,h[0]+n*q),k=d.polygon(c,g,l,f,.005,0),c=c.set([k,e]),c.translate(b.marginLeftReal,b.marginTopReal),b.trendLinesSet.push(c),d.setCN(b,e,"trend-line"),
d.setCN(b,e,"trend-line-"+a.id),a.line=e,a.set=c,k.mouseup(function(){a.handleLineClick()}).mouseover(function(){a.handleLineOver()}).mouseout(function(){a.handleLineOut()}),k.touchend&&k.touchend(function(){a.handleLineClick()}),c.clipRect(0,0,b.plotAreaWidth,b.plotAreaHeight))},handleLineClick:function(){var a={type:"click",trendLine:this,chart:this.chart};this.fire(a.type,a)},handleLineOver:function(){var a=this.rollOverColor;void 0!==a&&this.line.attr({stroke:a})},handleLineOut:function(){this.line.attr({stroke:this.lineColor})},
destroy:function(){d.remove(this.set)}})})();(function(){var d=window.AmCharts;d.circle=function(a,b,c,e,h,f,g,k,l){0>=b&&(b=.001);if(void 0==h||0===h)h=.01;void 0===f&&(f="#000000");void 0===g&&(g=0);e={fill:c,stroke:f,"fill-opacity":e,"stroke-width":h,"stroke-opacity":g};a=isNaN(l)?a.circle(0,0,b).attr(e):a.ellipse(0,0,b,l).attr(e);k&&a.gradient("radialGradient",[c,d.adjustLuminosity(c,-.6)]);return a};d.text=function(a,b,c,e,h,f,g,k){f||(f="middle");"right"==f&&(f="end");"left"==f&&(f="start");isNaN(k)&&(k=1);void 0!==b&&(b=String(b),d.isIE&&
!d.isModern&&(b=b.replace("&amp;","&"),b=b.replace("&","&amp;")));c={fill:c,"font-family":e,"font-size":h,opacity:k};!0===g&&(c["font-weight"]="bold");c["text-anchor"]=f;return a.text(b,c)};d.polygon=function(a,b,c,e,h,f,g,k,l,m,n){isNaN(f)&&(f=.01);isNaN(k)&&(k=h);var q=e,p=!1;"object"==typeof q&&1<q.length&&(p=!0,q=q[0]);void 0===g&&(g=q);h={fill:q,stroke:g,"fill-opacity":h,"stroke-width":f,"stroke-opacity":k};void 0!==n&&0<n&&(h["stroke-dasharray"]=n);n=d.dx;f=d.dy;a.handDrawn&&(c=d.makeHD(b,c,
a.handDrawScatter),b=c[0],c=c[1]);g=Math.round;m&&(g=d.doNothing);m="M"+(g(b[0])+n)+","+(g(c[0])+f);for(k=1;k<b.length;k++)m+=" L"+(g(b[k])+n)+","+(g(c[k])+f);a=a.path(m+" Z").attr(h);p&&a.gradient("linearGradient",e,l);return a};d.rect=function(a,b,c,e,h,f,g,k,l,m,n){if(isNaN(b)||isNaN(c))return a.set();isNaN(f)&&(f=0);void 0===l&&(l=0);void 0===m&&(m=270);isNaN(h)&&(h=0);var q=e,p=!1;"object"==typeof q&&(q=q[0],p=!0);void 0===g&&(g=q);void 0===k&&(k=h);b=Math.round(b);c=Math.round(c);var r=0,t=
0;0>b&&(b=Math.abs(b),r=-b);0>c&&(c=Math.abs(c),t=-c);r+=d.dx;t+=d.dy;h={fill:q,stroke:g,"fill-opacity":h,"stroke-opacity":k};void 0!==n&&0<n&&(h["stroke-dasharray"]=n);a=a.rect(r,t,b,c,l,f).attr(h);p&&a.gradient("linearGradient",e,m);return a};d.bullet=function(a,b,c,e,h,f,g,k,l,m,n,q){var p;"circle"==b&&(b="round");switch(b){case "round":p=d.circle(a,c/2,e,h,f,g,k);break;case "square":p=d.polygon(a,[-c/2,c/2,c/2,-c/2],[c/2,c/2,-c/2,-c/2],e,h,f,g,k,m-180);break;case "rectangle":p=d.polygon(a,[-c,
c,c,-c],[c/2,c/2,-c/2,-c/2],e,h,f,g,k,m-180);break;case "diamond":p=d.polygon(a,[-c/2,0,c/2,0],[0,-c/2,0,c/2],e,h,f,g,k);break;case "triangleUp":p=d.triangle(a,c,0,e,h,f,g,k);break;case "triangleDown":p=d.triangle(a,c,180,e,h,f,g,k);break;case "triangleLeft":p=d.triangle(a,c,270,e,h,f,g,k);break;case "triangleRight":p=d.triangle(a,c,90,e,h,f,g,k);break;case "bubble":p=d.circle(a,c/2,e,h,f,g,k,!0);break;case "line":p=d.line(a,[-c/2,c/2],[0,0],e,h,f,g,k);break;case "yError":p=a.set();p.push(d.line(a,
[0,0],[-c/2,c/2],e,h,f));p.push(d.line(a,[-l,l],[-c/2,-c/2],e,h,f));p.push(d.line(a,[-l,l],[c/2,c/2],e,h,f));break;case "xError":p=a.set(),p.push(d.line(a,[-c/2,c/2],[0,0],e,h,f)),p.push(d.line(a,[-c/2,-c/2],[-l,l],e,h,f)),p.push(d.line(a,[c/2,c/2],[-l,l],e,h,f))}p&&p.pattern(n,NaN,q);return p};d.triangle=function(a,b,c,e,d,f,g,k){if(void 0===f||0===f)f=1;void 0===g&&(g="#000");void 0===k&&(k=0);e={fill:e,stroke:g,"fill-opacity":d,"stroke-width":f,"stroke-opacity":k};b/=2;var l;0===c&&(l=" M"+-b+
","+b+" L0,"+-b+" L"+b+","+b+" Z");180==c&&(l=" M"+-b+","+-b+" L0,"+b+" L"+b+","+-b+" Z");90==c&&(l=" M"+-b+","+-b+" L"+b+",0 L"+-b+","+b+" Z");270==c&&(l=" M"+-b+",0 L"+b+","+b+" L"+b+","+-b+" Z");return a.path(l).attr(e)};d.line=function(a,b,c,e,h,f,g,k,l,m,n){if(a.handDrawn&&!n)return d.handDrawnLine(a,b,c,e,h,f,g,k,l,m,n);f={fill:"none","stroke-width":f};void 0!==g&&0<g&&(f["stroke-dasharray"]=g);isNaN(h)||(f["stroke-opacity"]=h);e&&(f.stroke=e);e=Math.round;m&&(e=d.doNothing);m=d.dx;h=d.dy;g=
"M"+(e(b[0])+m)+","+(e(c[0])+h);for(k=1;k<b.length;k++)g+=" L"+(e(b[k])+m)+","+(e(c[k])+h);if(d.VML)return a.path(g,void 0,!0).attr(f);l&&(g+=" M0,0 L0,0");return a.path(g).attr(f)};d.makeHD=function(a,b,c){for(var e=[],d=[],f=1;f<a.length;f++)for(var g=Number(a[f-1]),k=Number(b[f-1]),l=Number(a[f]),m=Number(b[f]),n=Math.sqrt(Math.pow(l-g,2)+Math.pow(m-k,2)),n=Math.round(n/50)+1,l=(l-g)/n,m=(m-k)/n,q=0;q<=n;q++){var p=g+q*l+Math.random()*c,r=k+q*m+Math.random()*c;e.push(p);d.push(r)}return[e,d]};
d.handDrawnLine=function(a,b,c,e,h,f,g,k,l,m){var n,q=a.set();for(n=1;n<b.length;n++)for(var p=[b[n-1],b[n]],r=[c[n-1],c[n]],r=d.makeHD(p,r,a.handDrawScatter),p=r[0],r=r[1],t=1;t<p.length;t++)q.push(d.line(a,[p[t-1],p[t]],[r[t-1],r[t]],e,h,f+Math.random()*a.handDrawThickness-a.handDrawThickness/2,g,k,l,m,!0));return q};d.doNothing=function(a){return a};d.wedge=function(a,b,c,e,h,f,g,k,l,m,n,q,p){var r=Math.round;f=r(f);g=r(g);k=r(k);var t=r(g/f*k),u=d.VML,z=359.5+f/100;359.94<z&&(z=359.94);h>=z&&
(h=z);var v=1/180*Math.PI,z=b+Math.sin(e*v)*k,w=c-Math.cos(e*v)*t,x=b+Math.sin(e*v)*f,A=c-Math.cos(e*v)*g,B=b+Math.sin((e+h)*v)*f,D=c-Math.cos((e+h)*v)*g,C=b+Math.sin((e+h)*v)*k,v=c-Math.cos((e+h)*v)*t,I={fill:d.adjustLuminosity(m.fill,-.2),"stroke-opacity":0,"fill-opacity":m["fill-opacity"]},H=0;180<Math.abs(h)&&(H=1);e=a.set();var O;u&&(z=r(10*z),x=r(10*x),B=r(10*B),C=r(10*C),w=r(10*w),A=r(10*A),D=r(10*D),v=r(10*v),b=r(10*b),l=r(10*l),c=r(10*c),f*=10,g*=10,k*=10,t*=10,1>Math.abs(h)&&1>=Math.abs(B-
x)&&1>=Math.abs(D-A)&&(O=!0));h="";var J;q&&(I["fill-opacity"]=0,I["stroke-opacity"]=m["stroke-opacity"]/2,I.stroke=m.stroke);0<l&&(J=" M"+z+","+(w+l)+" L"+x+","+(A+l),u?(O||(J+=" A"+(b-f)+","+(l+c-g)+","+(b+f)+","+(l+c+g)+","+x+","+(A+l)+","+B+","+(D+l)),J+=" L"+C+","+(v+l),0<k&&(O||(J+=" B"+(b-k)+","+(l+c-t)+","+(b+k)+","+(l+c+t)+","+C+","+(l+v)+","+z+","+(l+w)))):(J+=" A"+f+","+g+",0,"+H+",1,"+B+","+(D+l)+" L"+C+","+(v+l),0<k&&(J+=" A"+k+","+t+",0,"+H+",0,"+z+","+(w+l))),J=a.path(J+" Z",void 0,
void 0,"1000,1000").attr(I),e.push(J),J=a.path(" M"+z+","+w+" L"+z+","+(w+l)+" L"+x+","+(A+l)+" L"+x+","+A+" L"+z+","+w+" Z",void 0,void 0,"1000,1000").attr(I),l=a.path(" M"+B+","+D+" L"+B+","+(D+l)+" L"+C+","+(v+l)+" L"+C+","+v+" L"+B+","+D+" Z",void 0,void 0,"1000,1000").attr(I),e.push(J),e.push(l));u?(O||(h=" A"+r(b-f)+","+r(c-g)+","+r(b+f)+","+r(c+g)+","+r(x)+","+r(A)+","+r(B)+","+r(D)),f=" M"+r(z)+","+r(w)+" L"+r(x)+","+r(A)+h+" L"+r(C)+","+r(v)):f=" M"+z+","+w+" L"+x+","+A+(" A"+f+","+g+",0,"+
H+",1,"+B+","+D)+" L"+C+","+v;0<k&&(u?O||(f+=" B"+(b-k)+","+(c-t)+","+(b+k)+","+(c+t)+","+C+","+v+","+z+","+w):f+=" A"+k+","+t+",0,"+H+",0,"+z+","+w);a.handDrawn&&(b=d.line(a,[z,x],[w,A],m.stroke,m.thickness*Math.random()*a.handDrawThickness,m["stroke-opacity"]),e.push(b));a=a.path(f+" Z",void 0,void 0,"1000,1000").attr(m);if(n){b=[];for(c=0;c<n.length;c++)b.push(d.adjustLuminosity(m.fill,n[c]));0<b.length&&a.gradient("linearGradient",b)}a.pattern(q,NaN,p);e.wedge=a;e.push(a);return e};d.adjustLuminosity=
function(a,b){a=String(a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=String(a[0])+String(a[0])+String(a[1])+String(a[1])+String(a[2])+String(a[2]));b=b||0;var c="#",d,h;for(h=0;3>h;h++)d=parseInt(a.substr(2*h,2),16),d=Math.round(Math.min(Math.max(0,d+d*b),255)).toString(16),c+=("00"+d).substr(d.length);return c}})();(function(){var d=window.AmCharts;d.Bezier=d.Class({construct:function(a,b,c,e,h,f,g,k,l,m){"object"==typeof g&&(g=g[0]);"object"==typeof k&&(k=k[0]);0===k&&(g="none");f={fill:g,"fill-opacity":k,"stroke-width":f};void 0!==l&&0<l&&(f["stroke-dasharray"]=l);isNaN(h)||(f["stroke-opacity"]=h);e&&(f.stroke=e);e="M"+Math.round(b[0])+","+Math.round(c[0]);h=[];for(l=0;l<b.length;l++)h.push({x:Number(b[l]),y:Number(c[l])});1<h.length&&(b=this.interpolate(h),e+=this.drawBeziers(b));m?e+=m:d.VML||(e+="M0,0 L0,0");
this.path=a.path(e).attr(f);this.node=this.path.node},interpolate:function(a){var b=[];b.push({x:a[0].x,y:a[0].y});var c=a[1].x-a[0].x,e=a[1].y-a[0].y,h=d.bezierX,f=d.bezierY;b.push({x:a[0].x+c/h,y:a[0].y+e/f});var g;for(g=1;g<a.length-1;g++){var k=a[g-1],l=a[g],e=a[g+1];isNaN(e.x)&&(e=l);isNaN(l.x)&&(l=k);isNaN(k.x)&&(k=l);c=e.x-l.x;e=e.y-k.y;k=l.x-k.x;k>c&&(k=c);b.push({x:l.x-k/h,y:l.y-e/f});b.push({x:l.x,y:l.y});b.push({x:l.x+k/h,y:l.y+e/f})}e=a[a.length-1].y-a[a.length-2].y;c=a[a.length-1].x-
a[a.length-2].x;b.push({x:a[a.length-1].x-c/h,y:a[a.length-1].y-e/f});b.push({x:a[a.length-1].x,y:a[a.length-1].y});return b},drawBeziers:function(a){var b="",c;for(c=0;c<(a.length-1)/3;c++)b+=this.drawBezierMidpoint(a[3*c],a[3*c+1],a[3*c+2],a[3*c+3]);return b},drawBezierMidpoint:function(a,b,c,d){var h=Math.round,f=this.getPointOnSegment(a,b,.75),g=this.getPointOnSegment(d,c,.75),k=(d.x-a.x)/16,l=(d.y-a.y)/16,m=this.getPointOnSegment(a,b,.375);a=this.getPointOnSegment(f,g,.375);a.x-=k;a.y-=l;b=this.getPointOnSegment(g,
f,.375);b.x+=k;b.y+=l;c=this.getPointOnSegment(d,c,.375);k=this.getMiddle(m,a);f=this.getMiddle(f,g);g=this.getMiddle(b,c);m=" Q"+h(m.x)+","+h(m.y)+","+h(k.x)+","+h(k.y);m+=" Q"+h(a.x)+","+h(a.y)+","+h(f.x)+","+h(f.y);m+=" Q"+h(b.x)+","+h(b.y)+","+h(g.x)+","+h(g.y);return m+=" Q"+h(c.x)+","+h(c.y)+","+h(d.x)+","+h(d.y)},getMiddle:function(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}},getPointOnSegment:function(a,b,c){return{x:a.x+(b.x-a.x)*c,y:a.y+(b.y-a.y)*c}}})})();(function(){var d=window.AmCharts;d.AmDraw=d.Class({construct:function(a,b,c,e){d.SVG_NS="http://www.w3.org/2000/svg";d.SVG_XLINK="http://www.w3.org/1999/xlink";d.hasSVG=!!document.createElementNS&&!!document.createElementNS(d.SVG_NS,"svg").createSVGRect;1>b&&(b=10);1>c&&(c=10);this.div=a;this.width=b;this.height=c;this.rBin=document.createElement("div");d.hasSVG?(d.SVG=!0,b=this.createSvgElement("svg"),a.appendChild(b),this.container=b,this.addDefs(e),this.R=new d.SVGRenderer(this)):d.isIE&&d.VMLRenderer&&
(d.VML=!0,d.vmlStyleSheet||(document.namespaces.add("amvml","urn:schemas-microsoft-com:vml"),31>document.styleSheets.length?(b=document.createStyleSheet(),b.addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true"),d.vmlStyleSheet=b):document.styleSheets[0].addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true")),this.container=a,this.R=new d.VMLRenderer(this,e),this.R.disableSelection(a))},createSvgElement:function(a){return document.createElementNS(d.SVG_NS,
a)},circle:function(a,b,c,e){var h=new d.AmDObject("circle",this);h.attr({r:c,cx:a,cy:b});this.addToContainer(h.node,e);return h},ellipse:function(a,b,c,e,h){var f=new d.AmDObject("ellipse",this);f.attr({rx:c,ry:e,cx:a,cy:b});this.addToContainer(f.node,h);return f},setSize:function(a,b){0<a&&0<b&&(this.container.style.width=a+"px",this.container.style.height=b+"px")},rect:function(a,b,c,e,h,f,g){var k=new d.AmDObject("rect",this);d.VML&&(h=Math.round(100*h/Math.min(c,e)),c+=2*f,e+=2*f,k.bw=f,k.node.style.marginLeft=
-f,k.node.style.marginTop=-f);1>c&&(c=1);1>e&&(e=1);k.attr({x:a,y:b,width:c,height:e,rx:h,ry:h,"stroke-width":f});this.addToContainer(k.node,g);return k},image:function(a,b,c,e,h,f){var g=new d.AmDObject("image",this);g.attr({x:b,y:c,width:e,height:h});this.R.path(g,a);this.addToContainer(g.node,f);return g},addToContainer:function(a,b){b||(b=this.container);b.appendChild(a)},text:function(a,b,c){return this.R.text(a,b,c)},path:function(a,b,c,e){var h=new d.AmDObject("path",this);e||(e="100,100");
h.attr({cs:e});c?h.attr({dd:a}):h.attr({d:a});this.addToContainer(h.node,b);return h},set:function(a){return this.R.set(a)},remove:function(a){if(a){var b=this.rBin;b.appendChild(a);b.innerHTML=""}},renderFix:function(){var a=this.container,b=a.style,c;try{c=a.getScreenCTM()||a.createSVGMatrix()}catch(d){c=a.createSVGMatrix()}a=1-c.e%1;c=1-c.f%1;.5<a&&--a;.5<c&&--c;a&&(b.left=a+"px");c&&(b.top=c+"px")},update:function(){this.R.update()},addDefs:function(a){if(d.hasSVG){var b=this.createSvgElement("desc"),
c=this.container;c.setAttribute("version","1.1");c.style.position="absolute";this.setSize(this.width,this.height);d.rtl&&(c.setAttribute("direction","rtl"),c.style.left="auto",c.style.right="0px");a.addCodeCredits&&b.appendChild(document.createTextNode("JavaScript chart by amCharts "+a.version));c.appendChild(b);a.defs&&(b=this.createSvgElement("defs"),c.appendChild(b),d.parseDefs(a.defs,b),this.defs=b)}}})})();(function(){var d=window.AmCharts;d.AmDObject=d.Class({construct:function(a,b){this.D=b;this.R=b.R;this.node=this.R.create(this,a);this.y=this.x=0;this.scale=1},attr:function(a){this.R.attr(this,a);return this},getAttr:function(a){return this.node.getAttribute(a)},setAttr:function(a,b){this.R.setAttr(this,a,b);return this},clipRect:function(a,b,c,d){this.R.clipRect(this,a,b,c,d)},translate:function(a,b,c,d){d||(a=Math.round(a),b=Math.round(b));this.R.move(this,a,b,c);this.x=a;this.y=b;this.scale=
c;this.angle&&this.rotate(this.angle)},rotate:function(a,b){this.R.rotate(this,a,b);this.angle=a},animate:function(a,b,c){for(var e in a)if(a.hasOwnProperty(e)){var h=e,f=a[e];c=d.getEffect(c);this.R.animate(this,h,f,b,c)}},push:function(a){if(a){var b=this.node;b.appendChild(a.node);var c=a.clipPath;c&&b.appendChild(c);(a=a.grad)&&b.appendChild(a)}},text:function(a){this.R.setText(this,a)},remove:function(){this.R.remove(this)},clear:function(){var a=this.node;if(a.hasChildNodes())for(;1<=a.childNodes.length;)a.removeChild(a.firstChild)},
hide:function(){this.setAttr("visibility","hidden")},show:function(){this.setAttr("visibility","visible")},getBBox:function(){return this.R.getBBox(this)},toFront:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;b&&b.appendChild(a)}},toPrevious:function(){var a=this.node;a&&this.prevNextNode&&(a=a.parentNode)&&a.insertBefore(this.prevNextNode,null)},toBack:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;if(b){var c=b.firstChild;
c&&b.insertBefore(a,c)}}},mouseover:function(a){this.R.addListener(this,"mouseover",a);return this},mouseout:function(a){this.R.addListener(this,"mouseout",a);return this},click:function(a){this.R.addListener(this,"click",a);return this},dblclick:function(a){this.R.addListener(this,"dblclick",a);return this},mousedown:function(a){this.R.addListener(this,"mousedown",a);return this},mouseup:function(a){this.R.addListener(this,"mouseup",a);return this},touchstart:function(a){this.R.addListener(this,
"touchstart",a);return this},touchend:function(a){this.R.addListener(this,"touchend",a);return this},contextmenu:function(a){this.node.addEventListener?this.node.addEventListener("contextmenu",a,!0):this.R.addListener(this,"contextmenu",a);return this},stop:function(){d.removeFromArray(this.R.animations,this.an_x);d.removeFromArray(this.R.animations,this.an_y)},length:function(){return this.node.childNodes.length},gradient:function(a,b,c){this.R.gradient(this,a,b,c)},pattern:function(a,b,c){a&&this.R.pattern(this,
a,b,c)}})})();(function(){var d=window.AmCharts;d.VMLRenderer=d.Class({construct:function(a,b){this.chart=b;this.D=a;this.cNames={circle:"oval",ellipse:"oval",rect:"roundrect",path:"shape"};this.styleMap={x:"left",y:"top",width:"width",height:"height","font-family":"fontFamily","font-size":"fontSize",visibility:"visibility"}},create:function(a,b){var c;if("group"==b)c=document.createElement("div"),a.type="div";else if("text"==b)c=document.createElement("div"),a.type="text";else if("image"==b)c=document.createElement("img"),
a.type="image";else{a.type="shape";a.shapeType=this.cNames[b];c=document.createElement("amvml:"+this.cNames[b]);var d=document.createElement("amvml:stroke");c.appendChild(d);a.stroke=d;var h=document.createElement("amvml:fill");c.appendChild(h);a.fill=h;h.className="amvml";d.className="amvml";c.className="amvml"}c.style.position="absolute";c.style.top=0;c.style.left=0;return c},path:function(a,b){a.node.setAttribute("src",b)},setAttr:function(a,b,c){if(void 0!==c){var e;8===document.documentMode&&
(e=!0);var h=a.node,f=a.type,g=h.style;"r"==b&&(g.width=2*c,g.height=2*c);"oval"==a.shapeType&&("rx"==b&&(g.width=2*c),"ry"==b&&(g.height=2*c));"roundrect"==a.shapeType&&("width"!=b&&"height"!=b||--c);"cursor"==b&&(g.cursor=c);"cx"==b&&(g.left=c-d.removePx(g.width)/2);"cy"==b&&(g.top=c-d.removePx(g.height)/2);var k=this.styleMap[b];void 0!==k&&(g[k]=c);"text"==f&&("text-anchor"==b&&(a.anchor=c,k=h.clientWidth,"end"==c&&(g.marginLeft=-k+"px"),"middle"==c&&(g.marginLeft=-(k/2)+"px",g.textAlign="center"),
"start"==c&&(g.marginLeft="0px")),"fill"==b&&(g.color=c),"font-weight"==b&&(g.fontWeight=c));if(g=a.children)for(k=0;k<g.length;k++)g[k].setAttr(b,c);if("shape"==f){"cs"==b&&(h.style.width="100px",h.style.height="100px",h.setAttribute("coordsize",c));"d"==b&&h.setAttribute("path",this.svgPathToVml(c));"dd"==b&&h.setAttribute("path",c);f=a.stroke;a=a.fill;"stroke"==b&&(e?f.color=c:f.setAttribute("color",c));"stroke-width"==b&&(e?f.weight=c:f.setAttribute("weight",c));"stroke-opacity"==b&&(e?f.opacity=
c:f.setAttribute("opacity",c));"stroke-dasharray"==b&&(g="solid",0<c&&3>c&&(g="dot"),3<=c&&6>=c&&(g="dash"),6<c&&(g="longdash"),e?f.dashstyle=g:f.setAttribute("dashstyle",g));if("fill-opacity"==b||"opacity"==b)0===c?e?a.on=!1:a.setAttribute("on",!1):e?a.opacity=c:a.setAttribute("opacity",c);"fill"==b&&(e?a.color=c:a.setAttribute("color",c));"rx"==b&&(e?h.arcSize=c+"%":h.setAttribute("arcsize",c+"%"))}}},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},text:function(a,
b,c){var e=new d.AmDObject("text",this.D),h=e.node;h.style.whiteSpace="pre";h.innerHTML=a;this.D.addToContainer(h,c);this.attr(e,b);return e},getBBox:function(a){return this.getBox(a.node)},getBox:function(a){var b=a.offsetLeft,c=a.offsetTop,d=a.offsetWidth,h=a.offsetHeight,f;if(a.hasChildNodes()){var g,k,l;for(l=0;l<a.childNodes.length;l++){f=this.getBox(a.childNodes[l]);var m=f.x;isNaN(m)||(isNaN(g)?g=m:m<g&&(g=m));var n=f.y;isNaN(n)||(isNaN(k)?k=n:n<k&&(k=n));m=f.width+m;isNaN(m)||(d=Math.max(d,
m));f=f.height+n;isNaN(f)||(h=Math.max(h,f))}0>g&&(b+=g);0>k&&(c+=k)}return{x:b,y:c,width:d,height:h}},setText:function(a,b){var c=a.node;c&&(c.innerHTML=b);this.setAttr(a,"text-anchor",a.anchor)},addListener:function(a,b,c){a.node["on"+b]=c},move:function(a,b,c){var e=a.node,h=e.style;"text"==a.type&&(c-=d.removePx(h.fontSize)/2-1);"oval"==a.shapeType&&(b-=d.removePx(h.width)/2,c-=d.removePx(h.height)/2);a=a.bw;isNaN(a)||(b-=a,c-=a);isNaN(b)||isNaN(c)||(e.style.left=b+"px",e.style.top=c+"px")},svgPathToVml:function(a){var b=
a.split(" ");a="";var c,d=Math.round,h;for(h=0;h<b.length;h++){var f=b[h],g=f.substring(0,1),f=f.substring(1),k=f.split(","),l=d(k[0])+","+d(k[1]);"M"==g&&(a+=" m "+l);"L"==g&&(a+=" l "+l);"Z"==g&&(a+=" x e");if("Q"==g){var m=c.length,n=c[m-1],q=k[0],p=k[1],l=k[2],r=k[3];c=d(c[m-2]/3+2/3*q);n=d(n/3+2/3*p);q=d(2/3*q+l/3);p=d(2/3*p+r/3);a+=" c "+c+","+n+","+q+","+p+","+l+","+r}"A"==g&&(a+=" wa "+f);"B"==g&&(a+=" at "+f);c=k}return a},animate:function(a,b,c,d,h){var f=a.node,g=this.chart;if("translate"==
b){b=c.split(",");c=b[1];var k=f.offsetTop;g.animate(a,"left",f.offsetLeft,b[0],d,h,"px");g.animate(a,"top",k,c,d,h,"px")}},clipRect:function(a,b,c,d,h){a=a.node;0===b&&0===c?(a.style.width=d+"px",a.style.height=h+"px",a.style.overflow="hidden"):a.style.clip="rect("+c+"px "+(b+d)+"px "+(c+h)+"px "+b+"px)"},rotate:function(a,b,c){if(0!==Number(b)){var e=a.node;a=e.style;c||(c=this.getBGColor(e.parentNode));a.backgroundColor=c;a.paddingLeft=1;c=b*Math.PI/180;var h=Math.cos(c),f=Math.sin(c),g=d.removePx(a.left),
k=d.removePx(a.top),l=e.offsetWidth,e=e.offsetHeight;b/=Math.abs(b);a.left=g+l/2-l/2*Math.cos(c)-b*e/2*Math.sin(c)+3;a.top=k-b*l/2*Math.sin(c)+b*e/2*Math.sin(c);a.cssText=a.cssText+"; filter:progid:DXImageTransform.Microsoft.Matrix(M11='"+h+"', M12='"+-f+"', M21='"+f+"', M22='"+h+"', sizingmethod='auto expand');"}},getBGColor:function(a){var b="#FFFFFF";if(a.style){var c=a.style.backgroundColor;""!==c?b=c:a.parentNode&&(b=this.getBGColor(a.parentNode))}return b},set:function(a){var b=new d.AmDObject("group",
this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},gradient:function(a,b,c,d){var h="";"radialGradient"==b&&(b="gradientradial",c.reverse());"linearGradient"==b&&(b="gradient");var f;for(f=0;f<c.length;f++){var g=Math.round(100*f/(c.length-1)),h=h+(g+"% "+c[f]);f<c.length-1&&(h+=",")}a=a.fill;90==d?d=0:270==d?d=180:180==d?d=90:0===d&&(d=270);8===document.documentMode?(a.type=b,a.angle=d):(a.setAttribute("type",b),a.setAttribute("angle",d));h&&(a.colors.value=
h)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);this.D.remove(a.node)},disableSelection:function(a){void 0!==typeof a.onselectstart&&(a.onselectstart=function(){return!1});a.style.cursor="default"},pattern:function(a,b,c,e){c=a.node;a=a.fill;var h="none";b.color&&(h=b.color);c.fillColor=h;b=b.url;d.isAbsolute(b)||(b=e+b);8===document.documentMode?(a.type="tile",a.src=b):(a.setAttribute("type","tile"),a.setAttribute("src",b))},update:function(){}})})();(function(){var d=window.AmCharts;d.SVGRenderer=d.Class({construct:function(a){this.D=a;this.animations=[]},create:function(a,b){return document.createElementNS(d.SVG_NS,b)},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},setAttr:function(a,b,c){void 0!==c&&a.node.setAttribute(b,c)},animate:function(a,b,c,e,h){var f=a.node;a["an_"+b]&&d.removeFromArray(this.animations,a["an_"+b]);"translate"==b?(f=(f=f.getAttribute("transform"))?String(f).substring(10,f.length-1):"0,0",
f=f.split(", ").join(" "),f=f.split(" ").join(","),0===f&&(f="0,0")):f=Number(f.getAttribute(b));c={obj:a,frame:0,attribute:b,from:f,to:c,time:e,effect:h};this.animations.push(c);a["an_"+b]=c},update:function(){var a,b=this.animations;for(a=b.length-1;0<=a;a--){var c=b[a],e=1E3*c.time/d.updateRate,h=c.frame+1,f=c.obj,g=c.attribute,k,l,m;h<=e?(c.frame++,"translate"==g?(k=c.from.split(","),g=Number(k[0]),k=Number(k[1]),isNaN(k)&&(k=0),l=c.to.split(","),m=Number(l[0]),l=Number(l[1]),m=0===m-g?m:Math.round(d[c.effect](0,
h,g,m-g,e)),c=0===l-k?l:Math.round(d[c.effect](0,h,k,l-k,e)),g="transform",c="translate("+m+","+c+")"):(l=Number(c.from),k=Number(c.to),m=k-l,c=d[c.effect](0,h,l,m,e),isNaN(c)&&(c=k),0===m&&this.animations.splice(a,1)),this.setAttr(f,g,c)):("translate"==g?(l=c.to.split(","),m=Number(l[0]),l=Number(l[1]),f.translate(m,l)):(k=Number(c.to),this.setAttr(f,g,k)),this.animations.splice(a,1))}},getBBox:function(a){if(a=a.node)try{return a.getBBox()}catch(b){}return{width:0,height:0,x:0,y:0}},path:function(a,
b){a.node.setAttributeNS(d.SVG_XLINK,"xlink:href",b)},clipRect:function(a,b,c,e,h){var f=a.node,g=a.clipPath;g&&this.D.remove(g);var k=f.parentNode;k&&(f=document.createElementNS(d.SVG_NS,"clipPath"),g=d.getUniqueId(),f.setAttribute("id",g),this.D.rect(b,c,e,h,0,0,f),k.appendChild(f),b="#",d.baseHref&&!d.isIE&&(b=this.removeTarget(window.location.href)+b),this.setAttr(a,"clip-path","url("+b+g+")"),this.clipPathC++,a.clipPath=f)},text:function(a,b,c){var e=new d.AmDObject("text",this.D);a=String(a).split("\n");
var h=b["font-size"],f;for(f=0;f<a.length;f++){var g=this.create(null,"tspan");g.appendChild(document.createTextNode(a[f]));g.setAttribute("y",(h+2)*f+Math.round(h/2));g.setAttribute("x",0);g.style.fontSize=h+"px";e.node.appendChild(g)}e.node.setAttribute("y",Math.round(h/2));this.attr(e,b);this.D.addToContainer(e.node,c);return e},setText:function(a,b){var c=a.node;c&&(c.removeChild(c.firstChild),c.appendChild(document.createTextNode(b)))},move:function(a,b,c,d){isNaN(b)&&(b=0);isNaN(c)&&(c=0);b=
"translate("+b+","+c+")";d&&(b=b+" scale("+d+")");this.setAttr(a,"transform",b)},rotate:function(a,b){var c=a.node.getAttribute("transform"),d="rotate("+b+")";c&&(d=c+" "+d);this.setAttr(a,"transform",d)},set:function(a){var b=new d.AmDObject("g",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},addListener:function(a,b,c){a.node["on"+b]=c},gradient:function(a,b,c,e){var h=a.node,f=a.grad;f&&this.D.remove(f);b=document.createElementNS(d.SVG_NS,
b);f=d.getUniqueId();b.setAttribute("id",f);if(!isNaN(e)){var g=0,k=0,l=0,m=0;90==e?l=100:270==e?m=100:180==e?g=100:0===e&&(k=100);b.setAttribute("x1",g+"%");b.setAttribute("x2",k+"%");b.setAttribute("y1",l+"%");b.setAttribute("y2",m+"%")}for(e=0;e<c.length;e++)g=document.createElementNS(d.SVG_NS,"stop"),k=100*e/(c.length-1),0===e&&(k=0),g.setAttribute("offset",k+"%"),g.setAttribute("stop-color",c[e]),b.appendChild(g);h.parentNode.appendChild(b);c="#";d.baseHref&&!d.isIE&&(c=this.removeTarget(window.location.href)+
c);h.setAttribute("fill","url("+c+f+")");a.grad=b},removeTarget:function(a){return a.split("#")[0]},pattern:function(a,b,c,e){var h=a.node;isNaN(c)&&(c=1);var f=a.patternNode;f&&this.D.remove(f);var f=document.createElementNS(d.SVG_NS,"pattern"),g=d.getUniqueId(),k=b;b.url&&(k=b.url);d.isAbsolute(k)||(k=e+k);e=Number(b.width);isNaN(e)&&(e=4);var l=Number(b.height);isNaN(l)&&(l=4);e/=c;l/=c;c=b.x;isNaN(c)&&(c=0);var m=-Math.random()*Number(b.randomX);isNaN(m)||(c=m);m=b.y;isNaN(m)&&(m=0);var n=-Math.random()*
Number(b.randomY);isNaN(n)||(m=n);f.setAttribute("id",g);f.setAttribute("width",e);f.setAttribute("height",l);f.setAttribute("patternUnits","userSpaceOnUse");f.setAttribute("xlink:href",k);b.color&&(n=document.createElementNS(d.SVG_NS,"rect"),n.setAttributeNS(null,"height",e),n.setAttributeNS(null,"width",l),n.setAttributeNS(null,"fill",b.color),f.appendChild(n));this.D.image(k,0,0,e,l,f).translate(c,m);k="#";d.baseHref&&!d.isIE&&(k=this.removeTarget(window.location.href)+k);h.setAttribute("fill",
"url("+k+g+")");a.patternNode=f;h.parentNode.appendChild(f)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);a.grad&&this.D.remove(a.grad);a.patternNode&&this.D.remove(a.patternNode);this.D.remove(a.node)}})})();AmCharts.AmDSet=AmCharts.Class({construct:function(d){this.create("g")},attr:function(d){this.R.attr(this.node,d)},move:function(d,a){this.R.move(this.node,d,a)}});(function(){var d=window.AmCharts;d.AmLegend=d.Class({construct:function(a){this.enabled=!0;this.cname="AmLegend";this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","rollOverItem","rollOutItem","clickLabel");this.position="bottom";this.borderColor=this.color="#000000";this.borderAlpha=0;this.markerLabelGap=5;this.verticalGap=10;this.align="left";this.horizontalGap=0;this.spacing=10;this.markerDisabledColor="#AAB3B3";this.markerType=
"square";this.markerSize=16;this.markerBorderThickness=this.markerBorderAlpha=1;this.marginBottom=this.marginTop=0;this.marginLeft=this.marginRight=20;this.autoMargins=!0;this.valueWidth=50;this.switchable=!0;this.switchType="x";this.switchColor="#FFFFFF";this.rollOverColor="#CC0000";this.reversedOrder=!1;this.labelText="[[title]]";this.valueText="[[value]]";this.useMarkerColorForLabels=!1;this.rollOverGraphAlpha=1;this.textClickEnabled=!1;this.equalWidths=!0;this.dateFormat="DD-MM-YYYY";this.backgroundColor=
"#FFFFFF";this.backgroundAlpha=0;this.useGraphSettings=!1;this.showEntries=!0;d.applyTheme(this,a,this.cname)},setData:function(a){this.legendData=a;this.invalidateSize()},invalidateSize:function(){this.destroy();this.entries=[];this.valueLabels=[];var a=this.legendData;this.enabled&&(d.ifArray(a)||d.ifArray(this.data))&&this.drawLegend()},drawLegend:function(){var a=this.chart,b=this.position,c=this.width,e=a.divRealWidth,h=a.divRealHeight,f=this.div,g=this.legendData;this.data&&(g=this.data);isNaN(this.fontSize)&&
(this.fontSize=a.fontSize);if("right"==b||"left"==b)this.maxColumns=1,this.autoMargins&&(this.marginLeft=this.marginRight=10);else if(this.autoMargins){this.marginRight=a.marginRight;this.marginLeft=a.marginLeft;var k=a.autoMarginOffset;"bottom"==b?(this.marginBottom=k,this.marginTop=0):(this.marginTop=k,this.marginBottom=0)}c=void 0!==c?d.toCoordinate(c,e):a.realWidth;"outside"==b?(c=f.offsetWidth,h=f.offsetHeight,f.clientHeight&&(c=f.clientWidth,h=f.clientHeight)):(isNaN(c)||(f.style.width=c+"px"),
f.className="amChartsLegend "+a.classNamePrefix+"-legend-div");this.divWidth=c;(b=this.container)?(b.container.innerHTML="",f.appendChild(b.container),b.width=c,b.height=h,b.addDefs(a)):b=new d.AmDraw(f,c,h,a);this.container=b;this.lx=0;this.ly=8;h=this.markerSize;h>this.fontSize&&(this.ly=h/2-1);0<h&&(this.lx+=h+this.markerLabelGap);this.titleWidth=0;if(h=this.title)h=d.text(this.container,h,this.color,a.fontFamily,this.fontSize,"start",!0),d.setCN(a,h,"legend-title"),h.translate(this.marginLeft,
this.marginTop+this.verticalGap+this.ly+1),a=h.getBBox(),this.titleWidth=a.width+15,this.titleHeight=a.height+6;this.index=this.maxLabelWidth=0;if(this.showEntries){for(a=0;a<g.length;a++)this.createEntry(g[a]);for(a=this.index=0;a<g.length;a++)this.createValue(g[a])}this.arrangeEntries();this.updateValues()},arrangeEntries:function(){var a=this.position,b=this.marginLeft+this.titleWidth,c=this.marginRight,e=this.marginTop,h=this.marginBottom,f=this.horizontalGap,g=this.div,k=this.divWidth,l=this.maxColumns,
m=this.verticalGap,n=this.spacing,q=k-c-b,p=0,r=0,t=this.container;this.set&&this.set.remove();var u=t.set();this.set=u;var z=t.set();u.push(z);var v=this.entries,w,x;for(x=0;x<v.length;x++){w=v[x].getBBox();var A=w.width;A>p&&(p=A);w=w.height;w>r&&(r=w)}var A=r=0,B=f,D=0,C=0;for(x=0;x<v.length;x++){var I=v[x];this.reversedOrder&&(I=v[v.length-x-1]);w=I.getBBox();var H;this.equalWidths?H=f+A*(p+n+this.markerLabelGap):(H=B,B=B+w.width+f+n);w.height>C&&(C=w.height);H+w.width>q&&0<x&&0!==A&&(r++,A=0,
H=f,B=H+w.width+f+n,D=D+C+m,C=0);I.translate(H,D);A++;!isNaN(l)&&A>=l&&(A=0,r++,D=D+C+m,B=f,C=0);z.push(I)}w=z.getBBox();l=w.height+2*m-1;"left"==a||"right"==a?(n=w.width+2*f,k=n+b+c,g.style.width=k+"px",this.ieW=k):n=k-b-c-1;c=d.polygon(this.container,[0,n,n,0],[0,0,l,l],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);d.setCN(this.chart,c,"legend-bg");u.push(c);u.translate(b,e);c.toBack();b=f;if("top"==a||"bottom"==a||"absolute"==a||"outside"==a)"center"==this.align?
b=f+(n-w.width)/2:"right"==this.align&&(b=f+n-w.width);z.translate(b,m+1);this.titleHeight>l&&(l=this.titleHeight);a=l+e+h+1;0>a&&(a=0);a>this.chart.divRealHeight&&(g.style.top="0px");g.style.height=Math.round(a)+"px";t.setSize(this.divWidth,a)},createEntry:function(a){if(!1!==a.visibleInLegend){var b=this.chart,c=a.markerType;a.legendEntryWidth=this.markerSize;c||(c=this.markerType);var e=a.color,h=a.alpha;a.legendKeyColor&&(e=a.legendKeyColor());a.legendKeyAlpha&&(h=a.legendKeyAlpha());var f;!0===
a.hidden&&(f=e=this.markerDisabledColor);var g=a.pattern,k=a.customMarker;k||(k=this.customMarker);var l=this.container,m=this.markerSize,n=0,q=0,p=m/2;if(this.useGraphSettings){c=a.type;this.switchType=void 0;if("line"==c||"step"==c||"smoothedLine"==c||"ohlc"==c)g=l.set(),a.hidden||(e=a.lineColorR,f=a.bulletBorderColorR),n=d.line(l,[0,2*m],[m/2,m/2],e,a.lineAlpha,a.lineThickness,a.dashLength),d.setCN(b,n,"graph-stroke"),g.push(n),a.bullet&&(a.hidden||(e=a.bulletColorR),n=d.bullet(l,a.bullet,a.bulletSize,
e,a.bulletAlpha,a.bulletBorderThickness,f,a.bulletBorderAlpha))&&(d.setCN(b,n,"graph-bullet"),n.translate(m+1,m/2),g.push(n)),p=0,n=m,q=m/3;else{var r;a.getGradRotation&&(r=a.getGradRotation());n=a.fillColorsR;!0===a.hidden&&(n=e);if(g=this.createMarker("rectangle",n,a.fillAlphas,a.lineThickness,e,a.lineAlpha,r,g))p=m,g.translate(p,m/2);n=m}d.setCN(b,g,"graph-"+c);d.setCN(b,g,"graph-"+a.id)}else k?g=l.image(k,0,0,m,m):(g=this.createMarker(c,e,h,void 0,void 0,void 0,void 0,g))&&g.translate(m/2,m/2);
d.setCN(b,g,"legend-marker");this.addListeners(g,a);l=l.set([g]);this.switchable&&a.switchable&&l.setAttr("cursor","pointer");void 0!==a.id&&d.setCN(b,l,"legend-item-"+a.id);d.setCN(b,l,a.className,!0);(f=this.switchType)&&"none"!=f&&0<m&&("x"==f?(c=this.createX(),c.translate(m/2,m/2)):c=this.createV(),c.dItem=a,!0!==a.hidden?"x"==f?c.hide():c.show():"x"!=f&&c.hide(),this.switchable||c.hide(),this.addListeners(c,a),a.legendSwitch=c,l.push(c),d.setCN(b,c,"legend-switch"));f=this.color;a.showBalloon&&
this.textClickEnabled&&void 0!==this.selectedColor&&(f=this.selectedColor);this.useMarkerColorForLabels&&(f=e);!0===a.hidden&&(f=this.markerDisabledColor);e=d.massReplace(this.labelText,{"[[title]]":a.title});c=this.fontSize;g&&(m<=c&&g.translate(p,m/2+this.ly-c/2+(c+2-m)/2-q),a.legendEntryWidth=g.getBBox().width);var t;e&&(e=d.fixBrakes(e),a.legendTextReal=e,t=this.labelWidth,t=isNaN(t)?d.text(this.container,e,f,b.fontFamily,c,"start"):d.wrappedText(this.container,e,f,b.fontFamily,c,"start",!1,t,
0),d.setCN(b,t,"legend-label"),t.translate(this.lx+n,this.ly),l.push(t),b=t.getBBox().width,this.maxLabelWidth<b&&(this.maxLabelWidth=b));this.entries[this.index]=l;a.legendEntry=this.entries[this.index];a.legendLabel=t;this.index++}},addListeners:function(a,b){var c=this;a&&a.mouseover(function(a){c.rollOverMarker(b,a)}).mouseout(function(a){c.rollOutMarker(b,a)}).click(function(a){c.clickMarker(b,a)})},rollOverMarker:function(a,b){this.switchable&&this.dispatch("rollOverMarker",a,b);this.dispatch("rollOverItem",
a,b)},rollOutMarker:function(a,b){this.switchable&&this.dispatch("rollOutMarker",a,b);this.dispatch("rollOutItem",a,b)},clickMarker:function(a,b){this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b));this.dispatch("clickMarker",a,b)},rollOverLabel:function(a,b){a.hidden||(this.textClickEnabled&&a.legendLabel&&a.legendLabel.attr({fill:this.rollOverColor}),this.dispatch("rollOverItem",a,b))},rollOutLabel:function(a,b){if(!a.hidden){if(this.textClickEnabled&&a.legendLabel){var c=
this.color;void 0!==this.selectedColor&&a.showBalloon&&(c=this.selectedColor);this.useMarkerColorForLabels&&(c=a.lineColor,void 0===c&&(c=a.color));a.legendLabel.attr({fill:c})}this.dispatch("rollOutItem",a,b)}},clickLabel:function(a,b){this.textClickEnabled?a.hidden||this.dispatch("clickLabel",a,b):this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b))},dispatch:function(a,b,c){this.fire(a,{type:a,dataItem:b,target:this,event:c,chart:this.chart})},createValue:function(a){var b=
this,c=b.fontSize,e=b.chart;if(!1!==a.visibleInLegend){var h=b.maxLabelWidth;b.forceWidth&&(h=b.labelWidth);b.equalWidths||(b.valueAlign="left");"left"==b.valueAlign&&(h=a.legendEntry.getBBox().width);var f=h;if(b.valueText&&0<b.valueWidth){var g=b.color;b.useMarkerColorForValues&&(g=a.color,a.legendKeyColor&&(g=a.legendKeyColor()));!0===a.hidden&&(g=b.markerDisabledColor);var k=b.valueText,h=h+b.lx+b.markerLabelGap+b.valueWidth,l="end";"left"==b.valueAlign&&(h-=b.valueWidth,l="start");g=d.text(b.container,
k,g,b.chart.fontFamily,c,l);d.setCN(e,g,"legend-value");g.translate(h,b.ly);b.entries[b.index].push(g);f+=b.valueWidth+2*b.markerLabelGap;g.dItem=a;b.valueLabels.push(g)}b.index++;e=b.markerSize;e<c+7&&(e=c+7,d.VML&&(e+=3));c=b.container.rect(a.legendEntryWidth,0,f,e,0,0).attr({stroke:"none",fill:"#fff","fill-opacity":.005});c.dItem=a;b.entries[b.index-1].push(c);c.mouseover(function(c){b.rollOverLabel(a,c)}).mouseout(function(c){b.rollOutLabel(a,c)}).click(function(c){b.clickLabel(a,c)})}},createV:function(){var a=
this.markerSize;return d.polygon(this.container,[a/5,a/2,a-a/5,a/2],[a/3,a-a/5,a/5,a/1.7],this.switchColor)},createX:function(){var a=(this.markerSize-4)/2,b={stroke:this.switchColor,"stroke-width":3},c=this.container,e=d.line(c,[-a,a],[-a,a]).attr(b),a=d.line(c,[-a,a],[a,-a]).attr(b);return this.container.set([e,a])},createMarker:function(a,b,c,e,h,f,g,k){var l=this.markerSize,m=this.container;h||(h=this.markerBorderColor);h||(h=b);isNaN(e)&&(e=this.markerBorderThickness);isNaN(f)&&(f=this.markerBorderAlpha);
return d.bullet(m,a,l,b,c,e,h,f,l,g,k,this.chart.path)},validateNow:function(){this.invalidateSize()},updateValues:function(){var a=this.valueLabels,b=this.chart,c,d=this.data;for(c=0;c<a.length;c++){var h=a[c],f=h.dItem,g=" ";if(d)f.value?h.text(f.value):h.text("");else{var k;if(void 0!==f.type){k=f.currentDataItem;var l=this.periodValueText;f.legendPeriodValueText&&(l=f.legendPeriodValueText);k?(g=this.valueText,f.legendValueText&&(g=f.legendValueText),g=b.formatString(g,k)):l&&(g=b.formatPeriodString(l,
f))}else g=b.formatString(this.valueText,f);if(l=this.valueFunction)k&&(f=k),g=l(f,g);h.text(g)}}},renderFix:function(){if(!d.VML){var a=this.container;a&&a.renderFix()}},destroy:function(){this.div.innerHTML="";d.remove(this.set)}})})();(function(){var d=window.AmCharts;d.formatMilliseconds=function(a,b){if(-1!=a.indexOf("fff")){var c=b.getMilliseconds(),d=String(c);10>c&&(d="00"+c);10<=c&&100>c&&(d="0"+c);a=a.replace(/fff/g,d)}return a};d.extractPeriod=function(a){var b=d.stripNumbers(a),c=1;b!=a&&(c=Number(a.slice(0,a.indexOf(b))));return{period:b,count:c}};d.getDate=function(a,b,c){return a instanceof Date?d.newDate(a,c):b&&isNaN(a)?d.stringToDate(a,b):new Date(a)};d.newDate=function(a,b){return b&&"fff"!=b?new Date(a):d.useUTC?
new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds()):new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds())};d.resetDateToMin=function(a,b,c,e){void 0===e&&(e=1);var h,f,g,k,l,m,n;d.useUTC?(h=a.getUTCFullYear(),f=a.getUTCMonth(),g=a.getUTCDate(),k=a.getUTCHours(),l=a.getUTCMinutes(),m=a.getUTCSeconds(),n=a.getUTCMilliseconds(),a=a.getUTCDay()):(h=a.getFullYear(),
f=a.getMonth(),g=a.getDate(),k=a.getHours(),l=a.getMinutes(),m=a.getSeconds(),n=a.getMilliseconds(),a=a.getDay());switch(b){case "YYYY":h=Math.floor(h/c)*c;f=0;g=1;n=m=l=k=0;break;case "MM":f=Math.floor(f/c)*c;g=1;n=m=l=k=0;break;case "WW":g=a>=e?g-a+e:g-(7+a)+e;n=m=l=k=0;break;case "DD":n=m=l=k=0;break;case "hh":k=Math.floor(k/c)*c;n=m=l=0;break;case "mm":l=Math.floor(l/c)*c;n=m=0;break;case "ss":m=Math.floor(m/c)*c;n=0;break;case "fff":n=Math.floor(n/c)*c}d.useUTC?(a=new Date,a.setUTCFullYear(h,
f,g),a.setUTCHours(k,l,m,n)):a=new Date(h,f,g,k,l,m,n);return a};d.getPeriodDuration=function(a,b){void 0===b&&(b=1);var c;switch(a){case "YYYY":c=316224E5;break;case "MM":c=26784E5;break;case "WW":c=6048E5;break;case "DD":c=864E5;break;case "hh":c=36E5;break;case "mm":c=6E4;break;case "ss":c=1E3;break;case "fff":c=1}return c*b};d.intervals={s:{nextInterval:"ss",contains:1E3},ss:{nextInterval:"mm",contains:60,count:0},mm:{nextInterval:"hh",contains:60,count:1},hh:{nextInterval:"DD",contains:24,count:2},
DD:{nextInterval:"",contains:Infinity,count:3}};d.getMaxInterval=function(a,b){var c=d.intervals;return a>=c[b].contains?(a=Math.round(a/c[b].contains),b=c[b].nextInterval,d.getMaxInterval(a,b)):"ss"==b?c[b].nextInterval:b};d.dayNames="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");d.shortDayNames="Sun Mon Tue Wed Thu Fri Sat".split(" ");d.monthNames="January February March April May June July August September October November December".split(" ");d.shortMonthNames="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
d.getWeekNumber=function(a){a=new Date(a);a.setHours(0,0,0);a.setDate(a.getDate()+4-(a.getDay()||7));var b=new Date(a.getFullYear(),0,1);return Math.ceil(((a-b)/864E5+1)/7)};d.stringToDate=function(a,b){var c={},e=[{pattern:"YYYY",period:"year"},{pattern:"YY",period:"year"},{pattern:"MM",period:"month"},{pattern:"M",period:"month"},{pattern:"DD",period:"date"},{pattern:"D",period:"date"},{pattern:"JJ",period:"hours"},{pattern:"J",period:"hours"},{pattern:"HH",period:"hours"},{pattern:"H",period:"hours"},
{pattern:"KK",period:"hours"},{pattern:"K",period:"hours"},{pattern:"LL",period:"hours"},{pattern:"L",period:"hours"},{pattern:"NN",period:"minutes"},{pattern:"N",period:"minutes"},{pattern:"SS",period:"seconds"},{pattern:"S",period:"seconds"},{pattern:"QQQ",period:"milliseconds"},{pattern:"QQ",period:"milliseconds"},{pattern:"Q",period:"milliseconds"}],h=!0,f=b.indexOf("AA");-1!=f&&(a.substr(f,2),"pm"==a.toLowerCase&&(h=!1));var f=b,g,k,l;for(l=0;l<e.length;l++)k=e[l].period,c[k]=0,"date"==k&&(c[k]=
1);for(l=0;l<e.length;l++)if(g=e[l].pattern,k=e[l].period,-1!=b.indexOf(g)){var m=d.getFromDateString(g,a,f);b=b.replace(g,"");if("KK"==g||"K"==g||"LL"==g||"L"==g)h||(m+=12);c[k]=m}d.useUTC?(e=new Date,e.setUTCFullYear(c.year,c.month,c.date),e.setUTCHours(c.hours,c.minutes,c.seconds,c.milliseconds)):e=new Date(c.year,c.month,c.date,c.hours,c.minutes,c.seconds,c.milliseconds);return e};d.getFromDateString=function(a,b,c){if(void 0!==b)return c=c.indexOf(a),b=String(b),b=b.substr(c,a.length),"0"==b.charAt(0)&&
(b=b.substr(1,b.length-1)),b=Number(b),isNaN(b)&&(b=0),-1!=a.indexOf("M")&&b--,b};d.formatDate=function(a,b,c){c||(c=d);var e,h,f,g,k,l,m,n=d.getWeekNumber(a);d.useUTC?(e=a.getUTCFullYear(),h=a.getUTCMonth(),f=a.getUTCDate(),g=a.getUTCDay(),k=a.getUTCHours(),l=a.getUTCMinutes(),m=a.getUTCSeconds(),a=a.getUTCMilliseconds()):(e=a.getFullYear(),h=a.getMonth(),f=a.getDate(),g=a.getDay(),k=a.getHours(),l=a.getMinutes(),m=a.getSeconds(),a=a.getMilliseconds());var q=String(e).substr(2,2),p=h+1;9>h&&(p="0"+
p);var r="0"+g;b=b.replace(/W/g,n);n=k;24==n&&(n=0);var t=n;10>t&&(t="0"+t);b=b.replace(/JJ/g,t);b=b.replace(/J/g,n);t=k;0===t&&(t=24,-1!=b.indexOf("H")&&f--);n=f;10>f&&(n="0"+f);var u=t;10>u&&(u="0"+u);b=b.replace(/HH/g,u);b=b.replace(/H/g,t);t=k;11<t&&(t-=12);u=t;10>u&&(u="0"+u);b=b.replace(/KK/g,u);b=b.replace(/K/g,t);t=k;0===t&&(t=12);12<t&&(t-=12);u=t;10>u&&(u="0"+u);b=b.replace(/LL/g,u);b=b.replace(/L/g,t);t=l;10>t&&(t="0"+t);b=b.replace(/NN/g,t);b=b.replace(/N/g,l);l=m;10>l&&(l="0"+l);b=b.replace(/SS/g,
l);b=b.replace(/S/g,m);m=a;10>m&&(m="00"+m);100>m&&(m="0"+m);l=a;10>l&&(l="00"+l);b=b.replace(/QQQ/g,m);b=b.replace(/QQ/g,l);b=b.replace(/Q/g,a);b=12>k?b.replace(/A/g,"am"):b.replace(/A/g,"pm");b=b.replace(/YYYY/g,"@IIII@");b=b.replace(/YY/g,"@II@");b=b.replace(/MMMM/g,"@XXXX@");b=b.replace(/MMM/g,"@XXX@");b=b.replace(/MM/g,"@XX@");b=b.replace(/M/g,"@X@");b=b.replace(/DD/g,"@RR@");b=b.replace(/D/g,"@R@");b=b.replace(/EEEE/g,"@PPPP@");b=b.replace(/EEE/g,"@PPP@");b=b.replace(/EE/g,"@PP@");b=b.replace(/E/g,
"@P@");b=b.replace(/@IIII@/g,e);b=b.replace(/@II@/g,q);b=b.replace(/@XXXX@/g,c.monthNames[h]);b=b.replace(/@XXX@/g,c.shortMonthNames[h]);b=b.replace(/@XX@/g,p);b=b.replace(/@X@/g,h+1);b=b.replace(/@RR@/g,n);b=b.replace(/@R@/g,f);b=b.replace(/@PPPP@/g,c.dayNames[g]);b=b.replace(/@PPP@/g,c.shortDayNames[g]);b=b.replace(/@PP@/g,r);return b=b.replace(/@P@/g,g)};d.changeDate=function(a,b,c,e,h){if(d.useUTC)return d.changeUTCDate(a,b,c,e,h);var f=-1;void 0===e&&(e=!0);void 0===h&&(h=!1);!0===e&&(f=1);switch(b){case "YYYY":a.setFullYear(a.getFullYear()+
c*f);e||h||a.setDate(a.getDate()+1);break;case "MM":b=a.getMonth();a.setMonth(a.getMonth()+c*f);a.getMonth()>b+c*f&&a.setDate(a.getDate()-1);e||h||a.setDate(a.getDate()+1);break;case "DD":a.setDate(a.getDate()+c*f);break;case "WW":a.setDate(a.getDate()+c*f*7);break;case "hh":a.setHours(a.getHours()+c*f);break;case "mm":a.setMinutes(a.getMinutes()+c*f);break;case "ss":a.setSeconds(a.getSeconds()+c*f);break;case "fff":a.setMilliseconds(a.getMilliseconds()+c*f)}return a};d.changeUTCDate=function(a,b,
c,d,h){var f=-1;void 0===d&&(d=!0);void 0===h&&(h=!1);!0===d&&(f=1);switch(b){case "YYYY":a.setUTCFullYear(a.getUTCFullYear()+c*f);d||h||a.setUTCDate(a.getUTCDate()+1);break;case "MM":b=a.getUTCMonth();a.setUTCMonth(a.getUTCMonth()+c*f);a.getUTCMonth()>b+c*f&&a.setUTCDate(a.getUTCDate()-1);d||h||a.setUTCDate(a.getUTCDate()+1);break;case "DD":a.setUTCDate(a.getUTCDate()+c*f);break;case "WW":a.setUTCDate(a.getUTCDate()+c*f*7);break;case "hh":a.setUTCHours(a.getUTCHours()+c*f);break;case "mm":a.setUTCMinutes(a.getUTCMinutes()+
c*f);break;case "ss":a.setUTCSeconds(a.getUTCSeconds()+c*f);break;case "fff":a.setUTCMilliseconds(a.getUTCMilliseconds()+c*f)}return a}})();
(function(){var e=window.AmCharts;e.AmSerialChart=e.Class({inherits:e.AmRectangularChart,construct:function(a){this.type="serial";e.AmSerialChart.base.construct.call(this,a);this.cname="AmSerialChart";this.theme=a;this.createEvents("changed");this.columnSpacing=5;this.columnSpacing3D=0;this.columnWidth=.8;this.updateScrollbar=!0;var b=new e.CategoryAxis(a);b.chart=this;this.categoryAxis=b;this.zoomOutOnDataUpdate=!0;this.mouseWheelZoomEnabled=this.mouseWheelScrollEnabled=this.rotate=this.skipZoom=
!1;this.minSelectedTime=0;e.applyTheme(this,a,this.cname)},initChart:function(){e.AmSerialChart.base.initChart.call(this);this.updateCategoryAxis(this.categoryAxis,this.rotate,"categoryAxis");this.dataChanged&&(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);var a=this.chartCursor;a&&(a.updateData(),a.fullWidth&&(a.fullRectSet=this.cursorLineSet));var a=this.countColumns(),b=this.graphs,c;for(c=0;c<b.length;c++)b[c].columnCount=a;this.updateScrollbar=!0;this.drawChart();this.autoMargins&&
!this.marginsUpdated&&(this.marginsUpdated=!0,this.measureMargins())},handleWheelReal:function(a,b){if(!this.wheelBusy){var c=this.categoryAxis,d=c.parseDates,g=c.minDuration(),e=c=1;this.mouseWheelZoomEnabled?b||(c=-1):b&&(c=-1);var f=this.chartData.length,m=this.lastTime,l=this.firstTime;0>a?d?(f=this.endTime-this.startTime,d=this.startTime+c*g,g=this.endTime+e*g,0<e&&0<c&&g>=m&&(g=m,d=m-f),this.zoomToDates(new Date(d),new Date(g))):(0<e&&0<c&&this.end>=f-1&&(c=e=0),d=this.start+c,g=this.end+e,
this.zoomToIndexes(d,g)):d?(f=this.endTime-this.startTime,d=this.startTime-c*g,g=this.endTime-e*g,0<e&&0<c&&d<=l&&(d=l,g=l+f),this.zoomToDates(new Date(d),new Date(g))):(0<e&&0<c&&1>this.start&&(c=e=0),d=this.start-c,g=this.end-e,this.zoomToIndexes(d,g))}},validateData:function(a){this.marginsUpdated=!1;this.zoomOutOnDataUpdate&&!a&&(this.endTime=this.end=this.startTime=this.start=NaN);e.AmSerialChart.base.validateData.call(this)},drawChart:function(){e.AmSerialChart.base.drawChart.call(this);var a=
this.chartData;if(e.ifArray(a)){var b=this.chartScrollbar;b&&b.draw();if(0<this.realWidth&&0<this.realHeight){var a=a.length-1,c,b=this.categoryAxis;if(b.parseDates&&!b.equalSpacing){if(b=this.startTime,c=this.endTime,isNaN(b)||isNaN(c))b=this.firstTime,c=this.lastTime}else if(b=this.start,c=this.end,isNaN(b)||isNaN(c))b=0,c=a;this.endTime=this.startTime=this.end=this.start=void 0;this.zoom(b,c)}}else this.cleanChart();this.dispDUpd();this.chartCreated=!0},cleanChart:function(){e.callMethod("destroy",
[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor])},updateCategoryAxis:function(a,b,c){a.chart=this;a.id=c;a.rotate=b;a.axisRenderer=e.RecAxis;a.guideFillRenderer=e.RecFill;a.axisItemRenderer=e.RecItem;a.setOrientation(!this.rotate);a.x=this.marginLeftReal;a.y=this.marginTopReal;a.dx=this.dx;a.dy=this.dy;a.width=this.plotAreaWidth-1;a.height=this.plotAreaHeight-1;a.viW=this.plotAreaWidth-1;a.viH=this.plotAreaHeight-1;a.viX=this.marginLeftReal;a.viY=this.marginTopReal;
a.marginsChanged=!0},updateValueAxes:function(){e.AmSerialChart.base.updateValueAxes.call(this);var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],d=this.rotate;c.rotate=d;c.setOrientation(d);d=this.categoryAxis;if(!d.startOnAxis||d.parseDates)c.expandMinMax=!0}},updateData:function(){this.parseData();var a=this.graphs,b,c=this.chartData;for(b=0;b<a.length;b++)a[b].data=c;0<c.length&&(this.firstTime=this.getStartTime(c[0].time),this.lastTime=this.getEndTime(c[c.length-1].time))},getStartTime:function(a){var b=
this.categoryAxis;return e.resetDateToMin(new Date(a),b.minPeriod,1,b.firstDayOfWeek).getTime()},getEndTime:function(a){var b=e.extractPeriod(this.categoryAxis.minPeriod);return e.changeDate(new Date(a),b.period,b.count,!0).getTime()-1},updateMargins:function(){e.AmSerialChart.base.updateMargins.call(this);var a=this.chartScrollbar;a&&(this.getScrollbarPosition(a,this.rotate,this.categoryAxis.position),this.adjustMargins(a,this.rotate))},updateScrollbars:function(){e.AmSerialChart.base.updateScrollbars.call(this);
this.updateChartScrollbar(this.chartScrollbar,this.rotate)},zoom:function(a,b){var c=this.categoryAxis;c.parseDates&&!c.equalSpacing?this.timeZoom(a,b):this.indexZoom(a,b);this.updateLegendValues()},timeZoom:function(a,b){var c=this.maxSelectedTime;isNaN(c)||(b!=this.endTime&&b-a>c&&(a=b-c,this.updateScrollbar=!0),a!=this.startTime&&b-a>c&&(b=a+c,this.updateScrollbar=!0));var d=this.minSelectedTime;if(0<d&&b-a<d){var g=Math.round(a+(b-a)/2),d=Math.round(d/2);a=g-d;b=g+d}var h=this.chartData,g=this.categoryAxis;
if(e.ifArray(h)&&(a!=this.startTime||b!=this.endTime)){var f=g.minDuration(),d=this.firstTime,m=this.lastTime;a||(a=d,isNaN(c)||(a=m-c));b||(b=m);a>m&&(a=m);b<d&&(b=d);a<d&&(a=d);b>m&&(b=m);b<a&&(b=a+f);b-a<f/5&&(b<m?b=a+f/5:a=b-f/5);this.startTime=a;this.endTime=b;c=h.length-1;f=this.getClosestIndex(h,"time",a,!0,0,c);h=this.getClosestIndex(h,"time",b,!1,f,c);g.timeZoom(a,b);g.zoom(f,h);this.start=e.fitToBounds(f,0,c);this.end=e.fitToBounds(h,0,c);this.zoomAxesAndGraphs();this.zoomScrollbar();a!=
d||b!=m?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchTimeZoomEvent()}},updateAfterValueZoom:function(){this.zoomAxesAndGraphs();this.zoomScrollbar();this.updateColumnsDepth()},indexZoom:function(a,b){var c=this.maxSelectedSeries;isNaN(c)||(b!=this.end&&b-a>c&&(a=b-c,this.updateScrollbar=!0),a!=this.start&&b-a>c&&(b=a+c,this.updateScrollbar=!0));if(a!=this.start||b!=this.end){var d=this.chartData.length-1;isNaN(a)&&(a=0,isNaN(c)||(a=d-c));isNaN(b)&&(b=d);b<a&&(b=a);b>d&&(b=
d);a>d&&(a=d-1);0>a&&(a=0);this.start=a;this.end=b;this.categoryAxis.zoom(a,b);this.zoomAxesAndGraphs();this.zoomScrollbar();0!==a||b!=this.chartData.length-1?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchIndexZoomEvent()}},updateGraphs:function(){e.AmSerialChart.base.updateGraphs.call(this);var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.columnWidthReal=this.columnWidth;c.categoryAxis=this.categoryAxis;e.isString(c.fillToGraph)&&(c.fillToGraph=this.getGraphById(c.fillToGraph))}},
updateColumnsDepth:function(){var a,b=this.graphs,c;e.remove(this.columnsSet);this.columnsArray=[];for(a=0;a<b.length;a++){c=b[a];var d=c.columnsArray;if(d){var g;for(g=0;g<d.length;g++)this.columnsArray.push(d[g])}}this.columnsArray.sort(this.compareDepth);if(0<this.columnsArray.length){b=this.container.set();this.columnSet.push(b);for(a=0;a<this.columnsArray.length;a++)b.push(this.columnsArray[a].column.set);c&&b.translate(c.x,c.y);this.columnsSet=b}},compareDepth:function(a,b){return a.depth>b.depth?
1:-1},zoomScrollbar:function(){var a=this.chartScrollbar,b=this.categoryAxis;a&&this.updateScrollbar&&a.enabled&&(a.dragger.stop(),b.parseDates&&!b.equalSpacing?a.timeZoom(this.startTime,this.endTime):a.zoom(this.start,this.end),this.updateScrollbar=!0)},updateTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b],c=e.processObject(c,e.TrendLine,this.theme);a[b]=c;c.chart=this;c.id||(c.id="trendLineAuto"+b+"_"+(new Date).getTime());e.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));
c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.categoryAxis=this.categoryAxis}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){var a=this.valueAxes,b;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);a=this.graphs;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);this.zoomTrendLines();(b=this.chartCursor)&&b.zoom(this.start,this.end,this.startTime,this.endTime)}},countColumns:function(){var a=0,b=this.valueAxes.length,c=this.graphs.length,d,e,h=!1,f,m;for(m=0;m<b;m++){e=this.valueAxes[m];
var l=e.stackType;if("100%"==l||"regular"==l)for(h=!1,f=0;f<c;f++)d=this.graphs[f],d.tcc=1,d.valueAxis==e&&"column"==d.type&&(!h&&d.stackable&&(a++,h=!0),(!d.stackable&&d.clustered||d.newStack)&&a++,d.columnIndex=a-1,d.clustered||(d.columnIndex=0));if("none"==l||"3d"==l){h=!1;for(f=0;f<c;f++)d=this.graphs[f],d.valueAxis==e&&"column"==d.type&&(d.clustered?(d.tcc=1,d.newStack&&(a=0),d.hidden||(d.columnIndex=a,a++)):d.hidden||(h=!0,d.tcc=1,d.columnIndex=0));h&&0===a&&(a=1)}if("3d"==l){e=1;for(m=0;m<
c;m++)d=this.graphs[m],d.newStack&&e++,d.depthCount=e,d.tcc=a;a=e}}return a},parseData:function(){e.AmSerialChart.base.parseData.call(this);this.parseSerialData(this.dataProvider)},getCategoryIndexByValue:function(a){var b=this.chartData,c,d;for(d=0;d<b.length;d++)b[d].category==a&&(c=d);return c},handleCursorChange:function(a){this.updateLegendValues(a.index)},handleCursorZoom:function(a){this.updateScrollbar=!0;this.zoom(a.start,a.end)},handleScrollbarZoom:function(a){this.updateScrollbar=!1;this.zoom(a.start,
a.end)},dispatchTimeZoomEvent:function(){if(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime){var a={type:"zoomed"};a.startDate=new Date(this.startTime);a.endDate=new Date(this.endTime);a.startIndex=this.start;a.endIndex=this.end;this.startIndex=this.start;this.endIndex=this.end;this.startDate=a.startDate;this.endDate=a.endDate;this.prevStartTime=this.startTime;this.prevEndTime=this.endTime;var b=this.categoryAxis,c=e.extractPeriod(b.minPeriod).period,b=b.dateFormatsObject[c];a.startValue=
e.formatDate(a.startDate,b,this);a.endValue=e.formatDate(a.endDate,b,this);a.chart=this;a.target=this;this.fire(a.type,a)}},dispatchIndexZoomEvent:function(){if(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end){this.startIndex=this.start;this.endIndex=this.end;var a=this.chartData;if(e.ifArray(a)&&!isNaN(this.start)&&!isNaN(this.end)){var b={chart:this,target:this,type:"zoomed"};b.startIndex=this.start;b.endIndex=this.end;b.startValue=a[this.start].category;b.endValue=a[this.end].category;
this.categoryAxis.parseDates&&(this.startTime=a[this.start].time,this.endTime=a[this.end].time,b.startDate=new Date(this.startTime),b.endDate=new Date(this.endTime));this.prevStartIndex=this.start;this.prevEndIndex=this.end;this.fire(b.type,b)}}},updateLegendValues:function(a){var b=this.graphs,c;for(c=0;c<b.length;c++){var d=b[c];isNaN(a)?d.currentDataItem=void 0:d.currentDataItem=this.chartData[a].axes[d.valueAxis.id].graphs[d.id]}this.legend&&this.legend.updateValues()},getClosestIndex:function(a,
b,c,d,e,h){0>e&&(e=0);h>a.length-1&&(h=a.length-1);var f=e+Math.round((h-e)/2),m=a[f][b];if(c==m)return f;if(1>=h-e){if(d)return e;d=a[h][b];return Math.abs(a[e][b]-c)<Math.abs(d-c)?e:h}return c==m?f:c<m?this.getClosestIndex(a,b,c,d,e,f):this.getClosestIndex(a,b,c,d,f,h)},zoomToIndexes:function(a,b){this.updateScrollbar=!0;var c=this.chartData;if(c){var d=c.length;0<d&&(0>a&&(a=0),b>d-1&&(b=d-1),d=this.categoryAxis,d.parseDates&&!d.equalSpacing?this.zoom(c[a].time,this.getEndTime(c[b].time)):this.zoom(a,
b))}},zoomToDates:function(a,b){this.updateScrollbar=!0;var c=this.chartData;if(this.categoryAxis.equalSpacing){var d=this.getClosestIndex(c,"time",a.getTime(),!0,0,c.length);b=e.resetDateToMin(b,this.categoryAxis.minPeriod,1);c=this.getClosestIndex(c,"time",b.getTime(),!1,0,c.length);this.zoom(d,c)}else this.zoom(a.getTime(),b.getTime())},zoomToCategoryValues:function(a,b){this.updateScrollbar=!0;this.zoom(this.getCategoryIndexByValue(a),this.getCategoryIndexByValue(b))},formatPeriodString:function(a,
b){if(b){var c=["value","open","low","high","close"],d="value open low high close average sum count".split(" "),g=b.valueAxis,h=this.chartData,f=b.numberFormatter;f||(f=this.nf);for(var m=0;m<c.length;m++){for(var l=c[m],k=0,p=0,n,x,A,v,t,u=0,q=0,r,w,z,B,F,G=this.start;G<=this.end;G++){var y=h[G];if(y&&(y=y.axes[g.id].graphs[b.id])){if(y.values){var C=y.values[l];if(this.rotate){if(0>y.x||y.x>y.graph.height)C=NaN}else if(0>y.x||y.x>y.graph.width)C=NaN;if(!isNaN(C)){isNaN(n)&&(n=C);x=C;if(isNaN(A)||
A>C)A=C;if(isNaN(v)||v<C)v=C;t=e.getDecimals(k);var E=e.getDecimals(C),k=k+C,k=e.roundTo(k,Math.max(t,E));p++;t=k/p}}if(y.percents&&(y=y.percents[l],!isNaN(y))){isNaN(r)&&(r=y);w=y;if(isNaN(z)||z>y)z=y;if(isNaN(B)||B<y)B=y;F=e.getDecimals(u);C=e.getDecimals(y);u+=y;u=e.roundTo(u,Math.max(F,C));q++;F=u/q}}}u={open:r,close:w,high:B,low:z,average:F,sum:u,count:q};a=e.formatValue(a,{open:n,close:x,high:v,low:A,average:t,sum:k,count:p},d,f,l+"\\.",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);
a=e.formatValue(a,u,d,this.pf,"percents\\."+l+"\\.")}}return a=e.cleanFromEmpty(a)},formatString:function(a,b,c){var d=b.graph;if(-1!=a.indexOf("[[category]]")){var g=b.serialDataItem.category;if(this.categoryAxis.parseDates){var h=this.balloonDateFormat,f=this.chartCursor;f&&(h=f.categoryBalloonDateFormat);-1!=a.indexOf("[[category]]")&&(h=e.formatDate(g,h,this),-1!=h.indexOf("fff")&&(h=e.formatMilliseconds(h,g)),g=h)}a=a.replace(/\[\[category\]\]/g,String(g))}g=d.numberFormatter;g||(g=this.nf);
h=b.graph.valueAxis;(f=h.duration)&&!isNaN(b.values.value)&&(f=e.formatDuration(b.values.value,f,"",h.durationUnits,h.maxInterval,g),a=a.replace(RegExp("\\[\\[value\\]\\]","g"),f));"date"==h.type&&(h=e.formatDate(new Date(b.values.value),d.dateFormat,this),f=RegExp("\\[\\[value\\]\\]","g"),a=a.replace(f,h),h=e.formatDate(new Date(b.values.open),d.dateFormat,this),f=RegExp("\\[\\[open\\]\\]","g"),a=a.replace(f,h));d="value open low high close total".split(" ");h=this.pf;a=e.formatValue(a,b.percents,
d,h,"percents\\.");a=e.formatValue(a,b.values,d,g,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=e.formatValue(a,b.values,["percents"],h);-1!=a.indexOf("[[")&&(a=e.formatDataContextValue(a,b.dataContext));-1!=a.indexOf("[[")&&b.graph.customData&&(a=e.formatDataContextValue(a,b.graph.customData));return a=e.AmSerialChart.base.formatString.call(this,a,b,c)},addChartScrollbar:function(a){e.callMethod("destroy",[this.chartScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",
this.handleScrollbarZoom));this.rotate?void 0===a.width&&(a.width=a.scrollbarHeight):void 0===a.height&&(a.height=a.scrollbarHeight);this.chartScrollbar=a},removeChartScrollbar:function(){e.callMethod("destroy",[this.chartScrollbar]);this.chartScrollbar=null},handleReleaseOutside:function(a){e.AmSerialChart.base.handleReleaseOutside.call(this,a);e.callMethod("handleReleaseOutside",[this.chartScrollbar])},update:function(){e.AmSerialChart.base.update.call(this);this.chartScrollbar&&this.chartScrollbar.update&&
this.chartScrollbar.update()}})})();(function(){var e=window.AmCharts;e.Cuboid=e.Class({construct:function(a,b,c,d,e,h,f,m,l,k,p,n,x,A,v,t,u){this.set=a.set();this.container=a;this.h=Math.round(c);this.w=Math.round(b);this.dx=d;this.dy=e;this.colors=h;this.alpha=f;this.bwidth=m;this.bcolor=l;this.balpha=k;this.dashLength=A;this.topRadius=t;this.pattern=v;this.rotate=x;this.bcn=u;x?0>b&&0===p&&(p=180):0>c&&270==p&&(p=90);this.gradientRotation=p;0===d&&0===e&&(this.cornerRadius=n);this.draw()},draw:function(){var a=this.set;a.clear();
var b=this.container,c=b.chart,d=this.w,g=this.h,h=this.dx,f=this.dy,m=this.colors,l=this.alpha,k=this.bwidth,p=this.bcolor,n=this.balpha,x=this.gradientRotation,A=this.cornerRadius,v=this.dashLength,t=this.pattern,u=this.topRadius,q=this.bcn,r=m,w=m;"object"==typeof m&&(r=m[0],w=m[m.length-1]);var z,B,F,G,y,C,E,L,M,Q=l;t&&(l=0);var D,H,I,J,K=this.rotate;if(0<Math.abs(h)||0<Math.abs(f))if(isNaN(u))E=w,w=e.adjustLuminosity(r,-.2),w=e.adjustLuminosity(r,-.2),z=e.polygon(b,[0,h,d+h,d,0],[0,f,f,0,0],
w,l,1,p,0,x),0<n&&(M=e.line(b,[0,h,d+h],[0,f,f],p,n,k,v)),B=e.polygon(b,[0,0,d,d,0],[0,g,g,0,0],w,l,1,p,0,x),B.translate(h,f),0<n&&(F=e.line(b,[h,h],[f,f+g],p,n,k,v)),G=e.polygon(b,[0,0,h,h,0],[0,g,g+f,f,0],w,l,1,p,0,x),y=e.polygon(b,[d,d,d+h,d+h,d],[0,g,g+f,f,0],w,l,1,p,0,x),0<n&&(C=e.line(b,[d,d+h,d+h,d],[0,f,g+f,g],p,n,k,v)),w=e.adjustLuminosity(E,.2),E=e.polygon(b,[0,h,d+h,d,0],[g,g+f,g+f,g,g],w,l,1,p,0,x),0<n&&(L=e.line(b,[0,h,d+h],[g,g+f,g+f],p,n,k,v));else{var N,O,P;K?(N=g/2,w=h/2,P=g/2,O=
d+h/2,H=Math.abs(g/2),D=Math.abs(h/2)):(w=d/2,N=f/2,O=d/2,P=g+f/2+1,D=Math.abs(d/2),H=Math.abs(f/2));I=D*u;J=H*u;.1<D&&.1<D&&(z=e.circle(b,D,r,l,k,p,n,!1,H),z.translate(w,N));.1<I&&.1<I&&(E=e.circle(b,I,e.adjustLuminosity(r,.5),l,k,p,n,!1,J),E.translate(O,P))}l=Q;1>Math.abs(g)&&(g=0);1>Math.abs(d)&&(d=0);!isNaN(u)&&(0<Math.abs(h)||0<Math.abs(f))?(m=[r],m={fill:m,stroke:p,"stroke-width":k,"stroke-opacity":n,"fill-opacity":l},K?(l="M0,0 L"+d+","+(g/2-g/2*u),k=" B",0<d&&(k=" A"),e.VML?(l+=k+Math.round(d-
I)+","+Math.round(g/2-J)+","+Math.round(d+I)+","+Math.round(g/2+J)+","+d+",0,"+d+","+g,l=l+(" L0,"+g)+(k+Math.round(-D)+","+Math.round(g/2-H)+","+Math.round(D)+","+Math.round(g/2+H)+",0,"+g+",0,0")):(l+="A"+I+","+J+",0,0,0,"+d+","+(g-g/2*(1-u))+"L0,"+g,l+="A"+D+","+H+",0,0,1,0,0"),D=90):(k=d/2-d/2*u,l="M0,0 L"+k+","+g,e.VML?(l="M0,0 L"+k+","+g,k=" B",0>g&&(k=" A"),l+=k+Math.round(d/2-I)+","+Math.round(g-J)+","+Math.round(d/2+I)+","+Math.round(g+J)+",0,"+g+","+d+","+g,l+=" L"+d+",0",l+=k+Math.round(d/
2+D)+","+Math.round(H)+","+Math.round(d/2-D)+","+Math.round(-H)+","+d+",0,0,0"):(l+="A"+I+","+J+",0,0,0,"+(d-d/2*(1-u))+","+g+"L"+d+",0",l+="A"+D+","+H+",0,0,1,0,0"),D=180),b=b.path(l).attr(m),b.gradient("linearGradient",[r,e.adjustLuminosity(r,-.3),e.adjustLuminosity(r,-.3),r],D),K?b.translate(h/2,0):b.translate(0,f/2)):b=0===g?e.line(b,[0,d],[0,0],p,n,k,v):0===d?e.line(b,[0,0],[0,g],p,n,k,v):0<A?e.rect(b,d,g,m,l,k,p,n,A,x,v):e.polygon(b,[0,0,d,d,0],[0,g,g,0,0],m,l,k,p,n,x,!1,v);d=isNaN(u)?0>g?[z,
M,B,F,G,y,C,E,L,b]:[E,L,B,F,G,y,z,M,C,b]:K?0<d?[z,b,E]:[E,b,z]:0>g?[z,b,E]:[E,b,z];e.setCN(c,b,q+"front");e.setCN(c,B,q+"back");e.setCN(c,E,q+"top");e.setCN(c,z,q+"bottom");e.setCN(c,G,q+"left");e.setCN(c,y,q+"right");for(z=0;z<d.length;z++)if(B=d[z])a.push(B),e.setCN(c,B,q+"element");t&&b.pattern(t,NaN,c.path)},width:function(a){isNaN(a)&&(a=0);this.w=Math.round(a);this.draw()},height:function(a){isNaN(a)&&(a=0);this.h=Math.round(a);this.draw()},animateHeight:function(a,b){var c=this;c.easing=b;
c.totalFrames=Math.round(1E3*a/e.updateRate);c.rh=c.h;c.frame=0;c.height(1);setTimeout(function(){c.updateHeight.call(c)},e.updateRate)},updateHeight:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rh-1,b),a.height(b),setTimeout(function(){a.updateHeight.call(a)},e.updateRate))},animateWidth:function(a,b){var c=this;c.easing=b;c.totalFrames=Math.round(1E3*a/e.updateRate);c.rw=c.w;c.frame=0;c.width(1);setTimeout(function(){c.updateWidth.call(c)},e.updateRate)},
updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),setTimeout(function(){a.updateWidth.call(a)},e.updateRate))}})})();(function(){var e=window.AmCharts;e.CategoryAxis=e.Class({inherits:e.AxisBase,construct:function(a){this.cname="CategoryAxis";e.CategoryAxis.base.construct.call(this,a);this.minPeriod="DD";this.equalSpacing=this.parseDates=!1;this.position="bottom";this.startOnAxis=!1;this.firstDayOfWeek=1;this.gridPosition="middle";this.markPeriodChange=this.boldPeriodBeginning=!0;this.safeDistance=30;this.centerLabelOnFullPeriod=!0;e.applyTheme(this,a,this.cname)},draw:function(){e.CategoryAxis.base.draw.call(this);
this.generateDFObject();var a=this.chart.chartData;this.data=a;if(e.ifArray(a)){var b,c=this.chart;"scrollbar"!=this.id?(e.setCN(c,this.set,"category-axis"),e.setCN(c,this.labelsSet,"category-axis"),e.setCN(c,this.axisLine.axisSet,"category-axis")):this.bcn=this.id+"-";var d=this.start,g=this.labelFrequency,h=0,f=this.end-d+1,m=this.gridCountR,l=this.showFirstLabel,k=this.showLastLabel,p,n="",n=e.extractPeriod(this.minPeriod),x=e.getPeriodDuration(n.period,n.count),A,v,t,u,q;A=this.rotate;b=this.firstDayOfWeek;
p=this.boldPeriodBeginning;var r=e.resetDateToMin(new Date(a[a.length-1].time+1.05*x),this.minPeriod,1,b).getTime();this.firstTime=c.firstTime;this.endTime>r&&(this.endTime=r);q=this.minorGridEnabled;var w,r=this.gridAlpha;if(this.parseDates&&!this.equalSpacing)this.lastTime=a[a.length-1].time,this.maxTime=e.resetDateToMin(new Date(this.lastTime+1.05*x),this.minPeriod,1,b).getTime(),this.timeDifference=this.endTime-this.startTime,this.parseDatesDraw();else if(!this.parseDates){if(this.cellWidth=this.getStepWidth(f),
f<m&&(m=f),h+=this.start,this.stepWidth=this.getStepWidth(f),0<m){m=Math.floor(f/m);w=this.chooseMinorFrequency(m);f=h;f/2==Math.round(f/2)&&f--;0>f&&(f=0);var z=0;this.end-f+1>=this.autoRotateCount&&(this.labelRotation=this.autoRotateAngle);for(b=f;b<=this.end+2;b++){p=!1;0<=b&&b<this.data.length?(v=this.data[b],n=v.category,p=v.forceShow):n="";if(q&&!isNaN(w))if(b/w==Math.round(b/w)||p)b/m==Math.round(b/m)||p||(this.gridAlpha=this.minorGridAlpha,n=void 0);else continue;else if(b/m!=Math.round(b/
m)&&!p)continue;f=this.getCoordinate(b-h);t=0;"start"==this.gridPosition&&(f-=this.cellWidth/2,t=this.cellWidth/2);p=!0;a=t;"start"==this.tickPosition&&(a=0,p=!1,t=0);if(b==d&&!l||b==this.end&&!k)n=void 0;Math.round(z/g)!=z/g&&(n=void 0);z++;var B=this.cellWidth;A&&(B=NaN);this.labelFunction&&v&&(n=this.labelFunction(n,v,this));n=e.fixBrakes(n);x=!1;this.boldLabels&&(x=!0);b>this.end&&"start"==this.tickPosition&&(n=" ");this.rotate&&this.inside&&(t=-2);t=new this.axisItemRenderer(this,f,n,p,B,t,void 0,
x,a,!1,v.labelColor,v.className);t.serialDataItem=v;this.pushAxisItem(t);this.gridAlpha=r}}}else if(this.parseDates&&this.equalSpacing){h=this.start;this.startTime=this.data[this.start].time;this.endTime=this.data[this.end].time;this.timeDifference=this.endTime-this.startTime;d=this.choosePeriod(0);g=d.period;A=d.count;a=e.getPeriodDuration(g,A);a<x&&(g=n.period,A=n.count,a=x);v=g;"WW"==v&&(v="DD");this.stepWidth=this.getStepWidth(f);m=Math.ceil(this.timeDifference/a)+1;n=e.resetDateToMin(new Date(this.startTime-
a),g,A,b).getTime();this.cellWidth=this.getStepWidth(f);f=Math.round(n/a);d=-1;f/2==Math.round(f/2)&&(d=-2,n-=a);f=this.start;f/2==Math.round(f/2)&&f--;0>f&&(f=0);a=this.end+2;a>=this.data.length&&(a=this.data.length);B=!1;B=!l;this.previousPos=-1E3;20<this.labelRotation&&(this.safeDistance=5);var F=f;if(this.data[f].time!=e.resetDateToMin(new Date(this.data[f].time),g,A,b).getTime()){var x=0,G=n;for(b=f;b<a;b++)u=this.data[b].time,this.checkPeriodChange(g,A,u,G)&&(x++,2<=x&&(F=b,b=a),G=u)}q&&1<A&&
(w=this.chooseMinorFrequency(A),e.getPeriodDuration(g,w));if(0<this.gridCountR)for(b=f;b<a;b++)if(u=this.data[b].time,this.checkPeriodChange(g,A,u,n)&&b>=F){f=this.getCoordinate(b-this.start);q=!1;this.nextPeriod[v]&&(q=this.checkPeriodChange(this.nextPeriod[v],1,u,n,v));x=!1;q&&this.markPeriodChange?(q=this.dateFormatsObject[this.nextPeriod[v]],x=!0):q=this.dateFormatsObject[v];n=e.formatDate(new Date(u),q,c);if(b==d&&!l||b==m&&!k)n=" ";B?B=!1:(p||(x=!1),f-this.previousPos>this.safeDistance*Math.cos(this.labelRotation*
Math.PI/180)&&(this.labelFunction&&(n=this.labelFunction(n,new Date(u),this,g,A,t)),this.boldLabels&&(x=!0),t=new this.axisItemRenderer(this,f,n,void 0,void 0,void 0,void 0,x),q=t.graphics(),this.pushAxisItem(t),q=q.getBBox().width,e.isModern||(q-=f),this.previousPos=f+q));t=n=u}else isNaN(w)||(this.checkPeriodChange(g,w,u,z)&&(this.gridAlpha=this.minorGridAlpha,f=this.getCoordinate(b-this.start),q=new this.axisItemRenderer(this,f,void 0,void 0,void 0,void 0,void 0,void 0,void 0,!0),this.pushAxisItem(q),
z=u),this.gridAlpha=r)}for(b=0;b<this.data.length;b++)if(l=this.data[b])k=this.parseDates&&!this.equalSpacing?Math.round((l.time-this.startTime)*this.stepWidth+this.cellWidth/2):this.getCoordinate(b-h),l.x[this.id]=k;l=this.guides.length;for(b=0;b<l;b++)k=this.guides[b],q=p=q=r=d=NaN,w=k.above,k.toCategory&&(p=c.getCategoryIndexByValue(k.toCategory),isNaN(p)||(d=this.getCoordinate(p-h),k.expand&&(d+=this.cellWidth/2),t=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,k),this.pushAxisItem(t,w))),k.category&&
(q=c.getCategoryIndexByValue(k.category),isNaN(q)||(r=this.getCoordinate(q-h),k.expand&&(r-=this.cellWidth/2),q=(d-r)/2,t=new this.axisItemRenderer(this,r,k.label,!0,NaN,q,k),this.pushAxisItem(t,w))),q=c.dataDateFormat,k.toDate&&(k.toDate=e.getDate(k.toDate,q,this.minPeriod),this.equalSpacing?(p=c.getClosestIndex(this.data,"time",k.toDate.getTime(),!1,0,this.data.length-1),isNaN(p)||(d=this.getCoordinate(p-h))):d=(k.toDate.getTime()-this.startTime)*this.stepWidth,t=new this.axisItemRenderer(this,
d,"",!0,NaN,NaN,k),this.pushAxisItem(t,w)),k.date&&(k.date=e.getDate(k.date,q,this.minPeriod),this.equalSpacing?(q=c.getClosestIndex(this.data,"time",k.date.getTime(),!1,0,this.data.length-1),isNaN(q)||(r=this.getCoordinate(q-h))):r=(k.date.getTime()-this.startTime)*this.stepWidth,q=(d-r)/2,p=!0,k.toDate&&(p=!1),t="H"==this.orientation?new this.axisItemRenderer(this,r,k.label,p,2*q,NaN,k):new this.axisItemRenderer(this,r,k.label,!1,NaN,q,k),this.pushAxisItem(t,w)),(0<d||0<r)&&(d<this.width||r<this.width)&&
(d=new this.guideFillRenderer(this,r,d,k),r=d.graphics(),this.pushAxisItem(d,w),k.graphics=r,r.index=b,k.balloonText&&this.addEventListeners(r,k))}this.axisCreated=!0;c=this.x;h=this.y;this.set.translate(c,h);this.labelsSet.translate(c,h);this.positionTitle();(c=this.axisLine.set)&&c.toFront();c=this.getBBox().height;2<c-this.previousHeight&&this.autoWrap&&!this.parseDates&&(this.axisCreated=this.chart.marginsUpdated=!1);this.previousHeight=c},xToIndex:function(a){var b=this.data,c=this.chart,d=c.rotate,
g=this.stepWidth;this.parseDates&&!this.equalSpacing?(a=this.startTime+Math.round(a/g)-this.minDuration()/2,c=c.getClosestIndex(b,"time",a,!1,this.start,this.end+1)):(this.startOnAxis||(a-=g/2),c=this.start+Math.round(a/g));var c=e.fitToBounds(c,0,b.length-1),h;b[c]&&(h=b[c].x[this.id]);d?h>this.height+1&&c--:h>this.width+1&&c--;0>h&&c++;return c=e.fitToBounds(c,0,b.length-1)},dateToCoordinate:function(a){return this.parseDates&&!this.equalSpacing?(a.getTime()-this.startTime)*this.stepWidth:this.parseDates&&
this.equalSpacing?(a=this.chart.getClosestIndex(this.data,"time",a.getTime(),!1,0,this.data.length-1),this.getCoordinate(a-this.start)):NaN},categoryToCoordinate:function(a){return this.chart?(a=this.chart.getCategoryIndexByValue(a),this.getCoordinate(a-this.start)):NaN},coordinateToDate:function(a){return this.equalSpacing?(a=this.xToIndex(a),new Date(this.data[a].time)):new Date(this.startTime+a/this.stepWidth)},getCoordinate:function(a){a*=this.stepWidth;this.startOnAxis||(a+=this.stepWidth/2);
return Math.round(a)}})})();
AmCharts.themes.light = {

	themeName:"light",

	AmChart: {
		color: "#000000", backgroundColor: "#FFFFFF"
	},

	AmCoordinateChart: {
		colors: ["#67b7dc", "#fdd400", "#84b761", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"]
	},

	AmStockChart: {
		colors: ["#67b7dc", "#fdd400", "#84b761", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"]
	},

	AmSlicedChart: {
		colors: ["#67b7dc", "#fdd400", "#84b761", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"],
		outlineAlpha: 1,
		outlineThickness: 2,
		labelTickColor: "#000000",
		labelTickAlpha: 0.3
	},

	AmRectangularChart: {
		zoomOutButtonColor: '#000000',
		zoomOutButtonRollOverAlpha: 0.15,
		zoomOutButtonImage: "lens.png"
	},

	AxisBase: {
		axisColor: "#000000",
		axisAlpha: 0.3,
		gridAlpha: 0.1,
		gridColor: "#000000"
	},

	ChartScrollbar: {
		backgroundColor: "#000000",
		backgroundAlpha: 0.12,
		graphFillAlpha: 0.5,
		graphLineAlpha: 0,
		selectedBackgroundColor: "#FFFFFF",
		selectedBackgroundAlpha: 0.4,
		gridAlpha: 0.15
	},

	ChartCursor: {
		cursorColor: "#000000",
		color: "#FFFFFF",
		cursorAlpha: 0.5
	},

	AmLegend: {
		color: "#000000"
	},

	AmGraph: {
		lineAlpha: 0.9
	},
	GaugeArrow: {
		color: "#000000",
		alpha: 0.8,
		nailAlpha: 0,
		innerRadius: "40%",
		nailRadius: 15,
		startWidth: 15,
		borderAlpha: 0.8,
		nailBorderAlpha: 0
	},

	GaugeAxis: {
		tickColor: "#000000",
		tickAlpha: 1,
		tickLength: 15,
		minorTickLength: 8,
		axisThickness: 3,
		axisColor: '#000000',
		axisAlpha: 1,
		bandAlpha: 0.8
	},

	TrendLine: {
		lineColor: "#c03246",
		lineAlpha: 0.8
	},

	// ammap
	AreasSettings: {
		alpha: 0.8,
		color: "#67b7dc",
		colorSolid: "#003767",
		unlistedAreasAlpha: 0.4,
		unlistedAreasColor: "#000000",
		outlineColor: "#FFFFFF",
		outlineAlpha: 0.5,
		outlineThickness: 0.5,
		rollOverColor: "#3c5bdc",
		rollOverOutlineColor: "#FFFFFF",
		selectedOutlineColor: "#FFFFFF",
		selectedColor: "#f15135",
		unlistedAreasOutlineColor: "#FFFFFF",
		unlistedAreasOutlineAlpha: 0.5
	},

	LinesSettings: {
		color: "#000000",
		alpha: 0.8
	},

	ImagesSettings: {
		alpha: 0.8,
		labelColor: "#000000",
		color: "#000000",
		labelRollOverColor: "#3c5bdc"
	},

	ZoomControl: {
		buttonRollOverColor: "#3c5bdc",
		buttonFillColor: "#3994e2",
		buttonBorderColor: "#3994e2",
		buttonFillAlpha: 0.8,
		gridBackgroundColor: "#FFFFFF",
		buttonBorderAlpha:0,
		buttonCornerRadius:2,
		gridColor:"#FFFFFF",
		gridBackgroundColor:"#000000",
		buttonIconAlpha:0.6,
		gridAlpha: 0.6,
		buttonSize:20
	},

	SmallMap: {
		mapColor: "#000000",
		rectangleColor: "#f15135",
		backgroundColor: "#FFFFFF",
		backgroundAlpha: 0.7,
		borderThickness: 1,
		borderAlpha: 0.8
	},

	// the defaults below are set using CSS syntax, you can use any existing css property
	// if you don't use Stock chart, you can delete lines below
	PeriodSelector: {
		color: "#000000"
	},

	PeriodButton: {
		color: "#000000",
		background: "transparent",
		opacity: 0.7,
		border: "1px solid rgba(0, 0, 0, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		boxSizing: "border-box"
	},

	PeriodButtonSelected: {
		color: "#000000",
		backgroundColor: "#b9cdf5",
		border: "1px solid rgba(0, 0, 0, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		opacity: 1,
		boxSizing: "border-box"
	},

	PeriodInputField: {
		color: "#000000",
		background: "transparent",
		border: "1px solid rgba(0, 0, 0, .3)",
		outline: "none"
	},

	DataSetSelector: {

		color: "#000000",
		selectedBackgroundColor: "#b9cdf5",
		rollOverBackgroundColor: "#a8b0e4"
	},

	DataSetCompareList: {
		color: "#000000",
		lineHeight: "100%",
		boxSizing: "initial",
		webkitBoxSizing: "initial",
		border: "1px solid rgba(0, 0, 0, .3)"
	},

	DataSetSelect: {
		border: "1px solid rgba(0, 0, 0, .3)",
		outline: "none"
	}

};
/*
 * jQuery Easing v1.4.1 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Open source under the BSD License.
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(['jquery'], function ($) {
			return factory($);
		});
	} else if (typeof module === "object" && typeof module.exports === "object") {
		exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
})(function($){

// Preserve the original jQuery "swing" easing as "jswing"
$.easing.jswing = $.easing.swing;

var pow = Math.pow,
	sqrt = Math.sqrt,
	sin = Math.sin,
	cos = Math.cos,
	PI = Math.PI,
	c1 = 1.70158,
	c2 = c1 * 1.525,
	c3 = c1 + 1,
	c4 = ( 2 * PI ) / 3,
	c5 = ( 2 * PI ) / 4.5;

// x is the fraction of animation progress, in the range 0..1
function bounceOut(x) {
	var n1 = 7.5625,
		d1 = 2.75;
	if ( x < 1/d1 ) {
		return n1*x*x;
	} else if ( x < 2/d1 ) {
		return n1*(x-=(1.5/d1))*x + 0.75;
	} else if ( x < 2.5/d1 ) {
		return n1*(x-=(2.25/d1))*x + 0.9375;
	} else {
		return n1*(x-=(2.625/d1))*x + 0.984375;
	}
}

$.extend( $.easing,
{
	def: 'easeOutQuad',
	swing: function (x) {
		return $.easing[$.easing.def](x);
	},
	easeInQuad: function (x) {
		return x * x;
	},
	easeOutQuad: function (x) {
		return 1 - ( 1 - x ) * ( 1 - x );
	},
	easeInOutQuad: function (x) {
		return x < 0.5 ?
			2 * x * x :
			1 - pow( -2 * x + 2, 2 ) / 2;
	},
	easeInCubic: function (x) {
		return x * x * x;
	},
	easeOutCubic: function (x) {
		return 1 - pow( 1 - x, 3 );
	},
	easeInOutCubic: function (x) {
		return x < 0.5 ?
			4 * x * x * x :
			1 - pow( -2 * x + 2, 3 ) / 2;
	},
	easeInQuart: function (x) {
		return x * x * x * x;
	},
	easeOutQuart: function (x) {
		return 1 - pow( 1 - x, 4 );
	},
	easeInOutQuart: function (x) {
		return x < 0.5 ?
			8 * x * x * x * x :
			1 - pow( -2 * x + 2, 4 ) / 2;
	},
	easeInQuint: function (x) {
		return x * x * x * x * x;
	},
	easeOutQuint: function (x) {
		return 1 - pow( 1 - x, 5 );
	},
	easeInOutQuint: function (x) {
		return x < 0.5 ?
			16 * x * x * x * x * x :
			1 - pow( -2 * x + 2, 5 ) / 2;
	},
	easeInSine: function (x) {
		return 1 - cos( x * PI/2 );
	},
	easeOutSine: function (x) {
		return sin( x * PI/2 );
	},
	easeInOutSine: function (x) {
		return -( cos( PI * x ) - 1 ) / 2;
	},
	easeInExpo: function (x) {
		return x === 0 ? 0 : pow( 2, 10 * x - 10 );
	},
	easeOutExpo: function (x) {
		return x === 1 ? 1 : 1 - pow( 2, -10 * x );
	},
	easeInOutExpo: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
			pow( 2, 20 * x - 10 ) / 2 :
			( 2 - pow( 2, -20 * x + 10 ) ) / 2;
	},
	easeInCirc: function (x) {
		return 1 - sqrt( 1 - pow( x, 2 ) );
	},
	easeOutCirc: function (x) {
		return sqrt( 1 - pow( x - 1, 2 ) );
	},
	easeInOutCirc: function (x) {
		return x < 0.5 ?
			( 1 - sqrt( 1 - pow( 2 * x, 2 ) ) ) / 2 :
			( sqrt( 1 - pow( -2 * x + 2, 2 ) ) + 1 ) / 2;
	},
	easeInElastic: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 :
			-pow( 2, 10 * x - 10 ) * sin( ( x * 10 - 10.75 ) * c4 );
	},
	easeOutElastic: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 :
			pow( 2, -10 * x ) * sin( ( x * 10 - 0.75 ) * c4 ) + 1;
	},
	easeInOutElastic: function (x) {
		return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
			-( pow( 2, 20 * x - 10 ) * sin( ( 20 * x - 11.125 ) * c5 )) / 2 :
			pow( 2, -20 * x + 10 ) * sin( ( 20 * x - 11.125 ) * c5 ) / 2 + 1;
	},
	easeInBack: function (x) {
		return c3 * x * x * x - c1 * x * x;
	},
	easeOutBack: function (x) {
		return 1 + c3 * pow( x - 1, 3 ) + c1 * pow( x - 1, 2 );
	},
	easeInOutBack: function (x) {
		return x < 0.5 ?
			( pow( 2 * x, 2 ) * ( ( c2 + 1 ) * 2 * x - c2 ) ) / 2 :
			( pow( 2 * x - 2, 2 ) *( ( c2 + 1 ) * ( x * 2 - 2 ) + c2 ) + 2 ) / 2;
	},
	easeInBounce: function (x) {
		return 1 - bounceOut( 1 - x );
	},
	easeOutBounce: bounceOut,
	easeInOutBounce: function (x) {
		return x < 0.5 ?
			( 1 - bounceOut( 1 - 2 * x ) ) / 2 :
			( 1 + bounceOut( 2 * x - 1 ) ) / 2;
	}
});

});

// The MIT License (MIT)

// Typed.js | Copyright (c) 2016 Matt Boldt | www.mattboldt.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.




! function(window, document, $) {

	"use strict";

	var Typed = function(el, options) {
		var self = this;

		// chosen element to manipulate text
		this.el = el;

		// options
		this.options = {};
		Object.keys(defaults).forEach(function(key) {
			self.options[key] = defaults[key];
		});
		Object.keys(options).forEach(function(key) {
			self.options[key] = options[key];
		});

		// attribute to type into
		this.isInput = this.el.tagName.toLowerCase() === 'input';
		this.attr = this.options.attr;

		// show cursor
		this.showCursor = this.isInput ? false : this.options.showCursor;

		// text content of element
		this.elContent = this.attr ? this.el.getAttribute(this.attr) : this.el.textContent;

		// html or plain text
		this.contentType = this.options.contentType;

		// typing speed
		this.typeSpeed = this.options.typeSpeed;

		// add a delay before typing starts
		this.startDelay = this.options.startDelay;

		// backspacing speed
		this.backSpeed = this.options.backSpeed;

		// amount of time to wait before backspacing
		this.backDelay = this.options.backDelay;

		// Fade out instead of backspace
		this.fadeOut = this.options.fadeOut;
		this.fadeOutClass = this.options.fadeOutClass;
		this.fadeOutDelay = this.options.fadeOutDelay;

		// div containing strings
		if($ && this.options.stringsElement instanceof $) {
			this.stringsElement = this.options.stringsElement[0]
		} else {
			this.stringsElement = this.options.stringsElement;
		}

		// input strings of text
		this.strings = this.options.strings;

		// character number position of current string
		this.strPos = 0;

		// current array position
		this.arrayPos = 0;

		// number to stop backspacing on.
		// default 0, can change depending on how many chars
		// you want to remove at the time
		this.stopNum = 0;

		// Looping logic
		this.loop = this.options.loop;
		this.loopCount = this.options.loopCount;
		this.curLoop = 0;

		// for stopping
		this.stop = false;

		// custom cursor
		this.cursorChar = this.options.cursorChar;

		// shuffle the strings
		this.shuffle = this.options.shuffle;
		// the order of strings
		this.sequence = [];

		// All systems go!
		this.build();
	};

	Typed.prototype = {

		constructor: Typed,

		init: function() {
			// begin the loop w/ first current string (global self.strings)
			// current string will be passed as an argument each time after this
			var self = this;
			self.timeout = setTimeout(function() {
				for (var i=0;i<self.strings.length;++i) self.sequence[i]=i;

				// shuffle the array if true
				if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);

				// Start typing
				self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
			}, self.startDelay);
		},

		build: function() {
			var self = this;
			// Insert cursor
			if (this.showCursor === true) {
				this.cursor = document.createElement('span');
				this.cursor.className = 'typed-cursor';
				this.cursor.innerHTML = this.cursorChar;
				this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
			}
			if (this.stringsElement) {
				this.strings = [];
				this.stringsElement.style.display = 'none';
				var strings = Array.prototype.slice.apply(this.stringsElement.children);
				strings.forEach(function(stringElement){
					self.strings.push(stringElement.innerHTML);
				});
			}
			this.init();
		},

		// pass current string state to each function, types 1 char per call
		typewrite: function(curString, curStrPos) {
			// exit when stopped
			if (this.stop === true) {
				return;
			}

			if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
				this.el.classList.remove(this.fadeOutClass);
				this.cursor.classList.remove(this.fadeOutClass);
			}

			// varying values for setTimeout during typing
			// can't be global since number changes each time loop is executed
			var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
			var self = this;

			// ------------- optional ------------- //
			// backpaces a certain string faster
			// ------------------------------------ //
			// if (self.arrayPos == 1){
			//  self.backDelay = 50;
			// }
			// else{ self.backDelay = 500; }

			// contain typing function in a timeout humanize'd delay
			self.timeout = setTimeout(function() {
				// check for an escape character before a pause value
				// format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
				// single ^ are removed from string
				var charPause = 0;
				var substr = curString.substr(curStrPos);
				if (substr.charAt(0) === '^') {
					var skip = 1; // skip atleast 1
					if (/^\^\d+/.test(substr)) {
						substr = /\d+/.exec(substr)[0];
						skip += substr.length;
						charPause = parseInt(substr);
					}

					// strip out the escape character and pause value so they're not printed
					curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
				}

				if (self.contentType === 'html') {
					// skip over html tags while typing
					var curChar = curString.substr(curStrPos).charAt(0);
					if (curChar === '<' || curChar === '&') {
						var tag = '';
						var endTag = '';
						if (curChar === '<') {
							endTag = '>'
						}
						else {
							endTag = ';'
						}
						while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
							tag += curString.substr(curStrPos).charAt(0);
							curStrPos++;
							if (curStrPos + 1 > curString.length) { break; }
						}
						curStrPos++;
						tag += endTag;
					}
				}

				// timeout for any pause after a character
				self.timeout = setTimeout(function() {
					if (curStrPos === curString.length) {
						// fires callback function
						self.options.onStringTyped(self.arrayPos);

						// is this the final string
						if (self.arrayPos === self.strings.length - 1) {
							// animation that occurs on the last typed string
							self.options.callback();

							self.curLoop++;

							// quit if we wont loop back
							if (self.loop === false || self.curLoop === self.loopCount)
								return;
						}

						self.timeout = setTimeout(function() {
							self.backspace(curString, curStrPos);
						}, self.backDelay);

					} else {

						/* call before functions if applicable */
						if (curStrPos === 0) {
							self.options.preStringTyped(self.arrayPos);
						}

						// start typing each new char into existing string
						// curString: arg, self.el.html: original text inside element
						var nextString = curString.substr(0, curStrPos + 1);
						if (self.attr) {
							self.el.setAttribute(self.attr, nextString);
						} else {
							if (self.isInput) {
								self.el.value = nextString;
							} else if (self.contentType === 'html') {
								self.el.innerHTML = nextString;
							} else {
								self.el.textContent = nextString;
							}
						}

						// add characters one by one
						curStrPos++;
						// loop the function
						self.typewrite(curString, curStrPos);
					}
					// end of character pause
				}, charPause);

				// humanized value for typing
			}, humanize);

		},

		backspace: function(curString, curStrPos) {
			var self = this;
			// exit when stopped
			if (this.stop === true) {
				return;
			}

			if (this.fadeOut){
				this.initFadeOut();
				return;
			}

			// varying values for setTimeout during typing
			// can't be global since number changes each time loop is executed
			var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;

			self.timeout = setTimeout(function() {

				// ----- this part is optional ----- //
				// check string array position
				// on the first string, only delete one word
				// the stopNum actually represents the amount of chars to
				// keep in the current string. In my case it's 14.
				// if (self.arrayPos == 1){
				//  self.stopNum = 14;
				// }
				//every other time, delete the whole typed string
				// else{
				//  self.stopNum = 0;
				// }

				if (self.contentType === 'html') {
					// skip over html tags while backspacing
					if (curString.substr(curStrPos).charAt(0) === '>') {
						var tag = '';
						while (curString.substr(curStrPos - 1).charAt(0) !== '<') {
							tag -= curString.substr(curStrPos).charAt(0);
							curStrPos--;
							if (curStrPos < 0) { break; }
						}
						curStrPos--;
						tag += '<';
					}
				}

				// ----- continue important stuff ----- //
				// replace text with base text + typed characters
				var nextString = curString.substr(0, curStrPos);
				self.replaceText(nextString);

				// if the number (id of character in current string) is
				// less than the stop number, keep going
				if (curStrPos > self.stopNum) {
					// subtract characters one by one
					curStrPos--;
					// loop the function
					self.backspace(curString, curStrPos);
				}
				// if the stop number has been reached, increase
				// array position to next string
				else if (curStrPos <= self.stopNum) {
					self.arrayPos++;

					if (self.arrayPos === self.strings.length) {
						self.arrayPos = 0;

						// Shuffle sequence again
						if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);

						self.init();
					} else
						self.typewrite(self.strings[self.sequence[self.arrayPos]], curStrPos);
				}

				// humanized value for typing
			}, humanize);

		},

		// Adds a CSS class to fade out current string
		initFadeOut: function(){
			self = this;
			this.el.className += ' ' + this.fadeOutClass;
			this.cursor.className += ' ' + this.fadeOutClass;
			return setTimeout(function() {
				self.arrayPos++;
				self.replaceText('')
				self.typewrite(self.strings[self.sequence[self.arrayPos]], 0);
			}, self.fadeOutDelay);
		},

		// Replaces current text in the HTML element
		replaceText: function(str) {
			if (this.attr) {
				this.el.setAttribute(this.attr, str);
			} else {
				if (this.isInput) {
					this.el.value = str;
				} else if (this.contentType === 'html') {
					this.el.innerHTML = str;
				} else {
					this.el.textContent = str;
				}
			}
		},

		// Shuffles the numbers in the given array.
		shuffleArray: function(array) {
			var tmp, current, top = array.length;
			if(top) while(--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}
			return array;
		},

		// Start & Stop currently not working

		// , stop: function() {
		//     var self = this;

		//     self.stop = true;
		//     clearInterval(self.timeout);
		// }

		// , start: function() {
		//     var self = this;
		//     if(self.stop === false)
		//        return;

		//     this.stop = false;
		//     this.init();
		// }

		// Reset and rebuild the element
		reset: function() {
			var self = this;
			clearInterval(self.timeout);
			var id = this.el.getAttribute('id');
			this.el.textContent = '';
			if (typeof this.cursor !== 'undefined' && typeof this.cursor.parentNode !== 'undefined') {
				this.cursor.parentNode.removeChild(this.cursor);
			}
			this.strPos = 0;
			this.arrayPos = 0;
			this.curLoop = 0;
			// Send the callback
			this.options.resetCallback();
		}

	};

	Typed.new = function(selector, option) {
		var elements = Array.prototype.slice.apply(document.querySelectorAll(selector));
		elements.forEach(function(element) {
			var instance = element._typed,
			    options = typeof option == 'object' && option;
			if (instance) { instance.reset(); }
			element._typed = instance = new Typed(element, options);
			if (typeof option == 'string') instance[option]();
		});
	};

	if ($) {
		$.fn.typed = function(option) {
			return this.each(function() {
				var $this = $(this),
				    data = $this.data('typed'),
				    options = typeof option == 'object' && option;
				if (data) { data.reset(); }
				$this.data('typed', (data = new Typed(this, options)));
				if (typeof option == 'string') data[option]();
			});
		};
	}

	window.Typed = Typed;

	var defaults = {
		strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
		stringsElement: null,
		// typing speed
		typeSpeed: 0,
		// time before typing starts
		startDelay: 0,
		// backspacing speed
		backSpeed: 0,
		// shuffle the strings
		shuffle: false,
		// time before backspacing
		backDelay: 500,
		// Fade out instead of backspace
		fadeOut: false,
		fadeOutClass: 'typed-fade-out',
		fadeOutDelay: 500, // milliseconds
		// loop
		loop: false,
		// false = infinite
		loopCount: false,
		// show cursor
		showCursor: true,
		// character for cursor
		cursorChar: "|",
		// attribute to type (null == text)
		attr: null,
		// either html or text
		contentType: 'html',
		// call when done callback function
		callback: function() {},
		// starting callback function before each string
		preStringTyped: function() {},
		//callback for every typed string
		onStringTyped: function() {},
		// callback for reset
		resetCallback: function() {}
	};


}(window, document, window.jQuery);
