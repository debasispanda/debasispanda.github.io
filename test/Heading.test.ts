import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Heading from '../src/components/Heading.astro';

test('Heading with slots', async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Heading, {
		slots: {
			default: 'Heading content',
		},
	});

	expect(result).toContain('Heading content');
});