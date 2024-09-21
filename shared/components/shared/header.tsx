'use client'

import { cn } from '@/shared/lib/utils'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui'
import { CartButton } from './cart-button'
import { Container } from './container'
import { SearchInput } from './search-input'

interface Props {
	className?: string
	hasSearch?: boolean
	hasCart?: boolean
}

export const Header: FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
	const searchParams = useSearchParams()

	useEffect(() => {
		if (searchParams.has('paid')) {
			setTimeout(() => toast.success('Заказ успешно оплачен! Информация отправлена на почту.'), 500)
		}
	}, [])

	return (
		<div className={cn('border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src='/logo.png' alt='Logo' width={35} height={35} />
						<div>
							<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>Вкусней уже некуда</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				<div className='flex items-center gap-3'>
					<Button variant={'outline'} className='flex items-center gap-1'>
						<User size={16} />
						Войти
					</Button>
					{hasCart && (
						<div>
							<CartButton />
						</div>
					)}
				</div>
			</Container>
		</div>
	)
}
