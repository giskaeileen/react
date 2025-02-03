import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import Swal from 'sweetalert2';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPencil from '../../components/Icon/IconPencil';
import IconChecks from '../../components/Icon/IconChecks';
import IconX from '../../components/Icon/IconX';
import IconXCircle from '../../components/Icon/IconXCircle';
import IconPlus from '../../components/Icon/IconPlus';


const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        status: 'Disetujui',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
    {
        id: 2,
        dob: '1989-11-19',
        phone: '+1 (838) 515-3408',
    },
    {
        id: 3,
        firstName: 'Tillman',
        dob: '2016-09-05',
        phone: '+1 (969) 496-2892',
    },
    {
        id: 4,
        dob: '1987-03-23',
        phone: '+1 (861) 564-2877',
        isActive: true,
        age: 21,
        company: 'VOLAX',
    },
    {
        id: 5,
        firstName: 'Weber',
        dob: '1983-02-24',
        phone: '+1 (962) 466-3483',
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
        'phone',
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
                    item.phone.toLowerCase().includes(search.toLowerCase())
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

    const showAlert = async (type: number) => {
        if (type === 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonText: 'Delete',
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your data has been deleted.',
                        icon: 'success',
                        customClass: 'sweet-alerts',
                    });
                }
            });
        }
    };

    const columns = [
        { accessor: 'id', title: 'No', sortable: true },
        {
          accessor: 'dob',
          title: 'Date',
          sortable: true,
          render: ({ dob }) => <div>{formatDate(dob)}</div>,

        },
        { accessor: 'phone', title: 'Nota', sortable: true },
    ];

    return (
        <div>
            {/* <div className="flex items-center overflow-x-auto whitespace-nowrap p-3">
                <h1 className="font-bold text-xl dark:text-white-light">Data Toko</h1>
                <div className="ml-auto flex gap-2">
                    <button type="button" className="btn btn-primary rounded-xl shadow-none" onClick={() => showAlert(2)}>Setuju</button>
                    <button type="button" className="btn btn-danger rounded-xl shadow-none" onClick={() => showAlert(3)}>Tolak</button>
                </div>
            </div> */}
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl dark:text-white-light">Riwayat</h1>
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
