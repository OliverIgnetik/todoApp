import React from 'react'
import { Table, Checkbox } from 'semantic-ui-react'

// these are the props for the Header
export const TableHeader = ({ allToggled, handleToggleAll }) => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox checked={allToggled} onChange={handleToggleAll} />
        </Table.HeaderCell>
        <Table.HeaderCell>Toggle all items</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}
