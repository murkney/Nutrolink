export default {
	title: 'Blog',
	name: 'blog',
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
			title: 'Content',
			name: 'content',
			type: 'text'
		}
	]
};