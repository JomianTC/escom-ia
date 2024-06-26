const avatarOptions = {
  masculino: {
    accesoriesType: ['Blank', 'Prescription01', 'Prescription02', 'Round'],
    clotheType: ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt'],
    eyeType: ['Default'],
    eyebrowType: ['Default'],
    mouthType: ['Default'],
    skinColor: ['Pale', 'Light', 'Brown'],
    topType: [
      'ShortHairDreads01',
      'ShortHairShortFlat',
      'ShortHairShortRound'
    ]
  },
  femenino: {
    topType: ['LongHairBigHair',
      'LongHairBob',
      'LongHairBun',
      'LongHairCurly',
      'LongHairCurvy',
      'LongHairNotTooLong',
      'LongHairShavedSides',
      'LongHairMiaWallace',
      'LongHairStraight',
      'LongHairStraight2',
      'LongHairStraightStrand'
    ],
    accesoriesType: ['Blank', 'Prescription01', 'Prescription02', 'Round'],
    clotheType: ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt'],
    eyeType: ['Default'],
    eyebrowType: ['Default'],
    mouthType: ['Default'],
    skinColor: ['Pale', 'Light', 'Brown']
  }
} as const

export const getRandomAvatar = (sexo: ('masculino' | 'femenino')) => {
  const avatar = {
    topType: avatarOptions[sexo].topType[Math.floor(Math.random() * avatarOptions[sexo].topType.length)],
    accesoriesType: avatarOptions[sexo].accesoriesType[Math.floor(Math.random() * avatarOptions[sexo].accesoriesType.length)],
    clotheType: avatarOptions[sexo].clotheType[Math.floor(Math.random() * avatarOptions[sexo].clotheType.length)],
    eyeType: avatarOptions[sexo].eyeType[Math.floor(Math.random() * avatarOptions[sexo].eyeType.length)],
    eyebrowType: avatarOptions[sexo].eyebrowType[Math.floor(Math.random() * avatarOptions[sexo].eyebrowType.length)],
    mouthType: avatarOptions[sexo].mouthType[Math.floor(Math.random() * avatarOptions[sexo].mouthType.length)],
    skinColor: avatarOptions[sexo].skinColor[Math.floor(Math.random() * avatarOptions[sexo].skinColor.length)]
  }
  return `https://avataaars.io/?avatarStyle=Circle&topType=${avatar.topType}&accessoriesType=${avatar.accesoriesType}&hairColor=${'BrownDark'}&facialHairType=Blank&clotheType=${avatar.clotheType}&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=${avatar.skinColor}`
}
