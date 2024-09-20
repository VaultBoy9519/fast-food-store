import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '../../ui'
import { ClearButton } from '../clear-button'
import { ErrorText } from '../error-text'
import { RequiredSymbol } from '../required-symbol'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()

	const value = watch(name)
	const error = errors[name]?.message as string

	const onClickClear = () => {
		setValue(name, '', { shouldValidate: true })
	}

	return (
		<div className={className}>
			{label && (
				<p className={className}>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				<Input className='h-12 text-md' {...register(name)} {...props} />
				{value && <ClearButton onClick={onClickClear} />}
			</div>
			{error && <ErrorText text='Поле обязательно для заполнения' className='mt-2' />}
		</div>
	)
}
