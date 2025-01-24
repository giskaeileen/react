import { Link } from 'react-router-dom';
import CodeHighlight from '../../components/Highlight';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../components/Icon/IconCode';

const Basic = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Basic Forms'));
    });
    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between w-full">
                <h5 className="font-semibold text-lg dark:text-white-light">Tambah Data Toko</h5>
            </div>
            {/* <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Forms
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Basic</span>
                </li>
            </ul> */}

            <div className="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="panel lg:col-span-2">
                    {/* <div className="flex items-center justify-between mb-5 w-full">
                        <h5 className="font-semibold text-lg dark:text-white-light">Tambah Toko</h5>
                    </div> */}
                    <div className="mb-5">
                        <form>
                            <input type="hidden" id="id_store" placeholder="Id Cabang" className="form-input rounded-xl" required />
                            <div>
                                <label htmlFor="name" className="text-sm inline-block">Store Name</label>
                                <p className="text-sm text-danger inline-block ml-1">*</p>
                                <input type="text" id="store_name" placeholder="Masukkan Nama Cabang" className="form-input rounded-xl" required />
                            </div>
                            <div>
                                <label htmlFor="address" className="text-sm inline-block mt-4">Address Store</label>
                                <p className="text-sm text-danger inline-block ml-1">*</p>
                                <textarea id="address_store" rows={3} className="form-textarea" placeholder="Masukkan Alamat Cabang" required></textarea>
                            </div>
                            <div>
                                <label htmlFor="telepon_cabang" className="text-sm inline-block mt-4">Telepon Cabang</label>
                                <p className="text-sm text-danger inline-block ml-1">*</p>
                                <input type="tel" placeholder="6-(666)-111-7777" className="form-input" required />
                            </div>
                            <div>
                                <label htmlFor="email_cabang" className="text-sm inline-block mt-4">Email Cabang</label>
                                <p className="text-sm text-danger inline-block ml-1">*</p>
                                <input id="email_cabang" type="email" placeholder="name@example.com" className="form-input" required />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basic;
