import React, { useState } from 'react'
import { Table, Button } from 'antd'
import { CSVLink } from "react-csv";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

import { data, columns } from './index'


const AntDesignTable = () => {

    const [scvData, setCsvData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])

    const onSelectChnage = (newSelectedRows) => {
        // set selected rows to newSelectedRows
        setSelectedRows(newSelectedRows)
    }

    const handleExportCsv = () => {
        console.log('clicked')
        // pass the selected rows to csvData state
        // filter selectedData from Data
        const selectedData  = []
        selectedRows.forEach((selectedIndex) => {
            selectedData.push(data[selectedIndex])
        })
        // set scvData to selectedData
        setCsvData(selectedData)
    }

    const handleExportPDF = () => {
        const tableData = selectedRows.map((dataIndex, index) => {
            return [
              index,
              data[dataIndex].name,
              data[dataIndex].age,
              data[dataIndex].address,
            ]
          })

          // create a PDF file
          const doc = new jsPDF()
          doc.autoTable({
            head: [['#', 'Name', 'Age', 'Address']],
            body: tableData,
          })
          doc.save('selected_rows.pdf')
    }

    const rowSelection = {
        selectedRows,
        onChange: onSelectChnage,
    }
    const hasSelected = selectedRows.length > 0
      
  return (
    <div>
        <Button onClick={handleExportCsv}>
            <CSVLink  data={scvData}>Download Excel</CSVLink>
        </Button>
        <Button onClick={handleExportPDF}>Download PDF</Button>
        {hasSelected ? <span> seletced {selectedRows.length} items</span> : ''}
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  )
}

export default AntDesignTable