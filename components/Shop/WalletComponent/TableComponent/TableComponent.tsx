import {
  Paper, Table, TableBody, TableCell, TableContainer, TableRow,
} from '@mui/material';
import { FC } from 'react';

import { useTableStyles } from '../style';

type Props = {
  money: number,
  mushrooms: number,
};

const TableComponent: FC<Props> = ({ money, mushrooms }) => {
  const classesT = useTableStyles();
  function createData(name: string, amount: number, symbol: string) {
    return { name, amount, symbol };
  }

  const rows = [
    createData('Money', money, '$'),
    createData('Mushrooms', mushrooms, '🍄'),
  ];

  return (
    <TableContainer
      component={Paper}
      className={classesT.tableContainer}
    >
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              className={classesT.tableRow}
            >
              <TableCell className={classesT.tableCell} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
