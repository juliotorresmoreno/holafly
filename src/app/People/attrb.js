const wookiee = {
  name: 'whrascwo',
  height: 'acwoahrracao',
  mass: 'scracc',
  hair_color: 'acraahrc_oaooanoorc',
  skin_color: 'corahwh_oaooanoorc',
  eye_color: 'worowo_oaooanoorc',
  birth_year: 'rhahrcaoac_roworarc',
  gender: 'rrwowhwaworc',
  homeworld: 'acooscwoohoorcanwa',
  films: 'wwahanscc',
  species: 'cakwooaahwoc',
  vehicles: 'howoacahoaanwoc',
  starships: 'caorarccacahakc',
  created: 'oarcworaaowowa',
  edited: 'wowaahaowowa',
  url: 'hurcan',
}

function translate(value, lang) {
  if (lang === 'wookiee') return wookiee[value]
  return value
}

module.exports = { translate }
