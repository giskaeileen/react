import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconBox from '../../components/Icon/IconBox';
import Swal from 'sweetalert2';

const AccountSetting = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    });
    const [tabs, setTabs] = useState<string>('store');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };


    const [images, setImages] = useState<any>([]);
    // const [images2, setImages2] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    const showAlert = async (type: number) => {
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
                                onClick={() => toggleTabs('store')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'store' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconBox />
                                Store
                            </button>
                        </li>
                    </ul>
                </div>
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
                                    <h6 className="text-lg font-bold">Store Information</h6>
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
            </div>
        </div>
    );
};

export default AccountSetting;
