import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useEffect } from 'react'
import { Filters } from './use-filters'

/**
 * Updates the current URL query string to reflect the current filter selection.
 *
 * @param filters The current filter values.
 */
export const useQueryFilters = (filters: Filters) => {
	const router = useRouter()

	useEffect(() => {
		const params = {
			...filters.prices,
			pizzaTypes: Array.from(filters.pizzaTypes),
			sizes: Array.from(filters.sizes),
			ingredients: Array.from(filters.selectedIngredients),
		}

		const query = qs.stringify(params, { arrayFormat: 'comma' })
		router.push(`?${query}`, { scroll: false })
	}, [filters, router])
}
