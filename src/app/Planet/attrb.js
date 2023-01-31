const wookiee = {
  name: 'whrascwo',
  rotation_period: 'rcooaoraaoahoowh_akworcahoowa',
  orbital_period: 'oorcrhahaoraan_akworcahoowa',
  diameter: 'waahrascwoaoworc',
  climate: 'oaanahscraaowo',
  gravity: 'rrrcrahoahaoro',
  terrain: 'aoworcrcraahwh',
  surface_water: 'churcwwraoawo_ohraaoworc',
  population: 'akooakhuanraaoahoowh',
  residents: 'rcwocahwawowhaoc',
  films: 'wwahanscc',
  created: 'oarcworaaowowa',
  edited: 'wowaahaowowa',
  url: 'hurcan',
}

function translate(value, lang) {
  if (lang === 'wookiee') return wookiee[value]
  return value
}

module.exports = { translate }
