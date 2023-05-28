export default {
	title: 'Product',
	name: 'product',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title'
			}
		},
		{
			title: 'Image',
			description: 'Upload a image of the product',
			name: 'image',
			type: 'image'
		},
		{
			title: 'Price',
			name: 'price',
			type: 'number'
		},
		{
			title: 'Description',
			name: 'description',
			type: 'text'
		},
		{
			title: 'Category',
			name: 'category',
			type: 'reference',
			to: { type: 'category' }
		},
		{
			title: 'SubCategory',
			name: 'subcategory',
			type: 'reference',
			to: { type: 'subcategory' }
		},
		{
			title: 'Ingridients',
			name: 'ingridients',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							title: 'Name',
							name: 'name',
							type: 'string'
						},
						{
							title: 'Quantity',
							name: 'quantity',
							type: 'number'
						},
						{
							title: 'Unit',
							name: 'unit',
							type: 'string',
							options: {
								layout: 'radio',
								list: [
									'g',
									'mg',
									'μg',
									'mcg',
									'dl',
									'cl',
									'l',
									'oz'
								]
							}
						}
					],

					preview: {
						select: {
							name: 'name',
							quantity: 'quantity',
							unit: 'unit'
						},

						prepare: fields => {
							const { name, quantity, unit } = fields;

							return {
								title: `${quantity}${unit || ''} ${name}`
							}
						}
					}
				}
			]
		}
	]
};