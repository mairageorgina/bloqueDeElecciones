data.groups = Object.values(data.items.reduce((acc, val)=>{
    if (!(val.superParty in acc)) {
        acc[val.superParty] = {
            items: [],
            ratio: 0,
            superParty: val.superParty,
            color: acc.color || val.color,
        }
    }
    acc[val.superParty].items.push(val)
    acc[val.superParty].ratio += val.ratio||0
    return acc
}, {}))

data.groups.sort((a, b)=>Math.sign(b.ratio-a.ratio))

for (let group of data.groups) {
    group.items.sort((a, b)=>Math.sign(b.ratio-a.ratio))
    group.contrastColor = (group.color && color(group.color).luminosity() > 0.6) ? '#222' : '#fff'
    group.anticontrastColor = (group.color && color(group.color).luminosity() <= 0.6) ? '#222' : '#fff'
    // group.color = helpers.ensureContrast(group.color, group.contrastColor, 0.5)
}
