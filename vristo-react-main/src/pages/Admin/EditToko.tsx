import { Link } from 'react-router-dom';
import CodeHighlight from '../../components/Highlight';
import { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
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

    const [images, setImages] = useState<any>([]);
    const [images2, setImages2] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    const onChange2 = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages2(imageList as never[]);
    };

    return (
        <div>
            <div className="flex items-center justify-between w-full">
                <h5 className="font-semibold text-lg dark:text-white-light">Edit Store Data</h5>
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
                <div className="panel" id="single_file">
                    <div className="mb-5">
                        <div className="custom-file-container" data-upload-id="myFirstImage">
                            <div className="label-container">
                                <label>Upload </label>
                                <button
                                    type="button"
                                    className="custom-file-container__image-clear"
                                    title="Clear Image"
                                    onClick={() => {
                                        setImages([]);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                            <label className="custom-file-container__custom-file"></label>
                            <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                            <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
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
                            {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" /> : ''}
                        </div>
                    </div>
                </div>
                <div className="panel">
                    {/* <div className="flex items-center justify-between mb-5 w-full">
                        <h5 className="font-semibold text-lg dark:text-white-light">Tambah Toko</h5>
                    </div> */}
                    <div className="mb-5">
                        <form>
                            <input type="hidden" id="id_store" placeholder="Id Cabang" className="form-input rounded-xl" required />
                            <div>
                                <label htmlFor="store_name" className="text-sm inline-block">Store Name</label>
                                <p className="text-sm text-danger inline-block ml-1">*</p>
                                <input type="text" id="store_name" placeholder="Enter the store name" className="form-input rounded-xl" required />
                            </div>
                            <div>
                                <label htmlFor="address" className="text-sm inline-block mt-4">Address Store</label>
                                <p className="text-sm text-danger inline-block ml-1">*</p>
                                <textarea id="address_store" rows={3} className="form-textarea" placeholder="Enter the store address" required></textarea>
                            </div>
                            <div>
                                <label htmlFor="owner_name" className="text-sm inline-block">Owner Name</label>
                                <p className="text-sm text-danger inline-block ml-1">*</p>
                                <input type="text" id="store_name" placeholder="Enter the owner's name" className="form-input rounded-xl" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm inline-block mt-4">Owner Email</label>
                                <p className="text-sm text-danger inline-block ml-1">*</p>
                                <input id="email" type="email" placeholder="name@example.com" className="form-input" required />
                            </div>
                            <div>
                                <label htmlFor="telepon" className="text-sm inline-block mt-4">Owner Phone</label>
                                <p className="text-sm text-danger inline-block ml-1">*</p>
                                <input type="tel" placeholder="6-(666)-111-7777" className="form-input" required />
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
