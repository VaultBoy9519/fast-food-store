import { prismaControllers } from '@/prisma/controllers'

export interface GetSearchParams {
	query?: string
	sortBy?: string
	sizes?: string
	pizzaTypes?: string
	ingredients?: string
	priceFrom?: string
	priceTo?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: GetSearchParams) => {
	const { category } = prismaControllers
	const sizes = params.sizes?.split(',').map(Number)
	const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
	const ingredientsIdArray = params.ingredients?.split(',').map(Number)

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

	const categories = await category.getAll({ingredients: ingredientsIdArray, sizes, pizzaTypes, minPrice, maxPrice})

	return categories
}
