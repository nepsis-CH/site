var LUNI=[
    "ianuarie",
    "februarie",
    "martie",
    "aprilie",
    "mai",
    "iunie",
    "iulie",
    "august",
    "septembrie",
    "octombrie",
    "noiembrie",
    "decembrie"
];

// By Single-Month-Date I mean "3 august 1990" , "3-5 august 1990"
// the input 'parts' is already split by spaces:
// - ["3", "august", "1990"]
// - ["3-5", "august", "1990"]
function parseSingleMonthDateRange(parts) {
	var zile = parts[0].split("-").map(Number);
	var luni = parts[1].split("-").map(l => LUNI.indexOf(l.toLowerCase()));
	var an = Number(parts[2]);
	var start = new Date(an, luni[0], zile[0]);
	if (zile.length == 1) {
		var end = new Date(an, luni[0], zile[0]);
	} else {
		var end = new Date(an, luni.length == 1 ? luni[0] : luni[1], zile[1]);
	}
	return [start, end];
}

// Can be in the form of:
// - "3 august 1990"
// - "3-5 august 1990"
// - "31 august - 1 septembrie 2019"
function parseRoDateRange(text) {
    var parts = text.split(" ");
	// 
	if (parts.length == 3) {
		return parseSingleMonthDateRange(parts);
	} else if (parts.length == 6) {
		// parts is like ["31", "august", "-", "1", "septembrie", "2019"]
		// we only care about the end date
		return parseSingleMonthDateRange(parts.slice(3, 6));
	}
	// unsupported date format
	return [new Date(), new Date()]
};

function markPastEvents(id) {
    var nowDate = new Date();
    var now = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0);

    var rows = $(id + " > tbody > tr");
    for (var i=0; i < rows.length; i++) {
        var row = rows[i];
        var dataTd = $(row).children("td")[0];
        var range = parseRoDateRange($(dataTd).text());
        var start = range[0];
        var end = range[1];
        if (end < now) {
            $(row).addClass("gri");
        }
   }
}