import { useEffect, useState, Fragment } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconUser from '../../components/Icon/IconUser';
import IconX from '../../components/Icon/IconX';
import IconBox from '../../components/Icon/IconBox';
import Swal from 'sweetalert2';

const AccountSetting = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    });
    const [tabs, setTabs] = useState<string>('home');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const [modal1, setModal1] = useState(false);

    const [images, setImages] = useState<any>([]);
    // const [images2, setImages2] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    const handleSave = () => {
        if (images.length === 0) {
            alert("Please upload an image before saving.");
            return;
        }
        console.log("Saved images:", images);
        alert("Image saved successfully!");
    };

    
const showAlert = async (type: number) => {
    if (type === 10) {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "By activating this feature, you can manage multiple stores in one account.",
            showCancelButton: true,
            confirmButtonText: 'Yes, Activate Now',
            cancelButtonText: 'No, Cancel',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                Swal.fire({ title: 'Multiple Store Feature is Active!', text: 'You can now manage multiple stores in one account.', icon: 'success', customClass: 'sweet-alerts' });
            }
        });
    }
    if (type === 15) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Saved successfully',
            padding: '10px 20px',
        });
    }
}
    

    return (
        <div>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Settings Account</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('home')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconUser className="w-5 h-5" />
                                Account
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('store')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'store' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconBox />
                                Store
                            </button>
                        </li>
                    </ul>
                </div>
                {tabs === 'home' ? (
                    <div className="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="panel" id="single_file">
                            <div className="mb-5">
                                <div className="custom-file-container" data-upload-id="myFirstImage">
                                    <div className="label-container flex justify-between items-center">
                                        <label>Upload</label>
                                        <button
                                            type="button"
                                            className="custom-file-container__image-clear"
                                            title="Clear Image"
                                            onClick={() => setImages([])}
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <label className="custom-file-container__custom-file"></label>
                                    <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                                        {({ imageList, onImageUpload }) => (
                                            <div className="upload__image-wrapper">
                                                <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                    Choose File...
                                                </button>
                                                &nbsp;
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="custom-file-container__image-preview relative">
                                                        <img src={image.dataURL} alt="img" className="m-auto" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                    {images.length === 0 && (
                                        <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <form className="panel">
                                <div className="flex items-center justify-between mb-5">
                                    <h6 className="text-lg font-bold">General Information</h6>
                                </div>
                                <div className="flex flex-col mt-2">
                                    <div className="grid grid-cols-1 gap-5">
                                        <div>
                                            <label htmlFor="name">Name</label>
                                            <input id="name" type="text" placeholder="Jimmy Turner" className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="address">Address</label>
                                            <input id="address" type="text" placeholder="New York" className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="phone">Phone</label>
                                            <input id="phone" type="text" placeholder="+1 (530) 555-12121" className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input id="email" type="email" placeholder="Jimmy@gmail.com" className="form-input" />
                                        </div>
                                        <div className="flex justify-end mt-3">
                                            <button type="button" className="btn btn-primary" onClick={() => showAlert(15)}>Save</button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {tabs === 'store' ? (
                    <div className="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="panel" id="single_file">
                            <div className="mb-5">
                                <div className="custom-file-container" data-upload-id="myFirstImage">
                                    <div className="label-container flex justify-between items-center">
                                        <label>Upload</label>
                                        <button
                                            type="button"
                                            className="custom-file-container__image-clear"
                                            title="Clear Image"
                                            onClick={() => setImages([])}
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <label className="custom-file-container__custom-file"></label>
                                    <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                                        {({ imageList, onImageUpload }) => (
                                            <div className="upload__image-wrapper">
                                                <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                    Choose File...
                                                </button>
                                                &nbsp;
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="custom-file-container__image-preview relative">
                                                        <img src={image.dataURL} alt="img" className="m-auto" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                    {images.length === 0 && (
                                        <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <form className="panel">
                                <div className="flex items-center justify-between mb-5">
                                    <h6 className="text-lg font-bold">General Information</h6>
                                    <button type="button" className="btn btn-primary flex items-center" onClick={() => setModal1(true)}>
                                        <IconBox className="ltr:mr-2 rtl:ml-2" />
                                    {/* <IconUserPlus className="ltr:mr-2 rtl:ml-2" />  */}
                                        Multiple Store
                                    </button>
                                </div>
                                <div className="flex flex-col mt-2">
                                    <div className="grid grid-cols-1 gap-5">
                                        <div>
                                            <label htmlFor="name">Store Name</label>
                                            <input id="name" type="text" placeholder="Jimmy Turner" className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="address">Address</label>
                                            <input id="address" type="text" placeholder="New York" className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="phone">Phone</label>
                                            <input id="phone" type="text" placeholder="+1 (530) 555-12121" className="form-input" />
                                        </div>
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input id="email" type="email" placeholder="Jimmy@gmail.com" className="form-input" />
                                        </div>
                                        <div className="flex justify-end mt-3">
                                            <button type="button" className="btn btn-primary" onClick={() => showAlert(15)}>Save</button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <Transition appear show={modal1} as={Fragment}>
                <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="bg-white dark:bg-[#1f2937] text-black dark:text-white rounded-lg overflow-hidden w-full max-w-3xl shadow-lg">
                                    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white">
                                        <div className="text-xl font-semibold">Persetujuan & Biaya Aktivasi Multiple Store</div>
                                        <button type="button" className="text-white hover:text-gray-300" onClick={() => setModal1(false)}>
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                            Fitur Multiple Store memungkinkan Anda untuk mengelola beberapa toko dalam satu akun, memberikan fleksibilitas lebih dalam mengatur inventaris, transaksi, dan laporan keuangan secara terpisah untuk setiap toko.
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                            Dengan mengaktifkan fitur ini, Anda memahami dan menyetujui ketentuan berikut:
                                        </p>
                                        <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                                            <li>Setiap toko memiliki data, inventaris, dan laporan keuangan yang terpisah.</li>
                                            <li>Transaksi dan pengaturan di satu toko tidak akan memengaruhi toko lainnya.</li>
                                            <li>Akun utama tetap memiliki kendali penuh atas seluruh toko yang terdaftar.</li>
                                            <li>Setelah fitur ini diaktifkan, penghapusan atau penggabungan data antar toko tidak dapat dilakukan.</li>
                                            <li>Anda bertanggung jawab atas pengelolaan dan kepatuhan setiap toko terhadap kebijakan yang berlaku.</li>
                                            <li>Aktivasi fitur Multiple Store memerlukan biaya tambahan.</li>
                                        </ul>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                                            Pastikan Anda memahami konsekuensi dari pengaktifan fitur ini. Jika Anda setuju dengan semua ketentuan di atas, centang kotak di bawah ini untuk melanjutkan.
                                        </p>
                                        <div className="flex items-center space-x-3 mb-6">
                                            <input type="checkbox" className="form-checkbox rounded-lg text-blue-600 border-gray-300 dark:border-gray-600" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Saya telah membaca dan menyetujui syarat, ketentuan, serta biaya aktivasi yang berlaku.</span>
                                        </div>
                                        <div className="flex justify-end space-x-4">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
                                                Batal
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={() => {setModal1(false); showAlert(10);}}>

                                                Aktivasi
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
    );
};

export default AccountSetting;
