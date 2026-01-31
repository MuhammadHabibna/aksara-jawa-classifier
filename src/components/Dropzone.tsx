import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import clsx from 'clsx';

interface DropzoneProps {
    onImageSelect: (file: File) => void;
}

export default function Dropzone({ onImageSelect }: DropzoneProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length > 0) {
            onImageSelect(acceptedFiles[0]);
        }
    }, [onImageSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={clsx(
                "border-2 border-dashed rounded-2xl p-8 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center gap-4 h-64",
                isDragActive
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            )}
        >
            <input {...getInputProps()} />
            <div className={clsx("p-4 rounded-full", isDragActive ? "bg-indigo-100" : "bg-gray-100")}>
                {isDragActive ? (
                    <UploadCloud className="w-8 h-8 text-indigo-600" />
                ) : (
                    <ImageIcon className="w-8 h-8 text-gray-500" />
                )}
            </div>
            <div>
                <p className="text-lg font-medium text-gray-900">
                    {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    or click to select from files
                </p>
            </div>
            <p className="text-xs text-gray-400">
                Supports PNG, JPG, WEBP
            </p>
        </div>
    );
}
