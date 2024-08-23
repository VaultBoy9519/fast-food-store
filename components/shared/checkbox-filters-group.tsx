'use client'
import { FC, useState } from 'react'
import { Input } from '../ui'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'

interface Props {
	title: string
	items: FilterCheckboxProps[]
	defaultItems: FilterCheckboxProps[]
	limit: number
	searchInputPlaceholder?: string
	onChange?: (values: string[]) => void
	defaultValue?: string[]
	className?: string
}

export const CheckboxFiltersGroup: FC<Props> = ({ title, items, defaultItems, limit, searchInputPlaceholder = 'Поиск...', onChange, defaultValue, className }) => {
	const [showAll, setShowAll] = useState(false)

	const [searchValue, setSearchValue] = useState('')
	console.log('🚀 ~ searchValue:', searchValue)

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit)

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>
			{showAll && (
				<div className='mb-5'>
					<Input onChange={onChangeSearch} placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' />
				</div>
			)}
			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map(item => (
					<FilterCheckbox key={String(item.value)} text={item.text} value={item.value} endAdornment={item.endAdornment} onCheckedChange={ids => console.log(ids)} checked={false} />
				))}
			</div>
			{items.length > limit && (
				<div className={showAll ? `border-t border-t-neutral-100 mt-4` : ''}>
					<button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	)
}
