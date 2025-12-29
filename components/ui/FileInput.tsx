import { type ChangeEvent, useState, useEffect, useId } from 'react';
import { X } from '@phosphor-icons/react';
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from 'react-hook-form';
import { cn } from '@shared/utils';

interface BaseFileInputProps {
	label?: string;
	maxFiles?: number;
	disabled?: boolean;
	accept?: string;
	capture?: 'user' | 'environment';
	onError?: (error: string) => void;
}

interface ControlledFileInputProps<T extends FieldValues>
	extends BaseFileInputProps {
	control: Control<T>;
	name: Path<T>;
}

interface UncontrolledFileInputProps extends BaseFileInputProps {
	name: string;
	error?: string;
	defaultValue?: File[];
	onChange?: (files: File[]) => void;
	control?: never;
}

type FileInputProps<T extends FieldValues = FieldValues> =
	| ControlledFileInputProps<T>
	| UncontrolledFileInputProps;

function FileInputInner({
	name,
	label = 'Upload File',
	maxFiles = 5,
	disabled = false,
	error,
	accept = 'image/*',
	capture = 'environment',
	value = [],
	onChange,
	onError,
}: {
	name: string;
	label?: string;
	maxFiles?: number;
	disabled?: boolean;
	error?: string;
	accept?: string;
	capture?: 'user' | 'environment';
	value?: File[];
	onChange?: (files: File[]) => void;
	onError?: (error: string) => void;
}) {
	const inputId = useId();
	const [previews, setPreviews] = useState<string[]>([]);

	useEffect(() => {
		// Generate previews when files change
		const newPreviews: string[] = [];
		let loadedCount = 0;

		if (value.length === 0) {
			setPreviews([]);
			return;
		}

		value.forEach((file) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				newPreviews.push(event.target?.result as string);
				loadedCount++;
				if (loadedCount === value.length) {
					setPreviews(newPreviews);
				}
			};
			reader.readAsDataURL(file);
		});
	}, [value]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files || []);

		// Validate max files
		if (value.length + selectedFiles.length > maxFiles) {
			const errorMsg = `Maksimal ${maxFiles} foto`;
			onError?.(errorMsg);
			return;
		}

		const newFiles = [...value, ...selectedFiles];
		onChange?.(newFiles);

		// Reset input
		e.target.value = '';
	};

	const removeFile = (index: number) => {
		const newFiles = value.filter((_, i) => i !== index);
		onChange?.(newFiles);
	};

	return (
		<div>
			{label && (
				<label className="block text-sm font-medium text-gray-700 mb-2">
					{label}
				</label>
			)}

			<div
				onClick={() => !disabled && document.getElementById(inputId)?.click()}
				className={cn(
					'border-2 border-dashed border-[#8FD8D2] rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors',
					disabled && 'opacity-50 cursor-not-allowed',
					error && 'border-red-500'
				)}
			>
				<div className="text-3xl mb-2">📷</div>
				<div className="text-sm font-medium text-gray-700">
					Ambil/Upload Foto
				</div>
				<div className="text-xs text-gray-500 mt-1">
					{value.length}/{maxFiles} foto dipilih
				</div>
				<input
					id={inputId}
					name={name}
					type="file"
					accept={accept}
					capture={capture}
					multiple={maxFiles > 1}
					disabled={disabled || value.length >= maxFiles}
					onChange={handleFileChange}
					className="hidden"
				/>
			</div>

			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}

			{previews.length > 0 && (
				<div className="mt-4 grid grid-cols-2 gap-3">
					{previews.map((preview, index) => (
						<div key={index} className="relative">
							<img
								src={preview}
								alt={`Preview ${index + 1}`}
								className="w-full aspect-square object-cover rounded-lg shadow-md"
							/>
							<button
								type="button"
								onClick={() => removeFile(index)}
								disabled={disabled}
								className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50"
							>
								<X size={16} weight="bold" />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export function FileInput<T extends FieldValues = FieldValues>(
	props: FileInputProps<T>
) {
	// Controlled with React Hook Form
	if ('control' in props && props.control) {
		return (
			<Controller
				control={props.control}
				name={props.name}
				render={({ field, fieldState }) => (
					<FileInputInner
						{...props}
						name={props.name}
						value={field.value || []}
						onChange={field.onChange}
						error={fieldState.error?.message}
					/>
				)}
			/>
		);
	}

	// Uncontrolled
	const uncontrolledProps = props as UncontrolledFileInputProps;
	return (
		<FileInputInner
			{...uncontrolledProps}
			value={uncontrolledProps.defaultValue}
			onChange={uncontrolledProps.onChange}
		/>
	);
}
