var g_tipvalues;
var g_unitsdata = [];
var g_fullunitsdata;
var g_curUnit = 0;
var g_usewebp = false;
var g_tiptext;
var g_tipdiv;
var g_updatefactions = false;

var g_factions = {
  adon: true,
  almir: true,
  indep: true,
  malvernis: true,
  ritter: true,
  temple: true,
  rach: true,
  terran: true
};

var g_units = {
  cav: true,
  vehicle: true,
  aircraft: true
};

function LoadTIPSData() {
  var url = "TIPVALUES.json";
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      g_tipvalues = JSON.parse(this.responseText);

      LoadUnitData();
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function LoadPageData() {
  if (window.localStorage.getItem("filter_factions") != null) {
    g_factions = JSON.parse(window.localStorage.getItem("filter_factions"));
  }

  if (window.localStorage.getItem("filter_units") != null) {
    g_units = JSON.parse(window.localStorage.getItem("filter_units"));
  }

  if (window.localStorage.getItem("cavdata") != null) {
    g_unitsdata = JSON.parse(window.localStorage.getItem("cavdata"));
  }

  setCBState("adon", g_factions.adon);
  setCBState("almir", g_factions.almir);
  setCBState("indep", g_factions.indep);
  setCBState("malvernis", g_factions.malvernis);
  setCBState("ritter", g_factions.ritter);
  setCBState("temple", g_factions.temple);
  setCBState("rach", g_factions.rach);
  setCBState("terran", g_factions.terran);

  setCBState("cav", g_units.cav);
  setCBState("vehicle", g_units.vehicle);
  setCBState("aircraft", g_units.aircraft);
}

function LoadUnitData() {
  var url = "Units.json";
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      g_fullunitsdata = JSON.parse(this.responseText);
      for (let i = 0; i < g_fullunitsdata.length; i++) {
        g_unitsdata[i] = g_fullunitsdata[i];
      }
      //  for (let i = 0; i < g_unitsdata.length; i++) {
      //  createDataCard(g_unitsdata[i].Name);
      //}

      LoadPageData();
      let prev = <HTMLButtonElement>document.getElementById("previous");
      prev.onclick = function() {
        g_curUnit--;
        if (g_curUnit < 0) g_curUnit = g_unitsdata.length - 1;
        createDataCard(g_unitsdata[g_curUnit].Name);
      };

      let next = <HTMLButtonElement>document.getElementById("next");
      next.onclick = function() {
        g_curUnit++;
        if (g_curUnit >= g_unitsdata.length) g_curUnit = 0;
        createDataCard(g_unitsdata[g_curUnit].Name);
      };

      g_tiptext = <HTMLSpanElement>document.getElementById("tiptext");
      g_tiptext.innerHTML = "Tip Text here";
      createDataCard(g_unitsdata[g_curUnit].Name);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function readsidenavCBs(faction: string, curState: boolean): boolean {
  let cbEl = <HTMLInputElement>document.getElementById(faction);
  let CBfaction = cbEl.checked;
  if (curState != CBfaction) g_updatefactions = true;

  return CBfaction;
}

function setCBState(id: string, state: boolean) {
  let cbEl = <HTMLInputElement>document.getElementById(id);
  cbEl.checked = state;
}

function addDataCard(sImage: string): HTMLMapElement {
  let img = <HTMLImageElement>document.getElementById("card-image");

  if (g_usewebp) img.src = sImage + ".webp";
  else img.src = sImage + ".jpg";

  g_tiptext.innerHTML = "";

  let myMap = <HTMLMapElement>document.getElementById("tipmap");

  while (myMap.firstChild) {
    myMap.removeChild(myMap.firstChild);
  }
  return myMap;
}

function createAreaTip(myMap: HTMLMapElement, coords: string, message: string) {
  let area1 = <HTMLAreaElement>document.createElement("area");
  area1.shape = "rect";
  area1.coords = coords;
  area1.href = "#";
  area1.onclick = function() {
    g_tiptext.innerHTML = message;
  };
  myMap.appendChild(area1);
}

function createDataCard(unitName: string) {
  let unit = findUnit(unitName);

  let myMap = addDataCard(unit.IMAGECARD);
  if (unit.TIP1VALUE != null) {
    createAreaTip(myMap, unit.TIP1COORD, findDesc(unit.TIP1VALUE));
  }

  if (unit.TIP2VALUE != null) {
    createAreaTip(myMap, unit.TIP2COORD, findDesc(unit.TIP2VALUE));
  }

  if (unit.TIP3VALUE != null) {
    createAreaTip(myMap, unit.TIP3COORD, findDesc(unit.TIP3VALUE));
  }

  if (unit.TIP4VALUE != null) {
    createAreaTip(myMap, unit.TIP4COORD, findDesc(unit.TIP4VALUE));
  }

  if (unit.TIP5VALUE != null) {
    createAreaTip(myMap, unit.TIP5COORD, findDesc(unit.TIP5VALUE));
  }

  if (unit.TIP6VALUE != null) {
    createAreaTip(myMap, unit.TIP6COORD, findDesc(unit.TIP6VALUE));
  }

  if (unit.TIP7VALUE != null) {
    createAreaTip(myMap, unit.TIP7COORD, findDesc(unit.TIP7VALUE));
  }

  if (unit.TIP8VALUE != null) {
    createAreaTip(myMap, unit.TIP8COORD, findDesc(unit.TIP8VALUE));
  }

  if (unit.TIP9VALUE != null) {
    createAreaTip(myMap, unit.TIP9COORD, findDesc(unit.TIP9VALUE));
  }

  if (unit.TIP10VALUE != null) {
    createAreaTip(myMap, unit.TIP10COORD, findDesc(unit.TIP10VALUE));
  }

  if (unit.TIP11VALUE != null) {
    createAreaTip(myMap, unit.TIP11COORD, findDesc(unit.TIP11VALUE));
  }

  if (unit.TIP12VALUE != null) {
    createAreaTip(myMap, unit.TIP12COORD, findDesc(unit.TIP12VALUE));
  }

  if (unit.TIP13VALUE != null) {
    createAreaTip(myMap, unit.TIP13COORD, findDesc(unit.TIP13VALUE));
  }

  if (unit.TIP14VALUE != null) {
    createAreaTip(myMap, unit.TIP14COORD, findDesc(unit.TIP14VALUE));
  }

  if (unit.TIP15VALUE != null) {
    createAreaTip(myMap, unit.TIP15COORD, findDesc(unit.TIP15VALUE));
  }

  if (unit.TIP16VALUE != null) {
    createAreaTip(myMap, unit.TIP16COORD, findDesc(unit.TIP16VALUE));
  }

  if (unit.TIP17VALUE != null) {
    createAreaTip(myMap, unit.TIP17COORD, findDesc(unit.TIP17VALUE));
  }
  if (unit.TIP18VALUE != null) {
    createAreaTip(myMap, unit.TIP18COORD, findDesc(unit.TIP18VALUE));
  }
  if (unit.TIP19VALUE != null) {
    createAreaTip(myMap, unit.TIP19COORD, findDesc(unit.TIP19VALUE));
  }
  if (unit.TIP20VALUE != null) {
    createAreaTip(myMap, unit.TIP20COORD, findDesc(unit.TIP20VALUE));
  }
  if (unit.TIP21VALUE != null) {
    createAreaTip(myMap, unit.TIP21COORD, findDesc(unit.TIP21VALUE));
  }
  if (unit.TIP22VALUE != null) {
    createAreaTip(myMap, unit.TIP22COORD, findDesc(unit.TIP22VALUE));
  }
  if (unit.TIP23VALUE != null) {
    createAreaTip(myMap, unit.TIP23COORD, findDesc(unit.TIP23VALUE));
  }
  if (unit.TIP24VALUE != null) {
    createAreaTip(myMap, unit.TIP24COORD, findDesc(unit.TIP24VALUE));
  }
  if (unit.TIP25VALUE != null) {
    createAreaTip(myMap, unit.TIP25COORD, findDesc(unit.TIP25VALUE));
  }
  if (unit.TIP26VALUE != null) {
    createAreaTip(myMap, unit.TIP26COORD, findDesc(unit.TIP26VALUE));
  }
  if (unit.TIP27VALUE != null) {
    createAreaTip(myMap, unit.TIP27COORD, findDesc(unit.TIP27VALUE));
  }
  if (unit.TIP28VALUE != null) {
    createAreaTip(myMap, unit.TIP28COORD, findDesc(unit.TIP28VALUE));
  }
  if (unit.TIP29VALUE != null) {
    createAreaTip(myMap, unit.TIP29COORD, findDesc(unit.TIP29VALUE));
  }
  if (unit.TIP30VALUE != null) {
    createAreaTip(myMap, unit.TIP30COORD, findDesc(unit.TIP30VALUE));
  }
}

function findUnit(name: string) {
  for (let i = 0; i < g_unitsdata.length; i++) {
    if (g_unitsdata[i].Name === name) return g_unitsdata[i];
  }
}

function findDesc(value: string) {
  for (let i = 0; i < g_tipvalues.length; i++) {
    if (g_tipvalues[i].TIP === value)
      return value + ":  " + g_tipvalues[i].VALUE;
  }

  alert("Could not find description: " + value);
  return null;
}

function unitMatch(unitdata: any): boolean {
  if (g_units.cav && unitdata.TYPE === "CAV") return true;
  else if (g_units.vehicle && unitdata.TYPE === "VEHICLE") return true;
  else if (g_units.aircraft && unitdata.TYPE === "AIRCRAFT") return true;

  return false;
}

function UpdateCardArray() {
  g_unitsdata.length = 0;
  for (let i = 0; i < g_fullunitsdata.length; i++) {
    if (
      g_factions.adon &&
      unitMatch(g_fullunitsdata[i]) &&
      g_fullunitsdata[i].FACTION === "ADON"
    )
      g_unitsdata.push(g_fullunitsdata[i]);
    else if (
      g_factions.almir &&
      unitMatch(g_fullunitsdata[i]) &&
      g_fullunitsdata[i].FACTION === "ALMIRITHIL"
    )
      g_unitsdata.push(g_fullunitsdata[i]);
    else if (
      g_factions.indep &&
      unitMatch(g_fullunitsdata[i]) &&
      g_fullunitsdata[i].FACTION === "INDEPENDENT"
    )
      g_unitsdata.push(g_fullunitsdata[i]);
    else if (
      g_factions.malvernis &&
      unitMatch(g_fullunitsdata[i]) &&
      g_fullunitsdata[i].FACTION === "MALVERNIS"
    )
      g_unitsdata.push(g_fullunitsdata[i]);
    else if (
      g_factions.ritter &&
      unitMatch(g_fullunitsdata[i]) &&
      g_fullunitsdata[i].FACTION === "RITTER"
    )
      g_unitsdata.push(g_fullunitsdata[i]);
    else if (
      g_factions.temple &&
      unitMatch(g_fullunitsdata[i]) &&
      g_fullunitsdata[i].FACTION === "TEMPLE"
    )
      g_unitsdata.push(g_fullunitsdata[i]);
    else if (
      g_factions.rach &&
      unitMatch(g_fullunitsdata[i]) &&
      g_fullunitsdata[i].FACTION === "RACH"
    )
      g_unitsdata.push(g_fullunitsdata[i]);
    else if (
      g_factions.terran &&
      unitMatch(g_fullunitsdata[i]) &&
      g_fullunitsdata[i].FACTION === "TERRAN"
    )
      g_unitsdata.push(g_fullunitsdata[i]);
  }

  savePageData();
}

function savePageData() {
  window.localStorage.setItem("filter_factions", JSON.stringify(g_factions));
  window.localStorage.setItem("filter_units", JSON.stringify(g_units));
  window.localStorage.setItem("cavdata", JSON.stringify(g_unitsdata));
}

var M;
M.AutoInit();

var options = {
  edge: "left",
  onCloseEnd: null
};

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, options);
});

var collapsibleElem = document.querySelector(".collapsible");
var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

options.onCloseEnd = function() {
  g_factions.adon = readsidenavCBs("adon", g_factions.adon);
  g_factions.almir = readsidenavCBs("almir", g_factions.almir);
  g_factions.indep = readsidenavCBs("indep", g_factions.indep);
  g_factions.malvernis = readsidenavCBs("malvernis", g_factions.malvernis);
  g_factions.ritter = readsidenavCBs("ritter", g_factions.ritter);
  g_factions.temple = readsidenavCBs("temple", g_factions.temple);
  g_factions.rach = readsidenavCBs("rach", g_factions.rach);
  g_factions.terran = readsidenavCBs("terran", g_factions.terran);

  g_units.cav = readsidenavCBs("cav", g_units.cav);
  g_units.vehicle = readsidenavCBs("vehicle", g_units.vehicle);
  g_units.aircraft = readsidenavCBs("aircraft", g_units.aircraft);

  if (g_updatefactions) {
    //Force at least one to true or we will have nothing d
    if (!g_units.cav && !g_units.aircraft && !g_units.vehicle) {
      g_units.cav = true;
      setCBState("cav", true);
    }

    //force at least on faction to true d
    if (
      !g_factions.adon &&
      !g_factions.almir &&
      !g_factions.malvernis &&
      !g_factions.ritter &&
      !g_factions.temple &&
      !g_factions.ritter &&
      !g_factions.terran
    ) {
      g_factions.rach = true;
      setCBState("rach", true);
    }
    UpdateCardArray();
    g_curUnit = 0;
    createDataCard(g_unitsdata[g_curUnit].Name);
    g_updatefactions = false;
  }
};

function Catalog_clicked() {
  alert("Catalog clicked");
}

function UserList_clicked() {
  alert("User List clicked");
}

var dropdownOptions = {
  onCloseEnd: null
};

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".dropdown-trigger");
  var instances = M.Dropdown.init(elems, dropdownOptions);
});

dropdownOptions.onCloseEnd = function() {
  let el = <HTMLAnchorElement>document.getElementById("dropdown1");
};

// for now do not use webp
g_usewebp = false;
LoadTIPSData();
