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

  const names = [`${senderAddress}`, 'address1', 'address2', 'address3']

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (senderAddress?.length !== 0) setSenderAddress(senderAddress)
    else setPersonName(event.target.value as string)
  }

  return (
    <FormControl className={'selectFormcontrol'}>
      <Select
        // multiple
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<Input />}
        // renderValue={(selected) => {
        //   if ((selected as string[]).length === 0) {
        //     return <em>Select or Insert your token address</em>
        //   }

        //   return (selected as string[]).join(', ')
        // }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        style={{ color: '#fff' }}
      >
        <MenuItem disabled value="">
          <em>Select or Insert your token address</em>
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log('test')
          }}
        >
          <FormControl
            style={{
              borderRadius: '5px',
              width: '100%',
            }}
          >
            <OutlinedInput
              autoFocus
              id="outlined-adornment-weight"
              value={senderAddress}
              onChange={(e) => {
                setSenderAddress(e.target.value)
              }}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              labelWidth={0}
              style={{ color: '#000', height: '40px' }}
            />
          </FormControl>
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
