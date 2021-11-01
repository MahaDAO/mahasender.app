import React from 'react'
import { useTheme, Theme } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, personName: any, theme: Theme) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function SelectOption() {
  const theme = useTheme()
  const [personName, setPersonName] = React.useState('')
  const [senderAddress, setSenderAddress] = React.useState<string>('')

  const names = ['address1', 'address2', 'address3']

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string)
  }

  return (
    <FormControl className={'selectFormcontrol'}>
      <Select
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<Input />}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        style={{ color: '#fff' }}
      >
        <MenuItem disabled value="">
          <em>Select or Insert your token address</em>
        </MenuItem>

        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            // style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
