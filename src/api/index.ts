import metadata from '../data/metadata.json'

const MATERIAL_ICON_CODE_POINTS_FILES = [
  { font: "filled", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints' },
  { font: "outlined", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsOutlined-Regular.codepoints' },
  { font: "rounded", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsRound-Regular.codepoints' },
  { font: "twoTone", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsTwoTone-Regular.codepoints' },
  { font: "sharp", url: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIconsSharp-Regular.codepoints' },
]

export const loadMaterialIcons = async() => {
  return Promise.all(MATERIAL_ICON_CODE_POINTS_FILES.map(async(source) => {
    const response = await fetch(source.url)
    const data = await response.text()
    const lines = data.split('\n')
    return lines.map((line: string) => {
      const [name, codepoint] = line.split(/\s/)
      const icon = metadata.icons.find(icon => icon.name === name)
      return {
        name,
        codepoint,
        font: source.font,
        category: icon?.categories?.[0],
        tags: icon?.tags || [],
        popularity: icon?.popularity || 0,
      }
    })
  }))
}