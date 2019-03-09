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

function parseRoDateRange(text) {
    var parts = text.split(" ");
    var zile = parts[0].split("-").map(Number);
    var luni = parts[1].split("-").map(l => LUNI.indexOf(l.toLowerCase()));
    var an = Number(parts[2]);
    var start = new Date(an, luni[0], zile[0]);
    if (zile.length == 1) {
        var end = new Date(an, luni[0], zile[0]);
    } else {
        var end = new Date(an, luni.length == 1 ? luni[0] : luni[1], zile[1]);
    }
    return [start, end]
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