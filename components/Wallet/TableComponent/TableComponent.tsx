import {
  Box, Table, TableBody, TableCell, TableContainer, TableRow,
} from '@mui/material';
import berriesImg from 'public/blueberries.svg';
import moneyImg from 'public/money.svg';
import React, { FC } from 'react';

import { useTableStyles } from '../WalletComponent/style';

type Props = {
  money: number,
  mushrooms: number,
};

const TableComponent: FC<Props> = ({ money, mushrooms }) => {
  const classesT = useTableStyles();
  function createData(amount: number, symbol: string) {
    return { amount, symbol };
  }

  const rows = [
    createData(money, moneyImg.src),
    createData(mushrooms, berriesImg.src),
  ];

  return (
    <TableContainer
      className={classesT.tableContainer}
    >
      <Table className={classesT.table}>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.symbol}
              className={classesT.tableRow}
            >
              <TableCell align="center">
                <Box className={classesT.tableImageCell}>
                  <img src={row.symbol} alt={row.symbol} width="25px" height="25px" />
                </Box>
              </TableCell>
              <TableCell sx={{ minWidth: '20px' }} align="center">
                <Box className={classesT.tableValueCell}>
                  {row.amount}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
