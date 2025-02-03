import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import 'tippy.js/dist/tippy.css';


const rowData = [
    {
        no: 1,
        product: 'Roti',
        harga: 10000,
    },
    {
        no: 2,
        product: 'Ultra Milk',
        harga: 10000,
    },
    {
        no: 3,
        product: 'Tepung',
        harga: 10000,
    },
];

const Custom = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Checkbox Table'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'no'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [visibleColumns, setVisibleColumns] = useState([
        'no',
        'product',
        'harga',
    ]);

    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'no',
        direction: 'asc',
    });
    const navigate = useNavigate();


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
            return rowData.filter((item) => {
                return (
                    item.no.toString().includes(search.toLowerCase()) ||
                    item.product.toLowerCase().includes(search.toLowerCase()) ||
                    item.harga.toString().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus, initialRecords]);

    const toggleColumnVisibility = (column: string) => {
        setVisibleColumns((prev) =>
            prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
        );
    };

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);
    };

    const columns = [
        { accessor: 'no', title: 'No', sortable: true },
        {
            accessor: 'product',
            title: 'Product',
            sortable: true,
            render: ({ product, no }: { product: string; no: number }) => (
                <div className="flex items-center w-max">
                    <img
                        className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover"
                        src={`/assets/images/profile-${no}.jpeg`}
                        alt=""
                    />
                    <div>{product}</div>
                </div>
            ),
        },
        { accessor: 'harga', title: 'Price', sortable: true, render: (data: { harga: number }): string => formatRupiah(data.harga)},
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl dark:text-white-light">Sales History</h1>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-5 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Transaction Details - #0056</h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="flex justify-between border-b pb-2">
                    <span className="font-medium">Customer:</span>
                    <span>Giska</span>
                    </p>
                    <p className="flex justify-between border-b pb-2">
                    <span className="font-medium">Kasir:</span>
                    <span>Mifta</span>
                    </p>
                    <p className="flex justify-between text-lg font-semibold">
                    <span>Total Shopping:</span>
                    <span className="text-green-600 dark:text-green-400">Rp. 100.000,00</span>
                    </p>
                </div>
            </div>



            <div className="panel mt-6">
                <div className="flex items-center flex-wrap gap-5 mb-5">
                    <div className="dropdown">
                        <Dropdown
                            placement={`${isRtl ? 'right-end' : 'right-start'}`}
                            btnClassName="btn btn-white-dark dropdown-toggle shadow-none"
                            button={
                                <>
                                    Columns
                                    <span>
                                        <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                                    </span>
                                </>
                            }
                        >
                            <ul className="!min-w-[170px] p-4">
                                {columns.map((col) => (
                                    <li
                                        key={col.accessor}
                                        className="flex items-center gap-3 ml-4 space-y-2"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={visibleColumns.includes(col.accessor)}
                                            onChange={() => toggleColumnVisibility(col.accessor)}
                                        />
                                        <span className="text-sm">{col.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </Dropdown>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input
                            type="text"
                            className="form-input w-auto"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={columns.filter((col) => visibleColumns.includes(col.accessor))}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing  ${from} to ${to} of ${totalRecords} entries`
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Custom;
