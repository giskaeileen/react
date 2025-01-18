import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import IconX from '../../components/Icon/IconX';
import IconListCheck from '../../components/Icon/IconListCheck';
import IconLayoutGrid from '../../components/Icon/IconLayoutGrid';
import IconTrash from '../../components/Icon/IconTrash';
import IconXCircle from '../../components/Icon/IconXCircle';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconDroplet from '../../components/Icon/IconDroplet';
import IconStar from '../../components/Icon/IconStar';
import IconEye from '../../components/Icon/IconEye';
import IconHeart from '../../components/Icon/IconHeart';

const Cards = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Cards'));
    });
    // const [quantity, setQuantity] = useState(0);

    // const handleIncrease = () => {
    //     setQuantity(prev => prev + 1);
    // };

    // const handleDecrease = () => {
    //     if (quantity > 0) {
    //         setQuantity(prev => prev - 1);
    //     }
    // };

    // syntax benar
    // const [items, setItems] = useState<{ id: number, name: string, price: string, quantity: number }[]>([]);

    // const handleIncrease = (id: number, name: string, price: string) => {
    //     setItems(prevItems => {
    //         const existingItem = prevItems.find(item => item.id === id);
    //         if (existingItem) {
    //             return prevItems.map(item =>
    //                 item.id === id
    //                     ? { ...item, quantity: item.quantity + 1 }
    //                     : item
    //             );
    //         } else {
    //             return [...prevItems, { id, name, price, quantity: 1 }];
    //         }
    //     });
    // };

    // const handleDecrease = (id: number) => {
    //     setItems(prevItems => {
    //         const existingItem = prevItems.find(item => item.id === id);
    //         if (existingItem && existingItem.quantity > 1) {
    //             return prevItems.map(item =>
    //                 item.id === id
    //                     ? { ...item, quantity: item.quantity - 1 }
    //                     : item
    //             );
    //         } else {
    //             return prevItems.filter(item => item.id !== id);
    //         }
    //     });
    // };
    const [items, setItems] = useState<{ id: number, name: string, price: string, quantity: number }[]>([]);
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

    const handleIncrease = (id: number, name: string, price: string) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { id, name, price, quantity: 1 }];
            }
        });
    };

    const handleDecrease = (id: number) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevItems.filter(item => item.id !== id);
            }
        });
    };

    const products = [
        { id: 1, name: 'Aqua', price: 'Rp. 12.000,00' },
        { id: 2, name: 'Teh Botol', price: 'Rp. 8.000,00' },
        { id: 3, name: 'Biskuit', price: 'Rp. 15.000,00' },
        { id: 4, name: 'Chips', price: 'Rp. 10.000,00' },
        { id: 5, name: 'Roti', price: 'Rp. 7.000,00' },
        { id: 6, name: 'Susu', price: 'Rp. 18.000,00' },
    ];

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };
    
    const clearAllItems = () => {
        setItems([]);
    };


    // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    // const [showPrintButton, setShowPrintButton] = useState(false);

    // const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedPaymentMethod(event.target.value);
    // };

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPaymentMethod(event.target.value);
        setModalVisible(true);
    };

    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

        const [codeArr, setCodeArr] = useState<string[]>([]);
        const [viewMode, setViewMode] = useState('grid'); // 'grid' atau 'list'
    
        const [showPrintButton, setShowPrintButton] = useState(false); // State untuk mengontrol visibilitas tombol Cetak Struk

        const handlePayment = async () => {
            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: 'You clicked the Pay button!',
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowPrintButton(true); // Menampilkan tombol Cetak Struk setelah alert di OK
                }
            });
        };

    return (
        <div>
        <div className="flex flex-wrap gap-4 mb-6">
            <h5 className="font-bold text-lg dark:text-white-light">POS (Point Of Sale)</h5>
        </div>
        <div className="flex xl:flex-row flex-col gap-2.5"> 
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <div className="flex justify-between flex-wrap px-4">
                    <div className="w-full">
                        {/* <h5 className="font-semibold text-lg dark:text-white-light">Transaksi</h5> */}
                        {/* Kolom pencarian */}
                        <div className="flex justify-end w-full">
                            {/* <input type="text" className="form-input w-full md:w-auto rounded-xl" placeholder="Search..."/> */}
                            <input type="text" className="form-input w-full rounded-xl" placeholder="Search..."/>
                        </div>

                        {/* Tombol Kategori */}
                        <div className="flex justify-start space-x-4 w-full mt-4">
                            {/* <button onClick={() => handleCategoryChange('minuman')} className="btn btn-outline-primary rounded-xl"> */}
                            <button className="btn btn-outline-primary rounded-xl">
                                Minuman
                            </button>
                            {/* <button onClick={() => handleCategoryChange('makanan')} className="btn btn-outline-primary rounded-xl"> */}
                            <button className="btn btn-outline-primary rounded-xl">
                                Makanan
                            </button>
                            {/* <button onClick={() => handleCategoryChange('snack')} className="btn btn-outline-primary rounded-xl"> */}
                            <button className="btn btn-outline-primary rounded-xl">
                                Snack
                            </button>
                        </div>
                        
                        {/* <div className="flex justify-center grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mt-6 max-h-[400px] overflow-y-auto">
                            {[1, 2, 3, 4, 5, 6].map((id) => {
                                const item = items.find(item => item.id === id);
                                const quantity = item?.quantity || 0;

                                return (
                                    <div key={id} className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-lg border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mx-auto sm:mx-0">
                                        <div className="py-7 px-6">
                                            <div className="flex justify-center mb-4">
                                                <img src="/assets/images/profile-12.jpeg" alt="Gambar Produk" className="w-32 h-32 object-cover rounded-lg" />
                                            </div>
                                            <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                                                Aqua
                                            </h5>
                                            <p className="text-white-dark">Rp. 12.000,00</p>
                                            <div className="flex items-center justify-center space-x-4 mt-6">
                                                <button onClick={() => handleDecrease(id)} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                                    -
                                                </button>
                                                <span className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                                                    {quantity}
                                                </span>
                                                <button onClick={() => handleIncrease(id, 'Aqua', 'Rp. 12.000,00')} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div> */}

                        <div className="container mx-auto p-4">
                            {/* View Type Toggle */}
                            <div className="flex justify-end mb-4 space-x-1">
                                <button
                                    onClick={() => setViewType('grid')}
                                    className={`btn ${viewType === 'grid' ? 'btn-outline-primary' : 'btn-outline-secondary'} px-2 py-1 text-sm`}
                                >
                                    <IconLayoutGrid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`btn ${viewType === 'list' ? 'btn-outline-primary' : 'btn-outline-secondary'} px-2 py-1 text-sm`}
                                >
                                    <IconListCheck className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Product Display */}
                            {viewType === 'grid' ? (
                                <div className="flex justify-center grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mt-6 max-h-[400px] overflow-y-auto">
                                    {products.map(({ id, name, price }) => {
                                        const item = items.find(item => item.id === id);
                                        const quantity = item?.quantity || 0;

                                        return (
                                            <div key={id} className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-lg border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mx-auto sm:mx-0">
                                                <div className="py-7 px-6">
                                                    <div className="flex justify-center mb-4">
                                                        <img src="/assets/images/profile-12.jpeg" alt="Gambar Produk" className="w-32 h-32 object-cover rounded-lg" />
                                                    </div>
                                                    <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                                                        {name}
                                                    </h5>
                                                    <p className="text-white-dark">{price}</p>
                                                    <div className="flex items-center justify-center space-x-4 mt-6">
                                                        <button onClick={() => handleDecrease(id)} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                                            -
                                                        </button>
                                                        <span className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                                                            {quantity}
                                                        </span>
                                                        <button onClick={() => handleIncrease(id, name, price)} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="max-h-[400px] overflow-y-auto">
                                    {products.map(({ id, name, price }) => {
                                        const item = items.find(item => item.id === id);
                                        const quantity = item?.quantity || 0;

                                        return (
                                            <div key={id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
                                                <div className="flex items-center">
                                                    <img src="/assets/images/profile-12.jpeg" alt="Gambar Produk" className="w-16 h-16 object-cover rounded-lg mr-4" />
                                                    <div>
                                                        <h5 className="text-[#3b3f5c] text-lg font-semibold dark:text-white-light">
                                                            {name}
                                                        </h5>
                                                        <p className="text-white-dark">{price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <button onClick={() => handleDecrease(id)} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                                        -
                                                    </button>
                                                    <span className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                                                        {quantity}
                                                    </span>
                                                    <button onClick={() => handleIncrease(id, name, price)} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:w-96 w-full xl:mt-0 mt-6">
                <div className="panel mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Transaksi</h5>
                    <div className="flex justify-between items-center mt-6">
                        <label htmlFor="kasir">Kasir</label>
                        <label htmlFor="nama">Giska</label>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <label htmlFor="tanggal">Tanggal</label>
                        <label htmlFor="nama">12 Januari 2025</label>
                    </div>
                    {/* <select id="currency" name="currency" className="form-select"> */}
                    {/* </select> */}
                    <div>
                        {/* <h2 className="text-lg font-semibold mb-4">Produk yang Dibeli</h2> */}
                        <div className="flex justify-between mb-4">
                            <h5 className="text-white-dark mt-6">Order</h5>
                            {items.length > 0 && (
                                <button
                                    onClick={() => clearAllItems()} // Fungsi untuk menghapus semua produk
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <IconTrash />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {items.length === 0 ? (
                                <p className="text-white-dark">No items added</p>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <span>{item.name} x {item.quantity}</span>
                                        <div className="flex items-center">
                                            <span>{item.price}</span>
                                            <button
                                                onClick={() => removeItem(item.id)} // Fungsi untuk menghapus item
                                                className="ml-2 text-black-400 hover:text-black-600"
                                            >
                                                <IconXCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* <div className="mt-4">
                        <label htmlFor="payment-method">Accept Payment Via</label>
                        <select id="payment-method" name="payment-method" className="form-select">
                            <option value=" ">Select Payment</option>
                            <option value="bank">Tunai</option>
                            <option value="bank">Bank Account</option>
                            <option value="bank">Bank Account</option>
                            <option value="bank">Bank Account</option>
                            <option value="bank">Bank Account</option>
                            <option value="bank">Bank Account</option>
                            <option value="paypal">Paypal</option>
                            <option value="upi">UPI Transfer</option>
                        </select>
                    </div> */}
                    {/* Total Harga */}
                    <div className="mt-6">
                        <div className="mb-4 text-xl font-bold text-gray-800 dark:text-white-light flex justify-between items-center">
                            <span>Total Harga:</span>
                            <span className="text-primary">Rp. 30.000,00</span>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <label htmlFor="payment-method">Accept Payment Via</label>
                    <select id="payment-method" name="payment-method" className="form-select" onChange={handlePaymentChange}>
                        <option value="">Select Payment</option>
                        <option value="tunai">Tunai</option>
                        <option value="bank">Transfer</option>
                        <option value="wallet">E-Wallet</option>
                    </select>
                    <div className="grid xl:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        {/* Tombol Bayar */}
                        <button type="button" className="btn btn-primary w-full gap-2" onClick={handlePayment}>
                            Bayar
                        </button>

                        {/* Tombol Cetak Struk (Muncul setelah alert di-OK) */}
                        {showPrintButton && (
                            <Link to="/apps/invoice/preview" className="btn btn-success w-full gap-2">
                                Cetak Struk
                            </Link>
                        )}
                    </div>

                    <Transition appear show={modalVisible} as={Fragment}>
                        <Dialog as="div" open={modalVisible} onClose={() => setModalVisible(false)}>
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen px-4">
                                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                        <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                <h5 className="font-bold text-lg">{selectedPaymentMethod === 'tunai' ? 'Pembayaran Tunai - Rp. 30.000,00' : selectedPaymentMethod === 'bank' ? 'Transfer - Rp. 30.000,00' : selectedPaymentMethod === 'wallet' ? 'E-Wallet Payment' : 'Pilih Metode'}</h5>
                                                <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModalVisible(false)}>
                                                    <IconX />
                                                </button>
                                            </div>
                                            <div className="p-5">
                                                {selectedPaymentMethod === 'tunai' && (
                                                    <form>
                                                        <div className="mb-3">
                                                            <label htmlFor="amountReceived" className="form-label">Jumlah Uang Diterima</label>
                                                            <input type="number" className="form-input rounded-xl" id="amountReceived" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="change" className="form-label">Uang Kembali</label>
                                                            <input type="number" className="form-input rounded-xl" id="change" disabled />
                                                        </div>
                                                    </form>
                                                )}
                                                {selectedPaymentMethod === 'bank' && (
                                                    <form>
                                                        <div className="mb-3">
                                                            <label htmlFor="bankName" className="form-label">Pilih Bank</label>
                                                            <select id="bankName" className="form-select">
                                                                <option value="bca">BCA</option>
                                                                <option value="mandiri">Mandiri</option>
                                                                <option value="bri">BRI</option>
                                                            </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="accountNumber" className="form-label">Nomor Rekening</label>
                                                            <input type="text" className="form-input rounded-xl" id="accountNumber" />
                                                        </div>
                                                    </form>
                                                )}
                                                {selectedPaymentMethod === 'wallet' && (
                                                    <div className="text-center">
                                                        <p>Scan QR Code untuk melakukan pembayaran</p>
                                                        <img src="https://via.placeholder.com/150" alt="QR Code" />
                                                    </div>
                                                )}
                                                <div className="flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModalVisible(false)}>
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>

            </div>
        </div>
        </div>

        
    );
};

export default Cards;
