function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

app.worldCheckboxFields = {
  protect: [4, 8, 26, 28, 32],
  manage: [6, 8, 10, 12, 14, 16, 18, 20, 22],
  restore: [2, 24, 30],
};

app.globalIndicatorFields = {
  ndc_sub: {
    // ndc_now: 36,
    ndc_mitigation: 37,
    ndc_adaptation: 36,
    ndc_both: 38,
    ndc_2020: 39,
    ndc_update: 40,
  },
  // emmisions: {
  //   emmisions_including_lucf: 35,
  //   emmisions_including_lucf_cost_effective: 38,
  //   emmisions_excluding_lucf: 36,
  //   emmisions_excluding_lucf_cost_effective: 39,
  //   emmisions_all: 37,
  //   emmisions_all_cost_effective: 40
  // },
  socioeconomic: {
    majority_pop: 47,
    income_group: 48,
    sdg_index: 49,
    governance: 59,
  },
  ecological: {
    // area_proportion_total: 44,
    // area_proportion_total_cost_effective: 45,
    bio_index: 50,
    protected_area: 51,
  },
  carbon: {
    national: 55,
    subNational: 56,
    regional: 57,
  },
};

app.globalIndicatorValues = {
  ndc_sub: [],
  socioeconomic: {
    income_group: [
      "High income",
      "Upper middle income",
      "Lower middle income",
      "Low income",
    ],
    sdgi: ["High", "Upper Middle", "Lower Middle", "Low"],
    population: ["Majority Urban", "Majority Rural"],
    governance: ["High", "Upper middle", "Middle", "Lower middle", "Low"],
  },
  ecological: {
    bio_index: ["High", "Upper Middle", "Lower Middle", "Low"],
    protected_area: ["0-1%", "1-5%", "5-10%", "10-20%", ">20%"],
  },
  carbon: [],
};

app.helpText = {
  "intervention-icon": "this is test text for the intervention icon.",
  "global-icon": "this is test text for the global icon.",
  reforestation:
    "Additional carbon sequestration by converting non-forest to forest where suitable.",
  "avoid-forest-conversion":
    "Emissions of CO2 avoided by avoiding forest conversion.",
  "trees-in-ag":
    "Additional carbon sequestration due to integration of trees into croplands at levels that do not reduce crop yields.",
  "improved-forest-man":
    "Additional carbon sequestration in forest biomass in native forests under non-intensive management for wood production.",
  biochar:
    "Additional carbon sequestration by amending agricultural soils with biochar.",
  "reduced-woodful-har":
    "Avoided emissions due to reduced harvest of woodfuel used for cooking and heating.",
  "nutrient-management":
    "Avoided N2O emissions due to reduced fertilizer use and improved application methods on croplands.",
  "optimal-grazing-int":
    "Additional soil carbon sequestration due to grazing optimization on rangeland and planted pastures.",
  "imp-fire-management":
    "Intentionally burnning savannas during the early dry to reduce fire severity in the late dry season.",
  "peatland-restoration":
    "Avoided oxidation of soil carbon due to soil re-wetting in freshwater wetlands.",
  "improved-rice":
    "Avoided emissions of methane and N2O by employing periodic draining of rice soils and removal of residues.",
  "avoid-mangrove-impacts":
    "Avoided emissions of biomass and soil carbon due to avoided degradation and/or loss of mangroves.",
  "avoid-peat-impacts":
    "Avoided emissions of carbon due to avoided degradation and/or loss of freshwater wetlands.",
  "mangrove-restoration":
    "Avoided oxidation of soil carbon and enhanced soil carbon sink by rehabilitating mangrove habitat.",
  "grazing-legumes":
    "Additional soil carbon sequestration due to sowing legumes in planted pastures.",
};

app.domain = [
  0,
  25,
  50,
  75,
  100,
  125,
  150,
  175,
  200,
  225,
  250,
  275,
  300,
  325,
  350,
  375,
  400,
  425,
  450,
  475,
  500,
  600,
  700,
  800,
  900,
  1000,
  2000,
];

// blue to green range
// app.range = [
//   "#4DB8D7",
//   "#49b8d4",
//   "#46b9d1",
//   "#43BACF",
//   "#40BBCC",
//   "#3CBCCA",
//   "#39BDC7",
//   "#36BDC4",
//   "#33BEC2",
//   "#30BFBF",
//   "#2CC0BD",
//   "#29C1BA",
//   "#26C2B8",
//   "#23C2B5",
//   "#20C3B2",
//   "#1CC4B0",
//   "#19C5AD",
//   "#16C6AB",
//   "#13C7A8",
//   "#10C7A5",
//   "#0CC8A3",
//   "#09C9A0",
//   "#06CA9E",
//   "#03CB9B",
//   "#00CC99"
// ];

// // old green range
app.range = [
  "#dedede",
  "#D9F0A3",
  "#CFEA9E",
  "#C6E49A",
  "#BDDF95",
  "#B4D991",
  "#ABD38C",
  "#A2CE88",
  "#99C883",
  "#90C27F",
  "#87BD7A",
  "#7EB776",
  "#75B171",
  "#6CAC6D",
  "#63A668",
  "#5AA064",
  "#519B5F",
  "#48955B",
  "#3F8F56",
  "#368A52",
  "#2D844D",
  "#247E49",
  "#1B7944",
  "#127340",
  "#096D3B",
  "#006837",
];

app.countryReportLinks = [
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Afghanistan_factsheet.pdf",
    country_name: "Afghanistan",
    iso_code: "AFG",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Albania_factsheet.pdf",
    country_name: "Albania",
    iso_code: "ALB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Algeria_factsheet.pdf",
    country_name: "Algeria",
    iso_code: "DZA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Angola_factsheet.pdf",
    country_name: "Angola",
    iso_code: "AGO",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Argentina_factsheet.pdf",
    country_name: "Argentina",
    iso_code: "AGO",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Armenia_factsheet.pdf",
    country_name: "Armenia",
    iso_code: "ARM",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Australia_factsheet.pdf",
    country_name: "Australia",
    iso_code: "AUS",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Austria_factsheet.pdf",
    country_name: "Austria",
    iso_code: "AUT",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Azerbaijan_factsheet.pdf",
    country_name: "Azerbaijan",
    iso_code: "AZE",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Bahamas_factsheet.pdf",
    country_name: "Bahamas",
    iso_code: "BHS",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Bangladesh_factsheet.pdf",
    country_name: "Bangladesh",
    iso_code: "BGD",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Belarus_factsheet.pdf",
    country_name: "Belarus",
    iso_code: "BLR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Belgium_factsheet.pdf",
    country_name: "Belgium",
    iso_code: "BEL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Belize_factsheet.pdf",
    country_name: "Belize",
    iso_code: "BLZ",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Benin_factsheet.pdf",
    country_name: "Benin",
    iso_code: "BEN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Bhutan_factsheet.pdf",
    country_name: "Bhutan",
    iso_code: "BTN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Bolivia_factsheet.pdf",
    country_name: "Bolivia",
    iso_code: "BOL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Fed.%20of%20Bos.%20&%20Herz._factsheet.pdf",
    country_name: "Bosnia and Herzegovina",
    iso_code: "BIH",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Botswana_factsheet.pdf",
    country_name: "Botswana",
    iso_code: "BIH",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Brazil_factsheet.pdf",
    country_name: "Brazil",
    iso_code: "BRA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Brunei_factsheet.pdf",
    country_name: "Brunei Darussalam",
    iso_code: "BRN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Bulgaria_factsheet.pdf",
    country_name: "Bulgaria",
    iso_code: "BGR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Burkina%20Faso_factsheet.pdf",
    country_name: "Burkina Faso",
    iso_code: "BGR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Burundi_factsheet.pdf",
    country_name: "Burundi",
    iso_code: "BDI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Cambodia_factsheet.pdf",
    country_name: "Cambodia",
    iso_code: "BDI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Cameroon_factsheet.pdf",
    country_name: "Cameroon",
    iso_code: "BDI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Canada_factsheet.pdf",
    country_name: "Canada",
    iso_code: "BDI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Cape%20Verde_factsheet.pdf",
    country_name: "Cape Verde",
    iso_code: "CPV",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Central%20African%20Rep._factsheet.pdf",
    country_name: "Central African Republic",
    iso_code: "CAF",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Chad_factsheet.pdf",
    country_name: "Chad",
    iso_code: "TCD",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Chile_factsheet.pdf",
    country_name: "Chile",
    iso_code: "CHL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/China_factsheet.pdf",
    country_name: "China",
    iso_code: "CHN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Colombia_factsheet.pdf",
    country_name: "Colombia",
    iso_code: "COL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Comoros_factsheet.pdf",
    country_name: "Comoros",
    iso_code: "COM",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Congo_factsheet.pdf",
    country_name: "Republic of Congo (ROC)",
    iso_code: "COG",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Costa%20Rica_factsheet.pdf",
    country_name: "Costa Rica",
    iso_code: "CRI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/C%C3%B4te%20d%27Ivoire_factsheet.pdf",
    country_name: "Cote d'Ivoire",
    iso_code: "CIV",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Croatia_factsheet.pdf",
    country_name: "Croatia",
    iso_code: "HRV",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Cuba_factsheet.pdf",
    country_name: "Cuba",
    iso_code: "CUB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Cyprus_factsheet.pdf",
    country_name: "Cyprus",
    iso_code: "CYP",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Czech%20Rep._factsheet.pdf",
    country_name: "Czech Republic",
    iso_code: "CZE",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Dem.%20Rep.%20Congo_factsheet.pdf",
    country_name: "Democratic People's Republic of Korea (North Korea)",
    iso_code: "PRK",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Dem.%20Rep.%20Korea_factsheet.pdf",
    country_name: "Democratic Republic of the Congo (DRC)",
    iso_code: "COD",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Denmark_factsheet.pdf",
    country_name: "Denmark",
    iso_code: "DNK",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Djibouti_factsheet.pdf",
    country_name: "Djibouti",
    iso_code: "DJI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Dominican%20Rep._factsheet.pdf",
    country_name: "Dominican Republic",
    iso_code: "DOM",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Ecuador_factsheet.pdf",
    country_name: "Ecuador",
    iso_code: "ECU",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Egypt_factsheet.pdf",
    country_name: "Egypt",
    iso_code: "EGY",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/El%20Salvador_factsheet.pdf",
    country_name: "El Salvador",
    iso_code: "SLV",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Eq.%20Guinea_factsheet.pdf",
    country_name: "Equatorial Guinea",
    iso_code: "GNQ",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Eritrea_factsheet.pdf",
    country_name: "Eritrea",
    iso_code: "ERI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Estonia_factsheet.pdf",
    country_name: "Estonia",
    iso_code: "EST",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Ethiopia_factsheet.pdf",
    country_name: "Ethiopia",
    iso_code: "ETH",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Faeroe%20Is._factsheet.pdf",
    country_name: "Faroe Islands",
    iso_code: "FRO",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Falkland%20Is._factsheet.pdf",
    country_name: "Falkland Islands",
    iso_code: "FLK",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Fiji_factsheet.pdf",
    country_name: "Fiji",
    iso_code: "FJI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Finland_factsheet.pdf",
    country_name: "Finland",
    iso_code: "FIN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Fr.%20Polynesia_factsheet.pdf",
    country_name: "French Polynesia",
    iso_code: "PYF",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/France_factsheet.pdf",
    country_name: "France",
    iso_code: "FRA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Gabon_factsheet.pdf",
    country_name: "Gabon",
    iso_code: "GAB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Gambia_factsheet.pdf",
    country_name: "Gambia, The",
    iso_code: "GMB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Georgia_factsheet.pdf",
    country_name: "Georgia",
    iso_code: "GEO",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Germany_factsheet.pdf",
    country_name: "Germany",
    iso_code: "DEU",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Ghana_factsheet.pdf",
    country_name: "Ghana",
    iso_code: "DEU",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Greece_factsheet.pdf",
    country_name: "Greece",
    iso_code: "GRC",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Greenland_factsheet.pdf",
    country_name: "Greenland (Denmark)",
    iso_code: "GRL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Guadeloupe_factsheet.pdf",
    country_name: "Guadeloupe",
    iso_code: "GLP",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Guatemala_factsheet.pdf",
    country_name: "Guatemala",
    iso_code: "GTM",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Guinea_factsheet.pdf",
    country_name: "Guinea",
    iso_code: "GIN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Guinea-Bissau_factsheet.pdf",
    country_name: "Guinea-Bissau",
    iso_code: "GNB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Guyana_factsheet.pdf",
    country_name: "Guyana",
    iso_code: "GNB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Haiti_factsheet.pdf",
    country_name: "Haiti",
    iso_code: "HTI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Honduras_factsheet.pdf",
    country_name: "Honduras",
    iso_code: "HND",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Hungary_factsheet.pdf",
    country_name: "Hungary",
    iso_code: "HUN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Iceland_factsheet.pdf",
    country_name: "Iceland",
    iso_code: "ISL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/India_factsheet.pdf",
    country_name: "India",
    iso_code: "IND",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Indonesia_factsheet.pdf",
    country_name: "Indonesia",
    iso_code: "IDN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Iran_factsheet.pdf",
    country_name: "Iran",
    iso_code: "IRN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Iraq_factsheet.pdf",
    country_name: "Iraq",
    iso_code: "IRQ",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Ireland_factsheet.pdf",
    country_name: "Ireland",
    iso_code: "IRL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Israel_factsheet.pdf",
    country_name: "Israel",
    iso_code: "ISR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Italy_factsheet.pdf",
    country_name: "Italy",
    iso_code: "ITA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Jamaica_factsheet.pdf",
    country_name: "Jamaica",
    iso_code: "JAM",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Japan_factsheet.pdf",
    country_name: "Japan",
    iso_code: "JPN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Jordan_factsheet.pdf",
    country_name: "Jordan",
    iso_code: "JOR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Kazakhstan_factsheet.pdf",
    country_name: "Kazakhstan",
    iso_code: "KAZ",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Kenya_factsheet.pdf",
    country_name: "Kenya",
    iso_code: "KEN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Korea_factsheet.pdf",
    country_name: "Republic of Korea (South Korea)",
    iso_code: "KOR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Kuwait_factsheet.pdf",
    country_name: "Kuwait",
    iso_code: "KWT",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Kyrgyzstan_factsheet.pdf",
    country_name: "Kyrgyzstan",
    iso_code: "KGZ",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Lao%20PDR_factsheet.pdf",
    country_name: "Laos",
    iso_code: "LAO",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Latvia_factsheet.pdf",
    country_name: "Latvia",
    iso_code: "LVA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Lebanon_factsheet.pdf",
    country_name: "Lebanon",
    iso_code: "LBN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Lesotho_factsheet.pdf",
    country_name: "Lesotho",
    iso_code: "LSO",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Liberia_factsheet.pdf",
    country_name: "Liberia",
    iso_code: "LBR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Libya_factsheet.pdf",
    country_name: "Libya",
    iso_code: "LBY",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Lithuania_factsheet.pdf",
    country_name: "Lithuania",
    iso_code: "LTU",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Luxembourg_factsheet.pdf",
    country_name: "Luxembourg",
    iso_code: "LUX",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Macedonia_factsheet.pdf",
    country_name: "Macedonia (The Former Yugoslav Republic of Macedonia)",
    iso_code: "MKD",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Madagascar_factsheet.pdf",
    country_name: "Madagascar",
    iso_code: "MDG",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Malawi_factsheet.pdf",
    country_name: "Malawi",
    iso_code: "MWI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Malaysia_factsheet.pdf",
    country_name: "Malaysia",
    iso_code: "MYS",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Mali_factsheet.pdf",
    country_name: "Mali",
    iso_code: "MLI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Martinique_factsheet.pdf",
    country_name: "Martinique",
    iso_code: "MTQ",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Mauritania_factsheet.pdf",
    country_name: "Mauritania",
    iso_code: "MRT",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Mauritius_factsheet.pdf",
    country_name: "Mauritius",
    iso_code: "MUS",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Mexico_factsheet.pdf",
    country_name: "Mexico",
    iso_code: "MEX",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Moldova_factsheet.pdf",
    country_name: "Moldova",
    iso_code: "MDA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Mongolia_factsheet.pdf",
    country_name: "Mongolia",
    iso_code: "MNG",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Montenegro_factsheet.pdf",
    country_name: "Montenegro",
    iso_code: "MNE",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Morocco_factsheet.pdf",
    country_name: "Morocco",
    iso_code: "MAR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Mozambique_factsheet.pdf",
    country_name: "Mozambique",
    iso_code: "MOZ",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Myanmar_factsheet.pdf",
    country_name: "Myanmar",
    iso_code: "MMR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Namibia_factsheet.pdf",
    country_name: "Namibia",
    iso_code: "MMR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Nepal_factsheet.pdf",
    country_name: "Nepal",
    iso_code: "MMR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Netherlands_factsheet.pdf",
    country_name: "Netherlands",
    iso_code: "MMR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/New%20Caledonia_factsheet.pdf",
    country_name: "New Caledonia",
    iso_code: "MMR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/New%20Zealand_factsheet.pdf",
    country_name: "New Zealand",
    iso_code: "NZL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Nicaragua_factsheet.pdf",
    country_name: "Nicaragua",
    iso_code: "NIC",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Niger_factsheet.pdf",
    country_name: "Niger",
    iso_code: "NER",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Nigeria_factsheet.pdf",
    country_name: "Nigeria",
    iso_code: "NGA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Norway_factsheet.pdf",
    country_name: "Norway",
    iso_code: "NOR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Oman_factsheet.pdf",
    country_name: "Oman",
    iso_code: "OMN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Pakistan_factsheet.pdf",
    country_name: "Pakistan",
    iso_code: "PAK",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Panama_factsheet.pdf",
    country_name: "Panama",
    iso_code: "PAK",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Papua%20New%20Guinea_factsheet.pdf",
    country_name: "Papua New Guinea",
    iso_code: "PNG",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Paraguay_factsheet.pdf",
    country_name: "Paraguay",
    iso_code: "PRY",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Peru_factsheet.pdf",
    country_name: "Peru",
    iso_code: "PER",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Philippines_factsheet.pdf",
    country_name: "Philippines",
    iso_code: "PHL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Poland_factsheet.pdf",
    country_name: "Poland",
    iso_code: "POL",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Portugal_factsheet.pdf",
    country_name: "Portugal",
    iso_code: "PRT",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Puerto%20Rico_factsheet.pdf",
    country_name: "Puerto Rico",
    iso_code: "PRI",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Qatar_factsheet.pdf",
    country_name: "Qatar",
    iso_code: "QAT",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Reunion_factsheet.pdf",
    country_name: "Reunion",
    iso_code: "REU",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Romania_factsheet.pdf",
    country_name: "Romania",
    iso_code: "ROU",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Russia_factsheet.pdf",
    country_name: "Russia",
    iso_code: "RUS",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Rwanda_factsheet.pdf",
    country_name: "Rwanda",
    iso_code: "RWA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/S.%20Sudan_factsheet.pdf",
    country_name: "Sudan",
    iso_code: "SDN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Samoa_factsheet.pdf",
    country_name: "Samoa",
    iso_code: "WSM",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/S%C3%A3o%20Tom%C3%A9%20and%20Principe_factsheet.pdf",
    country_name: "Sao Tome and Principe",
    iso_code: "STP",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Saudi%20Arabia_factsheet.pdf",
    country_name: "Saudi Arabia",
    iso_code: "SAU",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Senegal_factsheet.pdf",
    country_name: "Senegal",
    iso_code: "SEN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Serbia_factsheet.pdf",
    country_name: "Serbia",
    iso_code: "SRB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Sierra%20Leone_factsheet.pdf",
    country_name: "Sierra Leone",
    iso_code: "SLE",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Slovakia_factsheet.pdf",
    country_name: "Slovakia",
    iso_code: "SVK",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Slovenia_factsheet.pdf",
    country_name: "Slovenia",
    iso_code: "SVN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Solomon%20Is._factsheet.pdf",
    country_name: "Solomon Islands",
    iso_code: "SLB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Somalia_factsheet.pdf",
    country_name: "Somalia",
    iso_code: "SOM",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/South%20Africa_factsheet.pdf",
    country_name: "South Africa",
    iso_code: "ZAF",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Spain_factsheet.pdf",
    country_name: "Spain",
    iso_code: "ESP",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Sri%20Lanka_factsheet.pdf",
    country_name: "Sri Lanka",
    iso_code: "LKA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Sudan_factsheet.pdf",
    country_name: "Sudan",
    iso_code: "SDN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Suriname_factsheet.pdf",
    country_name: "Suriname",
    iso_code: "SUR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Swaziland_factsheet.pdf",
    country_name: "Swaziland",
    iso_code: "SWZ",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Sweden_factsheet.pdf",
    country_name: "Sweden",
    iso_code: "SWE",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Switzerland_factsheet.pdf",
    country_name: "Switzerland",
    iso_code: "CHE",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Syria_factsheet.pdf",
    country_name: "Syria",
    iso_code: "SYR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Taiwan_factsheet.pdf",
    country_name: "Taiwan",
    iso_code: "TWN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Tajikistan_factsheet.pdf",
    country_name: "Tajikistan",
    iso_code: "TJK",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Tanzania_factsheet.pdf",
    country_name: "Tanzania",
    iso_code: "TZA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Thailand_factsheet.pdf",
    country_name: "Thailand",
    iso_code: "THA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Timor-Leste_factsheet.pdf",
    country_name: "Timor-Leste",
    iso_code: "TLS",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Togo_factsheet.pdf",
    country_name: "Togo",
    iso_code: "TGO",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Trinidad%20and%20Tobago_factsheet.pdf",
    country_name: "Trinidad and Tobago",
    iso_code: "TTO",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Tunisia_factsheet.pdf",
    country_name: "Tunisia",
    iso_code: "TUN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Turkey_factsheet.pdf",
    country_name: "Turkey",
    iso_code: "TUR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Turkmenistan_factsheet.pdf",
    country_name: "Turkmenistan",
    iso_code: "TKM",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Uganda_factsheet.pdf",
    country_name: "Uganda",
    iso_code: "UGA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Ukraine_factsheet.pdf",
    country_name: "Ukraine",
    iso_code: "UKR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/United%20Arab%20Emirates_factsheet.pdf",
    country_name: "United Arab Emirates",
    iso_code: "ARE",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/United%20Kingdom_factsheet.pdf",
    country_name: "United Kingdom",
    iso_code: "GBR",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/United%20States_factsheet.pdf",
    country_name: "United States",
    iso_code: "USA",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Uruguay_factsheet.pdf",
    country_name: "Uruguay",
    iso_code: "URY",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Uzbekistan_factsheet.pdf",
    country_name: "Uzbekistan",
    iso_code: "UZB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Vanuatu_factsheet.pdf",
    country_name: "Vanuatu",
    iso_code: "VUT",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Venezuela_factsheet.pdf",
    country_name: "Venezuela",
    iso_code: "VEN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Vietnam_factsheet.pdf",
    country_name: "Vietnam",
    iso_code: "VEN",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/W.%20Sahara_factsheet.pdf",
    country_name: "Western Sahara",
    iso_code: "ESH",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Yemen_factsheet.pdf",
    country_name: "Yemen",
    iso_code: "YEM",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Zambia_factsheet.pdf",
    country_name: "Zambia",
    iso_code: "ZMB",
  },
  {
    link:
      "http://nature4climate.s3.amazonaws.com/ctry-factsheets/Zimbabwe_factsheet.pdf",
    country_name: "Zimbabwe",
    iso_code: "ZWE",
  },
];
