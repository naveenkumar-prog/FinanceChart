import React, { useMemo } from 'react'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import BoxHeader from '@/components/BoxHeader';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import { Cell, Pie, PieChart } from 'recharts';


type Props = {}

const Row3 = (props: Props) => {

  const { palette } = useTheme();
  const pieColors = [palette.primary[800],palette.primary[500]];
  const { data: KpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionsData } = useGetTransactionsQuery();

  const PieChartData =  useMemo(()=> {
    if(KpiData) {
      const totalExpenses = KpiData[0].totalExpenses;
      return Object.entries(KpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value
            }
          ]
        }
      )
    }
  },[KpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `₹${params.value}`
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `₹${params.value}`
    }
  ]

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.35,
      renderCell: (params: GridCellParams) => params.value,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `₹${params.value}`
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    }
  ]

  return (
    <>
        <DashboardBox gridArea="g">
          <BoxHeader title="List of Products" sideText={`${productData?.length} products`}/>
          <Box
            mt="0.5rem"
            p="0 0.5rem"
            height="75%"
            sx = {{
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: "none"
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden",
              },

            }}
            >
            <DataGrid
              columnHeaderHeight={25}
              rowHeight={35}
              hideFooter={true}
              rows={productData || []}
              columns={productColumns}
            />
          </Box>
        </DashboardBox>
        <DashboardBox gridArea="h">
          <BoxHeader title="List of Transactions" sideText={`${transactionsData?.length} transactions`}/>
          <Box
            mt="0.5rem"
            p="0 0.5rem"
            height="75%"
            sx = {{
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: "none"
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden",
              },

            }}
            >
            <DataGrid
              columnHeaderHeight={25}
              rowHeight={35}
              hideFooter={true}
              rows={transactionsData || []}
              columns={transactionColumns}
            />
          </Box>
        </DashboardBox>
        <DashboardBox gridArea="i">
          <BoxHeader title="Expense Breakdown By Category" sideText='+4%'/>
          <FlexBetween mt="0.5rem" gap="0.5rem" p="0.1rem" textAlign="center">
            {PieChartData?.map((data, i) => (
              <Box key={`${data[0].name}-${i}`}>
              <PieChart 
                width={110} 
                height={100} 
              >
                <Pie
                  data={data}
                  stroke='none'
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='h5'>{data[0].name}</Typography>
            </Box>
            ))}
            
          </FlexBetween>
        </DashboardBox>
        <DashboardBox gridArea="j">
          <BoxHeader title="Overall Summary and Explanation Data" sideText='+15%'/>
          <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={palette.primary[800]} borderRadius="1rem">
            <Box height="15px" bgcolor={palette.primary[600]} borderRadius="1rem" width="40%">
            </Box>
          </Box>
          <Typography margin="0 1rem" variant='h6'>
            The total expenses for the given period are categorized into salaries, supplies, and services, with salaries accounting for the highest expenditure. The data helps in analyzing spending trends and optimizing resource allocation.          </Typography>
        </DashboardBox>
    </>
  )
}

export default Row3;