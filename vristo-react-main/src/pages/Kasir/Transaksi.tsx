import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
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
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    };

    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    return (
        <div className="flex xl:flex-row flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <div className="flex justify-between flex-wrap px-4">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Transaksi</h5>
                        {/* Kolom pencarian */}
                        <div className="flex justify-end w-full md:w-auto">
                            <input type="text" className="form-input w-32 sm:w-48 rounded-xl" placeholder="Search..."/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Baris 1 */}
                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-lg border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                {/* Icon Section */}
                                <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                    <IconDroplet />
                                </div>

                                {/* Title Section */}
                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Simple</h5>

                                {/* Plus-Minus Control Section */}
                                <div className="flex items-center justify-center space-x-4">
                                    {/* Minus Button */}
                                    <button onClick={handleDecrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        -
                                    </button>

                                    {/* Number Display */}
                                    <span className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                                        {quantity}
                                    </span>

                                    {/* Plus Button */}
                                    <button onClick={handleIncrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-lg border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                {/* Icon Section */}
                                <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                    <IconDroplet />
                                </div>

                                {/* Title Section */}
                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Simple</h5>

                                {/* Plus-Minus Control Section */}
                                <div className="flex items-center justify-center space-x-4">
                                    {/* Minus Button */}
                                    <button onClick={handleDecrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        -
                                    </button>

                                    {/* Number Display */}
                                    <span className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                                        {quantity}
                                    </span>

                                    {/* Plus Button */}
                                    <button onClick={handleIncrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-lg border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                {/* Icon Section */}
                                <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                    <IconDroplet />
                                </div>

                                {/* Title Section */}
                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Simple</h5>

                                {/* Plus-Minus Control Section */}
                                <div className="flex items-center justify-center space-x-4">
                                    {/* Minus Button */}
                                    <button onClick={handleDecrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        -
                                    </button>

                                    {/* Number Display */}
                                    <span className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                                        {quantity}
                                    </span>

                                    {/* Plus Button */}
                                    <button onClick={handleIncrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 4 */}
                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-lg border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                {/* Icon Section */}
                                <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                    <IconDroplet />
                                </div>

                                {/* Title Section */}
                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Simple</h5>

                                {/* Plus-Minus Control Section */}
                                <div className="flex items-center justify-center space-x-4">
                                    {/* Minus Button */}
                                    <button onClick={handleDecrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        -
                                    </button>

                                    {/* Number Display */}
                                    <span className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                                        {quantity}
                                    </span>

                                    {/* Plus Button */}
                                    <button onClick={handleIncrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 5 */}
                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-lg border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                {/* Icon Section */}
                                <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                    <IconDroplet />
                                </div>

                                {/* Title Section */}
                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Simple</h5>

                                {/* Plus-Minus Control Section */}
                                <div className="flex items-center justify-center space-x-4">
                                    {/* Minus Button */}
                                    <button onClick={handleDecrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        -
                                    </button>

                                    {/* Number Display */}
                                    <span className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                                        {quantity}
                                    </span>

                                    {/* Plus Button */}
                                    <button onClick={handleIncrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Baris 1 */}
                        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-lg border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                            <div className="py-7 px-6">
                                {/* Icon Section */}
                                <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                    <IconDroplet />
                                </div>

                                {/* Title Section */}
                                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Simple</h5>

                                {/* Plus-Minus Control Section */}
                                <div className="flex items-center justify-center space-x-4">
                                    {/* Minus Button */}
                                    <button onClick={handleDecrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        -
                                    </button>

                                    {/* Number Display */}
                                    <span className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                                        {quantity}
                                    </span>

                                    {/* Plus Button */}
                                    <button onClick={handleIncrease} className="bg-gray-200 dark:bg-[#2e3b52] hover:bg-gray-300 dark:hover:bg-[#3b4a63] text-[#3b3f5c] dark:text-white-light font-bold py-2 px-4 rounded-full">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:w-96 w-full xl:mt-0 mt-6">
                <div className="panel mb-5">
                    <label htmlFor="currency">Currency</label>
                    <select id="currency" name="currency" className="form-select">
                    </select>
                    <div className="mt-4">
                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="tax">Tax(%) </label>
                                <input id="tax" type="number" name="tax" className="form-input" placeholder="Tax"/>
                            </div>
                            <div>
                                <label htmlFor="discount">Discount(%) </label>
                                <input id="discount" type="number" name="discount" className="form-input" placeholder="Discount"/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="shipping-charge">Shipping Charge($) </label>
                        <input
                            id="shipping-charge"
                            type="number"
                            name="shipping-charge"
                            className="form-input"
                            placeholder="Shipping Charge"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="payment-method">Accept Payment Via</label>
                        <select id="payment-method" name="payment-method" className="form-select">
                            <option value=" ">Select Payment</option>
                            <option value="bank">Bank Account</option>
                            <option value="paypal">Paypal</option>
                            <option value="upi">UPI Transfer</option>
                        </select>
                    </div>
                </div>
                <div className="panel">
                    <div className="grid xl:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                        <button type="button" className="btn btn-success w-full gap-2">
                            {/* <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" /> */}
                            Save
                        </button>

                        <button type="button" className="btn btn-info w-full gap-2">
                            {/* <IconSend className="ltr:mr-2 rtl:ml-2 shrink-0" /> */}
                            Send Invoice
                        </button>

                        <Link to="/apps/invoice/preview" className="btn btn-primary w-full gap-2">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Preview
                        </Link>

                        <button type="button" className="btn btn-secondary w-full gap-2">
                            {/* <IconDownload className="ltr:mr-2 rtl:ml-2 shrink-0" /> */}
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>

        
    );
};

export default Cards;
