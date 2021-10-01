import React, { ComponentProps, VFC } from 'react'
import ReactSelect, { GroupTypeBase, OptionTypeBase, Styles } from 'react-select'
import { ThemeConfig } from 'react-select/src/theme'
import colors from 'styles/colors'

type Props = ComponentProps<typeof ReactSelect>

const customTheme: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: colors.blue200,
  },
})

const Select: VFC<Props> = ({ ...props }) => {
  const customStyles = {} as Partial<Styles<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>>

  return <ReactSelect styles={customStyles} theme={customTheme} {...props} />
}

export default Select
