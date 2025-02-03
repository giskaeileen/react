import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import Swal from 'sweetalert2';
import 'tippy.js/dist/tippy.css';


const rowData = [
    {
        id: 1,
        dob: '2004-05-28',
        nota: '#0056',
    },
    {
        id: 2,
        dob: '1989-11-19',
        nota: '#0021',
    },
    {
        id: 3,
        dob: '2016-09-05',
        nota: '#0054',
    },
    {
        id: 4,
        dob: '1987-03-23',
        nota: '#0067',
    },
    {
        id: 5,
        dob: '1983-02-24',
        nota: '#0098',
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
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [visibleColumns, setVisibleColumns] = useState([
        'id',
        'dob',
        'nota',
    ]);

    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
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
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.dob.toLowerCase().includes(search.toLowerCase()) ||
                    item.nota.toLowerCase().includes(search.toLowerCase())
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

    const formatDate = (date: any) => {
      if (date) {
          const dt = new Date(date);
          const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
          const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
          return day + '/' + month + '/' + dt.getFullYear();
      }
      return '';
    };

    const columns = [
        { accessor: 'id', title: 'No', sortable: true },
        {
          accessor: 'dob',
          title: 'Date',
          sortable: true,
          render: ({ dob }: { dob?: string }) => <div>{dob ? formatDate(dob) : '-'}</div>,

        },
        { accessor: 'nota', title: 'Nota', sortable: true },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl dark:text-white-light">Sales History</h1>
                <div className="flex items-center gap-2 ml-auto">
                    <button
                        type="button"    
                        className="btn btn-primary rounded-lg flex items-center"
                        onClick={() => navigate('/riwayat-detail')}
                    >
                        Detail
                    </button>
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
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
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
