"use strict";
var HashArg = {};

HashArg.get = function(argdefs, argv) {
    var args = {};
    if(!argv || argv === process.argv) {
        argv = process.argv.slice(2);
    }
    var decl_list = HashArg.compile(argdefs);
    var i = 0;
    for(; i < decl_list.length; i++) {
        var argdef = decl_list[i];
        var type = argdef.type;
        var isArray = argdef.isArray;
        var name = argdef.name;
        var value = (i < argv.length ? argv[i] : argdef["default"]);
        switch(type) {
        case "":
            if(isArray) {
                value = [];
                while(i < argv.length) {
                    value.push(argv[i]);
                    i++;
                }
            }
            break;
        case "string":
            if(isArray) {
                value = [];
                while(i < argv.length) {
                    value.push(argv[i]);
                    i++;
                }
            } else if(value != null) {
                value = value.toString();
            }
            break;
        case "number":
            if(isArray) {
                value = [];
                while(i < argv.length) {
                    var element = parseFloat(argv[i]);
                    if(isNaN(element)) {
                        element = "NaN";
                    }
                    value.push(element);
                    i++;
                }
            } else {
                value = parseFloat(value);
                if(isNaN(value)) {
                    value = "NaN";
                }
            }
            break;
        }
        args[name] = value;
    }

    //
    // Undefiend extra parameters are stored into an array
    // of the blank key in the return object.
    //
    if(i < argv.length) {
        args[""] = [];
    }
    for(; i < argv.length; i++) {
        args[""].push(argv[i]);
    }
    return args;
};

HashArg.compile = function(argdefs) {
    if(typeof(argdefs) === "string") {
        if(argdefs.match(/;/)) {
            argdefs = argdefs.split(/\s*;\s*/);
        } else {
            argdefs = argdefs.split(/\s+/);
        }
    }
    var decl = [];
    for(var i = 0; i < argdefs.length; i++) {
        var argdef = argdefs[i];
        var type = "";
        var isArray = false;
        var name = "#" + i;
        var default_val = null;
        if(typeof(argdef) === "string") {
            var method = getTspecMethod(argdef);
            var argdef_default = null;
            if(argdef.match(/=/)) {
                var dflset = argdef.split(/\s*=\s*/);
                argdef = dflset[0];
                argdef_default = dflset[1];
            }
            if(method != null) {
                var typeSpec = analyzeArgDef(method, argdef);
                name = typeSpec.name;
                type = typeSpec.baseType;
                isArray = typeSpec.isArray;
            } else {
                name = argdef;
            }
            if(argdef_default != null && argdef_default != "") {
                var json = JSON.parse("{\"X\":" + argdef_default + "}");
                default_val = json.X;
            } else {
                default_val = argdef_default;
            }
        } else {
            if("type" in argdef) {
                type = argdef.type;
                isArray = isArrayType(argdef.type);
                type = getBaseType(argdef.type);
            }
            name = argdef.name || name;
            if("default" in argdef) {
                default_val = argdef["default"];
            }
        }
        if(isArray && i != argdefs.length - 1) {
            throw new Error(
                "The array type can be specified for the last argument.",
                "definition: '" + argdef + "'.");
        }
        decl.push({
            "name": name,
            "type": type,
            "isArray": isArray,
            "default": default_val
        });
    }
    return decl;
};

// Methods to specify a type
var TSPEC_METHODS = [
    {re: /:/,   iName: 0, iType: 1 },
    {re: /\s+/, iName: 1, iType: 0 }
];

/**
 * Determine the type specification method.
 *
 * @param {string} argdef An argument definition
 * @returns {RegExp|null} which matched.
 */
function getTspecMethod(argdef) {
    for(var i = 0; i < TSPEC_METHODS.length; i++) {
        if(argdef.match(TSPEC_METHODS[i].re)) {
            return TSPEC_METHODS[i];
        }
    }
    return null;
}

/**
 * @description
 * Analyze an argument definition.
 *
 * The returned object contains:
 * * name
 * * isArray
 * * baseType
 *
 * @param {object} method A type spec method that `getTspecMethod` returns.
 * @param {string} argdef An argument definition.
 * @returns {object} A result of analysis.
 */
function analyzeArgDef(method, argdef) {
    var def = argdef.split(method.re, 2);
    var stype = def[method.iType].trim();
    return {
        name: def[method.iName].trim(),
        isArray: isArrayType(stype),
        baseType: getBaseType(stype)
    };
}

/**
 * Check if The type is an array.
 *
 * @param {string} typeSpec A type specification.
 * @returns {boolean} if the typeSpec is declared as
 *  array type ending with `[]`.
 */
function isArrayType(typeSpec) {
    return typeSpec.match(/\[\]$/);
}

/**
 * Remove the array specifier if exists.
 *
 * @param {string} typeSpec A type specification.
 * @returns {string} a type name.
 */
function getBaseType(typeSpec) {
    return typeSpec.replace(/\[\]$/, "");
}

module.exports = HashArg;
