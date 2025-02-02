import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const rowData = [
    {
        no: 1,
        dob: '2024-01-15',
        product: 'Laptop',
        stockIn: 50,
        stockOut: 10,
        purchasePrice: 7000000,
        sellingPrice: 8500000,
        income: 500000,
        Profit: 7500000,
    },
    {
        no: 2,
        dob: '2024-02-10',
        product: 'Mouse',
        stockIn: 100,
        stockOut: 30,
        purchasePrice: 150000,
        sellingPrice: 200000,
        income: 50000,
        Profit: 3500000,
    },
    {
        no: 3,
        dob: '2024-03-05',
        product: 'Keyboard',
        stockIn: 80,
        stockOut: 20,
        purchasePrice: 250000,
        sellingPrice: 350000,
        income: 100000,
        Profit: 2000000,
    }
];


const col = ['no', 'dob', 'product', 'stockIn', 'stockOut', 'purchasePrice', 'sellingPrice', 'income', 'Profit'];

const Export = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Export Table'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'no', direction: 'asc' });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');
    const [date2, setDate2] = useState<any>('2022-08-05');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item: any) => {
                return (
                    item.no.toString().includes(search.toLowerCase()) ||
                    item.dob.includes(search.toLowerCase()) ||
                    item.product.toLowerCase().includes(search.toLowerCase()) ||
                    item.stockIn.toString().includes(search.toLowerCase()) ||
                    item.stockOut.toString().includes(search.toLowerCase()) ||
                    item.purchasePrice.toString().includes(search.toLowerCase()) ||
                    item.sellingPrice.toString().includes(search.toLowerCase()) ||
                    item.income.toString().includes(search.toLowerCase()) ||
                    item.Profit.toString().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);
    

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    const header = ['No', 'Date', 'Product', 'Stock In', 'Stock Out', 'Purchase Price', 'Selling Price', 'Income', 'Profit'];

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    function handleDownloadExcel() {
        downloadExcel({
            fileName: 'report',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: rowData,
            },
        });
    }

    const exportTable = (type: any) => {
        let columns: any = col;
        let records = rowData;
        let filename = 'report';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            // eslint-disable-next-line array-callback-return
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';

            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                rowhtml += '<tr>';
                // eslint-disable-next-line array-callback-return
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        }
    };

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);
    };
    
    
    return (
        <div>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div>
                <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline">
                    https://www.npmjs.com/package/mantine-datatable
                </a>
            </div> */}
            {/* <h1 className="font-bold text-xl dark:text-white-light">Report  </h1> */}
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl dark:text-white-light">Report</h1>
                <div className="flex items-center gap-2 ml-auto">
                    {/* <button type="button" onClick={() => exportTable('txt')} className="btn btn-primary btn-sm m-1">
                        <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                        TXT
                    </button> */}

                    <button type="button" className="btn btn-primary btn-sm m-1" onClick={handleDownloadExcel}>
                        <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                        EXCEL
                    </button>

                    <button type="button" onClick={() => exportTable('print')} className="btn btn-primary btn-sm m-1">
                        <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                        PRINT
                    </button>
                </div>
            </div>

            {/* <div className="panel mt-6">
                <div className="flex items-end gap-4">
                    <div className="space-y-2">
                        <label htmlFor="dari" className="text-sm block">Dari Tanggal</label>
                        <Flatpickr value={date1} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input w-50" onChange={(date) => setDate1(date)} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="sampai" className="text-sm block">Sampai Tanggal</label>
                        <Flatpickr value={date2} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input w-50" onChange={(date) => setDate2(date)} />
                    </div>
                    <button type="submit" className="btn btn-primary h-fit">
                        Submit
                    </button>
                </div>
            </div> */}



            <div className="panel mt-6">
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-5 gap-5">
                    <div className="space-y-2 flex items-center">
                        <label htmlFor="dari" className="text-sm block mr-2">Dari Tanggal</label>
                        <Flatpickr 
                            value={date1} 
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} 
                            className="form-input w-50" 
                            onChange={(date) => setDate1(date)} 
                        />
                    </div>

                    <div className="space-y-2 flex items-center">
                        <label htmlFor="sampai" className="text-sm block mr-2">Sampai Tanggal</label>
                        <Flatpickr 
                            value={date2} 
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} 
                            className="form-input w-50" 
                            onChange={(date) => setDate2(date)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary h-fit">
                        Filter
                    </button>

                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'no', title: 'No', sortable: true },
                            {
                                accessor: 'dob',
                                title: 'Date',
                                sortable: true,
                                render: ({ dob }) => <div>{formatDate(dob)}</div>,

                            },
                            { accessor: 'product', title: 'Product', sortable: true },
                            { accessor: 'stockIn', title: 'Incoming Stock', sortable: true },
                            { accessor: 'stockOut', title: 'Stock Keluar', sortable: true },
                            { accessor: 'purchasePrice', title: 'Purchase Price', sortable: true, render: (data) => formatRupiah(data.purchasePrice) },
                            { accessor: 'sellingPrice', title: 'Selling Price', sortable: true, render: (data) => formatRupiah(data.sellingPrice) },
                            { accessor: 'income', title: 'Income', sortable: true, render: (data) => formatRupiah(data.income) },
                            { accessor: 'Profit', title: 'Profit', sortable: true, render: (data) => formatRupiah(data.Profit) },
                            
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Export;
