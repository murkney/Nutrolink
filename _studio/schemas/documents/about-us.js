export default {
	title: 'About Us',
	name: 'about',
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
			title: 'Description',
			name: 'description',
			type: 'text'
		}
	]
};