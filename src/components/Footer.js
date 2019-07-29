import React from 'react'
import { Table,Button} from 'semantic-ui-react'

// these are the props for the Header
export const Footer = ({ handleClearCompleted }) => {
  return (
    <Table.Footer fullWidth>
    <Table.Row>
      <Table.HeaderCell colSpan='2'>
        <Button size='small' onClick={handleClearCompleted}>
          Clear completed
        </Button>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
  )
}
